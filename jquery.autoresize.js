// inspired by https://github.com/jaz303/jquery-grab-bag/raw/master/javascripts/jquery.autogrow-textarea.js
(function ($) {
	$.fn.autoresize = function () {
			var shadow = $('<div/>').css({ position: 'absolute', top: -10000, left: -10000, resize:	'none' }).appendTo(document.body);

		this.filter('textarea').each(function () {
			var $this = $(this),
				minHeight = 25,
				maxHeight = 500,
				prevHeight = 0,
				nowHeight = 0,

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

			shadow.css({
				width: $(this).width() - parseInt($this.css('paddingLeft'), 10) - parseInt($this.css('paddingRight'), 10),
				fontSize: $this.css('fontSize'), fontFamily: $this.css('fontFamily'), lineHeight: $this.css('lineHeight')
			});

			$(this).keyup(update).blur(update).focus(update);
			update.apply(this);
		});
		return this;

	};

}(jQuery));

window.EFilesLoaded++;
window.ETryInit();
