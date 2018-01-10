/*
  将秒数转为时间格式，自动适配单位
  第一个参数是秒数，第二个参数是格式种类
*/
function AutofitTimeFormat(timeStamp,clockTimeOrTimelength) {

    const day=Math.floor(timeStamp/86400)
    const hour=Math.floor((timeStamp-day*86400)/3600)
    const min=Math.floor((timeStamp-day*86400-hour*3600)/60)
    const s=timeStamp%60

    switch (true){
        case timeStamp<60:
            return s+'秒'
        case 60<=timeStamp&&timeStamp<3600:
            return min+'分'+s+'秒'
        case 3600<=timeStamp&&timeStamp<86400:
            switch (clockTimeOrTimelength){
                case 'clockTime':
                    return hour+'点'+min+'分'+s+'秒'
                case 'timeLength':
                    return hour+'时'+min+'分'+s+'秒'
                default:
                    console.error('neither "time" nor "timeLength"')
            }
        case 86400<=timeStamp:
            switch (clockTimeOrTimelength){
                case 'clockTime':
                    switch (day){
                        case 1:
                            return '明天'+hour+'点'+min+'分'+s+'秒'
                        case 2:
                            return '后天'+hour+'点'+min+'分'+s+'秒'
                        default:
                            console.error('num of day can not more than 2')
                    }
                case 'timeLength':
                    return day+'天'+hour+'时'+min+'分'+s+'秒'
                default:
                    console.error('neither "time" nor "timeLength"')
            }
        default:
            console.error('this fn wrong')
    }

}
export default {
    //dragBarP1是基于
    dragBarP1(s){
        let newArr=[];
        //这里的代码导致state数据也拥有了leftPct和rightPct（问题很可能跟其他代码有关联）
            s.dragBar.forEach(function(currentValue) {
            if(currentValue.show==true){
                newArr.push(currentValue)
                const leftPct=currentValue.left/s.dragBarWrapWidth,
                      rightPct=currentValue.right/s.dragBarWrapWidth,
                      newChild=newArr[newArr.length-1]
                //左、右端点距wrap最左处百分比
                newChild.leftPct=leftPct
                newChild.rightPct=rightPct
                //该拖拽条左右端距离追踪开始的秒数
                newChild.toBeginTime_s=Math.round(s.timeLength*leftPct)
                newChild.toEndTime_s=Math.round(s.timeLength*rightPct)
                //该拖拽条左右端距离追踪开始的秒数 的日常时间长度格式版本
                newChild.beginTime_timeLength=AutofitTimeFormat(newChild.toBeginTime_s,'timeLength')
                newChild.endTime_timeLength=AutofitTimeFormat(newChild.toEndTime_s,'timeLength')
                //拖拽条两端点距离 开始追踪那天零点 的秒数
                newChild.beginTime_timeStamp=newChild.toBeginTime_s+s.beginTrackingTime.timeInOneDay
                newChild.endTime_timeStamp=newChild.toEndTime_s+s.beginTrackingTime.timeInOneDay
                //从开始追踪那天来看 拖拽条两端点 的钟表时间格式
                newChild.beginTime_time=AutofitTimeFormat(newChild.beginTime_timeStamp,'clockTime')
                newChild.endTime_time=AutofitTimeFormat(newChild.endTime_timeStamp,'clockTime')
            }
        })
        return newArr
    }
};