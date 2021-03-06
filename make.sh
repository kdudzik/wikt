#!/bin/bash

bomstrip-files *.js
rm *.bom

JS=ed.onefile.js
MAINJS=ed.js
CSS=ed.css

echo -n "//<nowiki>
/*global $, jQuery, mw, insertTags: true, checkSelectedText, is_opera, is_opera_seven, is_opera_95 */
/*jslint devel: true, browser: true, sloppy: true, es5: true, indent: 2, regexp: true */

var Ed, EForm, EUtil, EUi, EKeyboard, EApi, EAutomator, EConstants, EStr, EParser, ESectionParser, ESpecialChars, EPrinter;
(function ($) {
  var jPrompt, jAlert, jConfirm,
    css = \"" > $JS
perl -pe 's/\s+/ /g' $CSS | perl -pe 's/"/\\"/g' >> $JS
echo "\";
  mw.util.addCSS(css);" >> $JS

JSFILES=`grep localhost $MAINJS | grep -v loader | cut -c 25- | sed "s/',//g"`

for f in $JSFILES
do
	grep -vE '(EFilesLoaded|ETryInit)' $f | perl -pe 's/(^|\t)/  /g' | perl -pe 's/\s+$/\n/g' | perl -pe 's/\n\n+/\n\n/g' >> $JS
done

echo "
  if ((mw.config.get('wgAction') === 'edit' || mw.config.get('wgAction') === 'submit') &&
      mw.config.get('wgNamespaceNumber') === 0) {
    \$(document).ready(Ed.init);
  }
}(jQuery));
" >> $JS

bomstrip-files *.js
rm *.bom
