<template>
    <div class="card">
        <div class="access-denied" v-if="isAccessDenied"></div>
        <div :class="['card-header', { 'access-denied-mask': isAccessDenied }]">
            <span>{{ accessory.name }}</span>
            <span class="accessory-nameplate text-black-50">
                <ruby>
                    {{ accessory.nameplateName }} <rt>{{ accessory.nameplateNameRuby }}</rt>
                </ruby>
            </span>
            <span class="text-black-50 float-end">{{ company.name }}</span>
        </div>
        <div class="icon-company-container">
            <img class="icon-company" :src="company.icon ? '../img/com/' + company.icon + '.png' : ''"
                :title="company.name" />
        </div>
        <div :class="['card-body py-2', { 'access-denied-mask': isAccessDenied }]">
            <div class="text-center">
                <img :src="accessory.icon ? '../img/item/' + accessory.icon + '.png' : ''" class
                    :alt="accessory.name" />
            </div>
            <p class="card-text" v-html="Ui.renderDesc(accessory.desc)"></p>
        </div>
    </div>
</template>
<script>
import { mapState } from "pinia";
import { useStore } from '../js/store';

import { Data } from "../js/data.js";

export default {
    props: {
        accessory: Object,
    },
    computed: {
        isAccessDenied: function () {
            if (this.isExperimentalMode) {
                return false;
            }
            return (
                this.accessory.name.indexOf("アクセサリー") >= 0 ||
                this.accessory.name.indexOf("飾品") >= 0 ||
                this.accessory.name == "饰品" >= 0
            );
        },
        company: function () {
            return Data.get("company", this.accessory.company) || {};
        },
        ...mapState(useStore, ["isExperimentalMode"]),
    },
};
</script>
<style scoped>
.card-header {
    position: relative;
}

.accessory-nameplate {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
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
</style>


