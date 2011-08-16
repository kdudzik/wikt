#!/bin/bash

bomstrip-files *.js
rm *.bom

JS=ed.onefile.js
MAINJS=ed.js
CSS=ed.css

echo -n "//<nowiki>
/*global $: true, mw: true, window: true, console: true, setTimeout: true, clearTimeout: true */
/*global document: true, insertTags: true, jQuery: true, alert: true */
/*global checkSelectedText: true, is_opera: true, is_opera_seven: true, is_opera_95: true */

/*jslint es5: true, indent: 4, sloppy: true */

var Ed, EForm, EUtil, EUi, EKeyboard, EApi, EAutomator, EConstants, EStr, EParser, ESectionParser, ESpecialChars, EPrinter;
var jPrompt, jAlert, jConfirm, insertTags2;

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

echo "if ((mw.config.get('wgAction') === 'edit' || mw.config.get('wgAction') === 'submit') &&" >> $JS
echo "		mw.config.get('wgNamespaceNumber') === 0) {" >> $JS
echo "	\$(document).ready(Ed.init);" >> $JS
echo "}" >> $JS

bomstrip-files *.js
rm *.bom
