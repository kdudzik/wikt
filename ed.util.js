EUtil = {
	getParameter : function (name) {
		return mw.util.getParamValue(name);
	},

	getSection : function () {
		return document.location.hash.replace('#', '');
	},

	getActiveLangCode : function () {
		return EUi.activeLangCode;
	},

	getActiveLangId : function () {
		return EUi.activeLangId;
	},

	executeFn : function (functionName, context) { /*, args */
		var args = Array.prototype.slice.call(arguments, 2),
			namespaces = functionName.split('.'),
			func = namespaces.pop(),
			i;

		for (i = 0; i < namespaces.length; i += 1) {
			context = context[namespaces[i]];
		}
		return context[func].apply(context, args);
	},

	focusArea : function (subs) {
		$('#ed_' + EUtil.getActiveLangId() + '_' + subs).focus();
	},

	isEmpty : function (obj) {
		var prop;

		for (prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				return false;
			}
		}
		return true;
	},

	escapeHTML : function (html) {
		return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	},

	escapeJS : function (js) {
		return js.replace(/\'/g, "\\'");
	},

	getUrl : function (langcode, page) {
		return 'http://' + langcode + '.wiktionary.org/wiki/' + mw.util.wikiUrlencode(page);
	}
};

$.fn.reverse = [].reverse;

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (obj, start) {
		var i, j;
		for (i = (start || 0), j = this.length; i < j; i += 1) {
			if (this[i] === obj) { return i; }
		}
		return -1;
	};
}

window.EFilesLoaded++;
window.ETryInit();
