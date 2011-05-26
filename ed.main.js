/**
 * 
 */

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
			
			var item = '<li id="ed_menuitem_new">' + EdStr.ADD + '</li>';
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
			// TODO: Spr. czy istnieje
		},
		
	addSection :
		function(alpha, menu, content) {
			var sec = Ed.content['sections'][alpha];
			var fset = $('<fieldset class="ed_section" id="ed_section_' + alpha + '"/>');
			
			fset.appendTo(content).html('<textarea>' + sec['content'] + '</textarea>');
			
			if (alpha == '0000') {
				sec['title'] = EdConstants.INTRO;
			}
			
			var caption = sec['code'] ? sec['code'] : sec['title'];
			var item = $('<li id="ed_menuitem_' + alpha + '" title="' 
							+ sec['title'] + '">' + caption + '</li>');
			item.data({
					'section' : 'ed_section_' + alpha,
					'code' : sec['code']
				})
				.click(function() {
					content.find('.ed_section').removeClass('active');
					content.find('#' + $(this).data('section')).addClass('active');
					$(this).addClass('active').siblings().removeClass('active');
				});
			
			var added = false;
			menu.children("li").each(function() {
				if ($(this).attr('id') > item.attr('id') || $(this).attr('id') == 'ed_menuitem_new') {
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