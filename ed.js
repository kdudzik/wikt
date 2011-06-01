mw.loader.load('http://localhost/wikt/ed.css', 'text/css');
mw.loader.load('http://localhost/wikt/jqalert/jquery.alerts.css', 'text/css');
mw.loader.load('http://localhost/wikt/tinytips/jquery.tinytips.css', 'text/css');

window.EdFiles =
[
	'http://localhost/wikt/ed.main.js',
	'http://localhost/wikt/ed.parser.js',
	'http://localhost/wikt/ed.printer.js',
	'http://localhost/wikt/ed.constants.js',
	'http://localhost/wikt/ed.ui.js',
	'http://localhost/wikt/jqalert/jquery.alerts.js',
	'http://localhost/wikt/tinytips/jquery.tinytips.js',
	'http://localhost/wikt/jquery.autoresize.js',
	'http://localhost/wikt/jquery.livequery.js',
];
window.EdFilesLoaded = 0;
window.EdFilesToLoad = window.EdFiles.length + 1;

window.EdTryInit = function() {
	if (window.EdFilesLoaded == window.EdFilesToLoad) {
		$(document).ready(Ed.init);
	}
};

if ((mw.config.get('wgAction') == 'edit' || mw.config.get('wgAction') == 'submit')
		&& mw.config.get('wgNamespaceNumber') == 0) {	
	for (i in window.EdFiles) {
		mw.loader.load(window.EdFiles[i]);
	}
		
	window.EdFilesLoaded++;
	window.EdTryInit();
}