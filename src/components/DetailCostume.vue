<template>
    <div>
        <div class="form-row">
            <div v-for="costume in costumeList" :key="costume.id" class="col-lg-6 col-12 pb-2">
                <div class="card">
                    <div class="access-denied" v-if="isAccessDenied(costume)"></div>
                    <div
                        :class="['card-header',{'access-denied-mask':isAccessDenied(costume)}]"
                    >{{costume.name}}</div>
                    <div :class="['card-body py-2',{'access-denied-mask':isAccessDenied(costume)}]">
                        <div class="text-center">
                            <img
                                :src="costume.icon?'../img/item/' + costume.icon + '.png':''"
                                class
                                :alt="costume.name"
                            />
                        </div>
                        <p class="card-text" v-html="Ui.renderDesc(costume.desc)"></p>
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
        costumeList: function() {
            var $vm = this;
            return _.chain(Data.getAll("costume"))
                .filter(function(o) {
                    return o.actressId == $vm.actressId;
                })
                .sortBy(["costumeNumber", "sortPriority"])
                .value();
        }
    },
    methods: {
        isAccessDenied: function(costume) {
            if (this.$store.state.isExperimentalMode) {
                return false;
            }
            return (
                costume.name.indexOf("コスチューム") >= 0 ||
                costume.name.indexOf("衣裝") >= 0
            );
        }
    }
};
</script>


