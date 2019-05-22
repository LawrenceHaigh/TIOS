var analyticsevent = require('./analytics.js');

//COOKIE BAR ALERT
$('.banner').on('click', '.js-close__banner', function() {
	$(this).parents('.banner').slideUp();
//	document.cookie = "seen_banner_message=yes; path=/";
	return false;
});

$('.banner').on('click', '.js-close__cookiebanner', function() {
	var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + d.toGMTString();
    document.cookie = "seen_cookie_message=yes" + expires + "; path=/";
    $(this).parents('.banner').slideUp();
    analyticsevent('Cookie box', 'Closed', window.location.pathname);
    return false;
});

if (document.cookie.indexOf("seen_banner_message") < 0) {
	$('.banner--info').show();
}
if (document.cookie.indexOf("seen_cookie_message") < 0) {
	$('.banner--cookie').show();
}

//force cookie bar to show for testing
//$('.banner--cookie').show();