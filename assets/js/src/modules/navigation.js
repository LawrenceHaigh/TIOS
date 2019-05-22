// ==============================================
// RESET MENU
// ==============================================

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

$('.subnav-panel a, .subnav-inner-cloned li a').each(function(index, link){
  link.tabIndex = -1;
});


//
//// ==============================================
//// DESKTOP
//// ==============================================

var desktopNav = $('html.desktop .main-nav ul.main-nav-menu'), desktopNavItem = desktopNav.find('> li'), desktopLiWithSub = desktopNav.find('li.has-subnav'), navArrow = $('html.desktop span.nav-arrow'), desktopSubNavTrigger = desktopNav.find('li.has-subnav > a'), subNav = $('.subnav-wrapper'), navOverlay = $('html.desktop .overlay-fade.overlay-nav'), slideIndex, slideToGo, slideIndexInner, slideToGoInner;

subNav.each(function() {
	$(this).css('opacity','0').addClass('content-loaded').removeClass('u-hidden');
});

$(document).on('mouseenter focus', 'html.desktop .desktop-nav-menu > li > a', function(){
  var $thisItem = $(this);
  if ($(this).parent().hasClass('has-subnav')) {
    $('.subnav-wrapper').clearQueue().stop(true , true);
    setTimeout(function() {
      $('header').css('z-index', 100);
      $('.subnav-wrapper.content-loaded').hide().css('opacity','1').removeClass('content-loaded');
      var subNavOpen = $(document).find('.subnav-wrapper.open'), thisSubNavOpen = $thisItem.parent().find('.subnav-wrapper.open');
      $('.searchbox').hide().find('input[type=text]').blur();
      $('.has-subnav').find('.trigger__sublist li a, .secondary-navigation li a').removeClass('active');
      // $thisItem.parent().find('.trigger__sublist li, .secondary-navigation li a').eq(0).find('a').addClass('active');

      setTimeout(function() {
        $('.subnav-cloned:visible li').eq(0).find('a').focus();
      }, 300);

      if (thisSubNavOpen.length){
        //if the hovered item's subnav is already open
 
      }else{
        var $this = $thisItem;
        navOverlay.fadeIn(); 
        navArrow.hide();
        if (subNavOpen.length){
          //a panel is already open but not the clicked one, so don't animate with slideUp, just fade the panel
          $this.parent().find(subNav).clearQueue().stop( true, true ).fadeToggle().toggleClass('open');
          subNavOpen.hide().removeClass('open');
          $this.parent().find(navArrow).show();
          $('.subnav-panel a, .subnav-cloned li a').removeAttr('tabindex');

        }else{
          //no panels are open, so show the panel selected
          $this.parent().find(navArrow).show();
          //setTimeout(function() {
             $this.parent().find(subNav).clearQueue().stop( true, true ).slideToggle().toggleClass('open');
             navOverlay.show();
             $('.subnav-panel a, .subnav-cloned li a').removeAttr('tabindex');
             $this.parents('.has-subnav').find('.subnav-cloned ul ').find('a[href]:first').focus();
          //}, 100);

        }
        $this.parent().find(navArrow).show();
        var clonedContent = $this.parent().find('.subnav-cloned');
        if (clonedContent.is(':visible')) {
          //if clonedContent is not midway through animation
          var slideToGo = $this.parent().find(".trigger__sublist li").eq(0).find('a').attr('data-show-sublist');

          //$('.subnav-carousel' ).slick('slickGoTo', parseInt(slideIndex));
          var currentSlideContent = $('#' + slideToGo).html();
          $('.carousel-item').removeClass('opacityOne');
          $('#' + slideToGo).parents('.carousel-item').css('opacity' , 1).addClass('opacityOne');
          $this.parents('.has-subnav').find('.subnav-cloned').html(currentSlideContent);
          $this.parents('.has-subnav').find('.subnav-cloned ul ').find('a[href]:first').focus();
          $this.parents('.has-subnav').find('.subnav-cloned').fadeIn();
          $('#' + slideToGo).parents('.carousel-item').css('opacity' , 1).addClass('opacityOne');
        } else {
          $this.parents('.has-subnav').find('.subnav-cloned ul ').find('a[href]:first').focus();
        }

      }

      $thisItem.parents('.has-subnav').find( ".subnav-cloned  ul ").find('a:last').focusout(function() {
        $('ul.trigger__sublist > li a.active, ul.secondary-navigation > li a.active').parent().next().find('a').focus();
        $('.subnav-cloned li a').attr('tabindex' , -1);
      });

      $(".trigger__sublist li a").click(function(e){
        var anchor = $(this);
        var menuData = anchor.attr('data-show-sublist');
        if (menuData) {
          e.preventDefault();          
          var menuTarget = anchor.parents('.subnav-controls').find('.subnav-cloned');
          changeSubNav(menuTarget,menuData)

          // Setting an active class to what's been clicked and removing it from other items
          var theActiveClass = anchor.parent('.trigger__sublist').find('li a.active');
          if (theActiveClass) {
            $('.has-subnav').find('.trigger__sublist li a, .secondary-navigation li a').removeClass('active');
          }
          anchor.addClass('active');
        }
      });
      
      $(".subnav-cloned").click(function(e){       
        var anchor = e.target;
        var menuData = anchor.getAttribute("data-show-sublist");
        if (menuData) {
          e.preventDefault();
          var menuTarget =  $(this).parents('.subnav-controls').find('.subnav-inner-cloned');
          changeSubNav(menuTarget,menuData)

          // Setting an active class to what's been clicked and removing it from other items
          var theActiveClass = $(anchor).find('.secondary-navigation .carousel-li a.active');
          if (theActiveClass) {
            $('.has-subnav').find('.secondary-navigation .carousel-li a').removeClass('active');
          }
          $(anchor).addClass('active');
        }
      });

      return false;	
    } , 200);
  } else {
    $('.subnav-wrapper.open').slideUp( function(){
      $('.subnav-wrapper.open').clearQueue().stop(true , true).removeClass('open').slideUp();
      navOverlay.fadeOut();
      navArrow.hide();
    });
  }
  
});

// Function to get the html content and add it to the subnav div
function changeSubNav(menuTarget, menuData) {  
  var menuHtml = $('#' + menuData).html(); 
  menuTarget.hide();
  menuTarget.html(menuHtml).fadeIn();
}

// Hiding the second and third columns
function hideSubNavigations() {
  $('.what-we-do .subnav-cloned, .what-we-do .subnav-inner-cloned').addClass('visibility-hidden');
}
hideSubNavigations();

// Showing the second and third columns when the first columns items have been clicked
function showSubNavigations() {

  // - second column
  $('.what-we-do .trigger__sublist li').on('click', function() {
    var itemHasDataAttribute =  $(this).find('a').data('show-sublist');
    if (itemHasDataAttribute != undefined) {
      $('.subnav-cloned').removeClass('visibility-hidden');
    }
  });

  // - third column
  $('.subnav-cloned').on('click', function(e) {
    setTimeout(function() {
      var target = e.target;
      if (target.nodeName != 'A') {
        return;
      }
      var attribute = target.getAttribute('data-show-sublist');
      if (!attribute) return;
      $('.subnav-inner-cloned').removeClass('visibility-hidden');
    }, 400);
  });

  // - hiding the third column when you click back on the first column
  function hideThirdCol() {
    $('.trigger__sublist').on('click', function() {
      $('.subnav-inner-cloned').addClass('visibility-hidden');
    });
  }
  hideThirdCol();
  
}
showSubNavigations();

// Function to close Navigation
function closeNav() {
  $(document).find('.subnav-wrapper.open').clearQueue().removeClass('open').slideUp(function(){
    // $('.what-we-do .subnav-cloned, .what-we-do .subnav-inner-cloned').addClass('visibility-hidden');
    navOverlay.fadeOut();
    navArrow.hide();
  });
}

// On click close menu button
$('.subnav-wrapper span.close a, main').on('click', function(){
	closeNav();
});

// On hover anywhere else but the header nav, close nav
$('.mobile-nav-controls-container, #maincontent').on('mouseenter', function(){
  closeNav();
});

//
//// ==============================================
//// MOBILE
//// ==============================================

var windowHeight, windowHeightMinusMenu, listHeight;

function mobileNavSize(){
	windowHeight = $(window).height();
  windowHeightMinusMenu = windowHeight - 200;
  if($(window).height() <= 400) {
    listHeight = windowHeight + 350;
  } else {
    listHeight = windowHeight + 200;
  }
  
	$('.mobile-nav-menu').css('height', windowHeight);
}
mobileNavSize();

$('.mobile-nav-menu li.has-subnav > a').on('click', function(){
	var $parent = $(this).parent();
	$(this).blur();
  if ($(this).parent().find('ul').height() >= windowHeightMinusMenu ) {
    // if the menulist is longer than the view height, increase height
    $parent.find('> ul.nav-sublist').css('height', listHeight);
    $parent.find('> ul.nav-sublist').css('min-height',windowHeight);

  } else {
     $parent.find('> ul.nav-sublist').css('min-height',windowHeight);
  }
  $('.mobile-nav-menu').removeClass('maxheight');
		if($parent.hasClass('return-link')){
      // If going back
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
	mobileNavSize();
});

//mobile back to main menu trigger
$('.mobile-nav-menu li.home-link a').on('click', function(){
	$('.mobile-nav-menu').addClass('maxheight');
  $('.mobile-nav-menu ul.nav-sublist').css('height', '');
  $('.mobile-nav-menu ul.nav-sublist').css('min-height', '');
	$('.mobile-nav-menu li.parent-page').removeClass('parent-page');
	$('.mobile-nav-menu li.has-subnav ul').fadeOut();
	$(this).parent().fadeOut();
	$('.mobile-nav-menu li.has-subnav').removeClass('return-link');
	$('.has-subnav , li.home-link').hide();
	$('.mobile-nav-menu li').not('.home-link').delay(300).fadeIn();
	return false;
});


//
//// ==============================================
//// SEARCH
//// ==============================================

$('.search, .trigger__search').on('click' , function(){
	$('.subnav-wrapper').removeClass('open').hide();
	navOverlay.fadeOut().hide();
  navArrow.hide();
	$('.searchbox').fadeIn().find('input[type=text]').focus();
});

$('.searchbox .closemessage, .main').click(function(){
	$('.searchbox').fadeOut();
});

$('.js-search__trigger').on('click focus', function() {
	var html = $("html");
	if (html.hasClass('mobilemenu')) {
		html.removeClass('mobilemenu');
	}
  navArrow.hide();
	html.addClass('opensearch');
	return false;
});

// Empty Navigation lists.
$('.nav-top li').each(function() {
  if( $(this).is(':empty') ) {
    $(this).append('<a>&nbsp;</a>');
  }
});

$('.carousel-item-content .disabled-link').each(function(){
  var disabledText = $(this).text();
  $(this).empty().append('<a>' + disabledText + '</a>');
});