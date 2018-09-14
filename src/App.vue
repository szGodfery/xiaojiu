<template>
  <div>
    <!-- 1,头部 -->
    <div class="header">
      <!-- 1.0 导航栏头部 -->
      <div class="head-top">
        <div class="section">
          <div class="left-box">
            <span>香港港沟</span>
            <a target="_blank" href="#"></a>
            <a target="_blank" href="#"></a>
          </div>
          <div id="menu" class="right-box">
            <span v-show="!isLoginShow">
              <router-link to="/login" class="">登录</router-link>
              <strong>|</strong>
              <a href="" class="">注册</a>
              <strong>|</strong>
            </span>
            <span v-show="isLoginShow">
              <a href="" class="">会员中心</a>
              <strong>|</strong>
              <a @click="logout">退出</a>
              <strong>|</strong>
            </span>
            <router-link to="/shopcart/" class="">
              <i id="shoppingCartCount" class="iconfont icon-cart"></i>购物车 (
              <span>
                <!-- <span>{{cartBuy}}</span>, -->
                <!-- 第二种方式,推荐使用  Vuex的store仓库方式进行数据的管理 -->
                <span>{{$store.getters.getCountBuy}}</span>
              </span>
              )
            </router-link>
          </div>
        </div>
      </div>

      <!-- 2.0 导航条 -->
      <div class="head-nav">
        <div class="section">
          <div id="menu2" class="nav-box menuhd">
            <ul>
              <li class="index">
                <a href="#/goodlist" class="">
                  <span class="out" style="top: 0px;">首页</span>
                </a>
              </li>
              <li class="news">
                <a href="#/goodlist" class="">
                  <span class="out" style="top: 0px;">每日精选</span>
                </a>
              </li>
              <li class="photo">
                <a href="#/goodlist" class="">
                  <span class="out" style="top: 0px;">秒杀专区</span>
                </a>
              </li>
              <li class="video">
                <a href="#/goodlist" class="">
                  <span class="out" style="top: 0px;">小九超市</span>
                </a>
              </li>
              <li class="down">
                <a href="#/goodlist" class="">
                  <span class="out" style="top: 0px;">会员权益</span>
                </a>
              </li>
              <li class="goods">
                <a href="#/goodlist" class="router-link-exact-active ">
                  <span class="out" style="top: 0px;">购物商城</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="search-box">
            <div class="input-box">
              <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
            </div>
            <a href="javascript:;">
              <i class="iconfont icon-search"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 2,中间部分,路由占位   goodlist -->
    <!-- <router-view @func="cartBuys"></router-view> -->
    <router-view></router-view>

    <!-- 3,底部 -->
    <div class="footer">
      <div class="section">
        <div class="foot-nav">
          <a href="">关于我们</a>
          <strong>|</strong>
          <a href="">联系我们</a>
          <strong>|</strong>
          <a href="">联系客服</a>
          <strong>|</strong>
          <a href="">合作招商</a>
          <strong>|</strong>
          <a href="">商家帮助</a>
          <strong>|</strong>
          <a href="">营销中心</a>
          <strong>|</strong>
          <a href="">隐私政策</a>
        </div>
        <div class="foot-box">
          <div class="copyright">
            <p>版权所有 小九hk </p>
            <p>公司地址： 联系电话：</p>
            <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
          </div>
          <div class="service">
            <p>周一至周日 9:00-24:00</p>
            <a href="#">
              <i class="iconfont icon-phone"></i>在线客服</a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


// 样式部分
<style>
/* 导入jquery样式 */
@import "./statics/site/jquery_plugins/hoverNav/css/style.css";

@import "./statics/site/css/style.css";
</style>


// 业务部分
<script>
// 导入jquery包
import $ from "jquery";
// 把导入的jquery挂在到window中以便后期使用
window.$ = $;
window.jQuery = $;

//导入公共bus实例,来协调兄弟之间传值
import {bus} from "./common/bus.js";

//用jquery操作dom元素,实现动画
export default {
  data() {
    return {
      cartBuy: 0,
      isLoginShow: false
    };
  },
  methods: {
    // cartBuys(cartdata){
    //   this.cartBuy+=cartdata
    // }
    logout() {
      this.$axios.get("site/account/logout").then(success => {
        if (success.data.status == 0) {
          this.isLoginShow=false
          this.$router.push({ path: "/goodlist" })
        }
      });
    }
  },
  created() {
    //接收登录组件传递过来的修改显示头部注册会员登录方法
    bus.$on("ChangeShow", () => {
      this.isLoginShow = true
    });
  },
  mounted() {
    $("#menu2 li a").wrapInner('<span class="out"></span>');
    $("#menu2 li a").each(function() {
      $('<span class="over">' + $(this).text() + "</span>").appendTo(this);
    });

    $("#menu2 li a").hover(
      function() {
        $(".out", this)
          .stop()
          .animate({ top: "48px" }, 300); // move down - hide
        $(".over", this)
          .stop()
          .animate({ top: "0px" }, 300); // move down - show
      },
      function() {
        $(".out", this)
          .stop()
          .animate({ top: "0px" }, 300); // move up - show
        $(".over", this)
          .stop()
          .animate({ top: "-48px" }, 300); // move up - hide
      }
    );
  }
};
</script>


