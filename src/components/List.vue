<template>
  <div>
    <!--块1 start-->
    
    
    
    <div class="section-item" v-for="(item,ind) in renderDat">
      <div class="section-warp">
        
        <!-- 用户信息 start   -->
        
        <div class="section-row">
            <a href="###" class="person-txt">
              <div class="img-box">
                <i class="v"></i>
                <img src="/src/img/pic-150x150.jpg" />
              </div>
              <div class="person-content">
                <h6>蔚蓝小法师</h6>
                <p>9999人已关注</p>
              </div>
            </a>
          <div class="person-right">
            <a href="###" class="lnk-attention">关注TA</a>
          </div>
          <div class="clear"></div>
        </div>
        
        <!-- 用户信息 end  -->
        
        
        
        <!-- 信息流 start -->
        
        <div class="section-row">
          
          
          <!-- 图片列表 start   -->
          
              <div class="section-warp_5 img-list-set" v-if="item.picTuff">
                
                      <p class="txt">查不出也修不好的汽车异响，怎么回事？</p>
                      
                      <ul class="col-img-3">
                            <li v-for="(itempic,num) in item.picArr">
                                <a href="###" class="img-box">
                                  <img :src="itempic|picUrlSet(item.Type)" />
                                  <i class="icon-photo" v-show="num==2">共{{item.picNum}}图</i>
                                </a>
                            </li>
                      </ul>
              </div>
              
          <!-- 图片列表 end   -->
          
          <!-- 新闻流 start   -->
          
              <div class="info-photo"  v-else>
                    <a class="ref" href="###">
                      <h6><span class="box-txt">{{item.contentLess}}</span><em href="###" @click="showMoreTxt(item.content,item,$event)" v-show="item.more" class="lnk">展开</em></h6>
                    </a>
                  
                    <a :href="item.Url|urlSet" target="_blank" class="img-box">
                      <i class="icon-video" v-show="item.Type==10||item.Type==9"></i>
                      <img :src="item.PicCover | picUrlSet(item.Type)" />
                    </a>
              </div>
            
          <!-- 新闻流 end   -->
          
          <!-- 发布信息 start   -->
             <div class="info-tim">
                   <a href="###" class="info-photo-brand"><em class="time">{{item.EntityPublishTime|timSet}}</em>{{item.CsName|bbsSet}}</a>
               
             </div>
          
          <!-- 发布信息 end   -->
          
        </div>
        
        <!-- 信息流 end -->
        
        
      </div>
    </div>
    
    
    <!--块1 end-->
    
    <!-- <div class="loaded-txt" v-show="!loadLock"> 
			<span>加载更多</span>
		</div> -->
    
    <div class="loading-txt" v-show="!loadLock">
      <span>正在加载...</span>
    </div>
    
    <div class="loaded-txt" v-show="loadShow">
			<span>已经全部加载完毕</span>
		</div>	
    
    
  </div>
</template>

<script>
import datUrl from '../js/config.js'
import filter from '../filter/filter.js'

export default {
  data () {
    return {
      sendDat:{size:3,page:1,cache:true},
      renderDat:[],
      cutNumTxt:60,        //默认截取字数
      loadLock:true,       //正在加载
      loadShow:false       //加载完毕
    }
  },
  methods:{
      getData(page){   
          $.ajax({
            url: datUrl.listUrlDat,
            type: 'GET',
            cache:false,
            dataType: 'jsonp',
            jsonp:'callback',
            data:{size:this.sendDat.size,page:page,cache:this.sendDat.cache}
          })
          .done((res)=>{
            this.renderSetDat(res);
          })
          .fail(()=>{
            console.log("请求错误！");
          })
      },
      /**
       * [内容展开收起]
       * @param  {[type]} val  [详细文章内容]
       * @param  {[type]} item [每一条数据]
       * @param  {[type]} evt  [点击事件]
       * @return {[type]}      [description]
       */
      showMoreTxt(val,item,evt){           //展开收起
          let $txtBox=$(evt.target).siblings(".box-txt");
          if(!item.showOnOff){
            $txtBox.html(val);
            $(evt.target).html("收起");
            item.showOnOff=true;
          }else{
            $txtBox.html(filter.cutTxtFun(val,this.cutNumTxt));
            item.showOnOff=false;
            $(evt.target).html("展开");
          }
      },
      /**
       * [渲染数据处理]
       * @param  {[type]} res [请求接收的数据]
       * @return {[type]}     [description]
       */
      renderSetDat(res){
         if(res.data.length==0){
            _this.loadShow=true;
            _this.loadLock=true;
            return;
         }
         this.renderDat=this.renderDat.concat(res.data);
         this.renderDat.forEach((item,ind)=>{
               if(item.Type==10||item.Type==9){   //如果是视频和易车号，没有简介只有标题
                    item.content=item.Title;
                    item.more=false;
                    item.contentLess=item.Title;     //没有内容时候只显示标题
               }else{
                   item.more=(filter.dataLength(item.Summary)>this.cutNumTxt)?true:false;
                   item.content=item.Summary;
                   item.contentLess=filter.cutTxtFun(item.Summary,this.cutNumTxt);
               }
               item.picArr=item.PicCover.split("|");
               item.picTuff=item.picArr.length>1?true:false;
               item.showOnOff=false;               //收起展示
               if(item.picArr.length>3){           //展示图超过三个的时候
                 item.picNum=item.picArr.length;
                 item.picArr=item.picArr.slice(0,3);
               }
         });
         this.loadLock=true;
         //this.renderDat=[...res.data];
      },
      loadMoreFun(){                   //上拉加载
          let $scrollTop=0;
          let $winH=$(window).height();
          let $docH=$(document).height();
          let _this=this;
          $(document).on("scroll",function(){
               $scrollTop=$(this).scrollTop();
               $docH=$(document).height();
               if($scrollTop+$winH>=$docH){
                  if(_this.loadLock && !_this.loadShow){
                      _this.sendDat.page+=1;
                      _this.loadLock=false;
                      setTimeout(()=>{
                        _this.getData(_this.sendDat.page);
                      },1500);
                  }
               }
          })
      }
  },
  mounted(){
      this.getData(this.sendDat.page);
      this.loadMoreFun();
  }
}
</script>
