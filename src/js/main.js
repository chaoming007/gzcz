$(function(){
  var $body = $(document.body);
  /*内容隐藏*/
  (function($c){
    $c.each(function(index,current){
      var $current = $(current);
      var $a = $current.next();
      $a.click(function(ev){
        ev.preventDefault();
        var $this = $(this);
        if($this.hasClass('up')){
          $this.removeClass('up');
          $current.removeClass('up');
        }else{
          $this.addClass('up');
          $current.addClass('up');
        }
      });
    })
  })($body.find('.box-txt'));
})
