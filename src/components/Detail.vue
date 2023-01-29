<template>
    <div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="actress-resume">
                    <ul class="nav sticky-top nav-tabs chara-tabs pe-0 me-0">
                        <li class="nav-item" v-for="chara in charas" v-bind:key="chara.id">
                            <div v-bind:class="['py-1', 'px-2', 'nav-link', { active: currentTabId == chara.id }]"
                                @click="currentTabId = chara.id" style="cursor: pointer; white-space: nowrap">
                                <img class="mini-icon"
                                    v-bind:src="chara.miniIcon && '../img/chara/' + chara.miniIcon + '.png'"
                                    @error.once="miniIconAlt" />
                                <img v-if="chara.anotherIcon" :alt="chara.anotherName" class="another-icon"
                                    v-bind:src="'../img/another/' + chara.anotherIcon + '.png'" />
                            </div>
                        </li>
                        <hr class="nav-newline d-none d-lg-block" v-if="charas.length > 5" />
                        <li class="nav-item" v-if="actress.spList">
                            <div v-bind:class="['py-1', 'px-2', 'nav-link', { active: currentTabId == 'sp' }]"
                                @click="currentTabId = 'sp'" style="cursor: pointer; white-space: nowrap">
                                <div class="tab-text-icon">{{ Ui.getText("spskill") }}</div>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div v-bind:class="['py-1', 'px-2', 'nav-link', { active: currentTabId == 'gear' }]"
                                @click="currentTabId = 'gear'" style="cursor: pointer; white-space: nowrap">
                                <div class="tab-text-icon">{{ Ui.getText("gear") }}</div>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div v-bind:class="['py-1', 'px-2', 'nav-link', { active: currentTabId == 'costume' }]"
                                @click="currentTabId = 'costume'" style="cursor: pointer; white-space: nowrap">
                                <div class="tab-text-icon">{{ Ui.getText("costume") }}</div>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div v-bind:class="['py-1', 'px-2', 'nav-link', { active: currentTabId == 'accessory' }]"
                                @click="currentTabId = 'accessory'" style="cursor: pointer; white-space: nowrap">
                                <div class="tab-text-icon">{{ Ui.getText("accessory") }}</div>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div v-bind:class="['py-1', 'px-2', 'nav-link', { active: currentTabId == 'voice' }]"
                                @click="currentTabId = 'voice'" style="cursor: pointer; white-space: nowrap">
                                <div class="tab-text-icon">{{ Ui.getText("voice") }}</div>
                            </div>
                        </li>
                    </ul>
                    <div class="tab-content p-3 position-relative" v-bind:style="{
                        background:
                            'linear-gradient(135deg, ' +
                            actress.imageColor +
                            ', ' +
                            actress.imageColor +
                            ' 5rem, white 15rem, white)',
                    }">

                        <transition name="fade" mode="out-in" v-if="currentTabId != 0">
                            <component :id="'chara-tab-' + currentTabId" :key="'chara-tab-' + currentTabId"
                                class='tab-pane show active' :is="currentTabComponent" v-bind="currentTabProps">
                            </component>
                        </transition>
                        <button type="button" class="btn-close d-sm-none" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'lodash';
import { Data } from "../js/data.js";
import page from "page";
import { Modal } from "bootstrap";

import DetailResume from "./DetailResume.vue";
import DetailSP from "./DetailSP.vue";
import DetailGear from "./DetailGear.vue";
import DetailCostume from "./DetailCostume.vue";
import DetailAccessory from "./DetailAccessory.vue";
import DetailVoice from "./DetailVoice.vue";

export default {
    props: {
        actressId: undefined
    },
    data: function () {
        return {
            currentTabId: 0,
        };
    },
    created: function () {
        var $vm = this;
        $vm.$nextTick(function () {
            $vm.$el.addEventListener('hidden.bs.modal', function (e) {
                page.show("/");
            });
        });
    },
    mounted: function () {
        if (!(this.actressId)) {
            const modal = Modal.getInstance(this.$el);
            modal && modal.hide();
            return;
        }
    },
    watch: {
        actressId: function (newId, oldId) {
            if (!newId) {
                const modal = Modal.getInstance(this.$el);
                modal && modal.hide();
                return;
            }
            this.currentTabId = _.find(this.charas, (o) => o.variation == 5).id;
            this.$nextTick(function () {
                const modal = Modal.getOrCreateInstance(this.$el);
                modal && modal.show();
            });
        }
    },
    computed: {
        actress: function () {
            return Data.get("actress", this.actressId) || {};
        },
        charas: function () {
            let charas = [];
            const $vm = this;
            _.each(Data.getAll("chara"), function (o, i) {
                if (o.actressId == $vm.actress.id) {
                    var chara = _.extend({}, o);
                    chara.exactress = Data.get("exactress", chara.exActressId) || $vm.actress;
                    if (!chara.spSkillIds) {
                        chara.spSkillIds = [];
                    }
                    if (chara.defaultSpSkillId) {
                        chara.spSkillIds.push(chara.defaultSpSkillId);
                    }

                    charas.push(chara);
                }
            });
            return charas;
        },
        currentTabComponent: function () {
            if (Number.isInteger(this.currentTabId)) {
                return "DetailResume";
            }
            else if (this.currentTabId == "sp") {
                return "DetailSP"
            }
            return "Detail" + _.capitalize(this.currentTabId);
        },
        currentTabProps: function () {
            switch (this.currentTabId) {
                case "sp": return {
                    skillIds: this.actress.spList
                };
                case "gear": return {
                    actress: this.actress,
                };
                case "costume":
                case "accessory":
                case "voice": return {
                    actressId: this.actress.id,
                };
                default: return {
                    actress: this.actress,
                    chara: _.find(this.charas, ['id', this.currentTabId])
                };
            }
        }
    },
    methods: {
        miniIconAlt: function (event) {
            var $vm = this;
            var newSrc = "../img/chara/" + $vm.actress.miniIcon + ".png";
            event.target.src = newSrc;
        },
    },
    components: {
        DetailResume,
        DetailSP,
        DetailGear,
        DetailCostume,
        DetailAccessory,
        DetailVoice,
    },
};
</script>
<style scoped>
.modal-content {
    background: rgba(255, 255, 255, 0.75);
}

.actress-resume .chara-tabs {
    background: rgba(255, 255, 255, 0.75);
}

.actress-resume .btn-close {
    position: absolute;
    right: 0;
    top: 0;
    width: 2.5rem;
    height: 2.5rem;
    background-color: #ddd;
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

.nav-newline {
    width: 100%;
    margin: 0;
    height: 0;
    border: none;
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
    transition: opacity 0.1s linear;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>

