import 'popper.js'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './fonts/material-icons.css'
import './style.css'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.start();

import Ui from './js/ui.js';
import Router from './js/router.js';
import Data from './js/data.js'

NProgress.set(0.1);
Ui.init();
NProgress.set(0.3);
Data.init().then(function () {
    NProgress.set(0.9);
    Router.init();
    NProgress.done();
});
