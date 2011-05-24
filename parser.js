var WParser = {
	templates : {
	             'język polski' : 'pl',
	             'język angielski' : 'en',
	             'język niemiecki' : 'de',
	             'język francuski' : 'fr',
	             'język włoski' : 'it',
	             'język czeski' : 'cs'
	},
	
	getSections :
		function(code) {
			code = code.replace(/\s*==\s*([^=]+)\s*==\s*/g, '<BE>$1<EN>');
			var sections = code.split('<BE>');
			var reta = [];
			for (s in sections) {
				sec = sections[s].split('<EN>');
				var template = this.insideTemplate(sec[0]);
				var code = this.getLanguageCode(template);
				reta.push({
					'title' : sec.length > 1 ? sec[0] : '',
					'content' : $.trim(sec.length > 1 ? sec[1] : sec[0]),
					'short' : sec.length > 1 ? template : '...',
					'lang' : code ? code : ''
				});
			}

			if (!sections[0].length) {
				delete reta[0];
			}
			return reta;
		},

	insideTemplate  :
		function(str) {
			return str.replace(/.*\{\{(.*)\}\}.*/g, '$1');
		},
		
	getLanguageCode :
		function(template) {
			return this.templates[template];
		}
};