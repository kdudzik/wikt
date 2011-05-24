if (typeof wed !== 'undefined') {
	alert('Błąd krytyczny - jeden ze skryptów używa jako nazwy globalnej "wed".');
}

mw.loader.load('http://localhost/wikt/parser.js');
mw.loader.load('http://localhost/wikt/wikted.css', 'text/css');

var wed = {
	
	code : '',
	content : {},
	
	prepareForm :
		function(tbox, newform) {
			newform.css({
				'width' : tbox.css('width'),
				'height' : tbox.css('height')
			});
			tbox.before(newform).hide();
			newform.show();
		},
		
	parseContent :
		function() {
			wed.content['txt'] = wed.code;
			wed.content['sections'] = WParser.getSections(wed.code);
		},
		
	fillForm :
		function(newform) {
			//newform.html(wed.content.html);
			var menu = newform.find('#wed_menu');
			var content = newform.find('#wed_content');
			for (var s in wed.content['sections']) {
				var sec = wed.content['sections'][s];
				content.append('<textarea class="wed_section" id="wed_section' + s + '">'+ sec['content'] + '</textarea>');
				$('<li id="wed_menuitem' + s + '" title="' + sec['title'] + '">' + sec['short'] + '</li>')
					.appendTo(menu)
					.data('section', 'wed_section' + s)
					.click(function() {
						content.find('.wed_section').removeClass('active');
						content.find('#' + $(this).data('section')).addClass('active');
						$(this).addClass('active').siblings().removeClass('active');
					});
			};
		
		},

	init :
		function() {
			var tbox = $('#wpTextbox1'),
				newform = $('<div id="wed"><ul id="wed_menu"/><div id="wed_content"/></div>');
			wed.code = tbox.val();
			wed.prepareForm(tbox, newform);
			
			wed.parseContent();
			wed.fillForm(newform);
			
		}
	
	
};

if (mw.config.get('wgAction') == 'edit' || mw.config.get('wgAction') == 'submit') {
	$(document).ready(function() {
		setTimeout(wed.init, 200);
	});
}

/*
$.getJSON(
  mw.util.wikiScript( 'api' ), {
    'format': 'json',
    'action': 'query',
    'titles': 'Main Page',
    'prop': 'revisions'
  }, function( data ) {
    // data.query...
  }
);
*/
