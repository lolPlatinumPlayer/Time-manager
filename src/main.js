import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import store from './store/index';
import VueRouter from "vue-router";
import Vuex from "vuex";
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);

// 模仿网上demo的路由跳转
// 有了这个function后才能实现在<router-view>中跳转路由
Vue.prototype.$goRoute = function (index) {
    this.$router.push(index)
}

new Vue({
    ...App,
    store,
    el: '#app'
})
