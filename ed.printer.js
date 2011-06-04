window.EPrinter = {
	recalculateCode : function(form) {
		var code = '';
		for (alpha in Ed.content.sections) {
			var sec = Ed.content.sections[alpha];
			if (alpha == '0000') {
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
					subs.content = $('#ed_' + alpha + '_' + subs.title.replace(' ', '_')).val();
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

window.EdFilesLoaded++;
window.EdTryInit();