
function analyticsevent(type, action, label) {
    if (typeof (ga) != 'undefined') {
        if ((label === "") || (typeof label === 'undefined')) { label = window.location.pathname }
        ga('send', 'event', type, action, label);
    }
}

module.exports = analyticsevent;