<template>
  <div>
      <!-- 关注 start   -->
            <div class="person-right">
              <a href="###" class="lnk-attention">关注TA</a>
            </div>
      <!-- 关注 end   -->
  </div>
</template>

<script>
import datUrl from '../js/config.js'
import loginFun from '../js/login.js'

export default {
  data () {
    return {
    
    }
  },
  props:["datInfo"],
  methods:{
      getData(dat){   
          $.ajax({
            url: dat.url,
            type: 'GET',
            cache:false,
            dataType: 'jsonp',
            jsonp:'callback',
            jsonpCallback:'JsonpCallBack'
          })
          .done((res)=>{
              dat.callback(res);
          })
          .fail(()=>{
            console.log("请求错误！");
          })
      },
      isWatchDat(id){      //是否被关注
        let getDat={
             url:datUrl.watchUrlDat+"?uids="+id,
             callback:this.isWatchFun
        }
        this.getData(getDat);
      },
      addWatchDat(id){       //增加关注
        let getDat={
            url:datUrl.addWatchDat+"?tid="+id,
            callback:this.addWatchFun
        }
        this.getData(getDat);
      },
      delWatchDat(id){       //取消关注
        let getDat={
            url:datUrl.delWatchDat+"?tid="+id,
            callback:this.delWatchFun
        }
        this.getData(getDat);
      },
      isWatchFun(dat){
          dat.forEach((item,key)=>{
              if(item.attentionstatus==0){
                
              }
          })
      },
      
      

      
      acceptFun(){          //关注用户id
        Event.$on("userEvent",(dat)=>{
            console.log(dat);
            this.isWatchDat(dat);
        });
      }
  },
  mounted(){
      this.acceptFun();
    
      loginFun();
  }
}
</script>
