// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
import infiniteScroll from 'vue-infinite-scroll'
import axios from 'axios';
import App from './App';
import router from './router';
import filters from './filters'
import store from './store'

Vue.config.productionTip = false;
Vue.prototype.$http = axios
Vue.prototype.$bus = new Vue()
/* eslint-disable global-require */
Vue.use(VueLazyLoad, {
  loading: require('./assets/loading-svg/loading-bars.svg'),
})
Vue.use(infiniteScroll)
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
