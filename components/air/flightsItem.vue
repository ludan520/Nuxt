<template>
  <div class="flight-item">
    <div @click='handleShowRecommend'>
      <!-- 显示机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{data.airline_name}}</span>{{data.flight_no}}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>20:30</strong>
              <span>{{data.org_airport_name}}</span>{{data.org_airport_quay}}
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{rankTime}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{data.arr_time}}</strong>
              <span>{{data.dst_airport_name}}</span>{{data.dst_airport_quay}}
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{data.base_price/2}}</span>起
        </el-col>
      </el-row>
    </div>
    <div class="flight-recommend" v-show='showRecommend'>
      <!-- 隐藏的座位信息列表 -->
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row type="flex" justify="space-between" align="middle" class="flight-sell" v-for='(item,index) in data.seat_infos' :key='index'>
            <el-col :span="16" class="flight-sell-left">
              <span>{{item.group_name}}</span>|{{item.supplierName}}
            </el-col>
            <el-col :span="5">￥{{item.settle_price_coupon}}</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="success" size="mini" @click='handleChoose(data.id,item.seat_xid)'>选定</el-button>
              <p>剩余：{{item.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data(){
      return {
        showRecommend:false //机票推荐列表默认收起
      }
  },
  //props接收父组件传递的数据
  props: {
    //获得航班列表中的每一项item数据，即为data
    data: {
      type: Object,
      //默认是空对象
      default: {}
    }
  },

  computed: {
      rankTime(){

          // 到达时间(将字符串转为字符串数组['20','25'])11
            const arr = this.data.arr_time.split(":");
          // 出发时间
          const dep = this.data.dep_time.split(":");

          if(arr[0] < dep[0]){
              arr[0] += 24;
          }
          //将字符串的隐式转化为数值 arr[0] * 60， +arr[1]，+dep[1]
          const countMin = (arr[0] * 60 + +arr[1]) - (dep[0] * 60 + +dep[1]);

          const hours = Math.floor(countMin / 60);
          const min = countMin % 60;

          return `${hours}时${min}分钟`;
    
        },
  },
  methods:{
      //控制机票推荐列表收起
      handleShowRecommend(){
          this.showRecommend = !this.showRecommend;
      },
      //订单页面跳转
      handleChoose(id,seat_xid){ 
        this.$router.push({
            path:'/air/order',
            query:{
              id,
              seat_xid,
            }
        })
      }
  }
  
};
</script>


<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>