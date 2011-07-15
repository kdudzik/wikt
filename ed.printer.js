window.EPrinter = {
	recalculateCode : function(form) {
		var code = '';
		var sortableSections = [];
		for (id in Ed.content.sections) {
			var sec = Ed.content.sections[id];
			EForm.removeDefaultTexts(id, sec['code']);
			sortableSections.push(sec);
		}
		sortableSections.sort(function(a, b) { return a.id > b.id ? 1 : -1; });
		
		for (i in sortableSections) {
			var sec = sortableSections[i];
			if (sec.id == EConstants.SECTION_ID_INTRO) {
				code = EForm.val(EConstants.SECTION_ID_INTRO, '') + '\n';
			}
			else {
				code += '== ' + sec.title + ' ==\n';
				for (i = 0; i < sec.subsections.length; i++) {
					var subs = sec.subsections[i];
					if (!subs.active) {
						continue;
					}
					subs.content = EForm.val(sec.id, subs.title);
										
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
		/*
		 * Teksty zaczynające się od dwukropka, gwiazdki, zaczynające się od "<references", "{{litera|", "{{kolor|", 
		 * szablony zaczynające się na "{{zch-", linki do grafiki (file:, grafika: image: media: plik:, to samo dużą literą, 
		 * możliwe białe znaki między nawiasami kwadratowymi a tym słowem),...
		 */
		if (str.search(/[:\*#]|<references|\{\{(litera|kolor)\||\{\{zch-|\[\[(file|image|grafika|plik|media):/i) == 0) {
			return '\n';
		}
		/*
		 * ...teksty w polach "znaczenia", "przykłady" oraz "tłumaczenia" nie mogą występować zaraz po szablonie, jeśli 
		 * występują muszą być przeniesione bez dodawania dwukropka.
		 */
		if ($.inArray(subsection.title, EConstants.SUBSECTIONS_WITH_NL) != -1) {
			return '\n';
		}
		/*
		 * Inne teksty składające się z więcej niż jednej linii, powinny być przeniesione z dodaniem dwukropka i spacji 
		 * na początku pierwszej linii
		 */
		if (str.indexOf('\n') != -1 && str.search(/[:\*#]/) != 0) {
			return '\n: ';
		}
		/*
		 * Wpp: dla wypełnionych przed edycją pól zachowujemy istniejące formatowanie o ile dane pole już było niepuste.
		*/
		if (subsection.initcontent != '') {
			return subsection.initmultiline ? '\n: ' : ' ';
		}
		/*
		 * w polach pustych przed edycją: w sekcjach "wymowa", "transliteracja", "transkrypcja", "ortografie", "klucz", 
		 * "kreski", "czytania", "hanja-kreski" defaultem jest pisanie bezpośrednio po szablonie (po spacji)...
		 */
		if ($.inArray(subsection.title, EConstants.SUBSECTIONS_WITHOUT_NL) != -1) {
			return ' ';
		}
		/*
		 * a w pozostałych od następnej linii (jeśli nie jest to "znaczenie" ani pierwsza sekcja ani "przykłady", 
		 * ani "tłumaczenia" a tekst nie zaczyna się od dwukropka lub gwiazdki, to program powinien sam dodać dwukropek i spację)
		 */
		return '\n: ';
	}
};

window.EFilesLoaded++;
window.ETryInit();
