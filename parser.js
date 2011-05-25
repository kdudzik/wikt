var WParser = {
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
						'short' : WedConstants.INTRO
						// TODO asynchro
					};
				}
				else {
					reta[this.getAlphabetical(sec[0])] = {
						'title' : sec[0],
						'content' : $.trim(sec[1]),
						'short' : this.insideTemplate(sec[0]).replace(/język /, '')
					};
					
				}
			}

			return reta;
		},

	insideTemplate  :
		function(str) {
			return str.replace(/.*\{\{(.*)\}\}.*/g, '$1');
		},
		
	getAlphabetical :
		function(str) {
			if (str.indexOf('użycie międzynarodowe') != -1) {
				return '0001';
			}
			var template = this.insideTemplate(str);
			if (template == 'język polski') {
				return '0002';
			}
			else if (template == 'termin obcy w języku polskim') {
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

window.WedFilesLoaded++;
window.WedTryInit();