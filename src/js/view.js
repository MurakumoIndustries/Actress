import $ from "jquery";
import _ from 'lodash';
import page from 'page';
import Ui from './ui.js';
import Data from './data.js'
import NProgress from 'nprogress'
import './lib/jquery.unveil'

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
    initAllActress();
    var showOnlyNamed = function () {
        $('.actress-item').each(function (i, o) {
            var name = $(o).data('name');
            if (name.indexOf("アクトレス") >= 0) {
                $(o).fadeOut(500);
            }
            else {
                $(o).fadeIn(500);
            }
        })
    }
    $('input[type=radio][name=IsShowAllActress]').change(function () {
        if (this.value == 'all') {
            $('.actress-item').fadeIn(500);
        }
        else if (this.value == 'named') {
            showOnlyNamed();
        }
    });
    showOnlyNamed();
    inited = true;
};
var initAllActress = function () {
    var allActress = Data.getAll('actress');
    var template = require('../template/actress.html');
    var $actressContainer = $('<div class="container-fluid row">');
    var splitRegex = /[・|\s]/g;
    _.each(allActress, function (actress, i) {
        var chara = _.extend({}, Data.get('chara', actress.charaId));
        chara.spSkill = _.extend({}, Data.get('skillactive', chara.spSkillId));
        actress.longWeapon = _.extend({}, Data.get('weapon', actress.longWeaponId));
        actress.shortWeapon = _.extend({}, Data.get('weapon', actress.shortWeaponId));
        actress.arm = _.extend({}, Data.get('equipment', actress.armEquipmentId));
        actress.arm.activeSkill = _.extend({}, Data.get('skillactive', actress.arm.activeSkill));
        actress.leg = _.extend({}, Data.get('equipment', actress.legEquipmentId));
        actress.leg.activeSkill = _.extend({}, Data.get('skillactive', actress.leg.activeSkill));
        var actressItem = template({
            actress: actress,
            chara: chara,
            splitRegex: splitRegex,
            Ui: Ui,
            Data: Data,
        });
        $actressContainer.append(actressItem);
    });
    $actressContainer.find('.actress-item').hide(); //hide on init
    $('#main').append($actressContainer);
    $('.actress-item').click(function (o) {
        if (window.getSelection().toString().length) {
            return;
        }
        var $this = $(this);
        toggle($this);
    });
    setTimeout(function () {
        //a little delay to unveil for better unveil effect
        $('#main').find("img").unveil();
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
    $this.toggleClass('actress-detail');
    $this.find('.actress-header').fadeToggle(500, function () {
        $this.find('.actress-resume').toggle(500, function () {
            $(window).trigger("lookup");
            $('html, body').animate({
                scrollTop: $this.position().top - 56    //remove padding
            }, 500);
        });
    });
};
var hide = function ($this, noScroll) {
    if (noScroll === undefined) {
        noScroll = false;
    }
    $this.toggleClass('actress-detail');
    $this.find('.actress-resume').toggle(500, function () {
        $this.find('.actress-header').fadeToggle(500, function () {
            if (noScroll) {
                return;
            }
            $('html, body').animate({
                scrollTop: $this.position().top - 56    //remove padding
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