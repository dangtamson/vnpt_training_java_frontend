var expandMenu;
(function($) {
    "use strict";
    if ($('.scroll-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('.scroll-top').addClass('show');

                } else {
                    $('.scroll-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function() {
            backToTop();
            
        });
        $('.scroll-top').on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }
    
    $(".menus a").click(function(e){
        var parent = $(this).parent();
        if(parent.find("ul").length){
            e.preventDefault();
            parent.siblings().removeClass("open");
            if(parent.hasClass("open")){
                parent.removeClass("open");
                
            }else{
                parent.addClass("open");
            }
            


        }
        
    });
  
    $(".header .nav-icon").click(function(){
        var width=$(window).width();
        if(width<=768){
            $(".overlay-common").addClass("show");
        }
        $("body").toggleClass("minimize-menu");
        
    });
    $(".overlay-common").click(function(){
        $("body").removeClass("minimize-menu");
    });
    $(".overlay-common").click(function(){
        $(".header .menus").removeClass("open");
        $(".nav-toggle").removeClass("active");
        $(this).removeClass("show");
    });

    function clockUpdate() {
        var date = new Date();
        function addZero(x) {
            if (x < 10) {
                return x = '0' + x;
            } else {
                return x;
            }
        }

        function twelveHour(x) {
            if (x > 12) {
                return x = x - 12;
            } else if (x == 0) {
                return x = 12;
            } else {
                return x;
            }
        }

        var h = addZero(twelveHour(date.getHours()));
        var m = addZero(date.getMinutes());
        var s = addZero(date.getSeconds());

        $('#DongHo').text(h + ':' + m + ':' + s)
    }
    clockUpdate();
    setInterval(clockUpdate, 1000);

})(jQuery);
$(document).ready(function(){
    if($('[data-tooltip="true"]').length){
        $('[data-tooltip="true"]').tooltip();       
    }
  
});


        
