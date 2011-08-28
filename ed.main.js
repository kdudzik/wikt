Ed = {

	code : '',
	content : {},

	parseContentToSections : function () {
		Ed.content.sections = EParser.getSections(Ed.code);
	},

	parseSectionsToSubsections : function () {
		var id, sec;

		for (id in Ed.content.sections) {
			if (Ed.content.sections.hasOwnProperty(id)) {
				sec = Ed.content.sections[id];
				ESectionParser.parse(sec);
			}
		}
	},

	init : function () {
		var tbox, oldform;

		if (EUtil.getParameter('oldid') && EUtil.getParameter('oldid') !== mw.config.get('wgCurRevisionId').toString()) {
			return;
		}
		EConstants.init();

		tbox = $('#wpTextbox1');
		oldform = $('div.wikiEditor-ui, #nat-instrukcja, #wpTextbox1, #toolbar');
		Ed.code = tbox.val();

		Ed.parseContentToSections();
		Ed.parseSectionsToSubsections();

		EUi.prepareForm(oldform, tbox);

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
