<template>
    <div>
        <div class="row" v-if="!skillGroup || !skillGroup.growthList || skillGroup.growthList.length == 0">
            <h5>{{ Ui.getText("emptyslot") }}</h5>
            <div class="mb-1">-</div>
        </div>
        <div v-else>
            <div v-if="false" :id="'skillGroup-carousel-' + skillGroup.id + '-' + randomKey"
                class="carousel carousel-dark slide" data-bs-ride="false" data-bs-wrap="false" data-bs-interval="false">
                <div class="carousel-indicators mb-0">
                    <button v-for="(growth, index) in skillGroup.growthList" :class='[{ "active": (index == 0) }]'
                        type="button" :data-bs-target="'#skillGroup-carousel-' + skillGroup.id + '-' + randomKey"
                        :data-bs-slide-to="index"></button>
                </div>
                <div class="carousel-inner" style="width: calc(100% - 4rem);margin: auto;padding-bottom: 1rem;">
                    <div v-for="(growth, index) in skillGroup.growthList"
                        :class='["carousel-item", { "active": (index == 0) }]' style="position: relative;">
                        <passive-skill class="col" :skillId="growth.skillId" />
                        <div style="position: absolute;top: 0;right: 0;width: auto;">
                            <img v-for="tag in growth.tags" class="tag-image"
                                :src="'../img/skill/' + tagImage(tag) + '.png'" />
                            <skill-grade style="display: inline-block;" :grade="skillGroup.grade" />
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" style="width: 2rem;padding-bottom: 1rem;" type="button"
                    :data-bs-target="'#skillGroup-carousel-' + skillGroup.id + '-' + randomKey" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" style="width: 2rem;padding-bottom: 1rem;" type="button"
                    :data-bs-target="'#skillGroup-carousel-' + skillGroup.id + '-' + randomKey" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <div v-else style="position: relative;padding-bottom: 0.5rem;">
                <passive-skill  :skillId="skillGroup.growthList[0].skillId" />
                <div style="position: absolute;top: 0;right: 0;width: auto;">
                    <img v-for="tag in skillGroup.growthList[0].tags" class="tag-image"
                        :src="'../img/skill/' + tagImage(tag) + '.png'" />
                    <skill-grade style="display: inline-block;" :grade="skillGroup.grade" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Data } from "../../js/data.js";

import PassiveSkill from "./PassiveSkill.vue";
import SkillGrade from "./SkillGrade.vue";
export default {
    components: {
        PassiveSkill,
        SkillGrade
    },
    data: function () {
        return {
            randomKey: Math.floor(Math.random() * 100000000)
        };
    },
    props: {
        skillGroup: Object,
    },
    methods: {
        tagImage: function (tagId) {
            return Data.get('skilltag', tagId).image.toLowerCase();
        }
    },
};
</script>
