window.ESpecialChars = {
	
	obj : undefined,
	formerParent : undefined,
	detached : 0,
	
	detach : function() {
		if (ESpecialChars.detached) {
			return;
		}
		var container = $('#keyboard_keys');
		ESpecialChars.obj = $('#editpage-specialchars');
		ESpecialChars.formerParent = ESpecialChars.obj.parent();
		ESpecialChars.obj.detach();
		
		container.append(ESpecialChars.obj);
		ESpecialChars.detached = 1;
	},
	
	attach : function() {
		if (!ESpecialChars.detached) {
			return;
		}
		EKeyboard.hide();
		ESpecialChars.obj.detach();
		ESpecialChars.formerParent.append(ESpecialChars.obj);
		ESpecialChars.detached = 0;
	},
	
	toggle : function() {
		if (ESpecialChars.detached) {
			ESpecialChars.attach();
		}
		else {
			ESpecialChars.detach();
		}
	}
};

window.EKeyboard = {

	init : function() {
		var keyboard = $('<div id="keyboard"/>');
		var keys = $('<div id="keyboard_keys" />');
		
		keyboard.hide();
		keys.hide().append(EStr.KEYBOARD_ALWAYS);
		$('body').append(keyboard).append(keys);
		
		if (EUi.usingNew) {
			ESpecialChars.detach();
		}
		
		keyboard.click(function() {
			keys.toggle();
		});
		
	},
	
	hide : function() {
		$('#keyboard').hide();
		$('#keyboard_keys').hide();		
	}

};

(function($) {
			
	$.fn.keyboard = function () {
		
		$(this).focus(function() {
			if (!$(this).is(':visible')) {
				EKeyboard.hide();
				return;
			}
			var nPos = $(this).offset();
			
			nPos.top += ($(this).height() + 7);
			nPos.left += 20;
			$('#keyboard').show().css({ top: nPos.top, left: nPos.left });
			$('#keyboard_keys').css({ top: nPos.top, left: nPos.left + 40 });			
			$('#keyboard_keys').data('active_area', $(this).attr('id'));
			
			insertTags = insertTags2;
		}).blur(function() {
		});
		return $(this);
		
	};

})(jQuery);

insertTags2 = function insertTags2(tagOpen, tagClose, sampleText) {
	var txtarea;
	if (document.editform && !EUi.usingNew) {
		txtarea = document.editform.wpTextbox1;
	} else if (EUi.usingNew) {
		var aname = $('#keyboard_keys').data('active_area');
		txtarea = aname ? document.getElementById(aname) : undefined;
	}
	if (!txtarea) {
		// some alternate form? take the first one we can find
		var areas = document.getElementsByTagName('textarea');
		txtarea = areas[0];
	}
	var selText, isSample = false;
 
	if (document.selection  && document.selection.createRange) { // IE/Opera
 
		//save window scroll position
		if (document.documentElement && document.documentElement.scrollTop)
			var winScroll = document.documentElement.scrollTop;
		else if (document.body)
			var winScroll = document.body.scrollTop;
		//get current selection  
		txtarea.focus();
		var range = document.selection.createRange();
		selText = range.text;
		//insert tags
		checkSelectedText();
		range.text = tagOpen + selText + tagClose;
		//mark sample text as selected
		if (isSample && range.moveStart) {
			if (is_opera && is_opera_seven && !is_opera_95)
				tagClose = tagClose.replace(/\n/g,'');
			range.moveStart('character', - tagClose.length - selText.length); 
			range.moveEnd('character', - tagClose.length); 
		}
		range.select();   
		//restore window scroll position
		if (document.documentElement && document.documentElement.scrollTop)
			document.documentElement.scrollTop = winScroll;
		else if (document.body)
			document.body.scrollTop = winScroll;
 
	} else if (txtarea.selectionStart || txtarea.selectionStart == '0') { // Mozilla
 
		//save textarea scroll position
		var textScroll = txtarea.scrollTop;
		//get current selection
		txtarea.focus();
		var startPos = txtarea.selectionStart;
		var endPos = txtarea.selectionEnd;
		selText = txtarea.value.substring(startPos, endPos);
		//insert tags
		checkSelectedText();
		txtarea.value = txtarea.value.substring(0, startPos)
			+ tagOpen + selText + tagClose
			+ txtarea.value.substring(endPos, txtarea.value.length);
		//set new selection
		if (isSample) {
			txtarea.selectionStart = startPos + tagOpen.length;
			txtarea.selectionEnd = startPos + tagOpen.length + selText.length;
		} else {
			txtarea.selectionStart = startPos + tagOpen.length + selText.length + tagClose.length;
			txtarea.selectionEnd = txtarea.selectionStart;
		}
		//restore textarea scroll position
		txtarea.scrollTop = textScroll;
	} 
 
	function checkSelectedText(){
		if (!selText) {
			selText = sampleText;
			isSample = true;
		} else if (selText.charAt(selText.length - 1) == ' ') { //exclude ending space char
			selText = selText.substring(0, selText.length - 1);
			tagClose += ' ';
		} 
	}
};

window.EFilesLoaded++;
window.ETryInit();