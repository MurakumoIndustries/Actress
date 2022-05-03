<template>
    <div>
        <div class="row" v-if="!skillGroup || !skillGroup.growthList || skillGroup.growthList.length == 0">
            <h5>{{ Ui.getText("emptyslot") }}</h5>
            <div class="mb-1">-</div>
        </div>
        <div v-else style="position: relative;padding-bottom: 2rem;">
            <transition name="fade" mode="out-in">
                <passive-skill-with-tag :key="skillGroup.growthList[growthIndex - 1].id"
                    :skillGrowth="skillGroup.growthList[growthIndex - 1]" :grade="skillGroup.grade" />
            </transition>
            <div style="position:absolute;right: 0;bottom: 0;">
                <div v-for="i in growthListLength" @click="growthIndex = i" class="passive-skill-selector"
                    :class="{ active: growthIndex == i }">{{ i
                    }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";

import PassiveSkillWithTag from "./PassiveSkillWithTag.vue";

export default {
    components: {
        PassiveSkillWithTag,
    },
    props: {
        skillGroup: Object,
    },
    data: function () {
        return {
            growthIndex: 1
        }
    },
    computed: {
        growthListLength: function () {
            if (!this.isExperimentalMode) {
                return 1;
            }
            return this.skillGroup.growthList.length;
        },
        ...mapState(["isExperimentalMode"]),
    },
};
</script>
<style scoped>
.passive-skill-selector {
    display: inline-block;
    width: 1.5rem;
    line-height: 1rem;
    height: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.125);
    text-align: center;
    cursor: pointer;
}

.passive-skill-selector.active {
    color: white;
    background-color: var(--bs-body-color);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s linear;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
