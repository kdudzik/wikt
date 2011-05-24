var WParser = {
	getSections :
		function(code) {
			code = code.replace(/\s*==\s*([^=]+)\s*==\s*/g, '<BE>$1<EN>');
			var sections = code.split('<BE>');
			var reta = [];
			for (s in sections) {
				sec = sections[s].split('<EN>');
				reta.push({
					'title' : sec.length > 1 ? sec[0] : '',
					'content' : $.trim(sec.length > 1 ? sec[1] : sec[0]),
					'short' : sec.length > 1 ? insideTemplate(sec[0]) : '...'
				});
			}

			if (!sections[0].length) {
				delete reta[0];
			}
			return reta;
		}
};

function insideTemplate(str) {
	return str.replace(/.*\{\{(.*)\}\}.*/g, '$1');
}
