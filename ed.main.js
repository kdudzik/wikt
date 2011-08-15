/**
 *
 */

window.Ed = {

	code : '',
	content : {},

	parseContentToSections : function () {
		Ed.content.sections = EParser.getSections(Ed.code);
	},

	parseSectionsToSubsections : function () {
		var id, sec;
		for (id in Ed.content.sections) {
			sec = Ed.content.sections[id];
			ESectionParser.parse(sec);
		}
	},

	init : function () {
		var tbox, oldform, instruction;
		if (EUtil.getParameter('oldid') && EUtil.getParameter('oldid') !== '' + mw.config.get('wgCurRevisionId')) {
			return;
		}
		EConstants.init();

		tbox = $('#wpTextbox1');
		oldform = $('.wikiEditor-ui');
		instruction = $('#nat-instrukcja');
		Ed.code = tbox.val();

		Ed.parseContentToSections();
		Ed.parseSectionsToSubsections();

		EUi.prepareForm(oldform, instruction);

        $('.tip').livequery(function () {
			$(this).tooltip('tip');
        });
        $('.keyboardable').livequery(function () {
			$(this).keyboard();
		});
	},

	resetNew : function () {
		var tbox = $('#wpTextbox1');
		Ed.content = {};
		Ed.code = tbox.val();
		Ed.parseContentToSections();
		Ed.parseSectionsToSubsections();

		EUi.reset();
	}

};

window.EFilesLoaded++;
window.ETryInit();
