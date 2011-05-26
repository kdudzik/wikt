window.EParser = {
	getSections :
		function(code) {
			code = code.replace(/\s*==\s*([^=]+)\s*==\s*/g, '<BE>$1<EN>');
			var sections = code.split('<BE>');
			var reta = [];
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
					var alphacode = section['alpha'];
					reta[alphacode] = section;
					reta[alphacode]['content'] = $.trim(sec[1]);					
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

};

window.EdFilesLoaded++;
window.EdTryInit();