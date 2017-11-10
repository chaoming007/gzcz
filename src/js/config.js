export default {
   PIC_URL_DAT:"http://api.car.bitauto.com/Exhibition/GetExhibitionSerial.ashx", //顶通图片数据
   LIST_URL_DAT:"http://api.admin.bitauto.com/aggr/api/chezhan/list/16",             //信息流接口
   USER_URL_DAT:"http://api.i.yiche.com/clientapi/DataCenter?keys=showname,avatarpath,fanscount,roles",   //用户信息数据
   WATCH_URL_DAT:"http://clientapi.yiche.com/friend/IsAttentioned", //是否关注接口
   ADD_WATCH_DAT:"http://clientapi.yiche.com/friend/Attention",      //添加关注接口
   DEL_WATCH_DAT:"http://clientapi.yiche.com/friend/CancelAttention", //取消关注接口
   
   PAGE_NUM:1,    //默认加载第几页
   PAGE_SIZE:7,    //每页条数
   CACHE:true,     
   
  //  暂无图片
  
  NO_IMG:"http://img2.bitautoimg.com/bitauto/2017/11/09/a2c7e83d-8c5a-43fa-b2d6-df1c55acfbb5.png",
   
  
   //新闻信息流接口
   newsUrl:"http://m.yiche.com",                           //普通新闻
   spsqVideo:"http://vc.m.yiche.com",                   //视频社区
   ychVideo:"http://hao.m.yiche.com/video/",               //易车号视频
   pic:"http://photo.m.yiche.com{0}",                      //图集
   ychNews:"http://hao.m.yiche.com/wenzhang/",               //易车号新闻
   spzbVideo:"http://live.m.yiche.com/live/{0}.html",       //易车直播
   userCenter:"http://i.m.yiche.com/u"                     //易车号人物个人中心
   
}
