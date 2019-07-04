<template>
    <div class="filters">
        <el-row type='flex' class='filters-top' justify="space-between" align='middle'>
            <el-col :span='8'>
                单程：{{data.info.departCity}} - {{data.info.destCity}} /{{data.info.departDate}}
            </el-col>
            <el-col :span='4'>
                <el-select size='mini' v-model='airport' placeholder="起飞机场" @change="handleAirport">
                    <el-option  v-for='(item,index) in data.options.airport' :key='index'
                    :label='item' :value='item'>
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span='4'>
                 <el-select size='mini' v-model='flightTime' placeholder="起飞时间" @change=" handleFlightTimes">
                    <el-option v-for='(item,index) in data.options.flightTimes' :key='index'
                    :label='`${item.from}:00 - ${item.to}:00`' :value='item'>
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span='4'>
                 <el-select size='mini' v-model='company' placeholder="航空公司" @change="handleCompany">
                    <el-option v-for='(item,index) in data.options.company' :key='index'
                    :label='item' :value='item'>
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span='4'>
                 <el-select size='mini' v-model='airSize' placeholder="机型" @change="handleAirSize">
                    <el-option  v-for='(item,index) in sizeOptions' :key='index' :label='item.name' :value='item.size'>
                    </el-option>
                 </el-select>
            </el-col>
        </el-row>
        <div class='filter-cancel'>
           筛选：
           <el-button type='primary' round plain size='mini' @click='handleFiltersCancel'>
           撤销
           </el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            airport:'',//机场
            flightTime:'',//出发时间
            company:'',//航空公司
            airSize:'',//机型大小
            sizeOptions:[
                {name:'大', size:'L'},
                {name:'中', size:'M'},
                {name:'小', size:'S'},
            ]
        }
    },
    //接收父组件flight.vue传递过来的数据
    props:{
        //接收父组件的航班总数据data
        data:{
            type:Object,
            default:{}
        }
    },
    methods:{
        //选择机场时触发
        handleAirport(value){
          const arr = this.data.flights.filter(v => 
               //航班列表数据中等于过滤器选中的机场名
                v.org_airport_name === value
            );
            //子组件发射自定义事件setDataList 并携带要传递给父组件的值
            this.$emit("setDataList", arr);
        },
        //选择出发时间时触发
        handleFlightTimes(value){
            //console.log(this.data.flights)
            const arr = this.data.flights.filter(v => {
                return value.from <= +v.dep_time.split(":")[0] && value.to >= +v.dep_time.split(":")[0]
            });
           

            this.$emit("setDataList", arr);
            

        },
        //选择航空公司时触发
        handleCompany(value){
            const arr =this.data.flights.filter(v=> v.airline_name === value);
            this.$emit("setDataList", arr)
        },
        //选择机型时触发
        handleAirSize(value){
           const arr = this.data.flights.filter(v => v.plane_size === value)
           this.$emit('setDataList',arr)
        },
        //撤销条件时候触发
        handleFiltersCancel(){
           this.airport ='',
           this.flightTime='',
           this.company ='',
           this.airSize ='',
           
           this.$emit('setDataList',this.data.flights)
        },
    },
    mounted(){
      
    }
}
</script>

<style scoped lang='less'>
   .filters{
       margin-bottom: 20px;
   }

   .filters-top{
       >div {
          /deep/ .el-select{
               margin-left: 10px;
           }
       }
   }

   .filter-cancel{
       margin-top: 10px;
   }
</style>
