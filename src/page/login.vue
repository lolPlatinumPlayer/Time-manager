<template>
    <div>
        <h2>登录</h2>
        <div id='login' style=''>
            <form method='post' action='javascript:void(0)'>
                用户名: <input name='username' type='text' /><br>
                密码: <input name='password' type='password' /><br>
                <label>
                    <input name="save_password" type="checkbox"/>
                    保存密码
                </label>
                <input type='submit'
                       value='login'
                       @click="Login"/>
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
            ...mapMutations([
                'ChangeLoginInfo'
            ]),
            Login(){
                const wrapThis=this
                let $checkbox=$('#login [name="save_password"]');
                let $checkbox_checked=$checkbox.prop('checked');
                let password=$('#login input[name="password"]').val();
                let username=$('#login input[name="username"]').val();
                if($checkbox_checked){
                    localStorage.setItem('password',password)
                    localStorage.setItem('username',username)
                    localStorage.setItem('remember_password',true)
                    /*
                    //长期保留的测试代码
                    console.log('username: '+localStorage.getItem('username'));
                    console.log('password: '+localStorage.getItem('password'));*/
                }
                else{
                    localStorage.removeItem('password')
                    localStorage.removeItem('username')
                    sessionStorage.setItem('password',password)
                    sessionStorage.setItem('username',username)
                    localStorage.setItem('remember_password',false)
                    /*
                    //长期保留的测试代码
                    console.log('username: '+username);
                    console.log('password: '+password);*/
                }
                //因为两个登录代码有差别，所以并没有整合成一个函数
                $.post(wrapThis.SERVER_END_PREFIX+"login.php",
                    {
                        password:password,
                        username:username
                    },
                    function(data,status){
                        if(data=='密码正确'){
                            wrapThis.ChangeLoginInfo({
                                isLogin:true,
                                username:username
                            })
                            wrapThis.$router.go(-1)
                        }else {
                            alert(data)
                        }
                    }
                );
            }
        }
    }
</script>

<style>

</style>
