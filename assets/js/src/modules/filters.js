import { responsiveTables } from "./responsive-tables";

/******* Box Filtering ******/
var filtered = false;
var thisFilterValue = ".box-out";
var maxHeight = 0;
$(".tile-feed, .tile-contact").prepend(
    '<p class="no-results">There are no results for your chosen selection. Please choose another filter combination.</p>'
);
$(".tile-feed .no-results, .tile-contact .no-results").hide();
$(".media .box-out-border > .box-out").hide();
$(".media .box-out-border > .box-out:lt(6)")
    .show()
    .addClass("box-shown");
$(".box-out-border > .box-out__directors")
    .show()
    .addClass("box-shown");
loadMore();

// bind filter button click
$("form#filter-form .select-option-trigger a").on("click", function() {
    //Filtering system
    filtered = true;
    thisFilterValue = "";
    $(".no-results")
        .hide()
        .css("display", "none");
    resetTiles();
    var filterValue = $(this);

    var filterTiles = $(".tile-feed").isotope({
        itemSelector: ".box-out",
        layoutMode: "fitRows"
    });
    var itemClass = $(this).attr("class");

    filterTiles.isotope({ filter: "*" });

    $(this)
        .parents(".select-wrapper")
        .find(".dropdown-trigger")
        .data("filter-value", itemClass)
        .addClass("active");

    $(".dropdown-trigger.active").each(function() {
        thisFilterValue += "." + $(this).data("filter-value");
    });

    filterTiles.isotope({ filter: thisFilterValue });

    setTimeout(function() {
        var count = $(
            '.tile-feed .box-out[style*="opacity: 0"], .tile-feed .box-out[style*="display: none"], .tile-feed .box-out:not(:visible)'
        ).length;
        $(
            '.tile-feed .box-out[style*="opacity: 0"], .tile-feed .box-out[style*="display: none"], .tile-feed .box-out:not(:visible)'
        ).each(function() {
            $(this)
                .addClass("box-out-hidden")
                .removeClass("box-out-visible")
                .removeClass("box-shown");
            count -= 1;
        });

        $(".box-out-contact:visible").matchHeight();
        $(".box-out-contact")
            .removeClass("box-shown")
            .hide();
        $(".box-out-contact" + thisFilterValue)
            .fadeIn()
            .addClass("box-shown");

        setTimeout(function() {
            if ($(window).width() > 767) {
                $(".box-out:visible .box-out-media__element").matchHeight();
                $(".box-out:visible .feature-text__top").matchHeight();
                $(".box-out:visible .feature-text__bottom").matchHeight();
                $(".tile-feed .box-out").each(function() {
                    $(this).removeClass("height-max");
                });
                if (filterValue.hasClass("type-all")) {
                    $(".tile-feed .box-out").each(function() {
                        $(this).addClass("height-max");
                    });
                } else {
                    $(".tile-feed .box-out").each(function() {
                        $(this).css("height", "auto");
                    });
                }
                $(
                    ".tile-feed .box-out:visible, .box-out-contact:visible"
                ).matchHeight();
                filterTiles.isotope({ filter: thisFilterValue });
            }
        }, 500);

        loadMore(function() {
            filterTiles.isotope({ filter: ".box-shown" });
        });

        if ($(".tile-feed .box-out-visible").length > 0) {
            $(".tile-feed .no-results").hide();
        } else {
            $(".tile-feed .no-results").show();
        }

        if ($(".tile-contact .box-shown").length > 0) {
            $(".tile-contact .no-results").hide();
        } else {
            $(".tile-contact .no-results").show();
        }
    }, 100);

    if ($(this).hasClass("type-all") || $(this).hasClass("type-news")) {
        setTimeout(function() {
            $(".tile-feed .box-out-visible").each(function() {
                $(this).css("min-height", "440px !important");
            });
            $(".tile-feed .box-out:visible").matchHeight();
            filterTiles.isotope({ filter: thisFilterValue });
        }, 1000);
    }
});

//Contact search
$("form#filter-form .icon-search, .filter-form__search-btn a").on(
    "click",
    function(e) {
        e.preventDefault();
        searchFilter();
    }
);

$("form#filter-form #search").on("keydown", function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        searchFilter();
    }
});

function searchFilter() {
    var filterTiles = $(".tile-feed").isotope({ itemSelector: ".box-out" });
    var searchTerm = $("#filter-form")
        .find("#search")
        .val()
        .toLowerCase();
    var count = $(".box-out-contact , .tile-feed .box-out").length;
    var text = "";
    $(".box-out").removeClass(".box-shown");
    $(".box-out-contact").each(function() {
        text = $(this)
            .find("h2")
            .text()
            .toLowerCase();
        if (text.indexOf(searchTerm) < 0) {
            $(this).hide();
        } else {
            $(this).show();
        }
        count -= 1;
    });

    $(".tile-feed .box-out").each(function() {
        text = $(this)
            .find(".feature-text")
            .text()
            .toLowerCase();
        if (text.indexOf(searchTerm) < 0) {
            $(this).removeClass("box-shown");
        } else {
            $(this)
                .addClass("box-shown")
                .show();
        }
        count -= 1;
    });
    $(".box-out-contact:visible").matchHeight();
    $(".tile-feed__load-more-btn").fadeOut();

    if (count <= 0) {
        filterTiles.isotope({ filter: ".box-shown" });
        if ($(".tile-feed .box-shown").length > 0) {
            $(".tile-feed .no-results").hide();
        } else {
            $(".tile-feed .no-results").show();
        }

        if ($(".tile-contact .box-out-contact:visible").length > 0) {
            $(".tile-contact .no-results").hide();
        } else {
            $(".tile-contact .no-results").show();
        }
    }
}
function resetTiles() {
    $(".tile-feed .box-out").each(function() {
        $(this)
            .show()
            .removeClass("box-out-hidden box-shown")
            .addClass("box-out-visible");
    });
}

//Load more
function loadMore() {
    var box = "";

    if ($(thisFilterValue + '[style*="display: none"]').length == 0) {
        $(".tile-feed__load-more-btn").fadeOut();
    } else {
        $(".tile-feed__load-more-btn").show();
    }

    $(".tile-feed__load-more-btn").on("click", function(e) {
        e.preventDefault();

        $(".box-out").removeClass("anchor");
        $(thisFilterValue + '[style*="display: none"]')
            .first()
            .addClass("anchor");
        $(thisFilterValue + '[style*="display: none"]')
            .slice(0, 6)
            .fadeIn()
            .addClass("box-shown");

        if ($(thisFilterValue + '[style*="display: none"]').length == 0) {
            $(".tile-feed__load-more-btn").fadeOut();
        }
        $("html,body").animate(
            {
                scrollTop: $(".anchor").offset().top
            },
            600
        );
    });
}

/******* Tab Filtering ******/
var newContentShow,
    contentShow = $(".filter-tabs li:first a").attr("id"),
    filterRow = $(".filter-content__row"),
    tabButtons = $(".filter-tabs li a");

$("." + contentShow)
    .addClass("filter-content__row--show")
    .fadeIn();

$(".filter-tabs li a:first").addClass("lit");

$(document).on("keydown", ".filter-tabs li a", function(e) {
    if (e.keyCode == 13) {
        $(this).trigger("click", true);
        e.preventDefault();
    }
});
$(document).on("click", ".filter-tabs li a", function(e, enterKeyPressed) {
    e.preventDefault();
    newContentShow = $(this).attr("id");

    if (contentShow != newContentShow) {
        tabButtons.removeClass("lit");
        $(this).addClass("lit");
        contentShow = $(this).attr("id");
        filterRow.hide();
        $("." + contentShow)
            .addClass("filter-content__row--show")
            .fadeIn("400", function() {
                if (enterKeyPressed) {
                    $(this)
                        .attr("tabindex", -1)
                        .focus();
                }
                responsiveTables();
            });
    }
});
