<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">财务系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item class=" " label="">
          <el-row>
            <el-input style="width:70%" v-model="code" placeholder="填写验证码"></el-input>
            <el-button class="validateCode" @click="sendMsg()" :disabled="isDisabled">{{buttonName}}</el-button>
          </el-row>
        </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" >登录</el-button>
      
    </el-form-item>
  </el-form>
</template>

<script>
  import { requestLogin,phoneCode } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
      code:'',
      buttonName: "发送短信",
      isDisabled: false,
      time: 60,
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      sendMsg() {
      phoneCode().then(data => {
        this.$message({
          message: "验证码已发送，5分钟内有效",
          center: true
        });
      });
      let me = this;
      me.isDisabled = true;
      let interval = window.setInterval(function() {
        me.buttonName = me.time + "后重新发送";
        --me.time;
        if (me.time < 0) {
          me.buttonName = "重新发送";
          me.time = 60;
          me.isDisabled = false;
          window.clearInterval(interval);
        }
      }, 1000);
    },
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var loginParams = { accountName: this.ruleForm2.account, accountPwd: this.ruleForm2.checkPass }
       if(loginParams.accountName=="" && loginParams.accountPwd==""){
          this.$message({
            message:"请确认输入了账号或密码",
            type:"error"
          })
       }else{
          var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            var loginParams = { accountName: this.ruleForm2.account, accountPwd: this.ruleForm2.checkPass,
            code:this.code };
            requestLogin(loginParams).then(res => {
              let { status, message, data } = res;
              if (status !== "success") {
                this.$message({
                  message: message,
                  type: 'error'
                });
              } else if(status=="success") {
                sessionStorage.setItem('accountName', JSON.stringify(loginParams.accountName));
                sessionStorage.setItem('accountID', data);//financeID
                this.$router.push({ path: '/productlist' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
       }
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>