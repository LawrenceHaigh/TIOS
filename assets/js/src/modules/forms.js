//Faux dropdowns from form selects
$("select.form-control:not([disabled])").each(function(index) {
    index++;
    $(this).wrap('<div class="select-wrapper">');
    var initialValue = $(this)
        .find("option")
        .first()
        .text();
    $(this)
        .data("selectlist", "select_" + index)
        .after(
            '<a href="#" class="dropdown-trigger" id="select_' +
                index +
                '">' +
                initialValue +
                '</a><ul class="select-list select_' +
                index +
                '"></ul>'
        );

    $(this)
        .find("option[value]")
        .each(function() {
            var optionText = $(this).text(),
                optionValue = $(this).attr("value"),
                optionClass = $(this).attr("class");

            $(this)
                .parents(".select-wrapper")
                .find("ul.select-list")
                .append(
                    '<li class="select-option-trigger"><a href="#" data-value="' +
                        optionValue +
                        '" class="' +
                        optionClass +
                        '">' +
                        optionText +
                        "</a></li>"
                );
        });
    $(this).hide();
});

$("ul.select-list").hide();

$("a.dropdown-trigger").on("click", function() {
    $(this)
        .toggleClass("open")
        .parents(".select-wrapper")
        .find("ul.select-list")
        .slideToggle();
    return false;
});

$("ul.select-list li.select-option-trigger a").on("click", function() {
    var thisValue = $(this).data("value"),
        parentWrapper = $(this).parents(".select-wrapper");
    parentWrapper
        .find("option[value=" + thisValue + "]")
        .attr("selected", "selected");
    var newTriggerText = parentWrapper
        .find("option[value=" + thisValue + "]")
        .text();
    parentWrapper.find("ul.select-list").slideUp();
    parentWrapper
        .find("a.dropdown-trigger")
        .text(newTriggerText)
        .removeClass("open");
    return false;
});

//Contact form on contacts page
$(".contact-form, .box-out-contact")
    .hide()
    .removeAttr("style");
$(".contact-form").css({ visibility: "visible" });
setTimeout(function() {
    $(".pullout-wrapper").css({ opacity: "1" });
}, 400);
$(".pullout-wrapper .trigger__form").on("click", function() {
    var contactForm = $(this).attr("data-form");
    $(".contact-form").hide();
    $("#" + contactForm).fadeIn();
    $(".contact-form-container").slideDown("slow");
    $("html, body").animate(
        { scrollTop: $(".contact-form-container").offset().top },
        800
    );
    $("#" + contactForm)
        .find(".form-control:first")
        .focus();
    $("#" + contactForm)
        .find(".FormEnquiry")
        .trigger("reset")
        .validate()
        .resetForm(); // clear out the validation errors

    $(".form-control").removeClass("validated-error");
    $(".contact-form").removeClass("validated");
    $(".ContactValidation").hide();
    $(".select-error").remove();
    $(".contact-form__column").matchHeight();
    return false;
});
$(".contact-form a.trigger__close-form").on("click", function() {
    $(".contact-form-container").slideUp("slow");
    $(".contact-form").fadeOut();
    $(this)
        .parent()
        .find(".FormEnquiry")
        .trigger("reset")
        .validate()
        .resetForm(); // clear out the validation errors

    $(".form-control").removeClass("validated-error");
    $(".contact-form").removeClass("validated");
    $(".ContactValidation").hide();
    $(".select-error").remove();
    $(".contact-form__column").matchHeight();
    return false;
});

$(".box-out-contact-info a.email").on("click", function(e) {
    e.preventDefault();
    $(".box-out-contact-info a.email").show();
    $(".box-out-contact-info a.contact-cancel").css("visibility", "hidden");
    $(".box-out-contact")
        .find("form")
        .hide();
    $(".box-out-contact").each(function() {
        $(this)
            .trigger("reset")
            .validate()
            .resetForm(); // clear out the validation errors
    });
    $(this)
        .parents(".box-out-contact")
        .height("auto")
        .find("form")
        .fadeIn(1000);
    $(this)
        .parents(".box-out-contact")
        .height("auto")
        .find("form")
        .find(".form-control:first")
        .focus();
    $("html, body").animate(
        {
            scrollTop: $(this)
                .parents(".box-out-contact")
                .offset().top
        },
        800
    );
    $(this).hide();
    $(this)
        .parent()
        .find("a.contact-cancel")
        .css("visibility", "visible");
    $(".box-out-contact").removeClass("validated");
    $(".ContactValidation").hide();
    $(".select-error").remove();
});

$("a.contact-cancel").on("click", function(e) {
    e.preventDefault();
    $(this)
        .parents(".box-out-contact")
        .find("form")
        .fadeOut()
        .trigger("reset")
        .validate()
        .resetForm(); // clear out the validation errors

    $(this)
        .parents(".box-out-contact")
        .find(".box-out-contact-info a.email")
        .show();
    $("html, body").animate(
        {
            scrollTop:
                $(this)
                    .parents(".box-out-contact")
                    .offset().top - 200
        },
        800
    );
    $(".box-out-contact-info a.contact-cancel").css("visibility", "hidden");
    $(".box-out-contact").removeClass("validated");
    $(".ContactValidation").hide();
    $(".select-error").remove();
});

//load more functionality
var $loadMoreTable = $("table.load-more-table");
if ($loadMoreTable.length > 0) {
    var numberOfRows = 5; //number of intially visible rows and rows to show with each .load-more click

    $loadMoreTable.each(function(index, element) {
        //wrap table
        $(this).wrap('<div class="load-more-table table-responsive"></div>');
        //hide the numberOfRows+1 row and onwards
        $(this)
            .find("tbody tr")
            .slice(numberOfRows)
            .hide()
            .find("td")
            .hide();

        var hasHiddenRows = $(this).find("tbody tr:hidden");
        //if table has hidden rows, create a button to load more
        if (hasHiddenRows.length > 0) {
            $(this)
                .parents("div.table-wrapper")
                .append(
                    '<button class="wide button-centered table-load-more">Load more</button>'
                );
        }
    });

    $("button.table-load-more").on("click", function() {
        var thisTable = $(this)
                .parent()
                .find("div.load-more-table")
                .find("table.load-more-table"),
            nextFiveHiddenRows = thisTable.find(
                "tbody tr:hidden:lt(" + numberOfRows + ")"
            );
        nextFiveHiddenRows
            .show()
            .find("td")
            .fadeIn();
        var hiddenRows = thisTable.find("tbody tr:hidden");
        if (hiddenRows.length < 1) {
            //hidden rows all visible
            $(this).addClass("inactive");
        }
    });

    // tables Scroll
    /* var nonLoadMoreTable = $('table').not('.load-more-table');
  $(nonLoadMoreTable).each(function () {
    $(this).wrap('<div class="table-wrapper"></div>');
    $(this).wrap('<div class="table-responsive"></div>');
  }); */
}
