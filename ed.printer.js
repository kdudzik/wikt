window.EPrinter = {
	recalculateCode : function(form) {
		var code = '';
		var sortableSections = [];
		for (alpha in Ed.content.sections) {
			sortableSections.push(Ed.content.sections[alpha]);
		}
		sortableSections.sort(function(a, b) {
			return a.alpha > b.alpha ? 1 : -1;
		});
		
		for (i in sortableSections) {
			var sec = sortableSections[i];
			if (sec.alpha == '0000') {
				code = $('#ed_0000_').val();
				code = $.trim(code) + '\n';
			}
			else {
				code += '== ' + sec.title + ' ==\n';
				for (i = 0; i < sec.subsections.length; i++) {
					var subs = sec.subsections[i];
					if (!subs.active) {
						continue;
					}
					subs.content = $('#ed_' + sec.alpha + '_' + subs.title.replace(' ', '_')).val();
					subs.content = $.trim(subs.content);
					
					if (subs.title == '' && subs.content != '') {
						code += subs.content + '\n';
					}
					else if (subs.title != '' && subs.content == '') {
						code += '{{' + subs.title + '}}\n';
					}
					else if (subs.shortened) {
						var whitespace = EPrinter.adequateWhitespace(subs);
						code += '{{' + subs.title + '}}' + whitespace + subs.content + '\n';
					}
					else if (subs.content != '') {
						code += subs.content + '\n';
					}
				}
				code += '\n';
			}
		}
		code = $.trim(code);
		return code;
	},
	
	adequateWhitespace : function(subsection) {
		
		var str = subsection.content;
		if (str.search(/<references|\{\{(litera|kolor)\||\{\{zch-|\[\[(file|image|grafika|plik|media):/i) == 0) {
			return '\n';
		}
		if (subsection.title == 'znaczenia' || subsection.title == 'przykłady' || subsection.title == 'tłumaczenia') {
			return '\n';
		}
		if (subsection.initmultiline && str.indexOf('\n') != -1 && str.search(/[:\*#]/) != 0) {
			return '\n: ';
		}
		if (subsection.initmultiline) {
			return '\n';
		}
		if (!subsection.wasempty) {
			return ' ';
		}
		if ($.inArray(subsection.title, EConstants.SUBSECTIONS_WITHOUT_NL)) {
			if (str.search(/[:\*#]/) != 0) {
				return '\n';
			}
			else {
				return '\n: ';
			}
		}
		return ' ';
	}
};

window.EFilesLoaded++;
window.ETryInit();