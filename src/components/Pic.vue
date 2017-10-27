<template>
  <div>
    
    <!--导航头 start -->
    <div class="header-section">
      <a href="###" class="go"></a>
      <h2>{{renderDat.Name}}</h2>
    </div>
    <!-- 导航头 end   -->
    
     <div class="full-screen-section">
      <img :src="renderDat.CoverImage" />
      <div class="b-info">
        <span class="r-txt icon-photo">{{renderDat.AlbumCount}}</span>
      </div>
    </div>
    <!--展厅-牌 start-->
		<div class="gallery-section">
			<div class="logo-txt">
				<img :src="renderDat.MasterBrandLogo" /><span>{{renderDat.Name}}</span>
			</div>
			<div class="posit-lnk">
				所在展馆：
				<a href="###">
					{{renderDat.PavilionName}}
				</a>
			</div>
		</div>
    <!--展厅-牌 end -->
    
  </div>
</template>

<script>
import datUrl from '../js/config.js'

export default {
  data () {
    return {
      sendDat:{eid:19,sid:2614},
      renderDat:""
    }
  },
  methods:{
      getData(){   
          $.ajax({
            url: datUrl.picUrlDat,
            type: 'GET',
            cache:false,
            dataType: 'jsonp',
            jsonp:'callback',
            jsonpCallback:'JsonpCallBack',
            data: this.sendDat
          })
          .done((res)=>{
            if(res.code==1 && res.msg=="OK"){
               this.renderDat=Object.assign({},res.data);
               this.commitFun(res.data);
            }
          })
          .fail(()=>{
            console.log("请求错误！");
          })
      },
      commitFun(dat){
         Event.$emit("setTit",dat);
      }
  },
  mounted(){
      this.getData();
  }
}
</script>
