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
                <li class="active">
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
          <div class="cart-box">
            <h2 class="slide-tit">
              <span>1、收货地址</span>
            </h2>
            <div id="orderForm" name="orderForm" url="">
              <div class="form-box address-info">
                <el-form status-icon :model="order" :rules="rules" ref="orderForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="收货人姓名" prop="accept_name">
                    <el-input style="width:500px" v-model="order.accept_name" placeholder="请输入收货人姓名"></el-input>
                  </el-form-item>
                  <el-form-item label="所属区域" prop="area">
                    <v-distpicker :province="order.area.province.value" :city="order.area.city.value" :area="order.area.area.value" @selected="onSelected"></v-distpicker>
                  </el-form-item>
                  <el-form-item label="详细地址" prop="address">
                    <el-input style="width:500px" v-model="order.address" placeholder="请输入收货人地址"> </el-input>
                  </el-form-item>
                  <el-form-item label="手机号码" prop="mobile">
                    <el-input style="width:500px" v-model="order.mobile" placeholder="请输入收货人手机"></el-input>
                  </el-form-item>
                  <el-form-item label="电子邮箱">
                    <el-input style="width:500px" v-model="order.email" placeholder="请输入邮箱"></el-input>
                  </el-form-item>
                  <el-form-item label="邮政编码">
                    <el-input style="width:200px" v-model="order.post_code" placeholder="请输入邮政编码"></el-input>
                  </el-form-item>

                </el-form>
              </div>
              <h2 class="slide-tit">
                <span>2、支付方式</span>
              </h2>
              <ul class="item-box clearfix">
                <!--取得一个DataTable-->
                <li>
                  <el-radio v-model="order.payment_id" label="6">在线支付
                    <em>手续费：0.00元</em>
                  </el-radio>
                </li>
              </ul>
              <h2 class="slide-tit">
                <span>3、配送方式</span>
              </h2>
              <ul class="item-box clearfix">
                <!--取得一个DataTable-->
                <li>
                  <el-radio-group v-model="order.express_id">
                    <el-radio label="1" @change="order.expressMoment=20">顺风
                      <em>手续费：20.00元</em>
                    </el-radio>
                    <el-radio label="2" @change="order.expressMoment=10">
                      圆通
                      <em>手续费：10.00元</em>
                    </el-radio>
                    <el-radio label="3" @change="order.expressMoment=8">
                      韵达
                      <em>手续费：8.00元</em>
                    </el-radio>
                  </el-radio-group>
                </li>
              </ul>
              <h2 class="slide-tit">
                <span>4、商品清单</span>
              </h2>
              <div class="line15"></div>
              <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                <tbody>
                  <tr>
                    <th colspan="2" align="left">商品信息</th>
                    <th width="84" align="left">单价</th>
                    <th width="84" align="center">购买数量</th>
                    <th width="104" align="left">金额(元)</th>
                  </tr>
                  <tr v-for="item in GoodList" :key="item.id">
                    <td width="68">
                      <a target="_blank" href="/goods/show-89.html">
                        <img :src="item.img_url" class="img">
                      </a>
                    </td>
                    <td>
                      <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                    </td>
                    <td>
                      <span class="red">
                        ￥{{item.sell_price}}
                      </span>
                    </td>
                    <td align="center">{{item.buycount}}</td>
                    <td>
                      <span class="red">
                        ￥{{item.buycount*item.sell_price}}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="line15"></div>
              <h2 class="slide-tit">
                <span>5、结算信息</span>
              </h2>
              <div class="buy-foot clearfix">
                <div class="left-box">
                  <dl>
                    <dt>订单备注(100字符以内)</dt>
                    <dd>
                      <textarea v-model="order.message" name="message" class="input" style="height:35px;"></textarea>
                    </dd>
                  </dl>
                </div>
                <div class="right-box">
                  <p>
                    商品
                    <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                    <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                  <p>
                    运费：￥
                    <label id="expressFee" class="price">{{order.expressMoment}}</label> 元
                  </p>
                  <p class="txt-box">
                    应付总金额：￥
                    <label id="totalAmount" class="price">{{getTotalAmount}}</label>
                  </p>
                  <p class="btn-box">
                    <a class="btn button" href="#/shopcart">返回购物车</a>
                    <input id="btnSubmit" name="btnSubmit" type="submit" value="确认提交" class="btn submit" @click="OrderSubmit">
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
//导入省市联动组件
import VDistpicker from "v-distpicker";

export default {
  components: { VDistpicker }, //局部注册
  data() {
    const checkMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号码不能为空"));
      }
      const reg = /^1[3,5,8,7][0-9]{9}$/;
      if (!reg.test(value)) {
        callback(new Error("手机号码不正确"));
      } else {
        callback();
      }
    };

    return {
      GoodList: [], //提交过来的商品详情列表用于渲染
      totalCount: 0, //商品总件数
      totalPrice: 0, //商品总价格
      order: {
        //这里的信息需要提交到服务器的
        accept_name: "Mr",
        area: {
          // 所属地区
          province: {
            //第一个省要写代码
            code: "440000",
            value: "广东省"
          },
          city: {
            code: "440300",
            value: "深圳市"
          },
          area: {
            code: "440306",
            value: "宝安区"
          }
        },
        address: "深圳南山",
        mobile: "13800000000",
        email: "123@qq.com",
        post_code: "518000",
        payment_id: "6", //支付方式，在线支付
        express_id: "1", //快递方式 1 顺丰 2 圆通  3 韵达
        message: "请尽快发货", //订单备注
        expressMoment: 20, //快递费用
        goodsAmount: 0, //商品总价格
        goodsids: "", //购买的商品id
        cargoodsobj: {} //购买的商品id和数量
      },
      rules: {
        accept_name: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" }
        ],
        area: [
          { required: true, message: "请选择所属区域", trigger: "change" }
        ],
        address: [
          { required: true, message: "请输入收货人地址", trigger: "blur" }
        ],
        mobile: [{ required: true, validator: checkMobile, trigger: "blur" }]
      }
    };
  },
  created() {
    this.getGoodList(); //获取商品详细
  },
  methods: {
    getGoodList() {
      const url = `site/comment/getshopcargoods/${this.$route.query.goodsid}`;
      //1,获取本地id对应的数量,赋值给buycount
      const localGoods = JSON.parse(localStorage.getItem("goods") || "{}");
      //2,根据提交订单的需求,,需要获取到传递过来的商品id参数
      this.order.goodsids = this.$route.query.goodsid;
      //3,根据提交订单的需求,,需要获取到传递过来的商品id和个数,那么就需要那id和本地存储的对象进行遍历生成一个新对象
      const newGoodsObj = {};
      const goodsIdList = this.$route.query.goodsid.split(",");
      goodsIdList.forEach(id => {
        newGoodsObj[id] = localGoods[id];
      });
      this.order.cargoodsobj = newGoodsObj;

      this.$axios.get(url).then(success => {
        success.data.message.forEach(goods => {
          //遍历请求得到数据,对里面的buycount进行赋值
          goods.buycount = localGoods[goods.id];
          this.totalCount += goods.buycount;
          this.totalPrice += goods.buycount * goods.sell_price;
        });

        this.GoodList = success.data.message;
      });
    },
    onSelected(data) {
      //省市区域选择触发
      this.order.area.province = data.province;
      this.order.area.area = data.area;
      this.order.area.city = data.city;
    },
    OrderSubmit() {
      //商品提交
      

      //点击商品提交前验证表单完整性,
      this.$refs.orderForm.validate(valid => {
        if (valid) {
          //如果验证表单全部填写完整,就发送请求
          const url = "site/validate/order/setorder";
          this.$axios.post(url, this.order).then(success => {
            if (success.data.status == 0) {
              //把本地购物车已经结算的产品删除, 调用vuex mutations方法,删除本地locaStorage存储和内存存储
              //goods==={goodsid: 87}
              const ids = this.order.goodsids.split(",")
              ids.forEach(id=>{
                  this.$store.commit('delGoods',{goodsid:id})
              })

              


              //指令式路由跳转到支付页面
              this.$router.push({
                path: "/pay",
                query: { orderid: success.data.message.orderid }
              });
            }
          });
        } else {
          //表单没有验证完整,就弹出提示信息
          this.$message.error("请填写完整之后,在提交");
          return false;
        }
      })
    }
  },
  computed: {
    getTotalAmount() {
      this.order.goodsAmount = this.order.expressMoment + this.totalPrice;
      return this.order.expressMoment + this.totalPrice;
    }
  },
  beforeDestroy(){
    //销毁之前,禁用浏览器后退功能
     history.pushState(null, null, document.URL);
    window.addEventListener("popstate", function() {
      history.pushState(null, null, document.URL);
    });

  }
};
</script>

