mw.loader.load('http://localhost/wikt/wikted.css', 'text/css');
mw.loader.load('http://localhost/wikt/jqalert/jquery.alerts.css', 'text/css');

window.EdFiles = [
                'http://localhost/wikt/parser.js',
                'http://localhost/wikt/constants.js',
            	'http://localhost/wikt/jqalert/jquery.alerts.js'
];
window.EdFilesLoaded = 0;
window.EdFilesToLoad = window.EdFiles.length + 1;

window.EdTryInit = function() {
	if (mw.config.get('wgAction') == 'edit' || mw.config.get('wgAction') == 'submit') {
		if (window.EdFilesLoaded == window.EdFilesToLoad) {
			$(document).ready(Ed.init);
		}
	}
};

for (i in window.EdFiles) {
	mw.loader.load(window.EdFiles[i]);
}

window.Ed = {
	
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

			var toggleEditor = $('<a href="#" id="toggleEditor">' + EdStr.TOGGLE_EDITOR + '</a>');
			toggleEditor.insertAfter('h1:first').click(function() {
				oldform.toggle();
				newform.toggle();
				return false;
			});
		},
		
	parseContent :
		function() {
			Ed.content['txt'] = Ed.code;
			Ed.content['sections'] = EParser.getSections(Ed.code);
		},
		
	fillForm :
		function(newform) {
			var menu = newform.find('#ed_menu');
			var content = newform.find('#ed_content');
			for (var alpha in Ed.content['sections']) {
				Ed.addSection(alpha, menu, content);				
			}
			menu.children(":not(#ed_menuitem_0000)").first().click();
			
			var item = '<li id="ed_menuitemnew">' + EdStr.ADD + '</li>';
			$(item).appendTo(menu).click(function() {
				Ed.addNewSection(menu, content);
			});
		
		},

	init :
		function() {
			var tbox = $('#wpTextbox1'),
				oldform = $('.wikiEditor-ui-left'),
				newform = $('\
					<div id="ed">					\
						<ul id="ed_menu"/>			\
						<div id="ed_content"/>		\
					</div>');
			Ed.code = tbox.val();
			Ed.prepareForm(oldform, newform);
			
			Ed.parseContent();
			Ed.fillForm(newform);
			
		},
		
	addNewSection :
		function(menu, content) {
			jPrompt(EdStr.ADD_SECTION_MESSAGE, mw.config.get('wgPageName') + EdStr.ADD_SECTION_TEMPLATE, 
					EdStr.ADD_SECTION_TITLE, function(val) {
						if (!val) {
							return false;
						}
						var newSection = EParser.getSectionFromString(val);
						var alpha = newSection['alpha'];
						Ed.content['sections'][alpha] = newSection;
						Ed.addSection(alpha, menu, content);
						$('#ed_menuitem_' + alpha).click();
					});
		},
		
	addSection :
		function(alpha, menu, content) {
			var sec = Ed.content['sections'][alpha];
			content.append('<textarea class="ed_section" id="ed_section_' + alpha + '">'+ sec['content'] + '</textarea>');
			
			var item = $('<li id="ed_menuitem_' + alpha + '" title="' 
							+ sec['title'] + '">' + sec['short'] + '</li>');
			item.data('section', 'ed_section_' + alpha)
				.click(function() {
					content.find('.ed_section').removeClass('active');
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

window.EdFilesLoaded++;
window.EdTryInit();