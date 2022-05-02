<template>
    <div>
        <div v-for="(spSkillId, index) in skillIds" :key="spSkillId" class="row">
            <hr v-if="index > 0" />
            <active-skill :skillId="spSkillId" />
        </div>
    </div>
</template>
<script>
import ActiveSkill from "./Skill/ActiveSkill.vue";

export default {
    props: {
        skillIds: Array,
    },
    components: {
        ActiveSkill,
    },
};
</script>


