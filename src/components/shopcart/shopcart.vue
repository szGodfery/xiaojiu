<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车</h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li>
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <!--商品列表-->
          <div class="cart-box">
            <input id="jsondata" name="jsondata" type="hidden">
            <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
              <tbody>
                <tr>
                  <th width="48" align="center">
                    <a>选择</a>
                  </th>
                  <th align="left" colspan="2">商品信息</th>
                  <th width="84" align="left">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="left">金额(元)</th>
                  <th width="54" align="center">操作</th>
                </tr>
                <!-- 购物车商品列表展示 -->
                <tr v-for="(item,index) in goodsList" :key="item.id">
                  <td width="48" align="center">
                    <el-switch v-model="item.isSelected" active-color="#409eff" inactive-color="#555555">
                    </el-switch>
                  </td>
                  <td align="left" colspan="2">
                    <div style="display:flex;align-items:center;"><img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                      <span>{{item.title}}</span>
                    </div>
                  </td>
                  <td width="84" align="left">{{item.sell_price}}</td>
                  <td width="120" align="center">

                    <!-- 此处用子组件进行 + - 运算 -->
                    <input-number :initBuycount="item.buycount" :goodid="item.id" @goodCountChange="gdChange"></input-number>

                  </td>
                  <td width="104" align="left">{{item.sell_price * item.buycount}}</td>
                  <td width="54" align="center">
                    <el-button type="text" @click="open2(item.id,index)">删除</el-button>
                  </td>
                </tr>
                <tr v-if="goodsList.length === 0">
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th align="right" colspan="8">
                    已选择商品
                    <b class="red" id="totalQuantity">{{getTotalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount">{{getTotalPrice}}</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button class="button" @click="ContinueBuy">继续购物</button>
              <button class="submit" @click="Settlement">立即结算</button>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>
 <style>
.el-table thead th {
  background-color: #f5f5f5;
}
</style>
 


 <script>
//导入本地存储获取方法
import { getLocalGoods } from "../../common/localStorageTool.js";
//导入子组件
import inputNumber from "../subcomponents/inputNumber";

//导出vue 实例
export default {
  // 注册子组件
  components: {
    inputNumber
  },

  //获取localStorage的数据
  data() {
    return {
      goodsList: [] //购买数据
    };
  },
  created() {
    this.getGoodBuyList();
  },
  computed: {
    //计算属性,监听总数和总的价格
    getTotalCount() {
      let totalCount = 0;
      this.goodsList.forEach(goods => {
        if (goods.isSelected) {
          totalCount += goods.buycount;
        }
      });
      return totalCount;
    },
    getTotalPrice() {
      let totalPrice = 0;
      this.goodsList.forEach(goods => {
        if (goods.isSelected) {
          totalPrice += goods.buycount * goods.sell_price;
        }
      });
      return totalPrice;
    }
  },
  methods: {
    getGoodBuyList() {
      //获取商品购买信息列表
      const goodsinfo = getLocalGoods();
      // console.log(goodsinfo)
      //{88: 7, 90: 33}
      const ids = Object.keys(goodsinfo);
      if (ids.length === 0) return;
      const idstr = ids.join(",");
      this.$axios.get(`site/comment/getshopcargoods/${idstr}`).then(success => {
        success.data.message.forEach(function(goods) {
          goods.buycount = goodsinfo[goods.id]; //遍历数组的每一个元素,把数组里面的buycount 设置成本地存储的对象的key对应的值
          goods.isSelected = true; //switch的开关
        });
        this.goodsList = success.data.message;
      });
    },
    // 子组件传递给父组件处理函数
    gdChange(noteinfo) {
      // noteinfo ==={goodid: 88, buycount: 7}
      this.goodsList.forEach(goods => {
        if (goods.id == noteinfo.goodsid) {
          goods.buycount = noteinfo.goodsCount;
        }
      });
    },
    // 删除方法
    open2(goodsid, index) {
      this.$confirm("确定删除商品吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          //console.log(buycount)//产品id
          const noteinfo = {
            goodsid: goodsid
          };
          this.$store.commit("delGoods", noteinfo); //触发index.js中的仓库的mutations 的delGoods方法更新数据
          //重新渲染页面
          // this.getGoodBuyList()
          //直接删除googlist中
          this.goodsList.splice(index, 1);
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: ''
          // });
        });
    },
    //继续购物
    ContinueBuy() {
      this.$router.push({ path: "/goodlist" });
    },
    //立即结算
    Settlement() {
      const goodsid = [];
      this.goodsList.forEach(goods => {
        if(goods.isSelected){
          goodsid.push(goods.id);
        }
      });
      if (goodsid.length === 0) {
        this.$message({
          message: "至少选择一条商品进行结算",
          type: "warning"
        });
        return;
      }

      this.$router.push({
        path: "/order",
        query: { goodsid: goodsid.join(",") }
      });
    }
  }
};
</script>
 
