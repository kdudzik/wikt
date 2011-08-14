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
		EAutomator.initTest();

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

	getActiveLang : function() {
		return EUi.activeLang;
	}
};

$.fn.reverse = [].reverse;

window.EFilesLoaded++;
window.ETryInit();
