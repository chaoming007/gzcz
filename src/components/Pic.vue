<template>
  <div>
    
    <!--导航头 start -->
    
      <!--#include file="/include/z/gzcz/2017/wap/00001/201711_gzcz_wap_ejggt_Manual.shtml "-->
    <!-- 导航头 end   -->
    
     <div class="full-screen-section">
      <img :src="renderDat.CoverImage|bigPicSet" />
      <div class="b-info">
        <span class="r-txt icon-photo" v-show="renderDat.AlbumCount!=0">{{renderDat.AlbumCount}}</span>
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
import filter from '../filter/filter.js'

export default {
  data () {
    return {
      sendDat:{eid:ExhibitionID,sid:this.cslist.sid},
      renderDat:""
    }
  },
  props:{
    "cslist":Object
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
            if(res.code!=1){
               window.location.href="http://car.m.yiche.com/"+this.cslist.Name;
               return; 
            }
            if(res.code==1 && res.msg=="OK"){
               this.renderDat=Object.assign({},res.data);
               if(res.data.AlbumCount==0){
                 this.renderDat.CoverImage=DAT_URL.NO_IMG;
               }
               this.commitFun(res.data);
            }
          })
          .fail(()=>{
            console.log("请求错误！");
          })
      },
      commitFun(dat){
         Event.$emit("setTit",dat);
         $(".header15>h2").html(dat.Name);
      }
  },
  mounted(){
      this.getData();
  }
}
</script>
