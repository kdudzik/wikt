/**
 *
 */

window.Ed = {

	code : '',
	content : {},

	parseContentToSections : function() {
		Ed.content.sections = EParser.getSections(Ed.code);
	},

	parseSectionsToSubsections : function() {
		for (var id in Ed.content.sections) {
			var sec = Ed.content.sections[id];
			ESectionParser.parse(sec);
		}
	},

	init : function() {
		if (EUtil.getParameter('oldid') && EUtil.getParameter('oldid') != mw.config.get('wgCurRevisionId')) {
			return;
		}
		EConstants.init();

		var tbox = $('#wpTextbox1'),
			oldform = $('.wikiEditor-ui'),
			instruction = $('#nat-instrukcja');
		Ed.code = tbox.val();

		Ed.parseContentToSections();
		Ed.parseSectionsToSubsections();

		EUi.prepareForm(oldform, instruction);

        $('.tip').livequery(function() {
			$(this).tooltip('tip');
        });
        $('.keyboardable').livequery(function() {
			$(this).keyboard();
		});
	},

	resetNew : function() {
		var tbox = $('#wpTextbox1');
		Ed.content = {};
		Ed.code = tbox.val();
		Ed.parseContentToSections();
		Ed.parseSectionsToSubsections();

		EUi.reset();
	}

};

window.EUtil = {
	getParameter : function(name)
	{
	  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regexS = "[\\?&]"+name+"=([^&#]*)";
	  var regex = new RegExp( regexS );
	  var results = regex.exec( window.location.href );
	  if( results == null )
	    return "";
	  else
	    return decodeURIComponent(results[1].replace(/\+/g, " "));
	},

	getSection : function() {
		return self.document.location.hash.replace('#', '');
	},

	getActiveLangCode : function() {
		return EUi.activeLangcode;
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
	}
};

$.fn.reverse = [].reverse;

window.EFilesLoaded++;
window.ETryInit();
