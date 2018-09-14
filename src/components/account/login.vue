<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/login.html">会员登录</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit">
            <a class="selected" href="javascript:;">账户登录</a>
            <i>|</i>
            <a href="/register.html">免费注册</a>
          </div>

          <div id="loginform" name="loginform" class="login-box">
            <div class="input-box">
              <input id="txtUserName" v-model="user_name" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
            </div>
            <div class="input-box">
              <input id="txtPassword" v-model="password" type="password" placeholder="输入登录密码" maxlength="16">
            </div>
            <div class="btn-box">
              <input id="btnSubmit" @click="login" type="submit" value="立即登录">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
// 导入公共 bus实例
import {bus} from '../../common/bus.js'
export default {
  data() {
    return {
      user_name: "", //双向数据绑定用户名
      password: "" //双向数据绑定密码
    };
  },
  methods: {
    login() {
      const url = "site/account/login";
      this.$axios
        .post(url, { user_name: this.user_name, password: this.password })
        .then(success => {
          if (success.data.status == 0) {//登录成功之后,跳转回最后存下来的网站
            this.$router.push({ path: localStorage.getItem("LastUrlPath") });
            //修改App.vue中头部的显示
            //1,引入公共vue实例,解决兄弟之间传值

            bus.$emit('ChangeShow')  //改变App.vue头部显示问题

          }
        });
    }
  }
};
</script>

