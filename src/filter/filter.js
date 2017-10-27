import Vue from 'vue'
export default{
  /**
   * [内容截取，当内容为空的时候直接返回]
   * @param  {[type]} val [要截取的内容]
   * @param  {[type]} num [截取的字数]
   * @return {[type]}     [截取之后的内容]
   */
  cutTxtFun(val,num){
      if(!val){ return val; }
      let end="";
      let sub_length = num ;
      let temp1 = val.replace(/[^\x00-\xff]/g,"**");
      let temp2 = temp1.substring(0,sub_length);
      let x_length = temp2.split("\*").length - 1 ;
      let hanzi_num = x_length /2 ;
      sub_length = sub_length - hanzi_num ;  //实际需要sub的长度是总长度-汉字长度
      let res = val.substring(0,sub_length);
      if(!num){ return val; }
      if(sub_length < val.length ){
         end =res+"..." ;
      }else{
         end = res ;
      }
      return end ;
  },
  
  /**
   * [检查字数]
   * @param  {[type]} fData [要检查的数据]
   * @return {[type]}       [字符数]
   */
  dataLength(fData){ 
      let intLength=0;
      if(!fData) return;
      for(var i=0;i<fData.length;i++){ 
          if((fData.charCodeAt(i) < 0) || (fData.charCodeAt(i) > 255)){
            intLength=intLength+2; 
          }else{
            intLength=intLength+1;
          }       
      } 
      return intLength; 
  },
  /**
   * [getQueryString 获得地址参数值]
   * @param  {[type]} name [参数名]
   * @return {[type]}      [description]
   */
  getQueryString(name){
     let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     let r = window.location.search.substr(1).match(reg);
     if(r!=null){
       return  unescape(r[2]);
     }else{
       return null;
     }    
  } 
}
/**
 * [时间格式化过滤器]
 * @type {时间}
 */
Vue.filter("timSet",(val)=>{
    let datNow=new Date().getTime();
    let num=val.indexOf(".")>-1?val.indexOf("."):val.length;
    let setNow=val.substring(0,num);
    let datNum=setNow.replace(/T/," ");
    let datVal=new Date(datNum).getTime();
    let resVal="";
    let timBad=datNow-datVal;   //时间差
    if(timBad<hmFun(3600)){
       setTimFun(timBad);
    }else{
      resVal=val.substring(setNow.indexOf("-"),setNow.indexOf("T"));
    }
    function setTimFun(t){
      if(t>=hmFun(30) && t<hmFun(60)){
         resVal="刚刚";
         return;
      }
      for(let i=1;i<60;i++){
          if(t>=hmFun(i*60) && t<hmFun((i+1)*60)){
             resVal=i+"分钟前发布";
             continue;
          }
      }
    }
    function hmFun(v){
       return v*1000;
    }
    return resVal;
});


Vue.filter("urlSet",(val)=>{
   return "http://m.yiche.com"+val;
})
Vue.filter("bbsSet",(val)=>{
   return val==null? "" : ("#"+val);
})

/**
 * [图片类型处理]
 * @param  {[type]} val [图片地址]
 * @param  {[type]} type [数据来源类型]
 */

/*
  None = 0,
  /// 文章
  News = 1,
  /// 视频
  Video = 2,
  /// 视频社区
  VideoForum = 3,
  /// 图集-实拍图(以车款为准)
  AlbumCar = 4,
  /// 图集-车展图集(以车展分类最细分类为准)
  AlbumImage = 5,
  /// 论坛帖
  Forum = 6,
  /// 口碑
  Koubei = 7,
  /// 车型详解
  Car = 8,
  /// 视频直播
  VideoLive = 9,
  /// 自媒体（易车号）
  MediaNews = 10,
  /// App活动专题(来自于app头条活动专题数据)
  AppActivity = 11,
  /// 易车号视频
  /// 该类型可能只是临时使用，因为自媒体视频在不久的将来会和视频社区合并。
  /// 目前自媒体视频类型的数据全都存到视频社区下。
  /// 并且自媒体视频类型仅用于存储，不用于查询。
  MediaVideo = 12,
  /// 动态
  Dongtai = 13
  
*/

Vue.filter("picUrlSet",(val,type)=>{
    let urlVal=val;
    switch(type){
      case 9: case 10: case 12: case 2:
        urlVal=val.replace(/\{0\}/,"newsimg_690x380");
        break;
      case 4:
        urlVal=val.replace(/\{0\}/,3);
        break;
      case 6: case 1:
        urlVal=val.replace(/\{0\}/,"_226_150_");
        break;
      case 20:
        urlVal=val.replace(/\{0\}/,30);
        break;
    }
    return urlVal;
})
