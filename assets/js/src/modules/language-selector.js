var analyticsevent = require('./analytics.js');

$('.lang-select ul').append('<span class="trigger">')
$('.lang-select li a').on('click', function(){
	
	var chosenLang = $(this).attr('href').split('Lang=')[1];
	$(this).attr('test'+chosenLang)
	
	var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + d.toGMTString();
    document.cookie = "website_language="+chosenLang + expires + "; path=/";
//    $("#cookiebar").slideUp();
//    analyticsevent('Cookie box', 'Closed', window.location.pathname);
    //return false;
});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var langCookie = getCookie("website_language");
    if (langCookie != "") {		
		var activeLanguageListItem = $('.lang-select li a[href*="'+langCookie+'"]').parent().html();
		$('.lang-select li a[href*="'+langCookie+'"]').parent().remove();
		$('.lang-select ul').prepend('<li class="active-language">'+activeLanguageListItem+'</li>');
    }
}
checkCookie();

$('.lang-select li:not(:first-of-type)').addClass('inactive-language').hide();

$('.lang-select .trigger').on('click', function(){
	$('.lang-select ul li:not(:first-of-type)').slideToggle();
	$(this).toggleClass('open');
});


//var url = window.location.search;
		//check for some kinda query string thing going on
		//if ((url.match("sc_Lang").length > 0)) {
			
			//var qs_content = url.split('?')[1], qs_name = qs_content.split('=')[0], qs_value = qs_content.split('=')[1], matchingDropdown = $('.contact-form--default select[name*='+qs_name+']'), matchingInput = matchingDropdown.find('option[label*='+qs_value+']');
			
			//$('html').addClass('yes')
			
			//if ( matchingInput.length ){
//				matchingInput.attr('selected','selected');
//				
//				setTimeout(function() {
//					enquiryForm.trigger('click');
//				}, 1000);
//			}
		//}	
