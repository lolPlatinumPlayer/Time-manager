//没特别说明的话，该项目里所有变量，都是秒数


//lastDragbarTimeLength的computed
const lastDragbarTimeLength_computed=
{
    get() {
        return this.$store.state.lastDragbarTimeLength
    },
    set(value) {
        let timeArr,
            lastDragbarTimeLength
        const setterThis=this

        //输入的是（中文或英文）冒号格式的
        if (value.indexOf(":") >= 1 || value.indexOf("：") >= 1) {
            value.indexOf(":") >= 1 ? timeArr = value.split(":") : timeArr = value.split("：")
            console.log(timeArr);
            if (timeArr.length == 2) {
                lastDragbarTimeLength = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1])
                console.log('两段：',timeArr);
            } else if (timeArr.length == 3) {
                lastDragbarTimeLength = parseInt(timeArr[0]) * 3600 + parseInt(timeArr[1] * 60) + parseInt(timeArr[2])
                console.log('三段：',timeArr);
            } else {
                alert('“:”只允许输入一个或者两个（请检查最后一个时间段的“结束时间”格式是否正确）')
            }
            SubmitLastDragbarTimeLength()
        }

        //输入的是中文时分秒格式的
        else {
            const ifShi = value.indexOf("时") >= 1,
                ifFen = value.indexOf("分") >= 1,
                ifMiao = value.indexOf("秒") >= 1
            switch (true) {
                //只有 时 的情况
                case ifShi === true && ifFen === false && ifMiao === false:
                    timeArr = value.split("时")
                    lastDragbarTimeLength = parseInt(timeArr[0]) * 3600
                    break
                //只有 时、分 的情况
                case ifShi === true && ifFen === true && ifMiao === false:
                    timeArr = value.split("时")
                    timeArr[1] = timeArr[1].split('分')
                    lastDragbarTimeLength = parseInt(timeArr[0]) * 3600 + parseInt(timeArr[1][0]) * 60
                    break
                //只有 时、秒 的情况
                case ifShi === true && ifFen === false && ifMiao === true:
                    timeArr = value.split("时")
                    timeArr[1] = timeArr[1].split('秒')
                    lastDragbarTimeLength = parseInt(timeArr[0]) * 3600 + parseInt(timeArr[1][0])
                    break
                //有 时、分、秒 的情况
                case ifShi === true && ifFen === true && ifMiao === true:
                    timeArr = value.split("时")
                    timeArr[1] = timeArr[1].split('分')
                    timeArr[1][1] = timeArr[1][1].split('秒')
                    lastDragbarTimeLength = parseInt(timeArr[0]) * 3600 + parseInt(timeArr[1][0]) * 60 + parseInt(timeArr[1][1][0])
                    break
                //只有 分 的情况
                case ifShi === false && ifFen === true && ifMiao === false:
                    timeArr = value.split("分")
                    lastDragbarTimeLength = parseInt(timeArr[0]) * 60
                    break
                //只有 分、秒 的情况
                case ifShi === false && ifFen === true && ifMiao === true:
                    timeArr = value.split("分")
                    timeArr[1] = timeArr[1].split('秒')
                    lastDragbarTimeLength = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1][0])
                    break
                //只有 秒 的情况
                case ifShi === false && ifFen === false && ifMiao === true:
                    timeArr = value.split("秒")
                    lastDragbarTimeLength = parseInt(timeArr[0])
                    break
                //格式不正确情况
                default:
                    alert('请检查输入的“结束时间”格式是否正确（仅支持冒号格式或者时分秒格式）')
            }
            SubmitLastDragbarTimeLength()
        }

        //验证计算结果，如果正确则提交
        function SubmitLastDragbarTimeLength() {
            const begin = setterThis.dragBarP1[setterThis.dragBarP1.length - 1].begin,
                end = begin + lastDragbarTimeLength
            if(lastDragbarTimeLength<0){
                alert('时间不能为负数')
            }else if(end> setterThis.timeLength) {
                alert('您设置的时间长度超过了限制，请重新设置')
            }else {
                //提交
                let payloadEnd = {}
                payloadEnd.index = setterThis.dragBarP1.length - 1
                payloadEnd.attr = 'end'
                payloadEnd.value = end
                setterThis.$store.commit('SetDragbarSubkeyAttr', payloadEnd)
                setterThis.$store.commit('SetLastDragbarTimeLength')
                //去除table__input__can的提示样式
                $('.table__input__can').removeClass('table__input__can')
            }
        }

    }
}

//获取以秒为单位的当前时间（从今天零点到现在过了的秒数）
function GetTimeNow_s() {
    const now=new Date(),
        hour=now.getHours(),
        minutes=now.getMinutes(),
        seconds=now.getSeconds();
    return hour*3600+minutes*60+seconds
}

/*
  将秒数转为时间格式，自动适配单位
  第一个参数是秒数，第二个参数是格式种类
*/
function AutofitTimeFormat(timeStampInput,clockTimeOrTimelength) {

    const timeStamp=Math.round(timeStampInput)
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

//输入getters及timeSlotId返回带有这个timeSlotId的dragbarP1的序号
const GetDragbarGetterIndex=function (getters,timeSlotId) {
    //如果不存在带有这个timeSlotId的dragbarP1元素，则返回 -999
    let dragbarGetterIndex=-999
    getters.dragBarP1.forEach(function(currentValue, index) {
        if(currentValue.timeSlotId==timeSlotId){
            dragbarGetterIndex=index
        }
    })
    return dragbarGetterIndex
}

//输入时间指针和getters
//返回指针上的拖拽条 的序号
//如果指针上没有拖拽条，则返回 -999
const DragBarP1IndexOnPointer=function (timePointer,getters) {
    //如果不存在带有这个timeSlotId的dragbarP1元素，则返回 -999
    let dragBarP1Index=false
    let i=0
    getters.dragBarP1.forEach(function(currentValue, index) {
        if(
            //拖拽条begin!==end的情况
            (currentValue.begin<timePointer&&
            timePointer<=currentValue.end)
            ||
            //拖拽条begin===end的情况
            currentValue.begin===timePointer===currentValue.end)
        {
            dragBarP1Index=index
            i++
            //在选到非任务元素时进行报错
            if(isNaN(currentValue.timeSlotId)){
                console.error('这个函数算出的拖拽条不是正常的任务');
            }
        }
        if(i>1){
            console.error('时间指针指向了多个拖拽条，数量为：'+i);
        }
    })
    return dragBarP1Index
}


export{lastDragbarTimeLength_computed,GetTimeNow_s,AutofitTimeFormat,GetDragbarGetterIndex,DragBarP1IndexOnPointer}