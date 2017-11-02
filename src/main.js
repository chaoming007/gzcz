import Vue from 'vue'
import Pic from './components/Pic.vue'
import List from './components/List.vue'
import Filter from './filter/filter.js'

Event=new Vue();
new Vue({
  el: '#app',
  data:{
    cslist:""
  },
  methods:{
    setTitFun(h){
       let $title=$(this.$el).parent().siblings("head").find("title");
       $title.html(h.Name);
    }
  },
  created(){
     this.cslist=Filter.getQueryString("cslist");  
  },
  mounted(){
     Event.$on("setTit",h=>{
        this.setTitFun(h);
     })
  },
  components:{
     Pic,
     List
  }
})
