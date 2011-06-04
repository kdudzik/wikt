window.EPrinter = {
	recalculateCode : function(form) {
		var code = '';
		var sortableSections = [];
		for (alpha in Ed.content.sections) {
			sortableSections.push(Ed.content.sections[alpha]);
		}
		sortableSections.sort(function(a, b) {
			return a.alpha > b.alpha ? 1 : -1;
		});
		console.log(sortableSections)
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
					if (subs.title == '' && subs.content != '') {
						code += $.trim(subs.content) + '\n';
					}
					else if (subs.title != '' && subs.content == '') {
						code += '{{' + subs.title + '}}\n';
					}
					else if (subs.shortened) {
						code += '{{' + subs.title + '}}\n' + $.trim(subs.content) + '\n';
					}
					else if (subs.content != '') {
						code += $.trim(subs.content) + '\n';
					}
				}
				code += '\n';
			}
		}
		code = $.trim(code);
		return code;
	}
};

window.EFilesLoaded++;
window.ETryInit();