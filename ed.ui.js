window.EdUi = {
	
	oldform : undefined,
	instruction : undefined,
	form : $('<div id="ed"/>'),
	menu : $('<ul id="ed_menu"/>'),
	content : $('<div id="ed_content"/>'),
	usingNew : true,

	prepareForm : function(oldform, instruction) {
		this.oldform = oldform;
		this.instruction = instruction;
		EdUi.form.append(EdUi.menu).append(EdUi.content);
		oldform.before(EdUi.form).hide();
		instruction.hide();
		EdUi.form.show();

		var toggleEditor = $('<a href="#" id="toggleEditor">' + EdStr.TOGGLE_EDITOR + '</a>');
		toggleEditor.insertAfter('h1:first').click(function() {
			oldform.toggle();
			instruction.toggle();
			EdUi.form.toggle();
			if (EdUi.usingNew) {
				EdUi.oldform.find('textarea').val(EPrinter.recalculateCode(this.form));
			}
			else {
				// TODO update forms
			}
			EdUi.usingNew = !EdUi.usingNew;
			return false;
		});
		
		EdUi.prepareFormSections();
		EdUi.rebindFormActions();
	},

		
	prepareFormSections : function() {
		for (var alpha in Ed.content.sections) {
			EdUi.addSection(alpha);
			EdUi.prepareFormSubsections(alpha);
		}
		
		if (EUtil.getParameter('section') == '') {
			var addItem = $('<li id="ed_menuitem_new" class="tip">' + EdStr.ADD + '</li>');
			addItem.appendTo(EdUi.menu).click(function() {
				EdUi.addNewSection();
			}).data('tip', EdStr.ADD_SECTION);
		}
		
		$('textarea.newform').autoResize().trigger('change');
		
		var firstTab = EdUi.menu.children(":not(#ed_menuitem_0000)").first();
		if (firstTab.attr('id') != 'ed_menuitem_new') {
			firstTab.click();
		}
		else if (Ed.content.sections['0000'] != undefined) {
			$('#ed_menuitem_0000').click();
		}
		else {
			$('#ed_menuitem_new').click();
		}
	},
		
	addSection : function(alphaname) {
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

	addNewSection : function() {
		var defaultLang = EUtil.getSection();
		var defaultText = defaultLang ? defaultLang : mw.config.get('wgPageName') + EdStr.ADD_SECTION_TEMPLATE;
		jPrompt(EdStr.ADD_SECTION_MESSAGE, defaultText, EdStr.ADD_SECTION_TITLE,
			function(val) {
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
		
	prepareFormSubsections : function(alpha) {
		var section = Ed.content['sections'][alpha];
		for (i = 0; i < section.subsections.length; i++) {
			var obj = EdUi.getSubsectionObj(alpha, section, section.subsections[i]);
			$('#ed_section_' + alpha).append(obj);
		}
	},
	
	getSubsectionObj : function(alpha, section, subsection) {
		var name = alpha + '_' + subsection.title.replace(' ', '_');
		
		var p = $('<p id="ed_subsection_' + name + '"/>');
		var caption = EdConstants.SUBSECTION_TITLE[subsection.title];
		var label = $('<label class="newform" for="ed_' + name + '">' + caption + '</label>');
		var textarea = $('<textarea class="newform" name="ed_' + name + '" id="ed_' + name + '">'
				+ subsection.content + '</textarea>');
		if (ESectionParser.obligatorySubsection(subsection.title, section.mode)) {
			label.addClass('oblig').append(EdStr.OBLIGATORY_SUBSECTION);
			textarea.addClass('oblig');
		}
		p.append(label).append(textarea);
		
		return p;
	},
	
	rebindFormActions : function() {
		this.form.find('textarea').removeAttr('name');
		this.form.parent('form').submit(function() {
			if (EdUi.usingNew) {
				EdUi.oldform.find('textarea').val(EPrinter.recalculateCode(this.form));
			}
			return true;
		});
	}
};


window.EdFilesLoaded++;
window.EdTryInit();