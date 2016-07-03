jQuery(document).ready(function($) {
 
   


/*
   $("#owl-products").owlCarousel(
    {
        autoplay:true,
        autoplayTimeout:2500,
          loop:false,
         nav : true,
         responsiveClass:true,
         margin: 30,        
        responsiveClass:true,
        responsive:{
        0:{
            items:1
        },
        767:{
            items:3
        },
        992:{
            items:4
        }
        }
    });*/


$('select').selectBox();


 $(".dropcategory").click(function(){
        $(".drop-list").collapse('toggle');
    });



$('.carousel').swipe( {
     swipeLeft: function() {
         $(this).carousel('next');
     },
     swipeRight: function() {
         $(this).carousel('prev');
     },
     allowPageScroll: 'vertical'
 });


 });