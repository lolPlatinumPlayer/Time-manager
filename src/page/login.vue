<template>
  <div>
    <div class="jianju" style="height:75px"></div>
    <p class="h1"
       style="text-indent: 69px;">
      登录
    </p>
    <div class="jianju" style="height:35px"></div>
    <el-form label-width="80px" style="width:333px">
      <el-form-item label="用户名">
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" :type="isViewPassword?'text':'password'">
          <i slot="suffix"
             class="el-input__icon el-icon-view"
             :style="isViewPassword&&{color:'#66b1ff'}"
             @click="isViewPassword=!isViewPassword"
          ></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox class="float-left"
                     label="保存密码"
                     name="type"
                     v-model="save_password">
        </el-checkbox>
        <el-button @click="Login"
                   class="float-right">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    data() {
      return {
        username: null,
        password: null,
        save_password: null,
        isViewPassword:false,
      }
    },
    computed: {
      ...mapState([
        'SERVER_END_PREFIX'
      ])
    },
    methods: {
      ...mapMutations([
        'ChangeLoginInfo'
      ]),
      Login() {
        const wrapThis = this
        let save_password = this.save_password;
        let username = this.username;
        let password = this.password;
        if (save_password) {
          localStorage.setItem('password', password)
          localStorage.setItem('username', username)
          localStorage.setItem('remember_password', true)
          /*
          //长期保留的测试代码
          console.log('username: '+localStorage.getItem('username'));
          console.log('password: '+localStorage.getItem('password'));*/
        }
        else {
          localStorage.removeItem('password')
          localStorage.removeItem('username')
          sessionStorage.setItem('password', password)
          sessionStorage.setItem('username', username)
          localStorage.setItem('remember_password', false)
          /*
          //长期保留的测试代码
          console.log('username: '+username);
          console.log('password: '+password);*/
        }
        //因为两个登录代码有差别，所以并没有整合成一个函数
        $.post(wrapThis.SERVER_END_PREFIX + "login.php",
          {
            password: password,
            username: username
          },
          function (data, status) {
            if (data == '密码正确') {
              wrapThis.ChangeLoginInfo({
                isLogin: true,
                username: username
              })
              wrapThis.$router.go(-1)
            } else {
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
