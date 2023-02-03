<template>
    <div>
        <div class="row" style="position: relative">
            <div class="text-black-50 px-2 d-sm-none" style="position: absolute; left: 0px; top: -0.5rem"
                v-if="actress.collaborationId > 0">
                {{ Ui.getText("collabochara") }}
            </div>
            <div class="text-black-50 px-2 d-sm-block text-end" style="position: absolute; right: 0px; bottom: 0"
                v-if="actress.collaborationId > 0">
                {{ Ui.getText("collabochara") }}
            </div>
            <div class="col-12 col-sm-auto text-center">
                <div class="chara-img-container">
                    <img v-bind:src="chara.image && '../img/chara/' + chara.image + '.png'" />
                </div>
                <div class="row">
                    <div class="col-auto">{{ Ui.getText("cv") }}</div>
                    <div class="col text-end">{{ chara.exactress.cv }}</div>
                </div>
            </div>
            <div class="col">
                <div class="actress-resume-singleline">
                    <div class="row">
                        <div class="col-auto">{{ Ui.getText("roma") }}</div>
                        <div class="col text-end">{{ actress.roma }}</div>
                    </div>
                    <div class="row">
                        <div class="col-auto">{{ Ui.getText("ruby") }}</div>
                        <div class="col text-end">{{ actress.ruby }}</div>
                    </div>
                    <div class="row">
                        <div class="col-auto">{{ Ui.getText("name") }}</div>
                        <div class="col text-end">{{ chara.exactress.fullName }}</div>
                    </div>
                    <div class="row">
                        <div class="col-4 col-lg-2">{{ Ui.getText("birthday") }}</div>
                        <div class="col-8 col-lg-2 text-end">{{ chara.exactress.birthday }}</div>
                        <div class="col-4 col-lg-2">{{ Ui.getText("age") }}</div>
                        <div class="col-8 col-lg-2 text-end">{{ chara.exactress.age }}</div>
                        <div class="col-4 col-lg-2"
                            :title="Ui.getText('modelheight') + ':' + chara.exactress.modelHeight">
                            {{ Ui.getText("height") }}
                        </div>
                        <div class="col-8 col-lg-2 text-end"
                            :title="Ui.getText('modelheight') + ':' + chara.exactress.modelHeight">
                            {{ chara.exactress.resumeHeight }}
                            {{ Ui.getText("heightunit") }}
                        </div>
                        <div class="col-4 col-lg-2">{{ Ui.getText("blood") }}</div>
                        <div class="col-8 col-lg-2 text-end">{{ chara.exactress.blood }}</div>
                        <div class="col-4 col-lg-2">{{ Ui.getText("job") }}</div>
                        <div class="col-8 col-lg-6 text-end">{{ chara.exactress.job }}</div>
                    </div>
                </div>
                <div class="d-none d-lg-block">
                    <hr />
                    <div>
                        <div class="row">
                            <div class="col-3">{{ Ui.getText("hobby") }}</div>
                            <div class="col" v-html="Ui.renderDesc(chara.exactress.hobby)"></div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-3">{{ Ui.getText("goal") }}</div>
                            <div class="col" v-html="Ui.renderDesc(chara.exactress.goal)"></div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-3">{{ Ui.getText("reason") }}</div>
                            <div class="col" v-html="Ui.renderDesc(chara.exactress.reason)"></div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-3">{{ Ui.getText("appeal") }}</div>
                            <div class="col" v-html="Ui.renderDesc(chara.exactress.appeal)"></div>
                        </div>
                        <hr v-if="chara.aptitudes && chara.aptitudes.length" />
                        <div v-if="chara.aptitudes && chara.aptitudes.length" class="row justify-content-center">
                            <div class="col-auto" v-for="aptitude in chara.aptitudes" :key="aptitude">
                                {{ aptitude }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-lg-none">
            <hr />
            <div>
                <div class="row">
                    <div class="col-3">{{ Ui.getText("hobby") }}</div>
                    <div class="col" v-html="Ui.renderDesc(chara.exactress.hobby)"></div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-3">{{ Ui.getText("goal") }}</div>
                    <div class="col" v-html="Ui.renderDesc(chara.exactress.goal)"></div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-3">{{ Ui.getText("reason") }}</div>
                    <div class="col" v-html="Ui.renderDesc(chara.exactress.reason)"></div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-3">{{ Ui.getText("appeal") }}</div>
                    <div class="col" v-html="Ui.renderDesc(chara.exactress.appeal)"></div>
                </div>
                <hr v-if="chara.aptitudes && chara.aptitudes.length" />
                <div v-if="chara.aptitudes && chara.aptitudes.length" class="row justify-content-center">
                    <div class="col-auto" v-for="aptitude in chara.aptitudes" :key="aptitude">{{ aptitude }}</div>
                </div>
            </div>
        </div>
        <div class="row" v-show="isShowNamePlate">
            <img v-show="false" :src="chara.exactress.namePlate && '../img/chara/' + chara.exactress.namePlate + '.png'"
                @error="isShowNamePlate = false" />
            <div class="name-plate-container">
                <div class="name-plate" v-bind:style="{
                    'background-image':
                        'url(' +
                        (chara.exactress.namePlate && '../img/chara/' + chara.exactress.namePlate + '.png') +
                        ')',
                }"></div>
            </div>
        </div>
        <div>
            <div class="row mt-2">
                <div class="col-auto" style="line-height: 1rem">
                    <i class="material-icons icon-trust">favorite</i>
                </div>
                <div class="col">
                    <div class="progress">
                        <div v-for="(targetValue, i) in actress.trustList" :key="targetValue + i" class="progress-bar"
                            :class="['progress-bar-level-' + i]" :style="{ width: trustPercentList[i] }"
                            :title="targetValue">
                            {{ targetValue }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-auto" style="line-height: 1rem">
                    <i class="material-icons icon-actress-point">volume_up</i>
                </div>
                <div class="col">
                    <div class="progress">
                        <div v-for="(targetValue, i) in actress.apList" :key="targetValue + i" class="progress-bar"
                            :class="['progress-bar-level-' + i]" :style="{ width: apPercentList[i] }"
                            :title="targetValue">
                            {{ targetValue }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr />
        <div>
            <div class="d-flex mb-2">
                <div class="flex-shrink-0">
                    <img v-bind:src="chara.icon && '../img/chara/' + chara.icon + '.png'" />
                </div>
                <div class="flex-grow-1 ms-3">
                    <div class="row">
                        <div class="col-3">Lv.</div>
                        <div class="col">
                            {{ chara.initLv }}
                            <span>~</span>
                            {{ chara.maxLv }}
                            <span>
                                ( +
                                {{ chara.gradeupLimit }}
                                )
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">HP</div>
                        <div class="col">{{ chara.hpMax }}</div>
                    </div>
                    <div class="row">
                        <div class="col-3">L.ATK</div>
                        <div class="col-auto">{{ chara.longAtkMax }}</div>
                        <div class="col">
                            <AttrText :attrList="chara.longAttrMax" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">S.ATK</div>
                        <div class="col-auto">{{ chara.shortAtkMax }}</div>
                        <div class="col">
                            <AttrText :attrList="chara.shortAttrMax" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">DEF</div>
                        <div class="col">{{ chara.defMax }}</div>
                        <div class="col-3">SPD</div>
                        <div class="col">{{ chara.spdMax }}</div>
                    </div>
                </div>
            </div>
            <ul class="nav nav-tabs mb-2">
                <li class="nav-item">
                    <button class="nav-link disabled">{{
                        Ui.getText("spskill")
                    }}</button>
                </li>
                <li class="nav-item" v-for="(spSkillId, i) in chara.spSkillIds" :key="spSkillId">
                    <button class="nav-link" :class="i == 0 ? 'active' : ''" data-bs-toggle="tab"
                        :data-bs-target="'#activeskill-' + spSkillId">{{ spSkillName(spSkillId) }}</button>
                </li>
            </ul>
            <div class="tab-content">
                <div v-for="(spSkillId, i) in chara.spSkillIds" class="tab-pane fade"
                    :class="i == 0 ? 'show active' : ''" :id="'activeskill-' + spSkillId">
                    <active-skill :key="spSkillId" :skillId="spSkillId" />
                </div>
            </div>
            <ul class="nav nav-tabs mb-2">
                <li class="nav-item">
                    <button class="nav-link disabled">{{
                        Ui.getText("passiveskill")
                    }}</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" :class="!actress.hasEnigma ? 'active' : ''" data-bs-toggle="tab"
                        :data-bs-target="'#defaultpassiveskill-' + chara.id">{{
                            Ui.getText("default")
                        }}</button>
                </li>
                <li class="nav-item" v-if="actress.hasEnigma || isExperimentalMode">
                    <button class="nav-link" :class="actress.hasEnigma ? 'active' : ''" data-bs-toggle="tab"
                        :data-bs-target="'#enigmapassiveskill-' + chara.id">{{
                            Ui.getText("enigma")
                        }}</button>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane fade" :class="!actress.hasEnigma ? 'show active' : ''"
                    :id="'defaultpassiveskill-' + chara.id">
                    <passive-skill-with-level v-for="pSkill in chara.passiveSkills"
                        v-bind:key="pSkill.id + '-' + pSkill.openLevel" :skill-id="pSkill.id"
                        :openLevel="pSkill.openLevel" />
                </div>
                <div class="tab-pane fade" :class="actress.hasEnigma ? 'show active' : ''"
                    :id="'enigmapassiveskill-' + chara.id">
                    <passive-skill-slot v-for="(psSlot, slotIndex) in chara.passiveSkillSlots"
                        v-bind:key="chara.id + '-passive-slot-' + slotIndex" :skill-slot="psSlot"
                        :skill-group-list="actress.skillGroupList" :container-id="'#enigmapassiveskill-' + chara.id" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "pinia";
import { useStore } from '../js/store';

import { Data } from "../js/data.js";

import AttrText from "./AttrText/AttrText.vue";
import ActiveSkill from "./Skill/ActiveSkill.vue";
import PassiveSkillWithLevel from "./Skill/PassiveSkillWithLevel.vue";
import PassiveSkillSlot from "./Skill/PassiveSkillSlot.vue";

export default {
    props: {
        actress: {
            type: Object,
            default(rawProps) {
                return {};
            }
        },
        chara: {
            type: Object,
            default(rawProps) {
                return { exactress: {} };
            }
        },
    },
    data: function () {
        return {
            isShowNamePlate: true,
        };
    },
    computed: {
        apPercentList: function () {
            var result = [];
            for (let i = 0; i < this.actress.apList.length; i++) {
                var diffValue = this.actress.apList[i];
                var maxValue = this.actress.apList[this.actress.apList.length - 1];
                if (i > 0) {
                    diffValue -= this.actress.apList[i - 1];
                }
                result.push((diffValue / maxValue) * 100 + "%");
            }
            return result;
        },
        trustPercentList: function () {
            var result = [];
            for (let i = 0; i < this.actress.trustList.length; i++) {
                var diffValue = this.actress.trustList[i];
                var maxValue = this.actress.trustList[this.actress.trustList.length - 1];
                if (i > 0) {
                    diffValue -= this.actress.trustList[i - 1];
                }
                result.push((diffValue / maxValue) * 100 + "%");
            }
            return result;
        },
        ...mapState(useStore, ["isExperimentalMode", "isEasterMode"]),
    },
    methods: {
        spSkillName: function (id) {
            return Data.get('skillactive', id).name;
        }
    },
    components: {
        AttrText,
        ActiveSkill,
        PassiveSkillWithLevel,
        PassiveSkillSlot
    },
};
</script>
<style lang="scss" scoped>
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/mixins";

.chara-img-container {
    display: inline-block;
    text-align: center;
    border: 2px solid rgb(144, 144, 144);
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: rgba(0, 0, 0, 0.25) 2px 2px 2px 0px;
    min-width: 192px;
    min-height: 360px;
    box-sizing: content-box;
}

.chara-img-container>img {
    border-radius: 10px;
}

.name-plate-container {
    background: linear-gradient(to bottom, transparent 27.5%, black 27.5%, black 45%, rgba(1, 1, 1, 0.75) 45%);
    width: 100%;
}

.name-plate {
    width: 100%;
    height: 5rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}

@include media-breakpoint-up(sm) {
    .name-plate {
        height: 7.5rem;
    }
}

@include media-breakpoint-up(lg) {
    .name-plate {
        height: 10rem;
    }
}

.icon-trust {
    font-size: 1rem;
    color: #fd2867;
}

.icon-actress-point {
    font-size: 1rem;
    color: #fe8f00;
}

.progress-bar-level-0 {
    background-color: #77dd66;
    color: black;
    min-width: 3rem;
}

.progress-bar-level-1 {
    background-color: #1166dd;
    min-width: 3.5rem;
}

.progress-bar-level-2 {
    background-color: #ffee22;
    color: black;
    min-width: 3.5rem;
}

.progress-bar-level-3 {
    background-color: #ff77aa;
}
</style>
