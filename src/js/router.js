import page from 'page';
import NProgress from 'nprogress'

import { Ui } from './ui'
import { Data } from './data'
import { useStore } from './store';

function initRouter() {
    const store = useStore();

    page.base('/Actress/');

    const actressPage = function (ctx) {
        console.log("route:actressRoute", ctx);
        store.currentActressId = ctx.params.id;
    };
    page('actress/:id', actressPage);
    page('/actress/:id', actressPage);

    const langPage = function (ctx) {
        console.log("route:langRoute", ctx);
        Ui.initLanguage(ctx.params.lang);
        page.redirect('/');
    };
    page('lang/:lang', langPage);
    page.exit('lang/:lang', function () {
        location.reload();
    });
    page('/lang/:lang', langPage);
    page.exit('/lang/:lang', function () {
        location.reload();
    });

    var serverPage = function (ctx) {
        console.log("route:server", ctx);
        Data.setCurrentServer(ctx.params.server);
        page.redirect('/');
    };
    page('/server/:server', serverPage);
    page.exit('/server/:server', function () {
        NProgress.start();
        Data.init().then(function () {
            NProgress.done();
            location.reload();
        });
    });

    var forceInitPage = function (ctx) {
        console.log("route:forceInit", ctx);
        page.redirect('/');
    };
    page('/init/force', forceInitPage);
    page.exit('/init/force', function () {
        NProgress.start();
        Data.init().then(function () {
            NProgress.done();
            location.reload()
        });
    });

    page('/', function () {
        console.log("route:homeRoute");
        store.currentActressId = 0;
    });

    page('*', function (ctx) {
        console.log("route:notMatchRoute", ctx);
        page.redirect('/');
    });
    page.start({ hashbang: true });
}

export { initRouter };