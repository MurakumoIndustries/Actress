<template>
    <div class="row">
        <div class="row" v-if="skillSlot.variableMasterLevel > 0">
            <div class="col-auto" style="flex: 0 0 5rem; text-align: center">
                <div>{{ skillSlot.slot }}</div>
                <img class="tag-image" :src="'../img/skill/' + tag.image.toLowerCase() + '.png'" />
                <skill-grade :grade="slotGrade" :openGradeMasterLevel="skillSlot.openGradeMasterLevel" />
            </div>
            <div class="col">
                <passive-skill-group :skill-group="skillGroup" />
                <button v-if="skillSlot.variableMasterLevel > 0" class="btn btn-sm btn-outline-secondary w-100 mb-1"
                    style="position: relative;" data-bs-toggle="collapse"
                    :data-bs-target="'#variableSkills-' + skillSlot.slot">
                    <div style="position: absolute;right: 0.5rem;" v-if="skillSlot.variableMasterLevel > 1">
                        <i class="material-icons">lock_open</i>
                        {{ "MLv." + skillSlot.variableMasterLevel }}
                    </div>
                    <div>
                        <i class="material-icons">{{ isVariableSkillsOpen ? "expand_less" : "expand_more" }}</i>
                    </div>
                </button>
                <div class="collapse" :id="'variableSkills-' + skillSlot.slot" :data-bs-parent="containerId">
                    <div class="card card-body pb-0 mb-1" style="margin-top: -0.25rem;border-top: none;">
                        <passive-skill-group v-for="vGroup in variableSkillGroupList" :skill-group="vGroup" />
                    </div>
                </div>
            </div>
        </div>
        <passive-skill-with-level v-else :openLevel="skillSlot.openUnitLevel"
            :skillId="skillGroup.growthList[0].skillId" />
    </div>
</template>
<script>
import { Data } from "../../js/data.js";

import PassiveSkillGroup from "./PassiveSkillGroup.vue";
import PassiveSkillWithLevel from "./PassiveSkillWithLevel.vue";
import SkillGrade from "./SkillGrade.vue";
export default {
    components: {
        PassiveSkillGroup,
        PassiveSkillWithLevel,
        SkillGrade
    },
    props: {
        skillSlot: Object,
        skillGroupList: {
            type: Array,
            default: []
        },
        containerId: String
    },
    created: function () {
        var $vm = this;
        $vm.$nextTick(function () {
            //debugger;
            var collapse = $vm.$el.getElementsByClassName('collapse')[0];
            if (collapse) {
                collapse.addEventListener('hide.bs.collapse', function (e) {
                    $vm.isVariableSkillsOpen = false;
                });
                collapse.addEventListener('show.bs.collapse', function (e) {
                    $vm.isVariableSkillsOpen = true;
                });
            }
        });
    },
    data: function () {
        return {
            isVariableSkillsOpen: false
        };
    },
    computed: {
        tag: function () {
            return Data.get('skilltag', this.skillSlot.tagId);
        },
        slotGrade: function () {
            return this.skillSlot.openGradeMasterLevel.length;
        },
        skillGroup: function () {
            return Data.get('skillgroup', this.skillSlot.skillGroupId);
        },
        variableSkillGroupList: function () {
            var result = [];
            for (let i = 0; i < this.skillGroupList.length; i++) {
                const group = Data.get('skillgroup', this.skillGroupList[i]);
                var tags = _.chain(group.growthList).map('tags').flatten().uniq().value();
                if (this.tag.isWild || tags.indexOf(this.skillSlot.tagId) > -1) {
                    if (this.slotGrade >= group.grade) {
                        result.push(group);
                    }
                }
            }
            return _.orderBy(result, o => o.id != this.skillSlot.skillGroupId);
        }
    }
};
</script>
<style lang="scss" scoped>
.col-auto>.material-icons {
    font-size: 3rem;
    line-height: 1.5rem;
}
</style>
