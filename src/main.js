import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import VueWechatTitle from 'vue-wechat-title'
import global_ from './config/constant'

import '../theme/index.css'

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.prototype.GLOBAL = global_
Vue.use(VueWechatTitle)

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})