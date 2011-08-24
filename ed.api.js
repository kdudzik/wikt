window.EApi = {
	url : function (lang, project) {
		if (lang === undefined) {
			lang = 'pl';
		}
		if (project === undefined) {
			project = EConstants.WIKTIONARY;
		}
		return "http://" + lang + "." + project + ".org/w/api.php?";
	},

	commonsUrl : function () {
		return EApi.url('commons', EConstants.WIKIMEDIA);
	},

	wikiUrl : function (lang) {
		return EApi.url(lang, EConstants.WIKIPEDIA);
	},

	ask__prv : function (query, url) {
		if (url === undefined) {
			url = EApi.url();
		}
		query.action = 'query';
		query.format = 'json';
		query.meta = 'siteinfo';
		query.callback = 'EApi.callback';
		url += $.param(query);
		mw.loader.load(url);
	},

	ask : function (query, callback, url) {
		if (EApi.waiting) {
			alert(EStr.WAITING_FOR_API);
			return -1;
		}
		EApi.waitingName = callback;
		EApi.waiting = 1;
		EApi.ask__prv(query, url);
		return 0;
	},

	askMore : function (query, callback, urls) {
		if (EApi.waiting) {
			alert(EStr.WAITING_FOR_API);
			return -1;
		}
		EApi.waitingName = callback;
		EApi.waiting = urls.length;
		$.each(urls, function (ignored, url) {
			EApi.ask__prv(query, url);
		});
		return 0;
	},

	callback : function (res) {
		var tmp = String(EApi.waitingName);
		EApi.waitingResults.push(res);
		EApi.waiting -= 1;
		if (!EApi.waiting) {
			EApi.waitingName = '';
			EUtil.executeFn(tmp, window, EApi.waitingResults);
			EApi.waitingResults = [];
		}
	},

	started : function (mode, subs) {
		var idpart = EConstants.API_ID[mode],
			elem = $('#ed_' + EUtil.getActiveLangId() + '_extra_' + idpart);

		elem.removeClass('apidone apierror').addClass('apistarted');
		if (subs !== undefined) {
			EUtil.focusArea(subs);
		}
		if (elem.data('orig_html')) {
			elem.html(elem.data('orig_html'));
		}
	},

	done : function (mode, res, error) {
		var idpart = EConstants.API_ID[mode],
			elem = $('#ed_' + EUtil.getActiveLangId() + '_extra_' + idpart);

		if (error === undefined) {
			elem.addClass('apidone').removeClass('apistarted apierror');
			if (res !== undefined) {
				EUi.showResult(EPrinter.resultToHTML(mode, res), idpart);
			}
		} else {
			elem.addClass('apierror').removeClass('apistarted apidone').data('orig_html', elem.html()).html(error);
		}
	},

	waiting : 0,
	waitingName : '',
	waitingResults : []
};

window.EFilesLoaded++;
window.ETryInit();
