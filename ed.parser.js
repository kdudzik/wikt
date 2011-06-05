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
	
	getSectionFromCodeAndLang : function(code, lang) {
		var pagename = mw.config.get('wgPageName').replace('_', ' ');
		if (code == 'zh-char' || code == 'zh') {
			pagename = '{{zh|' + pagename + '}}';
		}
		else if (code == 'ja' || code == 'ko') {
			pagename = '{{' + code + '|' + pagename + '}}';
		}
		return {
			'title' : pagename + ' ({{' + lang + '}})',
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

window.EFilesLoaded++;
window.ETryInit();