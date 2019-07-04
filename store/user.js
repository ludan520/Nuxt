// dispatch：含有异步操作，例如向后台提交数据，写法： this.$store.dispatch('mutations方法名',值)  (主要向后台提交数据)
// commit：同步操作，写法：this.$store.commit('mutations方法名',值)---单向数据流  (只是传输数据)

//用户管理
export const state = ()=>({
     //采用接口返回的数据结构
     userInfo:{
        token:'',
        user:{}
    }
});

export const mutations = {
    // 保存用户信息到state
    setUserInfo(state, data){
        state.userInfo = data;
    },
    //清除用户数据
    cleanUserInfo(state,info){
        if(process.browser){
            //清除store中的userInfo
            localStorage.removeItem('userInfo')
        }
        //清除用户信息
        state.userInfo={};
    }
};

export const actions = {
    // 登录
    login({commit}, data){
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data: data
        }).then(res => {
            // console.log(res)
            const data = res.data;
            // 保存到state
            commit("setUserInfo", data);
            return data;
        })
    }
};