window.EdUi = {
	
	form :
		$('<div id="ed"/>'),
	menu :
		$('<ul id="ed_menu"/>'),
	content :
		$('<div id="ed_content"/>'),

	prepareForm :
	function(oldform) {
		EdUi.form.append(EdUi.menu).append(EdUi.content);
		oldform.before(EdUi.form).hide();
		EdUi.form.show();

		var toggleEditor = $('<a href="#" id="toggleEditor">' + EdStr.TOGGLE_EDITOR + '</a>');
		toggleEditor.insertAfter('h1:first').click(function() {
			oldform.toggle();
			EdUi.form.toggle();
			return false;
		});
	},

		
	prepareFormSections :
	function() {
		for (var alpha in Ed.content['sections']) {
			EdUi.addSection(alpha);				
		}
		EdUi.menu.children(":not(#ed_menuitem_0000)").first().click();
		
		var item = '<li id="ed_menuitem_new" class="tip">' + EdStr.ADD + '</li>';
		$(item).appendTo(EdUi.menu).click(function() {
			EdUi.addNewSection();
		}).data('tip', EdStr.ADD_SECTION);		
	},
		
	addSection :
	function(alphaname) {
		var sec = Ed.content.sections[alphaname];
		var fset = $('<fieldset class="ed_section" id="ed_section_' + alphaname + '"/>');
		
		fset.appendTo(EdUi.content).html('<textarea>' + sec['content'] + '</textarea>');
		fset.find('textarea').autoResize();
		
		if (alphaname == '0000') {
			sec['code'] = EdConstants.INTRO;
			sec['title'] = '';
		}
		
		var item = $('<li id="ed_menuitem_' + alphaname + '" class="tip">' + sec['code'] + '</li>');
		var tip = alphaname == '0000'
				? EdStr.INTRO_SECTION
				: EParser.insideTemplate(sec['title']) + '\<br/><small>tytuł sekcji: <tt>' + sec['title'] + '</tt></small>';
		item.data({
				'section' : 'ed_section_' + alphaname,
				'code' : sec['code'],
				'tip' : tip 
			})
			.click(function() {
				EdUi.content.find('.ed_section').removeClass('active');
				EdUi.content.find('#' + $(this).data('section')).addClass('active');
				$(this).addClass('active').siblings().removeClass('active');
			});
		
		var added = false;
		EdUi.menu.children("li").each(function() {
			if ($(this).attr('id') > item.attr('id') || $(this).attr('id') == 'ed_menuitem_new') {
				item.insertBefore($(this));
				added = true;
				return false;
			}
		});
		if (!added) {
			item.appendTo(EdUi.menu);
		}			
	},

	addNewSection :
	function() {
		jPrompt(EdStr.ADD_SECTION_MESSAGE, mw.config.get('wgPageName') + EdStr.ADD_SECTION_TEMPLATE, 
				EdStr.ADD_SECTION_TITLE, function(val) {
					if (!val) {
						return false;
					}
					var newSection = EParser.getSectionFromInput(val);
					
					if (newSection['code']) {
						var alpha = newSection['alpha'];
						if (Ed.content['sections'][alpha] !== undefined) {
							jAlert(EdStr.ADD_SECTION_ALREADY, EdStr.ADD_SECTION_ALREADY_TITLE);
						}
						else {
							Ed.content['sections'][alpha] = newSection;
							EdUi.addSection(alpha);
						}
						$('#ed_menuitem_' + alpha).click().tooltip('tip');
					}
					else {
						jAlert(EdStr.ADD_SECTION_NONEXISTENT, EdStr.ADD_SECTION_NONEXISTENT_TITLE, function() {
							EdUi.addNewSection();
						});							
					}
				});
	},
		
	prepareFormSubsections :
	function() {
		
	}
};


window.EdFilesLoaded++;
window.EdTryInit();