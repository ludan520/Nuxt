<template>
    <div class="container">
        <el-row type='flex' justify="space-between" >
            <!-- 订单表单 -->  
            <!-- 将data属性传递到orderForm;父传子属性传值，子传父事件传值 -->
            <OrderForm :data='infoData' @setAllPrice='setAllPrice'/>

            <!-- 侧边栏 -->
            <OrderAside :data='infoData' :allPrice ='allPrice' />
        </el-row>
    </div>
</template>

<script>
//引入组件
import OrderForm from '@/components/air/orderForm.vue'
import OrderAside from "@/components/air/orderAside.vue";
export default {
   data(){
       return{
           //机票信息
           infoData:{
               insurances:[],//初始化保险数据
               seat_infos: {}
           },
           allPrice:0,//订单总价格
       }
   },
   components:{
       //注册组件
       OrderForm,//订单表单
       OrderAside,//侧边栏
       
   },
   mounted(){
       
        const {query} = this.$route;
        this.$axios({
            url:`airs/${query.id}`,
            params:{
               seat_xid:query.seat_xid,
            }
        }).then(res=>{
             this.infoData = res.data;
        })
   },
   methods:{
       //子组件orderForm向父组件order传递事件，父组件并接收参数price
      setAllPrice(price){
        this.allPrice = price
      }
   }
}
</script>

<style lang="less" scoped>
   .container{
       width: 1000px;
       margin: 20px auto;
   }

   //aside
   .aside{
       width:350px;
       height: fit-content;
       border: 1px solid #ddd;
   }
</style>

