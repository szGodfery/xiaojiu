<template>
  <div>

    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="javascript:;">支付中心</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit pay">
            <a href="javascript:;" class="selected">支付中心</a>
          </div>
          <div class="form-box payment">
            <div class="el-row">
              <div class="el-col el-col-16">
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>订 单 号：</dt>
                      <dd>{{orderInfo.order_no}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>收货人姓名：</dt>
                      <dd>{{orderInfo.accept_name}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>送货地址：</dt>
                      <dd>{{orderInfo.area}}{{orderInfo.address}}
                      </dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>手机号码：</dt>
                      <dd>{{orderInfo.mobile}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付金额：</dt>
                      <dd>{{orderInfo.order_amount}} 元</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付方式：</dt>
                      <dd>在线支付</dd>
                    </dl>
                  </div>
                </div>
                <div class="message">
                  <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                  <span>{{orderInfo.message}}</span>
                </div>
              </div>
              <div class="el-col el-col-8">
                <dzh-qrcode :img_url="img_url" :url="urls"></dzh-qrcode>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
export default {
  data() {
    return {
      orderInfo: {},
      urls: "", //二维码扫码支付链接
      timeId: 0, //计时器
      img_url: ''//二维码中间图片信息
    };
  },
  created() {
    this.getOrderInfo();
    this.getOrderPayStatus();
    this.img_url=require(`../../statics/site/images/alipay.png`) 
  },
  mounted() {
    this.urls = `http://47.106.148.205:8899/site/validate/pay/alipay/${
      this.$route.query.orderid
    }`
    
  },
  methods: {
    getOrderInfo() {
      const url = `site/validate/order/getorder/${this.$route.query.orderid}`;
      this.$axios.get(url).then(success => {
        if (success.data.status == 0) {
          this.orderInfo = success.data.message[0];
          if (success.data.message[0].status === 2) {
            this.$router.push({ path: "/paySuccess" });
          }
        }
      });
    },
    //轮询服务器的支付状态
    getOrderPayStatus() {
      //每隔3秒轮询服务器的支付状态,,,用计时器,
      this.timeId = setInterval(() => {
        const url = `site/validate/order/getorder/${this.$route.query.orderid}`;
        this.$axios.get(url).then(success => {
          if (success.data.message[0].status === 2) {
            //如果支付状态等于2,那么就跳转到支付成功页面,并在生命周期函数钩子中清除定时器
            this.$router.push({ path: "/paySuccess" });
          }
        });
      }, 3000);
    }
  },
  beforeDestroy() {
    //销毁之前清除计时器
    clearInterval(this.timeId);
  }
};
</script>

