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
		for (var alphaname in Ed.content.sections) {
			var sec = Ed.content.sections[alphaname];
			ESectionParser.parse(sec, alphaname);
		}
	},

	init : function() {
		var tbox = $('#wpTextbox1'),
			oldform = $('.wikiEditor-ui'),
			instruction = $('#nat-instrukcja');
		Ed.code = tbox.val();
		
		Ed.parseContentToSections();
		Ed.parseSectionsToSubsections();
		
		EdUi.prepareForm(oldform, instruction);

        $('.tip').livequery(function() {
			$(this).tooltip('tip');
        });			
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
	}
};

window.EdFilesLoaded++;
window.EdTryInit();