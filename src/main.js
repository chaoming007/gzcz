import Vue from 'vue'
import Pic from './components/Pic.vue'
import List from './components/List.vue'

Event=new Vue();
new Vue({
  el: '#app',
  methods:{
    setTitFun(h){
       let $title=$(this.$el).parent().siblings("head").find("title");
       $title.html(h.Name);
    }
  },
  mounted(){
     Event.$on("setTit",h=>{
        this.setTitFun(h);
     })
  },
  components:{
     //Pic,
     List
  }
})
