// jQuery Alert Dialogs Plugin
//
// Version 1.1
//
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 14 May 2009
//
// Visit http://abeautifulsite.net/notebook/87 for more information
//
// Usage:
//		jAlert( message, [title, callback] )
//		jConfirm( message, [title, callback] )
//		jPrompt( message, [value, title, callback] )
//
// History:
//
//		1.00 - Released (29 December 2008)
//
//		1.01 - Fixed bug where unbinding would destroy all resize events
//
// License:
//
// This plugin is dual-licensed under the GNU General Public License and the MIT License and
// is copyright 2008 A Beautiful Site, LLC.
//
(function ($) {

	$.alerts = {

		// These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time

		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		overlayOpacity: 0.2,                // transparency level of overlay
		overlayColor: '#000',               // base color of overlay
		draggable: false,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '',         // text for the OK button
		cancelButton: '', // text for the Cancel button
		dialogClass: null,                  // if specified, this class will be applied to all dialogs
		init: false,

		initialize: function () {
			if ($.alerts.init) {
				return;
			}
			$.alerts.okButton = '&nbsp;' + EStr.OK + '&nbsp;';
			$.alerts.cancelButton = '&nbsp;' + EStr.CANCEL + '&nbsp;';
			$.alerts.init = true;
		},

		// Public methods

		alert: function (message, title, callback) {
			$.alerts.initialize();
			if (title === undefined) {
				title = EStr.WARNING;
			}
			$.alerts.show__prv(title, message, null, 'alert', function (result) {
				if (callback) {
					callback(result);
				}
			});
		},

		confirm: function (message, title, callback) {
			$.alerts.initialize();
			if (title === undefined) {
				title = EStr.CONFIRMATION;
			}
			$.alerts.show__prv(title, message, null, 'confirm', function (result) {
				if (callback) {
					callback(result);
				}
			});
		},

		prompt: function (message, value, title, callback) {
			$.alerts.initialize();
			if (title === undefined) {
				title = EStr.QUESTION;
			}
			$.alerts.show__prv(title, message, value, 'prompt', function (result) {
				if (callback) {
					callback(result);
				}
			});
		},

		// Private methods

		show__prv: function (title, msg, value, type, callback) {

			$.alerts.hide__prv();
			$.alerts.overlay__prv('show');

			$("BODY").append('<div id="popup_container"><h1 id="popup_title"></h1><div id="popup_content"><div id="popup_message"></div></div></div>');

			if ($.alerts.dialogClass) {
				$("#popup_container").addClass($.alerts.dialogClass);
			}

			$("#popup_container").css({
				padding: 0,
				margin: 0
			});

			$("#popup_title").text(title);
			$("#popup_content").addClass(type);
			$("#popup_message").text(msg);
			$("#popup_message").html($("#popup_message").text().replace(/\n/g, '<br />'));

			$("#popup_container").css({
				minWidth: $("#popup_container").outerWidth(),
				maxWidth: $("#popup_container").outerWidth()
			});

			$.alerts.reposition__prv();
			$.alerts.maintainPosition__prv(true);

			switch (type) {
			case 'alert':
				$('#popup_container').addClass('alert').removeClass('confirm').removeClass('prompt');
				$('#popup_overlay').addClass('alert').removeClass('confirm').removeClass('prompt');
				$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
				$("#popup_ok").click(function () {
					$.alerts.hide__prv();
					callback(true);
				});
				$("#popup_ok").focus().keyup(function (e) {
					if (e.keyCode === 13 || e.keyCode === 27) {
						$("#popup_ok").trigger('click');
					}
				});
				break;
			case 'confirm':
				$('#popup_container').removeClass('alert').addClass('confirm').removeClass('prompt');
				$('#popup_overlay').removeClass('alert').addClass('confirm').removeClass('prompt');
				$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
				$("#popup_ok").click(function () {
					$.alerts.hide__prv();
					if (callback) {
						callback(true);
					}
				});
				$("#popup_cancel").click(function () {
					$.alerts.hide__prv();
					if (callback) {
						callback(false);
					}
				});
				$("#popup_ok").focus();
				$("#popup_ok, #popup_cancel").keyup(function (e) {
					if (e.keyCode === 13) {
						$("#popup_ok").trigger('click');
					}
					if (e.keyCode === 27) {
						$("#popup_cancel").trigger('click');
					}
				});
				break;
			case 'prompt':
				$('#popup_container').removeClass('alert').removeClass('confirm').addClass('prompt');
				$('#popup_overlay').removeClass('alert').removeClass('confirm').addClass('prompt');
				$("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" class="keyboardable" />').after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
				$("#popup_prompt").width($("#popup_message").width());
				$("#popup_ok").click(function () {
					var val = $("#popup_prompt").val();
					EKeyboard.hide();
					$.alerts.hide__prv();
					if (callback) {
						callback(val);
					}
				});
				$("#popup_cancel").click(function () {
					EKeyboard.hide();
					$.alerts.hide__prv();
					if (callback) {
						callback(null);
					}
				});
				$("#popup_prompt, #popup_ok, #popup_cancel").keyup(function (e) {
					if (e.keyCode === 13) {
						$("#popup_ok").trigger('click');
					}
					if (e.keyCode === 27) {
						$("#popup_cancel").trigger('click');
					}
				});
				if (value) {
					$("#popup_prompt").val(value);
				}
				$("#popup_prompt").keyboard().focus().select();
				break;
			default:
				break;
			}

			// Make draggable
			if ($.alerts.draggable) {
				try {
					$("#popup_container").draggable({ handle: $("#popup_title") });
					$("#popup_title").css({ cursor: 'move' });
				} catch (e) { /* requires jQuery UI draggables */ }
			}
		},

		hide__prv: function () {
			$("#popup_container").remove();
			$.alerts.overlay__prv('hide');
			$.alerts.maintainPosition__prv(false);
		},

		overlay__prv: function (status) {
			switch (status) {
			case 'show':
				$.alerts.overlay__prv('hide');
				$("BODY").append('<div id="popup_overlay"></div>');
				$("#popup_overlay").css({
					position: 'absolute',
					top: '0px',
					left: '0px',
					width: '100%',
					height: $(document).height(),
					background: $.alerts.overlayColor,
					opacity: $.alerts.overlayOpacity
				});
				break;
			case 'hide':
				$("#popup_overlay").remove();
				break;
			default:
				break;
			}
		},

		reposition__prv: function () {
			var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset,
				left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if (top < 0) {
				top = 0;
			}
			if (left < 0) {
				left = 0;
			}

			// IE6 fix
			if ($.browser.msie && parseInt($.browser.version, 10) <= 6) {
				top = top + $(window).scrollTop();
			}

			$("#popup_container").css({
				top: top + 'px',
				left: left + 'px'
			});
			$("#popup_overlay").height($(document).height());
			$("#popup_prompt").keyboard().focus().select();
		},

		maintainPosition__prv: function (status) {
			if ($.alerts.repositionOnResize) {
				switch (status) {
				case true:
					$(window).bind('resize', $.alerts.reposition__prv);
					break;
				case false:
					$(window).unbind('resize', $.alerts.reposition__prv);
					break;
				default:
					break;
				}
			}
		}

	};

	// Shortcut functions
	jAlert = function (message, title, callback) {
		$.alerts.alert(message, title, callback);
	};

	jConfirm = function (message, title, callback) {
		$.alerts.confirm(message, title, callback);
	};

	jPrompt = function (message, value, title, callback) {
		$.alerts.prompt(message, value, title, callback);
	};

}(jQuery));

window.EFilesLoaded++;
window.ETryInit();
