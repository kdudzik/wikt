EPrinter = {
	recalculateCode : function () {
		var id, sec, i, j, subs,
			code = [],
			sortableSections = [];

		for (id in Ed.content.sections) {
			if (Ed.content.sections.hasOwnProperty(id)) {
				sec = Ed.content.sections[id];
				EUi.removeDefaultTexts(id, sec.code);
				sortableSections.push(sec);
			}
		}
		sortableSections.sort(function (a, b) { return a.id > b.id ? 1 : -1; });

		for (i in sortableSections) {
			if (sortableSections.hasOwnProperty(i)) {
				sec = sortableSections[i];
				if (sec.id === EConstants.SECTION_ID_INTRO) {
					code.push(EUi.val(EConstants.SECTION_ID_INTRO, '') + '\n');
				} else {
					code.push('== ' + sec.title + ' ==\n');
					for (j = 0; j < sec.subsections.length; j += 1) {
						subs = sec.subsections[j];
						if (subs.active) {
							subs.content = EUi.val(sec.id, subs.title);

							if (!subs.title && subs.content) {
								code.push(subs.content + '\n');
							} else if (subs.title && !subs.content) {
								code.push('{{' + subs.title + '}}\n');
							} else if (subs.shortened) {
								code.push('{{' + subs.title + '}}' + EPrinter.adequateWhitespace(subs) + subs.content + '\n');
							} else if (subs.content) {
								code.push(subs.content + '\n');
							}
						}
					}
					code.push('\n');
				}
			}
		}
		return $.trim(code.join('')).replace(/ {2,}/g, ' ');
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
		switch (mode) {
		case EConstants.MODE_IPA:
			return EPrinter.ipaResult(res);
		case EConstants.MODE_PICTURE:
			return EPrinter.pictureResult(res);
		case EConstants.MODE_AUDIO:
			return EPrinter.audioResult(res);
		case EConstants.MODE_INTERNAL_EXAMPLE:
			return EPrinter.internalExample(res);
		default:
			break;
		}
		return '';
	},

	ipaResult : function (res) {
		var arr = [],
			dl = $('<dl/>');

		$.each(res, function (lang, langresult) {
			arr.push({
				lang: lang,
				arr: langresult,
				caption : EConstants.WIKTCODE_TO_LANG[lang] || EConstants.CODE_TO_LANG[lang].replace('język', 'Wikisłownik') || lang
			});
		});
		arr.sort(function (a, b) {
			var active = EUtil.getActiveLangCode();

			if (a.lang === active) {
				return -1;
			} else if (b.lang === active) {
				return 1;
			} else {
				return a.caption > b.caption ? 1 : -1;
			}
		});

		$.each(arr, function () {
			var dt = $('<dt/>'),
				dd = $('<dd/>'),
				arrelem = this,
				title = mw.config.get('wgTitle');

			dt.append(arrelem.caption + ' ');
			dt.append('<a href="' + EUtil.getUrl(arrelem.lang, title) + '" target="_blank">[' + EStr.VIEW_ARTICLE + ']</a>');
			$.each(arrelem.arr, function () {
				var withOuter = EPrinter.ipaWithOuter(this.ipa, arrelem.lang),
					beg = withOuter.template === 'IPA' ? '/' : '[',
					end = withOuter.template === 'IPA' ? '/' : ']',
					link = $('<a class="ipa tip tipdown"/>');

				link.click(function () {
					EPrinter.insertCode('{{' + withOuter.template + '|' + withOuter.str + '}} ', '', '', '+IPA z [[:' + arrelem.lang + ':' + title + ']]');
					return false;
				});
				link.append(beg + withOuter.str + end);
				if (arrelem.lang === 'simple') {
					link.data('tip', EStr.IPA_HEADER_SIMPLE_ENGLISH);
				} else if (this.header) {
					link.data('tip', EStr.IPA_HEADER_INFO + '<tt>' + this.header + '</tt>');
				} else {
					link.data('tip', EStr.IPA_HEADER_FAILED);
				}
				dd.append(link).append(' ');
			});
			dl.append(dt).append(dd);
			if (arrelem.lang === EUtil.getActiveLangCode()) {
				dt.addClass('native');
				dd.addClass('native');
			}
		});
		return $(EStr.AJAX_IPA_RESULT_INSTRUCTION).append(dl);
	},

	ipaWithOuter : function (str, lang) {
		if (EConstants.IPA_TEMPLATE_MODE[lang] === EConstants.IPA_MODE_ADDS_SLASH) {
			return { template: 'IPA', str: str };
		} else if (EConstants.IPA_TEMPLATE_MODE[lang] === EConstants.IPA_MODE_ADDS_BRACKET) {
			return { template: 'IPA3', str: str };
		} else {
			if (str.indexOf('/') !== -1) {
				return { template: 'IPA', str: str.replace(/(^\s*\/\s*|\s*\/\s*$)?/g, '') };
			} else if (str.indexOf('[') !== -1) {
				return { template: 'IPA3', str: str.replace(/(^\s*\[\s*|\s*\]\s*$)?/g, '') };
			} else {
				return { template: 'IPA', str: str };
			}
		}
	},

	pictureResult : function (res) {
		var arr = [],
			dl = $('<dl/>');

		$.each(res, function (lang, langresult) {
			langresult.sort();
			arr.push({
				lang: lang,
				arr: langresult,
				caption : EConstants.WIKTCODE_TO_LANG[lang] || EConstants.CODE_TO_LANG[lang].replace('język', 'Wikisłownik') || lang
			});
		});
		arr.sort(function (a, b) {
			return a.caption > b.caption ? 1 : -1;
		});

		$.each(arr, function () {
			var dt = $('<dt/>'),
				dd = $('<dd/>'),
				arrelem = this;

			dt.append(arrelem.caption + ' ');
			dt.append('<a href="' + EUtil.getUrl(arrelem.lang, mw.config.get('wgTitle')) + '" target="_blank">[' + EStr.VIEW_ARTICLE + ']</a>');
			$.each(arrelem.arr, function () {
				var link = $('<a class="pictureInsertLink tip tipdown"/>'),
					elem = this.toString();

				link.html(elem);
				link.click(function () {
					var title = mw.config.get('wgTitle'),
						last = title.charCodeAt(title.length - 1);

					if (last >= 0x590 && last <= 0x85f) {
						EPrinter.insertCode('[[Plik:' + elem + '|thumb|' + title, ' &lrm;(1.1)]]\n', '', '+ilustracja z [[:' + arrelem.lang + ':' + title + ']]');
					} else {
						EPrinter.insertCode('[[Plik:' + elem + '|thumb|' + title, ' (1.1)]]\n', '', '+ilustracja z [[:' + arrelem.lang + ':' + title + ']]');
					}
					return false;
				});
				dd.append(link).append(' ');
			});
			dl.append(dt).append(dd);
		});
		return $(EStr.AJAX_PICTURE_RESULT_INSTRUCTION).append(dl);
	},

	setPictureTooltips : function () {
		$('#ajax_results a.pictureInsertLink').each(function () {
			var index = 'File:' + $(this).text().replace(/_/g, ' '),
				img = EAutomator.imageCache[index] || '';

			$(this).data('tip', img);
		});
	},

	audioResult : function (res) {
		var arr = [],
			dl = $('<dl/>');

		$.each(res, function (lang, langresult) {
			langresult.sort();
			arr.push({
				lang: lang,
				arr: langresult,
				caption : EConstants.WIKTCODE_TO_LANG[lang] || EConstants.CODE_TO_LANG[lang].replace('język', 'Wikisłownik') || lang
			});
		});
		arr.sort(function (a, b) {
			return a.caption > b.caption ? 1 : -1;
		});

		$.each(arr, function () {
			var dt = $('<dt/>'),
				dd = $('<dd/>'),
				arrelem = this;

			dt.append(arrelem.caption + ' ');
			dt.append('<a href="' + EUtil.getUrl(arrelem.lang, mw.config.get('wgTitle')) + '" target="_blank">[' + EStr.VIEW_ARTICLE + ']</a>');
			$.each(arrelem.arr, function () {
				var elem = this,
					template = EPrinter.audioTemplate(elem),
					link = $('<a/>');

				elem = elem.replace(/\{\{(PAGENAME|pn)\}\}/g, mw.config.get('wgTitle'));
				link.html(elem);
				link.click(function () {
					EPrinter.insertCode('{{' + template + '|' + elem + '}} ', '', '', '+nagranie wymowy');
					return false;
				});
				dd.append(link).append(' ');
			});
			dl.append(dt).append(dd);
		});
		return $(EStr.AJAX_AUDIO_RESULT_INSTRUCTION).append(dl);
	},

	audioTemplate : function (filename) {
		if (filename.indexOf('En-us-') === 0) {
			return 'audioUS';
		} else if (filename.indexOf('En-uk-') === 0) {
			return 'audioUK';
		} else if (filename.indexOf('En-au-') === 0) {
			return 'audioAU';
		} else if (filename.indexOf('En-ca-') === 0) {
			return 'audioCA';
		} else if (filename.indexOf('De-at-') === 0) {
			return 'audioAT';
		}
		return 'audio';
	},

	internalExample : function (res) {
		var dl = $('<dl/>');

		$.each(res, function (title, example) {
			var dt = $('<dt/>'),
				dd = $('<dd/>'),
				link = $('<a/>');

			dt.append('Hasło <a class="normalsize" href="' + mw.util.wikiGetlink(title) + '" target="_blank">' + title + '</a>:');
			link.text(example);
			link.click(function () {
				EPrinter.insertCode(example, '', '', '+przykład z hasła [[' + title + ']]');
				return false;
			});
			dd.append(link);
			dl.append(dt).append(dd);
		});

		return $(EStr.AJAX_INTERNAL_EXAMPLE_INSTRUCTION).append(dl);
	},

	appendEditDescription : function (res) {
		var input = $('#wpSummary'),
			val = input.val();

		if (!val) {
			input.val(res);
		} else if (val.indexOf(res) === -1) {
			if (val.endsWith('*/')) {
				input.val(val + ' ' + res);
			} else if (val.endsWith('*/ ')) {
				input.val(val + res);
			} else {
				input.val(val + ', ' + res);
			}
		}
	},

	insertCode : function (pre, post, mid, editDescription) {
		insertTags(pre, post, mid);
		EPrinter.appendEditDescription(editDescription);
		EUi.hideResult();
	}
};

window.EFilesLoaded++;
window.ETryInit();
