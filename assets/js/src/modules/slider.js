$(function(){
        if ( $("body").hasClass("what-we-do") ){
            $('.bxslider').bxSlider({
                mode: 'horizontal',
                pager: true,
                captions: true,
                controls: true,
                nextText: '',
                prevText: '',
                touchEnabled: false

            });
        }
    });
