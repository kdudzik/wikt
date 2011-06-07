window.ESpecialChars = {
	
	style : '',
	
	detachTo : function(keys) {
		var obj = $('#editpage-specialchars');
		ESpecialChars.style = obj.attr('style');
		obj.detach().attr('style', '');
		keys.html(obj);
	},
	
	attach : function() {
		var obj = $('#editpage-specialchars');
		obj.attr('style', ESpecialChars.style);
	}
};

(function($) {
	
	var keyboard = $('<div id="keyboard"/>');
	keyboard.css('position', 'absolute').css('z-index', '900').appendTo($('body'));
	
	var keys = $('<div id="keyboard_keys" />');
	keys.css('position', 'absolute').css('z-index', '900').appendTo($('body')).hide();
	ESpecialChars.detachTo(keys);
	
	keyboard.click(function() {
		keys.toggle();
	});

	$.fn.keyboard = function () {
		
		$(this).focus(function() {
			var nPos = $(this).offset();
			
			nPos.top += ($(this).height() + 7);
			nPos.left += 0;			
			keyboard.css(nPos).show();			
			
			nPos.left += 40;			
			keys.css(nPos);
			
		}).blur(function() {
			//keyboard.hide();
		});
		return $(this);
		
	};

})(jQuery);

window.EFilesLoaded++;
window.ETryInit();