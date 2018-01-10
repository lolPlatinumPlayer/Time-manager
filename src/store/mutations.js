

import Vue from 'vue'
//获取以秒为单位的当前时间
function GetTimeNow_s() {
    const now=new Date(),
        hour=now.getHours(),
        minutes=now.getMinutes(),
        seconds=now.getSeconds();
    return hour*3600+minutes*60+seconds
}
export default {
    //设置“分配时间”的总时长
    InputTimeLength(s){
        let timeLength=Number(prompt("输入希望分配的时长（以小时为单位，可以有小数）"))
        while (!timeLength||timeLength<0.5||timeLength>25){
            if(!timeLength){
                timeLength=Number(prompt("请输入数字"))
            }else if(timeLength<0.5){
                timeLength=Number(prompt("过短的时间分配意义不大哦，来分配更多的时间吧！"))
            }else {
                timeLength=Number(prompt("时间一天一天分配会更好哦~"))
            }
        }
        //将收到小时格式的时长转化为秒格式，再保存
        const timeLength_s=Math.round( timeLength*3600)
        s.timeLength=timeLength_s
    },
    //调整timeLength使其末尾与最后一个时间段末尾一致
    LetTimeLengthEndAutofit(s){
        const dragBarP1=this.getters.dragBarP1
        console.log('name',dragBarP1[dragBarP1.length-1].name);
        console.log('toEndTime_s',dragBarP1[dragBarP1.length-1].toEndTime_s);
        s.timeLength=dragBarP1[dragBarP1.length-1].toEndTime_s
    },
    //将当前时间存进state数据————beginTrackingTime_s
    SetBeginTrackingTime(s){
        s.beginTrackingTime.timeInOneDay=GetTimeNow_s()
        s.beginTrackingTime.timeStamp=Math.ceil(new Date()/1000)
    },
    //删除拖拽条
    deleteDragBar(state, payload){
        state.dragBar[payload].show=false;
    },
    //添加拖拽条
    addDragBar(state){
        const name=prompt("定义时间名称")
        if(name!==null){
            state.dragBar=[...state.dragBar,{
                show:true,
                name:name===''?"未定义名称":name,
                left:null,
                right:null
            }]
        }
    },
    //给state数据dragBar的子项的指定属性赋值
    SetDragbarSubkeyAttr(s,p){
        if(p.index===undefined){
            console.error('payload.index is not exist. (did not stop code)');
        }
        if(p.attr===undefined){
            console.error('payload.attr is not exist. (did not stop code)');
        }
        if(p.value===undefined){
            console.error('payload.value is not exist. (did not stop code)');
        }
        eval('s.dragBar['+p.index+'].'+p.attr+'='+p.value)
    },
    //设置时间类型
    SetTimeType(s,p){
        s.totalSubmission.timeType=p
    },
    //每秒更新state数据timeStampNow
    GetTimeStampNow(s){
        setInterval(function(){
            s.timeStampNow=Math.ceil(new Date()/1000)
        },1000)
    }
}