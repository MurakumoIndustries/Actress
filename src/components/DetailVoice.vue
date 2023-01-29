<template>
    <div>
        <div>
            <ul class="nav nav-tabs nav-fill" role="tablist">
                <li v-for="i in 3" class="nav-item">
                    <a v-bind:class="['nav-link', { active: i == 1 }]" data-bs-toggle="tab"
                        v-bind:data-bs-target="'#voice-category-tab-' + i" style="cursor: pointer">{{
                            Ui.getText(actressCategory[i])
                        }}</a>
                </li>
            </ul>
            <div class="tab-content py-2">
                <div v-for="i in 3" :id="'voice-category-tab-' + i"
                    v-bind:class="['tab-pane', 'fade', { 'show active': i == 1 }]">
                    <div v-if="!voiceList || !voiceList[i]" class="text-center">{{ Ui.getText("novoice") }}</div>
                    <div v-else v-for="(items, categoryId) in voiceList[i]" class="card mb-2">
                        <div role="button" class="card-header" data-bs-toggle="collapse"
                            :data-bs-target="'#voice-category-' + categoryId">
                            <span>{{ voiceCategory(categoryId).name }}</span>
                            <div v-if="voiceCategory(categoryId).targetValue > 0" class="float-end">
                                <span v-if="voiceCategory(categoryId).pointType == 1" class="color-trust">
                                    <i class="material-icons ">favorite</i>
                                    {{ voiceCategory(categoryId).targetValue }}</span>
                                <span v-if="voiceCategory(categoryId).pointType == 2" class="color-actress-point">
                                    <i class="material-icons ">volume_up</i>
                                    {{ voiceCategory(categoryId).targetValue }}</span>
                            </div>
                        </div>
                        <ul :id="'voice-category-' + categoryId" :data-bs-parent="'#voice-category-tab-' + i"
                            class="list-group list-group-flush collapse">
                            <li v-for="item in items" class="list-group-item ps-4">
                                {{ item.voiceTitle }}</li>
                        </ul>
                    </div>
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

export default {
    props: {
        actressId: Number
    },
    data: function () {
        return {
            actressCategory: ["", "normal", "another", "factor"],
        };
    },
    computed: {
        voiceList: function () {
            var voiceCollection = Data.getAll("voice").find(o => o.actressId == this.actressId) || {};
            return voiceCollection.items;
        },
        ...mapState(useStore, ["isExperimentalMode"]),
    },
    methods: {
        voiceCategory: function (id) {
            return Data.get("voiceCategory", id);
        }
    },
};
</script>
<style scoped>
.color-trust {
    color: #fd2867;
}

.color-actress-point {
    color: #fe8f00;
}
</style>


