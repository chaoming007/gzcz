<template>
  <div>
        <div class="loading-txt" v-show="!getPropsDat.loadShow">
          <span>正在加载...</span>
        </div>
        
        <div class="loaded-txt" v-show="getPropsDat.loadShow">
          <span>已经全部加载完毕</span>
        </div>	
  </div>
</template>

<script>

export default {
  data () {
    return {
       defVal:{
          loadShow:false,
       }
    }
  },
  props:["dat"],
  methods:{
    loadMoreFun(){                   //上拉加载更多
      let $scrollTop=0;
      let $winH=$(window).height();
      let $docH=$(document).height();
      let _this=this;
      $(document).on("scroll",function(){
           $scrollTop=$(this).scrollTop();
           $docH=$(document).height();
           if($scrollTop+$winH>=$docH){
             if(_this.dat.loadLock && !_this.dat.loadShow){
                  _this.dat.page+=1;
                  _this.loadLock=false;
                  setTimeout(()=>{
                    _this.dat.callBack(_this.dat.page);
                  },100);
              }
           }
      })
    }  
  },
  computed:{
     getPropsDat(){
       return this.dat||this.defVal;
     }
  },
  mounted(){
      this.loadMoreFun();
  }
}
</script>
