<template>
    <div>
        <h5>{{ passiveSkill.name }}</h5>
        <div class="mb-1" v-html="Ui.renderDesc(passiveSkill.desc)"></div>
        <div v-if="isExperimentalMode">
            <div v-for="id in passiveSkill.detailList" v-bind:key="skillId + '_' + id">
                <small class="text-black-50">{{ getSkillDetailDesc(id) }}</small>
                <div v-for="aps in passiveSkill.additionalPassiveSkills" v-bind:key="aps.id">
                    <div v-for="apsdid in aps.skill.detailList" v-bind:key="apsdid">
                        <small class="pl-4 text-black-50">{{ getSkillDetailDesc(apsdid) }}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";

import { Data } from "../../js/data.js";
export default {
    props: {
        skillId: Number,
    },
    data: function () {
        return {};
    },
    computed: {
        passiveSkill: function () {
            var ps = Data.get("skillpassive", this.skillId) || {};
            if (ps.additionalPassiveId && ps.additionalPassiveId.length) {
                ps.additionalPassiveSkills = [];
                _.each(ps.additionalPassiveId, function (o, i) {
                    var aps = Data.get("skillpassive", o);
                    ps.additionalPassiveSkills[i] = {
                        id: o,
                        skill: aps,
                    };
                });
            }
            return ps;
        },
        ...mapState(["isExperimentalMode"]),
    },
    methods: {
        getSkillDetailDesc: function (id) {
            var detail = Data.get("skilldetail", id) || {};
            return detail.name + "|" + detail.desc || "";
        },
    },
};
</script>
