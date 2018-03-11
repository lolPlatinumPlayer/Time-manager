

import Vue from 'vue'

//获取以秒为单位的当前时间
import {GetTimeNow_s} from '../functions.js'
import {AutofitTimeFormat} from '../functions.js'
//输入getters及timeSlotId返回带有这个timeSlotId的dragbarP1的序号
import {GetDragbarGetterIndex} from '../functions.js'

//声明一个变量用来装state初始值
let originalState

//设置各阶段拖拽条默认时间长度的数组
const dragBarDefaultLengthArr=[
    600,600,1200,1800,2400,3600,4200,
    5400,7200,9000,10800,12600,14400,16200
]


const FinishTimeSlot=function(s,p){
    //“进行中”状态时
    if(s.dragBar[p].status==='进行中'){
        s.dragBar[p].status='完成'
        const now_clockTime=GetTimeNow_s()
        // 计算出可以从末端减去的时间
        const timeWeCanMinus=s.dragBar[p].end- now_clockTime+ s.beginTrackingTime.timeInOneDay
        //将点击“完成”按钮时间条结尾变成现在的时间
        s.dragBar[p].end=now_clockTime-s.beginTrackingTime.timeInOneDay
        //调整该时间块后的各个时间节点
        s.dragBar.forEach(function(currentValue, index) {
            if(index>p){
                currentValue.begin=currentValue.begin-timeWeCanMinus
                currentValue.end=currentValue.end-timeWeCanMinus
            }
        })
        s.timeLength-=timeWeCanMinus
    }
    //“未确认”状态时
    if(s.dragBar[p].status==='未确认'||s.dragBar[p].status==='延迟完成'){
        s.dragBar[p].status='完成'
    }
}

//两个功能：
//1、如果状态是'进行中'则 推迟结束的时间，直到点击完成
//2、如果状态是'延迟完成'则 改为'进行中'
const DelayEnd=function (s,p){
    //1、如果状态是'进行中'
    if(s.dragBar[p].status==='进行中'){
        s.dragBar[p].status='延迟完成'
        //建立每秒循环
        const JudgeEveryS=setInterval(function () {
            const timeInOneDay=s.timeNow.timeInOneDay
            const sAfterBeginTracking=timeInOneDay-s.beginTrackingTime.timeInOneDay
            //如果该时间段结尾小于 目前开始追踪后的秒数
            //且 该时间段的'完成'按钮 还未被点击
            //则 延长s.timeLength 及 推迟后续时间段的开始、结束时间
            if (s.dragBar[p].end<sAfterBeginTracking
                &&
                s.dragBar[p].status==='延迟完成')
            {
                s.dragBar[p].end=sAfterBeginTracking
                s.timeLength++
                s.dragBar.forEach(function(currentValue, index) {
                    if(index>p){
                        currentValue.begin++
                        currentValue.end++
                    }
                })
            }
            //如果状态不是'延迟完成'则代表 该时间段的'完成'按钮 已经被点击
            //则取消每秒循环
            else if(s.dragBar[p].status!=='延迟完成'){
                clearInterval(JudgeEveryS)
            }
        },1000)
    }
    //2、如果状态是'延迟完成'
    else if(s.dragBar[p].status==='延迟完成'){
        s.dragBar[p].status='进行中'
    }
}

//设置lastDragbarTimeLength
const SetLastDragbarTimeLength=(s)=>{
    const dragBarP1=this.getters.dragBarP1
    setTimeout(function () {
        s.lastDragbarTimeLength=dragBarP1[dragBarP1.length-1].timeLength_dailyFormat
    },0)
}




export default {

    //设置“分配时间”的总时长,并根据该时长设置默认时间段长度（拖拽条宽度）
    InputTimeLength(s,p){
        const wrapThis=this
        //验证格式的函数
        function VerifyFormat(content) {
            const timeLength=Number(content)
            if(!timeLength){
                return "请输入数字"
            }else if(timeLength<0.5){
                return "过短的时间分配意义不大哦，来分配更多的时间吧！"
            }else if(timeLength>25) {
                return "时间一天一天分配会更好哦~"
            }
            return true
        }
        //设置单个时间块的默认时间长度
        function SetTimeslotDefaultLengt(value){

            const timeLength=Number(value)
            //将收到小时格式的时长转化为秒格式，再保存
            const timeLength_s=Math.round( timeLength*3600)
            s.timeLength=timeLength_s

            //根据timeLength_s设置dragBarDefaultLength，共有14档
            for (let i=0;i<14;i++){
                if(i*i*450+1800<=timeLength_s&&timeLength_s<=(i+1)*(i+1)*450+1800){
                    s.dragBarDefaultLength=dragBarDefaultLengthArr[i]
                    break
                }
            }
        }
        p.$prompt('以小时为单位，只能是数字，可以有小数', '输入希望分配的总时长', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass:'customClass',
            inputValidator:(content)=>VerifyFormat(content)
        }).then(({value}) => SetTimeslotDefaultLengt(value)
        ).catch(() => {
            p.$router.go(-1)
        });
    },

    //调整timeLength使其末尾与最后一个时间段末尾一致
    LetTimeLengthEndAutofit(s){
        const dragBarP1=this.getters.dragBarP1
        s.timeLength=dragBarP1[dragBarP1.length-1].end
    },

    //将当前时间存进state数据————beginTrackingTime_s
    SetBeginTrackingTime(s){
        s.beginTrackingTime.timeInOneDay=GetTimeNow_s()
        s.beginTrackingTime.timeStamp=Math.ceil(new Date()/1000)
    },

    //删除拖拽条
    deleteDragBar(s, payload){
        s.dragBar[payload].show=false;
    },

    //添加拖拽条（增加state数组dragBar的子项）
    AddDragBar(s,p){
        p.$prompt('定义时间块名称', {
            confirmButtonText: '确认',
            cancelButtonText: '取消添加',
            customClass:'customClass'
        }).then(({value}) => {
            //设置s.lastDragbarTimeLength
            s.lastDragbarTimeLength=AutofitTimeFormat(s.dragBarDefaultLength)
            //增加时间块
            s.dragBar=[...s.dragBar,{
                show:true,
                name:value===''||value===null?
                    "未定义名称":
                    value,
                begin:null,
                end:null,
                status:'未完成',
                timeSlotId:s.dragBar.length
            }]
        }).catch(() => {
            console.log('代码判断：用户在添加时间条的弹窗上点了“取消”按钮')
        });
        /*
        if(name!==null){
            s.dragBar=[...s.dragBar,{
                show:true,
                name:name===''?"未定义名称":name,
                begin:null,
                end:null,
                status:'未完成',
                timeSlotId:s.dragBar.length
            }]
        }
        */
    },

    //设置lastDragbarTimeLength
    SetLastDragbarTimeLength,

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

    //设置dragBarWrapWidth
    SetDragBarWrapWidth(s,p){
        s.dragBarWrapWidth=p
    },

    //在追踪页面的时间块下点击“完成”按钮后做的操作
    FinishTimeSlot,

    //两个功能：
    //1、如果状态是'进行中'则 推迟结束的时间，直到点击完成
    //2、如果状态是'延迟完成'则 改为'进行中'
    DelayEnd,

    //“突发事件暂停”按钮
    Stop(s,now_clockTime){
        //时间指针，即开始追踪后过了的秒数
        const timeAfterBeginTracking=now_clockTime-s.beginTrackingTime.timeInOneDay
        const wrapThis=this




        //判断情况及应该操作的dragBar的序号 的部分

        //情况
        let stopCase
        //符合情况的次数,用来判断程序是否有错误
        let eligibleTimeNumber=0
        //应该操作的dragBar的序号
        let dragbarIndexShouldStop

        //如果 时间指针还没碰到拖拽条
        if(wrapThis.getters.dragBarP1[0].begin>=timeAfterBeginTracking){
            eligibleTimeNumber++
            stopCase='时间指针还没碰到拖拽条'
            dragbarIndexShouldStop=wrapThis.getters.dragBarP1[0].timeSlotId
        }else {
            //判断是否是“时间指针 在状态不为“延迟完成”的拖拽条末尾（包括拖拽条begin、end相等的情况） 或者 不在非暂停中拖拽条上但前面有拖拽条”这种情况
            //从这到下一个else if块都是这部分的内容

            //遍历dragBarP1，算出小于等于时间指针的最大的begin
            let beginArr=new Array()
            s.dragBar.forEach(function(currentValue, index) {
                if (currentValue.show===true &&
                    currentValue.begin<=timeAfterBeginTracking)
                {
                    beginArr[beginArr.length]={
                        end:currentValue.end,
                        index:index
                    }
                }
            })
            //如果时间指针超过或等于了一个显示的拖拽条的begin
            //就把 begin最大的拖拽条 赋值给maxBeginDragbar，以便后面的多次调用
            //secondMaxBeginDragbar同理
            let maxBeginDragbar,secondMaxBeginDragbar
            if(beginArr.length>0){maxBeginDragbar=beginArr[beginArr.length-1]}
            if(beginArr.length>1){secondMaxBeginDragbar=beginArr[beginArr.length-2]}
            //如果小于等于时间指针的最大的begin所在的拖拽条的end<=时间指针
            //则可以说明是“时间指针 在状态不为“延迟完成”的拖拽条末尾（包括拖拽条begin、end相等的情况） 或者 不在非暂停中拖拽条上但前面有拖拽条”这种情况
            if (beginArr.length>0&&
                maxBeginDragbar.end<=timeAfterBeginTracking&&
                !s.dragBar[maxBeginDragbar.index].status==='延迟完成')
            {
                eligibleTimeNumber++
                stopCase='时间指针 在状态不为“延迟完成”的拖拽条末尾（包括拖拽条begin、end相等的情况） 或者 不在非暂停中拖拽条上但前面有拖拽条'
                dragbarIndexShouldStop=maxBeginDragbar.index
            }
            //考虑到时间指针大于延迟拖拽条end且后面紧跟着一个拖拽条的情况maxBeginDragbar会是指针后一个拖拽条
            //因此把上面if的代码都复制了一遍，然后把maxBeginDragbar改成了secondMaxBeginDragbar
            else if (beginArr.length>1&&
                secondMaxBeginDragbar.end<=timeAfterBeginTracking&&
                !s.dragBar[secondMaxBeginDragbar.index].status==='延迟完成')
            {
                eligibleTimeNumber++
                stopCase='时间指针 在状态不为“延迟完成”的拖拽条末尾（包括拖拽条begin、end相等的情况） 或者 不在非暂停中拖拽条上但前面有拖拽条'
                dragbarIndexShouldStop=secondMaxBeginDragbar.index
            }
            //判断情况是否是“前一个显示的拖拽条的状态是“延迟完成””
            else if(beginArr.length>0&&
                    (maxBeginDragbar.end===timeAfterBeginTracking||
                     maxBeginDragbar.end===timeAfterBeginTracking-1)&&
                    s.dragBar[maxBeginDragbar.index].status==='延迟完成')
            {
                eligibleTimeNumber++
                maxBeginDragbar.end===timeAfterBeginTracking?
                    stopCase='前一个显示的拖拽条的状态是“延迟完成”，且end等于时间指针':
                    stopCase='前一个显示的拖拽条的状态是“延迟完成”，且end比时间指针小一秒'
                dragbarIndexShouldStop=maxBeginDragbar.index
            }
            //也要考虑时间指针大于延迟拖拽条end且后面紧跟着一个拖拽条的情况
            //因此把上面else if的代码都复制了一遍，然后把maxBeginDragbar改成了secondMaxBeginDragbar
            else if(beginArr.length>1&&
                    (secondMaxBeginDragbar.end===timeAfterBeginTracking||
                     secondMaxBeginDragbar.end===timeAfterBeginTracking-1)&&
                    s.dragBar[secondMaxBeginDragbar.index].status==='延迟完成')
            {
                eligibleTimeNumber++
                secondMaxBeginDragbar.end===timeAfterBeginTracking?
                    stopCase='前一个显示的拖拽条的状态是“延迟完成”，且end等于时间指针':
                    stopCase='前一个显示的拖拽条的状态是“延迟完成”，且end比时间指针小一秒'
                dragbarIndexShouldStop=secondMaxBeginDragbar.index
            }
            //判断情况是否是“时间指针在拖拽条上，且拖拽条有宽度”
            else {
                s.dragBar.forEach(function(currentValue, index) {
                    //如果有拖拽条满足下列条件，则说明是这种情况
                    if (currentValue.show===true &&
                        currentValue.begin<timeAfterBeginTracking&&
                        currentValue.end>timeAfterBeginTracking)
                    {
                        eligibleTimeNumber++
                        stopCase='时间指针在拖拽条上，且拖拽条有宽度'
                        dragbarIndexShouldStop=index
                    }
                })
            }
            //以下测试数据不要删，以后出BUG还要看
            /*if(maxBeginDragbar){
                console.group('对Stop()中maxBeginDragbar、secondMaxBeginDragbar的分析');
                console.log('maxBeginDragbar.index:',maxBeginDragbar.index);
                console.log('maxBeginDragbar.end:',maxBeginDragbar.end);
                console.log('s.dragBar[maxBeginDragbar.index].status:',s.dragBar[maxBeginDragbar.index].status);
                console.log('secondMaxBeginDragbar.index:',secondMaxBeginDragbar.index);
                console.log('secondMaxBeginDragbar.end:',secondMaxBeginDragbar.end);
                console.log('s.dragBar[secondMaxBeginDragbar.index].status:',s.dragBar[secondMaxBeginDragbar.index].status);
                console.log('timeAfterBeginTracking:',timeAfterBeginTracking);
                console.groupEnd();
            }*/
            //--------报错程序---------
            //当符合条件不是一次时
            if(eligibleTimeNumber!==1){
                console.error('符合条件不是一次，而是',eligibleTimeNumber);
            }
            //没判断出情况时
            if(stopCase===null){
                console.error('没判断出情况');
            }
            //没算出该操作的dragBar序号时
            if(dragbarIndexShouldStop===null){
                console.error('没算出该操作的dragBar序号');
            }
            //------------------------
        }

        //以下测试数据不要删，以后出BUG还要看
        /*console.group('Stop()中maxBeginDragbar、secondMaxBeginDragbar以外的数据');
        console.log('情况',stopCase);
        console.log('操作的dragbar的序号',dragbarIndexShouldStop);
        console.groupEnd();*/



        //根据 判断的情况及应该操作的dragBar的序号 进行操作

        //普通暂停拖拽条
        const stopDragbar={
            show:true,
            name:'突发事件暂停',
            begin:timeAfterBeginTracking,
            end:timeAfterBeginTracking,
            status:'进行中',
            timeSlotId:'突发事件暂停'
        }
        //端点小1的暂停拖拽条
        const stopDragbarSmaller1={
            show:true,
            name:'突发事件暂停',
            begin:timeAfterBeginTracking-1,
            end:timeAfterBeginTracking-1,
            status:'进行中',
            timeSlotId:'突发事件暂停'
        }
        switch (stopCase){
            case '时间指针还没碰到拖拽条':
                //在第一个 存在的 拖拽条前 加入'延迟完成'状态的 临时暂停 拖拽条
                s.dragBar.splice(dragbarIndexShouldStop,0,stopDragbar)
                DelayEnd(s,dragbarIndexShouldStop)
                s.stopButtonValue.ifStop=true
                break
            case '时间指针在拖拽条上，且拖拽条有宽度':
                //把拖拽条分为两部分，并且在其中间 加入'延迟完成'状态的 临时暂停 拖拽条
                const secondHalfEnd=s.dragBar[dragbarIndexShouldStop].end+1
                //截取前半部分
                s.dragBar[dragbarIndexShouldStop].end=timeAfterBeginTracking
                //截取后半部分
                const secondHalf={
                    show:true,
                    name:s.dragBar[dragbarIndexShouldStop].name,
                    begin:timeAfterBeginTracking+1,
                    end:secondHalfEnd,
                    status:'未完成',
                    timeSlotId:dragbarIndexShouldStop
                }
                //插入截取的后半部分
                s.dragBar.splice(dragbarIndexShouldStop+1,0,secondHalf)
                //插入暂停拖拽条
                s.dragBar.splice(dragbarIndexShouldStop+1,0,stopDragbar)
                DelayEnd(s,dragbarIndexShouldStop+1)
                s.stopButtonValue.ifStop=true
                break
            case '时间指针 在状态不为“延迟完成”的拖拽条末尾（包括拖拽条begin、end相等的情况） 或者 不在非暂停中拖拽条上但前面有拖拽条':
                //判断出时间指针处于哪个拖拽条后面，在其后 加入'延迟完成'状态的 临时暂停 拖拽条
                s.dragBar.splice(dragbarIndexShouldStop+1,0,stopDragbar)
                DelayEnd(s,dragbarIndexShouldStop+1)
                s.stopButtonValue.ifStop=true
                break
            case '前一个显示的拖拽条的状态是“延迟完成”，且end等于时间指针':
                //解除“延迟完成”状态，即运行拖拽条的“完成”按钮
                FinishTimeSlot(s,dragbarIndexShouldStop)
                s.stopButtonValue.ifStop=false
                //如果不是暂停拖拽条，那还应该在后面加上暂停拖拽条
                if (s.dragBar[dragbarIndexShouldStop].timeSlotId!=='突发事件暂停'){
                    //判断出时间指针处于哪个拖拽条后面，在其后 加入'延迟完成'状态的 临时暂停 拖拽条
                    s.dragBar.splice(dragbarIndexShouldStop+1,0,stopDragbar)
                    DelayEnd(s,dragbarIndexShouldStop+1)
                    s.stopButtonValue.ifStop=true
                }
                break
            case '前一个显示的拖拽条的状态是“延迟完成”，且end比时间指针小一秒':
                //解除“延迟完成”状态，即运行拖拽条的“完成”按钮
                FinishTimeSlot(s,dragbarIndexShouldStop)
                s.stopButtonValue.ifStop=false
                //如果不是暂停拖拽条，那还应该在后面加上暂停拖拽条
                if (s.dragBar[dragbarIndexShouldStop].timeSlotId!=='突发事件暂停'){
                    //判断出时间指针处于哪个拖拽条后面，在其后 加入'延迟完成'状态的 临时暂停 拖拽条
                    s.dragBar.splice(dragbarIndexShouldStop+1,0,stopDragbarSmaller1)
                    DelayEnd(s,dragbarIndexShouldStop+1)
                    s.stopButtonValue.ifStop=true
                }
                break
        }




    },

    //把分配页面所有要提交的东西放进完成后提交的总对象里
    TotalSubmissionAddAllocateTimePage(s){
        s.totalSubmission.beginTrackingTime=s.beginTrackingTime
        s.totalSubmission.allocateTime_total={...this.getters.dragBarP1}
    },

    //把分配页面所有要提交的东西放进完成后提交的总对象里
    //如果有登录的话把总对象提交到服务端
    TotalSubmissionAddTrackingTimePage(s){
        s.totalSubmission.finish= true
        s.totalSubmission.trackingTime_total=this.getters.dragBarP1
        //如果有登录的话把总对象提交到服务端
        if(s.isLogin){
            $.post(s.SERVER_END_PREFIX+"submit_time_record.php",
                {
                    password:sessionStorage.getItem('password')?
                        sessionStorage.getItem('password'):
                        localStorage.getItem('password'),
                    username:sessionStorage.getItem('username')?
                        sessionStorage.getItem('username'):
                        localStorage.getItem('username'),
                    planned_time:s.totalSubmission.allocateTime_total,
                    actual_time:s.totalSubmission.trackingTime_total,
                    begin_tracking_time:s.totalSubmission.beginTrackingTime.timeStamp
                },
                function(data){
                    if(data=='密码正确'){
                        console.log(data);
                    }else if(data){
                        alert(data)
                    }
                }
            );
        }
    },

    //改变登录信息
    ChangeLoginInfo(s,p){
        if(p.username){
            s.isLogin=p.isLogin
            s.username=p.username
        }else {
            s.isLogin=p
        }
    },

    //获取state初始值
    GetOriginalState(s){
        originalState={...s}
    },

    //重置vuex所有数据
    ResetVuex(s){
        if(s.isLogin){
            originalState.isLogin=true
            originalState.username=s.username
        }
        for(let x in s){
            s[x]=originalState[x]
        }
    }

}
