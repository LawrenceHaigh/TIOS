//Overlay panels

var loaded = false;
var mediaButtons,
    rt,
    overlayMediaItem,
    overlayMediaItemHeight,
    windowHeight,
    video,
    videoLoaded;
$("figure a img").each(function(index, element) {
    var itemLink = $(this).parent();
    itemLink.addClass("trigger__image__overlay");
});

var mediaOverlayTrigger = $(
    "a.trigger__image__overlay, a.trigger__image__overlay + a.media-fullscreen, .trigger__video a, a.trigger__video__overlay"

);
if (mediaOverlayTrigger.length) {
    $("body").prepend(
        '<div class="overlay-media-fade overlay-media"><div class="media-container"><a href class="media-close" style="display:none;">Close overlay</a><a download="" href class="media-download" title="Download image" style="display:none;">Download image</a></div></div>'
    );
}

function resizeOverlayMediaItem() {
    overlayMediaItem = $(".overlay-media img, .overlay-media video");
    overlayMediaItemHeight = overlayMediaItem.outerHeight();
    windowHeight = $(window).height();

    overlayMediaItem.css("max-height", windowHeight - 60);

    if ($(".overlay-media video").length) {
        mediaButtons = $(".media-container a:not(.media-download)");
    } else {
        mediaButtons = $(".media-container a");
    }
}

function checkLoaded() {
    var checkLoaded = setInterval(function() {
        if (loaded == true) {
            rt =
                $(window).width() -
                (overlayMediaItem.offset().left +
                    overlayMediaItem.outerWidth());
            mediaButtons.css("right", rt + 30);
            mediaButtons.show();
            loaded = false;
            setTimeout(function() {
                $(".media-close").css("visibility", "visible");
            }, 1500);
            clearInterval(checkLoaded);
        }
    }, 1000);
}

function checkLoad() {
    if (video.readyState === 4) {
        loaded = true;
    } else {
        loaded = false;
    }
}

function openOverlay(link) {
    checkLoaded();
    var mediaContainerContent;
    var isVideo = link.indexOf(".mp4") != -1;
    if (isVideo) {
        mediaContainerContent =
            '<video autoplay controls><source src="' +
            link +
            '" type="video/mp4">Your browser does not support the video tag.</video>';
    } else {
        mediaContainerContent = '<img src="' + link + '"/>';
        loaded = true;
    }

    $(".overlay-media")
        .fadeIn()
        .find(".media-container")
        .append(mediaContainerContent)
        .fadeIn();
    $(".overlay-media a.media-download").attr("href", link);
    resizeOverlayMediaItem();
    $(this).blur();
    $("body")
        .find("a , button")
        .attr("tabindex", "-1");
    $(".overlay-media a.media-close, .overlay-media a.media-download").attr(
        "tabindex",
        0
    );
    if (isVideo) {
        window.setInterval(function() {
            checkLoad();
        }, 1000);
    }
    //Check if video is loaded
    video = document.querySelector(".overlay-media video");
    if (video) {
        video.addEventListener("webkitendfullscreen", function(e) {
            // handle end full screen
            removeMediaOverlay();
        });

        video.addEventListener("webkitenterfullscreen", function(e) {
            // handle enter full screen
        });
    }
}

function removeMediaOverlay() {
    $(".overlay-media")
        .fadeOut()
        .find(".media-container")
        .hide()
        .find("img, video")
        .remove();
    $(".media-container a").hide();
    $("body")
        .find("a , button")
        .attr("tabindex", "");
    $(".media-close").css("visibility", "hidden");

    //update url
    if (history.pushState) {
        var url = window.location.pathname;
        if (url.indexOf("/media-gallery") != -1) {
            var to = url.lastIndexOf("/");
            to = to == -1 ? url.length : to + 1;
            url = url.substring(0, to);
            window.history.pushState("", "", url);
        }
    }
}

mediaOverlayTrigger.on("click", function(e) {
    e.preventDefault();
    var link = $(this);
    openOverlay(link.attr("href"));
    var urlAlias = link.attr("data-url-alias");
    if (urlAlias) {
        if (history.pushState) {
            window.history.pushState("", "", urlAlias);
        }
    }
});

//open linked image
var loadOverlay = $("[data-overlay-open]");
if (loadOverlay.length >= 1) {
    openOverlay(loadOverlay.attr("data-overlay-url"));
}

$(".overlay-media a.media-close").on("click", function() {
    removeMediaOverlay();
    return false;
});

$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        // escape key maps to keycode `27`
        removeMediaOverlay();
    }
});

$(window).on("resize", function() {
    resizeOverlayMediaItem();
});
