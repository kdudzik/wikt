window.EUtil = {
	getParameter : function(name) {
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(window.location.href);
		if (results === null) {
			return "";
		}
		else {
			return decodeURIComponent(results[1].replace(/\+/g, " "));
		}
	},

	getSection : function() {
		return self.document.location.hash.replace('#', '');
	},

	getActiveLangCode : function() {
		return EUi.activeLangCode;
	},

	getActiveLangId : function() {
		return EUi.activeLangId;
	},

	executeFn : function(functionName, context /*, args */) {
		var args = Array.prototype.slice.call(arguments, 2);
		var namespaces = functionName.split(".");
		var func = namespaces.pop();
		for (var i = 0; i < namespaces.length; i++) {
			context = context[namespaces[i]];
		}
		return context[func].apply(context, args);
	},

	focusArea : function(subs) {
		$('#ed_' + EUtil.getActiveLangId() + '_' + subs).focus();
	},

	isEmpty : function(obj) {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				return false;
			}
		}
		return true;
	}
};

$.fn.reverse = [].reverse;

window.EFilesLoaded++;
window.ETryInit();
