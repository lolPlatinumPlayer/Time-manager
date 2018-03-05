<template>
    <div id="box">
        <h2>追踪完成</h2>
        <p v-if="!isLogin">登录帐号即可将记录保存到云端</p>
        <h3>本次实际完成时间信息如下</h3>
        <!--下个标签是显示【实际时间】的表格-->
        <div class="table-wrap">
            <table class="table">
                <tr>
                    <td>时间段名称</td>
                    <td v-for="(a,index) in totalSubmission.trackingTime_total" :key="index">
                        {{a.name}}
                    </td>
                </tr>
                <tr>
                    <td>开始时间</td>
                    <td v-for="(a,index) in totalSubmission.trackingTime_total"
                        :key="index"
                        :class="a.status==='进行中'||
                        a.status==='延迟完成'?'td_ongoing':null">
                        {{a.trackingDayBegin_clockTime}}
                    </td>
                </tr>
                <tr>
                    <td>结束时间</td>
                    <td v-for="(a,index) in totalSubmission.trackingTime_total"
                        :key="index"
                        :class="a.status==='进行中'||
                        a.status==='延迟完成'?'td_ongoing':null">
                        {{a.trackingDayEnd_clockTime}}
                    </td>
                </tr>
                <tr>
                    <td>持续时长</td>
                    <td v-for="(a,index) in totalSubmission.trackingTime_total"
                        :key="index"
                        :class="a.status==='进行中'||
                        a.status==='延迟完成'?'td_ongoing':null">
                        {{a.timeLength_dailyFormat}}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>

    import {mapState, mapGetters, mapMutations,mapActions} from 'vuex'



    export default {
        computed:{
            ...mapState([
                'isLogin',
                'totalSubmission'
            ])
        }
    }



</script>

<style lang="less">


</style>
