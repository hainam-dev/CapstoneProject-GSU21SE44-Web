/*
 =========================================================
 * Vue Black Dashboard - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/black-dashboard
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import VueAxios from 'vue-axios';
import axios from 'axios';
import Vue from "vue";
import VueRouter from "vue-router";
import RouterPrefetch from "vue-router-prefetch";
import App from "./App";
import firebase from "firebase/app";
import config from "./config";
import 'bootstrap/dist/css/bootstrap.min.css'
const firebaseConfig = config.firebaseConfig;
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import store from "./store";
import Router from 'vue-router'
import "firebase/auth";

library.add(faFontAwesome);
// register component
Vue.component("font-awesome-icon", FontAwesomeIcon);

// TIP: change to import router from "./router/starterRouter"; to start with a clean layout
import router from "./router/index";

import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);
import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n";
import "./registerServiceWorker";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'

import firebaseMessaging from './services/repositories/firebase'

Vue.prototype.$messaging = firebaseMessaging
Vue.use(VueAxios,axios);

import Repository from "./services/repositories/RepositoryFactory";
// import CKEditor from 'ckeditor4-vue';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import VueMeta from 'vue-meta'
Vue.use(VueMeta, {
  keyName: 'head'
})
// Vue.use( CKEditor );
Vue.use(CKEditor)
Vue.prototype.$repository=Repository;
Vue.use(Router)
Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);
Vue.use(ElementUI,{locale});
Vue.config.productionTip = false
// firebase.initializeApp(firebaseConfig);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
