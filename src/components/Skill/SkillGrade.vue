<template>
    <div>
        <div :title="openGradeMasterLevel.length < i ? '' : ('MLv.' + openGradeMasterLevel[i - 1])"
            :class="['dot', { 'dot-available': i <= grade }]" v-for="i in maxGrade">
        </div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            maxGrade: 4
        };
    },
    props: {
        grade: Number,
        openGradeMasterLevel: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    computed: {
        tag: function () {
            return Data.get('skilltag', this.skillSlot.tagId);
        },
        skillGroup: function () {
            return Data.get('skillgroup', this.skillSlot.skillGroupId);
        }
    }
};
</script>
<style lang="scss" scoped>
.dot {
    height: 0.5rem;
    width: 0.5rem;
    border: 1px black solid;
    background-color: transparent;
    border-radius: 50%;
    display: inline-block;
}

.dot.dot-available {
    background-color: #2949f0;
}
</style>