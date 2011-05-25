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
			else if (template == EdStr.CHINESE_SIGN) {
				return '0004';
			}
			return template.replace(/język /, '').replace('|', '_')
				.replace('ą', 'azz').replace('ć', 'czz')
				.replace('ę', 'ezz').replace('ł', 'lzz')
				.replace('ń', 'nzz').replace('ó', 'ozz')
				.replace('ś', 'szz').replace('ź', 'zzy')
				.replace('ż', 'zzz').replace(' ', '_');
		}
};

window.ESectionParser = {
	subsections :
		{
			'pl' :
			 	['wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje',
			 	 'synonimy', 'antonimy', 'pokrewne', 'frazeologia', 'etymologia',
			 	 'uwagi', 'tłumaczenia', 'źródła'],
			'en' :
			 	['wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje',
			 	 'synonimy', 'antonimy', 'pokrewne', 'frazeologia', 'etymologia',
			 	 'uwagi', 'źródła'],
			'ru' :
			 	['transliteracja', 'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje',
			 	 'synonimy', 'antonimy', 'pokrewne', 'frazeologia', 'etymologia',
			 	 'uwagi', 'źródła'],
			'sr' :
			 	['ortografie', 'transliteracja', 'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje',
			 	 'synonimy', 'antonimy', 'pokrewne', 'frazeologia', 'etymologia',
			 	 'uwagi', 'źródła'],
			'zh' :
				['klucz', 'kreski', 'warianty', 'kolejność', 'znaczenia', 'etymologia', 'kody', 'słowniki',
				 'uwagi', 'źródła']
		}

};

window.EdFilesLoaded++;
window.EdTryInit();