<template>
  <div>
       <!-- 用户信息 start   -->
       
             <div class="section-row" v-if="item.userTuff">
                 <a href="###" class="person-txt">
                   <div class="img-box">
                     <i class="v"></i>
                     <img :src="'http:'+item.userInfo.avatarpath|picUrlSet(20)" />
                   </div>
                   <div class="person-content">
                     <h6>{{item.userInfo.showname}}</h6>
                     <p>{{item.userInfo.fanscount}}人已关注</p>
                   </div>
                 </a>
                 
                 <!-- 关注 start  -->

                   <div class="person-right">
                         <a href="###" class="lnk-attention" @click="addWatchDat(item,$event)" v-show="item.attentionstatus==0" >关注TA</a>
                         <div class="drop" v-show="item.attentionstatus==1">
                             <i @click="delGzFun($event)"></i>
                             <div class="layer"  >
                                 <a href="javascript:;" @click="delWatchDat(item,$event)" class="att-has" >取消关注</a>
                             </div>
                         </div>
                   </div>
                   
                 <!-- 关注 end   -->
                 
               <div class="clear"></div>
             </div>
             
       <!-- 用户信息 end   -->
  </div>
</template>

<script>
import datUrl from '../js/config.js'
import filter from '../filter/filter.js'
import loginFun from '../js/login.js'

export default {
  data(){
    return {
      item:this.userdat,     //用户数据
      isLogin:false,         //是否已经登录
    }
  },
  props:["userdat"],                 
  methods:{
    getDataFun(dat){              //关注请求
        $.ajax(dat).done((res)=>{
          dat.callback(res);
        }).fail(()=>{
            console.log("请求错误！");
        })
    },
    addWatchDat(dat,evt){       //增加关注事件
        if(!this.isLogin.isLogined){                            //如果没有登录
            $(".lnk-attention").attr("href",datUrl.loginUrl);
            return;
        }    
        let getDat={
            url:datUrl.addWatchDat+"?tid="+2963626,
            dataType:"json",
            type:"POST",
            cache:false,
            xhrFields: { withCredentials: true},
            callback:this.addWatchFun
        }
        this.getDataFun(getDat);
        this.showHideFun(evt);
        this.warnInfoFun("关注成功！");
    },
    addWatchFun(dat){
        if(dat=="ok"){
           console.log("关注成功");
        }
    },
    showHideFun(evt){     //关注按钮切换
        $(evt.target).hide();
        $(evt.target).siblings().show();
    },
    delGzFun(evt){       //取消关注下拉按钮显示
       let tag=$(evt.target).siblings();
       tag.show();
       let timer=setTimeout(()=>{
           tag.hide();
       },3000);
       tag.on("mouseover",function(){
           clearTimeout(timer); 
       });
       tag.on("mouseout",function(){
           timer=setTimeout(()=>{
               tag.hide();
           },3000);
       })       
    },
    delWatchDat(id,evt){       //取消关注事件
        let getDat={
            url:datUrl.delWatchDat+"?tid="+2963626,
            cache:false,
            dataType:"json",
            type:"POST",
            xhrFields: { withCredentials: true},
            callback:this.delWatchFun
        }
        this.getDataFun(getDat);
        this.showGzFun(evt);
        this.warnInfoFun("取消关注成功！");
    },
    showGzFun(evt){
       let tag=$(evt.target).parent().parent();
       $(evt.target).parent().hide();
       tag.hide();
       tag.siblings().show();
    },
    delWatchFun(dat){
      if(dat=="ok"){
         console.log("取消成功！");
      }
    },
    warnInfoFun(txt){
        $("#warnInfo").find("p").html(txt);
        $("#warnInfo").show();
        setTimeout(()=>{
            $("#warnInfo").hide();  
        },2000);
    }
  
  },
  mounted(){
      this.isLogin=loginFun();
  }
}
</script>
