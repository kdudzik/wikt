window.EPrinter = {
	recalculateCode : function () {
		var id, sec, i, j, subs,
			code = '',
			sortableSections = [];

		for (id in Ed.content.sections) {
			if (Ed.content.sections.hasOwnProperty(id)) {
				sec = Ed.content.sections[id];
				EForm.removeDefaultTexts(id, sec.code);
				sortableSections.push(sec);
			}
		}
		sortableSections.sort(function (a, b) { return a.id > b.id ? 1 : -1; });

		for (i in sortableSections) {
			if (sortableSections.hasOwnProperty(i)) {
				sec = sortableSections[i];
				if (sec.id === EConstants.SECTION_ID_INTRO) {
					code = EForm.val(EConstants.SECTION_ID_INTRO, '') + '\n';
				} else {
					code += '== ' + sec.title + ' ==\n';
					for (j = 0; j < sec.subsections.length; j += 1) {
						subs = sec.subsections[j];
						if (subs.active) {
							subs.content = EForm.val(sec.id, subs.title);

							if (!subs.title && subs.content) {
								code += subs.content + '\n';
							} else if (subs.title && !subs.content) {
								code += '{{' + subs.title + '}}\n';
							} else if (subs.shortened) {
								code += '{{' + subs.title + '}}' + EPrinter.adequateWhitespace(subs) + subs.content + '\n';
							} else if (subs.content) {
								code += subs.content + '\n';
							}
						}
					}
					code += '\n';
				}
			}
		}
		code = $.trim(code);
		return code;
	},

	adequateWhitespace : function (subsection) {
		var str = subsection.content;
		/*
		 * Teksty zaczynające się od dwukropka, gwiazdki, zaczynające się od "<references", "{{litera|", "{{kolor|",
		 * szablony zaczynające się na "{{zch-", linki do grafiki (file:, grafika: image: media: plik:, to samo dużą literą,
		 * możliwe białe znaki między nawiasami kwadratowymi a tym słowem),...
		 */
		if (str.search(/[:\*#]|<references|\{\{(litera|kolor)\||\{\{zch-|\[\[(file|image|grafika|plik|media):/i) === 0) {
			return '\n';
		}
		/*
		 * ...teksty w polach "znaczenia", "przykłady" oraz "tłumaczenia" nie mogą występować zaraz po szablonie, jeśli
		 * występują muszą być przeniesione bez dodawania dwukropka.
		 */
		if (EConstants.SUBSECTIONS_WITH_NL.indexOf(subsection.title) !== -1) {
			return '\n';
		}
		/*
		 * Inne teksty składające się z więcej niż jednej linii, powinny być przeniesione z dodaniem dwukropka i spacji
		 * na początku pierwszej linii
		 */
		if (str.indexOf('\n') !== -1 && str.search(/[:\*#]/) !== 0) {
			return '\n: ';
		}
		/*
		 * Wpp: dla wypełnionych przed edycją pól zachowujemy istniejące formatowanie o ile dane pole już było niepuste.
		*/
		if (subsection.initcontent) {
			return subsection.initmultiline ? '\n: ' : ' ';
		}
		/*
		 * w polach pustych przed edycją: w sekcjach "wymowa", "transliteracja", "transkrypcja", "ortografie", "klucz",
		 * "kreski", "czytania", "hanja-kreski" defaultem jest pisanie bezpośrednio po szablonie (po spacji)...
		 */
		if (EConstants.SUBSECTIONS_WITHOUT_NL.indexOf(subsection.title) !== -1) {
			return ' ';
		}
		/*
		 * a w pozostałych od następnej linii (jeśli nie jest to "znaczenie" ani pierwsza sekcja ani "przykłady",
		 * ani "tłumaczenia" a tekst nie zaczyna się od dwukropka lub gwiazdki, to program powinien sam dodać dwukropek i spację)
		 */
		return '\n: ';
	},

	resultToHTML : function (mode, res) {
		var html = '';
		switch (mode) {
		case EConstants.MODE_IPA:
			html = EPrinter.ipaResultToHTML(res);
			break;
		default:
			break;
		}
		return html;
	},

	ipaResultToHTML : function (res) {
		var html = EStr.AJAX_IPA_RESULT_INSTRUCTION;

		html += '<dl>'
		$.each(res, function (lang, arr) {
			var langlink = '<a href="' + EUtil.getUrl(lang, mw.config.get('wgTitle')) + '" target="_blank">[' + EStr.VIEW_ARTICLE + ']</a>';
			html += '<dt>' + EConstants.CODE_TO_LANG[lang] + ' ' + langlink + '</dt>';
			html += '<dd>';
			$.each(arr, function (ignored, elem) {
				var elemHTML = EUtil.escapeHTML(elem),
					elemJS = EUtil.escapeJS(elem);
				html += '<a href="#" onclick="insertTags(\'' + elemJS + '\', \'\', \'\'); return false">' + elemHTML + '</a>';
			});
			html += '</dd>';
		});
		html += '</dl>'

		return html;
	}
};

window.EFilesLoaded++;
window.ETryInit();
