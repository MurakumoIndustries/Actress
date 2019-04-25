<template>
    <div class="actress-item" v-bind:data-id="actress.id" v-bind:data-name="actress.name">
        <div
            class="card"
            v-bind:style="{background:'linear-gradient(135deg, '+actress.imageColor+', '+actress.imageColor+' 2rem, transparent 4rem, transparent)'}"
        >
            <div class="access-denied" v-if="isAccessDenied"></div>
            <div
                :class="['card-body p-1',{'access-denied-mask':isAccessDenied}]"
                @click="showResume(actress.id)"
            >
                <h5 class="m-0">
                    <img
                        style="width:72px;height:72px;"
                        v-bind:src="actress.battleIcon&&('../img/chara/' + actress.battleIcon + '.png')"
                    >

                    <ruby v-if="isNeedSplit">
                        {{SplitedName[0]}}
                        <rp>(</rp>
                        <rt>{{SplitedRuby[0]}}</rt>
                        <rp>)</rp>
                    </ruby>
                    <span v-if="isNeedSplit">{{SplitMark}}</span>
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
            </div>
        </div>
    </div>
</template>
<script>
import { Event } from "../js/event.js";

var splitRegex = /[・|\s]/g;

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
            return this.actress.name.match(splitRegex)[0];
        },
        isAccessDenied: function() {
            if (this.isExperimentalMode()) {
                return false;
            }
            return (
                this.actress.name.indexOf("アクトレス") >= 0 ||
                this.actress.name.indexOf("Actress") >= 0
            );
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
.actress-item {
    transition: all 0.5s ease-in-out;
    width: 100%;
    display: inline-block;
    padding: 0 0.5rem;
    margin: 0.5rem 0;
    position: relative;
}

@media (min-width: 576px) {
    .actress-item {
        width: 50%;
    }
}

@media (min-width: 768px) {
    .actress-item {
        width: 33.33333333%;
    }
}

@media (min-width: 992px) {
    .actress-item {
        width: 25%;
    }
}

@media (min-width: 1366px) {
    .actress-item {
        width: 20%;
    }
}

.actress-item.actress-detail {
    flex: 0 0 100%;
    max-width: 100%;
}

.actress-item .card {
    min-height: 4.5rem;
    position: relative;
    cursor: pointer;
}

.actress-item .actress-header {
    white-space: nowrap;
}
</style>

