window.EAutomator = {

	getActiveLangs : function() {
		var ret = EConstants.USED_WIKTIONARIES;
		var act = EUtil.getActiveLangCode();
		if (ret.indexOf(act) == -1) {
			ret.push(act);
		}
		return ret;
	},

	getAllLangs : function() {
		var ret = EConstants.USED_WIKTIONARIES;
		for (var id in Ed.content.sections) {
			var code = Ed.content.sections[id]['code'];
			if (code == undefined) {
				continue;
			}
			code = code.replace(/-.*/, '');
			if (code.length > 1 && code.length < 4 && code != 'pl' && ret.indexOf(code) == -1) {
				ret.push(code);
			}
		}
		return ret;
	},

	fillInterwiki : function() {
		EAutomator.started('add_iw');
		var langs = $.grep(EAutomator.getAllLangs(), function(val) { return EConstants.ALL_WIKTIONARIES.indexOf(val) != -1 });
		langs.push('pl');
		var urls = $.map(langs, function(val) { return EApi.url(val) });
		var query = { titles: mw.config.get('wgTitle'), prop: 'langlinks', lllimit: 200 };
		EApi.askMore(query, 'EAutomator.fillInterwikiRe', urls);
	},

	fillInterwikiRe : function(results) {
		var iwikis = [];
		$.each(results, function(i, res) {
			if (res.query == undefined || res.query.pages == undefined) {
				return false;
			}
			$.each(res.query.pages, function(j, val) {
				if (j == -1) {
					return false;
				}
				if (iwikis.indexOf(res.query.general.lang) == -1 && res.query.general.lang != 'pl') {
					iwikis.push(res.query.general.lang);
				}
				if (val.langlinks == undefined) {
					return false;
				}
				$.each(val.langlinks, function(k, link) {
					if (link['*'] == mw.config.get('wgTitle') && iwikis.indexOf(link.lang) == -1 && link.lang != 'pl') {
						iwikis.push(link.lang);
					}
				});
			});
		});
		iwikis.sort(function(a, b) { return EConstants.INTERWIKI_ORDER.indexOf(a) - EConstants.INTERWIKI_ORDER.indexOf(b) });
		var iwikiString = $.map(iwikis, function(val) { return '[[' + val + ':' + mw.config.get('wgTitle') + ']]' }).join(' ');
		var curIwiki = $('#ed_0000_').val();
		if (curIwiki == '') {
			$('#ed_0000_').val(iwikiString);
		} else {
			var re = new RegExp('(\\[\\[[a-z\\-]+' + ':' + mw.config.get('wgTitle') + '\\]\\]\\s*)+');
			$('#ed_0000_').val(iwikiString + curIwiki.replace(re, '\n'));
		}
		EAutomator.done('add_iw');
	},

	getIPA : function() {
		alert('DUPA!');
		EAutomator.done('add_ipa');
	},

	done : function(idpart) {
		$('#ed_' + EUtil.getActiveLangId() + '_extra_' + idpart).addClass('done');
	},

	started : function(idpart) {
		$('#ed_' + EUtil.getActiveLangId() + '_extra_' + idpart).removeClass('done');
	},
};

window.EFilesLoaded++;
window.ETryInit();
