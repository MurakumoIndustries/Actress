<template>
    <div>
        <div class="row">
            <div v-for="accessory in accessoryList" :key="accessory.id" class="col-lg-6 col-12 pb-2 px-1">
                <DetailAccessoryCard :accessory="accessory" />
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'lodash';
import { Data } from "../js/data.js";
import DetailAccessoryCard from "./DetailAccessoryCard.vue";

export default {
    props: {
        actressId: Number,
    },
    computed: {
        accessoryList: function () {
            var $vm = this;
            return _.chain(Data.getAll("accessory"))
                .filter(function (o) {
                    return o.actressId == $vm.actressId;
                })
                .sortBy("sortPriority")
                .value();
        },
    },
    components: {
        DetailAccessoryCard: DetailAccessoryCard,
    },
};
</script>


