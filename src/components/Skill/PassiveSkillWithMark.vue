<template>
    <div class="row">
        <div class="col-auto" style="flex: 0 0 5rem; text-align: center">
            <i class="material-icons">arrow_right</i>
        </div>
        <passive-skill class="col" :skillId="skillId" />
    </div>
</template>
<script>
import PassiveSkill from "./PassiveSkill.vue";
export default {
    components: {
        PassiveSkill,
    },
    props: {
        skillId: Number,
        openLevel: Number,
    },
};
</script>
<style lang="scss" scoped>
.col-auto > .material-icons {
    font-size: 3rem;
    line-height: 1.5rem;
}
</style>
