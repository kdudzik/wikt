if (typeof Wed !== 'undefined') {
	alert('Błąd krytyczny - jeden ze skryptów używa jako nazwy globalnej "Wed".');
}

mw.loader.load('http://localhost/wikt/parser.js');
mw.loader.load('http://localhost/wikt/wikted.css', 'text/css');

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
			for (var pos in Wed.content['sections']) {
				Wed.addSection(pos, menu, content);				
			}
			$(".wed_menuitem1").click();
			
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
		function(pos, menu, content) {
			var sec = Wed.content['sections'][pos];
			content.append('<textarea class="wed_section" id="wed_section' + pos + '">'+ sec['content'] + '</textarea>');
			
			var item = '<li class="wed_menuitem' + pos + '" id="wed_menuitem_' + sec['lang'] + '" title="' 
							+ sec['title'] + '">' + sec['short'] + '</li>';
			$(item).appendTo(menu)
				.data('section', 'wed_section' + pos)
				.click(function() {
					content.find('.wed_section').removeClass('active');
					content.find('#' + $(this).data('section')).addClass('active');
					$(this).addClass('active').siblings().removeClass('active');
				});
		}
	
	
};

if (mw.config.get('wgAction') == 'edit' || mw.config.get('wgAction') == 'submit') {
	$(document).ready(function() {
		setTimeout(Wed.init, 200);
	});
}
