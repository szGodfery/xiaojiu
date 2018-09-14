<template>
    <!-- 1,单页面 商品组件 -->
    <div>
        <div>
            <div class="section">
                <div class="location">
                    <span>当前位置：</span>
                    <a href="#/" class="router-link-active">首页</a> &gt;
                    <a href="#/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
                </div>
            </div>
            <div class="section">
                <div class="wrapper">
                    <div class="wrap-box">
                        <div class="left-220" style="margin: 0px;">
                            <div class="banner-nav">
                                <ul>
                                    <li v-for="item in topData.catelist" :key="item.id">
                                        <h3>
                                            <i class="iconfont icon-arrow-right"></i>
                                            <span>{{item.title}}</span>
                                            <p>
                                                <span v-for="subitem in item.subcates" :key="subitem.id">
                                                    {{subitem.title}}&nbsp;
                                                </span>
                                            </p>
                                        </h3>
                                        <div class="item-box">
                                            <dl>
                                                <dt>
                                                    <a href="/goods/40.html">{{item.title}}</a>
                                                </dt>
                                                <dd>
                                                    <a v-for="subitems in item.subcates" :key="subitems.id" href="/goods/43.html">{{subitems.title}}</a>
                                                </dd>
                                            </dl>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!--幻灯片-->
                        <div class="left-705">
                            <div class="banner-img">
                                <div id="focus-box" class="focus-box">
                                    <el-carousel height="341px" arrow="always">
                                        <el-carousel-item v-for="item in topData.sliderlist" :key="item.id">
                                            <img :src="item.img_url" alt="">
                                        </el-carousel-item>
                                    </el-carousel>
                                </div>

                            </div>
                        </div>
                        <!--/幻灯片结束-->
                        <!--  -->
                        <div class="left-220">
                            <ul class="side-img-list">
                                <li v-for="(item,index) in topData.toplist" :key="item.id">
                                    <div class="img-box">
                                        <label>{{index+1}}</label>
                                        <img :src="item.img_url">
                                    </div>
                                    <div class="txt-box">
                                        <a href="/goods/show-98.html">{{item.title}}</a>
                                        <!-- 把时间通过管道过滤 -->
                                        <span>{{item.add_time|dataFm}}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 商品列表 -->
            <div class="section" v-for="item in goodsGrop" :key="item.level1cateid">
                <div class="main-tit">
                    <h2>{{item.catetitle}}</h2>
                    <p>
                        <a href="/goods/43.html" v-for="leave2 in item.level2catelist" :key="leave2.subcateid">{{leave2.subcatetitle}}</a>
                        <a href="/goods/40.html">更多
                            <i>+</i>
                        </a>
                    </p>
                </div>
                <div class="wrapper clearfix">
                    <div class="wrap-box">
                        <ul class="img-list">
                            <li v-for="subitem in item.datas" :key="subitem.artID">
                                <!-- params动态传参,需要用命名对象的方式传递 -->
                                <!-- <router-link :to="{name:'goodsinfo',params:{id:subitem.artID}}" class=""> -->

                                <!-- 或者使用下面这种方式也可以 路径-->
                                <!-- <router-link :to="{path:`/goodsinfo/${subitem.artID}`}" class=""> -->
                                
                                <!-- 老师的写法-->
                                <!-- <router-link :to="'/goodsinfo/'+subitem.artID" class=""> -->

                                <router-link :to="`/goodsinfo/${subitem.artID}`" class="">

                                    <div class="img-box">
                                        <!-- 需求图片实现懒加载 vue-lazyload  注意:loading: require('common/image/default.png') -->
                                        <img v-lazy="subitem.img_url">
                                    </div>
                                    <div class="info">
                                        <h3>{{subitem.artTitle}}</h3>
                                        <p class="price">
                                            <b>{{subitem.sell_price}}</b>元</p>
                                        <p>
                                            <strong>库存 {{subitem.stock_quantity}}</strong>
                                            <span>市场价：
                                                <s>{{subitem.market_price}}</s>
                                            </span>
                                        </p>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
// 样式
<style scoped>
.el-carousel__container img {
  width: 100%;
  height: 100%;
}
</style>




<script>

// 导出vue实例
export default {
  data() {
    return {
      topData: {},
      goodsGrop: {}
    };
  },
  created() {
    this.getTopData();
    this.getGoodsGrop();
  },
  methods: {
    getTopData() {
      const url = "site/goods/gettopdata/goods"
      this.$axios.get(url).then(success => {
        this.topData = success.data.message
      })
    },
    getGoodsGrop() {
      const url = "site/goods/getgoodsgroup"
      this.$axios.get(url).then(success => {
        this.goodsGrop=success.data.message
      })
    }
  }
};
</script>

