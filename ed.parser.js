window.EParser = {
	getSections :
	function(code) {
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
					'content' : $.trim(sec[0])
				};
			}
			else {
				var section = this.getSectionFromString($.trim(sec[0]));
				var alphacode = section.alpha;
				reta[alphacode] = section;
				reta[alphacode].content = $.trim(sec[1]);					
			}
		}

		return reta;
	},
		
	getSectionFromString :
	function(str) {
		return {
			'title' : str,
			'short' : this.insideTemplate(str).replace(/język /, ''),
			'content' : '',
			'alpha' : this.getAlphabetical(str),
			'code'  : this.getCode(str)
		};
	},
		
	getSectionFromInput :
	function(str) {
		var langname = EdConstants.CODE_TO_LANG[str];
		if (langname !== undefined) {
			str = mw.config.get('wgPageName') + ' {{' + langname + '}}';
		}
		return this.getSectionFromString(str);
	},

	insideTemplate  :
	function(str) {
		return str.replace(/.*\{\{(.*?)(\}\}|\|).*/g, '$1');
	},
		
	getAlphabetical :
	function(str) {
		var template = this.insideTemplate(str);
		if (template == EdStr.INTERNATIONAL_USAGE) {
			return '0001';
		}
		else if (template == EdStr.POLISH) {
			return '0002';
		}
		else if (template == EdStr.POLISH_FOREIGN) {
			return '0003';
		}
		else if (template == EdStr.LATIN_FOREIGN) {
			return '0004';
		}
		else if (template == EdStr.CHINESE_SIGN) {
			return '0005';
		}
		return template.replace(/język /, '')
			.replace(/[ąáåã]/, 'azz').replace('ć', 'czz')
			.replace(/[ęè]/, 'ezz').replace('ł', 'lzz')
			.replace('ń', 'nzz').replace(/[óõ]/, 'ozz')
			.replace('ś', 'szz').replace('ü', 'uzz')
			.replace('ź', 'zzy').replace('ż', 'zzz')
			.replace(/[ \|!]/, '_');
	},
		
	getCode :
	function(str) {
		var template = this.insideTemplate(str);
		var code;
		if (template.indexOf('język ') != -1) {
			template = template.replace(/język /, '');
			code = EdConstants.LANG_CODES_LONG[template];
		}
		else {
			code = EdConstants.LANG_CODES_SHORT[template];
		}
		return code ? code : '';			
	}
};

window.ESectionParser = {
		
	parse:
	function(section, alphaname) {
		var subsections = [];
		var mode = '';
		var code = section.code;
		
		if (code === undefined) {
			mode = 'INTRO';
		}
		else if (code == 'pl') {
			mode = 'POLISH';
		}
		else if (code == 'zh-char') {
			mode = 'CHINESE';
		}
		else if (code == 'egy') {
			mode = 'EGYPTIAN';
		}
		else if ($.inArray(code, EdConstants.NON_LATIN_LANGS) != -1) {
			mode = 'NON_LATIN';
		}
		else if ($.inArray(code, EdConstants.DOUBLE_LANGS) != -1) {
			mode = 'DOUBLE';
		}
		else {
			mode = 'LATIN';
		}
		subsections.push({ title: '', content: '' });
		
		var titlesArray;
		switch (mode) {
		case 'INTRO':
			titlesArray = []; break;
		case 'POLISH':
			titlesArray = EdConstants.SUBSECTIONS.POLISH; break;
		case 'CHINESE':
			titlesArray = EdConstants.SUBSECTIONS.CHINESE; break;
		case 'EGYPTIAN':
			titlesArray = EdConstants.SUBSECTIONS.EGYPTIAN; break;
		case 'NON_LATIN':
			titlesArray = EdConstants.SUBSECTIONS.NON_LATIN; break;
		case 'DOUBLE':
			titlesArray = EdConstants.SUBSECTIONS.DOUBLE; break;
		case 'LATIN':
			titlesArray = EdConstants.SUBSECTIONS.LATIN; break;
		}
		for (i in titlesArray) {
			subsections.push({ title: titlesArray[i], content: '' });
		}
		
		section.subsections = subsections;
		section.mode = mode; 
		this.parsePreparedSubsections(section.content, section.subsections);
	},
		
	parsePreparedSubsections :
	function(str, subsections) {
		var positions = [];
		for (i in subsections) {
			var title = subsections[i].title;
			positions.push({
				index: title == '' ? 0 : str.indexOf('{{' + title),
				title: title
			});
		}
		positions.sort(function(a, b) {
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
							sub.content = str.substring(pos.index, positions[j + 1].index);
						}
						else {
							sub.content = str.substring(pos.index);
						}
					}
					break;
				}
			}
		}
	}
};

window.EdFilesLoaded++;
window.EdTryInit();