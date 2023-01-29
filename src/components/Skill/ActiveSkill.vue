<template>
    <div class="d-flex">
        <div class="flex-shrink-0">
            <img v-bind:src="activeSkill.icon && '../img/skill/' + activeSkill.icon + '.png'" />
        </div>
        <div class="flex-grow-1 ms-4">
            <div class="row">
                <div class="col">
                    <fieldset>
                        <legend>
                            <p class="m-0 float-start">{{ activeSkill.name }}</p>
                            <div class="m-0 float-end text-end" style="font-size: 1rem">
                                <div>
                                    <i class="material-icons">{{
                                        activeSkill.isNolockActivate == 1 ? "gps_off" : "gps_fixed"
                                    }}</i>
                                    <span>{{ Ui.getText("attribute", activeSkill.attribute1st) }}</span>
                                    <span>
                                        <attr-text :attribute2nd="activeSkill.attribute2nd" />
                                    </span>
                                </div>
                                <div v-if="isExperimentalMode">
                                    <small class="text-black-50">{{ activeSkill.detailCategoryName }}</small>
                                </div>
                            </div>
                        </legend>
                        <div class="row mb-1" v-if="activeSkill.needPoint > 0">
                            <div class="col-12 col-sm-6 col-lg-4 text-center"
                                v-for="param in paramDescList(activeSkill)" :key="JSON.stringify(param)">
                                {{ param[0] }}：{{ param[1] }}
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4 text-center">
                                {{ Ui.getText("needPoint") }}：{{ activeSkill.needPoint }}
                            </div>
                        </div>
                        <div class="mb-1" v-html="Ui.renderDesc(activeSkill.desc)"></div>
                        <div v-if="isExperimentalMode">
                            <passive-skill class="mb-1" v-for="ps in activeSkill.passiveSkills"
                                v-bind:key="activeSkill.id + '-' + ps.id" :skillId="ps.id" />
                        </div>
                    </fieldset>
                </div>
            </div>
            <active-skill v-for="changeActSklId in activeSkill.changeActSkl" :key="skillId + '-' + changeActSklId"
                :skillId="changeActSklId" />
        </div>
    </div>
</template>
<script>
import _ from 'lodash';
import { mapState } from "pinia";
import { useStore } from '../../js/store';

import { Data } from "../../js/data.js";

import AttrText from "../AttrText/AttrText.vue";
import PassiveSkill from "../Skill/PassiveSkill.vue";

export default {
    name: "active-skill",
    components: {
        AttrText,
        PassiveSkill,
    },
    props: {
        skillId: Number,
    },
    data: function () {
        return {};
    },
    computed: {
        activeSkill: function () {
            var skill = _.extend({ passiveSkills: [] }, Data.get("skillactive", this.skillId));
            skill.passiveList.forEach(function (o, i) {
                skill.passiveSkills[i] = {
                    id: o,
                    skill: Data.get("skillpassive", o),
                };
            });
            return skill;
        },
        ...mapState(useStore, ["isExperimentalMode"]),
    },
    methods: {
        activateLimit: function (o) {
            return o == -1 ? "∞" : o;
        },
        paramDescList: function (spSkill) {
            var $vm = this;
            if (!spSkill.paramDesc) {
                return [
                    [$vm.Ui.getText("count"), $vm.activateLimit(spSkill.activateLimit)],
                    [$vm.Ui.getText("duration"), spSkill.effectTime + "秒間"],
                ];
            }
            var list = JSON.parse(spSkill.paramDesc.replace("{0}", spSkill.activateLimit).replace(/'/g, '"'));
            list.forEach(function (o) {
                o[0] = o[0].replace("回数", $vm.Ui.getText("count"));
                o[0] = o[0].replace("時間", $vm.Ui.getText("duration"));
            });
            return list;
        },
        getSkillDetailDesc: function (id) {
            var detail = Data.get("skilldetail", id) || {};
            return detail.name + "|" + detail.desc || "";
        },
    },
};
</script>