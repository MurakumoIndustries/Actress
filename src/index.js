import '@popperjs/core'
import 'bootstrap';

import './style.scss'

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.start();

import Ui from './js/ui.js';
import Router from './js/router.js';
import { Data } from './js/data.js'
import { Event } from "./js/event.js";

NProgress.set(0.1);
Vue.prototype.Ui = Ui;
NProgress.set(0.3);
Data.init().then(function () {
    NProgress.set(0.6);
    if ('serviceWorker' in navigator) {
        if (localStorage["MI_Actress_Disable_Cache"] !== "true") {
            //register sw
            navigator.serviceWorker.register('./sw.js').then(reg => {
                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    console.log("installing", newWorker);
                    Event.$emit('new-version-updating');

                    newWorker.addEventListener('statechange', event => {
                        switch (newWorker.state) {
                            case "activated": {
                                console.log("activated", event);
                                Event.$emit('new-version-update-ready');
                                break;
                            }
                            default:
                                break;
                        }
                    });
                });
            });
            console.log('PWA Enabled!');
        }
        else {
            navigator.serviceWorker.getRegistrations().then(function (registrations) {
                for (let registration of registrations) {
                    registration.unregister();
                }
            });
            console.log('PWA Disabled!');
        }
    }
    NProgress.set(0.9);
    Router.init();
    NProgress.done();
});