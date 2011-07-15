
function disCallApi(query) // z [[MediaWiki:Gadget-lib-beau.js]]
{
	var url = mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/api.php?';
	query['format'] = 'json';
	url += $.param(query);
	mw.loader.load(url);
}

function cb(res) {
	for (var page in res.query.pages) {
		page = res.query.pages[page];
		var c = page.revisions[0]['*'].replace(/[\s\S]*\|\s*kod\s*=\s*(\w+)[\s\S]*/g, '$1');
		console.log(page.title.replace('Szablon:język ', '') + ' : ' + c);
	}
}


for (t in EdConstants.LANG_CODES_LONG) {
	var tit = 'Szablon:język ' + t;
	disCallApi({
		action:'query',
		prop:'revisions',
		rvprop:'content',
		ns:10,
		titles:tit,
		pllimit:500,
		callback:'cb'
	});
}
