<template>
    <div class="card">
        <div class="access-denied" v-if="isAccessDenied"></div>
        <div :class="['card-header', { 'access-denied-mask': isAccessDenied }]">
            <span>{{ costume.name }}</span>
            <span class="text-black-50 float-end">{{ company.name }}</span>
        </div>
        <div class="icon-company-container">
            <img class="icon-company" :src="company.icon ? '../img/com/' + company.icon + '.png' : ''"
                :title="company.name" />
        </div>
        <div :class="['card-body py-2', { 'access-denied-mask': isAccessDenied }]">
            <div class="text-center">
                <img :src="costume.icon ? '../img/item/' + costume.icon + '.png' : ''" class :alt="costume.name" />
            </div>
            <p class="card-text" v-html="Ui.renderDesc(costume.desc)"></p>
            <div class="icon-exercise" v-if="costume.isEnableExercise">
                <i class="material-icons">fitness_center</i>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "pinia";
import { useStore } from '../js/store';

import { Data } from "../js/data.js";

export default {
    props: {
        costume: Object,
    },
    computed: {
        costumeList: function () {
            var $vm = this;
            return _.chain(Data.getAll("costume"))
                .filter(function (o) {
                    return o.actressId == $vm.actressId;
                })
                .sortBy(["costumeNumber", "sortPriority"])
                .value();
        },
        isAccessDenied: function () {
            if (this.isExperimentalMode) {
                return false;
            }
            return (
                this.costume.name.indexOf("コスチューム") >= 0 ||
                this.costume.name.indexOf("衣裝_") >= 0 ||
                this.costume.name.indexOf("服装_") >= 0
            );
        },
        company: function (id) {
            return Data.get("company", this.costume.company) || {};
        },
        ...mapState(useStore, ["isExperimentalMode"]),
    },
};
</script>
<style scoped>
.card-header {
    position: relative;
}

.icon-company {
    width: 75%;
}

.icon-company-container {
    position: absolute;
    right: 0rem;
    top: 3rem;
    text-align: right;
}

.icon-exercise {
    position: absolute;
    right: 0;
    bottom: 0;
    color: rgba(0, 0, 0, 0.5);
}
</style>

