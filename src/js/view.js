import $ from "jquery";
import _ from 'lodash';
import page from 'page';
import Ui from './ui.js';
import Data from './data.js'
import NProgress from 'nprogress'
//import './lib/jquery.unveil'

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

    $('input[type=radio][name=ActressOrder]').change(function () {
        initAllActress(this.value);
        IsShowAllActressChange();
    });

    inited = true;
};
var initAllActress = function (groupType) {
    var actressList = Data.getAll('actress');
    var $actressContainer = $('<div class="container-fluid">');
    var template = require('../template/actressCard.html');
    var splitRegex = /[・|\s]/g;

    switch (groupType) {
        case 'age':
            {
                var ageList = _.groupBy(actressList, 'age');
                _.each(ageList, function (group, age) {
                    if (isNaN(Number(age)) == false) {
                        group = _.orderBy(group, [function (o) { return new Date(o.birthday) }], ['desc']);
                    }
                    if (age == 29) {
                        age = "<span style='text-decoration-line: line-through;'>" + age + '</span>21';
                    }
                    var $fieldset = $('<fieldset class="w-100"><legend class="text-black-50 m-0" style="font-size:1.25rem">' + age + '</legend>');
                    var $container = $('<div class="row">');
                    _.each(group, function (actress, i) {
                        var actressItem = template({
                            actress: actress,
                            splitRegex: splitRegex
                        });
                        $container.append(actressItem);
                    });
                    $fieldset.append($container);
                    $actressContainer.append($fieldset);
                });
                break;
            }
        case 'birthday':
            {
                var monthList = _.groupBy(actressList, function (o) {
                    if (isNaN(o.age) && o.birthday == "1/1") {
                        return "？？？";
                    }
                    var month = new Date(o.birthday).getMonth() + 1;
                    return isNaN(month) ? "？？？" : month;
                });
                _.each(monthList, function (group, month) {
                    group = _.orderBy(group, [function (o) { return new Date(o.birthday) }], ['asc']);
                    var monthText = isNaN(month) ? month : Ui.getText('month', month);
                    var $fieldset = $('<fieldset class="w-100"><legend class="text-black-50 m-0" style="font-size:1.25rem">' + monthText + '</legend>');
                    var $container = $('<div class="row">');
                    _.each(group, function (actress, i) {
                        var actressItem = template({
                            actress: actress,
                            splitRegex: splitRegex
                        });
                        $container.append(actressItem);
                    });
                    $fieldset.append($container);
                    $actressContainer.append($fieldset);
                });
                break;
            }
        case 'height':
            {
                var heightList = _.groupBy(actressList, function (o) {
                    return isNaN(o.resumeHeight) ? "？？？" : Math.floor(o.resumeHeight / 5);
                });
                _.each(heightList, function (group, height) {
                    group = _.orderBy(group, ['resumeHeight'], ['asc']);
                    var heightText = isNaN(height) ? height : height * 5 + "+";
                    var $fieldset = $('<fieldset class="w-100"><legend class="text-black-50 m-0" style="font-size:1.25rem">' + heightText + '</legend>');
                    var $container = $('<div class="row">');
                    _.each(group, function (actress, i) {
                        var actressItem = template({
                            actress: actress,
                            splitRegex: splitRegex
                        });
                        $container.append(actressItem);
                    });
                    $fieldset.append($container);
                    $actressContainer.append($fieldset);
                });
                break;
            }
        default:
            {
                $actressContainer.addClass('row');
                _.each(actressList, function (actress, i) {
                    var actressItem = template({
                        actress: actress,
                        splitRegex: splitRegex
                    });
                    $actressContainer.append(actressItem);
                });
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
                chara.spSkill = _.extend({}, Data.get('skillactive', chara.spSkillId));
                charas.push(chara);
                if (chara.maxLv >= 80 && !actress.first80CharaId) {
                    actress.first80CharaId = chara.id;
                }
            }
        });

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
        });
        $this.find('.card').append(actressResume);

        $('#actress-resume-' + actress.id + ' .chara-tabs [data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var charaId = $(e.target).data('id');
            $('#actress-resume-' + actress.id + ' .chara-img:not(#chara-img-' + charaId + ')').hide();
            $('#actress-resume-' + actress.id + ' #chara-img-' + charaId).fadeIn(250);
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