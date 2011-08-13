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

	ask : function(query, callback, url) {
		if (url == undefined) {
			url = EApi.url();
		}
		query['action'] = 'query';
		query['format'] = 'json';
		query['callback'] = callback;
		url += $.param(query);
		mw.loader.load(url);
	}
};

window.EFilesLoaded++;
window.ETryInit();
