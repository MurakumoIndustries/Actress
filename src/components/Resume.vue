<template>
    <div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="actress-resume">
                    <ul class="nav sticky-top nav-tabs chara-tabs">
                        <li class="nav-item" v-for="chara in charas" v-bind:key="chara.id">
                            <div
                                v-bind:class="['py-1','px-2','nav-link',{'active':currentTabId==chara.id}]"
                                @click="currentTabId=chara.id"
                                style="cursor: pointer;white-space: nowrap;"
                            >
                                <img
                                    class="mini-icon"
                                    v-bind:src="chara.miniIcon&&('../img/chara/' + chara.miniIcon + '.png')"
                                >
                                <img
                                    v-if="chara.anotherIcon"
                                    class="another-icon"
                                    v-bind:src="'../img/another/' + chara.anotherIcon + '.png'"
                                >
                            </div>
                        </li>
                        <li class="nav-item">
                            <div
                                v-bind:class="['py-1','px-2','nav-link',{'active':currentTabId=='gear'}]"
                                @click="currentTabId='gear'"
                                style="cursor: pointer;white-space: nowrap;"
                            >
                                <div class="gear-icon">{{Ui.getText('gear')}}</div>
                            </div>
                        </li>
                    </ul>
                    <div
                        class="tab-content p-3 position-relative"
                        v-bind:style="{background:'linear-gradient(135deg, '+actress.imageColor+', '+actress.imageColor+' 5rem, white 15rem, white)'}"
                    >
                        <div
                            v-for="chara in charas"
                            v-bind:key="chara.id"
                            v-bind:id="'chara-tab-'+chara.id"
                            v-bind:class="['tab-pane', 'fade', {'show active':currentTabId==chara.id}]"
                        >
                            <div class="row">
                                <div class="col-12 col-sm-auto">
                                    <img
                                        v-bind:src="chara.image&&('../img/chara/' + chara.image + '.png')"
                                    >
                                    <div class="row">
                                        <div class="col-4 col-sm-auto">{{Ui.getText("cv")}}</div>
                                        <div class="col text-right">{{chara.exactress.cv}}</div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="actress-resume-singleline">
                                        <div class="row">
                                            <div class="col-4">{{Ui.getText("roma")}}</div>
                                            <div class="col-8 text-right">{{actress.roma}}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">{{Ui.getText("ruby")}}</div>
                                            <div class="col-8 text-right">{{actress.ruby}}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">{{Ui.getText("name")}}</div>
                                            <div
                                                class="col-8 text-right"
                                            >{{chara.exactress.fullName}}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4 col-lg-2">{{Ui.getText("birthday")}}</div>
                                            <div
                                                class="col-8 col-lg-2 text-right"
                                            >{{chara.exactress.birthday}}</div>
                                            <div class="col-4 col-lg-2">{{Ui.getText("age")}}</div>
                                            <div
                                                class="col-8 col-lg-2 text-right"
                                            >{{chara.exactress.age}}</div>
                                            <div class="col-4 col-lg-2">{{Ui.getText("height")}}</div>
                                            <div
                                                class="col-8 col-lg-2 text-right"
                                            >{{chara.exactress.resumeHeight}}</div>
                                            <div class="col-4 col-lg-2">{{Ui.getText("blood")}}</div>
                                            <div
                                                class="col-8 col-lg-2 text-right"
                                            >{{chara.exactress.blood}}</div>
                                            <div class="col-4 col-lg-2">{{Ui.getText("job")}}</div>
                                            <div
                                                class="col-8 col-lg-2 text-right"
                                            >{{chara.exactress.job}}</div>
                                        </div>
                                    </div>
                                    <div class="d-none d-lg-block">
                                        <hr>
                                        <div>
                                            <div class="row">
                                                <div class="col-3">{{Ui.getText("hobby")}}</div>
                                                <div
                                                    class="col"
                                                    v-html="Ui.renderDesc(chara.exactress.hobby)"
                                                ></div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-3">{{Ui.getText("goal")}}</div>
                                                <div
                                                    class="col"
                                                    v-html="Ui.renderDesc(chara.exactress.goal)"
                                                ></div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-3">{{Ui.getText("reason")}}</div>
                                                <div
                                                    class="col"
                                                    v-html="Ui.renderDesc(chara.exactress.reason)"
                                                ></div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-3">{{Ui.getText("appeal")}}</div>
                                                <div
                                                    class="col"
                                                    v-html="Ui.renderDesc(chara.exactress.appeal)"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-lg-none">
                                <hr>
                                <div>
                                    <div class="row">
                                        <div class="col-3">{{Ui.getText("hobby")}}</div>
                                        <div
                                            class="col"
                                            v-html="Ui.renderDesc(chara.exactress.hobby)"
                                        ></div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-3">{{Ui.getText("goal")}}</div>
                                        <div
                                            class="col"
                                            v-html="Ui.renderDesc(chara.exactress.goal)"
                                        ></div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-3">{{Ui.getText("reason")}}</div>
                                        <div
                                            class="col"
                                            v-html="Ui.renderDesc(chara.exactress.reason)"
                                        ></div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-3">{{Ui.getText("appeal")}}</div>
                                        <div
                                            class="col"
                                            v-html="Ui.renderDesc(chara.exactress.appeal)"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="name-plate-container">
                                    <div
                                        class="name-plate"
                                        v-bind:style="{'background-image':'url('+(chara.exactress.namePlate&&('../img/chara/' + chara.exactress.namePlate + '.png'))+')'}"
                                    ></div>
                                </div>
                            </div>
                            <hr>
                            <div>
                                <div class="media">
                                    <img
                                        class="mr-3"
                                        v-bind:src="chara.icon&&('../img/chara/' + chara.icon + '.png')"
                                    >
                                    <div class="media-body">
                                        <div class="row">
                                            <div class="col-3">Lv.</div>
                                            <div class="col">
                                                {{chara.initLv}}
                                                <span>~</span>
                                                {{chara.maxLv}}
                                                <span>
                                                    ( +
                                                    {{chara.gradeupLimit}}
                                                    )
                                                </span>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3">HP</div>
                                            <div class="col">{{chara.hpMax}}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3">L.ATK</div>
                                            <div class="col-auto">{{chara.longAtkMax}}</div>
                                            <div
                                                class="col"
                                                v-html="Ui.renderAttrText(chara.longAttrMax)"
                                            ></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3">S.ATK</div>
                                            <div class="col-auto">{{chara.shortAtkMax}}</div>
                                            <div
                                                class="col"
                                                v-html="Ui.renderAttrText(chara.shortAttrMax)"
                                            ></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3">DEF</div>
                                            <div class="col">{{chara.defMax}}</div>
                                            <div class="col-3">SPD</div>
                                            <div class="col">{{chara.spdMax}}</div>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div class="media">
                                    <img
                                        class="mr-3"
                                        v-bind:src="chara.spSkill.icon&&('../img/skill/' + chara.spSkill.icon + '.png')"
                                    >
                                    <div class="media-body">
                                        <div class="row">
                                            <div class="col">
                                                <fieldset>
                                                    <legend>
                                                        {{chara.spSkill.name}}
                                                        <span
                                                            class="float-right"
                                                        >{{activateLimit(chara.spSkill.activateLimit)}}/{{activateLimit(chara.spSkill.activateLimit)}}</span>
                                                    </legend>
                                                    <div class="row">
                                                        <div
                                                            class="col-auto"
                                                        >{{Ui.getText("needPoint")}}</div>
                                                        <div class="col">{{chara.spSkill.needPoint}}</div>
                                                        <div
                                                            class="col-auto"
                                                        >{{Ui.getText("duration")}}</div>
                                                        <div
                                                            class="col"
                                                        >{{chara.spSkill.effectTime}}s</div>
                                                    </div>
                                                    <div
                                                        class="mb-1"
                                                        v-html="Ui.renderDesc(chara.spSkill.desc)"
                                                    ></div>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div>
                                    <div
                                        v-for="pSkill in chara.passiveSkills"
                                        v-bind:key="pSkill.id+'-'+pSkill.openLevel"
                                        class="row"
                                    >
                                        <div class="col-auto">
                                            <span class="font-weight-light">
                                                Lv.
                                                {{pSkill.openLevel}}
                                            </span>
                                        </div>
                                        <div class="col">
                                            <h5>{{pSkill.skill.name}}</h5>
                                            <div
                                                class="mb-1"
                                                v-html="Ui.renderDesc(pSkill.skill.desc)"
                                            ></div>
                                            <div v-if="isExperimentalMode()">
                                                <div
                                                    v-for="text in pSkill.skill.detailList"
                                                    v-bind:key="text"
                                                >
                                                    <small class="text-black-50">{{text}}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            id="chara-tab-gear"
                            v-bind:class="['tab-pane', 'fade', {'show active':currentTabId=='gear'}]"
                        >
                            <Gear v-bind:actress="actress"/>
                        </div>
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

import Gear from "./Gear.vue";

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
            $vm.actress = Data.get("actress", id);
            if (!$vm.actress) {
                return;
            }
            $vm.charas = [];
            _.each(Data.getAll("chara"), function(o, i) {
                if (o.actressId == $vm.actress.id) {
                    var chara = _.extend({}, o);
                    chara.exactress =
                        Data.get("exactress", chara.exActressId) || $vm.actress;
                    chara.spSkill = _.extend(
                        {},
                        Data.get("skillactive", chara.defaultSpSkillId)
                    );
                    _.each(chara.passiveSkills, function(o, i) {
                        o.skill = Data.get("skillpassive", o.id);
                    });
                    $vm.charas.push(chara);
                    if (chara.maxLv >= 80 && !$vm.actress.first80CharaId) {
                        $vm.actress.first80CharaId = chara.id;
                    }
                }
            });
            $vm.currentTabId = $vm.actress.first80CharaId;

            $vm.$nextTick(function() {
                $($vm.$el).modal("show");
                $($vm.$el).on("hide.bs.modal", function() {
                    page.show("/");
                });
            });
        });
    },
    methods: {
        activateLimit: function(o) {
            return o == -1 ? "∞" : o;
        }
    },
    components: {
        Gear
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
.gear-icon {
    min-width: 2.5rem;
    min-height: 2.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    color: #fff;
    filter: drop-shadow(1px 1px 1px #000);
}

.name-plate-container {
    background: linear-gradient(
        to bottom,
        transparent 27.5%,
        black 27.5%,
        black 45%,
        rgba(1, 1, 1, 0.75) 45%
    );
    width: 100%;
    margin: 0.5rem 1rem;
}

.name-plate {
    width: 100%;
    height: 5rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}

@media (min-width: 576px) {
    .name-plate {
        height: 7.5rem;
    }
}
</style>

