<template>
    <div>
        <div>
            <ul class="nav nav-tabs" role="tablist" v-if="longWeaponList.length>1">
                <li
                    v-for="(longWeapon,i) in longWeaponList"
                    v-bind:key="longWeapon.id"
                    class="nav-item"
                >
                    <a
                        v-bind:class="['nav-link',{'active':i==0}]"
                        data-toggle="tab"
                        v-bind:data-target="'#longWeapon-tab-'+longWeapon.id"
                        style="cursor: pointer;"
                    >{{longWeapon.name}}</a>
                </li>
            </ul>
            <div class="tab-content py-2">
                <div
                    v-for="(longWeapon,i) in longWeaponList"
                    v-bind:key="longWeapon.id"
                    v-bind:id="'longWeapon-tab-'+longWeapon.id"
                    v-bind:class="['tab-pane','fade',{'show active':i==0}]"
                >
                    <div class="media">
                        <div class="mr-3">
                            <a target="_blank" v-bind:href="'../Gear/#!/weapon/'+longWeapon.id">
                                <img
                                    v-bind:src="longWeapon.icon&&('../img/item/' + longWeapon.icon + '.png')"
                                />
                            </a>
                        </div>
                        <div class="media-body text-nowrap">
                            <div class="row">
                                <div class="col">
                                    <fieldset>
                                        <legend>{{longWeapon.name}}</legend>
                                        <div class="row">
                                            <div class="col-3">{{Ui.getText('geartype')}}</div>
                                            <div
                                                class="col-auto"
                                            >{{Ui.getText('weaponL',longWeapon.type)}}</div>
                                            <div
                                                class="col"
                                            >{{Ui.getText('attribute',longWeapon.attribute1st)}}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3">ATK</div>
                                            <div class="col-auto">{{longWeapon.longAtkMax}}</div>
                                            <div
                                                class="col"
                                                v-html="Ui.renderAttrText(longWeapon.longAttrMax)"
                                            ></div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-1" v-html="Ui.renderDesc(longWeapon.desc)"></div>
                    <div
                        v-for="pSkill in longWeapon.passiveSkills"
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
                            <div v-if="isExperimentalMode()">
                                <div v-for="id in pSkill.skill.detailList" v-bind:key="id">
                                    <small class="text-black-50">{{getSkillDetailDesc(id)}}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr v-if="shortWeaponList.length<=1" />
        <div>
            <ul class="nav nav-tabs" role="tablist" v-if="shortWeaponList.length>1">
                <li
                    v-for="(shortWeapon,i) in shortWeaponList"
                    v-bind:key="shortWeapon.id"
                    class="nav-item"
                >
                    <a
                        v-bind:class="['nav-link',{'active':i==0}]"
                        data-toggle="tab"
                        v-bind:data-target="'#shortWeapon-tab-'+shortWeapon.id"
                        style="cursor: pointer;"
                    >{{shortWeapon.name}}</a>
                </li>
            </ul>
            <div class="tab-content py-2">
                <div
                    v-for="(shortWeapon,i) in shortWeaponList"
                    v-bind:key="shortWeapon.id"
                    v-bind:id="'shortWeapon-tab-'+shortWeapon.id"
                    v-bind:class="['tab-pane','fade',{'show active':i==0}]"
                >
                    <div class="media">
                        <div class="mr-3">
                            <a target="_blank" v-bind:href="'../Gear/#!/weapon/'+shortWeapon.id">
                                <img
                                    v-bind:src="shortWeapon.icon&&('../img/item/' + shortWeapon.icon + '.png')"
                                />
                            </a>
                        </div>
                        <div class="media-body text-nowrap">
                            <div class="row">
                                <div class="col">
                                    <fieldset>
                                        <legend>{{shortWeapon.name}}</legend>
                                        <div class="row">
                                            <div class="col-3">{{Ui.getText('geartype')}}</div>
                                            <div
                                                class="col-auto"
                                            >{{Ui.getText('weaponS',shortWeapon.type)}}</div>
                                            <div
                                                class="col"
                                            >{{Ui.getText('attribute',shortWeapon.attribute1st)}}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3">ATK</div>
                                            <div class="col-auto">{{shortWeapon.shortAtkMax}}</div>
                                            <div
                                                class="col"
                                                v-html="Ui.renderAttrText(shortWeapon.shortAttrMax)"
                                            ></div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-1" v-html="Ui.renderDesc(shortWeapon.desc)"></div>
                    <div
                        v-for="pSkill in shortWeapon.passiveSkills"
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
                            <div v-if="isExperimentalMode()">
                                <div v-for="id in pSkill.skill.detailList" v-bind:key="id">
                                    <small class="text-black-50">{{getSkillDetailDesc(id)}}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr v-if="armList.length<=1" />
        <div>
            <ul class="nav nav-tabs" role="tablist" v-if="armList.length>1">
                <li v-for="(arm,i) in armList" v-bind:key="arm.id" class="nav-item">
                    <a
                        v-bind:class="['nav-link',{'active':i==0}]"
                        data-toggle="tab"
                        v-bind:data-target="'#arm-tab-'+arm.id"
                        style="cursor: pointer;"
                    >{{arm.name}}</a>
                </li>
            </ul>
            <div class="tab-content py-2">
                <div
                    v-for="(arm,i) in armList"
                    v-bind:key="arm.id"
                    v-bind:id="'arm-tab-'+arm.id"
                    v-bind:class="['tab-pane','fade',{'show active':i==0}]"
                >
                    <div class="media">
                        <div class="mr-3">
                            <a target="_blank" v-bind:href="'../Gear/#!/equipment/'+arm.id">
                                <img v-bind:src="arm.icon&&('../img/item/' + arm.icon + '.png')" />
                            </a>
                        </div>
                        <div class="media-body text-nowrap">
                            <div class="row">
                                <div class="col">
                                    <fieldset>
                                        <legend>{{arm.name}}</legend>
                                        <div class="row">
                                            <div class="col-3">HP</div>
                                            <div class="col">{{arm.hpMax}}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3">DEF</div>
                                            <div class="col">{{arm.defMax}}</div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-1" v-html="Ui.renderDesc(arm.desc)"></div>
                    <div class="media">
                        <img
                            class="mr-4"
                            v-bind:src="arm.activeSkill.icon&&('../img/skill/' + arm.activeSkill.icon + '.png')"
                        />
                        <div class="media-body">
                            <div class="row">
                                <div class="col">
                                    <fieldset>
                                        <legend>
                                            <p class="m-0 float-left">{{arm.activeSkill.name}}</p>
                                            <div
                                                class="m-0 float-right text-right"
                                                style="font-size:1rem;"
                                            >
                                                <div>
                                                    <span>{{Ui.getText('attribute',arm.activeSkill.attribute1st)}}</span>
                                                    <span
                                                        v-html="Ui.renderAttribute2nd(arm.activeSkill.attribute2nd)"
                                                    ></span>
                                                </div>
                                                <div v-if="isExperimentalMode()">
                                                    <small
                                                        class="text-black-50"
                                                    >{{arm.activeSkill.detailCategoryName}}</small>
                                                </div>
                                            </div>
                                        </legend>
                                        <div
                                            class="mb-1"
                                            v-html="Ui.renderDesc(arm.activeSkill.desc)"
                                        ></div>
                                        <div v-if="isExperimentalMode()">
                                            <div
                                                class="mb-1"
                                                v-for="pSkill in arm.activeSkill.passiveSkills"
                                                v-bind:key="pSkill.id"
                                            >
                                                <h5>{{pSkill.skill.name}}</h5>
                                                <div
                                                    class="mb-1"
                                                    v-html="Ui.renderDesc(pSkill.skill.desc)"
                                                ></div>
                                                <div v-if="isExperimentalMode()">
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
                    <div
                        v-for="pSkill in arm.passiveSkills"
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
                            <div v-if="isExperimentalMode()">
                                <div v-for="id in pSkill.skill.detailList" v-bind:key="id">
                                    <small class="text-black-50">{{getSkillDetailDesc(id)}}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr v-if="legList.length<=1" />
        <div>
            <ul class="nav nav-tabs" role="tablist" v-if="legList.length>1">
                <li v-for="(leg,i) in legList" v-bind:key="leg.id" class="nav-item">
                    <a
                        v-bind:class="['nav-link',{'active':i==0}]"
                        data-toggle="tab"
                        v-bind:data-target="'#leg-tab-'+leg.id"
                        style="cursor: pointer;"
                    >{{leg.name}}</a>
                </li>
            </ul>
            <div class="tab-content py-2">
                <div
                    v-for="(leg,i) in legList"
                    v-bind:key="leg.id"
                    v-bind:id="'leg-tab-'+leg.id"
                    v-bind:class="['tab-pane','fade',{'show active':i==0}]"
                >
                    <div class="media">
                        <div class="mr-3">
                            <a target="_blank" v-bind:href="'../Gear/#!/equipment/'+leg.id">
                                <img v-bind:src="leg.icon&&('../img/item/' + leg.icon + '.png')" />
                            </a>
                        </div>
                        <div class="media-body text-nowrap">
                            <div class="row">
                                <div class="col">
                                    <fieldset>
                                        <legend>{{leg.name}}</legend>
                                        <div class="row">
                                            <div class="col-3">HP</div>
                                            <div class="col">{{leg.hpMax}}</div>
                                            <div class="col-3">{{Ui.getText("spdtype")}}</div>
                                            <div
                                                class="col"
                                                v-if="leg.spdMax==200"
                                            >{{Ui.getText('spdtypeheavy')}}</div>
                                            <div
                                                class="col"
                                                v-if="leg.spdMax==240"
                                            >{{Ui.getText('spdtypebalance')}}</div>
                                            <div
                                                class="col"
                                                v-if="leg.spdMax==280"
                                            >{{Ui.getText('spdtypelight')}}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3">DEF</div>
                                            <div class="col">{{leg.defMax}}</div>
                                            <div class="col-3">SPD</div>
                                            <div class="col">{{leg.spdMax}}</div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-1" v-html="Ui.renderDesc(leg.desc)"></div>
                    <div class="media">
                        <img
                            class="mr-4"
                            v-bind:src="leg.activeSkill.icon&&('../img/skill/' + leg.activeSkill.icon + '.png')"
                        />
                        <div class="media-body">
                            <div class="row">
                                <div class="col">
                                    <fieldset>
                                        <legend>
                                            <p class="m-0 float-left">{{leg.activeSkill.name}}</p>
                                            <div
                                                class="m-0 float-right text-right"
                                                style="font-size:1rem;"
                                            >
                                                <div>
                                                    <span>{{Ui.getText('attribute',leg.activeSkill.attribute1st)}}</span>
                                                    <span
                                                        v-html="Ui.renderAttribute2nd(leg.activeSkill.attribute2nd)"
                                                    ></span>
                                                </div>
                                                <div v-if="isExperimentalMode()">
                                                    <small
                                                        class="text-black-50"
                                                    >{{leg.activeSkill.detailCategoryName}}</small>
                                                </div>
                                            </div>
                                        </legend>
                                        <div
                                            class="mb-1"
                                            v-html="Ui.renderDesc(leg.activeSkill.desc)"
                                        ></div>
                                        <div v-if="isExperimentalMode()">
                                            <div
                                                class="mb-1"
                                                v-for="pSkill in leg.activeSkill.passiveSkills"
                                                v-bind:key="pSkill.id"
                                            >
                                                <h5>{{pSkill.skill.name}}</h5>
                                                <div
                                                    class="mb-1"
                                                    v-html="Ui.renderDesc(pSkill.skill.desc)"
                                                ></div>
                                                <div v-if="isExperimentalMode()">
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
                    <div
                        v-for="pSkill in leg.passiveSkills"
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
                            <div v-if="isExperimentalMode()">
                                <div v-for="id in pSkill.skill.detailList" v-bind:key="id">
                                    <small class="text-black-50">{{getSkillDetailDesc(id)}}</small>
                                </div>
                            </div>
                        </div>
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
        actress: Object
    },
    data: function() {
        return {};
    },
    computed: {
        longWeaponList: function() {
            var longWeaponList = [];
            _.each(this.actress.longWeaponId, function(o, i) {
                var longWeapon = _.extend({}, Data.get("weapon", o));
                _.each(longWeapon.passiveSkills, function(p) {
                    p.skill = Data.get("skillpassive", p.id) || {};
                });
                longWeaponList.push(longWeapon);
            });
            return longWeaponList;
        },
        shortWeaponList: function() {
            var shortWeaponList = [];
            _.each(this.actress.shortWeaponId, function(o, i) {
                var shortWeapon = _.extend({}, Data.get("weapon", o));
                _.each(shortWeapon.passiveSkills, function(p) {
                    p.skill = Data.get("skillpassive", p.id) || {};
                });
                shortWeaponList.push(_.extend({}, Data.get("weapon", o)));
            });
            return shortWeaponList;
        },
        armList: function() {
            var armList = [];
            _.each(this.actress.armEquipmentId, function(o, i) {
                var arm = _.extend({}, Data.get("equipment", o));
                arm.activeSkill = _.extend(
                    { passiveSkills: [] },
                    Data.get("skillactive", arm.activeSkill)
                );
                _.each(arm.activeSkill.passiveList, function(o, i) {
                    arm.activeSkill.passiveSkills[i] = {
                        id: o,
                        skill: Data.get("skillpassive", o)
                    };
                });
                _.each(arm.passiveSkills, function(p) {
                    p.skill = Data.get("skillpassive", p.id) || {};
                });
                armList.push(arm);
            });
            return armList;
        },
        legList: function() {
            var legList = [];
            _.each(this.actress.legEquipmentId, function(o, i) {
                var leg = _.extend({}, Data.get("equipment", o));
                leg.activeSkill = _.extend(
                    { passiveSkills: [] },
                    Data.get("skillactive", leg.activeSkill)
                );
                _.each(leg.activeSkill.passiveList, function(o, i) {
                    leg.activeSkill.passiveSkills[i] = {
                        id: o,
                        skill: Data.get("skillpassive", o)
                    };
                });
                _.each(leg.passiveSkills, function(p) {
                    p.skill = Data.get("skillpassive", p.id) || {};
                });
                legList.push(leg);
            });
            return legList;
        }
    },
    methods: {
        getSkillDetailDesc: function(id) {
            var detail = Data.get("skilldetail", id) || {};
            return detail.name + "|" + detail.desc || "";
        }
    }
};
</script>
<style scoped>
</style>


