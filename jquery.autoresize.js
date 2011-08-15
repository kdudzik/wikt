// https://github.com/jaz303/jquery-grab-bag/raw/master/javascripts/jquery.autogrow-textarea.js
(function ($) {
    /*
     * Auto-growing textareas; technique ripped from Facebook
     */
    $.fn.autogrow = function (options) {

        this.filter('textarea').each(function () {

            var $this       = $(this),
                minHeight   = 20,
                maxHeight   = 500,
                lineHeight  = $this.css('lineHeight');

            var shadow = $('<div></div>').css({
                position:   'absolute',
                top:        -10000,
                left:       -10000,
                width:      $(this).width() - parseInt($this.css('paddingLeft')) - parseInt($this.css('paddingRight')),
                fontSize:   $this.css('fontSize'),
                fontFamily: $this.css('fontFamily'),
                lineHeight: $this.css('lineHeight'),
                resize:     'none'
            }).appendTo(document.body);

            var update = function () {
                var val = this.value.replace(/</g, '&lt;')
                                    .replace(/>/g, '&gt;')
                                    .replace(/&/g, '&amp;')
                                    .replace(/\n$/, '<br/>&nbsp;')
                                    .replace(/\n/g, '<br/>');

                shadow.html(val);
                $(this).css('height', Math.min(Math.max(shadow.height(), minHeight), maxHeight));
                EKeyboard.updatePosition($(this));
            };

            $(this).change(update).keyup(update).keydown(update);

            update.apply(this);

        });

        return this;

    };

})(jQuery);

window.EFilesLoaded++;
window.ETryInit();
