#!/bin/bash

bomstrip-files *.js
rm *.bom

JS=ed.onefile.js
MAINJS=ed.js
CSS=ed.css

echo -n "//<nowiki>
/*global $: true, mw: true, window: true, console: true */
var Ed, EForm, EUtil, EUi, EKeyboard, EApi, EAutomator, EConstants, EStr, EParser, ESectionParser, ESpecialChars, EPrinter;
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
echo "	mw.config.get('wgNamespaceNumber') === 0) {" >> $JS
echo "	\$(document).ready(Ed.init);" >> $JS
echo "}" >> $JS

bomstrip-files *.js
rm *.bom
