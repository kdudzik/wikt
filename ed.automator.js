window.EAutomator = {

	/*
	 * Zwraca kody wersji językowej z aktywnej sekcji + domyślnych
	 */
	getActiveLangs : function () {
		var ret = EConstants.USED_WIKTIONARIES.slice(0),
			act = EUtil.getActiveLangCode();

		if (ret.indexOf(act) === -1 && act !== 'pl' && EConstants.ALL_WIKTIONARIES.indexOf(act) !== -1) {
			ret.push(act);
		}
		return ret;
	},

	/*
	 * Zwraca kody wszystkich wersji językowych z sekcji + domyślnych
	 */
	getAllLangs : function () {
		var id, code,
			ret = EConstants.USED_WIKTIONARIES.slice(0);

		for (id in Ed.content.sections) {
			if (Ed.content.sections.hasOwnProperty(id)) {
				code = Ed.content.sections[id].code;
				if (code !== undefined) {
					code = code.replace(/-.*/, '');
					if (code.length > 1 && code.length < 7 && code !== 'pl' && ret.indexOf(code) === -1) {
						ret.push(code);
					}
				}
			}
		}
		return $.grep(ret, function (val) { return EConstants.ALL_WIKTIONARIES.indexOf(val) !== -1; });
	},

	getInterwikiLangs : function () {
		var arr, el, res = [],
			str = $('#ed_0000_').val(),
			re = new RegExp('\\[\\[(\\w+):.*?\\]\\]', 'g');

		while ((arr = re.exec(str)) !== null) {
			el = $.trim(arr[1]);
			if (el) {
				res.push(el);
			}
		}
		return res;
	},

	getActiveAndInterwikiLangs : function () {
		return $.merge(EAutomator.getActiveLangs(), EAutomator.getInterwikiLangs().slice(0, 50));
	},

	/*
	 * Aktualizuje interwiki: do obecnych dodaje z wersji językowych z sekcji + domyślnych
	 */
	fillInterwiki : function () {
		var langs, urls, query;

		EApi.started(EConstants.MODE_IW, '');
		langs = EAutomator.getAllLangs();
		langs.push('pl');
		urls = $.map(langs, function (val) { return EApi.url(val); });
		query = { titles: mw.config.get('wgTitle'), prop: 'langlinks', lllimit: 200 };
		EApi.askMore(query, 'EAutomator.fillInterwikiRe', urls);
		return false;

		// callback
	},
	fillInterwikiRe : function (results) {
		var iwikiString, curIwiki, re,
			iwikis = [];

		$.each(results, function () {
			var res = this;

			if (res.query === undefined || res.query.pages === undefined) {
				return false;
			}
			$.each(res.query.pages, function (j, val) {
				if (j === '-1') {
					return false;
				}
				if (iwikis.indexOf(res.query.general.lang) === -1 && res.query.general.lang !== 'pl') {
					iwikis.push(res.query.general.lang);
				}
				if (val.langlinks === undefined) {
					return false;
				}
				$.each(val.langlinks, function () {
					if (this['*'] === mw.config.get('wgTitle') && iwikis.indexOf(this.lang) === -1 && this.lang !== 'pl') {
						iwikis.push(this.lang);
					}
				});
				return true;
			});
			return true;
		});
		iwikis.sort(function (a, b) { return EConstants.INTERWIKI_ORDER.indexOf(a) - EConstants.INTERWIKI_ORDER.indexOf(b); });
		iwikiString = $.map(iwikis, function (val) { return '[[' + val + ':' + mw.config.get('wgTitle') + ']]'; }).join(' ');
		curIwiki = $('#ed_0000_').val();
		if (curIwiki === '') {
			$('#ed_0000_').val(iwikiString).autoresize();
		} else {
			re = new RegExp('(\\[\\[[a-z\\-]+' + ':' + mw.config.get('wgTitle') + '\\]\\]\\s*)+');
			$('#ed_0000_').val($.trim(iwikiString + curIwiki.replace(re, '\n'))).autoresize();
		}
		EApi.done(EConstants.MODE_IW);
	},

	getIPA : function () {
		var urls, query;

		EApi.started(EConstants.MODE_IPA, 'wymowa');
		urls = $.map(EAutomator.getActiveAndInterwikiLangs(), function (val) { return EApi.url(val); });
		query = { titles: mw.config.get('wgTitle'), prop: 'revisions', rvprop: 'content' };
		EApi.askMore(query, 'EAutomator.getIPARe', urls);
		return false;

		// callback
	},
	getIPARe : function (results) {
		var ipas = {},
			error = EStr.NO_IPA_FOUND;

		$.each(results, function () {
			var lang,
				res = this;

			if (res.query === undefined || res.query.pages === undefined) {
				return false;
			}
			lang = res.query.general.lang;
			$.each(res.query.pages, function (j, val) {
				var content, ipa;

				if (j === '-1' || !val.revisions || !val.revisions[0]) {
					return false;
				}
				content = val.revisions[0]['*'];
				ipa = EAutomator.extractIPA(content, lang);
				if (ipa !== undefined && ipa.length) {
					ipas[lang] = ipa;
					error = undefined;
				}
				return true;
			});
			return true;
		});
		EApi.done(EConstants.MODE_IPA, ipas, error);
	},

	extractIPA : function (str, lang) {
		if (EAutomator['extractIPA_' + lang] === undefined) {
			return undefined;
		} else {
			return EUtil.executeFn('extractIPA_' + lang, EAutomator, str);
		}
	},

	extractFirstArgsFromTemplates : function (str, template) {
		var arr, el, results = [],
			re = new RegExp('\\{\\{' + template + '\\s*\\|\\s*([^\\{\\}\\|<=]+)[\\}\\|<]', 'g');

		while ((arr = re.exec(str)) !== null) {
			el = $.trim(arr[1]);
			if (el && EConstants.FORBIDDEN_IPA_CONTENT.indexOf(el) === -1 && results.indexOf(el) === -1) {
				results.push(el);
			}
		}
		return results;
	},

	extractSecondArgsFromTemplates : function (str, template) {
		var arr, el, results = [],
			re = new RegExp('\\{\\{' + template + '\\s*\\|\\s*([^\\{\\}\\|]*)\\|\\s*[\\/\\]]?([^\\{\\}\\/\\|<=]+)[\\}\\|\\/<\\]]', 'gi');

		while ((arr = re.exec(str)) !== null) {
			el = $.trim(arr[2]);
			if (el && EConstants.FORBIDDEN_IPA_CONTENT.indexOf(el) === -1 && results.indexOf(el) === -1) {
				results.push(el);
			}
		}
		return results;
	},

	extractIPA_de: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'Lautschrift'); },
	extractIPA_es: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'pronunciación'); },
	extractIPA_fr: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'pron'); },
	extractIPA_en: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'IPA'); },
	extractIPA_cs: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'IPA'); },
	extractIPA_sk: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'IPA'); },
	extractIPA_it: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'IPA'); },
	extractIPA_af: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'IPA'); },
	extractIPA_ca: function (str) { return EAutomator.extractSecondArgsFromTemplates(str, 'pron'); },
	extractIPA_ro: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'AFI'); },
	extractIPA_et: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'hääldus'); },
	extractIPA_ko: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'IPA'); },
	extractIPA_nl: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'IPA'); },
	extractIPA_co: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'IPA'); },
	extractIPA_el: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'ΔΦΑ'); },
	extractIPA_eo: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'IFA'); },
	extractIPA_vi: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'IPA'); },
	extractIPA_ja: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'IPA1'); },
	extractIPA_simple: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'IPA'); },
	extractIPA_ga: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'IPA'); },
	extractIPA_is: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'IPA'); },
	extractIPA_li: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'IPA'); },
	extractIPA_lv: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'IPA'); },
	extractIPA_mg: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'pron'); },
	extractIPA_no: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'IPA'); },
	extractIPA_oc: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'pron'); },
	extractIPA_sl: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'IPA'); },
	extractIPA_tl: function (str) { return EAutomator.extractFirstArgsFromTemplates(str, 'API'); },
	extractIPA_ru: function (str) {
		var arr, el,
			results = EAutomator.extractFirstArgsFromTemplates(str, 'transcription'),
			re = /\{\{transcriptions\s*\|\s*([^\}\|]*)\s*\|\s*([^\}\|]*)\s*\}\}/g;

		while ((arr = re.exec(str)) !== null) {
			el = $.trim(arr[1]);
			if (el && EConstants.FORBIDDEN_IPA_CONTENT.indexOf(el) === -1 && results.indexOf(el) === -1) {
				results.push(el);
			}
			el = $.trim(arr[2]);
			if (el && EConstants.FORBIDDEN_IPA_CONTENT.indexOf(el) === -1 && results.indexOf(el) === -1) {
				results.push(el);
			}
		}
		return results;
	},

	addTransliteration: function (sectionName, sectionCode) {
		var textarea = $('#ed_' + sectionName + '_transliteracja');
		if (EConstants.TRANSLIT_SUPPORTED.indexOf(sectionCode) === -1) {
			return;
		}
		if (textarea.val()) {
			return;
		}
		if (sectionCode === 'ru') {
			textarea.val('{{translit}}');
		} else {
			textarea.val('{{translit|' + sectionCode + '}}');
		}
	},

	getPicture : function () {
		var urls, query;

		EApi.started(EConstants.MODE_PICTURE, '');
		urls = $.map(EAutomator.getActiveAndInterwikiLangs(), function (val) { return EApi.url(val); });
		query = { titles: mw.config.get('wgTitle'), prop: 'revisions', rvprop: 'content' };
		EApi.askMore(query, 'EAutomator.getPictureRe', urls);
		return false;

		// callback
	},
	getPictureRe : function (results) {
		var pics = {},
			error = EStr.NO_PICTURE_FOUND;

		$.each(results, function () {
			var lang,
				res = this;

			if (res.query === undefined || res.query.pages === undefined) {
				return false;
			}
			lang = res.query.general.lang;
			$.each(res.query.pages, function (j, val) {
				var content, pic;

				if (j === '-1' || !val.revisions || !val.revisions[0]) {
					return false;
				}
				content = val.revisions[0]['*'];
				pic = EAutomator.extractPicture(content);
				if (pic !== undefined && pic.length) {
					pics[lang] = pic;
					error = undefined;
				}
				return true;
			});
			return true;
		});
		EApi.done(EConstants.MODE_PICTURE, pics, error);
		EAutomator.getPictureUrls(pics);
	},

	extractPicture : function (str) {
		var arr, el, results = [],
			re = new RegExp('[:=\\|]([^\\|\\]:=]+?\\.(jpg|png|gif|svg))', 'gi');

		while ((arr = re.exec(str)) !== null) {
			el = $.trim(arr[1]).replace(/_/g, ' ');
			if (el && results.indexOf(el) === -1) {
				el = el.charAt(0).toUpperCase() + el.substr(1);
				results.push(el);
			}
		}
		return results;
	},

	imageCache : {},

	getPictureUrls : function (results) {
		var allImages = [],
			query;

		$.each(results, function () {
			$.each(this, function () {
				if (this && allImages.indexOf(this) === -1) {
					allImages.push('File:' + this);
				}
			});
		});
		query = { titles: allImages.join('|'), prop: 'imageinfo', iiprop: 'url', iiurlwidth: 150, iiurlheight: 150 };
		EApi.ask(query, 'EAutomator.getPictureUrlsRe', EApi.commonsUrl());
	},

	getPictureUrlsRe : function (results) {
		if (!results || !results[0] || !results[0].query || !results[0].query.pages) {
			return false;
		}
		$.each(results[0].query.pages, function () {
			var loader;

			if (!this.imageinfo || !this.imageinfo[0]) {
				return true;
			}
			EAutomator.imageCache[this.title] = '<img src="' + this.imageinfo[0].thumburl + '"/>';
			loader = $(EAutomator.imageCache[this.title]);
		});
		EPrinter.setPictureTooltips();
	},

	getAudio : function () {
		var urls, query;

		EApi.started(EConstants.MODE_AUDIO, 'wymowa');
		urls = $.map(EAutomator.getActiveAndInterwikiLangs(), function (val) { return EApi.url(val); });
		query = { titles: mw.config.get('wgTitle'), prop: 'revisions', rvprop: 'content' };
		EApi.askMore(query, 'EAutomator.getAudioRe', urls);
		return false;

		// callback
	},
	getAudioRe : function (results) {
		var oggs = {},
			error = EStr.NO_AUDIO_FOUND;

		$.each(results, function () {
			var lang,
				res = this;

			if (res.query === undefined || res.query.pages === undefined) {
				return false;
			}
			lang = res.query.general.lang;
			$.each(res.query.pages, function (j, val) {
				var content, ogg;

				if (j === '-1' || !val.revisions || !val.revisions[0]) {
					return false;
				}
				content = val.revisions[0]['*'];
				ogg = EAutomator.extractAudio(content);
				if (ogg !== undefined && ogg.length) {
					oggs[lang] = ogg;
					error = undefined;
				}
				return true;
			});
			return true;
		});
		EApi.done(EConstants.MODE_AUDIO, oggs, error);
	},

	extractAudio : function (str) {
		var arr, el, results = [],
			re = new RegExp('[\\|:=]([^\\|\\]:=]+?\\.ogg)', 'gi');

		while ((arr = re.exec(str)) !== null) {
			el = $.trim(arr[1]).replace(/_/g, ' ');
			if (el && results.indexOf(el) === -1) {
				el = el.charAt(0).toUpperCase() + el.substr(1);
				results.push(el);
			}
		}
		return results;
	}
};

window.EFilesLoaded++;
window.ETryInit();
