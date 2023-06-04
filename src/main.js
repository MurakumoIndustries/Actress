import '@popperjs/core'
import 'bootstrap';

import './style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueGtag from "vue-gtag";
import App from './App.vue'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.start();

import { Ui } from './js/ui';
import { Data } from './js/data'
import { useStore } from './js/store'
import { initRouter } from './js/router'

NProgress.set(0.1);

Data.init().then(function () {
    const pinia = createPinia();
    const app = createApp(App);
    app.use(pinia)
    const store = useStore();

    NProgress.set(0.3);

    if ('serviceWorker' in navigator) {
        if (localStorage[Data.const.cacheDisableKey] !== "true") {
            //register sw
            navigator.serviceWorker.register(
                import.meta.env.MODE === 'production' ? '/sw.js' : '/dev-sw.js?dev-sw',
                { type: import.meta.env.MODE === 'production' ? 'classic' : 'module' }
            ).then(reg => {
                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    console.log("installing", newWorker);
                    store.updating();

                    newWorker.addEventListener('statechange', event => {
                        switch (newWorker.state) {
                            case "activated": {
                                console.log("activated", event);
                                store.updateReady();
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

    NProgress.set(0.6);

    app.use(VueGtag, {
        config: { id: "G-PL66JLG9R9" }
    });
    app.config.globalProperties.Ui = Ui;
    app.mount('#app');

    NProgress.set(0.9);
    initRouter();
    NProgress.done();
});