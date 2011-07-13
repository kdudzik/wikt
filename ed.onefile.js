//<nowiki>
var css="#ed {\
	overflow : auto;\
	background-color: white;\
	padding: 0;\
	display: none;\
	line-height: 1.3;\
	border: 0;\
	width: 100%;\
	height: auto;\
	position: relative;\
}\
\
fieldset.ed_section {\
	display: none;\
	margin: 0;\
	border: 1px solid khaki;\
	min-height: 250px;\
	background-color: LemonChiffon;\
	padding-top: 7px;\
}\
\
fieldset.ed_section.active {\
	display: block;\
}\
\
ul#ed_menu {\
	background-color: white;\
	width: 97%;\
	display: block;\
	list-style: none;\
	margin: 0;\
	float: left;\
	border: 0;\
	padding-left: 3%;\
}\
\
ul#ed_menu li {\
	float: left;\
	padding: 3px 7px;\
	background: white;\
	border-width: 1px 1px 0 1px;\
	border-style: dotted;\
	border-color: khaki;\
	cursor: pointer;\
}\
\
ul#ed_menu li.active {\
	background: LemonChiffon;\
	border-color: DarkKhaki;\
	border-style: solid;\
}\
\
#ed_menuitem_new {\
	font-weight: bold;\
}\
\
#ed_content {\
	clear: left;\
	padding: 0;\
}\
\
\
fieldset.ed_section label {\
	float: left;\
	width: 20%;\
	padding: 2px 1% 0 1%;\
	line-height: 1;\
	clear: left;\
	text-align: right;\
	max-width: 170px;\
}\
\
fieldset.ed_section textarea {\
	width: 77%;\
	border: 1px solid khaki;\
	height: 1em;\
	font-family: Consolas, \"Lucida Console\", monospace;\
	font-size: 9pt;\
}\
\
fieldset.ed_section p {\
	clear: both;\
	text-align: center;\
}\
\
fieldset.ed_section p.top {\
	margin-top: 10px;\
	margin-bottom: 10px;\
}\
\
fieldset.ed_section p.top a {\
	margin-right: 15px;\
}\
\
fieldset.ed_section a:hover {\
	cursor: pointer;\
}\
\
label.oblig_subsection {\
	color: #CC0000;\
	font-weight: bold;\
}\
\
\
#popup_container {\
	font-size: 0.8em;\
	min-width: 300px; /* Dialog will be no smaller than this */\
	max-width: 600px; /* Dialog will wrap after this width */\
	background: #FFF;\
	border: solid 5px #999;\
	color: #000;\
	-moz-border-radius: 5px;\
	-webkit-border-radius: 5px;\
	border-radius: 5px;\
	z-index: 900;\
	position: absolute;\
}\
\
#popup_overlay {\
	z-index: 899;\
}\
\
#popup_container.prompt {\
	z-index: 600;\
}\
\
#popup_overlay.prompt {\
	z-index: 599;\
}\
\
#popup_title {\
	font-size: 1em;\
	font-weight: bold;\
	text-align: center;\
	line-height: 1.75em;\
	color: #666;\
	background-color: #CCC;\
	border: solid 1px #FFF;\
	border-bottom: solid 1px #999;\
}\
\
#popup_content {\
	background: 16px 16px no-repeat url(images/info.gif);\
	padding: 1em 1.75em;\
	margin: 0em;\
}\
\
#popup_content.alert {\
	background-image: url(images/info.gif);\
}\
\
#popup_content.confirm {\
	background-image: url(images/important.gif);\
}\
\
#popup_content.prompt {\
	background-image: url(images/help.gif);\
}\
\
#popup_message {\
	padding-left: 48px;\
}\
\
#popup_panel {\
	text-align: center;\
	margin: 1em 0em 0em 1em;\
}\
\
#popup_prompt {\
	margin: .5em 0em;\
	border: 1px solid darkkhaki;\
}\
\
.tooltip { \
	padding: 5px;\
	max-width: 450px;\
	background-color: lemonchiffon;\
	border: 1px solid darkkhaki;\
	color: saddlebrown;\
}\
\
#keyboard {\
	width: 32px;\
	height: 32px;\
	background-color: lemonchiffon;\
	background-image: url('http://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Input-keyboard.svg/32px-Input-keyboard.svg.png');\
	border: 2px solid PaleGoldenrod;\
	padding: 0;\
	position: absolute;\
	z-index: 700;\
}\
\
#keyboard_keys {\
	font-size: 0.8em;\
	background-color: lemonchiffon;\
	border: 2px solid palegoldenrod;\
	padding: 5px;\
	max-width: 400px;\
	position: absolute;\
	z-index: 700;\
}\
\
#keyboard_keys .plainlinks {\
	border: 0 !important;\
}\
\
#keyboard_keys select {\
	width: 100%;\
}\
\
#keyboard_keys #editpage-specialchars.plainlinks a {\
	padding: 1px 2px !important;\
	margin: 0 !important;\
}\
#keyboard_keys #editpage-specialchars.plainlinks a:hover {\
	text-decoration: none;\
	background-color: palegoldenrod !important;\
}\
#keyboard_keys #editpage-specialchars.plainlinks a.extiw {\
	padding: 0 !important;\
}\
#keyboard_keys #editpage-specialchars.plainlinks a.extiw:hover {\
	text-decoration: underline;\
	background-color: transparent !important;\
}\
#keyboard_keys .keyboard_always {\
	margin: 5px 2px;\
}\
#keyboard_keys .keyboard_always a {\
	padding: 2px 7px;\
	font-size: 1.2em;\
	border: 1px solid palegoldenrod;\
	background-color: palegoldenrod;\
}\
#keyboard_keys .keyboard_always a:hover {\
	text-decoration: none;\
	border: 1px solid darkkhaki;\
}\
";
mw.util.addCSS(css);
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
		if (EUtil.getParameter('oldid') && EUtil.getParameter('oldid') != mw.config.get('wgCurRevisionId')) {
			return;
		}
			
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
	}
};


window.EParser = {
	getSections : function(code) {
		code = code.replace(/\s*==\s*([^=]+)\s*==\s*/g, '<BE>$1<EN>');
		var sections = code.split('<BE>');
		var reta = {};
		for (s in sections) {
			if (!sections[s].length) {
				continue;
			}
			sec = sections[s].split('<EN>');
			
			if (sec.length == 1) {
				// sekcja zerowa
				reta['0000'] = {
					content : $.trim(sec[0]),
					title : '',
					alpha : '0000',
					initcontent: $.trim(sec[0])
				};
			}
			else {
				var section = this.getSectionFromTitle($.trim(sec[0]));
				var alphacode = section.alpha;
				reta[alphacode] = section;
				reta[alphacode].content = $.trim(sec[1]);					
			}
		}

		return reta;
	},
		
	getSectionFromTitle : function(str) {
		return {
			'title' : str,
			'short' : this.insideTemplate(str).replace(/język /, ''),
			'content' : '',
			'alpha' : this.getAlphabetical(str),
			'code'  : this.getCode(str),
			'initcontent' : ''
		};
	},
	
	getTitleFromCode : function(code) {
		var pagename = mw.config.get('wgPageName').replace('_', ' ');
		if (code == 'zh-char' || code == 'zh') {
			pagename = '{{zh|' + pagename + '}}';
		}
		else if (code == 'ja' || code == 'ko') {
			pagename = '{{' + code + '|' + pagename + '}}';
		}
		var lang = EConstants.CODE_TO_LANG[code] ? EConstants.CODE_TO_LANG[code] : code;
		return pagename + ' ({{' + lang + '}})';		
	},
	
	getSectionFromCodeAndLang : function(code, lang) {
		return {
			'title' : EParser.getTitleFromCode(code),
			'short' : lang.replace(/język /, ''),
			'content' : '',
			'alpha' : this.alphabetize(lang),
			'code'	: code,
			'initcontent' : ''
		};
	},
	
	alphabetize : function(langname) {
		if (langname == EStr.INTERNATIONAL_USAGE) {
			return '0001';
		}
		else if (langname == EStr.POLISH) {
			return '0002';
		}
		else if (langname == EStr.POLISH_FOREIGN) {
			return '0003';
		}
		else if (langname == EStr.CHINESE_SIGN) {
			return '0005';
		}
		else if (langname == EStr.LATIN_FOREIGN) {
			return 'lzzacinzzski2';
		}
		return langname.replace(/język /, '')
			.replace(/[ąáåã]/g, 'azz').replace(/ć/g, 'czz')
			.replace(/[ęè]/g, 'ezz').replace(/ł/g, 'lzz')
			.replace(/ń/g, 'nzz').replace(/[óõ]/g, 'ozz')
			.replace(/ś/g, 'szz').replace(/ü/g, 'uzz')
			.replace(/ź/g, 'zzy').replace(/ż/g, 'zzz')
			.replace(/[ \|!\(\)]/g, '_');
	},
		
	getSectionFromInput : function(str) {
		var langname = EConstants.CODE_TO_LANG[str];
		if (langname !== undefined) {
			return this.getSectionFromCodeAndLang(str, langname);
		}
		
		var code = EConstants.LANG_CODES_SHORT[str];
		if (code !== undefined) {
			return this.getSectionFromCodeAndLang(code, str);
		}
		code = EConstants.LANG_CODES_LONG[str];
		if (code !== undefined) {
			return this.getSectionFromCodeAndLang(code, 'język ' + str);
		}
		return this.getSectionFromTitle(str);
	},

	insideTemplate  : function(str) {
		return str.replace(/.*\{\{(.*?)(\}\}|\|).*/g, '$1');
	},
		
	getAlphabetical : function(str) {
		var template = this.insideTemplate(str);
		return this.alphabetize(template);
	},
		
	getCode : function(str) {
		var template = this.insideTemplate(str);
		var code;
		if (template.indexOf('język ') != -1) {
			template = template.replace(/język /, '');
			code = EConstants.LANG_CODES_LONG[template];
		}
		else {
			code = EConstants.LANG_CODES_SHORT[template];
		}
		return code ? code : template;			
	}
};

window.ESectionParser = {
		
	parse: function(section, alphaname) {
		var subsections = [];
		var mode = '';
		var code = section.code;
		
		if (!section.title) {
			mode = 'INTRO';
		} else if (code == 'pl') {
			mode = 'POLISH';
		} else if (code == 'zh-char') {
			mode = 'CHINESE';
		} else if (code == 'egy') {
			mode = 'EGYPTIAN';
		} else if (code == 'ko') {
			mode = 'KOREAN';
		} else if (code == 'ja') {
			mode = 'JAPANESE';
		} else if (code == 'inter') {
			mode = 'INTERNATIONAL';
		} else if ($.inArray(code, EConstants.NON_LATIN_LANGS) != -1) {
			mode = 'NON_LATIN';
		} else if ($.inArray(code, EConstants.DOUBLE_LANGS) != -1) {
			mode = 'DOUBLE';
		} else {
			mode = 'LATIN';
		}
		subsections.push({ title: '', content: '', shortened: false, active: true });		
		for (i in EConstants.SUBSECTIONS.ALL) {
			subsections.push({
				title: EConstants.SUBSECTIONS.ALL[i], 
				content: '',
				shortened: true,
				initcontent: '',
				initmultiline: false,
				active: true
			});
		}
		
		var targetSubsections;
		switch (mode) {
		case 'INTRO':
			targetSubsections = []; break;
		case 'POLISH':
			targetSubsections = EConstants.SUBSECTIONS.POLISH; break;
		case 'CHINESE':
			targetSubsections = EConstants.SUBSECTIONS.CHINESE; break;
		case 'KOREAN':
			targetSubsections = EConstants.SUBSECTIONS.KOREAN; break;
		case 'JAPANESE':
			targetSubsections = EConstants.SUBSECTIONS.JAPANESE; break;
		case 'INTERNATIONAL':
			targetSubsections = EConstants.SUBSECTIONS.INTERNATIONAL; break;
		case 'EGYPTIAN':
			targetSubsections = EConstants.SUBSECTIONS.EGYPTIAN; break;
		case 'NON_LATIN':
			targetSubsections = EConstants.SUBSECTIONS.NON_LATIN; break;
		case 'DOUBLE':
			targetSubsections = EConstants.SUBSECTIONS.DOUBLE; break;
		case 'LATIN':
			targetSubsections = EConstants.SUBSECTIONS.LATIN; break;
		}
		
		section.subsections = subsections;
		section.mode = mode; 
		ESectionParser.parsePreparedSubsections(section, targetSubsections);
	},
	
	alternateTitle : function(title) {
		switch (title) {
		case 'transliteracja' : return '|trans';
		case 'transkrypcja' : return '|transkr';
		case 'kreski' : return '|hanja-kreski';
		case 'przykłady' : return '|użycie';
		default: return '';
		}
	},
		
	parsePreparedSubsections : function(section, targetSubsections) {
		var str = section.content;
		var subsections = section.subsections;
		var positions = [];
		for (i in subsections) {
			var title = subsections[i].title;
			var alt = ESectionParser.alternateTitle(title);
			var regex = new RegExp('\\{\\{(' + title + alt + ')\\s*[\\|\\}]', 'g');
			positions.push({
				index: title == '' ? 0 : str.search(regex),
				title: title
			});
		}
		positions.sort(function(a, b) {
			if (!a.index && !b.index) {
				return a.title ? 1 : -1;
			}
			return a.index - b.index;
		});
		
		for (i in subsections) {
			var sub = subsections[i];
			for (j in positions) {
				j = parseInt(j);
				var pos = positions[j];
				if (pos.title == sub.title) {
					if (pos.index != -1) {
						if (j < positions.length - 1) {
							sub.content = $.trim(str.substring(pos.index, positions[j + 1].index));
						}
						else {
							sub.content = $.trim(str.substring(pos.index));
						}
						var alt = ESectionParser.alternateTitle(sub.title);
						var repl = new RegExp('\\{\\{(' + sub.title + alt + ')\\}\\}');
						var changed = sub.content.replace(repl, '');
						
						if (changed != sub.content) {
							var firstbreak = changed.search(/\n/);
							if (firstbreak != -1 && firstbreak < changed.search(/\S/)) {
								sub.initmultiline = true;
							}
							sub.content = $.trim(changed);
						}
						else if (sub.content != '' || sub.title == '') {
							sub.shortened = false;
						}
						sub.initcontent = sub.content;
						break;
					}
					else if ($.inArray(pos.title, targetSubsections) == -1) {
						sub.active = false;
					}
				}
			}
		}
	},
	
	obligatorySubsection : function(subsection, section) {
		return (subsection.title == 'znaczenia') && (section.mode != 'CHINESE');
	},
	
	botSubsection : function(subsection, section) {
		return (subsection.title == 'wymowa') && (section.mode == 'POLISH') && !subsection.content;
	}
};


window.EPrinter = {
	recalculateCode : function(form) {
		var code = '';
		var sortableSections = [];
		for (alpha in Ed.content.sections) {
			var sec = Ed.content.sections[alpha];
			EForm.removeDefaultTexts(alpha, sec['code']);
			sortableSections.push(sec);
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


/**
 * 
 */

window.EConstants = {
	INTRO : '«',
	SUBSECTIONS :
		{
		POLISH :
			[
			 'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje', 'synonimy', 'antonimy', 'pokrewne',
			 'frazeologia', 'etymologia', 'uwagi', 'tłumaczenia', 'źródła'
			],
		LATIN :
			[
		 	 'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje', 'synonimy', 'antonimy', 'pokrewne',
		 	 'frazeologia', 'etymologia', 'uwagi', 'źródła'
		 	],
		NON_LATIN :
			[
			 'transliteracja', 'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje', 'synonimy', 'antonimy',
			 'pokrewne', 'frazeologia', 'etymologia', 'uwagi', 'źródła'
			],
		DOUBLE :
			[
			 'ortografie', 'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje', 'synonimy', 'antonimy',
			 'pokrewne', 'frazeologia', 'etymologia', 'uwagi', 'źródła'
			],
		CHINESE :
			[// zh-char
			 'klucz', 'kreski', 'warianty', 'kolejność', 'znaczenia', 'etymologia', 'kody', 'słowniki', 'uwagi', 'źródła'
			],
		KOREAN:
			[// ko
			 'kreski', 'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'złożenia', 'składnia', 'kolokacje', 'synonimy', 'antonimy',
			 'pokrewne', 'frazeologia', 'etymologia', 'hanja', 'uwagi', 'źródła'
			],
		JAPANESE:
			[// ja
			 'transliteracja', 'czytania', 'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje', 'synonimy',
			 'antonimy', 'złożenia', 'pokrewne', 'frazeologia', 'etymologia', 'uwagi', 'źródła'
			],
		INTERNATIONAL :
			[// inter
			 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje', 'synonimy', 'antonimy', 'pokrewne', 'frazeologia',
			 'etymologia', 'uwagi', 'źródła'
			],
		EGYPTIAN :
			[// egy
		 	 'zapis hieroglificzny', 'transliteracja', 'transkrypcja', 'znaczenia', 'determinatywy', 'odmiana', 'przykłady',
		 	 'składnia', 'kolokacje', 'synonimy', 'antonimy', 'pokrewne', 'frazeologia', 'etymologia', 'uwagi', 'źródła'
		 	],
		ALL :
			[
			 'zapis hieroglificzny', 'ortografie', 'transliteracja', 'transkrypcja', 'czytania', 'klucz', 'kreski', 'warianty',
			 'kolejność', 'wymowa', 'znaczenia', 'determinatywy', 'odmiana', 'przykłady', 'składnia', 'kolokacje', 'synonimy',
			 'antonimy', 'złożenia', 'pokrewne', 'pochodne', 'frazeologia', 'etymologia', 'kody', 'hanja', 'słowniki', 'uwagi',
			 'tłumaczenia', 'źródła'
			]
		},
	SUBSECTION_TITLE :
		{
		'transliteracja' : 'Transliteracja',
		'wymowa' : 'Wymowa',
		'znaczenia' : 'Znaczenia',
		'odmiana' : 'Odmiana',
		'przykłady' : 'Przykłady użycia',
		'składnia' : 'Składnia',
		'kolokacje' : 'Kolokacje',
		'synonimy' : 'Synonimy',
		'antonimy' : 'Antonimy',
		'pokrewne' : 'Wyrazy pokrewne',
		'frazeologia' : 'Związki frazeologiczne',
		'etymologia' : 'Etymologia',
		'ortografie' : 'Zapisy w ortografiach alternatywnych',
		'tłumaczenia' : 'Tłumaczenia',
		'uwagi' : 'Uwagi',
		'źródła' : 'Źródła',
		'klucz' : 'Klucz',
		'kreski' : 'Liczba kresek',
		'warianty' : 'Warianty',
		'kolejność' : 'Kolejność kresek',
		'kody' : 'Kodowanie',
		'słowniki' : 'Słowniki',
		'zapis hieroglificzny' : 'Zapis hieroglificzny',
		'transkrypcja' : 'Transkrypcja',
		'determinatywy' : 'Determinatywy',
		'czytania' : 'Czytania',
		'złożenia' : 'Złożenia',
		'hanja' : 'Hanja',
		'pochodne' : 'Wyrazy pochodne',
		'' : 'Sekcja wstępna'
		},
	NON_LATIN_LANGS :
		['ru', 'uk', 'kk', 'be', 'hy', 'ka', 'he', 'yi', 'ar', 'fa', 'th', 'ur',
		 'hi', 'bg', 'mk', 'el', 'gr', 'bo', 'cau', 'ab', 'ady', 'akk', 'am', 'arc',
		 'as', 'bn', 'av', 'ba', 'bal', 'my', 'gez', 'gu', 'got', 'myv', 'ky', 'dz', 'cv', 
		 'ce', 'kjh', 'bs', 'ta', 'inh', 'iu', 'kn', 'ks', 'mr', 'km', 'kv', 'kok', 'cr',
		 'ku', 'lo', 'lez', 'ml', 'dv', 'mn', 'ne', 'new', 'os', 'ps', 'pa', 'rom', 'sa',
		 'sd', 'ckb', 'cu', 'sux', 'si', 'tab', 'tg', 'tzm', 'te', 'zrp'],
	DOUBLE_LANGS :
		['sr', 'tut', 'jdt', 'lad', 'tt', 'tk', 'ug', 'slovio', 'az', 'crh', 'be'],
	LANG_CODES_SHORT :
		{
		'dżuhuri' : 'jdt', 'esperanto' : 'eo', 'ewe' : 'ee', 'hindi' : 'hi', 
		'ido' : 'io', 'interlingua' : 'ia', 'inuktitut' : 'iu', 'ladino' : 'lad', 
		'lingala' : 'ln', 'lojban' : 'jbo', 'novial' : 'nov', 'papiamento' : 'pap',
		'pitjantjatjara' : 'pjt', 'sanskryt' : 'sa', 'slovio' : 'slovio', 'sranan tongo' : 'srn', 
		'tetum' : 'tet', 'tok pisin' : 'tpi', 'tupinambá' : 'tpn', 'użycie międzynarodowe' : 'inter',
		'volapük' : 'vo', 'znak chiński' : 'zh-char', 'jidysz' : 'yi', 'jèrriais' : 'roa',
		'termin obcy w języku polskim' : 'termin obcy w języku polskim',
		'termin obcy w języku łacińskim' : 'termin obcy w języku łacińskim'
		},
	LANG_CODES_LONG :
		{
		'kaszmirski' : 'ks', 'marathi' : 'mr', 'newarski' : 'new', 'sorani' : 'ckb',
		'zazaki' : 'zza', '!Xóõ' : 'khi', 'abazyński' : 'cau', 'abchaski' : 'ab',
		'abenaki' : 'abe', 'adygejski' : 'ady', 'afrykanerski' : 'af', 'ajmara' : 'ay',
		'akadyjski' : 'akk', 'aklanon' : 'akl', 'alabama' : 'akz', 'albański' : 'sq',
		'alemański' : 'als', 'aleucki' : 'ale', 'amharski' : 'am', 'angielski' : 'en',
		'arabski' : 'ar', 'aragoński' : 'an', 'aramejski' : 'arc', 'arapaho' : 'arp',
		'arumuński' : 'roa', 'assamski' : 'as', 'asturyjski' : 'ast', 'awarski' : 'av',
		'azerski' : 'az', 'bambara' : 'bm', 'banjumasański' : 'map', 'baskijski' : 'eu',
		'baszkirski' : 'ba', 'bawarski' : 'gem', 'beludżi' : 'bal', 'bengalski' : 'bn',
		'białoruski' : 'be', 'białoruski (taraszkiewica)' : 'be', 'birmański' : 'my', 'boloński' : 'egl',
		'bośniacki' : 'bs', 'bułgarski' : 'bg', 'bretoński' : 'br', 'cebuano' : 'ceb',
		'chakaski' : 'kjh', 'chickasaw' : 'nai', 'chiński standardowy' : 'zh', 'chorwacki' : 'hr',
		'czagatajski' : 'chg', 'czarnogórski' : 'ch', 'czeczeński' : 'ce', 'czeski' : 'cs',
		'czirokeski' : 'chr', 'czuwaski' : 'cv', 'dalmatyński' : 'dlm', 'dolnoniemiecki' : 'nds',
		'dolnołużycki' : 'dsb', 'duński' : 'da', 'dzongkha' : 'dz', 'erzja' : 'myv',
		'estoński' : 'et', 'etruski' : 'ett', 'farerski' : 'fo', 'fidżyjski' : 'fj',
		'filipino' : 'fil', 'fiński' : 'fi', 'francuski' : 'fr', 'friulski' : 'fur',
		'fryzyjski' : 'fy', 'ful' : 'ff', 'ga' : 'gaa', 'gagauski' : 'tut',
		'galicyjski' : 'gl', 'gaskoński' : 'oc', 'gocki' : 'got', 'grenlandzki' : 'kl',
		'gruziński' : 'ka', 'guarani' : 'gn', 'gudźarati' : 'gu', 'gyyz' : 'gez',
		'górnołużycki' : 'hsb', 'haitański' : 'ht', 'hausa' : 'ha', 'hawajski' : 'haw',
		'hebrajski' : 'he', 'hiszpański' : 'es', 'holenderski' : 'nl', 'hupa' : 'hup',
		'ilokano' : 'ilo', 'indonezyjski' : 'id', 'inguski' : 'inh', 'irlandzki' : 'ga',
		'islandzki' : 'is', 'istriocki' : 'ist', 'japoński' : 'ja', 'joruba' : 'yor',
		'kabylski' : 'kab', 'kakczikel' : 'myn', 'kannada' : 'kn', 'karakałpacki' : 'kaa',
		'kaszubski' : 'csb', 'kataloński' : 'ca', 'kazachski' : 'kk', 'keczua' : 'qu',
		'khmerski' : 'km', 'kirgiski' : 'ky', 'klingoński' : 'tlh', 'komi' : 'kv',
		'komi-jaźwiński' : 'kom', 'komi-permiacki' : 'koi', 'komi-zyriański' : 'kpv', 'konkani' : 'kok',
		'koreański' : 'ko', 'kornijski' : 'kw', 'korsykański' : 'co', 'kri' : 'cr',
		'krymskotatarski' : 'crh', 'kurdyjski' : 'ku', 'ladyński' : 'lld', 'langwedocki' : 'oci',
		'laotański' : 'lo', 'lezgiński' : 'lez', 'liguryjski' : 'lij', 'limburski' : 'lim',
		'litewski' : 'lt', 'lombardzki' : 'lmo', 'luksemburski' : 'lb', 'luo' : 'luo',
		'macedoński' : 'mk', 'malajalam' : 'ml', 'malajski' : 'ms', 'malediwski' : 'dv',
		'malgaski' : 'mg', 'maltański' : 'mt', 'maoryski' : 'mi', 'mikmak' : 'mic',
		'minnan' : 'zh', 'mongolski' : 'mn', 'mołdawski' : 'mo', 'nahuatl' : 'nah',
		'nauruański' : 'na', 'nawaho' : 'nv', 'neapolitański' : 'nap', 'nepalski' : 'ne',
		'niemiecki' : 'de', 'norweski (bokmål)' : 'nb', 'norweski (nynorsk)' : 'nn', 'nowogrecki' : 'el',
		'ormiański' : 'hy', 'oromo' : 'om', 'osetyjski' : 'os', 'pali' : 'pi',
		'paszto' : 'ps', 'pendżabski' : 'pa', 'perski' : 'fa', 'piemoncki' : 'pms',
		'pikardyjski' : 'pcd', 'pirahã' : 'myp', 'polski' : 'pl', 'portugalski' : 'pt',
		'połabski' : 'pox', 'pragermański' : 'gem', 'prowansalski' : 'oci', 'pruski' : 'prg',
		'północnolapoński' : 'sme', 'rarotonga' : 'rar', 'romansz' : 'roh', 'romski' : 'rom',
		'rosyjski' : 'ru', 'rumuński' : 'ro', 'rundi' : 'rn', 'russenorsk' : 'crp',
		'sardyński' : 'sc', 'serbski' : 'sr', 'sindhi' : 'sd', 'sko' : 'sko',
		'skolt' : 'sms', 'somalijski' : 'so', 'staro-cerkiewno-słowiański' : 'cu', 'staro-wysoko-niemiecki' : 'goh',
		'staroangielski' : 'ang', 'staroegipski' : 'egy', 'starofrancuski' : 'fro', 'starogrecki' : 'gr',
		'staroirlandzki' : 'sga', 'staronordyjski' : 'non', 'suahili' : 'sw', 'sumeryjski' : 'sux',
		'sundajski' : 'su', 'susu' : 'sus', 'sycylijski' : 'scn', 'syngaleski' : 'si',
		'szkocki' : 'sco', 'szkocki gaelicki' : 'gla', 'szwabski' : 'gsw', 'szwedzki' : 'sv',
		'słowacki' : 'sk', 'słoweński' : 'sl', 'słowiński' : 'slov', 'tabasarański' : 'tab',
		'tadżycki' : 'tg', 'tagalski' : 'tl', 'tahitański' : 'ty', 'tajski' : 'th',
		'tamazight' : 'tzm', 'tamilski' : 'ta', 'tatarski' : 'tt', 'telugu' : 'te',
		'tigrinia' : 'ti', 'tonga' : 'to', 'turecki' : 'tr', 'turkmeński' : 'tk',
		'tuvalu' : 'tvl', 'twi' : 'tw', 'tybetański' : 'bo', 'ujgurski' : 'ug',
		'ukraiński' : 'uk', 'urdu' : 'ur', 'uwea' : 'wls', 'uzbecki' : 'uz',
		'võro' : 'fiu', 'walijski' : 'cy', 'waloński' : 'wa', 'wczesny nowoangielski' : 'emen',
		'wenecki' : 'vec', 'wepski' : 'fiu', 'wietnamski' : 'vi', 'wilamowski' : 'wym',
		'wolof' : 'wo', 'wysokoislandzki' : 'art', 'węgierski' : 'hu', 'włoski' : 'it',
		'yupik środkowy' : 'ypk', 'zarfatit' : 'zrp', 'zulu' : 'zu', 'łaciński' : 'la',
		'łotewski' : 'lv', 'średnio-dolno-niemiecki' : 'średnio-dolno-niemiecki', 'średnio-wysoko-niemiecki' : 'gmh',
		'średnioangielski' : 'enm', 'żmudzki' : 'bat'
		},
	CODE_TO_LANG :
		{
		'ks' : 'język kaszmirski', 'mr' : 'język marathi', 'new' : 'język newarski', 'ckb' : 'język sorani',
		'zza' : 'język zazaki', 'khi' : 'język !Xóõ', 'cau' : 'język abazyński', 'ab' : 'język abchaski',
		'abe' : 'język abenaki', 'ady' : 'język adygejski', 'af' : 'język afrykanerski', 'ay' : 'język ajmara',
		'akk' : 'język akadyjski', 'akl' : 'język aklanon', 'akz' : 'język alabama', 'sq' : 'język albański',
		'als' : 'język alemański', 'ale' : 'język aleucki', 'am' : 'język amharski', 'en' : 'język angielski',
		'ar' : 'język arabski', 'an' : 'język aragoński', 'arc' : 'język aramejski', 'arp' : 'język arapaho',
		'roa' : 'język arumuński', 'as' : 'język assamski', 'ast' : 'język asturyjski', 'av' : 'język awarski',
		'az' : 'język azerski', 'bm' : 'język bambara', 'map' : 'język banjumasański', 'eu' : 'język baskijski',
		'ba' : 'język baszkirski', 'gem' : 'język bawarski', 'bal' : 'język beludżi', 'bn' : 'język bengalski',
		'be' : 'język białoruski', 'my' : 'język birmański', 'egl' : 'język boloński',
		'bs' : 'język bośniacki', 'bg' : 'język bułgarski', 'br' : 'język bretoński', 'ceb' : 'język cebuano',
		'kjh' : 'język chakaski', 'nai' : 'język chickasaw', 'zh' : 'język chiński standardowy', 'hr' : 'język chorwacki',
		'chg' : 'język czagatajski', 'ch' : 'język czarnogórski', 'ce' : 'język czeczeński', 'cs' : 'język czeski',
		'chr' : 'język czirokeski', 'cv' : 'język czuwaski', 'dlm' : 'język dalmatyński', 'nds' : 'język dolnoniemiecki',
		'dsb' : 'język dolnołużycki', 'da' : 'język duński', 'dz' : 'język dzongkha', 'myv' : 'język erzja',
		'et' : 'język estoński', 'ett' : 'język etruski', 'fo' : 'język farerski', 'fj' : 'język fidżyjski',
		'fil' : 'język filipino', 'fi' : 'język fiński', 'fr' : 'język francuski', 'fur' : 'język friulski',
		'fy' : 'język fryzyjski', 'ff' : 'język ful', 'gaa' : 'język ga', 'tut' : 'język gagauski',
		'gl' : 'język galicyjski', 'oc' : 'język gaskoński', 'got' : 'język gocki', 'kl' : 'język grenlandzki',
		'ka' : 'język gruziński', 'gn' : 'język guarani', 'gu' : 'język gudźarati', 'gez' : 'język gyyz',
		'hsb' : 'język górnołużycki', 'ht' : 'język haitański', 'ha' : 'język hausa', 'haw' : 'język hawajski',
		'he' : 'język hebrajski', 'es' : 'język hiszpański', 'nl' : 'język holenderski', 'hup' : 'język hupa',
		'ilo' : 'język ilokano', 'id' : 'język indonezyjski', 'inh' : 'język inguski', 'ga' : 'język irlandzki',
		'is' : 'język islandzki', 'ist' : 'język istriocki', 'ja' : 'język japoński', 'yor' : 'język joruba',
		'kab' : 'język kabylski', 'myn' : 'język kakczikel', 'kn' : 'język kannada', 'kaa' : 'język karakałpacki',
		'csb' : 'język kaszubski', 'ca' : 'język kataloński', 'kk' : 'język kazachski', 'qu' : 'język keczua',
		'km' : 'język khmerski', 'ky' : 'język kirgiski', 'tlh' : 'język klingoński', 'kv' : 'język komi',
		'kom' : 'język komi-jaźwiński', 'koi' : 'język komi-permiacki', 'kpv' : 'język komi-zyriański', 'kok' : 'język konkani',
		'ko' : 'język koreański', 'kw' : 'język kornijski', 'co' : 'język korsykański', 'cr' : 'język kri',
		'crh' : 'język krymskotatarski', 'ku' : 'język kurdyjski', 'lld' : 'język ladyński', 'oci' : 'język langwedocki',
		'lo' : 'język laotański', 'lez' : 'język lezgiński', 'lij' : 'język liguryjski', 'lim' : 'język limburski',
		'lt' : 'język litewski', 'lmo' : 'język lombardzki', 'lb' : 'język luksemburski', 'luo' : 'język luo',
		'mk' : 'język macedoński', 'ml' : 'język malajalam', 'ms' : 'język malajski', 'dv' : 'język malediwski',
		'mg' : 'język malgaski', 'mt' : 'język maltański', 'mi' : 'język maoryski', 'mic' : 'język mikmak',
		'mn' : 'język mongolski', 'mo' : 'język mołdawski', 'nah' : 'język nahuatl',
		'na' : 'język nauruański', 'nv' : 'język nawaho', 'nap' : 'język neapolitański', 'ne' : 'język nepalski',
		'de' : 'język niemiecki', 'nb' : 'język norweski (bokmål)', 'nn' : 'język norweski (nynorsk)', 'el' : 'język nowogrecki',
		'hy' : 'język ormiański', 'om' : 'język oromo', 'os' : 'język osetyjski', 'pi' : 'język pali',
		'ps' : 'język paszto', 'pa' : 'język pendżabski', 'fa' : 'język perski', 'pms' : 'język piemoncki',
		'pcd' : 'język pikardyjski', 'myp' : 'język pirahã', 'pl' : 'język polski', 'pt' : 'język portugalski',
		'pox' : 'język połabski', 'gem' : 'język pragermański', 'oci' : 'język prowansalski', 'prg' : 'język pruski',
		'sme' : 'język północnolapoński', 'rar' : 'język rarotonga', 'roh' : 'język romansz', 'rom' : 'język romski',
		'ru' : 'język rosyjski', 'ro' : 'język rumuński', 'rn' : 'język rundi', 'crp' : 'język russenorsk',
		'sc' : 'język sardyński', 'sr' : 'język serbski', 'sd' : 'język sindhi', 'sko' : 'język sko',
		'sms' : 'język skolt', 'so' : 'język somalijski', 'cu' : 'język staro-cerkiewno-słowiański', 'goh' : 'język staro-wysoko-niemiecki',
		'ang' : 'język staroangielski', 'egy' : 'język staroegipski', 'fro' : 'język starofrancuski', 'gr' : 'język starogrecki',
		'sga' : 'język staroirlandzki', 'non' : 'język staronordyjski', 'sw' : 'język suahili', 'sux' : 'język sumeryjski',
		'su' : 'język sundajski', 'sus' : 'język susu', 'scn' : 'język sycylijski', 'si' : 'język syngaleski',
		'sco' : 'język szkocki', 'gla' : 'język szkocki gaelicki', 'gsw' : 'język szwabski', 'sv' : 'język szwedzki',
		'sk' : 'język słowacki', 'sl' : 'język słoweński', 'slov' : 'język słowiński', 'tab' : 'język tabasarański',
		'tg' : 'język tadżycki', 'tl' : 'język tagalski', 'ty' : 'język tahitański', 'th' : 'język tajski',
		'tzm' : 'język tamazight', 'ta' : 'język tamilski', 'tt' : 'język tatarski', 'te' : 'język telugu',
		'ti' : 'język tigrinia', 'to' : 'język tonga', 'tr' : 'język turecki', 'tk' : 'język turkmeński',
		'tvl' : 'język tuvalu', 'tw' : 'język twi', 'bo' : 'język tybetański', 'ug' : 'język ujgurski',
		'uk' : 'język ukraiński', 'ur' : 'język urdu', 'wls' : 'język uwea', 'uz' : 'język uzbecki',
		'fiu' : 'język võro', 'cy' : 'język walijski', 'wa' : 'język waloński', 'emen' : 'język wczesny nowoangielski',
		'vec' : 'język wenecki', 'fiu' : 'język wepski', 'vi' : 'język wietnamski', 'wym' : 'język wilamowski',
		'wo' : 'język wolof', 'art' : 'język wysokoislandzki', 'hu' : 'język węgierski', 'it' : 'język włoski',
		'ypk' : 'język yupik środkowy', 'zrp' : 'język zarfatit', 'zu' : 'język zulu', 'la' : 'język łaciński',
		'lv' : 'język łotewski', 'średnio-dolno-niemiecki' : 'język średnio-dolno-niemiecki', 'gmh' : 'język średnio-wysoko-niemiecki',
		'enm' : 'język średnioangielski', 'bat' : 'język żmudzki', 'jdt' : 'dżuhuri', 'eo' : 'esperanto', 'ee' : 'ewe',
		'hi' : 'hindi', 'io' : 'ido', 'ia' : 'interlingua', 'iu' : 'inuktitut',
		'lad' : 'ladino', 'ln' : 'lingala', 'jbo' : 'lojban', 'nov' : 'novial',
		'pap' : 'papiamento', 'pjt' : 'pitjantjatjara', 'sa' : 'sanskryt', 'slovio' : 'slovio',
		'srn' : 'sranan tongo', 'tet' : 'tetum', 'tpi' : 'tok pisin', 'tpn' : 'tupinambá',
		'inter' : 'użycie międzynarodowe', 'vo' : 'volapük', 'zh-char' : 'znak chiński', 'yi' : 'jidysz',
		'roa' : 'jèrriais', 'termin obcy w języku polskim' : 'termin obcy w języku polskim',
		'termin obcy w języku łacińskim' : 'termin obcy w języku łacińskim'
		},
	ONELINE_SECTIONS :
		20,
	SUBSECTIONS_WITHOUT_NL :
		[ 'wymowa', 'transliteracja', 'transkrypcja', 'ortografie', 'klucz', 'kreski', 'czytania' ],
	SUBSECTIONS_WITH_NL :
		[ 'znaczenia', 'przykłady', 'tłumaczenia' ],
	SAMPLE_SUBSECTION_CONTENTS_POLISH :
		{
		'znaczenia' : "''rzeczownik, rodzaj żeński, męski''\n: (1.1) [[krótki|krótka]] [[definicja]]",
		'przykłady' : ": (1.1) ''[[przykład|Przykład]] [[zdanie|zdania]].''",
		'tłumaczenia' : "* angielski: (1.1) [[ ]]"
		},
	SAMPLE_SUBSECTION_CONTENTS_FOREIGN :
		{
		'znaczenia' : "''rzeczownik, rodzaj żeński, męski''\n: (1.1) [[krótki|krótka]] [[definicja]]",
		'przykłady' : ": (1.1) ''[[przykład|Przykład]] [[zdanie|zdania]].'' → [[tłumaczenie|Tłumaczenie]] [[zdanie|zdania]]."
		}
};

window.EStr = {
	TOGGLE_EDITOR :
		'Przełącz edytor',
	ADD : 
		'+ dodaj',
	ADD_SECTION_MESSAGE :
		'Dodajesz nową sekcję językową.<br/>\
		Podaj nazwę języka (np. <tt>polski</tt>, <tt>tatarski</tt>) lub jego kod ISO (<tt>pl</tt>, <tt>tt</tt>).<br/>\
		<small>Zobacz też: \
		<a href="http://pl.wiktionary.org/wiki/Wikis%C5%82ownik:Zasady_tworzenia_hase%C5%82#Nag.C5.82.C3.B3wek" \
		target="_blank">Zasady tworzenia haseł: Nagłówek</a>.<br/>\
		Możesz też dodać niestandardowy nagłówek (np. akcenty, linki do poszczególnych wyrazów). W tym celu \
		wpisz cały kod nagłówka jak poniżej (bez znaków ==).</small>',
	ADD_SECTION_MESSAGE_DEFAULT :
		'Dodajesz nową sekcję językową.<br/>\
		Podaj nazwę języka (np. <tt>polski</tt>, <tt>tatarski</tt>) lub jego kod ISO (<tt>pl</tt>, <tt>tt</tt>).<br/>\
		<small>Zobacz też: \
		<a href="http://pl.wiktionary.org/wiki/Wikis%C5%82ownik:Zasady_tworzenia_hase%C5%82#Nag.C5.82.C3.B3wek" \
		target="_blank">Zasady tworzenia haseł: Nagłówek</a>.<br/>\
		Możesz też dodać niestandardowy nagłówek (np. akcenty, linki do poszczególnych wyrazów). W tym celu \
		wpisz cały kod nagłówka (bez znaków ==).</small>',
	ADD_SECTION_TEMPLATE : 
		' ({{język …}})',
	ADD_SECTION_TITLE : 
		'Podaj tytuł sekcji',
	INTERNATIONAL_USAGE : 
		'użycie międzynarodowe',
	POLISH : 
		'język polski',
	POLISH_FOREIGN : 
		'termin obcy w języku polskim',
	LATIN_FOREIGN : 
		'termin obcy w języku łacińskim',
	CHINESE_SIGN :
		'znak chiński',
	ADD_SECTION_NONEXISTENT:
		'Brak języka. Sprawdź <a href="http://pl.wiktionary.org/wiki/Kategoria:Szablony_indeksuj%C4%85ce_j%C4%99zyk%C3%B3w"\
		target="_new">listę dostępnych języków</a>.',
	ADD_SECTION_NONEXISTENT_TITLE:
		'Nieprawidłowa wartość języka',
	ADD_SECTION_ALREADY:
		'W haśle istnieje już sekcja odpowiadająca wpisanemu przez Ciebie językowi. Sekcja ta została otwarta.',
	ADD_SECTION_ALREADY_TITLE:
		'Język już istnieje',
	INTRO_SECTION:
		'Sekcja wstępna:<br/>Interwiki, szablony ogólne',
	ADD_SECTION:
		'Dodaj nową sekcję językową',
	INTRO:
		'Sekcja wstępna',
	OBLIGATORY_SUBSECTION:
		'<br />(sekcja obowiązkowa)',
	BOT_SUBSECTION:
		'<br />(dodaje automatycznie <a href="http://pl.wiktionary.org/wiki/Wikipedysta:Olafbot" target="_blank">bot</a>)',
	EDIT_SECTION_TITLE:
		'Edytuj nagłówek tej sekcji językowej',
	EDIT_SECTION_TITLE_MESSAGE:
		'Podaj nową zawartość nagłówka bieżącej sekcji językowej (bez znaków <tt>==</tt>)',
	DELETE_SECTION:
		'Usuń tę sekcję językową',
	DELETE_SECTION_MESSAGE:
		'Czy na pewno usunąć bieżącą sekcję językową?',
	OK:
		'OK',
	CANCEL:
		'Anuluj',
	WARNING:
		'Ostrzeżenie',
	CONFIRMATION:
		'Potwierdzenie',
	QUESTION:
		'Pytanie',
	KEYBOARD_ALWAYS:
		'<div class="keyboard_always"> \
		<a href="#" onclick="insertTags(\'•\', \'\', \'\'); return false">•</a> \
		<a href="#" onclick="insertTags(\'→\', \'\', \'\'); return false">→</a> \
		<a href="#" onclick="insertTags(\'~\', \'\', \'\'); return false">~</a> \
		<a href="#" onclick="insertTags(\'–\', \'\', \'\'); return false">–</a> \
		<a href="#" onclick="insertTags(\'„\', \'”\', \'\'); return false">„”</a> \
		</div>'
};



window.EUi = {
	
	oldform : undefined,
	instruction : undefined,
	form : $('<div id="ed"/>'),
	menu : $('<ul id="ed_menu"/>'),
	content : $('<div id="ed_content"/>'),
	usingNew : true,

	prepareForm : function(oldform, instruction) {
		this.oldform = oldform;
		this.instruction = instruction;
		EUi.form.append(EUi.menu).append(EUi.content);
		oldform.before(EUi.form);
		EUi.usingNew = $.cookie('usenew') == null || $.cookie('usenew') == 1;
		
		if (EUi.usingNew) {
			oldform.hide();
			instruction.hide();
			EUi.form.show();
		}

		var toggleEditor = $('<a href="#" id="toggleEditor">' + EStr.TOGGLE_EDITOR + '</a>');
		toggleEditor.insertAfter('h1:first').click(function() {
			oldform.toggle();
			instruction.toggle();
			EUi.form.toggle();
			ESpecialChars.toggle();
			
			EUi.usingNew = !EUi.usingNew;
			if (EUi.usingNew) {
				Ed.resetNew();
			}
			else {
				EUi.oldform.find('textarea').val(EPrinter.recalculateCode(this.form));
			}
			$.cookie('usenew', +EUi.usingNew);
			return false;
		});
		
		EUi.prepareFormSections();
		EUi.rebindFormActions();
		EKeyboard.init();
	},
	
	reset : function() {
		EUi.menu.html('');
		EUi.content.html('');
		
		EUi.prepareFormSections();
		EUi.rebindFormActions();
	},

	clickSection : function() {
		if (!EUi.usingNew) {
			return false;
		}
		var firstTab = EUi.menu.children(":not(#ed_menuitem_0000)").first();
		if (firstTab.attr('id') != 'ed_menuitem_new') {
			firstTab.click();
		}
		else if (Ed.content.sections['0000'] != undefined) {
			$('#ed_menuitem_0000').click();
		}
		else {
			$('#ed_menuitem_new').click();
		}
	},
		
	prepareFormSections : function() {
		var size = 0;
		for (var alpha in Ed.content.sections) {
			EUi.addSection(alpha);
			EUi.prepareFormSubsections(alpha);
			size++;
		}
		
		if (EUtil.getParameter('section') == '') {
			var addItem = $('<li id="ed_menuitem_new" class="tip menuitem">' + EStr.ADD + '</li>');
			addItem.appendTo(EUi.menu).click(function() {
				EUi.addNewSection();
			}).data('tip', EStr.ADD_SECTION);
		}
		
		if (size > EConstants.ONELINE_SECTIONS) {
			$('li.menuitem:nth-child(' + Math.floor(size / 2) + ')').css('clear', 'left');
		}
		
		EUi.clickSection();
		EUi.resizeTextareas();		
		$(window).resize(EUi.resizeTextareas);
	},
		
	addSection : function(alphaname) {
		var sec = Ed.content.sections[alphaname];
		var fset = $('<fieldset class="ed_section" id="ed_section_' + alphaname + '"/>');
		
		fset.appendTo(EUi.content);
		
		if (alphaname == '0000') {
			sec.code = EConstants.INTRO;
			sec.title = '';
		}
		
		var item = $('<li id="ed_menuitem_' + alphaname + '" class="tip menuitem">' + sec.code + '</li>');
		var tip = alphaname == '0000'
				? EStr.INTRO_SECTION
				: EParser.insideTemplate(sec.title) + '\<br/><small>tytuł sekcji: <tt>' + sec.title + '</tt></small>';
		item.data({
				'section' : 'ed_section_' + alphaname,
				'code' : sec['code'],
				'tip' : tip 
			})
			.click(function() {
				EKeyboard.hide();
				EUi.content.find('.ed_section').removeClass('active');
				EUi.content.find('#' + $(this).data('section')).addClass('active');
				$(this).addClass('active').siblings().removeClass('active');
				EUi.resizeTextareas();
			});
		
		// insert alphabetically
		var added = false;
		EUi.menu.children("li").each(function() {
			if ($(this).attr('id') > item.attr('id') || $(this).attr('id') == 'ed_menuitem_new') {
				item.insertBefore($(this));
				added = true;
				return false;
			}
		});
		if (!added) {
			item.appendTo(EUi.menu);
		}			
	},

	addNewSection : function() {
		var defaultLang = EUtil.getSection();
		if (!defaultLang) {
			defaultLang = $.cookie('lastAdded');
		}
		var defaultText = defaultLang
				? EParser.getTitleFromCode(defaultLang)
				: mw.config.get('wgPageName') + EStr.ADD_SECTION_TEMPLATE;
		var message = defaultLang ? EStr.ADD_SECTION_MESSAGE_DEFAULT : EStr.ADD_SECTION_MESSAGE; 
		
		jPrompt(message, defaultText, EStr.ADD_SECTION_TITLE,
			function(val) {
				if (!val) {
					return false;
				}
				var sec = EParser.getSectionFromInput(val);
				
				if (sec['code']) {
					var alpha = sec['alpha'];
					if (Ed.content['sections'][alpha] !== undefined) {
						jAlert(EStr.ADD_SECTION_ALREADY, EStr.ADD_SECTION_ALREADY_TITLE);
					}
					else {
						Ed.content.sections[alpha] = sec;
						ESectionParser.parse(sec, alpha);
						
						EUi.addSection(alpha);
						EUi.prepareFormSubsections(alpha);
						EForm.addDefaultTexts(alpha, sec['code']);
						$.cookie('lastAdded', sec['code']);
					}
					$('#ed_menuitem_' + alpha).click();
					$('#ed_section_' + alpha + ' textarea').autogrow();
				}
				else {
					jAlert(EStr.ADD_SECTION_NONEXISTENT, EStr.ADD_SECTION_NONEXISTENT_TITLE, function() {
						EUi.addNewSection();
					});							
				}
			});
	},
	
	editSectionTitle : function(alpha, section) {
		jPrompt(EStr.EDIT_SECTION_TITLE_MESSAGE, section.title, EStr.EDIT_SECTION_TITLE, function(res) {
			if (!res) {
				return;
			}
			section.title = res;
			var tip = EParser.insideTemplate(res) + '\<br/><small>tytuł sekcji: <tt>' + res + '</tt></small>';
			$('#ed_menuitem_' + alpha).data('tip', tip);
		});
	},
	
	deleteSection : function(alpha, section, force) {
		var del = function() {
			delete Ed.content.sections[alpha];
			$('#ed_menuitem_' + alpha).remove();
			$('#ed_section_' + alpha).remove();
			EUi.clickSection();
		};
		if (force) {
			del();
		}
		else {
			jConfirm(EStr.DELETE_SECTION_MESSAGE, EStr.DELETE_SECTION_TITLE, function(res) {
				if (res) { del(); }
			});
		}
	},
	
	deleteEmptySections : function() {
		for (var alpha in Ed.content.sections) {
			var sec = Ed.content.sections[alpha];
			var empty = true;
			$('#ed_section_' + alpha).find('textarea').each(function() {
				if ($(this).val()) {
					empty = false;
				}
			});
			if (empty) {
				EUi.deleteSection(alpha, sec, 1);
			}
		}
	},
		
	prepareFormSubsections : function(alpha) {
		var section = Ed.content['sections'][alpha];
		var fset = $('#ed_section_' + alpha);
				
		if (alpha != '0000') {
			var editlink = $('<a/>').text(EStr.EDIT_SECTION_TITLE).click(function() {
				EUi.editSectionTitle(alpha, section);
				return false;
			});
			var deletelink = $('<a/>').text(EStr.DELETE_SECTION).click(function() {
				EUi.deleteSection(alpha, section);
				return false;
			});
			fset.append($('<p class="top"/>').append(editlink).append(deletelink));
		}
		
		for (i = 0; i < section.subsections.length; i++) {
			if (section.subsections[i].active) {
				var obj = EUi.getSubsectionObj(alpha, section, section.subsections[i]);
				fset.append(obj);
			}
		}
	},
	
	getSubsectionObj : function(alpha, section, subsection) {
		var name = alpha + '_' + subsection.title.replace(' ', '_');
		
		var p = $('<p id="ed_subsection_' + name + '"/>');
		var caption = EConstants.SUBSECTION_TITLE[subsection.title];
		var label = $('<label class="newform" for="ed_' + name + '">' + caption + '</label>');
		var textarea = $('<textarea class="newform keyboardable" name="ed_' + name + '" id="ed_' + name + '"/>').text(subsection.content);
		if (ESectionParser.obligatorySubsection(subsection, section)) {
			label.addClass('oblig_subsection').append(EStr.OBLIGATORY_SUBSECTION);
			textarea.addClass('oblig_subsection');
		}
		else if (ESectionParser.botSubsection(subsection, section)) {
			label.addClass('bot_subsection').append(EStr.BOT_SUBSECTION);
			textarea.addClass('bot_subsection');
		}
		p.append(label).append(textarea);
		
		return p;
	},
	
	rebindFormActions : function() {
		this.form.find('textarea').removeAttr('name');
		this.form.parent('form').submit(function() {
			if (EUi.usingNew) {
				EUi.deleteEmptySections();
				EUi.oldform.find('textarea').val(EPrinter.recalculateCode(this.form));
			}
			return true;
		});
	},
	
	resizeTextareas : function() {
		$('fieldset.active').find('textarea').autogrow();
	}
};

var EForm = {
		
	addDefaultTexts : function(alpha, code) {
		var arr = code == 'pl' ? EConstants.SAMPLE_SUBSECTION_CONTENTS_POLISH : EConstants.SAMPLE_SUBSECTION_CONTENTS_FOREIGN;
		for (subs in arr) {
			var defaultText = arr[subs];
			$('#ed_' + alpha + '_' + subs).val(defaultText);
		}
	},
	
	removeDefaultTexts : function(alpha, code) {
		var arr = code == 'pl' ? EConstants.SAMPLE_SUBSECTION_CONTENTS_POLISH : EConstants.SAMPLE_SUBSECTION_CONTENTS_FOREIGN;
		for (subs in arr) {
			var defaultText = arr[subs];
			if ($('#ed_' + alpha + '_' + subs).val() == defaultText) {
				$('#ed_' + alpha + '_' + subs).val('');
			}
		}
	}
	
};



window.ESpecialChars = {
	
	obj : undefined,
	formerParent : undefined,
	detached : 0,
	
	detach : function() {
		if (ESpecialChars.detached) {
			return;
		}
		var container = $('#keyboard_keys');
		ESpecialChars.obj = $('#editpage-specialchars');
		ESpecialChars.formerParent = ESpecialChars.obj.parent();
		ESpecialChars.obj.detach();
		
		container.append(ESpecialChars.obj);
		ESpecialChars.detached = 1;
	},
	
	attach : function() {
		if (!ESpecialChars.detached) {
			return;
		}
		EKeyboard.hide();
		ESpecialChars.obj.detach();
		ESpecialChars.formerParent.append(ESpecialChars.obj);
		ESpecialChars.detached = 0;
	},
	
	toggle : function() {
		if (ESpecialChars.detached) {
			ESpecialChars.attach();
		}
		else {
			ESpecialChars.detach();
		}
	}
};

window.EKeyboard = {

	init : function() {
		var keyboard = $('<div id="keyboard"/>');
		var keys = $('<div id="keyboard_keys" />');
		
		keyboard.hide();
		keys.hide().append(EStr.KEYBOARD_ALWAYS);
		$('body').append(keyboard).append(keys);
		
		if (EUi.usingNew) {
			ESpecialChars.detach();
		}
		
		keyboard.click(function() {
			keys.toggle();
		});
		
		$(window).resize(function() {
			if (document.activeElement) {
				$(document.activeElement).focus();
			}
		});
		
	},
	
	hide : function() {
		$('#keyboard').hide();
		$('#keyboard_keys').hide();		
	}

};

(function($) {
			
	$.fn.keyboard = function () {
		
		$(this).focus(function() {
			if (!$(this).is(':visible')) {
				EKeyboard.hide();
				return;
			}
			var nPos = $(this).offset();
			
			nPos.top += ($(this).height() + 7);
			nPos.left += 20;
			$('#keyboard').show().css({ top: nPos.top, left: nPos.left });
			$('#keyboard_keys').css({ top: nPos.top, left: nPos.left + 34 });			
			$('#keyboard_keys').data('active_area', $(this).attr('id'));
			
			insertTags = insertTags2;
		}).blur(function() {
		});
		return $(this);
		
	};

})(jQuery);

insertTags2 = function insertTags2(tagOpen, tagClose, sampleText) {
	var txtarea;
	if (document.editform && !EUi.usingNew) {
		txtarea = document.editform.wpTextbox1;
	} else if (EUi.usingNew) {
		var aname = $('#keyboard_keys').data('active_area');
		txtarea = aname ? document.getElementById(aname) : undefined;
	}
	if (!txtarea) {
		// some alternate form? take the first one we can find
		var areas = document.getElementsByTagName('textarea');
		txtarea = areas[0];
	}
	var selText, isSample = false;
 
	if (document.selection  && document.selection.createRange) { // IE/Opera
 
		//save window scroll position
		if (document.documentElement && document.documentElement.scrollTop)
			var winScroll = document.documentElement.scrollTop;
		else if (document.body)
			var winScroll = document.body.scrollTop;
		//get current selection  
		txtarea.focus();
		var range = document.selection.createRange();
		selText = range.text;
		//insert tags
		checkSelectedText();
		range.text = tagOpen + selText + tagClose;
		//mark sample text as selected
		if (isSample && range.moveStart) {
			if (is_opera && is_opera_seven && !is_opera_95)
				tagClose = tagClose.replace(/\n/g,'');
			range.moveStart('character', - tagClose.length - selText.length); 
			range.moveEnd('character', - tagClose.length); 
		}
		range.select();   
		//restore window scroll position
		if (document.documentElement && document.documentElement.scrollTop)
			document.documentElement.scrollTop = winScroll;
		else if (document.body)
			document.body.scrollTop = winScroll;
 
	} else if (txtarea.selectionStart || txtarea.selectionStart == '0') { // Mozilla
 
		//save textarea scroll position
		var textScroll = txtarea.scrollTop;
		//get current selection
		txtarea.focus();
		var startPos = txtarea.selectionStart;
		var endPos = txtarea.selectionEnd;
		selText = txtarea.value.substring(startPos, endPos);
		//insert tags
		checkSelectedText();
		txtarea.value = txtarea.value.substring(0, startPos)
			+ tagOpen + selText + tagClose
			+ txtarea.value.substring(endPos, txtarea.value.length);
		//set new selection
		if (isSample) {
			txtarea.selectionStart = startPos + tagOpen.length;
			txtarea.selectionEnd = startPos + tagOpen.length + selText.length;
		} else {
			txtarea.selectionStart = startPos + tagOpen.length + selText.length + tagClose.length;
			txtarea.selectionEnd = txtarea.selectionStart;
		}
		//restore textarea scroll position
		txtarea.scrollTop = textScroll;
	} 
 
	function checkSelectedText(){
		if (!selText) {
			selText = sampleText;
			isSample = true;
		} else if (selText.charAt(selText.length - 1) == ' ') { //exclude ending space char
			selText = selText.substring(0, selText.length - 1);
			tagClose += ' ';
		} 
	}
};


// jQuery Alert Dialogs Plugin
//
// Version 1.1
//
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 14 May 2009
//
// Visit http://abeautifulsite.net/notebook/87 for more information
//
// Usage:
//		jAlert( message, [title, callback] )
//		jConfirm( message, [title, callback] )
//		jPrompt( message, [value, title, callback] )
// 
// History:
//
//		1.00 - Released (29 December 2008)
//
//		1.01 - Fixed bug where unbinding would destroy all resize events
//
// License:
// 
// This plugin is dual-licensed under the GNU General Public License and the MIT License and
// is copyright 2008 A Beautiful Site, LLC. 
//
(function($) {
	
	$.alerts = {
		
		// These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time
		
		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		overlayOpacity: .2,                // transparency level of overlay
		overlayColor: '#000',               // base color of overlay
		draggable: false,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '&nbsp;' + EStr.OK + '&nbsp;',         // text for the OK button
		cancelButton: '&nbsp;' + EStr.CANCEL + '&nbsp;', // text for the Cancel button
		dialogClass: null,                  // if specified, this class will be applied to all dialogs
		
		// Public methods
		
		alert: function(message, title, callback) {
			if( title == null ) title = EStr.WARNING;
			$.alerts._show(title, message, null, 'alert', function(result) {
				if( callback ) callback(result);
			});
		},
		
		confirm: function(message, title, callback) {
			if( title == null ) title = EStr.CONFIRMATION;
			$.alerts._show(title, message, null, 'confirm', function(result) {
				if( callback ) callback(result);
			});
		},
			
		prompt: function(message, value, title, callback) {
			if( title == null ) title = EStr.QUESTION;
			$.alerts._show(title, message, value, 'prompt', function(result) {
				if( callback ) callback(result);
			});
		},
		
		// Private methods
		
		_show: function(title, msg, value, type, callback) {
			
			$.alerts._hide();
			$.alerts._overlay('show');
			
			$("BODY").append(
			  '<div id="popup_container">' +
			    '<h1 id="popup_title"></h1>' +
			    '<div id="popup_content">' +
			      '<div id="popup_message"></div>' +
				'</div>' +
			  '</div>');
			
			if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);
						
			$("#popup_container").css({
				padding: 0,
				margin: 0
			});
			
			$("#popup_title").text(title);
			$("#popup_content").addClass(type);
			$("#popup_message").text(msg);
			$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );
			
			$("#popup_container").css({
				minWidth: $("#popup_container").outerWidth(),
				maxWidth: $("#popup_container").outerWidth()
			});
			
			$.alerts._reposition();
			$.alerts._maintainPosition(true);
			
			switch( type ) {
				case 'alert':
					$('#popup_container').addClass('alert').removeClass('confirm').removeClass('prompt');
					$('#popup_overlay').addClass('alert').removeClass('confirm').removeClass('prompt');
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'confirm':
					$('#popup_container').removeClass('alert').addClass('confirm').removeClass('prompt');
					$('#popup_overlay').removeClass('alert').addClass('confirm').removeClass('prompt');
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'prompt':
					$('#popup_container').removeClass('alert').removeClass('confirm').addClass('prompt');
					$('#popup_overlay').removeClass('alert').removeClass('confirm').addClass('prompt');
					$("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" class="keyboardable" />').after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_prompt").width( $("#popup_message").width() );
					$("#popup_ok").click( function() {
						EKeyboard.hide();
						var val = $("#popup_prompt").val();
						$.alerts._hide();
						if( callback ) callback( val );
					});
					$("#popup_cancel").click( function() {
						EKeyboard.hide();
						$.alerts._hide();
						if( callback ) callback( null );
					});
					$("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					if( value ) $("#popup_prompt").val(value);
					$("#popup_prompt").keyboard().focus().select();
				break;
			}
			
			// Make draggable
			if( $.alerts.draggable ) {
				try {
					$("#popup_container").draggable({ handle: $("#popup_title") });
					$("#popup_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}
		},
		
		_hide: function() {
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},
		
		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.alerts._overlay('hide');
					$("BODY").append('<div id="popup_overlay"></div>');
					$("#popup_overlay").css({
						position: 'absolute',
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(document).height(),
						background: $.alerts.overlayColor,
						opacity: $.alerts.overlayOpacity
					});
				break;
				case 'hide':
					$("#popup_overlay").remove();
				break;
			}
		},
		
		_reposition: function() {
			var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
			if( $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();
			
			$("#popup_container").css({
				top: top + 'px',
				left: left + 'px'
			});
			$("#popup_overlay").height( $(document).height() );
			$("#popup_prompt").keyboard().focus().select();
		},
		
		_maintainPosition: function(status) {
			if( $.alerts.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', $.alerts._reposition);
					break;
					case false:
						$(window).unbind('resize', $.alerts._reposition);
					break;
				}
			}
		}
		
	};
	
	// Shortcut functions
	jAlert = function(message, title, callback) {
		$.alerts.alert(message, title, callback);
	};
	
	jConfirm = function(message, title, callback) {
		$.alerts.confirm(message, title, callback);
	};
		
	jPrompt = function(message, value, title, callback) {
		$.alerts.prompt(message, value, title, callback);
	};
	
})(jQuery);


/*                    tinyTips Plugin                			     	*/
/*                      Version: 1.0                 			   		*/
/*                      Mike Merritt                  					*/
/*                 Updated: Feb 4th, 2010                  				*/
/* Copyright (c) 2009 Mike Merritt

	Permission is hereby granted, free of charge, to any person
	obtaining a copy of this software and associated documentation
	files (the "Software"), to deal in the Software without
	restriction, including without limitation the rights to use,
	copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the
	Software is furnished to do so, subject to the following
	conditions:
	
	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.
**************************************************************************/

(function($){  
	$.fn.tooltip = function () {
		
		var tooltip = $('<div class="tooltip"/>');
		tooltip.css('position', 'absolute').css('z-index', '1000').appendTo($('body'));
		
		// When we hover over the element that we want the tooltip applied to
		$(this).hover(function() {
					
			tooltip.html($(this).data('tip'));
			
			// Offsets so that the tooltip is centered over the element it is being applied to but
			// raise it up above the element so it isn't covering it.
			var yOffset = tooltip.height() + 17;
			var xOffset = (((tooltip.width() - 10) / 2)) - ($(this).width() / 2);
			
			// Grab the coordinates for the element with the tooltip and make a new copy
			// so that we can keep the original un-touched.
			var pos = $(this).offset();
			var nPos = pos;
			
			// Add the offsets to the tooltip position
			nPos.top = pos.top - yOffset;
			nPos.left = pos.left - xOffset;
			
			tooltip.css(nPos).show();
			
		}, function() {
			tooltip.hide();			
		});
		
	};

})(jQuery);


// https://github.com/jaz303/jquery-grab-bag/raw/master/javascripts/jquery.autogrow-textarea.js
(function($) {
    /*
     * Auto-growing textareas; technique ripped from Facebook
     */
    $.fn.autogrow = function(options) {
        
        this.filter('textarea').each(function() {
            
            var $this       = $(this),
                minHeight   = 20,
                maxHeight   = 500,
                lineHeight  = $this.css('lineHeight');
            
            var shadow = $('<div></div>').css({
                position:   'absolute',
                top:        -10000,
                left:       -10000,
                width:      $(this).width() - parseInt($this.css('paddingLeft')) - parseInt($this.css('paddingRight')),
                fontSize:   $this.css('fontSize'),
                fontFamily: $this.css('fontFamily'),
                lineHeight: $this.css('lineHeight'),
                resize:     'none'
            }).appendTo(document.body);
            
            var update = function() {
                var val = this.value.replace(/</g, '&lt;')
                                    .replace(/>/g, '&gt;')
                                    .replace(/&/g, '&amp;')
                                    .replace(/\n$/, '<br/>&nbsp;')
                                    .replace(/\n/g, '<br/>');
                
                shadow.html(val);
                $(this).css('height', Math.min(Math.max(shadow.height(), minHeight), maxHeight));
            
            };
            
            $(this).change(update).keyup(update).keydown(update);
            
            update.apply(this);
            
        });
        
        return this;
        
    };
    
})(jQuery);


/*! Copyright (c) 2008 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.0.3
 * Requires jQuery 1.1.3+
 * Docs: http://docs.jquery.com/Plugins/livequery
 */

(function($) {
	
$.extend($.fn, {
	livequery: function(type, fn, fn2) {
		var self = this, q;
		
		// Handle different call patterns
		if ($.isFunction(type))
			fn2 = fn, fn = type, type = undefined;
			
		// See if Live Query already exists
		$.each( $.livequery.queries, function(i, query) {
			if ( self.selector == query.selector && self.context == query.context &&
				type == query.type && (!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid) )
					// Found the query, exit the each loop
					return (q = query) && false;
		});
		
		// Create new Live Query if it wasn't found
		q = q || new $.livequery(this.selector, this.context, type, fn, fn2);
		
		// Make sure it is running
		q.stopped = false;
		
		// Run it immediately for the first time
		q.run();
		
		// Contnue the chain
		return this;
	},
	
	expire: function(type, fn, fn2) {
		var self = this;
		
		// Handle different call patterns
		if ($.isFunction(type))
			fn2 = fn, fn = type, type = undefined;
			
		// Find the Live Query based on arguments and stop it
		$.each( $.livequery.queries, function(i, query) {
			if ( self.selector == query.selector && self.context == query.context && 
				(!type || type == query.type) && (!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid) && !this.stopped )
					$.livequery.stop(query.id);
		});
		
		// Continue the chain
		return this;
	}
});

$.livequery = function(selector, context, type, fn, fn2) {
	this.selector = selector;
	this.context  = context || document;
	this.type     = type;
	this.fn       = fn;
	this.fn2      = fn2;
	this.elements = [];
	this.stopped  = false;
	
	// The id is the index of the Live Query in $.livequery.queries
	this.id = $.livequery.queries.push(this)-1;
	
	// Mark the functions for matching later on
	fn.$lqguid = fn.$lqguid || $.livequery.guid++;
	if (fn2) fn2.$lqguid = fn2.$lqguid || $.livequery.guid++;
	
	// Return the Live Query
	return this;
};

$.livequery.prototype = {
	stop: function() {
		var query = this;
		
		if ( this.type )
			// Unbind all bound events
			this.elements.unbind(this.type, this.fn);
		else if (this.fn2)
			// Call the second function for all matched elements
			this.elements.each(function(i, el) {
				query.fn2.apply(el);
			});
			
		// Clear out matched elements
		this.elements = [];
		
		// Stop the Live Query from running until restarted
		this.stopped = true;
	},
	
	run: function() {
		// Short-circuit if stopped
		if ( this.stopped ) return;
		var query = this;
		
		var oEls = this.elements,
			els  = $(this.selector, this.context),
			nEls = els.not(oEls);
		
		// Set elements to the latest set of matched elements
		this.elements = els;
		
		if (this.type) {
			// Bind events to newly matched elements
			nEls.bind(this.type, this.fn);
			
			// Unbind events to elements no longer matched
			if (oEls.length > 0)
				$.each(oEls, function(i, el) {
					if ( $.inArray(el, els) < 0 )
						$.event.remove(el, query.type, query.fn);
				});
		}
		else {
			// Call the first function for newly matched elements
			nEls.each(function() {
				query.fn.apply(this);
			});
			
			// Call the second function for elements no longer matched
			if ( this.fn2 && oEls.length > 0 )
				$.each(oEls, function(i, el) {
					if ( $.inArray(el, els) < 0 )
						query.fn2.apply(el);
				});
		}
	}
};

$.extend($.livequery, {
	guid: 0,
	queries: [],
	queue: [],
	running: false,
	timeout: null,
	
	checkQueue: function() {
		if ( $.livequery.running && $.livequery.queue.length ) {
			var length = $.livequery.queue.length;
			// Run each Live Query currently in the queue
			while ( length-- )
				$.livequery.queries[ $.livequery.queue.shift() ].run();
		}
	},
	
	pause: function() {
		// Don't run anymore Live Queries until restarted
		$.livequery.running = false;
	},
	
	play: function() {
		// Restart Live Queries
		$.livequery.running = true;
		// Request a run of the Live Queries
		$.livequery.run();
	},
	
	registerPlugin: function() {
		$.each( arguments, function(i,n) {
			// Short-circuit if the method doesn't exist
			if (!$.fn[n]) return;
			
			// Save a reference to the original method
			var old = $.fn[n];
			
			// Create a new method
			$.fn[n] = function() {
				// Call the original method
				var r = old.apply(this, arguments);
				
				// Request a run of the Live Queries
				$.livequery.run();
				
				// Return the original methods result
				return r;
			};
		});
	},
	
	run: function(id) {
		if (id != undefined) {
			// Put the particular Live Query in the queue if it doesn't already exist
			if ( $.inArray(id, $.livequery.queue) < 0 )
				$.livequery.queue.push( id );
		}
		else
			// Put each Live Query in the queue if it doesn't already exist
			$.each( $.livequery.queries, function(id) {
				if ( $.inArray(id, $.livequery.queue) < 0 )
					$.livequery.queue.push( id );
			});
		
		// Clear timeout if it already exists
		if ($.livequery.timeout) clearTimeout($.livequery.timeout);
		// Create a timeout to check the queue and actually run the Live Queries
		$.livequery.timeout = setTimeout($.livequery.checkQueue, 20);
	},
	
	stop: function(id) {
		if (id != undefined)
			// Stop are particular Live Query
			$.livequery.queries[ id ].stop();
		else
			// Stop all Live Queries
			$.each( $.livequery.queries, function(id) {
				$.livequery.queries[ id ].stop();
			});
	}
});

// Register core DOM manipulation methods
$.livequery.registerPlugin('append', 'prepend', 'after', 'before', 'wrap', 'attr', 'removeAttr', 'addClass', 'removeClass', 'toggleClass', 'empty', 'remove');

// Run Live Queries when the Document is ready
$(function() { $.livequery.play(); });


// Save a reference to the original init method
var init = $.prototype.init;

// Create a new init method that exposes two new properties: selector and context
$.prototype.init = function(a,c) {
	// Call the original init and save the result
	var r = init.apply(this, arguments);
	
	// Copy over properties if they exist already
	if (a && a.selector)
		r.context = a.context, r.selector = a.selector;
		
	// Set properties
	if ( typeof a == 'string' )
		r.context = c || document, r.selector = a;
	
	// Return the result
	return r;
};

// Give the init function the jQuery prototype for later instantiation (needed after Rev 4091)
$.prototype.init.prototype = $.prototype;
	
})(jQuery);


if ((mw.config.get('wgAction') == 'edit' || mw.config.get('wgAction') == 'submit')
	&& mw.config.get('wgNamespaceNumber') == 0) {
	$(document).ready(Ed.init);
}
