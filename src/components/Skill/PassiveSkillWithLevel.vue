<template>
    <div class="row">
        <div class="col-auto" style="flex: 0 0 5rem">
            <span class="font-weight-light text-nowrap">
                Lv.
                {{ openLevel }}
            </span>
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
