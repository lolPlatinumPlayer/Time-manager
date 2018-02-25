<template>
    <div>
        <label>
            是否显示原计划时间
            <input v-model="showPlanedTime" type="checkbox"/>
        </label>
        <h2>个人页面</h2>
        <h3>您的时间记录如下</h3>
        <div v-for="each_time_record in personal_total_time_record"
             style="margin:30px auto">
            <!--日期-->
            <p style="font-weight:bold">
                {{timestampToDate(each_time_record.begin_tracking_time)}}
            </p>
            <p>实际时间</p>
            <!--下个标签是显示【实际时间】的表格-->
            <div class="table-wrap">
                <table class="table">
                    <tr>
                        <td>时间段名称</td>
                        <td v-for="(a,index) in each_time_record.actual_time" :key="index">
                            {{a.name}}
                        </td>
                    </tr>
                    <tr>
                        <td>开始时间</td>
                        <td v-for="(a,index) in each_time_record.actual_time"
                            :key="index"
                            :class="a.status==='进行中'||
                        a.status==='延迟完成'?'td_ongoing':null">
                            {{a.trackingDayBegin_clockTime}}
                        </td>
                    </tr>
                    <tr>
                        <td>结束时间</td>
                        <td v-for="(a,index) in each_time_record.actual_time"
                            :key="index"
                            :class="a.status==='进行中'||
                        a.status==='延迟完成'?'td_ongoing':null">
                            {{a.trackingDayEnd_clockTime}}
                        </td>
                    </tr>
                    <tr>
                        <td>时间长度</td>
                        <td v-for="(a,index) in each_time_record.actual_time"
                            :key="index"
                            :class="a.status==='进行中'||
                        a.status==='延迟完成'?'td_ongoing':null">
                            {{a.timeLength_dailyFormat}}
                        </td>
                    </tr>
                </table>
            </div>
            <p v-if="showPlanedTime">原计划时间</p>
            <!--下个标签是显示【原计划时间】的表格-->
            <div v-if="showPlanedTime" class="table-wrap">
                <table class="table">
                    <tr>
                        <td>时间段名称</td>
                        <td v-for="(a,index) in each_time_record.planned_time" :key="index">
                            {{a.name}}
                        </td>
                    </tr>
                    <tr>
                        <td>开始时间</td>
                        <td v-for="(a,index) in each_time_record.planned_time"
                            :key="index"
                            :class="a.status==='进行中'||
                        a.status==='延迟完成'?'td_ongoing':null">
                            {{a.trackingDayBegin_clockTime}}
                        </td>
                    </tr>
                    <tr>
                        <td>结束时间</td>
                        <td v-for="(a,index) in each_time_record.planned_time"
                            :key="index"
                            :class="a.status==='进行中'||
                        a.status==='延迟完成'?'td_ongoing':null">
                            {{a.trackingDayEnd_clockTime}}
                        </td>
                    </tr>
                    <tr>
                        <td>时间长度</td>
                        <td v-for="(a,index) in each_time_record.planned_time"
                            :key="index"
                            :class="a.status==='进行中'||
                        a.status==='延迟完成'?'td_ongoing':null">
                            {{a.timeLength_dailyFormat}}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations,mapActions} from 'vuex'

    export default {
        data(){
            return {
                personal_total_time_record:null,
                showPlanedTime:false
            }
        },
        computed:{
            ...mapState([
                'SERVER_END_PREFIX'
            ])
        },
        methods:{
            timestampToDate(timestamp) {
                const date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                const Y = date.getFullYear() ;
                const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) ;
                const D = date.getDate() ;
                return Y+'年'+M+'月'+D+'日';
            }
        },
        mounted(){
            const wrapThis=this
            //请求后端发来这个帐号的时间数据
            $.post(wrapThis.SERVER_END_PREFIX+"load_personal_time_record.php",
                {
                    password:sessionStorage.getItem('password')?
                        sessionStorage.getItem('password'):
                        localStorage.getItem('password'),
                    username:sessionStorage.getItem('username')?
                        sessionStorage.getItem('username'):
                        localStorage.getItem('username')
                },
                function(data,status){
                    //接收个人所有时间记录
                    wrapThis.personal_total_time_record=JSON.parse(data)
                    /*
                    //下面一条测试代码估计会使用多次，先不要删
                    console.log('wrapThis.personal_total_time_record:',wrapThis.personal_total_time_record);*/
                }
            );
        }
    }
</script>

<style>

</style>
