<template>
    <div class="card">
        <div class="access-denied" v-if="isAccessDenied"></div>
        <div :class="['card-header', { 'access-denied-mask': isAccessDenied }]">
            <span>{{ accessory.name }}</span>
            <span class="accessory-nameplate text-black-50">
                <ruby>
                    <rb>{{ accessory.nameplateName }}</rb>
                    <rt>{{ accessory.nameplateNameRuby }}</rt>
                </ruby>
            </span>
            <span class="text-black-50 float-right">{{ company.name }}</span>
        </div>
        <div class="icon-company-container">
            <img
                class="icon-company"
                :src="company.icon ? '../img/com/' + company.icon + '.png' : ''"
                :title="company.name"
                :alt="company.name"
            />
        </div>
        <div :class="['card-body py-2', { 'access-denied-mask': isAccessDenied }]">
            <div class="text-center">
                <img
                    :src="accessory.icon ? '../img/item/' + accessory.icon + '.png' : ''"
                    class
                    :alt="accessory.name"
                />
            </div>
            <p class="card-text" v-html="Ui.renderDesc(accessory.desc)"></p>
        </div>
    </div>
</template>
<script>
import { Data } from "../js/data.js";

export default {
    props: {
        accessory: Object,
    },
    computed: {
        isAccessDenied: function () {
            if (this.$store.state.isExperimentalMode) {
                return false;
            }
            return this.accessory.name.indexOf("アクセサリー") >= 0 || this.accessory.name.indexOf("飾品") >= 0;
        },
        company: function () {
            return Data.get("company", this.accessory.company) || {};
        },
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


