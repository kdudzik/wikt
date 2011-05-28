/**
 * 
 */

window.Ed = {
	
	code : '',
	content : {},
	
		
	parseContentToSections :
	function() {
		Ed.content.sections = EParser.getSections(Ed.code);
	},
		
	parseSectionsToSubsections :
	function() {
		for (var alphaname in Ed.content.sections) {
			var sec = Ed.content.sections[alphaname];
			ESectionParser.parse(sec, alphaname);
		}
	},

	init :
	function() {
		var tbox = $('#wpTextbox1'),
			oldform = $('.wikiEditor-ui');
		Ed.code = tbox.val();
		var newform = EdUi.prepareForm(oldform);
		
		Ed.parseContentToSections();
		EdUi.prepareFormSections();
		
		Ed.parseSectionsToSubsections();
		EdUi.prepareFormSubsections();
		
		$(document).ready(function() {
            $('.tip').tooltip('tip');
        });			
	}
	
	
};

window.EdFilesLoaded++;
window.EdTryInit();