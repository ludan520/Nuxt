<template>
  <el-form :model='form' ref='form' :rules='rules' class='form'>
     <el-form-item class='form-item' prop='username'>
        <el-input placeholder="用户名/手机" v-model='form.username'>
        </el-input>
     </el-form-item> 
     <el-form-item class='form-item' prop='password'>
        <el-input placeholder="密码" type='password' v-model='form.password'>
        </el-input>
     </el-form-item> 
     <p class='form-text'>
       <nuxt-link to='#'>
           忘记密码
       </nuxt-link>
     </p>
     <el-button class='submit' type='primary' @click='handleLoginSubmit'>
       登录
     </el-button>
  </el-form>
</template>

<script>
export default {
    data(){
      return{
        //表单数据
        form:{
          username:'',//登录用户名
          password:'',//登录密码
        },
        //表单规则
        rules:{
          username:[
            {required:true,message:'请输入用户名',trigger:'blur'}
          ],
           password:[
            {required:true,message:'请输入密码',trigger:'blur'}
          ]
        }
      }
    },
    methods:{
      //提交登录
      handleLoginSubmit(){
        //验证表单
        this.$refs['form'].validate(valid=>{
          //为true表示没有错误
          if(valid){
            // this.$axios({
            //   url:'/accounts/login',
            //   method:'POST',
            //   data:this.form
            // }).then(res=>{
            //   console.log(res.data)
            //   this.$router.push('/')
            // })
            
            this.$store.dispatch('user/login',this.form).then(res =>{
             
              //成功提示
              this.$message({
                message:'登录成功，正在跳转',
                type:'success'

              });
              //跳转到首页
              setTimeout(()=>{
                this.$router.push('/')
              },1000)
            })


          }
        
        })
      }
    }
}
</script>

<style scoped lang='less'>
   .form{
      padding:25px;
   }
   .form-item{
     margin-bottom: 20px;
   }
   .form-text{
     font-size: 20px;
     color:purple;
     text-align: right;
     line-height: 1;
   }
   .submit{
     width: 100%;
     margin-top: 10px;
   }
</style>
