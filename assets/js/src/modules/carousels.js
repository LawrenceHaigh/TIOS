var global = require('./global.js');
var slick = require('../vendors/slick.js');
var analyticsevent = require('./analytics.js');


//PROGRESS CIRCLE ANIMATION
function progressCircle() {
	var val = 0;
	  var $circle = $('#svg #bar');
	  
	  if (isNaN(val)) {
	   val = 100; 
	  }
	  else{
		var r = $circle.attr('r');
		var c = Math.PI*(r*2);
	   
		if (val < 0) { val = 0;}
		if (val > 100) { val = 100;}
		
		var pct = ((100-val)/100)*c;
		
		$circle.css({ strokeDashoffset: pct});
		
		$('#countdown').attr('data-pct',val);
	  }
}


progressCircle();
	
var featureCarousel = $('.carousel.feature-carousel');
featureCarousel.slick({
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000,
});

if (featureCarousel.length) {
	var totalSlides = $('.feature-carousel .slick-slide:not(.slick-cloned)').length;
	$('.feature-carousel .slick-prev, .feature-carousel .slick-next').hide();
	$('.feature-panel .slide-count .total').text(totalSlides);
	
	if (totalSlides > 1){
		$('.carousel-controls.u-hidden').removeClass('u-hidden');
	}
	
	$('.feature-panel .prev-slide').on('click', function(e){
    e.preventDefault();
		$('.feature-carousel .slick-prev').trigger('click');
    $(this).focus();
		//$(this).blur();
	});
	$('.feature-panel .next-slide').on('click', function(e){
    e.preventDefault();
		$('.feature-carousel .slick-next').trigger('click');
    $(this).focus();
		//$(this).blur();
	});
	
	function setSlopeImage(){
		var activeSlidetype = $('.feature-carousel .slick-slide.slick-active').data('type');
		$('.feature-panel img:not(.default).slope:not(.'+activeSlidetype+')').fadeOut();
		$('.feature-panel img.slope.'+activeSlidetype).fadeIn();
	}
	setSlopeImage();
	
	function setCarouselPanelText(){
		var currentPanelText = $('.feature-carousel .carousel-item.slick-active .carousel-item-content').html(), currentSlideType = $('.feature-carousel .slick-active').data('type');
		$('.feature-panel .feature-text-content .fade-panel').html(currentPanelText);
		$('.feature-panel .feature-text-content').removeAttr('style');
		
		setTimeout(function(){
			var featuretextHeight = $('.feature-panel .feature-text-content').outerHeight();
			  //$('.feature-panel .feature-text-content').css('height',featuretextHeight)
		  }, 500);
	}
	setCarouselPanelText()
	
	$('.feature-panel .slide-count .current').text('1');
	
	// On before slide change
	featureCarousel.on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('.feature-panel .feature-text-content .fade-panel');
        //$('.feature-panel .feature-text-content .fade-panel').fadeOut();
	});
	
	// On after slide change
	featureCarousel.on('afterChange', function(event, slick, currentSlide, nextSlide){
		setCarouselPanelText();
		$('.feature-panel .slide-count .current').text(currentSlide+1);
		setSlopeImage();
		//$('.feature-panel .feature-text-content .fade-panel').fadeIn();
        $('.feature-panel .feature-text-content .fade-panel');
	});
}

var boxOutCarousel = $('.carousel.box-out-carousel');
boxOutCarousel.slick({
  dots: false,
  infinite: true,
  responsive: true,
  autoplay: true,
  fade: true,
  arrows: true,
  speed: 1000,
  autoplaySpeed: 4000,
});

if (boxOutCarousel.length) {
	boxOutCarousel.find('.slick-prev, .slick-next').hide();
	var totalSlides = $('.carousel.box-out-carousel .slick-slide:not(.slick-cloned)').length;
	$('.slide-count.box-out-slide-count .total').text(totalSlides);
	$('.slide-count.box-out-slide-count .current').text('1');
	
	// On before slide change
	boxOutCarousel.on('beforeChange', function(event, slick, currentSlide, nextSlide){
		
		if ($('svg#circle').hasClass('inverted')){
			var invertedClass = '';
		} else {
			var invertedClass = '' //'inverted';
		}
		
		$('.slide-count.box-out-slide-count .current').text(nextSlide+1);
		var defaultCircle = '<svg id="svg" width="200" height="200" viewPort="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle class="'+invertedClass+'" r="90" cx="100" cy="100" fill="transparent" stroke-dasharray="565.48" stroke-dashoffset="0"></circle><circle class="'+invertedClass+'" id="bar" r="90" cx="100" cy="100" fill="transparent" stroke-dasharray="565.48" stroke-dashoffset="0"></circle></svg>';
		$('.circle-countdown svg').replaceWith(defaultCircle);
	});
	
	// On after slide change
	boxOutCarousel.on('afterChange', function(event, slick, currentSlide, nextSlide){
		progressCircle();
	});
	
	$('.latest-updates .prev-slide').on('click', function(e){
    e.preventDefault();
		boxOutCarousel.find('.slick-prev').trigger('click');
		$(this).focus();
	});
	$('.latest-updates .next-slide').on('click', function(e){
    e.preventDefault();
		boxOutCarousel.find('.slick-next').trigger('click');
		$(this).focus();
	});	
	
	
}

var cycleCarousel = $('.carousel.cycle-carousel');
cycleCarousel.slick({
  dots: false,
  infinite: true,
  autoplay: false,
  fade: true,
  arrows: true,
  autoplaySpeed: 3000,
  asNavFor: '.cycle-list ul'
});

if (cycleCarousel.length) {
	
	cycleCarousel.find('.slick-slide:not(.slick-cloned)').each(function() {
        var itemLabel = $(this).data('label');
		$('<li data-label="'+itemLabel+'">'+itemLabel+'</li>').appendTo('.cycle-list ul');
    });

	$('.cycle-carousel .slick-prev, .cycle-carousel .slick-next').hide();
	$('.cycle-panel-carousel .slick-slide .feature-text a.button').hide();
	$('.cycle-panel-carousel .prev-slide').on('click', function(){
		cycleCarousel.find('.slick-prev').trigger('click');
    $(this).focus();
		//$(this).blur();
	});
	$('.cycle-panel-carousel .next-slide').on('click', function(){
		cycleCarousel.find('.slick-next').trigger('click');
    $(this).focus();
		//$(this).blur();
	});
	
	function setButtonLink(){
		var buttonLink = cycleCarousel.find('.slick-slide.slick-active').attr('data-href');
		$('.cycle-panel .cycle-controls .button.find-out-more').attr('href',buttonLink); 
	}
	setButtonLink();
	
	// On after slide change
	cycleCarousel.on('afterChange', function(event, slick, currentSlide, nextSlide){		
		setButtonLink();
	});
	
}

var cycleListCarousel = $('.cycle-list ul');

var settings = {
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.carousel.cycle-carousel',
  arrows: false,
  vertical: true,
  infinite: true,
  centerMode: true,
  autoplay: true,
  focusOnSelect: true,
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 1283,
      settings: {
        vertical: false,
        slidesToShow: 3,
        slidesToScroll: 1,
		    centerMode: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        focusOnSelect: true,
        pauseOnHover: false,
      }
    },
    {
      breakpoint: 767,
      settings: {
		    vertical: false,
        slidesToShow: 3,
        slidesToScroll: 1,
		    centerMode: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        focusOnSelect: true,
        pauseOnHover: false,
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
};

cycleListCarousel.slick(settings);
//resetSlick(cycleListCarousel, settings);

if (cycleListCarousel.length) {
	
	cycleListCarousel.find('.slick-slide.slick-current').addClass('active');
	
	// On before slide change
	cycleListCarousel.on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('li.slick-slide').css('pointer-events' , 'none');
    cycleListCarousel.find('.slick-slide.active').removeClass('active');
    $(".cycle-list li").attr("aria-pressed","false").focus(function() {
          this.blur();
    });
	});
	
	// On after slide change
	cycleListCarousel.on('afterChange', function(event, slick, currentSlide, nextSlide){
    
		cycleListCarousel.find('.slick-slide.slick-current').addClass('active');
    setTimeout(function(){
      $('li.slick-slide').css('pointer-events' , 'auto');
    }, 500);
	});
	
	cycleListCarousel.find('.slick-slide').on('click', function(){
		cycleListCarousel.find('.slick-slide.slick-current').removeClass('active');
		$(this).addClass('active');
	});
}

$('.cycle-panel-carousel .pause-slides').on('click', function(){
		if ($(this).hasClass('paused')){
				cycleCarousel.slick('slickPlay');
				cycleListCarousel.slick('slickPlay');
			}else{
				cycleCarousel.slick('slickPause');
				cycleListCarousel.slick('slickPause');
		}
		$(this).toggleClass('paused').blur();
	});


var subnavCarousel = $('.subnav-carousel');
var slickOptions = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: false,
    fade:true,
    speed:500
}

setTimeout(function() {
  subnavCarousel.slick(slickOptions);
}, 300);

subnavCarousel.on('init', function(event, slick){
  setTimeout(function() {
    if ($('.subnav-wrapper.open').length){
      $('.subnav-wrapper').not('.open').hide().css('opacity', 1);
    } else {
      $('.subnav-wrapper').hide().css('opacity', 1);
    }
  }, 1000);
});


$(window).resize(function () {
  setTimeout(function() {
    if($(window).width() > 1008){
      if ($('.subnav-wrapper.open').length){
        $('.subnav-wrapper').show();
        $('.subnav-wrapper').not('.open').css('opacity', 0);
      } else {
        $('.subnav-wrapper').show().css('opacity', 0);
      }
      subnavCarousel.slick('unslick');
      subnavCarousel.slick(slickOptions);
    }
  },1000);
}).resize();

if (subnavCarousel.length) {
	
	var currentSlideContent = $('.slick-active .carousel-item-content').html();
	$('.subnav-cloned').html(currentSlideContent);
	
	subnavCarousel.on('afterChange', function(event, slick, currentSlide, nextSlide){
		var currentSlideContent = $('.slick-active .carousel-item-content').html();
		$('.subnav-cloned').html(currentSlideContent);
	});	
	
}




