var global = require('../modules/global.js');

jQuery.fn.extend({
    tabaccordion: function (options) {
        var defaults = {
            scrollspeed: 'slow',
            openfirstpanel: 'no',
            tabtype: 'tabs'
        }

        var settings = jQuery.extend(defaults, options);

//        console.log('.c-'+settings.tabtype+'__panelbody')

        return this.each(function () {
            var element = jQuery(this),
                accordionID = element.attr('id') || '',
                hashvalue = location.hash || false;

                //HAS HASH VALUE
                if (hashvalue) {
                    var selected = $(hashvalue).find('.c-'+settings.tabtype+'__panelbody');
                    jQuery(element).find('.c-'+settings.tabtype+'__panelbody').hide().filter(selected).show(function (e) {
                        $('html,body').animate({ scrollTop: $(hashvalue).offset().top });
                    });
                } else {
                    //OPEN FIRST PANEL
                    if (settings.openfirstpanel == 'yes') {
                        jQuery(element).find('.c-'+settings.tabtype+'__panelbody').hide().filter('.c-'+settings.tabtype+'__panelbody:first').show();
                    } else {
                        //ALL CLOSED
                        jQuery(element).find('.c-'+settings.tabtype+'__panelbody').hide();
                    }
                }

            //TOGGLE PANEL
            jQuery(element).find('.c-'+settings.tabtype+'__panelheader').on('click', 'a', function (e) {
                el = $(this),
                panel = el.parents('.c-'+settings.tabtype+'__panel'),
                panelID = panel.attr('id'),
                panelbody = panel.find('.c-'+settings.tabtype+'__panelbody'),
                state = '';

                if (panelbody.is(':visible')) {
                    panelbody.slideUp(settings.scrollspeed);
                    el.removeClass('lit').attr('aria-selected','false');;
                    el.parents('.c-'+settings.tabtype+'__panelheader').removeClass('open');
                    el.parents('.c-tabs').find('.c-'+settings.tabtype+'__panelbody').attr('aria-hidden','true');
                    state = 'Close';
                } else {
                    panelbody.slideDown(settings.scrollspeed);
                    state = 'Open';
                    el.addClass('lit').attr('aria-selected','true');
                    el.parents('.c-tabs').find('.c-'+settings.tabtype+'__panelbody').attr('aria-hidden','false');
                    el.parents('.c-'+settings.tabtype+'__panelheader').addClass('open');
                }

                return false;
            });
        });
    }
});

if (global.windowWidth < 768) {
    jQuery('.js-tabs__accordion').tabaccordion({tabtype: 'tabs'});
    jQuery('.js-subtabs__accordion').tabaccordion({tabtype: 'subtabs'});
}