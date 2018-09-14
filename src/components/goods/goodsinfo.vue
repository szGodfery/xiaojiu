<template>
  <div>
    <div>
      <div class="section">
        <div class="location">
          <span>当前位置：</span>
          <a href="/index.html">首页</a> &gt;
          <a href="/goods.html">购物商城</a>
          <a href="/goods/42/1.html">商品详情</a>

        </div>
      </div>
      <div class="section" v-if="goodsDatail.goodsinfo">
        <div class="wrapper clearfix">
          <div class="wrap-box">
            <div class="left-925">
              <div class="goods-box clearfix">

                <div class="pic-box">
                  <!-- 放大镜图片展示代码 -->
                  <div class="magnifier" id="magnifier1">
                    <div class="magnifier-container">
                      <div class="images-cover"></div>
                      <!--当前图片显示容器-->
                      <div class="move-view"></div>
                      <!--跟随鼠标移动的盒子-->
                    </div>
                    <div class="magnifier-assembly">
                      <div class="magnifier-btn">
                        <span class="magnifier-btn-left">&lt;</span>
                        <span class="magnifier-btn-right">&gt;</span>
                      </div>
                      <!--按钮组-->
                      <div class="magnifier-line">
                        <ul class="clearfix animation03">
                          <li v-for="item in goodsDatail.imglist" :key="item.id">
                            <div class="small-img">
                              <img :src="item.original_path" />
                            </div>
                          </li>
                        </ul>
                      </div>
                      <!--缩略图-->
                    </div>
                    <div class="magnifier-view"></div>
                    <!--经过放大的图片显示容器-->
                  </div>
                </div>
                <div class="goods-spec">
                  <h1>{{goodsDatail.goodsinfo.title}}</h1>
                  <p class="subtitle">{{goodsDatail.goodsinfo.sub_title}}</p>
                  <div class="spec-box">
                    <dl>
                      <dt>货号</dt>
                      <dd id="commodityGoodsNo">{{goodsDatail.goodsinfo.goods_no}}</dd>
                    </dl>
                    <dl>
                      <dt>市场价</dt>
                      <dd>
                        <s id="commodityMarketPrice">¥{{goodsDatail.goodsinfo.market_price}}</s>
                      </dd>
                    </dl>
                    <dl>
                      <dt>销售价</dt>
                      <dd>
                        <em id="commoditySellPrice" class="price">¥{{goodsDatail.goodsinfo.sell_price}}</em>
                      </dd>
                    </dl>
                  </div>
                  <div class="spec-box">
                    <dl>
                      <dt>购买数量</dt>
                      <dd>
                        <div class="stock-box">
                          <el-input-number v-model="goodsCount" :min="1" :max="goodsDatail.goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                        </div>
                        <span class="stock-txt">
                          库存
                          <em id="commodityStockNum">{{goodsDatail.goodsinfo.stock_quantity}}</em>件
                        </span>
                      </dd>
                    </dl>
                    <dl>
                      <dd>
                        <div id="buyButton" class="btn-buy">
                          <button class="buy">立即购买</button>
                          <button class="add" @click="addToShopCart" ref="addShopToCartRef">加入购物车</button>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div id="goodsTabs" class="goods-tab bg-wrap">
                <Affix>
                  <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                    <ul>
                      <li @click="flag=true">
                        <!-- class绑定来控制切换样式  :class="{类名:布尔值真就显示}" -->
                        <a href="javascript:;" :class="{selected:flag}">商品介绍</a>
                      </li>
                      <li @click="flag=false">
                        <a href="javascript:;" :class="{selected:!flag}">商品评论</a>
                      </li>
                    </ul>
                  </div>
                </Affix>

                <!-- 商品介绍 -->
                <div v-show="flag" class="tab-content entry" style="display: block;">
                  <div v-html="goodsDatail.goodsinfo.content" style="padding:10px"></div>
                </div>

                <!-- 商品评论 -->
                <div v-show="!flag" class="tab-content" style="display: block;">
                  <div class="comment-box">
                    <div id="commentForm" name="commentForm" class="form-box">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="conn-box">
                        <div class="editor">
                          <textarea ref="textContentRef" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                          <span class="Validform_checktip"></span>
                        </div>
                        <div class="subcon">
                          <input id="btnSubmit" name="submit" type="submit" value="提交评论" @click="postComment" class="submit">
                          <span class="Validform_checktip"></span>
                        </div>
                      </div>
                    </div>
                    <ul id="commentList" class="list-box">
                      <p v-if="commentsDatail.totalcount===0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                      <li v-for="item in commentsDatail.message" :key="item.id">
                        <div class="avatar-box">
                          <i class="iconfont icon-user-full"></i>
                        </div>
                        <div class="inner-box">
                          <div class="info">
                            <span>{{item.user_name}}</span>
                            <span>{{item.add_time | dataFm('YYYY-MM-DD HH:mm:ss')}}</span>
                          </div>
                          <p>{{item.content}}</p>
                        </div>
                      </li>
                    </ul>
                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                      <div id="pagination" class="digg">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="commentsDatail.totalcount">
                        </el-pagination>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="left-220">
              <div class="bg-wrap nobg">
                <div class="sidebar-box">
                  <h4>推荐商品</h4>
                  <ul class="side-img-list">
                    <li v-for="item in goodsDatail.hotgoodslist" :key="item.id">
                      <div class="img-box">
                        <router-link :to="`/goodsinfo/${item.id}`" class="">
                          <img :src="item.img_url">
                        </router-link>
                      </div>
                      <div class="txt-box">
                        <router-link :to="`/goodsinfo/${item.id}`" class="">{{item.title}}</router-link>
                        <span>{{item.add_time | dataFm}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 动画元素 先定位到购物车下面 -->
    <transition
    @before-enter='beforeEnter'
    @enter='enter'
    @after-enter='afterEnter'
    >
      <div v-show="isShow" v-if="goodsDatail.imglist" class="animateBox" ref="animateBoxRef">
        <img width="50px" height="50px" :src="`http://47.106.148.205:8899/${goodsDatail.goodsinfo.img_url}`" alt="">
      </div>
    </transition>

  </div>
</template>

// 导入放大镜样式
<style scoped>
@import "../../statics/site/jqimgzoom/css/magnifier.css";
.animateBox {
  position: absolute;
  width: 40px;
  height: 40px;
  top: 0;
  left: 0;
}
</style>



// 动作行为
<script>
// import $ from "jquery";
// 1,导入axios包发起网络请求 此步已经优化到全局Vue.prototype中了
// import axios from 'axios'

//导入放大镜js
import "../../statics/site/jqimgzoom/js/magnifier.js";

//导入iview组件,实现图钉效果Affix
import { Affix } from "iview";

//2,导出vue实例
export default {
  components: { Affix }, //子组件
  data() {
    return {
      goodsDatail: {},
      goodsCount: null, //商品记数,双向绑定
      flag: true, //商品和评论显示开关
      pageIndex: 1, //当前页
      pageSize: 5, //页容量
      commentsDatail: {}, //评论数据
      isShow: false, //动画元素显示的开关
      addCartOffset: null, //动画开始xy值
      cartBuyOffset: null, //动画结束的xy值
      //count:null// 购物车计数
      isNeedRender:true   // 是否需要重新渲染放大镜页面用于updated里面
    };
  },
  updated() {
    // data发生了变化并且，视图已经渲染完毕了
    if(this.isNeedRender){
      $("#magnifier1").imgzoon({ magnifier: "#magnifier1" });
    }
    //this.isNeedRender=false
  },
  created() {
    //const goodsid = this.$route.params.id; //获取传递过来的参数
    this.getGoodsInfo(); //产品详细信息
    this.getCommentsInfo(); //评论详细信息
  },
  watch: {
    $route: function(newValue, oldValue) {
      //监控到路由变化,就再次发起请求
      
      this.getGoodsInfo(); //产品详细信息
      this.getCommentsInfo(); //评论详细信息
    }
  },
  methods: {
    getGoodsInfo() {
      //this.isNeedRender=true//把渲染值重新更新为true
      // 获取商品详情数据
      const url = `site/goods/getgoodsinfo/${this.$route.params.id}`;
      this.$axios.get(url).then(response => {
        this.goodsDatail = response.data.message;

        setTimeout(() => {
          //注意这里一定要用箭头函数不然this的指向有问题
          //在此处先初始化动画起始位置和结束位置
          //获得加入购物车按钮的起始位置(x,y),通过ref操作dom
          //存入数据中,以便后期调用 使用了jquery操作dom元素得到xy
          this.addCartOffset = $(this.$refs.addShopToCartRef).offset()

          //设置动画的box的xy坐标
          $(this.$refs.animateBoxRef).offset(this.addCartOffset)
          
          //获得结束位置
          this.cartBuyOffset = $("#shoppingCartCount").offset();
        }, 200);
      });
    },
    // 获取评论详情数据
    getCommentsInfo() {
      const url = `site/comment/getbypage/goods/${
        this.$route.params.id
      }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
      this.$axios.get(url).then(success => {
        this.commentsDatail = success.data;
      });
    },
    //添加评论数据
    postComment() {
      //通过this.$refs.textContentRef  获取dom元素
      const textContent = this.$refs.textContentRef;
      //判断是否有输入
      if (textContent.value.trim().length === 0) {
        //弹出警告信息
        this.$message({
          message: "评论内容不能为空!",
          type: "warning"
        });
        return;
      }
      this.$axios
        .post(`site/validate/comment/post/goods/${this.$route.params.id}`, {
          commenttxt: textContent.value.trim()
        })
        .then(success => {
          if (success.data.status === 0) {
            //清空输入框的内容
            textContent.value = "";
            //弹出提示信息
            this.$message({
              message: success.data.message,
              type: "success"
            });
            //重新渲染评论页面 第一页
            this.pageIndex = 1;
            this.getCommentsInfo();
          }
        });
    },
    //分页插件
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      //每次重新选择页容量之后,默认从第一页开始
      this.pageIndex = 1;
      //重新获取评论数据
      this.getCommentsInfo();
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      //重新获取评论数据
      this.getCommentsInfo();
    },
    // 加入购物车
    addToShopCart() {
      this.isShow = true;
     
      // 使用vuex的Mutation方法来同步更新store的数据
      const goods={goodsid:this.$route.params.id,goodsCount:this.goodsCount}
      this.$store.commit('addGoods',goods)  //触发index.js中的仓库的mutations

/**
 * 以前的方法
 */ //this.count+=this.goodsCount
    // 把商品信息存到本地localStorage
    //先从localStorage中取出来,如果有就取出,没有就返回一个空对象
    // let goodsObj = JSON.parse(localStorage.getItem('goods')||'{}')

    // //获取商品的id信息和购买数量  用对象的方式存起来好带过去
    // goodsObj[this.$route.params.id]=this.count

    // localStorage.setItem('goods',JSON.stringify(goodsObj))

    // //购物车信息传给父组件 $emit触发,调用,发射的意思this.$emit(方法名,参数1)
    //   this.$emit('func',this.goodsCount)
    },
    
   


    // 动画相关
    beforeEnter: function(el) {//进入之前动画位置
      el.style.left = `${this.addCartOffset.left}px`;
      el.style.top = `${this.addCartOffset.top}px`;
      el.style.transform = `scale(1)`;
    },
    enter: function(el, done) {//动画执行过程
      el.style.transition = "all 0.8s linear";

      // 刷新动画帧
      el.offsetWidth;

      el.style.left = `${this.cartBuyOffset.left}px`;
      el.style.top = `${this.cartBuyOffset.top}px`;
      el.style.transform = `scale(0.5)`;

      // 执行完之后调用
      done();
    },
    afterEnter: function(el) {
      this.isShow = false;
    }
  }
};
</script>

