<template>
    <div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="actress-resume">
                    <ul class="nav sticky-top nav-tabs chara-tabs pr-0 mr-0">
                        <li class="nav-item" v-for="chara in charas" v-bind:key="chara.id">
                            <div
                                v-bind:class="['py-1','px-2','nav-link',{'active':currentTabId==chara.id}]"
                                @click="currentTabId=chara.id"
                                style="cursor: pointer;white-space: nowrap;"
                            >
                                <img
                                    class="mini-icon"
                                    v-bind:src="chara.miniIcon&&('../img/chara/' + chara.miniIcon + '.png')"
                                    @error="miniIconAlt"
                                />
                                <img
                                    v-if="chara.anotherIcon"
                                    class="another-icon"
                                    v-bind:src="'../img/another/' + chara.anotherIcon + '.png'"
                                />
                            </div>
                        </li>
                        <li class="nav-item">
                            <div
                                v-bind:class="['py-1','px-2','nav-link',{'active':currentTabId=='gear'}]"
                                @click="currentTabId='gear'"
                                style="cursor: pointer;white-space: nowrap;"
                            >
                                <div class="tab-text-icon">{{Ui.getText('gear')}}</div>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div
                                v-bind:class="['py-1','px-2','nav-link',{'active':currentTabId=='costume'}]"
                                @click="currentTabId='costume'"
                                style="cursor: pointer;white-space: nowrap;"
                            >
                                <div class="tab-text-icon">{{Ui.getText('costume')}}</div>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div
                                v-bind:class="['py-1','px-2','nav-link',{'active':currentTabId=='accessory'}]"
                                @click="currentTabId='accessory'"
                                style="cursor: pointer;white-space: nowrap;"
                            >
                                <div class="tab-text-icon">{{Ui.getText('accessory')}}</div>
                            </div>
                        </li>
                    </ul>
                    <div
                        class="tab-content p-3 position-relative"
                        v-bind:style="{background:'linear-gradient(135deg, '+actress.imageColor+', '+actress.imageColor+' 5rem, white 15rem, white)'}"
                    >
                        <transition name="fade" v-for="chara in charas" :key="chara.id">
                            <DetailResume
                                :id="'chara-tab-'+chara.id"
                                v-show="currentTabId==chara.id"
                                :class="['tab-pane', currentTabId==chara.id?'show active':'']"
                                :actress="actress"
                                :chara="chara"
                            />
                        </transition>
                        <transition name="fade">
                            <DetailGear
                                id="chara-tab-gear"
                                v-show="currentTabId=='gear'"
                                :class="['tab-pane', currentTabId=='gear'?'show active':'']"
                                :actress="actress"
                            />
                        </transition>
                        <transition name="fade">
                            <DetailCostume
                                id="chara-tab-costume"
                                v-show="currentTabId=='costume'"
                                :class="['tab-pane', currentTabId=='costume'?'show active':'']"
                                :actressId="actress.id"
                            />
                        </transition>
                        <transition name="fade">
                            <DetailAccessory
                                id="chara-tab-accessory"
                                v-show="currentTabId=='accessory'"
                                :class="['tab-pane', currentTabId=='accessory'?'show active':'']"
                                :actressId="actress.id"
                            />
                        </transition>
                        <button
                            type="button"
                            class="close d-sm-none"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Data } from "../js/data.js";
import { Event } from "../js/event.js";
import $ from "jquery";
import page from "page";

import DetailResume from "./DetailResume.vue";
import DetailGear from "./DetailGear.vue";
import DetailCostume from "./DetailCostume.vue";
import DetailAccessory from "./DetailAccessory.vue";

export default {
    data: function() {
        return {
            currentTabId: "",
            actress: {},
            charas: []
        };
    },
    created: function() {
        var $vm = this;
        Event.$on("render", function(id) {
            var isModelShow = !!($vm.actress && $vm.actress.id);
            $vm.actress = Data.get("actress", id) || {};
            if (!$vm.actress || !$vm.actress.id) {
                if (isModelShow) {
                    $($vm.$el).modal("hide");
                }
                return;
            }
            $vm.charas = [];
            _.each(Data.getAll("chara"), function(o, i) {
                if (o.actressId == $vm.actress.id) {
                    var chara = _.extend({}, o);
                    chara.exactress =
                        Data.get("exactress", chara.exActressId) || $vm.actress;
                    chara.spSkills = [];
                    if (chara.spSkillIds) {
                        _.each(chara.spSkillIds, function(id) {
                            chara.spSkills.push(Data.get("skillactive", id));
                        });
                    }
                    if (chara.defaultSpSkillId) {
                        chara.spSkills.push(
                            Data.get("skillactive", chara.defaultSpSkillId)
                        );
                    }

                    _.each(chara.passiveSkills, function(o, i) {
                        o.skill = Data.get("skillpassive", o.id);
                    });
                    $vm.charas.push(chara);
                    if (
                        chara.rare >= 4 &&
                        !chara.anotherIcon &&
                        !$vm.actress.firstRare4CharaId
                    ) {
                        $vm.actress.firstRare4CharaId = chara.id;
                    }
                }
            });
            $vm.currentTabId = $vm.actress.firstRare4CharaId;

            $vm.$nextTick(function() {
                $($vm.$el).modal("show");
                $($vm.$el).on("hide.bs.modal", function() {
                    page.show("/");
                });
            });
        });
    },
    methods: {
        miniIconAlt: function(event) {
            var $vm = this;
            var oldSrc = event.target.src;
            var newSrc = "../img/chara/" + $vm.actress.miniIcon + ".png";
            if (oldSrc == newSrc) {
                return;
            }
            event.target.src = newSrc;
        }
    },
    components: {
        DetailResume,
        DetailGear,
        DetailCostume,
        DetailAccessory
    }
};
</script>
<style scoped>
.modal-content {
    background: rgba(255, 255, 255, 0.75);
}

.actress-resume .chara-tabs {
    background: rgba(255, 255, 255, 0.75);
}

.actress-resume .close {
    position: absolute;
    right: 0;
    top: 0;
    width: 2.5rem;
    height: 2.5rem;
    background: #ddd;
}

.actress-resume .tab-content {
    background: white;
}

.actress-resume .actress-resume-singleline {
    white-space: nowrap;
}

.mini-icon {
    min-width: 2.5rem;
    min-height: 2.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
}

.another-icon {
    filter: drop-shadow(1px 1px 1px black);
    height: 2.5rem;
}
.tab-text-icon {
    min-width: 2.5rem;
    min-height: 2.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    color: #fff;
    filter: drop-shadow(1px 1px 1px #000);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.15s linear;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>

