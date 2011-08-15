window.EParser = {
	getSections : function (code) {
		var sections, reta, s, section, id;

		code = code.replace(/\s*==\s*([^=]+)\s*==\s*/g, '<BE>$1<EN>');
		sections = code.split('<BE>');
		reta = {};
		for (s in sections) {
			if (sections.hasOwnProperty(s) && sections[s].length) {
				sec = sections[s].split('<EN>');

				if (sec.length === 1) {
					// sekcja zerowa
					reta[EConstants.SECTION_ID_INTRO] = {
						content : $.trim(sec[0]),
						title : '',
						id : EConstants.SECTION_ID_INTRO,
						initcontent: $.trim(sec[0])
					};
				} else {
					section = this.getSectionFromTitle($.trim(sec[0]));
					id = section.id;
					reta[id] = section;
					reta[id].content = $.trim(sec[1]);
				}
			}
		}

		return reta;
	},

	getSectionFromTitle : function (str) {
		var template = this.insideTemplate(str);
		return {
			'title' : str,
			'short' : template.replace(/język /, ''),
			'content' : '',
			'id' : this.langId(template),
			'code'  : this.langCode(template),
			'initcontent' : ''
		};
	},

	getTitleFromCode : function (code) {
		var pagename = mw.config.get('wgPageName').replace('_', ' ');
		var lang;

		if (code === 'zh-char' || code === 'zh') {
			pagename = '{{zh|' + pagename + '}}';
		} else if (code === 'ja' || code === 'ko') {
			pagename = '{{' + code + '|' + pagename + '}}';
		}
		lang = EConstants.CODE_TO_LANG[code] || code;
		return pagename + ' ({{' + lang + '}})';
	},

	getSectionFromCodeAndLang : function (code, lang) {
		return {
			'title' : EParser.getTitleFromCode(code),
			'short' : lang.replace(/język /, ''),
			'content' : '',
			'id' : this.langId(lang),
			'code'	: code,
			'initcontent' : ''
		};
	},

	langId : function (langname) {
		if (langname === EStr.INTERNATIONAL_USAGE) {
			return EConstants.SECTION_ID_INTERNATIONAL;
		} else if (langname === EStr.POLISH) {
			return EConstants.SECTION_ID_POLISH;
		} else if (langname === EStr.POLISH_FOREIGN) {
			return EConstants.SECTION_ID_POLISH_FOREIGN;
		} else if (langname === EStr.CHINESE_SIGN) {
			return EConstants.SECTION_ID_CHINESE_SIGN;
		} else if (langname === EStr.LATIN_FOREIGN) {
			return EConstants.SECTION_ID_LATIN_FOREIGN;
		}
		langname = langname.replace(/język /, '').replace(/[ąáåã]/g, 'azz').replace(/ć/g, 'czz');
		langname = langname.replace(/[ęè]/g, 'ezz').replace(/ł/g, 'lzz').replace(/ń/g, 'nzz').replace(/[óõ]/g, 'ozz');
		langname = langname.replace(/ś/g, 'szz').replace(/ü/g, 'uzz').replace(/ź/g, 'zzy').replace(/ż/g, 'zzz');
		langname = langname.replace(/[ \|!\(\)]/g, '_');
		return langname;
	},

	getSectionFromInput : function (str) {
		var langname = EConstants.CODE_TO_LANG[str];
		var code;
		if (langname !== undefined) {
			return this.getSectionFromCodeAndLang(str, langname);
		}

		code = EConstants.LANG_CODES_SHORT[str];
		if (code !== undefined) {
			return this.getSectionFromCodeAndLang(code, str);
		}
		code = EConstants.LANG_CODES_LONG[str];
		if (code !== undefined) {
			return this.getSectionFromCodeAndLang(code, 'język ' + str);
		}
		return this.getSectionFromTitle(str);
	},

	insideTemplate  : function (str) {
		return str.replace(/.*\{\{(.*?)(\}\}|\|).*/g, '$1');
	},

	langCode : function (lang) {
		var code;
		if (lang.indexOf('język ') !== -1) {
			lang = lang.replace(/język /, '');
			code = EConstants.LANG_CODES_LONG[lang];
		} else {
			code = EConstants.LANG_CODES_SHORT[lang];
		}
		return code || lang;
	}
};

window.ESectionParser = {

	parse: function (section) {
		var subsections = [];
		var mode = '';
		var code = section.code;
		var i, targetSubsections;

		if (!section.title) {
			mode = 'INTRO';
		} else if (code === 'pl') {
			mode = 'POLISH';
		} else if (code === 'zh-char') {
			mode = 'CHINESE';
		} else if (code === 'egy') {
			mode = 'EGYPTIAN';
		} else if (code === 'ko') {
			mode = 'KOREAN';
		} else if (code === 'ja') {
			mode = 'JAPANESE';
		} else if (code === 'inter') {
			mode = 'INTERNATIONAL';
		} else if (EConstants.NON_LATIN_LANGS.indexOf(code) !== -1) {
			mode = 'NON_LATIN';
		} else if (EConstants.DOUBLE_LANGS.indexOf(code) !== -1) {
			mode = 'DOUBLE';
		} else {
			mode = 'LATIN';
		}
		subsections.push({ title: '', content: '', shortened: false, active: true });
		for (i in EConstants.SUBSECTIONS.ALL) {
			if (EConstants.SUBSECTIONS.ALL.hasOwnProperty(i)) {
				subsections.push({
					title: EConstants.SUBSECTIONS.ALL[i],
					content: '',
					shortened: true,
					initcontent: '',
					initmultiline: false,
					active: true
				});
			}
		}

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
		default:
			targetSubsections = []; break;
		}

		section.subsections = subsections;
		section.mode = mode;
		ESectionParser.parsePreparedSubsections(section, targetSubsections);
	},

	alternateTitle : function (title) {
		switch (title) {
		case 'transliteracja': return '|trans';
		case 'transkrypcja': return '|transkr';
		case 'kreski': return '|hanja-kreski';
		case 'przykłady': return '|użycie';
		default: return '';
		}
	},

	parsePreparedSubsections : function (section, targetSubsections) {
		var str = section.content;
		var subsections = section.subsections;
		var positions = [];
		var i, j, title, alt, regex, sub, pos, repl, changed, firstbreak;

		for (i in subsections) {
			if (subsections.hasOwnProperty(i)) {
				title = subsections[i].title;
				alt = ESectionParser.alternateTitle(title);
				regex = new RegExp('\\{\\{(' + title + alt + ')\\s*[\\|\\}]', 'g');
				positions.push({
					index: title === '' ? 0 : str.search(regex),
					title: title
				});
			}
		}
		positions.sort(function (a, b) {
			if (!a.index && !b.index) {
				return a.title ? 1 : -1;
			}
			return a.index - b.index;
		});

		for (i in subsections) {
			if (subsections.hasOwnProperty(i)) {
				sub = subsections[i];
				for (j in positions) {
					if (positions.hasOwnProperty(j)) {
						j = parseInt(j, 10);
						pos = positions[j];
						if (pos.title === sub.title) {
							if (pos.index !== -1) {
								if (j < positions.length - 1) {
									sub.content = $.trim(str.substring(pos.index, positions[j + 1].index));
								} else {
									sub.content = $.trim(str.substring(pos.index));
								}
								alt = ESectionParser.alternateTitle(sub.title);
								repl = new RegExp('\\{\\{(' + sub.title + alt + ')\\}\\}');
								changed = sub.content.replace(repl, '');

								if (changed !== sub.content) {
									firstbreak = changed.search(/\n/);
									if (firstbreak !== -1 && firstbreak < changed.search(/\S/)) {
										sub.initmultiline = true;
									}
									sub.content = $.trim(changed);
								} else if (sub.content !== '' || sub.title === '') {
									sub.shortened = false;
								}
								sub.initcontent = sub.content;
								break;
							} else if (targetSubsections.indexOf(pos.title) === -1) {
								sub.active = false;
							}
						}
					}
				}
			}
		}
	},

	obligatorySubsection : function (subsection, section) {
		return (subsection.title === 'znaczenia') && (section.mode !== 'CHINESE');
	},

	botSubsection : function (subsection, section) {
		return (subsection.title === 'wymowa') && (section.mode === 'POLISH') && !subsection.content;
	}
};

window.EFilesLoaded++;
window.ETryInit();
