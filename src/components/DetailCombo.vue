<template>
    <div>
        <div class="card-columns">
            <div v-for="combo in actress.combos" :key="combo.id">
                <div class="card pb-2">
                    <div class="card-header">
                        <span>{{combo.name}}</span>
                        <span class="text-black-50 float-right">{{combo.handLowerLimit}}</span>
                    </div>
                    <div class="card-body py-2 px-2">
                        <p class="card-text" v-html="Ui.renderDesc(combo.flavorText)"></p>
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
    }
};
</script>
<style scoped>
.card-columns {
    column-count: 1;
    column-gap: 10px;
}
@media (min-width: 992px) {
    .card-columns {
        column-count: 2;
    }
}
</style>


