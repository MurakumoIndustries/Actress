<template>
    <div class="main-container container-fluid background">
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
        <Detail />
    </div>
</template>

<script>
import { Data } from "../js/data.js";
import { Event } from "../js/event.js";
import { Ui } from "../js/ui.js";

import Card from "./Card.vue";
import Detail from "./Detail.vue";

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
                case "goodweapon": {
                    _.chain($vm.actressList)
                        .groupBy(function(actress) {
                            var goodLWeapon = 999;
                            var goodSWeapon = 999;
                            _.each(Data.getAll("chara"), function(chara, i) {
                                if (
                                    chara.actressId == actress.id &&
                                    chara.rare >= 4 &&
                                    !chara.anotherIcon
                                ) {
                                    goodLWeapon = chara.goodLWeapon;
                                    goodSWeapon = chara.goodSWeapon;
                                    return false;
                                }
                            });
                            return goodSWeapon * 1000 + goodLWeapon;
                        })
                        .toPairs()
                        .orderBy(o => Number(o[0]))
                        .each(function(group) {
                            var weapon = Number(group[0]);
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
                                actresses: group[1]
                            });
                        })
                        .commit();
                    break;
                }
                case "goodweaponsub": {
                    _.chain($vm.actressList)
                        .groupBy(function(actress) {
                            var goodLWeapon = 999;
                            var goodSWeapon = 999;
                            _.each(Data.getAll("chara"), function(chara, i) {
                                if (
                                    chara.actressId == actress.id &&
                                    chara.rare >= 4 &&
                                    !chara.anotherIcon
                                ) {
                                    goodLWeapon = 0;
                                    goodSWeapon = 0;
                                    if (
                                        !chara.goodLWeapon &&
                                        actress.longWeaponId &&
                                        actress.longWeaponId[0]
                                    ) {
                                        goodLWeapon = Data.get(
                                            "weapon",
                                            actress.longWeaponId[0]
                                        ).type;
                                    }
                                    if (
                                        !chara.goodSWeapon &&
                                        actress.shortWeaponId &&
                                        actress.shortWeaponId[0]
                                    ) {
                                        goodSWeapon = Data.get(
                                            "weapon",
                                            actress.shortWeaponId[0]
                                        ).type;
                                    }
                                    return false;
                                }
                            });
                            return goodSWeapon * 1000 + goodLWeapon;
                        })
                        .toPairs()
                        .orderBy(o => Number(o[0]))
                        .each(function(group) {
                            var weapon = Number(group[0]);
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
                                actresses: group[1]
                            });
                        })
                        .commit();
                    break;
                }
                case "damagetype": {
                    _.chain($vm.actressList)
                        .groupBy(function(actress) {
                            var damageType = 999;
                            _.each(Data.getAll("chara"), function(chara, i) {
                                if (
                                    chara.actressId == actress.id &&
                                    chara.rare >= 4 &&
                                    !chara.anotherIcon
                                ) {
                                    if (
                                        chara.goodLWeapon &&
                                        actress.longWeaponId &&
                                        actress.longWeaponId[0]
                                    ) {
                                        damageType = Data.get(
                                            "weapon",
                                            actress.longWeaponId[0]
                                        ).attribute1st;
                                    }
                                    if (
                                        chara.goodSWeapon &&
                                        actress.shortWeaponId &&
                                        actress.shortWeaponId[0]
                                    ) {
                                        damageType = Data.get(
                                            "weapon",
                                            actress.shortWeaponId[0]
                                        ).attribute1st;
                                    }
                                    return false;
                                }
                            });
                            return damageType;
                        })
                        .toPairs()
                        .orderBy(o => Number(o[0]))
                        .each(function(group) {
                            var damageType = Number(group[0]);
                            var damageTypeText = "？？？";
                            if (damageType == 999) {
                            } else {
                                damageTypeText = Ui.getText(
                                    "attribute",
                                    damageType
                                );
                            }
                            groupList.push({
                                label: damageTypeText,
                                actresses: group[1]
                            });
                        })
                        .commit();
                    break;
                }
                case "damagetypesub": {
                    _.chain($vm.actressList)
                        .groupBy(function(actress) {
                            var damageType = 999;
                            _.each(Data.getAll("chara"), function(chara, i) {
                                if (
                                    chara.actressId == actress.id &&
                                    chara.rare >= 4 &&
                                    !chara.anotherIcon
                                ) {
                                    if (
                                        !chara.goodLWeapon &&
                                        actress.longWeaponId &&
                                        actress.longWeaponId[0]
                                    ) {
                                        damageType = Data.get(
                                            "weapon",
                                            actress.longWeaponId[0]
                                        ).attribute1st;
                                    }
                                    if (
                                        !chara.goodSWeapon &&
                                        actress.shortWeaponId &&
                                        actress.shortWeaponId[0]
                                    ) {
                                        damageType = Data.get(
                                            "weapon",
                                            actress.shortWeaponId[0]
                                        ).attribute1st;
                                    }
                                    return false;
                                }
                            });
                            return damageType;
                        })
                        .toPairs()
                        .orderBy(o => Number(o[0]))
                        .each(function(group) {
                            var damageType = Number(group[0]);
                            var damageTypeText = "？？？";
                            if (damageType == 999) {
                            } else {
                                damageTypeText = Ui.getText(
                                    "attribute",
                                    damageType
                                );
                            }
                            groupList.push({
                                label: damageTypeText,
                                actresses: group[1]
                            });
                        })
                        .commit();
                    break;
                }
                case "passiveskill": {
                    _.each($vm.actressList, function(actress) {
                        _.each(Data.getAll("chara"), function(chara, i) {
                            if (
                                chara.actressId == actress.id &&
                                chara.rare >= 4
                            ) {
                                var passiveId = _.get(
                                    chara,
                                    "passiveSkills.[0].id"
                                );
                                var passive = Data.get(
                                    "skillpassive",
                                    passiveId
                                );
                                var label = _.get(passive, "name", "").substr(
                                    -4
                                );
                                var group = _.find(groupList, function(group) {
                                    return group.label == label;
                                });
                                if (!group) {
                                    groupList.push({
                                        label: label,
                                        actresses: [actress]
                                    });
                                } else if (
                                    _.find(group.actresses, function(a) {
                                        return a.id == actress.id;
                                    })
                                ) {
                                } else {
                                    group.actresses.push(actress);
                                }
                            }
                        });
                    });
                    groupList = _.orderBy(groupList, function(group) {
                        switch (group.label) {
                            case "出力特性":
                            case "威力特性":
                                return 1;
                            case "出力変性":
                            case "威力變化":
                                return 2;
                            case "変質放出":
                            case "變質放出":
                                return 3;
                            case "特質放出":
                            case "特質放出":
                                return 4;
                            case "放出特化":
                            case "放出特化":
                                return 5;
                            default:
                                return 999;
                        }
                    });
                    break;
                }
                case "attribute": {
                    _.each($vm.actressList, function(actress) {
                        _.each(Data.getAll("chara"), function(chara, i) {
                            if (
                                chara.actressId == actress.id &&
                                chara.rare >= 4
                            ) {
                                var order = chara.goodAttr;
                                var label = Ui.getText(
                                    "attribute",
                                    Number(chara.goodAttr)
                                );
                                var group = _.find(groupList, function(group) {
                                    return group.label == label;
                                });
                                if (!group) {
                                    groupList.push({
                                        label: label,
                                        order: order,
                                        actresses: [actress]
                                    });
                                } else if (
                                    _.find(group.actresses, function(a) {
                                        return a.id == actress.id;
                                    })
                                ) {
                                } else {
                                    group.actresses.push(actress);
                                }
                            }
                        });
                    });
                    groupList = _.orderBy(groupList, 'order');
                    break;
                }
                case "gojyuon": {
                    _.chain($vm.actressList)
                        .groupBy(function(o) {
                            return o.reading[0];
                        })
                        .toPairs()
                        .orderBy(o => o[0])
                        .each(function(group) {
                            groupList.push({
                                label: group[0],
                                actresses: group[1]
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
                        .orderBy(o => Number(o[0]))
                        .each(function(group) {
                            var age = group[0];
                            var list = group[1];
                            if (isNaN(Number(age)) == false) {
                                list = _.orderBy(
                                    list,
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
                                actresses: list
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
                        .each(function(group) {
                            groupList.push({
                                label: group[0],
                                actresses: group[1]
                            });
                        })
                        .commit();
                    break;
                }
                case "job": {
                    _.chain($vm.actressList)
                        .groupBy(function(o) {
                            return o.exactress.job || o.job || "？？？";
                        })
                        .toPairs()
                        .orderBy(o => o[0])
                        .each(function(group) {
                            groupList.push({
                                label: group[0],
                                actresses: group[1]
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
                        .orderBy(o => Number(o[0]))
                        .each(function(group) {
                            var list = _.orderBy(
                                group[1],
                                [
                                    function(o) {
                                        return new Date(
                                            o.exactress.birthday || o.birthday
                                        );
                                    }
                                ],
                                ["asc"]
                            );
                            var monthText = isNaN(group[0])
                                ? group[0]
                                : Ui.getText("month", group[0]);
                            groupList.push({
                                label: monthText,
                                actresses: list
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
                        .orderBy(o => Number(o[0]))
                        .each(function(group) {
                            var heightText = isNaN(group[0])
                                ? group[0]
                                : group[0] * 5 + "+";
                            groupList.push({
                                label: heightText,
                                actresses: _.orderBy(
                                    group[1],
                                    [
                                        function(o) {
                                            return (
                                                o.exactress.resumeHeight ||
                                                o.resumeHeight
                                            );
                                        }
                                    ],
                                    ["asc"]
                                )
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
                        .orderBy(o => Number(o[0]))
                        .each(function(group) {
                            var heightText = isNaN(group[0])
                                ? group[0]
                                : group[0] * 5 + "+";
                            groupList.push({
                                label: heightText,
                                actresses: _.orderBy(
                                    group[1],
                                    [
                                        function(o) {
                                            return (
                                                o.exactress.modelHeight ||
                                                o.modelHeight
                                            );
                                        }
                                    ],
                                    ["asc"]
                                )
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
                        .each(function(group) {
                            groupList.push({
                                label: group[0],
                                actresses: group[1]
                            });
                        })
                        .commit();
                    break;
                }
                case "spdtype": {
                    _.chain($vm.actressList)
                        .groupBy(function(o) {
                            if (!(o.legEquipmentId && o.legEquipmentId[0])) {
                                return 0;
                            }
                            var leg = _.extend(
                                {},
                                Data.get("equipment", o.legEquipmentId[0])
                            );
                            return leg.spdMax;
                        })
                        .toPairs()
                        .orderBy([o => Number(o[0])], ["desc"])
                        .each(function(group) {
                            var spd = group[0];
                            switch (Number(spd)) {
                                case 280:
                                    spd = Ui.getText("spdtypelight");
                                    break;
                                case 240:
                                    spd = Ui.getText("spdtypebalance");
                                    break;
                                case 200:
                                    spd = Ui.getText("spdtypeheavy");
                                    break;
                                case 0:
                                    spd = "？？？";
                                    break;
                            }
                            groupList.push({
                                label: spd,
                                actresses: group[1]
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
                                [
                                    function(o) {
                                        switch (o.collaborationId) {
                                            case 4115405917:
                                                return 1;
                                            case 1816481255:
                                                return 2;
                                            case 457342321:
                                                return 3;
                                            case 2233919698:
                                                return 4;
                                            case 4062304324:
                                                return 5;
                                            case 1797818878:
                                                return 6;
                                            case 472889704:
                                                return 7;
                                            case 2358289657:
                                                return 8;
                                            case 4221015151:
                                                return 9;
                                            case 2605718922:
                                                return 10;
                                            default:
                                                return 999;
                                        }
                                    }
                                ],
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
        Detail
    }
};
</script>
<style scoped>
.main-container {
    padding-top: 56px;
    overflow: hidden;
}
</style>


