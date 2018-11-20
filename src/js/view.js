import $ from "jquery";
import _ from 'lodash';
import page from 'page';
import Ui from './ui.js';
import Data from './data.js'
import NProgress from 'nprogress'
import Konami from 'Konami'

var inited;

var init = function (id) {
    NProgress.start();
    clear();
    NProgress.set(0.3);
    initControl();
    NProgress.set(0.6);
    render(id);
    NProgress.done();
};
var clear = function () {
    //clear main
    //$('#main').find("img").attr('src', ''); //stop image loading when doPage
    //$('#main').empty();
};
var initControl = function () {
    if (inited) { return; }
    $('#version').text(Data.getVersion());
    initAllActress(Data.getAll('actress'));
    var showOnlyNamed = function () {
        $('.actress-item').each(function (i, o) {
            var name = $(o).data('name');
            if (name.indexOf("アクトレス") >= 0) {
                $(o).fadeOut(500, function () {
                    if ($(o).siblings('.actress-item:visible').length < 1) {
                        $(o).parents('fieldset:first').fadeOut(500);
                    }
                });
            }
            else {
                $(o).parents('fieldset:first').fadeIn(500);
                $(o).fadeIn(500);
            }
        });
    };
    var IsShowAllActressChange = function () {
        var $this = $('input[type=radio][name=IsShowAllActress]:checked');
        if ($this.val() == 'all') {
            $('fieldset').fadeIn(500);
            $('.actress-item').fadeIn(500);
        }
        else if ($this.val() == 'named') {
            showOnlyNamed();
        }
    }
    $('input[type=radio][name=IsShowAllActress]').change(function () {
        IsShowAllActressChange();
    });
    IsShowAllActressChange();

    $('#ActressOrder').change(function () {
        initAllActress(this.value);
        IsShowAllActressChange();
    });

    new Konami(function () {
        setIsExperimentalMode(!getIsExperimentalMode());
        location.reload();
    });

    inited = true;
};
var getIsExperimentalMode = function () {
    return localStorage["ExperimentalMode"] === "true" || sessionStorage["ExperimentalMode"] === "true";
};
var setIsExperimentalMode = function (value) {
    sessionStorage["ExperimentalMode"] = value;
};

var initAllActress = function (groupType) {
    var actressList = Data.getAll('actress');
    _.each(actressList, function (actress, i) {
        actress.exactress = {};
        _.each(Data.getAll('chara'), function (chara, i) {
            if (chara.actressId == actress.id && chara.exActressId) {
                actress.exactress = Data.get('exactress', chara.exActressId);
                return false;
            }
        });
    });
    var $actressContainer = $('<div class="container-fluid">');
    var template = require('../template/actressCard.html');
    var splitRegex = /[・|\s]/g;

    var renderGroup = function (label, list) {
        var $fieldset = $('<fieldset class="w-100"><legend class="text-black-50 m-0" style="font-size:1.25rem">' + label + '</legend>');
        var $container = $('<div class="row">');
        _.each(list, function (actress, i) {
            var actressItem = template({
                actress: actress,
                splitRegex: splitRegex
            });
            $container.append(actressItem);
        });
        $fieldset.append($container);
        $actressContainer.append($fieldset);
    };

    switch (groupType) {
        case 'weapon':
            {
                _.chain(actressList)
                .groupBy(function (actress) {
                    var goodLWeapon = 999;
                    var goodSWeapon = 999;
                    _.each(Data.getAll('chara'), function (chara, i) {
                        if (chara.actressId == actress.id && chara.maxLv >= 80) {
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
                .each(function (group, weapon) {
                    weapon = Number(weapon);
                    var weaponText = "？？？";
                    if (weapon == 999999) {

                    }
                    else if (weapon / 1000 >= 1) {
                        weaponText = Ui.getText('weaponS', Math.floor(weapon / 1000));
                    }
                    else if (weapon > 0) {
                        weaponText = Ui.getText('weaponL', weapon);
                    }
                    renderGroup(weaponText, group);
                })
                .commit();
                break;
            }
        case 'attribute':
            {
                _.chain(actressList)
                .groupBy(function (actress) {
                    var goodAttr = 999;
                    _.each(Data.getAll('chara'), function (chara, i) {
                        if (chara.actressId == actress.id && chara.maxLv >= 80) {
                            goodAttr = chara.goodAttr;
                            return false;
                        }
                    });
                    return goodAttr;
                })
                .toPairs()
                .orderBy(o => o[0])
                .fromPairs()
                .each(function (group, attr) {
                    attr = Number(attr);
                    var attrText = "？？？";
                    if (attr > 4 && attr < 255) {
                        attrText = Ui.getText('attribute', Number(attr));
                    }
                    renderGroup(attrText, group);
                })
                .commit();
                break;
            }
        case 'gojyuon':
            {
                _.chain(actressList)
                .groupBy(function (o) { return o.reading[0]; })
                .toPairs()
                .orderBy(o => o[0])
                .fromPairs()
                .each(function (group, katakana) {
                    renderGroup(katakana, group);
                })
                .commit();
                break;
            }
        case 'age':
            {
                _.chain(actressList)
                .groupBy(function (o) { return o.exactress.age || o.age; })
                .toPairs()
                .orderBy(o => o[0])
                .fromPairs()
                .each(function (group, age) {
                    if (isNaN(Number(age)) == false) {
                        group = _.orderBy(group, [function (o) { return new Date(o.exactress.birthday || o.birthday) }], ['desc']);
                    }
                    if (age == 29) {
                        age = "<span style='text-decoration-line: line-through;'>" + age + '</span>21';
                    }
                    renderGroup(age, group);
                })
                .commit();
                break;
            }
        case 'blood':
            {
                _.chain(actressList)
                .groupBy(function (o) { return o.exactress.blood || o.blood; })
                .toPairs()
                .orderBy(function (o) {
                    var order = {
                        "A": 1,
                        "B": 2,
                        "O": 3,
                        "AB": 4,
                    }
                    return order[(o[0] + "").toUpperCase()] || 99;
                })
                .fromPairs()
                .each(function (group, blood) {
                    renderGroup(blood, group);
                })
                .commit();
                break;
            }
        case 'birthday':
            {
                _.chain(actressList)
                .groupBy(function (o) {
                    if (isNaN(o.exactress.age || o.age) && (o.exactress.birthday || o.birthday) == "1/1") {
                        return "？？？";
                    }
                    var month = new Date(o.exactress.birthday || o.birthday).getMonth() + 1;
                    return isNaN(month) ? "？？？" : month;
                })
                .toPairs()
                .orderBy(o => o[0])
                .fromPairs()
                .each(function (group, month) {
                    group = _.orderBy(group, [function (o) { return new Date(o.exactress.birthday || o.birthday) }], ['asc']);
                    var monthText = isNaN(month) ? month : Ui.getText('month', month);
                    renderGroup(monthText, group);
                })
                .commit();
                break;
            }
        case 'height':
            {
                _.chain(actressList)
                .groupBy(function (o) { return isNaN(o.exactress.resumeHeight || o.resumeHeight) ? "？？？" : Math.floor((o.exactress.resumeHeight || o.resumeHeight) / 5); })
                .toPairs()
                .orderBy(o => o[0])
                .fromPairs()
                .each(function (group, height) {
                    group = _.orderBy(group, ['resumeHeight'], ['asc']);
                    var heightText = isNaN(height) ? height : height * 5 + "+";
                    renderGroup(heightText, group);
                })
                .commit();
                break;
            }
        case 'modelheight':
            {
                _.chain(actressList)
                .groupBy(function (o) { return isNaN(o.exactress.modelHeight || o.modelHeight) ? "？？？" : Math.floor((o.exactress.modelHeight || o.modelHeight) * 100 / 5); })
                .toPairs()
                .orderBy(o => o[0])
                .fromPairs()
                .each(function (group, height) {
                    group = _.orderBy(group, ['resumeHeight'], ['asc']);
                    var heightText = isNaN(height) ? height : height * 5 + "+";
                    renderGroup(heightText, group);
                })
                .commit();
                break;
            }
        case 'cv':
            {
                _.chain(actressList)
                .groupBy(function (o) { return o.exactress.cv || o.cv; })
                .toPairs()
                .orderBy(o => o[0])
                .fromPairs()
                .each(function (group, cv) {
                    if (cv == "CHARA VOICE") {
                        cv = "？？？";
                    }
                    renderGroup(cv, group);
                })
                .commit();
                break;
            }
        default:
            {
                _.chain(actressList)
                .groupBy(function (o) { return (o.collaborationId > 0) ? 1 : 0; })
                .each(function (group, isCollabo) {
                    group = _.orderBy(group, ['collaborationId'], ['asc']);
                    renderGroup(Ui.getText(isCollabo == 0 ? "originalchara" : "collabochara"), group);
                })
                .commit();
                break;
            }
    }

    //hide on init
    $actressContainer.find('.actress-item').hide();
    $actressContainer.find('fieldset').hide();

    $('#main').empty().append($actressContainer);
    $('.actress-item').click(function (o) {
        if (window.getSelection().toString().length) {
            return;
        }
        if ($(o.target).parents('.nav-item').length) {
            return;
        }
        var $this = $(this);
        toggle($this);
    });
    setTimeout(function () {
        //a little delay to unveil for better unveil effect
        //$('#main').find("img").unveil();
    }, 100);
};
var render = function (id) {
    console.log("render", id);
    var self = this;
    if (!id) {
        hideAll();
        return;
    }
    expandById(id);
};

var toggle = function ($this) {
    $this.finish();
    //$this.hasClass('actress-detail') ? hide($this) : expand($this);
    $this.hasClass('actress-detail') ?
        page.show('/') :
        page.show("/actress/" + $this.data('id'));
};
var expandById = function (id) {
    var $this = $('[data-id=' + id + ']');
    expand($this);
};
var expand = function ($this) {
    hideAll(true);
    //check if actress resume exists
    if ($this.find('.actress-resume').length == 0) {
        var template = require('../template/actressResume.html');
        var actress = _.extend({}, Data.get('actress', $this.data('id')));
        var charas = [];
        _.each(Data.getAll('chara'), function (o, i) {
            if (o.actressId == actress.id) {
                var chara = _.extend({}, o);
                chara.spSkill = _.extend({}, Data.get('skillactive', chara.defaultSpSkillId));
                charas.push(chara);
                if (chara.maxLv >= 80 && !actress.first80CharaId) {
                    actress.first80CharaId = chara.id;
                }
            }
        });
        if (charas.length <= 0) {
            charas = [{}];
        }

        actress.longWeapon = [];
        actress.shortWeapon = [];
        actress.arm = [];
        actress.leg = [];
        _.each(actress.longWeaponId, function (o, i) {
            actress.longWeapon.push(_.extend({}, Data.get('weapon', o)));
        });
        _.each(actress.shortWeaponId, function (o, i) {
            actress.shortWeapon.push(_.extend({}, Data.get('weapon', o)));
        });
        _.each(actress.armEquipmentId, function (o, i) {
            var arm = _.extend({}, Data.get('equipment', o));
            arm.activeSkill = _.extend({}, Data.get('skillactive', arm.activeSkill));
            actress.arm.push(arm);
        });
        _.each(actress.legEquipmentId, function (o, i) {
            var leg = _.extend({}, Data.get('equipment', o));
            leg.activeSkill = _.extend({}, Data.get('skillactive', leg.activeSkill));
            actress.leg.push(leg);
        });

        var actressResume = template({
            actress: actress,
            charas: charas,
            Ui: Ui,
            Data: Data,
            isExperimentalMode: getIsExperimentalMode(),
        });
        $this.find('.card').append(actressResume);

        $('#actress-resume-' + actress.id + ' .chara-tabs [data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var charaId = $(e.target).data('id');
            $('#actress-resume-' + actress.id + ' .chara-resume:not(#chara-resume-' + charaId + ')').hide();
            $('#actress-resume-' + actress.id + ' #chara-resume-' + charaId).fadeIn(250);
        })
    }

    $this.toggleClass('actress-detail');
    $this.find('.actress-header').fadeOut(500, function () {
        $this.find('.actress-resume').show(500, function () {
            $(window).trigger("lookup");
            $('html, body').animate({
                scrollTop: $this.position().top - 56 //remove padding
            }, 500);
        });
    });
};
var hide = function ($this, noScroll) {
    if (noScroll === undefined) {
        noScroll = false;
    }
    $this.toggleClass('actress-detail');
    $this.find('.actress-resume').hide(500, function () {
        $this.find('.actress-header').fadeIn(500, function () {
            if (noScroll) {
                return;
            }
            $('html, body').animate({
                scrollTop: $this.position().top - 56 //remove padding
            }, 500);
        });
    });
};
var hideAll = function (isBeforeExpand) {
    if (!isBeforeExpand) {
        isBeforeExpand == false;
    }
    $('.actress-detail').each(function (i, o) {
        hide($(o), isBeforeExpand || (i != 0));
    });
};

export { init };
export default { init };