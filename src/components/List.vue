<template>
  <div>
    <!--块1 start-->

    <div class="section-item" v-for="(item,ind) in renderDat">
      
      
      <!-- <div class="section-warp" v-if="item.userTuff"> -->
        <div class="section-warp">
        
        <!-- 用户信息 start   -->
        <User :userdat="item" :logdat="isLogin"></User>
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
                        <span v-if="item.Type==9"  :class="item.liveStatusSet['css']">{{item.liveStatusSet['text']}}</span>
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
import DAT_URL from '../js/config.js'
import filter from '../filter/filter.js'
import loginFun from '../js/login.js'
import loadMore from './loadMore.vue'
import User from './User.vue'


export default {
  data () {
    return {
      sendDat:{size:DAT_URL.PAGE_SIZE,page:DAT_URL.PAGE_NUM,cache:DAT_URL.CACHE},  //信息流请求数据
      renderDat:[],
      timRenderDat:[],      //临时信息流数据
      usersArr:[],          //关注用户id集合          
      isLogin:{},         //是否已经登录
      gzTuff:true,            //关注按钮控制
      loadDat:{              //加载更多数据
        page:DAT_URL.PAGE_NUM,  //默认加载第一页
        loadLock:true,
        loadShow:false,
        callBack:this.infoStreamGet
      }         
    }
  },
  props:{
    "cslist":String
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
             url:DAT_URL.LIST_URL_DAT,
             data:{size:this.sendDat.size,page:page,cache:this.sendDat.cache,cslist:this.cslist},
             type:"GET",
             dataType:"jsonp",
             jsonp:'callback',
             callback:this.infoSetDat
         };
         this.getDataFun(getDat);
      },
      userInfoGet(dat){           //用户信息请求
         let getDat={
            url:DAT_URL.USER_URL_DAT+"&uids="+dat,   //"1202614,6476",
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
                 this.usersArr.push(item.UserId);
              }
            }
          });
          
          if(this.usersArr.length>=1){
              uid=this.usersArr.join(",");
              this.gzInfoGet(uid);    //关注请求
          }else{
              this.renderDatSet(this.timRenderDat);
          }    
      },
      gzInfoGet(id){            //是否被关注请求
          if(this.isLogin.isLogined){            //如果没有登录
              let getDat={
                 url:DAT_URL.WATCH_URL_DAT+"?uids="+id,
                 type:"GET",
                 dataType:"jsonp",
                 jsonp:'callback',
                 callback:this.isWatchFun
              }
              this.getDataFun(getDat);
          }else{
              let dat={status:true};
              this.isWatchFun(dat);
          }
      },  
      isWatchFun(dat){                 //关注回调
        if(dat.status==true){
            this.timRenderDat.forEach((item,key)=>{
                if(this.isLogin.isLogined){              //是否登录    
                    dat.data.forEach((item1,key1)=>{
                      if(item.UserId===item1.uid){
                        if(item1.attentionstatus==0){  //attentionstatus
                          item.attentionstatus=0;    //0为没有关注
                        }else{
                          item.attentionstatus=1;    //1为已经关注
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
              item=filter.formatDatFun(item);
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
      },
      vLoginFun(v){        //验证是否登录
          this.isLogin=Object.assign({},v);
          this.infoStreamGet(this.sendDat.page);  
      }
  },
  mounted(){
      //loginFun(this.vLoginFun);
      this.isLogin.isLogined=false;    //GlobalIsLogin;   
      this.vLoginFun(this.isLogin);
  },
  components:{
     loadMore,
     User
  }

}
</script>
