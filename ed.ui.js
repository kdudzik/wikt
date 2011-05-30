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
		
		EdUi.prepareFormSections();
	},

		
	prepareFormSections :
	function() {
		for (var alpha in Ed.content['sections']) {
			EdUi.addSection(alpha);
			EdUi.prepareFormSubsections(alpha);
		}
		
		var item = '<li id="ed_menuitem_new" class="tip">' + EdStr.ADD + '</li>';
		$(item).appendTo(EdUi.menu).click(function() {
			EdUi.addNewSection();
		}).data('tip', EdStr.ADD_SECTION);
		
		$('textarea.newform').autoResize().trigger('change');
		EdUi.menu.children(":not(#ed_menuitem_0000)").first().click();
	},
		
	addSection :
	function(alphaname) {
		var sec = Ed.content.sections[alphaname];
		var fset = $('<fieldset class="ed_section" id="ed_section_' + alphaname + '"/>');
		
		fset.appendTo(EdUi.content);
		
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
				$('textarea.newform').trigger('change');
			});
		
		// insert alphabetically
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
					var sec = EParser.getSectionFromInput(val);
					
					if (sec['code']) {
						var alpha = sec['alpha'];
						if (Ed.content['sections'][alpha] !== undefined) {
							jAlert(EdStr.ADD_SECTION_ALREADY, EdStr.ADD_SECTION_ALREADY_TITLE);
						}
						else {
							Ed.content.sections[alpha] = sec;
							ESectionParser.parse(sec, alpha);
							
							EdUi.addSection(alpha);
							EdUi.prepareFormSubsections(alpha);
						}
						$('#ed_menuitem_' + alpha).click();
						$('#ed_section_' + alpha + ' textarea').autoResize().trigger('change');
					}
					else {
						jAlert(EdStr.ADD_SECTION_NONEXISTENT, EdStr.ADD_SECTION_NONEXISTENT_TITLE, function() {
							EdUi.addNewSection();
						});							
					}
				});
	},
		
	prepareFormSubsections :
	function(alpha) {
		var section = Ed.content['sections'][alpha];
		for (i = 0; i < section.subsections.length; i++) {
			var obj = EdUi.getSubsectionObj(alpha, section.subsections[i]);
			$('#ed_section_' + alpha).append(obj);
		}
	},

	labeledInput :
	function(name, label, value) {
		return '<label class="newform" for="' + name + '">' + label + '</label>\
				<textarea class="newform" name="' + name + '" id="' + name + '">' + value + '</textarea><br/>';
	},
	
	getSubsectionObj :
	function(alpha, subsection) {
		switch (subsection.title) {
		case '':
			//return EdUi.getSubsectionIntro(alpha, subsection.content);
		default:
			var p = $('<p id="ed_subsection_' + alpha + '_' + subsection.title + '"/>');
			p.append(EdUi.labeledInput('ed_' + alpha + '_' + subsection.title, 
					EdConstants.SUBSECTION_TITLE[subsection.title], subsection.content));
			return p;
		}
	},
	
	getSubsectionIntro :
	function(alpha, content) {
		var p = $('<p id="ed_subsection_' + alpha + '_intro"/>');
		p.append(EdUi.labeledInput('ed_' + alpha + '_intro', EdStr.INTRO, content));
		return p;
	}
};


window.EdFilesLoaded++;
window.EdTryInit();