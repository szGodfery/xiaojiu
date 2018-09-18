// 1,导入包
import Vue from 'vue'
import VueRouter from 'vue-router'



//导入axios包做网路请求发送
import axios from "axios"
//设置baseurl
axios.defaults.baseURL = 'http://47.106.148.205:8899/'

// `withCredentials` 表示跨域请求时是否需要使用凭证  默认是false 也就是携带cookie
axios.defaults.withCredentials = true

//把方法放入到Vue原型中
Vue.prototype.$axios = axios


//2,集成
Vue.use(VueRouter)

//3,现在使用单页面开发  导入组件(以前是定义组件)
import goodlist from '../components/goods/goodlist.vue' //商品列表

import goodsinfo from '../components/goods/goodsinfo.vue' //商品详细信息

import shopcart from '../components/shopcart/shopcart.vue' //购物车信息

import order from '../components/order/order.vue' //订单信息

import login from '../components/account/login.vue' //登录信息

import pay from '../components/pay/pay.vue' //支付中心

import paySuccess from '../components/pay/paySuccess.vue' //支付成功

import vipCenter from '../components/vipCenter/vipCenter.vue' //会员中心

import myOrders from '../components/vipCenter/myOrders.vue' //我的订单

import orderInfo from '../components/vipCenter/orderInfo.vue' //订单详情




// 导入公共 bus实例
import { bus } from '../common/bus'


//4,创建路由对象
const router = new VueRouter({
    //设置路由规则
    routes: [
        { path: '/', redirect: '/goodlist' },
        { path: '/goodlist', component: goodlist },
        { path: '/goodsinfo/:id', component: goodsinfo, name: 'goodsinfo' },
        { path: '/shopcart', component: shopcart },
        { path: '/login', component: login },



        /********************以下路由需要判断是否登录 */
        { path: '/order', meta: { NeedLogin: true }, component: order },
        { path: '/pay', meta: { NeedLogin: true }, component: pay },
        { path: '/paySuccess', meta: { NeedLogin: true }, component: paySuccess },
        { path: '/vipCenter', meta: { NeedLogin: true }, component: vipCenter },
        { path: '/myOrders', meta: { NeedLogin: true }, component: myOrders },
        { path: '/orderInfo/:orderid', meta: { NeedLogin: true }, component: orderInfo }
    ],

})

//启用导航守卫,过滤网址
router.beforeEach((to, from, next) => {
    // to 将要去哪里    配合路由元信息meta 进行规制控制
    // from 来自于哪里
    // next 条件满足方向,进入下一个路由

    //把要去哪里的路径存到localstorage中
    if (to.fullPath != '/login') {
        localStorage.setItem('LastUrlPath', to.fullPath)
    }

    if (to.meta.NeedLogin) {
        // 进入到这里表示导航守卫需要对此路径进行判断是否登录
        // 判断是否有登录需要发起网路请求,因此我们把之前也到main中的axios写入到此处

        axios.get('site/account/islogin').then(success => {
            if (success.data.code == 'logined') { //表示已经登录过
                bus.$emit('ChangeShow') //改变App.vue头部显示问题
                next() //放行
            } else { //表示没有登录
                //那就跳转到登录页面,使用编程式路由
                router.push({ path: '/login' })
            }
        })
    } else {
        next()

    }





})

//5,导出路由
export default router