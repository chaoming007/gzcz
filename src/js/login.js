export default function loginFun(){
    let isLogin="";
    Bitauto.Login.LoginOptions.userInfoKey='';
    Bitauto.Login.onComplatedHandlers.push(function(loginResult){
        	// 是否登录
        	// loginResult={
        	// 	isLogined:true/false,
        	// 	userId: 1202614,
        	//  userName: "111skr"
        	// }
          isLogin=loginResult;
        	if(loginResult.isLogined){
              
        	}else{
              
        	}

    });
    Bitauto.Login.init();
    return isLogin;
}
