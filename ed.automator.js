window.EAutomator = {
	search : function(title, cb, lang) {
		var query = { titles: title, prop: 'revisions', rvprop: 'content' };
		EApi.ask(query, "EAutomator." + cb, EApi.url(lang));
	},

	searchCB : function(res) {
		$.each(res.query.pages, function(i, page) {
			console.log(page.revisions[0]['*']);
		});
	},

	initTest : function() {
		EAutomator.search('dupa', 'searchCB', 'de');
		EAutomator.search('dupa', 'searchCB', 'fr');
		EAutomator.search('dupa', 'searchCB', 'ru');
	}
};

window.EFilesLoaded++;
window.ETryInit();
