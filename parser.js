var EParser = {
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
						'title' : '',
						'content' : $.trim(sec[0]),
						'short' : EdConstants.INTRO
					};
				}
				else {
					var section = this.getSectionFromString(sec[0]);
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
				'alpha' : this.getAlphabetical(str)
			};
		},

	insideTemplate  :
		function(str) {
			return str.replace(/.*\{\{(.*)\}\}.*/g, '$1');
		},
		
	getAlphabetical :
		function(str) {
			if (str.indexOf(EdStr.INTERNATIONAL_USAGE) != -1) {
				return '0001';
			}
			var template = this.insideTemplate(str);
			if (template == EdStr.POLISH) {
				return '0002';
			}
			else if (template == EdStr.POLISH_FOREIGN) {
				return '0003';
			}
			return template.replace(/język /, '')
				.replace('ą', 'azz').replace('ć', 'czz')
				.replace('ę', 'ezz').replace('ł', 'lzz')
				.replace('ń', 'nzz').replace('ó', 'ozz')
				.replace('ś', 'szz').replace('ź', 'zzy')
				.replace('ż', 'zzz').replace(' ', '_');
		}
};

window.EdFilesLoaded++;
window.EdTryInit();