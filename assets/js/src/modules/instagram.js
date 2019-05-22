//Instagram panel

var wordArrayLength,
    wordArray,
    splitLength,
    wordFull,
    wordFullText,
    instagramHandle,
    instagramHandleFull;

var feedParagraph = $(
    ".instagram-feed-text p:not(.instagram-date):not(.font-m)"
).text();
instagramHandleFull = $(".instagram-feed-text p.font-m a").text();
var insta = instagramHandleFull.split("@");
wordFull = $(".instagram-feed-text").html();
wordFullText = $(".instagram-feed-text").text();
$(window).on("load resize", function() {
    if ($(".instagram-feed").length) {
        trimText();

        $(".item-wrapper", ".instagram-feed").each(function() {
            var $this = $(this),
                videoPlayBtn =
                    '<span class="instagram-video-thumb"><span></span></span>';
            //console.log($this.find('.instagram-video-thumb').length === 0)
            if (
                $this.data("videopath") &&
                $this.find(".instagram-video-thumb").length === 0
            ) {
                $this.find("a").append($(videoPlayBtn));
            }
        });
    }
});

function trimText() {
    if (767 < $(window).width() && $(window).width() < 1440) {
        splitLength = 100;
        if ($(window).width() > 1007) {
            instagramHandle = "@" + insta[1];
        } else {
            instagramHandle = instagramHandleFull;
        }
    } else if ($(window).width() >= 1440) {
        splitLength = 350;
        instagramHandle = instagramHandleFull;
    } else {
        splitLength = wordArrayLength;
        instagramHandle = instagramHandleFull;
    }
    wordArrayLength = feedParagraph.length;
    wordArray = feedParagraph.substring(0, splitLength).split(" ");
    if (Number(wordArrayLength) > splitLength) {
        $(".instagram-feed-text")
            .empty()
            .append(wordFull);
        $(".instagram-feed-text .font-m a")
            .empty()
            .append(instagramHandle);
        $(".instagram-feed-text p:not(.instagram-date):not(.font-m)")
            .empty()
            .append(wordArray.slice(0, -1).join(" ") + "...");
    } else {
        $(".instagram-feed-text")
            .empty()
            .append(wordFull);
        $(".instagram-feed-text .font-m a")
            .empty()
            .append(instagramHandle);
        $(".instagram-feed-text p:not(.instagram-date):not(.font-m)")
            .empty()
            .append(feedParagraph);
    }
}

$(".instagram-feed li a").on("click", function() {
    var $this = $(this),
        $instagramLarge = $this.parents("ul").find("li.instagram-large"),
        $parent = $this.parent(),
        itemContent = $(this)
            .parent()
            .find(".item-text")
            .html(),
        itemImage = $(this)
            .parent(".item-wrapper")
            .attr("style"),
        switchOutContent = wordFull,
        switchOutImage =
            typeof $instagramLarge.attr("data-imagepath") !== "undefined"
                ? $instagramLarge.attr("data-imagepath")
                : $instagramLarge.attr("style"),
        switchOutLink = $(".instagram-feed-text p a").attr("href"),
        isVideo = typeof $this.parent().attr("data-videopath") !== "undefined",
        videoPlayBtn =
            '<span class="instagram-video-thumb"><span></span></span>',
        videoPath;

    //inject the play button onto the thumbnail if the switchout is a video
    if (typeof $instagramLarge.attr("data-imagepath") !== "undefined") {
        $parent.find("a").append($(videoPlayBtn));
    }

    // is the thumbnail wasn't a video before but the previous instagram large was a video, clean up the data attrs on large and reinject the data attr onto the new thumbnail for the video placeholder
    if ($instagramLarge.attr("data-imagepath")) {
        $instagramLarge.removeAttr("data-imagepath");
        $parent.attr(
            "data-videopath",
            $instagramLarge
                .find(".instagram-video-container video source")
                .attr("src")
        );
        //console.log('setting from the video src',  $instagramLarge.find('.instagram-video-container video source').attr('src'))
        $instagramLarge
            .find(".instagram-video-container video source")
            .attr("src", "");
        $instagramLarge.find(".instagram-video-container").hide();
    }

    feedParagraph = $parent
        .find(".item-text")
        .find("p:not(.instagram-date):not(.font-m)")
        .text();
    //switch out the text in the large panel
    $(".instagram-feed-text").html(itemContent);
    //hide it then fade in it (niiiice)
    $(".instagram-feed-text > *")
        .hide()
        .fadeIn();

    //switch out the large image for the clicked one
    if (!isVideo) {
        $instagramLarge.attr("style", itemImage);
    } else {
        videoPath = $parent.attr("data-videopath");
        $parent.removeAttr("data-videopath");

        //remove the play button in case the switched type is not a video
        $(".instagram-video-thumb", $parent).remove();
        $instagramLarge.attr("data-imagepath", itemImage).attr("style", "");

        $instagramLarge
            .find(".instagram-video-container video source")
            .attr("src", videoPath);

        //reload the video after changing src
        $instagramLarge.find(".instagram-video-container video")[0].load();
        $instagramLarge.find(".instagram-video-container").show();
    }

    //swap the image on the clicked item with the previous large image
    $this
        .attr("href", switchOutLink)
        .parent()
        .attr("style", switchOutImage);

    //swap out the clickec item hidden text content with content from the large text box
    $this
        .parent()
        .find(".item-text")
        .html(switchOutContent);
    wordFull = itemContent;
    trimText();

    return false;
});
