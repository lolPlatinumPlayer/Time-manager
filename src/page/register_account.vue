<template>
    <div>
        <h2>注册账号</h2>
        <div id='register_account' style=''>
            <form method='post' action='javascript:void(0)'>
                手机号: <input name='phone' type='text' /><br>
                用户名: <input name='username' type='text' /> 提醒：用户名无法在未来进行变更<br>
                密码: <input name='password' type='text' /> 提醒：14位以内字母数字组合，字母区分大小写<br>
                验证码: <input name='verification_code' type='text' />
                <button @click="GetVerificationCode">
                    获取验证码
                </button>
                <br>
                <input type='submit' value='注册'  @click="RegisterAccount"/>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations,mapActions} from 'vuex'
    export default {
        computed:{
            ...mapState([
                    'SERVER_END_PREFIX'
            ])
        },
        methods:{
            //点击“注册按钮”
            RegisterAccount(){
                const wrapThis=this
                let phone=$('#register_account input[name="phone"]').val();
                let verification_code=$('#register_account input[name="verification_code"]').val();
                $.ajax({
                    type: "POST",
                    url: wrapThis.SERVER_END_PREFIX+"register_account.php",
                    data:{
                        verification_code:verification_code,
                        phone:phone
                    },
                    dataType: "json",
                    success: function(data){
                        if(data.msg=='注册成功'){
                            alert('注册成功~ 现在就登录吧！')
                            wrapThis.$goRoute('/login')
                        }else {
                            alert(data.msg)
                        }
                        if(data.log){
                            console.log('注册.php日志: '+data.log);
                        }
                        if(data.err){
                            console.log('注册.php错误如下: ');
                            console.log(data.err);
                        }
                    },
                    error:function(){
                        console.log('register_account.php解析错误或致命错误');
                    }
                })
            },
            //获取验证码
            GetVerificationCode(){
                const wrapThis=this
                let phone=$('#register_account input[name="phone"]').val();
                let username=$('#register_account input[name="username"]').val();
                let password=$('#register_account input[name="password"]').val();

                $.ajax({
                    type: "POST",
                    url: wrapThis.SERVER_END_PREFIX+"catch_verification_code.php",
                    data:{
                        phone:phone,
                        username:username,
                        password:password
                    },
                    dataType: "json",
                    success: function(data){
                        if(data.msg){
                            alert(data.msg)
                        }
                        console.log('catch_verification_code log: ',data['log']);
                        if(data['err']){
                            console.log('catch_verification_code err: ',data.err);
                        }
                    },
                    error:function(){
                        console.log('catch_verification_code.php解析错误或致命错误');
                    }
                })
            }
        }
    }
</script>

<style>

</style>
