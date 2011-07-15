//mw.loader.load('http://pl.wiktionary.org/w/index.php?title=Wikipedysta:ToSter/ed.onefile.js&action=raw&ctype=text/javascript');
//mw.loader.load('http://localhost/wikt/ed.onefile.js');
/* */

mw.loader.load('http://localhost/wikt/ed.css', 'text/css');

window.EFiles =
[
	'http://localhost/wikt/ed.main.js',
	'http://localhost/wikt/ed.parser.js',
	'http://localhost/wikt/ed.printer.js',
	'http://localhost/wikt/ed.constants.js',
	'http://localhost/wikt/ed.ui.js',
	'http://localhost/wikt/ed.keyboard.js',
	'http://localhost/wikt/jquery.alerts.js',
	'http://localhost/wikt/jquery.tooltip.js',
	'http://localhost/wikt/jquery.autoresize.js',
	'http://localhost/wikt/jquery.livequery.js',
];
window.EFilesLoaded = 0;
window.EFilesToLoad = window.EFiles.length + 1;

window.ETryInit = function() {
	if (window.EFilesLoaded == window.EFilesToLoad) {
		$(document).ready(Ed.init);
	}
};

if ((mw.config.get('wgAction') == 'edit' || mw.config.get('wgAction') == 'submit')
		&& mw.config.get('wgNamespaceNumber') == 0) {
	for (i in window.EFiles) {
		mw.loader.load(window.EFiles[i]);
	}

	window.EFilesLoaded++;
	window.ETryInit();
}
/* */
