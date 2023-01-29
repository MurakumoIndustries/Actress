<template>
    <div>
        <div>
            <ul class="nav nav-tabs" role="tablist" v-if="longWeaponList.length > 1">
                <li v-for="(longWeapon, i) in longWeaponList" v-bind:key="longWeapon.id" class="nav-item">
                    <a
                        v-bind:class="['nav-link', { active: i == 0 }]"
                        data-bs-toggle="tab"
                        v-bind:data-bs-target="'#longWeapon-tab-' + longWeapon.id"
                        style="cursor: pointer"
                        >{{ longWeapon.name }}</a
                    >
                </li>
            </ul>
            <div class="tab-content py-2">
                <div
                    v-for="(longWeapon, i) in longWeaponList"
                    v-bind:key="longWeapon.id"
                    v-bind:id="'longWeapon-tab-' + longWeapon.id"
                    v-bind:class="['tab-pane', 'fade', { 'show active': i == 0 }]"
                >
                    <div class="d-flex">
                        <div class="flex-shrink-0">
                            <a target="_blank" v-bind:href="'../Gear/#!/weapon/' + longWeapon.id">
                                <img v-bind:src="longWeapon.icon && '../img/item/' + longWeapon.icon + '.png'" />
                            </a>
                        </div>
                        <div class="flex-grow-1 ms-3 text-nowrap">
                            <div class="row">
                                <div class="col">
                                    <fieldset>
                                        <legend>{{ longWeapon.name }}</legend>
                                        <div class="row">
                                            <div class="col-3">{{ Ui.getText("geartype") }}</div>
                                            <div class="col-auto">{{ Ui.getText("weaponL", longWeapon.type) }}</div>
                                            <div class="col">
                                                {{ Ui.getText("attribute", longWeapon.attribute1st) }}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3">ATK</div>
                                            <div class="col-auto">{{ longWeapon.longAtkMax }}</div>
                                            <div class="col">
                                                <attr-text :attrList="longWeapon.longAttrMax" />
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-1" v-html="Ui.renderDesc(longWeapon.desc)"></div>
                    <passive-skill-with-mark
                        v-for="pSkill in longWeapon.passiveSkills"
                        :key="pSkill.id + '-' + pSkill.openLevel"
                        :skill-id="pSkill.id"
                        :openLevel="pSkill.openLevel"
                    />
                </div>
            </div>
        </div>
        <hr v-if="shortWeaponList.length <= 1" />
        <div>
            <ul class="nav nav-tabs" role="tablist" v-if="shortWeaponList.length > 1">
                <li v-for="(shortWeapon, i) in shortWeaponList" v-bind:key="shortWeapon.id" class="nav-item">
                    <a
                        v-bind:class="['nav-link', { active: i == 0 }]"
                        data-bs-toggle="tab"
                        v-bind:data-bs-target="'#shortWeapon-tab-' + shortWeapon.id"
                        style="cursor: pointer"
                        >{{ shortWeapon.name }}</a
                    >
                </li>
            </ul>
            <div class="tab-content py-2">
                <div
                    v-for="(shortWeapon, i) in shortWeaponList"
                    v-bind:key="shortWeapon.id"
                    v-bind:id="'shortWeapon-tab-' + shortWeapon.id"
                    v-bind:class="['tab-pane', 'fade', { 'show active': i == 0 }]"
                >
                    <div class="d-flex">
                        <div class="flex-shrink-0">
                            <a target="_blank" v-bind:href="'../Gear/#!/weapon/' + shortWeapon.id">
                                <img v-bind:src="shortWeapon.icon && '../img/item/' + shortWeapon.icon + '.png'" />
                            </a>
                        </div>
                        <div class="flex-grow-1 ms-3 text-nowrap">
                            <div class="row">
                                <div class="col">
                                    <fieldset>
                                        <legend>{{ shortWeapon.name }}</legend>
                                        <div class="row">
                                            <div class="col-3">{{ Ui.getText("geartype") }}</div>
                                            <div class="col-auto">{{ Ui.getText("weaponS", shortWeapon.type) }}</div>
                                            <div class="col">
                                                {{ Ui.getText("attribute", shortWeapon.attribute1st) }}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3">ATK</div>
                                            <div class="col-auto">{{ shortWeapon.shortAtkMax }}</div>
                                            <div class="col">
                                                <attr-text :attrList="shortWeapon.shortAttrMax" />
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-1" v-html="Ui.renderDesc(shortWeapon.desc)"></div>
                    <passive-skill-with-mark
                        v-for="pSkill in shortWeapon.passiveSkills"
                        :key="pSkill.id + '-' + pSkill.openLevel"
                        :skill-id="pSkill.id"
                        :openLevel="pSkill.openLevel"
                    />
                </div>
            </div>
        </div>
        <hr v-if="armList.length <= 1" />
        <div>
            <ul class="nav nav-tabs" role="tablist" v-if="armList.length > 1">
                <li v-for="(arm, i) in armList" v-bind:key="arm.id" class="nav-item">
                    <a
                        v-bind:class="['nav-link', { active: i == 0 }]"
                        data-bs-toggle="tab"
                        v-bind:data-bs-target="'#arm-tab-' + arm.id"
                        style="cursor: pointer"
                        >{{ arm.name }}</a
                    >
                </li>
            </ul>
            <div class="tab-content py-2">
                <div
                    v-for="(arm, i) in armList"
                    v-bind:key="arm.id"
                    v-bind:id="'arm-tab-' + arm.id"
                    v-bind:class="['tab-pane', 'fade', { 'show active': i == 0 }]"
                >
                    <div class="d-flex">
                        <div class="flex-shrink-0">
                            <a target="_blank" v-bind:href="'../Gear/#!/equipment/' + arm.id">
                                <img v-bind:src="arm.icon && '../img/item/' + arm.icon + '.png'" />
                            </a>
                        </div>
                        <div class="flex-grow-1 ms-3 text-nowrap">
                            <div class="row">
                                <div class="col">
                                    <fieldset>
                                        <legend>{{ arm.name }}</legend>
                                        <div class="row">
                                            <div class="col-3">HP</div>
                                            <div class="col">{{ arm.hpMax }}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3">DEF</div>
                                            <div class="col">{{ arm.defMax }}</div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-1" v-html="Ui.renderDesc(arm.desc)"></div>
                    <active-skill :key="arm.activeSkill" :skill-id="arm.activeSkill" />
                    <passive-skill-with-mark
                        v-for="pSkill in arm.passiveSkills"
                        :key="pSkill.id + '-' + pSkill.openLevel"
                        :skill-id="pSkill.id"
                        :openLevel="pSkill.openLevel"
                    />
                </div>
            </div>
        </div>
        <hr v-if="legList.length <= 1" />
        <div>
            <ul class="nav nav-tabs" role="tablist" v-if="legList.length > 1">
                <li v-for="(leg, i) in legList" v-bind:key="leg.id" class="nav-item">
                    <a
                        v-bind:class="['nav-link', { active: i == 0 }]"
                        data-bs-toggle="tab"
                        v-bind:data-bs-target="'#leg-tab-' + leg.id"
                        style="cursor: pointer"
                        >{{ leg.name }}</a
                    >
                </li>
            </ul>
            <div class="tab-content py-2">
                <div
                    v-for="(leg, i) in legList"
                    v-bind:key="leg.id"
                    v-bind:id="'leg-tab-' + leg.id"
                    v-bind:class="['tab-pane', 'fade', { 'show active': i == 0 }]"
                >
                    <div class="d-flex">
                        <div class="flex-shrink-0">
                            <a target="_blank" v-bind:href="'../Gear/#!/equipment/' + leg.id">
                                <img v-bind:src="leg.icon && '../img/item/' + leg.icon + '.png'" />
                            </a>
                        </div>
                        <div class="flex-grow-1 ms-3 text-nowrap">
                            <div class="row">
                                <div class="col">
                                    <fieldset>
                                        <legend>{{ leg.name }}</legend>
                                        <div class="row">
                                            <div class="col-3">HP</div>
                                            <div class="col">{{ leg.hpMax }}</div>
                                            <div class="col-3">{{ Ui.getText("spdtype") }}</div>
                                            <div class="col" v-if="leg.spdMax == 200">
                                                {{ Ui.getText("spdtypeheavy") }}
                                            </div>
                                            <div class="col" v-if="leg.spdMax == 240">
                                                {{ Ui.getText("spdtypebalance") }}
                                            </div>
                                            <div class="col" v-if="leg.spdMax == 280">
                                                {{ Ui.getText("spdtypelight") }}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3">DEF</div>
                                            <div class="col">{{ leg.defMax }}</div>
                                            <div class="col-3">SPD</div>
                                            <div class="col">{{ leg.spdMax }}</div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-1" v-html="Ui.renderDesc(leg.desc)"></div>
                    <active-skill :key="leg.activeSkill" :skill-id="leg.activeSkill" />
                    <passive-skill-with-mark
                        v-for="pSkill in leg.passiveSkills"
                        :key="pSkill.id + '-' + pSkill.openLevel"
                        :skill-id="pSkill.id"
                        :openLevel="pSkill.openLevel"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'lodash';
import { mapState } from "pinia";
import { useStore } from '../js/store';

import { Data } from "../js/data.js";

import AttrText from "./AttrText/AttrText.vue";
import ActiveSkill from "./Skill/ActiveSkill.vue";
import PassiveSkillWithMark from "./Skill/PassiveSkillWithMark.vue";

export default {
    props: {
        actress: Object,
    },
    data: function () {
        return {};
    },
    computed: {
        longWeaponList: function () {
            var longWeaponList = [];
            _.each(this.actress.longWeaponId, function (o, i) {
                var longWeapon = _.extend({}, Data.get("weapon", o));
                longWeaponList.push(longWeapon);
            });
            return longWeaponList;
        },
        shortWeaponList: function () {
            var shortWeaponList = [];
            _.each(this.actress.shortWeaponId, function (o, i) {
                var shortWeapon = _.extend({}, Data.get("weapon", o));
                shortWeaponList.push(shortWeapon);
            });
            return shortWeaponList;
        },
        armList: function () {
            var armList = [];
            _.each(this.actress.armEquipmentId, function (o, i) {
                var arm = _.extend({}, Data.get("equipment", o));
                armList.push(arm);
            });
            return armList;
        },
        legList: function () {
            var legList = [];
            _.each(this.actress.legEquipmentId, function (o, i) {
                var leg = _.extend({}, Data.get("equipment", o));
                legList.push(leg);
            });
            return legList;
        },
        ...mapState(useStore, ["isExperimentalMode"]),
    },
    components: {
        ActiveSkill,
        PassiveSkillWithMark,
        AttrText,
    },
};
</script>
<style scoped>
</style>


