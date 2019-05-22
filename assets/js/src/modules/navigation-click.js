// ==============================================
// RESET MENU
// ==============================================

//var breakpoint = {};
//
//breakpoint.refreshValue = function() {
//    if ('querySelector' in document && 'localStorage' in window && 'addEventListener' in window) {
//        this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
//    } 
//};
//
//function resetNav() {	
//	breakpoint.refreshValue();	
//	if (breakpoint.value==='desktopnav') {
//		$('html').removeClass('mobilemenu');
//		$('.mainnav .subnav').removeAttr('style');
//	} else {
//		$('.mainnav > li').removeClass('hover');
//	}
//}
//
//$(window).resize(function() {
//    resetNav();
//});

function checkScreenSize(){
	if($(window).width() < 1008){
		$('html').addClass('mobile').removeClass('desktop');
    $('.overlay-fade').hide();
    $('html.desktop span.nav-arrow').hide();
		$('.subnav-wrapper').hide().removeClass('open');
    $('.has-subnav').find('.trigger__sublist li a').removeClass('active');
    $('.carousel-item').removeClass('slick-current slick-active');
	}else{
		$('html').removeClass('mobile').addClass('desktop');
		$('.main-nav , .has-subnav').show();  
	}
}
checkScreenSize();

$(window).resize(function() {
	checkScreenSize();	
});

//
//// ==============================================
//// TAB INDEX
//// ==============================================

$('.subnav-panel a, .subnav-cloned li a').each(function(index, link){
  link.tabIndex = -1;
});



//
//// ==============================================
//// DESKTOP
//// ==============================================

var desktopNav = $('html.desktop .main-nav ul.main-nav-menu'), desktopNavItem = desktopNav.find('> li'), desktopLiWithSub = desktopNav.find('li.has-subnav'), navArrow = $('html.desktop span.nav-arrow'), desktopSubNavTrigger = desktopNav.find('li.has-subnav > a'), subNav = $('.subnav-wrapper'), navOverlay = $('html.desktop .overlay-fade.overlay-nav');

subNav.each(function() {
	$(this).css('opacity','0').addClass('content-loaded').removeClass('u-hidden');
});
//subNav.hide()

$(document).on('click', 'html.desktop li.has-subnav > a', function(){
  $('header').css('z-index', 100);
	$('.subnav-wrapper.content-loaded').hide().css('opacity','1').removeClass('content-loaded');
	var subNavOpen = $(document).find('.subnav-wrapper.open'), thisSubNavOpen = $(this).parent().find('.subnav-wrapper.open');
	$('.searchbox').hide().find('input[type=text]').blur();
	$('.has-subnav').find('.trigger__sublist li a').removeClass('active');
	$(this).parent().find('.trigger__sublist li').eq(0).find('a').addClass('active');
  
  //$('.subnav-cloned ul li').eq(0).find('a').focus();
  setTimeout(function() {
    $('.subnav-cloned:visible li').eq(0).find('a').focus();
  }, 300);
  
	
	if (thisSubNavOpen.length){
		//if the clicked item's subnav is already open
		navOverlay.fadeOut(300);
		thisSubNavOpen.removeClass('open').slideUp(function(){
			navOverlay.fadeOut();
			navArrow.hide();
		});
	}else{ 
		var $this = $(this);
    navOverlay.fadeIn(); 
    //setTimeout(function() {
      navArrow.hide();
      if (subNavOpen.length){
        //a panel is already open but not the clicked one, so don't animate with slideUp, just fade the panel
        $this.parent().find(navArrow).show();
        $this.parent().find(subNav).fadeToggle().toggleClass('open');
        subNavOpen.hide().removeClass('open');
        $('.subnav-panel a, .subnav-cloned li a').removeAttr('tabindex');
        //$(document).find('.trigger__sublist li:first a').trigger('click')[0];

      }else{
        //no panels are open, so show the panel selected
        $this.parent().find(navArrow).show();
        $this.parent().find(subNav).slideToggle().toggleClass('open');
        navOverlay.fadeIn();
        $('.subnav-panel a, .subnav-cloned li a').removeAttr('tabindex');
        $this.parents('.has-subnav').find('.subnav-cloned li').eq(0).find('a').focus();
      }

      var clonedContent = $this.parent().find('.subnav-cloned');
      if (clonedContent.is(':visible')) {
        //if clonedContent is not midway through animation
        //var slideIndex = $(this).parent().find(".trigger__sublist li:first").index();
        var slideToGo = $this.parent().find(".trigger__sublist li").eq(0).find('a').attr('data-show-sublist');

        //$('.subnav-carousel' ).slick('slickGoTo', parseInt(slideIndex));
        //alert(slideIndex);

        var currentSlideContent = $('#' + slideToGo).html();
        $this.parents('.has-subnav').find('.subnav-cloned').html(currentSlideContent);
        $this.parents('.has-subnav').find('.subnav-cloned li').eq(0).find('a').focus();
        $this.parents('.has-subnav').find('.subnav-cloned').fadeIn();
      } else {
        $this.parents('.has-subnav').find('.subnav-cloned li').eq(0).find('a').focus();
      }
    //}, 250); 
	}
  
  $(this).parents('.has-subnav').find( ".subnav-cloned li:last-child a" ).focusout(function() {
    $('ul.trigger__sublist > li a.active').parent().next().find('a').focus();
    $('.subnav-cloned li a').attr('tabindex' , -1);
  });
  
  $(".trigger__sublist li a").click(function(e){
    e.preventDefault();

    var clonedContent = $(this).parents('.subnav-controls').find('.subnav-cloned');
    if (clonedContent.is(':visible')) {
      //if clonedContent is not midway through animation
      var slideIndex = $('.trigger__sublist li').index();
      var slideToGo = $(this).attr('data-show-sublist');
      $('.trigger__sublist a').removeClass('active');
      $(this).addClass('active');

      $('.subnav-carousel' ).slick('slickGoTo', parseInt(slideIndex));
      clonedContent.hide();

      setTimeout(function(){
        var currentSlideContent = $('#' + slideToGo).html();
        clonedContent.html(currentSlideContent);
        //$(this).parents('.has-subnav').find('.subnav-cloned li a').eq(0).focus();
        clonedContent.fadeIn();
        //setTimeout(function() {
          clonedContent.find('li').eq(0).find('a').focus();
          clonedContent.find('li a').attr('tabindex' , 0);
       //}, 300);
        
        clonedContent.find( "li:last-child a" ).focusout(function() {
          $('ul.trigger__sublist > li a.active').parent().next().find('a').focus();
          clonedContent.find('li a').attr('tabindex' , -1);
        });
        
        $('.carousel-item').removeClass('opacityOne');
        $('#' + slideToGo).parents('.carousel-item').css('opacity' , 1).addClass('opacityOne');
        setTimeout(function(){
          $('.carousel-item').not('.opacityOne').css('opacity' , 0);
        }, 500);
        
      }, 300);

    }

  });
  return false;	
});



//close menu button
$('.subnav-wrapper span.close a, main').on('click', function(){
	$(document).find('.subnav-wrapper.open').removeClass('open').slideUp(function(){
    navOverlay.fadeOut();
    navArrow.hide();
  });
  
	//return false;
});

//Search bar
$('.search, .trigger__search').click(function(){
	$('.subnav-wrapper').removeClass('open').hide();
	navOverlay.fadeOut().hide();
	$('.searchbox').fadeToggle().find('input[type=text]').focus();
});

$('.searchbox .closemessage, .main').click(function(){
	$('.searchbox').fadeOut();
});






//
////hover/dropdown
//$('.mainnav > li').on('mouseenter', function() {
//	$(this).addClass('hover');
//}).on('mouseleave', function() {
//	$(this).removeClass('hover');
//});
//
////keyboard navigation	
//$('.nav--hassubnav').on('keydown', function(ev) {
//	switch(ev.keyCode) {
//		case 9: //tab
//			if(event.shiftKey) { //shift and tab
//				$(this).parent().prev().find('a').first().focus();
//			} else { 
//				$(this).parent().next().find('a').first().focus();
//			}
//			break;
//		case 40: //down arrow
//			$(this).addClass('hover')
//				.next('.subnav').addClass('subnav--show')
//				.find('a:visible').first().focus();
//			break;
//	}
//	ev.stopPropagation;
//	return false;
//});
//
//$('.subnav a').on('keydown', function(ev) {
//	switch(ev.keyCode) {
//		case 13: //enter
//			$(this).click();
//			break;
//		case 9: //tab
//			$(this).parents('.subnav').removeClass('subnav--show').prev('.nav--hassubnav').removeClass('hover').focus();
//			break;
//		case 38: //up arrow
//			$(this).parent().prev('li:visible').find('a').focus();
//			break;
//		case 40: //down arrow
//			$(this).parent().next('li:visible').find('a').focus();
//			break;
//	}
//	ev.stopPropagation;
//	return false;
//});
//
////touch device - close menu
//$('main').on('touchstart', function(e){
//    $('.subnav').removeClass('subnav--show');
//});
//
//// ==============================================
//// MOBILE
//// ==============================================

/*


var mobileNav = $('html.mobile .main-nav ul.main-nav-menu'), mobileNavItem = mobileNav.find('> li'), mobileLiWithSub = mobileNav.find('li.has-subnav'), mobileSubNavTrigger = mobileNav.find('li.has-subnav > a');
var html = $("html");
mobileNavItem.addClass('default');




$('ul.main-nav-menu li.has-subnav a').each(function(index, element) {
    var sectionLabel = $(this).text();
	$(this).parent().find('ul li').attr('data-parent', sectionLabel);
});

//grab all the subitems and plonk them on the page
var allSubNavItems = $('ul.main-nav-menu li:not(.return-link):not(.parent-link)[data-parent]').removeAttr('style').clone();
$('.mobile-subnav-cloned').append('<ul class="nav-sublist"><li class="return-link home-link"><a href="#">Home</a></li></ul>').find('ul.nav-sublist').append(allSubNavItems);

$(document).on('click', 'html.mobile ul.main-nav-menu li.has-subnav a, .mobile-subnav-cloned li.has-subnav a', function(){
	
	var thisText =  $(this).text();
	
	if (thisText.indexOf("Where we operate") !== -1) {
		alert('WWWWE');
	}else{
	
		$('ul.main-nav-menu').fadeOut()
		var $t = $(this), thisSubNav = $t.parent().find('.nav-sublist').html(), thisName = $t.text(), thisContent = $t.parent().html(), thisLink = $t.attr('href');
		if ($(this).parents().hasClass('mobile-subnav-cloned')){
			//in the cloned panel
			$('.mobile-subnav-cloned .nav-sublist li.parent-page').removeClass('parent-page').addClass('return-link');
			$('.mobile-subnav-cloned .nav-sublist li:not(.return-link)[data-parent!="'+thisName+'"]').hide();
			$('.mobile-subnav-cloned .nav-sublist li[data-parent="'+thisName+'"]').fadeIn();
			$( '<li class="parent-page" data-parent="'+thisName+'"><a href="'+thisLink+'">'+thisName+'</a></li>' ).insertAfter( ".mobile-subnav-cloned .nav-sublist li.return-link:visible:last" );
			
		}else{
			//not in the cloned panel
			var thisBackground = $(this).parent().find('.subnav-panel').attr('style');
			$('.mobile-subnav-cloned .nav-sublist li[data-parent]').hide()
			$('.mobile-subnav-cloned .nav-sublist li[data-parent="'+thisName+'"], .mobile-subnav-cloned .nav-sublist li.home-link').fadeIn()
			$('.mobile-subnav-cloned').fadeIn();
			$('.mobile-subnav-cloned .nav-sublist').attr('style',thisBackground);
		}	
	
	}//WWO
	return false;

});

*/
function mobileNavSize(){
	var windowHeight = $(window).height();
	$('.mobile-nav-menu, .mobile-nav-menu .nav-sublist').css('height',windowHeight);
}
mobileNavSize();

$('.mobile-nav-menu li.has-subnav > a').on('click', function(){
	var $parent = $(this).parent();
	$(this).blur();
  $('.mobile-nav-menu').removeClass('maxheight');
		if($parent.hasClass('return-link')){
			$parent.removeClass('return-link').addClass('parent-page');
			$parent.find('> .nav-sublist li').fadeIn();
			$parent.find('> .nav-sublist li.parent-page').removeClass('parent-page');
			$parent.find('> .nav-sublist li ul.nav-sublist').hide();
			
		}else{
			$parent.parent().parent('.parent-page').removeClass('parent-page').addClass('return-link')
			$parent.addClass('parent-page').hide().siblings().hide();
			$parent.find('> ul.nav-sublist').fadeIn();
			$parent.addClass('parent-page').fadeIn()
			$('.mobile-nav-menu li.home-link').fadeIn();
		}
	return false;
});

//mobile nav close trigger
$('.js-close-nav__trigger').on('click', function() {
	$('.mobile-subnav-cloned').fadeOut()	
	$('.main-nav').fadeOut();
	$('.mobile-nav-controls').show();
  
  $('html').removeClass('mobilemenu');
	return false;
});

//mobile nav trigger
$('.js-nav__trigger').on('click', function() {	
	$('.mobile-nav-controls').toggle();
	$('.main-nav').fadeIn();
	$('.mobile-nav-menu').show();
	//$('html').toggleClass('mobilemenu');
	$('ul.main-nav-menu').slideDown();
  setTimeout(function() {
    $('html').addClass('mobilemenu');
  }, 500);
  
	return false;
});

$(window).resize(function() {
	//$(document).find('html.mobile .js-close-nav__trigger').trigger('click');
	//$(document).find('.main-nav').show().removeAttr('style');
	//$(document).find('html.desktop .mobile-nav-controls').hide();
	//$(document).find('html.mobile .mobile-nav-controls').show();
	//$(document).find('html.mobile .subnav-wrapper.open span.close a').trigger('click');
	mobileNavSize();
});

//mobile back to main menu trigger
$('.mobile-nav-menu li.home-link a').on('click', function(){
	$('.mobile-nav-menu').addClass('maxheight');
	$('.mobile-nav-menu li.parent-page').removeClass('parent-page');
	$('.mobile-nav-menu li.has-subnav ul').fadeOut();
	$(this).parent().fadeOut();
	$('.mobile-nav-menu li.has-subnav').removeClass('return-link');
	//$('.mobile-subnav-cloned').fadeOut()//.find('ul').remove();
	//$('ul.main-nav-menu').show();
	$('.has-subnav , li.home-link').hide();
	$('.mobile-nav-menu li').not('.home-link').delay(300).fadeIn();
	return false;
}) 

//mobile return link
//$(document).find('.mobile-nav-menu li.return-link > a').on('click', function(){
	//alert('twinge');
	//$(this).parent().siblings().show();
	//return false;
//})

//search trigger
$('.js-search__trigger').on('click', function() {
	var html = $("html");
	if (html.hasClass('mobilemenu')) {
		html.removeClass('mobilemenu');
	};
	html.toggleClass('opensearch');
	return false;
});


////events site menu
//$('.events-menu').on('click','.mobile__trigger', function() {
//	$('.events-nav').slideDown(300);
//	$(this).addClass('mobile__trigger__active');
//	return false;
//});
//$('.events-menu').on('click','.mobile__trigger__active', function() {
//	$('.events-nav').slideUp(300);
//	$(this).removeClass('mobile__trigger__active');
//	return false;
//});