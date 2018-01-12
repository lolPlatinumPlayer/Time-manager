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
            if (timeArr.length = 2) {
                lastDragbarTimeLength = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1])
            } else if (timeArr.length = 3) {
                lastDragbarTimeLength = parseInt(timeArr[0]) * 3600 + parseInt(timeArr[1] * 60) + parseInt(timeArr[2])
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
                let payloadEnd = {}
                payloadEnd.index = setterThis.dragBarP1.length - 1
                payloadEnd.attr = 'end'
                payloadEnd.value = end
                setterThis.$store.commit('SetDragbarSubkeyAttr', payloadEnd)
                setterThis.$store.commit('SetLastDragbarTimeLength')
            }
        }

    }
}


export{lastDragbarTimeLength_computed}