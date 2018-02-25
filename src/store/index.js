
import * as func from './function.js';
import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';


const state =/* func.theme_local.get() ||*/ {
    dragBarDefaultWidth_dom:111,
    dragBarDefaultLength:null,
    dragBarWrapWidth:777,
    dragBar:[],
    timeLength:null,
    beginTrackingTime:{
        //timeInOneDay用来表示今日零点到现在的秒数
        //clockTime用来表示钟表格式的时间（基本由timeInOneDay转化而来）
        timeInOneDay:null,
        timeStamp:null
    },
    totalSubmission:{
        beginTrackingTime:null,
        allocateTime_total:null,
        trackingTime_total:null,
        finish:false
    },
    lastDragbarTimeLength:null,
    timeNow:{
        timeInOneDay:null,
        timeStamp:null
    },
    stopButtonValue:{
        ifStop:false,
        false:'突发事件暂停',
        true:'结束暂停'
    },
    isLogin:null,
    username:null,
    //设置服务端前缀（有可能在上传服务器时变更，所以统一在一个常量上，方便以后修改）
    //本地测试时应为：http://localhost/password-test/
    //上传服务器前应为：../php/
    SERVER_END_PREFIX:'http://localhost/password-test/'
}


import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
});
