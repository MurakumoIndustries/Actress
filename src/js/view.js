import _ from 'lodash';
import NProgress from 'nprogress'
import Vue from 'vue'

import { Event } from "../js/event.js"
import { Ui } from '../js/ui.js';

import App from '../App.vue'
import { Store } from '../js/store.js';

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

    document.getElementsByTagName('body')[0].setAttribute('lang', Ui.getLang());

    var $vm = new Vue({
        el: '#app',
        store: Store,
        //template: '<App/>',
        render: function (h) {
            return h('App')
        },
        components: { App }
    });

    inited = true;
};

var render = function (id) {
    console.log("render", id);
    //if (!id) {
    //    Event.$emit('render');
    //    return;
    //}
    Event.$emit('render', id);
};

export { init };
export default { init };