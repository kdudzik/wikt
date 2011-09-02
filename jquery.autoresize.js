// https://github.com/jaz303/jquery-grab-bag/raw/master/javascripts/jquery.autogrow-textarea.js
(function ($) {
	/*
	 * Auto-growing textareas; technique ripped from Facebook
	 */
	$.fn.autoresize = function () {

		this.filter('textarea').each(function () {
			var $this = $(this),
				minHeight = 25,
				maxHeight = 500,
				prevHeight = 0,
				nowHeight = 0,
				shadow = $('<div/>').css({
					position:   'absolute',
					top:		-10000,
					left:	   -10000,
					width:	  $(this).width() - parseInt($this.css('paddingLeft'), 10) - parseInt($this.css('paddingRight'), 10),
					fontSize:   $this.css('fontSize'),
					fontFamily: $this.css('fontFamily'),
					lineHeight: $this.css('lineHeight'),
					resize:	 'none'
				}).appendTo(document.body),

				update = function () {
					var val = this.value.replace(/[<>&]/g, 'w').replace(/\n$/, '<br/>&nbsp;').replace(/\n/g, '<br/>');

					shadow.html(val);
					nowHeight = Math.min(Math.max(shadow.height(), minHeight), maxHeight);
					if (nowHeight !== prevHeight) {
						$(this).css('height', nowHeight);
						EKeyboard.updatePosition($(this));
						prevHeight = nowHeight;
					}
				};

			$(this).keyup(update).blur(update).focus(update);
			update.apply(this);
		});
		return this;

	};

}(jQuery));

window.EFilesLoaded++;
window.ETryInit();
