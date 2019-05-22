/*
    From: https://codyhouse.co/gem/auto-hiding-navigation/
*/
(function($) {
    $(document).ready(function() {

        var mainHeader = $('.site-header'),
            //this applies only if secondary nav is below intro section
            headerHeight = mainHeader.height(),
            navHeight;
            

        //var $accordion = $('.accordion');

        //set scrolling variables
        var scrolling = false,
            previousTop = 0,
            currentTop = 0,
            scrollDelta = 10,
            scrollOffset = 150;


        $(window).on('scroll', function() {
          navHeight = $('html.mobile .subnav-wrapper.open .subnav-panel').height();
          //alert(navHeight);
          if (!scrolling) {
              scrolling = true;
              if (!window.requestAnimationFrame) {
                  setTimeout(autoHideHeader, 250);
              } else {
                  requestAnimationFrame(autoHideHeader);
              }
          }
        });

        // $(window).on('resize', function() {
        //     headerHeight = mainHeader.height();
        // });

        function autoHideHeader() {
          currentTop = $(window).scrollTop();
          checkSimpleNavigation(currentTop);
          if ($('html.mobile .subnav-wrapper.open').length) {
            previousTop = navHeight;
          } else{
            previousTop = currentTop;
          }
          
          //previousTop = currentTop;
          scrolling = false;
        } 

        function checkSimpleNavigation(currentTop) {
            //there's no secondary nav or secondary nav is below primary nav
            if (previousTop - currentTop > scrollDelta) {
                //if scrolling up...
                mainHeader.removeClass('site-header--hide');

                /*if(!$('.accordion').hasClass('is-sticky')) {
                  $('.accordion').addClass('accordion--open-default');
                  $('.accordion').find('.accordion__btn-open').addClass('accordion__btn-open--active');
                  $('.accordion .accordion__content').show();
                }

                $('.accordion').addClass('accordion--sticky-up');*/
            } else if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset && !$('.mobile-heading-wrapper').hasClass('mobile-heading-wrapper--take-over')) {
                //if scrolling down...
                mainHeader.addClass('site-header--hide');
                //close all dropdown navigation
                $(document).find('.subnav-wrapper.open').removeClass('open').slideUp();
                $('.overlay-fade').fadeOut();
                $('span.nav-arrow').hide();
                //close any video / image overlays
                //$('.overlay-media').fadeOut().find('.media-container').hide().find('img, video').remove();
               // $('.media-container a').hide();

                /*if($('.accordion').hasClass('is-sticky')) {
                  $('.accordion').removeClass('accordion--open-default');
                  $('.accordion').find('.accordion__btn-open').removeClass('accordion__btn-open--active');
                  $('.accordion .accordion__content').hide();
                }

                $('.accordion').removeClass('accordion--sticky-up');*/
            }
        }
    });
})(jQuery);
