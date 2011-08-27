// https://github.com/jaz303/jquery-grab-bag/raw/master/javascripts/jquery.autogrow-textarea.js
(function ($) {
    /*
     * Auto-growing textareas; technique ripped from Facebook
     */
    $.fn.autoresize = function () {

        this.filter('textarea').each(function () {
            var $this       = $(this),
                minHeight   = 20,
                maxHeight   = 500,

                shadow = $('<div/>').css({
					position:   'absolute',
					top:        -10000,
					left:       -10000,
					width:      $(this).width() - parseInt($this.css('paddingLeft'), 10) - parseInt($this.css('paddingRight'), 10),
					fontSize:   $this.css('fontSize'),
					fontFamily: $this.css('fontFamily'),
					lineHeight: $this.css('lineHeight'),
					resize:     'none'
				}).appendTo(document.body),

				update = function () {
					var val = this.value.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;').replace(/\n$/, '<br/>&nbsp;').replace(/\n/g, '<br/>');

					shadow.html(val);
					$(this).css('height', Math.min(Math.max(shadow.height(), minHeight), maxHeight));
					EKeyboard.updatePosition($(this));
				};

            $(this).change(update).keyup(update).keydown(update).blur(update);
            update.apply(this);
        });
        return this;

    };

}(jQuery));

window.EFilesLoaded++;
window.ETryInit();
