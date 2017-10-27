<template>
  <div>
    <!--块1 start-->

    <div class="section-item" v-for="(item,ind) in renderDat">
      
      
      <div class="section-warp" v-if="item.userTuff">
        
        <!-- 用户信息 start   -->
        <User :userdat="item"></User>
        <!-- 用户信息 end  -->

        <!-- 信息流 start -->
        
        <div class="section-row">

          <!-- 图片列表 start   -->
          
              <div class="section-warp_5 img-list-set" v-if="item.picTuff">
                      <p class="txt">{{item.contentLess}}</p>
                      <ul class="col-img-3">
                            <li v-for="(itempic,num) in item.picArr">
                                <a :href="item.aLink" target="_blank" class="img-box">
                                  <img :src="itempic|picUrlSet(item.Type)" />
                                  <i class="icon-photo" v-show="num==2">共{{item.PicCount}}图</i>
                                </a>
                            </li>
                      </ul>
                      <!-- 发布信息 start   -->
                         <p href="###" class="info-photo-brand">
                           <em class="time">{{item.EntityPublishTime|timSet}}</em>
                         </p>
                      <!-- 发布信息 end   -->  
              </div>
              
          <!-- 图片列表 end   -->
  
          <!-- 新闻流 start   -->
              <div class="info-photo"  v-else>
                    <a class="ref" :href="item.aLink" target="_blank">
                      <h6><span class="box-txt">{{item.contentLess}}</span></h6>
                    </a>
                    <a :href="item.aLink"  target="_blank" class="img-box">
                      <i class="icon-video" v-show="item.Type==12||item.Type==9"></i>
                      <img :src="item.PicCover | picUrlSet(item.Type)" />
                    </a>
                    <!-- 发布信息 start   -->
                       <p href="###" class="info-photo-brand">
                         <em class="time">{{item.EntityPublishTime|timSet}}</em>
                       </p>
                    <!-- 发布信息 end   -->
              </div>
          <!-- 新闻流 end   -->
          
          <!-- 文字流 start   -->
          <div class="section-row img-list-set" v-if="item.txtTuff">
  					  <p class="txt"><span class="box-txt">{{item.contentLess}}</span><a href="###" class="lnk"></a></p>
              <!-- 发布信息 start   -->
                 <p href="###" class="info-photo-brand">
                   <em class="time">{{item.EntityPublishTime|timSet}}</em>
                  
                 </p>
              <!-- 发布信息 end   -->
  				</div>
          <!-- 文字流 end   -->
              
        </div>
        
        <!-- 信息流 end -->

      </div>
    
      
    </div>

    <!--块1 end-->

    <loadMore :dat="loadDat"></loadMore>
    
    
  </div>
</template>

<script>
import datUrl from '../js/config.js'
import filter from '../filter/filter.js'
import loginFun from '../js/login.js'
import loadMore from './loadMore.vue'
import User from './User.vue'


export default {
  data () {
    return {
      sendDat:{size:50,page:1,cache:true},  //信息流请求数据
      renderDat:[],
      timRenderDat:[],      //临时信息流数据
      usersArr:[],          //关注用户id集合
      testArr:[],             
      isLogin:false,         //是否已经登录
      gzTuff:true,            //关注按钮控制
      loadDat:{              //加载更多数据
          page:1,
          loadLock:true,
          loadShow:false,
          callBack:this.infoStreamGet
      }         
    }
  },
  methods:{
      /**
       * ajax请求
       * @param  {[type]} dat [description]
       * @return {[type]}     [description]
       */
      getDataFun(dat){        
          $.ajax(dat).done((res)=>{
            dat.callback(res);
          }).fail(()=>{
              console.log("请求错误！");
          })
      },
      infoStreamGet(page){         //信息流数据请求
         this.loadDat.page=page;
         let getDat={
             url:datUrl.listUrlDat,
             data:{size:this.sendDat.size,page:page,cache:this.sendDat.cache},
             type:"GET",
             dataType:"jsonp",
             jsonp:'callback',
             callback:this.infoSetDat
         };
         this.getDataFun(getDat);
      },
      userInfoGet(dat){           //用户信息请求
         let getDat={
            url:datUrl.userUrlDat+"&uids="+dat,   //"1202614,6476",
            type:"GET",
            dataType:"jsonp",
            jsonp:'callback',
            callback:this.renderUserDat
         };
         this.getDataFun(getDat);
      },
      renderUserDat(res){        //用户信息和信息流组合
          let uid="";
          this.usersArr=[];
          this.timRenderDat.forEach((item,key)=>{
            if(res[key]){
              if(item.UserId===res[key].uid){
                 item.userInfo=res[key];
                 this.usersArr.push(item);
              }
            }
          });
          this.testArr=[...this.usersArr];                           //测试
          this.usersArr=[2963544,2963550,2963720,2963625,2963626];   //测试
          
          
          if(this.testArr.length>=1){
              uid=this.usersArr.join(",");
              this.gzInfoGet(uid);    //关注请求
          }else{
              this.renderDatSet(this.timRenderDat);
          }    
      },
      gzInfoGet(id){            //关注请求
          let getDat={
               url:datUrl.watchUrlDat+"?uids="+id,
               type:"GET",
               dataType:"jsonp",
               jsonp:'callback',
               callback:this.isWatchFun
          }
          this.getDataFun(getDat);
      },  
      isWatchFun(dat){                 //关注回调
          if(dat.status==true){
            this.timRenderDat.forEach((item,key)=>{
                //console.log(this.isLogin.isLogined);
                if(this.isLogin.isLogined){              //是否登录
                        dat.data.forEach((item1,key1)=>{
                              if(item.UserId===item1.uid){
                                  if(dat.data[key].attentionstatus==0){
                                      item.attentionstatus=0;            //0为没有关注
                                  }else{
                                      item.attentionstatus=1;            //1为已经关注
                                  }
                              }else{
                                 item.attentionstatus=0;
                              }    
                        })
                }else{
                      item.attentionstatus=0;         //未登录只显示关注按钮
                } 
            })
          }else{
            throw error("请求错误！");
          }
          this.renderDatSet(this.timRenderDat);  
      },
    
      /**
       * [渲染数据处理]
       * @param  {[type]} res [请求接收的数据]
       * @return {[type]}     [description]
       */
      
      renderDatSet(res){  //渲染数据逻辑处理
        
          this.renderDat=this.renderDat.concat(res);
          this.renderDat.forEach((item,ind)=>{
   
                item.content=item.Summary;             //没有图片时候显示内容
                item.contentLess=item.Summary;

                if(item.Type==12){                     //如果是易车号视频，
                     item.content=item.Title;
                     item.contentLess=item.Title;
                     item.aLink=datUrl.ychVideo+item.Id;       
                }
                if(item.Type==10){                    //如果是易车号文章
                    item.content=item.Title;
                    item.contentLess=item.Title;
                    item.aLink=datUrl.ychNews+item.Id;        
                }
                if(item.Type==9){                    //如果是视频直播
                    item.content=item.Title;
                    item.contentLess=item.Title;
                    item.aLink=datUrl.spzbVideo.replace(/\{0\}/,item.Id);        
                }
                if(item.Type==4){                    //如果是图集   时候只显示车系名
                     item.content=item.CsName;
                     item.contentLess=item.CsName;   
                     item.aLink=datUrl.pic.replace(/\{0\}/,item.Id); 
                }
                if(item.Type==1){                   //如果是普通新闻
                     item.aLink=datUrl.newsUrl+item.Url;
                }
                
                                               
                if(item.userInfo){               //是否显示关注的用户
                   item.userTuff=true;
                }else{
                   item.userTuff=false;
                }
                                
                item.picArr=item.PicCover.split("|");            //多张图片得时候
                item.picTuff=item.picArr.length>1?true:false;
                item.txtTuff=item.picArr.length<1?true:false;   //只有文字没有图片

                if(item.picArr.length>3){           //展示图超过三个的时候
                  item.picNum=item.picArr.length;
                  item.picArr=item.picArr.slice(0,3);
                }
          });
          this.loadDat.loadLock=true;
      },
      
      infoSetDat(res){
         if(res.data.length==0){     //没有数据时候
            this.loadDat.loadShow=true;
            this.loadDat.loadLock=true;
            return;
         }
         this.timRenderDat=[...res.data];
         this.userArrFun(res);
      },
      userArrFun(res){               //请求用户id处理
          let userIdArr=[];
          let uids="";
          res.data.forEach((item,ind)=>{
              userIdArr.push(item.UserId);
          });
          uids=userIdArr.join(",");
          this.userInfoGet(uids);
      }

  },
  mounted(){
      this.isLogin=loginFun();
      this.infoStreamGet(this.sendDat.page);  
  },
  components:{
     loadMore,
     User
  }

}
</script>
