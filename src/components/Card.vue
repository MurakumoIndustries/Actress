<template>
    <div class="actress-card" v-bind:data-id="actress.id" v-bind:data-name="actress.name">
        <div class="card">
            <div
                v-bind:style="{background:'linear-gradient(135deg, '+actress.imageColor+', '+actress.imageColor+' 2rem, transparent 4rem, transparent)'}"
            >
                <div class="access-denied" v-if="isAccessDenied"></div>
                <div
                    :class="['card-body p-0',{'access-denied-mask':isAccessDenied}]"
                    @click="showResume(actress.id)"
                >
                    <h5 class="m-0 text-nowrap">
                        <img class="card-icon" v-bind:src="cardIconPath" />
                        <ruby v-if="isNeedSplit">
                            {{SplitedName[0]}}
                            <rp>(</rp>
                            <rt>{{SplitedRuby[0]}}</rt>
                            <rp>)</rp>
                        </ruby>
                        <span v-if="isNeedSplit" :class="{'pr-1':!SplitMark}">{{SplitMark}}</span>
                        <ruby v-if="isNeedSplit">
                            {{SplitedName[1]}}
                            <rp>(</rp>
                            <rt>{{SplitedRuby[1]}}</rt>
                            <rp>)</rp>
                        </ruby>
                        <ruby v-else>
                            {{actress.name}}
                            <rp>(</rp>
                            <rt>{{actress.ruby}}</rt>
                            <rp>)</rp>
                        </ruby>
                    </h5>
                    <div v-if="isExperimentalMode()" class="actress-no">
                        <small class="text-black-50">{{actressNo}}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Data } from "../js/data.js";
import { Event } from "../js/event.js";

var splitRegex = /[‧|・|\s]/g;

export default {
    props: {
        actress: Object
    },
    computed: {
        isNeedSplit: function() {
            return splitRegex.test(this.actress.name);
        },
        SplitedName: function() {
            return this.actress.name.split(splitRegex);
        },
        SplitedRuby: function() {
            return this.actress.ruby.split(splitRegex);
        },
        SplitMark: function() {
            return this.actress.name.match(splitRegex)[0].trim();
        },
        isAccessDenied: function() {
            if (this.isExperimentalMode()) {
                return false;
            }
            return (
                this.actress.name.indexOf("アクトレス") >= 0 ||
                this.actress.name.indexOf("Actress") >= 0
            );
        },
        cardIconPath: function() {
            var $vm = this;
            var cardIcon = (
                _.find(Data.getAll("chara"), function(chara) {
                    return (
                        chara.actressId == $vm.actress.id &&
                        chara.rare >= 4 &&
                        !chara.anotherIcon
                    );
                }) || {}
            ).battleIcon;
            if (!cardIcon) {
                return "";
            }
            return "../img/chara/" + cardIcon + ".png";
        },
        actressNo: function() {
            var idStr = this.actress.idStr || "__";
            return idStr.split("_")[1];
        }
    },
    methods: {
        showResume: function(id) {
            //Event.$emit("render", id);
            location.href = "#!/actress/" + id;
        }
    }
};
</script>
<style scoped>
.actress-card {
    transition: all 0.5s ease-in-out;
    width: 100%;
    display: inline-block;
    padding: 0 0.5rem;
    margin: 0.5rem 0;
    position: relative;
    cursor: pointer;
}

@media (min-width: 576px) {
    .actress-card {
        width: 50%;
    }
}

@media (min-width: 768px) {
    .actress-card {
        width: 33.33333333%;
    }
}

@media (min-width: 992px) {
    .actress-card {
        width: 25%;
    }
}

@media (min-width: 1366px) {
    .actress-card {
        width: 20%;
    }
}

.actress-card .card-icon {
    width: 72px;
    height: 72px;
    border-right: 1px solid rgba(0, 0, 0, 0.125);
    box-sizing: content-box;
    border-radius: 0.25rem 0 0 0.25rem;
}

.actress-card .actress-no {
    position: absolute;
    right: 0.25rem;
    bottom: 0;
}
</style>

