<template>
    <span v-if="show" :class="['attr-text',attrClass]">{{internalText}}</span>
</template>
<script>
var attrTypeList = [
    "normal",
    "thunder",
    "gravity",
    "fire",
    "ice",
    "light",
    "collapse",
    "theory",
    "nothing",
];

export default {
    props: {
        text: [String, Number],
        attribute: Number,
        attribute2nd: Number,
        attrList: Array,
    },
    computed: {
        internalText: function () {
            if (this.text) {
                return text;
            } else if (this.attribute) {
                return this.Ui.getText("attribute", this.attribute);
            } else if (this.attribute2nd) {
                return this.Ui.getText("attribute", this.attribute2nd);
            }
            return _.find(this.attrList, function (o, i) {
                return o !== undefined && o !== 0;
            });
        },
        attrTypeIndex: function () {
            var index = 0;
            if (this.attribute) {
                index = attribute;
            } else if (this.attribute2nd) {
                index = this.attribute2nd - 4;
            } else if (this.attrList.length) {
                index = _.findIndex(this.attrList, function (o, i) {
                    return o !== undefined && o !== 0;
                });
            }
            return index;
        },
        attrClass: function () {
            return "attr-" + attrTypeList[this.attrTypeIndex];
        },
        show: function () {
            return this.attrTypeIndex>=0&&this.attrTypeIndex<attrTypeList.length;
        },
    },
};
</script>
<style lang="scss" scoped>
.attr-text {
    &::before {
        content: "";
        display: inline-block;
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        width: 1rem;
        height: 1.5rem;
        margin-right: 0.25rem;
        vertical-align: top;
    }

    &.attr-normal {
        color: inherit;
    }
    &.attr-thunder {
        color: #fad558;
        &::before {
            background-image: url("./thunder.png");
        }
    }

    &.attr-gravity {
        color: #c485fd;
        &::before {
            background-image: url("./gravity.png");
        }
    }

    &.attr-fire {
        color: #fe8691;
        &::before {
            background-image: url("./fire.png");
        }
    }

    &.attr-ice {
        color: #92e8fe;
        &::before {
            background-image: url("./ice.png");
        }
    }

    &.attr-light {
        color: inherit;
    }

    &.attr-collapse {
        color: inherit;
    }

    &.attr-theory {
        color: inherit;
    }
}
</style>