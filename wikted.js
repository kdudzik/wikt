if (typeof wed !== 'undefined') {
	alert('Błąd krytyczny - jeden ze skryptów używa jako nazwy globalnej "wed".');
}

mw.loader.load('http://localhost/wikt/parser.js');
mw.loader.load('http://localhost/wikt/wikted.css', 'text/css');

var wed = {
	
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
			wed.content['txt'] = wed.code;
			wed.content['sections'] = WParser.getSections(wed.code);
		},
		
	fillForm :
		function(newform) {
			var menu = newform.find('#wed_menu');
			var content = newform.find('#wed_content');
			for (var s in wed.content['sections']) {
				var sec = wed.content['sections'][s];
				content.append('<textarea class="wed_section" id="wed_section' + s + '">'+ sec['content'] + '</textarea>');
				
				var item = '<li id="wed_menuitem' + s + '" title="' + sec['title'] + '">' + sec['short'] + '</li>';
				$(item).appendTo(menu)
					.data('section', 'wed_section' + s)
					.click(function() {
						content.find('.wed_section').removeClass('active');
						content.find('#' + $(this).data('section')).addClass('active');
						$(this).addClass('active').siblings().removeClass('active');
					});
			};
			$("#wed_menuitem1").click();
		
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
			wed.code = tbox.val();
			wed.prepareForm(oldform, newform);
			
			wed.parseContent();
			wed.fillForm(newform);
			
		}
	
	
};

if (mw.config.get('wgAction') == 'edit' || mw.config.get('wgAction') == 'submit') {
	$(document).ready(function() {
		setTimeout(wed.init, 200);
	});
}
