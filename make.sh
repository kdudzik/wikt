#!/bin/bash

JS=ed.onefile.js
MAINJS=ed.js
CSS=ed.onefile.css
CSS_FILES="ed.css
jqalert/jquery.alerts.css
tinytips/jquery.tinytips.css"

echo "" > $CSS
for f in $CSS_FILES
do
	cat $f >> $CSS
	echo "" >> $CSS
done

echo "mw.loader.load('http://pl.wiktionary.org/w/index.php?title=Wikipedysta:ToSter/ed.onefile.css&action=raw&ctype=text/css', 'text/css');" > $JS

JSFILES=`grep localhost $MAINJS | grep -v loader | cut -c 25- | sed "s/',//g"`

for f in $JSFILES
do 
	grep -v EFilesLoaded $f | grep -v ETryInit >> $JS
	echo "" >> $JS
done

echo "if ((mw.config.get('wgAction') == 'edit' || mw.config.get('wgAction') == 'submit')" >> $JS
echo "	&& mw.config.get('wgNamespaceNumber') == 0) {" >> $JS	
echo '	$(document).ready(Ed.init);' >> $JS
echo '}' >> $JS