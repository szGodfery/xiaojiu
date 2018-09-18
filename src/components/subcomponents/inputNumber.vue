<template>
  <div>
    <div @click="substrict" class="left">-</div>
    <div class="middle">{{countgood}}</div>
    <div @click="add" class="right">+</div>



  </div>
</template>

<style scoped>
.left,.middle,.right{
  display: inline-block;
  border: 1px solid #bbb;
  width:30px;
  height: 30px;
  text-align: center;
  line-height: 30px;

}
.middle{
  width: 40px;
  margin: 0 3px;
}
</style>

 <script>
 export default {
   data(){
     return {
       countgood:1
     }
   },
  //  接收父组件传值到子组件
  props:{
    initBuycount:Number,
    goodid:Number
  },
  created(){
    this.countgood=this.initBuycount
  },
  methods:{
    substrict(){
      if(this.countgood<=1) return
      this.countgood--
      this.notefy()
    },
    add(){
      this.countgood++
      this.notefy()
    },
  // 子组件传值给父组件
    notefy(){
      const noteinfo={
        goodsid : this.goodid,
        goodsCount:this.countgood
      }
      this.$emit('goodCountChange',noteinfo)
      this.$store.commit('altGoods',noteinfo)//触发index.js中的仓库的mutations
    }
  }
 }
 </script>
 

