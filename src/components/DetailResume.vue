<template>
    <div>
        <div class="row">
            <div class="col-12 col-sm-auto">
                <div class="chara-img-container">
                    <img v-bind:src="chara.image&&('../img/chara/' + chara.image + '.png')" />
                </div>
                <div class="row">
                    <div class="col-4 col-sm-auto">{{Ui.getText("cv")}}</div>
                    <div class="col text-right">{{chara.exactress.cv}}</div>
                </div>
            </div>
            <div class="col">
                <div class="actress-resume-singleline">
                    <div class="row">
                        <div class="col-auto">{{Ui.getText("roma")}}</div>
                        <div class="col text-right">{{actress.roma}}</div>
                    </div>
                    <div class="row">
                        <div class="col-auto">{{Ui.getText("ruby")}}</div>
                        <div class="col text-right">{{actress.ruby}}</div>
                    </div>
                    <div class="row">
                        <div class="col-auto">{{Ui.getText("name")}}</div>
                        <div class="col text-right">{{chara.exactress.fullName}}</div>
                    </div>
                    <div class="row">
                        <div class="col-4 col-lg-2">{{Ui.getText("birthday")}}</div>
                        <div class="col-8 col-lg-2 text-right">{{chara.exactress.birthday}}</div>
                        <div class="col-4 col-lg-2">{{Ui.getText("age")}}</div>
                        <div class="col-8 col-lg-2 text-right">{{chara.exactress.age}}</div>
                        <div
                            class="col-4 col-lg-2"
                            :title="Ui.getText('modelheight')+':'+chara.exactress.modelHeight"
                        >{{Ui.getText("height")}}</div>
                        <div class="col-8 col-lg-2 text-right">
                            {{chara.exactress.resumeHeight}}
                            {{Ui.getText('heightunit')}}
                        </div>
                        <div class="col-4 col-lg-2">{{Ui.getText("blood")}}</div>
                        <div class="col-8 col-lg-2 text-right">{{chara.exactress.blood}}</div>
                        <div class="col-4 col-lg-2">{{Ui.getText("job")}}</div>
                        <div class="col-8 col-lg-6 text-right">{{chara.exactress.job}}</div>
                    </div>
                </div>
                <div class="d-none d-lg-block">
                    <hr />
                    <div>
                        <div class="row">
                            <div class="col-3">{{Ui.getText("hobby")}}</div>
                            <div class="col" v-html="Ui.renderDesc(chara.exactress.hobby)"></div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-3">{{Ui.getText("goal")}}</div>
                            <div class="col" v-html="Ui.renderDesc(chara.exactress.goal)"></div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-3">{{Ui.getText("reason")}}</div>
                            <div class="col" v-html="Ui.renderDesc(chara.exactress.reason)"></div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-3">{{Ui.getText("appeal")}}</div>
                            <div class="col" v-html="Ui.renderDesc(chara.exactress.appeal)"></div>
                        </div>
                        <hr v-if="chara.aptitudes&&chara.aptitudes.length" />
                        <div
                            v-if="chara.aptitudes&&chara.aptitudes.length"
                            class="row justify-content-center"
                        >
                            <div
                                class="col-auto"
                                v-for="aptitude in chara.aptitudes"
                                :key="aptitude"
                            >{{aptitude}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-lg-none">
            <hr />
            <div>
                <div class="row">
                    <div class="col-3">{{Ui.getText("hobby")}}</div>
                    <div class="col" v-html="Ui.renderDesc(chara.exactress.hobby)"></div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-3">{{Ui.getText("goal")}}</div>
                    <div class="col" v-html="Ui.renderDesc(chara.exactress.goal)"></div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-3">{{Ui.getText("reason")}}</div>
                    <div class="col" v-html="Ui.renderDesc(chara.exactress.reason)"></div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-3">{{Ui.getText("appeal")}}</div>
                    <div class="col" v-html="Ui.renderDesc(chara.exactress.appeal)"></div>
                </div>
                <hr v-if="chara.aptitudes&&chara.aptitudes.length" />
                <div
                    v-if="chara.aptitudes&&chara.aptitudes.length"
                    class="row justify-content-center"
                >
                    <div
                        class="col-auto"
                        v-for="aptitude in chara.aptitudes"
                        :key="aptitude"
                    >{{aptitude}}</div>
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
        <hr />
        <div>
            <div class="media">
                <img class="mr-3" v-bind:src="chara.icon&&('../img/chara/' + chara.icon + '.png')" />
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
                        <div class="col" v-html="Ui.renderAttrText(chara.longAttrMax)"></div>
                    </div>
                    <div class="row">
                        <div class="col-3">S.ATK</div>
                        <div class="col-auto">{{chara.shortAtkMax}}</div>
                        <div class="col" v-html="Ui.renderAttrText(chara.shortAttrMax)"></div>
                    </div>
                    <div class="row">
                        <div class="col-3">DEF</div>
                        <div class="col">{{chara.defMax}}</div>
                        <div class="col-3">SPD</div>
                        <div class="col">{{chara.spdMax}}</div>
                    </div>
                </div>
            </div>
            <hr />
            <div class="media" v-for="spSkill in chara.spSkills" v-bind:key="spSkill.id">
                <img
                    class="mr-4"
                    v-bind:src="spSkill.icon&&('../img/skill/' + spSkill.icon + '.png')"
                />
                <div class="media-body">
                    <div class="row">
                        <div class="col">
                            <fieldset>
                                <legend>
                                    <p class="m-0 float-left">{{spSkill.name}}</p>
                                    <div class="m-0 float-right text-right" style="font-size:1rem;">
                                        <div>
                                            <i
                                                class="material-icons"
                                            >{{spSkill.isNolockActivate==1?"gps_off":"gps_fixed"}}</i>
                                            <span>{{Ui.getText('attribute',spSkill.attribute1st)}}</span>
                                            <span
                                                v-html="Ui.renderAttribute2nd(spSkill.attribute2nd)"
                                            ></span>
                                        </div>
                                        <div v-if="isExperimentalMode">
                                            <small
                                                class="text-black-50"
                                            >{{spSkill.detailCategoryName}}</small>
                                        </div>
                                    </div>
                                </legend>
                                <div class="row mb-1">
                                    <div
                                        class="col-12 col-sm-6 col-lg-4 text-center"
                                        v-for="param in paramDescList(spSkill)"
                                        :key="JSON.stringify(param)"
                                    >{{param[0]}}：{{param[1]}}</div>
                                    <div
                                        class="col-12 col-sm-6 col-lg-4 text-center"
                                    >{{Ui.getText("needPoint")}}：{{spSkill.needPoint}}</div>
                                </div>
                                <div class="mb-1" v-html="Ui.renderDesc(spSkill.desc)"></div>
                                <div v-if="isExperimentalMode">
                                    <div
                                        class="mb-1"
                                        v-for="pSkill in spSkill.passiveSkills"
                                        v-bind:key="pSkill.id"
                                    >
                                        <h5>{{pSkill.skill.name}}</h5>
                                        <div class="mb-1" v-html="Ui.renderDesc(pSkill.skill.desc)"></div>
                                        <div v-if="isExperimentalMode">
                                            <div
                                                v-for="id in pSkill.skill.detailList"
                                                v-bind:key="id"
                                            >
                                                <small
                                                    class="text-black-50"
                                                >{{getSkillDetailDesc(id)}}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div>
                <div
                    v-for="pSkill in chara.passiveSkills"
                    v-bind:key="pSkill.id+'-'+pSkill.openLevel"
                    class="row"
                >
                    <div class="col-auto" style="flex:0 0 5rem;">
                        <span class="font-weight-light text-nowrap">
                            Lv.
                            {{pSkill.openLevel}}
                        </span>
                    </div>
                    <div class="col">
                        <h5>{{pSkill.skill.name}}</h5>
                        <div class="mb-1" v-html="Ui.renderDesc(pSkill.skill.desc)"></div>
                        <div v-if="isExperimentalMode">
                            <div v-for="id in pSkill.skill.detailList" v-bind:key="id">
                                <small class="text-black-50">{{getSkillDetailDesc(id)}}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";

import { Data } from "../js/data.js";

export default {
    props: {
        actress: Object,
        chara: Object
    },
    methods: {
        activateLimit: function(o) {
            return o == -1 ? "∞" : o;
        },
        paramDescList: function(spSkill) {
            var $vm = this;
            if (!spSkill.paramDesc) {
                return [
                    [
                        $vm.Ui.getText("count"),
                        $vm.activateLimit(spSkill.activateLimit)
                    ],
                    [$vm.Ui.getText("duration"), spSkill.effectTime + "秒間"]
                ];
            }
            var list = JSON.parse(
                spSkill.paramDesc
                    .replace("{0}", spSkill.activateLimit)
                    .replace(/'/g, '"')
            );
            _.each(list, function(o) {
                o[0] = o[0].replace("回数", $vm.Ui.getText("count"));
                o[0] = o[0].replace("時間", $vm.Ui.getText("duration"));
            });
            return list;
        },
        getSkillDetailDesc: function(id) {
            var detail = Data.get("skilldetail", id) || {};
            return detail.name + "|" + detail.desc || "";
        }
    },
    computed: {
        ...mapState(["isExperimentalMode", "isEasterMode"])
    }
};
</script>
<style scoped>
.chara-img-container {
    text-align: center;
    border: 2px solid rgb(144, 144, 144);
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: rgba(0, 0, 0, 0.25) 2px 2px 2px 0px;
    min-width: 192px;
    min-height: 360px;
    box-sizing: content-box;
}
.chara-img-container > img {
    border-radius: 10px;
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
