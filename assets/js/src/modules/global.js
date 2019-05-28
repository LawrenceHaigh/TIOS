var global = {};
global.ie = $("html").hasClass("ie");
global.windowWidth = window.innerWidth;
global.windowHeight = window.innerHeight;
(global.scrollOffset =
    $("header").outerHeight(true) - $(".header__topstrip").outerHeight(true)),
    (global.url = window.location),
    (global.urlString = global.url.toString());
var resizeId;

$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function(elem) {
        return (
            $(elem)
                .text()
                .toUpperCase()
                .indexOf(arg.toUpperCase()) >= 0
        );
    };
});

$("html")
    .removeClass("no-js")
    .addClass("has-js");

// Table row rollover
$("table:not(.nohover)").delegate(
    "tbody tr:not(.nohover)",
    "mouseover mouseleave",
    function(e) {
        e.type == "mouseover"
            ? $(this).addClass("hover")
            : $(this).removeClass("hover");
    }
);
$("table:not(.nohover)").delegate(
    'tbody tr:not(.nohover) td a[class^="link"]',
    "mouseover mouseleave",
    function(e) {
        e.type == "mouseover"
            ? $(this)
                  .parent()
                  .addClass("link-hover")
            : $(this)
                  .parent()
                  .removeClass("link-hover");
    }
);

$('a[target="_blank"]').on("mouseenter", function() {
    $(this).attr("title", "External link. Opens in new browser window.");
});

$("header").addClass("js-header");


$(window).on('resize', function(){
    var win = $(this); //this = window
    if (win.width() > 768) {
     $('body').find('.mobile-specs').show();
    }
});


$('.readmore').on('click', function(e){
    e.preventDefault();
    $(this).prev('.mobile-specs').slideToggle(500);
    $(this).toggleClass('close');
    $(this).find('.link').text(function (index, text) {
        return (text == 'View specification' ? 'Hide specification' : 'View specification');
    });

});




//Print functionality
window.onbeforeprint = function() {
    $("html, body").animate(
        {
            scrollTop: 0
        },
        0
    );
};

//Show homepage hero content
$("document").ready(function() {
    setTimeout(function() {
        $(".hero-panel-content").css("opacity", 1);
    }, 500);
});

//Download workaround for IE
if (window.navigator.pointerEnabled) {
    $(".box-out-media__element--item a.media-download").on("click", function(
        e
    ) {
        e.preventDefault();
        var downloadLink = $(this).attr("href");
        window.open(downloadLink, "_blank");
        return false;
    });

    $("a.media-fullscreen").on("click", function() {
        $(".media-container .media-download").on("click", function(e) {
            e.preventDefault();
            var downloadLink = $(this).attr("href");
            window.open(downloadLink, "_blank");
            return false;
        });
    });
}

//Select list
$("document").ready(function() {
    $(".filter-form__contact ul.select-list").each(function() {
        if ($(this).height() <= 200) {
            $(this).css("overflow", "hidden");
        } else {
            $(this).css("overflow", "auto");
        }
    });
});

//Anchor Scroll to
$(".site-index__index li a").on("click", function(e) {
    e.preventDefault();
    var target = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(target).offset().top }, 800);
    return false;
});


module.exports = global;
