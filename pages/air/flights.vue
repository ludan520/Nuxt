<template>
  <section class="container">
    <el-row type="flex" justify="space-around">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <!-- data 是不会被修改的列表数据 -->
        <!-- setDataList 用于修改过滤后的数组列表 -->
        <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <div>
          <!-- 航班列表 -->
          <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />

          <!-- 分页 -->
          <el-row>
            <!-- size-change：切换条数时候触发 -->
            <!-- current-change：选择页数时候触发 -->
            <!-- current-page: 当前页数 -->
            <!-- page-size：当前条数 -->
            <!-- total：总条数 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[5,10,15,20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="flightsData.total"
            ></el-pagination>
          </el-row>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
          <!-- 侧边栏组件 -->
          <FlightsAside/>
      </div>
    </el-row>
  </section>
</template>


<script>
//引入组件
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";

export default {
  //注册组件
  components: {
    FlightsListHead, // 航班头部布局
    FlightsItem, //机票列表
    FlightsFilters, //过滤器
    FlightsAside,//侧边栏
    

    
  },
  data() {
    return {
      //航班总数据(初始化数据)
      flightsData: {
        flights: [], //航班列表信息
        info: {},
        options: {}
      },

      cacheFlightsData: {
        // 缓存一份数据，只会修改一次
        flights: [], //航班列表信息
        info: {},
        options: {}
      },
      dataList: [], //航班列表数据
      pageIndex: 1, //当前页数
      pageSize: 5 //显示条数
    };
  },
  methods: {
    //调用接口获取航班总数据列表的数据
    getListData() {
      this.$axios({
        type: "GET",
        url: "airs",
        //将路由URL的五个参数传递到服务器
        params: this.$route.query
      }).then(res => {
        // 航班总数据，flightsData。flights是会修改的
        this.flightsData = res.data;
        // 缓存一份新的航班总数据，这个航班总数据不会被修改
        // 而flightsData会被修改
        this.cacheFlightsData = { ...res.data };
        // this.dataList = this.flightsData.flights.slice(0,5); // 初始化航班列表数据dataList，获取1 - 5条
        this.setDataList();
      });
    },

    // 根据分页器获取机票列表的数据
    //设置dataList数据； arr是展示的新数据，该方法将会传递给过滤组件使用
    setDataList(arr) {
      //如果有新数据从第一页开始显示
      if(arr){
         this.pageIndex =1;
         //arr航班列表数据
         this.flightsData.flights =arr;
         this.flightsData.total =arr.length;
      }
      const start = (this.pageIndex - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.dataList = this.flightsData.flights.slice(start,end)
      //截取dataList航班列表数据
      //slice(start,end)  切割包含start本身， end不包含本身
      this.dataList = this.flightsData.flights.slice(start, end);

      // 方法二 在总列表中截取出当前页的数据
      // this.dataList =  this.flightsData.flights.slice(
      //     (this.pageIndex - 1) * this.pageSize,
      //     this.pageIndex * this.pageSize
      // )
    },

    // 切换条数时触发
    handleSizeChange(value) {
      this.pageSize = value;
      this.setDataList();
    },

    // 切换页数时触发
    handleCurrentChange(value) {
      this.pageIndex = value;
      this.setDataList();
    }
  },
  //页面渲染完毕后调用函数
  mounted() {
    //调用获取数据列表的数据方法
    this.getListData();
  },
  watch:{
    //点击历史记录并不会刷新页面，需要监听url的变化，重新发起请求
    $route(){
      this.getListData()
    }
  }

};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}
.flights-content {
  width: 745px;
  font-size: 14px;
}
.aside {
  width: 240px;
}
</style>

