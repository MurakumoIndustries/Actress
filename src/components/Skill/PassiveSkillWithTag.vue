<template>
    <div class="row" style="position: relative;">
        <passive-skill :skillId="skillGrowth.skillId" />
        <div style="position: absolute;top: 0;right: 0;width: auto;">
            <img v-for="tag in skillGrowth.tags" class="tag-image" :src="'../img/skill/' + tagImage(tag) + '.png'" />
            <skill-grade v-if="grade > 0" style="display: inline-block;" :grade="grade" />
        </div>
    </div>
</template>
<script>
import { Data } from "../../js/data.js";

import PassiveSkill from "./PassiveSkill.vue";
import SkillGrade from "./SkillGrade.vue";

export default {
    components: {
        PassiveSkill,
        SkillGrade
    },
    props: {
        skillGrowth: Object,
        grade: Number,
    },
    methods: {
        tagImage: function (tagId) {
            return Data.get('skilltag', tagId).image.toLowerCase();
        }
    },
};
</script>
