#!/bin/bash

bomstrip-files *.js
rm *.bom

JS=ed.onefile.js
MAINJS=ed.js
CSS=ed.css

echo -n "//<nowiki>
/*global $, jQuery, mw, insertTags: true, checkSelectedText, is_opera, is_opera_seven, is_opera_95 */
/*jslint devel: true, browser: true, sloppy: true, es5: true, indent: 4, regexp: true */

var Ed, EForm, EUtil, EUi, EKeyboard, EApi, EAutomator, EConstants, EStr, EParser, ESectionParser, ESpecialChars, EPrinter;
var jPrompt, jAlert, jConfirm;
var css = \"" > $JS
sed 's/$/\\/g' $CSS | sed 's/\"/\\\"/g' >> $JS
echo "\";
mw.util.addCSS(css);" >> $JS

JSFILES=`grep localhost $MAINJS | grep -v loader | cut -c 25- | sed "s/',//g"`

for f in $JSFILES
do
	grep -v EFilesLoaded $f | grep -v ETryInit >> $JS
	echo "" >> $JS
done

echo "
(function () {
	if ((mw.config.get('wgAction') === 'edit' || mw.config.get('wgAction') === 'submit') &&
			mw.config.get('wgNamespaceNumber') === 0) {
		\$(document).ready(Ed.init);
	}
}());
" >> $JS

bomstrip-files *.js
rm *.bom
