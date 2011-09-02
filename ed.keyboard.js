ESpecialChars = {

	obj : undefined,
	formerParent : undefined,
	detached : 0,

	detach : function () {
		var container;

		if (ESpecialChars.detached) {
			return;
		}
		container = $('#keyboard_keys');
		ESpecialChars.obj = $('#editpage-specialchars');
		ESpecialChars.formerParent = ESpecialChars.obj.parent();
		ESpecialChars.obj.detach();

		container.append(ESpecialChars.obj);
		ESpecialChars.detached = 1;
	},

	attach : function () {
		if (!ESpecialChars.detached) {
			return;
		}
		EKeyboard.hide();
		ESpecialChars.obj.detach();
		ESpecialChars.formerParent.append(ESpecialChars.obj);
		ESpecialChars.detached = 0;
	},

	toggle : function () {
		if (ESpecialChars.detached) {
			ESpecialChars.attach();
		} else {
			ESpecialChars.detach();
		}
	}
};

EKeyboard = {
	opened : 0,

	init : function () {
		var keyboard = $('<div id="keyboard"/>'),
			keys = $('<div id="keyboard_keys" />');

		keyboard.hide();
		keys.hide().append(EStr.KEYBOARD_ALWAYS);
		$('body').append(keyboard).append(keys);

		if (EUi.usingNew) {
			ESpecialChars.detach();
		}
		EKeyboard.opened = $.cookie('keyboard_opened') === '1';

		keyboard.click(function () {
			keys.toggle();
			EKeyboard.opened = !EKeyboard.opened;
			$.cookie('keyboard_opened', +EKeyboard.opened);
			return false;
		});
		if (EKeyboard.opened) {
			keys.show();
		}

		$(window).resize(function () {
			if (document.activeElement) {
				$(document.activeElement).focus();
			}
		});
		$('#ed .keyboardable').live('focus', $(this).keyboard);
	},

	hide : function () {
		$('#keyboard').hide();
		$('#keyboard_keys').hide();
	},

	updatePosition : function (origin) {
		var nPos;
		if (!origin.is(':visible')) {
			EKeyboard.hide();
			return;
		}
		nPos = origin.offset();

		nPos.top += (origin.height() + 7);
		nPos.left += 20;
		$('#keyboard').show().css(nPos);
		$('#keyboard_keys').css({ top: nPos.top, left: nPos.left + 34 }).data('active_area', origin.attr('id'));

		window.insertTags = EKeyboard.insertTags;
	},

	insertTags : function (tagOpen, tagClose, sampleText) {
		var txtarea, aname, areas, selText, isSample = false,
			winScroll, range, textScroll, startPos, endPos;

		function checkSelectedText() {
			if (!selText) {
				selText = sampleText;
				isSample = true;
			} else if (selText.charAt(selText.length - 1) === ' ') { //exclude ending space char
				selText = selText.substring(0, selText.length - 1);
				tagClose += ' ';
			}
		}

		if (document.editform && !EUi.usingNew) {
			txtarea = document.editform.wpTextbox1;
		} else if (EUi.usingNew) {
			aname = $('#keyboard_keys').data('active_area');
			txtarea = aname ? document.getElementById(aname) : undefined;
		}
		if (!txtarea) {
			areas = document.getElementsByTagName('textarea');
			txtarea = areas[0];
		}
		if (document.selection  && document.selection.createRange) {
			if (document.documentElement && document.documentElement.scrollTop) {
				winScroll = document.documentElement.scrollTop;
			} else if (document.body) {
				winScroll = document.body.scrollTop;
			}
			txtarea.focus();
			range = document.selection.createRange();
			selText = range.text;
			checkSelectedText();
			range.text = tagOpen + selText + tagClose;
			if (isSample && range.moveStart) {
				if (is_opera && is_opera_seven && !is_opera_95) {
					tagClose = tagClose.replace(/\n/g, '');
				}
				range.moveStart('character', -tagClose.length - selText.length);
				range.moveEnd('character', -tagClose.length);
			}
			range.select();
			if (document.documentElement && document.documentElement.scrollTop) {
				document.documentElement.scrollTop = winScroll;
			} else if (document.body) {
				document.body.scrollTop = winScroll;
			}

		} else if (txtarea.selectionStart || txtarea.selectionStart === 0) {
			textScroll = txtarea.scrollTop;
			txtarea.focus();
			startPos = txtarea.selectionStart;
			endPos = txtarea.selectionEnd;
			selText = txtarea.value.substring(startPos, endPos);
			checkSelectedText();
			txtarea.value = txtarea.value.substring(0, startPos) +
				tagOpen + selText + tagClose +
				txtarea.value.substring(endPos, txtarea.value.length);
			if (isSample) {
				txtarea.selectionStart = startPos + tagOpen.length;
				txtarea.selectionEnd = startPos + tagOpen.length + selText.length;
			} else {
				txtarea.selectionStart = startPos + tagOpen.length + selText.length + tagClose.length;
				txtarea.selectionEnd = txtarea.selectionStart;
			}
			txtarea.scrollTop = textScroll;
		}
		$(txtarea).autoresize();
		EUi.relocateResult();
	}

};

(function ($) {
	$.fn.keyboard = function () {
		$(this).focus(function () {
			EKeyboard.updatePosition($(this));
		});
		EKeyboard.updatePosition($(this));
		return $(this);
	};
}(jQuery));

window.EFilesLoaded++;
window.ETryInit();
