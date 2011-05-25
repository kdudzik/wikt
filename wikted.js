if (typeof Wed !== 'undefined') {
	alert('Błąd krytyczny - jeden ze skryptów używa jako nazwy globalnej "Wed".');
}

mw.loader.load('http://localhost/wikt/wikted.css', 'text/css');

window.WedFiles = [
	'http://localhost/wikt/parser.js'
];
window.WedFilesLoaded = 0;
window.WedFilesToLoad = window.WedFiles.length + 1;
window.WedTryInit = function() {
	if (mw.config.get('wgAction') == 'edit' || mw.config.get('wgAction') == 'submit') {
		if (window.WedFilesLoaded == window.WedFilesToLoad) {
			$(document).ready(Wed.init);
		}
	}
};

for (i in window.WedFiles) {
	mw.loader.load(window.WedFiles[i]);
}

window.WedConstants = {
	templates : {
        'język polski' : 'pl',
        'język angielski' : 'en',
        'język niemiecki' : 'de',
        'język francuski' : 'fr',
        'język włoski' : 'it',
        'język czeski' : 'cs'
	},
	INTRO : '...'

};

window.Wed = {
	
	code : '',
	content : {},
	
	prepareForm :
		function(oldform, newform) {
			newform.css({
				'width' : oldform.css('width'),
				'height' : oldform.css('height')
			});
			oldform.before(newform).hide();
			newform.show();

			var toggleEditor = $('<a href="#" id="toggleEditor">Przełącz edytor</a>');
			toggleEditor.insertAfter('h1:first').click(function() {
				oldform.toggle();
				newform.toggle();
				return false;
			});
		},
		
	parseContent :
		function() {
			Wed.content['txt'] = Wed.code;
			Wed.content['sections'] = WParser.getSections(Wed.code);
		},
		
	fillForm :
		function(newform) {
			var menu = newform.find('#wed_menu');
			var content = newform.find('#wed_content');
			for (var alpha in Wed.content['sections']) {
				Wed.addSection(alpha, menu, content);				
			}
			menu.children(":not(#wed_menuitem_0000)").first().click();
			
			var item = '<li id="wed_menuitemnew">+ dodaj</li>';
			$(item).appendTo(menu).click(Wed.addNewSection);
		
		},

	init :
		function() {
			var tbox = $('#wpTextbox1'),
				oldform = $('.wikiEditor-ui-left'),
				newform = $('\
					<div id="wed">					\
						<ul id="wed_menu"/>			\
						<div id="wed_content"/>		\
					</div>');
			Wed.code = tbox.val();
			Wed.prepareForm(oldform, newform);
			
			Wed.parseContent();
			Wed.fillForm(newform);
			
		},
		
	addNewSection :
		function() {
			var title = prompt('Podaj tytuł', mw.config.get('wgPageName') + ' {{język ...}}');
		},
		
	addSection :
		function(alpha, menu, content) {
			var sec = Wed.content['sections'][alpha];
			content.append('<textarea class="wed_section" id="wed_section' + alpha + '">'+ sec['content'] + '</textarea>');
			
			var item = $('<li id="wed_menuitem_' + alpha + '" title="' 
							+ sec['title'] + '">' + sec['short'] + '</li>');
			item.data('section', 'wed_section' + alpha)
				.click(function() {
					content.find('.wed_section').removeClass('active');
					content.find('#' + $(this).data('section')).addClass('active');
					$(this).addClass('active').siblings().removeClass('active');
				});
			
			var added = false;
			menu.children("li").each(function() {
				if ($(this).attr('id') > item.attr('id')) {
					item.insertBefore($(this));
					added = true;
					return false;
				}
			});
			if (!added) {
				item.appendTo(menu);
			}
							
		}
	
	
};

window.WedFilesLoaded++;
window.WedTryInit();