<template>
    <div>
        <div class="row">
            <div v-for="costume in costumeList" :key="costume.id" class="col-lg-6 col-12 pb-2 px-1">
                <DetailCostumeCard :costume="costume" />
            </div>
        </div>
    </div>
</template>
<script>
import { Data } from "../js/data.js";
import DetailCostumeCard from "./DetailCostumeCard.vue";

export default {
    props: {
        actressId: Number
    },
    computed: {
        costumeList: function() {
            var $vm = this;
            return _.chain(Data.getAll("costume"))
                .filter(function(o) {
                    return o.actressId == $vm.actressId;
                })
                .sortBy(["costumeNumber", "sortPriority"])
                .value();
        }
    },
    components: {
        DetailCostumeCard: DetailCostumeCard,
    },
};
</script>


