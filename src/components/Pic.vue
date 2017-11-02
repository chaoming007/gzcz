<template>
  <div>
    
    <!--导航头 start -->
    <div class="header-section">
      <a id="gobackElm" href="javascript:;" class="btn-return go"></a>
      <h2>{{renderDat.Name}}</h2>
      <!--#include file="/include/z/gzcz/2017/wap/00001/201711_gzcz_wap_ejggt_Manual.shtml "-->
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
import DAT_URL from '../js/config.js'

export default {
  data () {
    return {
      sendDat:{eid:229,sid:this.cslist},
      renderDat:""
    }
  },
  props:{
    "cslist":String
  },
  methods:{
      getData(){   
          $.ajax({
            url: DAT_URL.PIC_URL_DAT,
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
