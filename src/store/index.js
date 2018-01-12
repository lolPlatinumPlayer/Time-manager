
import * as func from './function.js';
import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';


const state = func.theme_local.get() || {
    dragBarDefaultWidth_dom:111,
    dragBarDefaultLength:null,
    dragBarWrapWidth:777,
    dragBar:[],
    timeLength:null,
    beginTrackingTime:{
        timeInOneDay:null,
        timeStamp:null
    },
    totalSubmission:{
        timeType:null,
        allocateTime_total:[],
        trackingTime_total:[]
    },
    timeStampNow:null,
    lastDragbarTimeLength:null
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
