<template>
  <div>
    <div class="jianju" style="height:75px"></div>
    <p class="h1"
       style="text-indent: 69px;">
      注册账号
    </p>
    <div class="jianju" style="height:35px"></div>
    <el-form label-width="80px" style="width:333px">
      <el-form-item label="手机号">
        <el-input v-model="phone"></el-input>
      </el-form-item>
      <el-popover
        placement="right"
        title="用户名格式要求"
        width="200"
        trigger="hover"
        content="长度在14位字符以内，只能包含中文英文数字下划线">
        <el-form-item slot="reference" label="用户名">
          <el-input v-model="username"></el-input>
        </el-form-item>
      </el-popover>
      <el-popover
        placement="right"
        title="密码格式要求"
        width="200"
        trigger="hover"
        content="6位至14位字母数字组合，区分大小写">
        <el-form-item slot="reference" label="密码">
          <el-input v-model="password" :type="isViewPassword?'text':'password'">
            <i slot="suffix"
               class="el-input__icon el-icon-view"
               :style="isViewPassword&&{color:'#66b1ff'}"
               @click="isViewPassword=!isViewPassword"
            ></i>
          </el-input>
        </el-form-item>
      </el-popover>
      <el-form-item label="验证码">
        <el-input v-model="verification_code">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="GetVerificationCode"
                   class="float-left">
          发送验证码
        </el-button>
        <el-button @click="RegisterAccount"
                   style="width:122px;"
                   class="float-right">
          注册
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
        phone: null,
        username: null,
        password: null,
        isViewPassword:false,
        verification_code: null
      }
    },
    computed: {
      ...mapState([
        'SERVER_END_PREFIX'
      ])
    },
    methods: {
      //获取验证码
      GetVerificationCode() {
        const wrapThis = this
        let phone = wrapThis.phone;
        let username = wrapThis.username;
        let password = wrapThis.password;

        $.ajax({
          type: "POST",
          url: wrapThis.SERVER_END_PREFIX + "catch_verification_code.php",
          data: {
            phone: phone,
            username: username,
            password: password
          },
          dataType: "json",
          success: function (data) {
            if (data.msg) {
              alert(data.msg)
            }
            console.log('catch_verification_code log: ', data['log']);
            if (data['err']) {
              console.log('catch_verification_code err: ', data.err);
            }
          },
          error: function () {
            console.log('catch_verification_code.php解析错误或致命错误');
          }
        })
      },
      //点击“注册按钮”
      RegisterAccount() {
        const wrapThis = this
        let phone = wrapThis.phone;
        let verification_code = wrapThis.verification_code;
        $.ajax({
          type: "POST",
          url: wrapThis.SERVER_END_PREFIX + "register_account.php",
          data: {
            verification_code: verification_code,
            phone: phone
          },
          dataType: "json",
          success: function (data) {
            if (data.msg == '注册成功') {
              alert('注册成功~ 现在就登录吧！')
              wrapThis.$goRoute('/login')
            } else {
              alert(data.msg)
            }
            if (data.log) {
              console.log('注册.php日志: ' + data.log);
            }
            if (data.err) {
              console.log('注册.php错误如下: ');
              console.log(data.err);
            }
          },
          error: function () {
            console.log('register_account.php解析错误或致命错误');
          }
        })
      }
    }
  }
</script>

<style lang="less">
</style>
