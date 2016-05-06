$(document).ready(function() {
  var open = false;
  $('.circle-bg').on('click', function() {
    if(open === false)
      {
       $(this).animate({
          height: '+=10px',
          width: '+=10px'
       }, 300);
        
     $('.outer-icons').animate({
         opacity: 1
        }, 1000);
        
     $('.icon').fadeOut();
     $(this).html("<i class = 'icon fa fa-times' style='display: none'> </i>");
     $('.icon').fadeIn();
        
        open = true;
      }
    
    else {
      $(this).animate({
        height: '-=10px',
        width: '-=10px'
      }, 200);
    
    $('.outer-icons').animate({
        opacity: 0
      }, 300);
      
    $('.icon').fadeOut();
     $(this).html("<i class = 'icon fa fa-bars' style='display: none'> </i>");
     $('.icon').fadeIn();
      
      open = false;
  } 
    
 });
});