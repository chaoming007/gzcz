export default function loginFun(callBack){
    var isLogin="";
    Bitauto.Login.LoginOptions.userInfoKey='';
    // Bitauto.Login.LoginOptions.isCheckUserStateByCookie=false;
    Bitauto.Login.onComplatedHandlers.push(function(loginResult){
        	// 是否登录
        	// loginResult={
        	// 	isLogined:true/false,
        	// 	userId: 1202614,
        	//  userName: "111skr"
        	// }
          isLogin=loginResult;
        	if(loginResult.isLogined){
              console.log("已经登录");
        	}else{
              console.log("没有登录");
        	}
          callBack(loginResult);  
    });
    Bitauto.Login.init();
}
