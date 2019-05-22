var Clipboard = require('../vendors/clipboard.js');


function openPanel(el) {
    var panel = el.closest(".feature-text").next();
    panel.addClass("feature-share--open").attr("aria-hidden", false);
}
function closePanel(el) {
    var panel = el.parent(".feature-share");
    panel.removeClass("feature-share--open").attr("aria-hidden", true);
}
function copyLink(el) {
    const isSupported = document.queryCommandSupported("copy");
    if (isSupported) {
        var originalText = el.text();
        var copiedText = el.attr("data-text-copied");
        var url = el.prev(".clipboard-text");
        url.select();
        document.execCommand("copy");
        el.text(copiedText);
        setTimeout(function() {
            el.text(originalText);
        }, 3000);
    } else {
        $(".share-clipboard").hide();
    }
}
function togglePanel(el) {
    var wrapper = el.closest(".page-share");
    var panel = wrapper.find(".page-share__panel");

    if (wrapper.hasClass("page-share--open")) {
        wrapper.removeClass("page-share--open");
        panel.removeClass("page-share__panel--open").attr("aria-hidden", true);
    } else {
        wrapper.addClass("page-share--open");
        panel.addClass("page-share__panel--open").attr("aria-hidden", false);
    }
}

// media library
$(".js-share-panel-open").on("click", function(e) {
    e.preventDefault();
    openPanel($(this));
});
$(".js-share-panel-close").on("click", function(e) {
    e.preventDefault();
    closePanel($(this));
});

$(".js-share-panel-copy").on("click", function(e) {

    e.preventDefault();
    var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (is_safari) {

        var clipboard = new Clipboard(".js-share-panel-copy", {
            text: function(trigger) {
                return trigger.getAttribute('href');
            }
        });

        clipboard.on('success', function(e) {
            e.clearSelection();
            e.trigger.textContent = 'Copied!';
        })

    } else {
        copyLink($(this));
    }
});

//on page
$(".js-share-panel-onpage").on("click", function(e) {
    e.preventDefault();
    togglePanel($(this));
});


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}