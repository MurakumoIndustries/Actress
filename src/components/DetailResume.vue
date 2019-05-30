<template>
    <div>
        <div class="row">
            <div class="col-12 col-sm-auto">
                <img v-bind:src="chara.image&&('../img/chara/' + chara.image + '.png')">
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
                        <div class="col-8 text-right">{{chara.exactress.fullName}}</div>
                    </div>
                    <div class="row">
                        <div class="col-4 col-lg-2">{{Ui.getText("birthday")}}</div>
                        <div class="col-8 col-lg-2 text-right">{{chara.exactress.birthday}}</div>
                        <div class="col-4 col-lg-2">{{Ui.getText("age")}}</div>
                        <div class="col-8 col-lg-2 text-right">{{chara.exactress.age}}</div>
                        <div class="col-4 col-lg-2">{{Ui.getText("height")}}</div>
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
                    <hr>
                    <div>
                        <div class="row">
                            <div class="col-3">{{Ui.getText("hobby")}}</div>
                            <div class="col" v-html="Ui.renderDesc(chara.exactress.hobby)"></div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-3">{{Ui.getText("goal")}}</div>
                            <div class="col" v-html="Ui.renderDesc(chara.exactress.goal)"></div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-3">{{Ui.getText("reason")}}</div>
                            <div class="col" v-html="Ui.renderDesc(chara.exactress.reason)"></div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-3">{{Ui.getText("appeal")}}</div>
                            <div class="col" v-html="Ui.renderDesc(chara.exactress.appeal)"></div>
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
                    <div class="col" v-html="Ui.renderDesc(chara.exactress.hobby)"></div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-3">{{Ui.getText("goal")}}</div>
                    <div class="col" v-html="Ui.renderDesc(chara.exactress.goal)"></div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-3">{{Ui.getText("reason")}}</div>
                    <div class="col" v-html="Ui.renderDesc(chara.exactress.reason)"></div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-3">{{Ui.getText("appeal")}}</div>
                    <div class="col" v-html="Ui.renderDesc(chara.exactress.appeal)"></div>
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
                <img class="mr-3" v-bind:src="chara.icon&&('../img/chara/' + chara.icon + '.png')">
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
            <hr>
            <div class="media" v-for="spSkill in chara.spSkills" v-bind:key="spSkill.id">
                <img
                    class="mr-3"
                    v-bind:src="spSkill.icon&&('../img/skill/' + spSkill.icon + '.png')"
                >
                <div class="media-body">
                    <div class="row">
                        <div class="col">
                            <fieldset>
                                <legend>{{spSkill.name}}</legend>
                                <div class="row mb-1">
                                    <div
                                        class="col text-center"
                                        v-for="param in paramDescList(spSkill.paramDesc)"
                                        :key="JSON.stringify(param)"
                                    >{{param[0]}}：{{param[1]}}</div>
                                    <div
                                        class="col text-center"
                                    >{{Ui.getText("needPoint")}}：{{spSkill.needPoint}}</div>
                                </div>
                                <div class="mb-1" v-html="Ui.renderDesc(spSkill.desc)"></div>
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
                        <div class="mb-1" v-html="Ui.renderDesc(pSkill.skill.desc)"></div>
                        <div v-if="isExperimentalMode()">
                            <div v-for="text in pSkill.skill.detailList" v-bind:key="text">
                                <small class="text-black-50">{{text}}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        actress: Object,
        chara: Object
    },
    methods: {
        //activateLimit: function(o) {
        //    return o == -1 ? "∞" : o;
        //},
        paramDescList: function(paramDesc) {
            return JSON.parse(paramDesc.replace(/'/g, '"'));
        }
    }
};
</script>
<style scoped>
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
