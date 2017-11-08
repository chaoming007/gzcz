
var WAP = "wap";
var APP = "app";
var PC = "pc";
var type;

var  windpattens='(240x320|acer|acoon|acs-|abacho|ahong|airness|alcatel|amoi|android|anywhereyougo.com|applewebkit/525|applewebkit/532|asus|audio|au-mic|avantogo|becker|benq|bilbo|bird|blackberry|blazer|bleu|cdm-|compal|coolpad|danger|dbtel|dopod|elaine|eric|etouch|fly |fly_|fly-|go.web|goodaccess|gradiente|grundig|haier|hedy|hitachi|htc|huawei|hutchison|inno|ipad|ipaq|ipod|jbrowser|kddi|kgt|kwc|lenovo|lg |lg2|lg3|lg4|lg5|lg7|lg8|lg9|lg-|lge-|lge9|longcos|maemo|mercator|meridian|micromax|midp|mini|mitsu|mmm|mmp|mobi|mot-|moto|nec-|netfront|newgen|nexian|nf-browser|nintendo|nitro|nokia|nook|novarra|obigo|palm|panasonic|pantech|philips|phone|pg-|playstation|pocket|pt-|qc-|qtek|rover|sagem|sama|samu|sanyo|samsung|sch-|scooter|sec-|sendo|sgh-|sharp|siemens|sie-|softbank|sony|spice|sprint|spv|symbian|talkabout|tcl-|teleca|telit|tianyu|tim-|toshiba|tsm|up.browser|utec|utstar|verykool|virgin|vk-|voda|voxtel|vx|wap|wellco|wig browser|wii|windows ce|wireless|xda|xde|zte|iemobile|iphone|ipod|ipad|android|nokia|sonyericsson|blackberry|samsung|sec\-|windows ce|motorola|mot\-|up.b|midp\-)';

if (new RegExp(windpattens, 'ig').test(navigator.userAgent)){
  type= WAP;
}else if(getCookie("ycappinfo") != null || getCookie("BitautoAppInfo")!= null){  //易车App
  type= APP;
}else{
  type= PC;
}
function isWap() {
  return type == WAP;
}
function isApp() {
  return type == APP;
}

function getCookie(name) {
    var ck = document.cookie;
    var exp1 = new RegExp(name + "=.*?(?=;|$)");
    var mch = ck.match(exp1);
    return mch ? unescape(mch[0].substring(name.length + 1)) : null;
}

function callApp(id,type)
{
    var result = "";
        if (id != undefined && type != undefined) {
            switch (type) {
                
                case 1: //易车新闻
                    result = "bitauto.yicheapp://yiche.app/ycnews.xiangqing?id=" + id + "&type=20";
                    break;
                case 2: //易车视频
                    result = "bitauto.yicheapp://yiche.app/video.xiangqing?id=" +id + "&type=2";
                    break;
                case 3: //社区视频
                    result = "bitauto.yicheapp://yiche.app/video.xiangqing?id=" + (100000000+eval(id)) + "&type=4";
                    break;
                case 9: //直播
                    result = "bitauto.yicheapp://yiche.app/news.watchlive?id=" + id + "&type=9";
                    break;
                case 10: //易车号文章页
                    result = "bitauto.yicheapp://yiche.app/medianews.xiangqing?id="+id+"&type=21";
                    break;
                case 12: //易车号视频
                    result = "bitauto.yicheapp://yiche.app/video.xiangqing?id=" + id + "&type=31";
                    break;
                case 13://个人中心
                    result = 'bitauto.yicheapp://yiche.app/uer.persencenter?usermsg=' + encodeURI('{"userId":"' + id + '"}');
                    break;
                case 14://推荐易车号
                    result = "bitauto.yicheapp://yiche.app/news.focusycnum";
                    break;
             default :
                result="";
                break;    
            }
        }
    
    return result;
}
var isLogin = false;

var asyncLogin=$.ajax({
      url: "http://clientapi.yiche.com/account/authenticate",
      type: "get",
      cache: false,
xhrFields: { withCredentials: true }
});


function isLoginFun(callBack) {
  if (isWap()) {
    asyncLogin.done(function (data) {
      if(data.IsAuthenticated){
         isLogin = true;
      }else{
         isLogin = false;
      }  
      callBack(isLogin);
    });
  }
  else if (isApp()) {
    if (getCookie("BitautoAppUserToken") != null) {
      isLogin = true;
      callBack(isLogin);
    }
  }
  else {
    if (typeof Bitauto != "undefined") {
      isLogin = !!Bitauto.Login.result ? Bitauto.Login.result.isLogined : false;
      callBack(isLogin);
    }
  }
}



function gotoLogin() {
  if (isWap()) {
    window.location.href = "http://i.m.yiche.com/authenservice/login.html?returnurl=" +
      encodeURIComponent(window.location.href)
  } else if (isApp()) {
    window.location.href = "bitauto.yicheapp://yiche.app/user.login?type=1&redirecturl=" +
      encodeURIComponent(window.location.href)
  } else {
    window.location.href = "http://i.yiche.com/authenservice/login.html?returnurl=" +
      encodeURIComponent(window.location.href)
  }
}
