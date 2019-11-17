<template>
    <div>
        <div class="form-row">
            <div
                v-for="accessory in accessoryList"
                :key="accessory.id"
                class="col-lg-6 col-12 pb-2"
            >
                <div class="card">
                    <div class="access-denied" v-if="isAccessDenied(accessory)"></div>
                    <div :class="['card-header',{'access-denied-mask':isAccessDenied(accessory)}]">
                        <span>{{accessory.name}}</span>
                        <span class="accessory-nameplate text-black-50">
                            <ruby>
                                <rb>{{accessory.nameplateName}}</rb>
                                <rt>{{accessory.nameplateNameRuby}}</rt>
                            </ruby>
                        </span>
                    </div>
                    <div
                        :class="['card-body py-2',{'access-denied-mask':isAccessDenied(accessory)}]"
                    >
                        <div class="text-center">
                            <img
                                :src="accessory.icon?'../img/item/' + accessory.icon + '.png':''"
                                class
                                :alt="accessory.name"
                            />
                        </div>
                        <p class="card-text" v-html="Ui.renderDesc(accessory.desc)"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Data } from "../js/data.js";

export default {
    props: {
        actressId: Number
    },
    computed: {
        accessoryList: function() {
            var $vm = this;
            return _.chain(Data.getAll("accessory"))
                .filter(function(o) {
                    return o.actressId == $vm.actressId;
                })
                .sortBy("sortPriority")
                .value();
        }
    },
    methods: {
        isAccessDenied: function(accessory) {
            if (this.$store.state.isExperimentalMode) {
                return false;
            }
            return (
                accessory.name.indexOf("アクセサリー") >= 0 ||
                accessory.name.indexOf("飾品") >= 0
            );
        }
    }
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
</style>


