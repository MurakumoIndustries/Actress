<template>
    <div class="main-container container-fluid">
        <fieldset class="w-100" v-for="item in groups" v-bind:key="item.label">
            <legend class="text-black-50 m-0" style="font-size:1.25rem" v-html="item.label"></legend>
            <div style="margin:0 -0.5rem;">
                <Card
                    v-for="actress in item.actresses"
                    v-bind:key="actress.id"
                    v-bind:actress="actress"
                />
            </div>
        </fieldset>
        <Resume/>
    </div>
</template>

<script>
import { Data } from "../js/data.js";
import { Event } from "../js/event.js";
import { Ui } from "../js/ui.js";

import Card from "./Card.vue";
import Resume from "./Resume.vue";

export default {
    data: function() {
        return {
            actressOrder: "default",
            actressList: []
        };
    },
    created: function() {
        var $vm = this;
        Event.$on("change-actress-order", function(e) {
            $vm.actressOrder = e;
        });

        $vm.actressList = Data.getAll("actress");
        _.each($vm.actressList, function(actress, i) {
            actress.exactress = {};
            _.each(Data.getAll("chara"), function(chara, i) {
                if (chara.actressId == actress.id && chara.exActressId) {
                    actress.exactress = Data.get(
                        "exactress",
                        chara.exActressId
                    );
                    return false;
                }
            });
        });
    },
    computed: {
        groups: function() {
            var $vm = this;
            var groupList = [];
            switch ($vm.actressOrder) {
                case "weapon": {
                    _.chain($vm.actressList)
                        .groupBy(function(actress) {
                            var goodLWeapon = 999;
                            var goodSWeapon = 999;
                            _.each(Data.getAll("chara"), function(chara, i) {
                                if (
                                    chara.actressId == actress.id &&
                                    chara.maxLv >= 80
                                ) {
                                    goodLWeapon = chara.goodLWeapon;
                                    goodSWeapon = chara.goodSWeapon;
                                    return false;
                                }
                            });
                            return goodSWeapon * 1000 + goodLWeapon;
                        })
                        .toPairs()
                        .orderBy(o => o[0])
                        .fromPairs()
                        .each(function(group, weapon) {
                            weapon = Number(weapon);
                            var weaponText = "？？？";
                            if (weapon == 999999) {
                            } else if (weapon / 1000 >= 1) {
                                weaponText = Ui.getText(
                                    "weaponS",
                                    Math.floor(weapon / 1000)
                                );
                            } else if (weapon > 0) {
                                weaponText = Ui.getText("weaponL", weapon);
                            }
                            groupList.push({
                                label: weaponText,
                                actresses: group
                            });
                        })
                        .commit();
                    break;
                }
                case "attribute": {
                    _.chain($vm.actressList)
                        .groupBy(function(actress) {
                            var goodAttr = 999;
                            _.each(Data.getAll("chara"), function(chara, i) {
                                if (
                                    chara.actressId == actress.id &&
                                    chara.maxLv >= 80
                                ) {
                                    goodAttr = chara.goodAttr;
                                    return false;
                                }
                            });
                            return goodAttr;
                        })
                        .toPairs()
                        .orderBy(o => o[0])
                        .fromPairs()
                        .each(function(group, attr) {
                            attr = Number(attr);
                            var attrText = "？？？";
                            if (attr > 4 && attr < 255) {
                                attrText = Ui.getText(
                                    "attribute",
                                    Number(attr)
                                );
                            }
                            groupList.push({
                                label: attrText,
                                actresses: group
                            });
                        })
                        .commit();
                    break;
                }
                case "gojyuon": {
                    _.chain($vm.actressList)
                        .groupBy(function(o) {
                            return o.reading[0];
                        })
                        .toPairs()
                        .orderBy(o => o[0])
                        .fromPairs()
                        .each(function(group, katakana) {
                            groupList.push({
                                label: katakana,
                                actresses: group
                            });
                        })
                        .commit();
                    break;
                }
                case "age": {
                    _.chain($vm.actressList)
                        .groupBy(function(o) {
                            return o.exactress.age || o.age || "？？？";
                        })
                        .toPairs()
                        .orderBy(o => o[0])
                        .fromPairs()
                        .each(function(group, age) {
                            if (isNaN(Number(age)) == false) {
                                group = _.orderBy(
                                    group,
                                    [
                                        function(o) {
                                            return new Date(
                                                o.exactress.birthday ||
                                                    o.birthday
                                            );
                                        }
                                    ],
                                    ["desc"]
                                );
                            }
                            if (age == 29) {
                                age =
                                    "<span style='text-decoration-line: line-through;'>" +
                                    age +
                                    "</span>21";
                            }
                            groupList.push({
                                label: age,
                                actresses: group
                            });
                        })
                        .commit();
                    break;
                }
                case "blood": {
                    _.chain($vm.actressList)
                        .groupBy(function(o) {
                            return o.exactress.blood || o.blood || "？";
                        })
                        .toPairs()
                        .orderBy(function(o) {
                            var order = {
                                A: 1,
                                B: 2,
                                O: 3,
                                AB: 4
                            };
                            return order[(o[0] + "").toUpperCase()] || 99;
                        })
                        .fromPairs()
                        .each(function(group, blood) {
                            groupList.push({
                                label: blood,
                                actresses: group
                            });
                        })
                        .commit();
                    break;
                }
                case "birthday": {
                    _.chain($vm.actressList)
                        .groupBy(function(o) {
                            if (
                                isNaN(o.exactress.age || o.age) &&
                                (o.exactress.birthday || o.birthday) == "1/1"
                            ) {
                                return "？？？";
                            }
                            var month =
                                new Date(
                                    o.exactress.birthday || o.birthday
                                ).getMonth() + 1;
                            return isNaN(month) ? "？？？" : month;
                        })
                        .toPairs()
                        .orderBy(o => o[0])
                        .fromPairs()
                        .each(function(group, month) {
                            group = _.orderBy(
                                group,
                                [
                                    function(o) {
                                        return new Date(
                                            o.exactress.birthday || o.birthday
                                        );
                                    }
                                ],
                                ["asc"]
                            );
                            var monthText = isNaN(month)
                                ? month
                                : Ui.getText("month", month);
                            groupList.push({
                                label: monthText,
                                actresses: group
                            });
                        })
                        .commit();
                    break;
                }
                case "height": {
                    _.chain($vm.actressList)
                        .groupBy(function(o) {
                            return isNaN(
                                o.exactress.resumeHeight || o.resumeHeight
                            )
                                ? "？？？"
                                : Math.floor(
                                      (o.exactress.resumeHeight ||
                                          o.resumeHeight) / 5
                                  );
                        })
                        .toPairs()
                        .orderBy(o => o[0])
                        .fromPairs()
                        .each(function(group, height) {
                            group = _.orderBy(group, ["resumeHeight"], ["asc"]);
                            var heightText = isNaN(height)
                                ? height
                                : height * 5 + "+";
                            groupList.push({
                                label: heightText,
                                actresses: group
                            });
                        })
                        .commit();
                    break;
                }
                case "modelheight": {
                    _.chain($vm.actressList)
                        .groupBy(function(o) {
                            return isNaN(
                                o.exactress.modelHeight || o.modelHeight
                            )
                                ? "？？？"
                                : Math.floor(
                                      ((o.exactress.modelHeight ||
                                          o.modelHeight) *
                                          100) /
                                          5
                                  );
                        })
                        .toPairs()
                        .orderBy(o => o[0])
                        .fromPairs()
                        .each(function(group, height) {
                            group = _.orderBy(group, ["resumeHeight"], ["asc"]);
                            var heightText = isNaN(height)
                                ? height
                                : height * 5 + "+";
                            groupList.push({
                                label: heightText,
                                actresses: group
                            });
                        })
                        .commit();
                    break;
                }
                case "cv": {
                    _.chain($vm.actressList)
                        .groupBy(function(o) {
                            var cv = o.exactress.cv || o.cv || "？？？";
                            if (cv == "CHARA VOICE") {
                                cv = "？？？";
                            }
                            return cv;
                        })
                        .toPairs()
                        .orderBy(o => o[0])
                        .fromPairs()
                        .each(function(group, cv) {
                            groupList.push({
                                label: cv,
                                actresses: group
                            });
                        })
                        .commit();
                    break;
                }
                default: {
                    _.chain($vm.actressList)
                        .groupBy(function(o) {
                            return o.collaborationId > 0 ? 1 : 0;
                        })
                        .each(function(group, isCollabo) {
                            group = _.orderBy(
                                group,
                                ["collaborationId"],
                                ["asc"]
                            );
                            groupList.push({
                                label: Ui.getText(
                                    isCollabo == 0
                                        ? "originalchara"
                                        : "collabochara"
                                ),
                                actresses: group
                            });
                        })
                        .commit();
                    break;
                }
            }
            return groupList;
        }
    },
    components: {
        Card,
        Resume
    }
};
</script>
<style scoped>
.main-container {
    padding-top: 56px;
    overflow: hidden;
}
</style>


