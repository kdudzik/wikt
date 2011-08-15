window.EApi = {
	url : function(lang, project) {
		if (lang == undefined) {
			lang = 'pl';
		}
		if (project == undefined) {
			project = EConstants.WIKTIONARY;
		}
		return "http://" + lang + "." + project + ".org/w/api.php?";
	},

	commonsUrl : function() {
		return EApi.url('commons', EConstants.WIKIMEDIA);
	},

	wikiUrl : function(lang) {
		return EApi.url(lang, EConstants.WIKIPEDIA);
	},

	_ask : function(query, url) {
		if (url == undefined) {
			url = EApi.url();
		}
		query['action'] = 'query';
		query['format'] = 'json';
		query['meta'] = 'siteinfo';
		query['callback'] = 'EApi.callback';
		url += $.param(query);
		mw.loader.load(url);
	},

	ask : function(query, callback, url) {
		if (EApi.waiting) {
			alert(EStr.WAITING_FOR_API);
			return -1;
		}
		EApi.waitingName = callback;
		EApi.waiting = 1;
		EApi._ask(query, url);
	},

	askMore : function(query, callback, urls) {
		if (EApi.waiting) {
			alert(EStr.WAITING_FOR_API);
			return -1;
		}
		EApi.waitingName = callback;
		EApi.waiting = urls.length;
		$.each(urls, function(i, url) {
			EApi._ask(query, url);
		});
	},

	callback : function(res) {
		EApi.waitingResults.push(res);
		if (!--EApi.waiting) {
			EUtil.executeFn(EApi.waitingName, window, EApi.waitingResults);
			EApi.waitingName = '';
			EApi.waitingResults = [];
		}
	},

	done : function(idpart, error) {
		var elem = $('#ed_' + EUtil.getActiveLangId() + '_extra_' + idpart);
		if (error != undefined) {
			elem.addClass('apierror').removeClass('apistarted apidone').html(error);
		} else {
			elem.addClass('apidone').removeClass('apistarted apierror');
		}
	},

	started : function(idpart, subs) {
		$('#ed_' + EUtil.getActiveLangId() + '_extra_' + idpart).removeClass('apidone apierror').addClass('apistarted');
		if (subs != undefined) {
			EUtil.focusArea(subs);
		}
	},

	waiting : 0,
	waitingName : '',
	waitingResults : [],
};

window.EFilesLoaded++;
window.ETryInit();
