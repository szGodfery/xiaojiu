//  导入store
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 按需导入common中的添加本地存储的方法
import { addLocalGoods, conutBuy, altLocalgoods, delLocalgoods } from '../common/localStorageTool'

//创建空仓库
const store = new Vuex.Store({
    state: { //仓库数据
        conutBuy: 0 //App.vue中的购物车仓库
    },
    getters: { //获取仓库数据
        getCountBuy: (state) => { //获取名字:()=>{return state.conutBuy}
            return state.conutBuy > 0 ? state.conutBuy : conutBuy() //返回仓库数据,如果不大于0 就重新获取本地数据
        }
    },
    mutations: { //同步操作仓库数据 更改state数据的方法
        // goods==={id:goodsid,goodsCount:goodsCount}
        addGoods(state, goods) {
            //我们要把数据存到本地,然后再把本地计算好的数据,返回给state.conutBuy更新
            // state.conutBuy += goods.goodsCount
            //1,把存到本地的方法抽取出去放到common中
            state.conutBuy = addLocalGoods(goods) //调用localStorageTool.js添加本地的方法
        },
        altGoods(state, goods) {
            state.conutBuy = altLocalgoods(goods) //调用localStorageTool.js修改本地存储的方法
        },
        delGoods(state, goods) {
            state.conutBuy = delLocalgoods(goods) //调用localStorageTool.js删除本地存储的方法
        }

    }

})

//导出仓库实例

export default store