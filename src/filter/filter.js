import Vue from 'vue'

Vue.filter("timSet",(val)=>{
    let datNow=new Date().getTime();
    let datNum=val.replace(/d+Td+/," ");
    let datVal=new Date(datNum).getTime();
    let resVal="";
    if(datNow-datVal>=60*1000 && datNow-datVal<=2*60*1000){
       resVal="一分钟前发布";
    }
    if(datNow-datVal>2*60*1000 && datNow-datVal<=30*60*1000){
       resVal=val.substring(val.indexOf("T")+1);
    }
    if(datNow-datVal>30*60*1000){
       resVal=val.substring(0,val.indexOf("T"));
    }
    return resVal;
});
Vue.filter("urlSet",(val)=>{
   return "http://m.yiche.com"+val;
})
Vue.filter("bbsSet",(val)=>{
    return val==null? "" : ("#"+val);
})
Vue.filter("picUrlSet",(val,type)=>{
    let urlVal=val;
    if(type==9 || type==10 || type==12 || type==2){
       urlVal=val.replace(/\{0\}/,"newsimg_690x380");
    }
    if(type==4){
       urlVal=val.replace(/\{0\}/,3);
    }
    if(type==6 || type ==1){
       urlVal=val.replace(/\{0\}/,"_226_150_");
    }
    return urlVal;
})
