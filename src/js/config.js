export default {
   PIC_URL_DAT:"http://api174.car.bitauto.com//Exhibition/GetExhibitionSerial.ashx", //顶通图片数据
   LIST_URL_DAT:"http://api.admin.bitauto.com/aggr/api/chezhan/list/1",             //信息流接口
   USER_URL_DAT:"http://api.i.yiche.com/clientapi/DataCenter?keys=showname,avatarpath,fanscount,roles",   //用户信息数据
   WATCH_URL_DAT:"http://clientapi.yiche.com/friend/IsAttentioned", //是否关注接口
   ADD_WATCH_DAT:"http://clientapi.yiche.com/friend/Attention",      //添加关注接口
   DEL_WATCH_DAT:"http://clientapi.yiche.com/friend/CancelAttention", //取消关注接口
   
   PAGE_NUM:1,    //默认加载第几页
   PAGE_SIZE:7,    //每页条数
   CACHE:true,     
  
   //新闻信息流接口
   newsUrl:"http://m.yiche.com",                           //普通新闻
   ychVideo:"http://hao.m.yiche.com/video/",               //易车号视频
   pic:"http://photo.m.yiche.com{0}",                      //图集
   ychNews:"http://hao.m.yiche.com/wenzhang/",               //易车号新闻
   spzbVideo:"http://live.m.yiche.com/live/{0}.html",       //易车直播
   userCenter:"http://i.m.yiche.com/u"                     //易车号人物个人中心
   
}
