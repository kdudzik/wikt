(function ($) {

	var shown = false,
		tooltip = $('<div class="tooltip"/>');

	tooltip.css('position', 'absolute').css('z-index', '1000').appendTo($('body'));

	$.fn.showtip = function () {
		var yOffset, xOffset, pos;
		if (!$(this).data('tip')) {
			return true;
		}
		tooltip.html($(this).data('tip'));

		yOffset = $(this).hasClass('tipdown') ? -$(this).outerHeight() - 3 : tooltip.height() + 17;
		xOffset = (tooltip.width() - 10) / 2 - $(this).width() / 2;
		pos = $(this).offset();
		tooltip.css({ top: pos.top - yOffset, left: pos.left - xOffset }).show();
		shown = true;
	};

	$.fn.hidetip = function () {
		tooltip.hide();
		shown = false;
	};

}(jQuery));

window.EFilesLoaded++;
window.ETryInit();
