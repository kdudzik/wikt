window.EUi = {
	
	oldform : undefined,
	instruction : undefined,
	form : $('<div id="ed"/>'),
	menu : $('<ul id="ed_menu"/>'),
	content : $('<div id="ed_content"/>'),
	usingNew : true,

	prepareForm : function(oldform, instruction) {
		this.oldform = oldform;
		this.instruction = instruction;
		EUi.form.append(EUi.menu).append(EUi.content);
		oldform.before(EUi.form);
		EUi.usingNew = $.cookie('usenew') == null || $.cookie('usenew') == 1;
		
		if (EUi.usingNew) {
			oldform.hide();
			instruction.hide();
			EUi.form.show();
		}

		var toggleEditor = $('<a href="#" id="toggleEditor">' + EStr.TOGGLE_EDITOR + '</a>');
		toggleEditor.insertAfter('h1:first').click(function() {
			oldform.toggle();
			instruction.toggle();
			EUi.form.toggle();
			if (EUi.usingNew) {
				EUi.oldform.find('textarea').val(EPrinter.recalculateCode(this.form));
			}
			else {
				// TODO update forms
				$('textarea.newform').trigger('change');
			}
			EUi.usingNew = !EUi.usingNew;
			$.cookie('usenew', +EUi.usingNew);
			return false;
		});
		
		EUi.prepareFormSections();
		EUi.rebindFormActions();
	},

	clickSection : function() {
		var firstTab = EUi.menu.children(":not(#ed_menuitem_0000)").first();
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
		
	prepareFormSections : function() {
		for (var alpha in Ed.content.sections) {
			EUi.addSection(alpha);
			EUi.prepareFormSubsections(alpha);
		}
		
		if (EUtil.getParameter('section') == '') {
			var addItem = $('<li id="ed_menuitem_new" class="tip">' + EStr.ADD + '</li>');
			addItem.appendTo(EUi.menu).click(function() {
				EUi.addNewSection();
			}).data('tip', EStr.ADD_SECTION);
		}
		
		// FIXME Change nie działa przy przełączeniu usenew 0->1
		EUi.clickSection();
		$('textarea.newform').autoResize().trigger('change');
	},
		
	addSection : function(alphaname) {
		var sec = Ed.content.sections[alphaname];
		var fset = $('<fieldset class="ed_section" id="ed_section_' + alphaname + '"/>');
		
		fset.appendTo(EUi.content);
		
		if (alphaname == '0000') {
			sec.code = EConstants.INTRO;
			sec.title = '';
		}
		
		var item = $('<li id="ed_menuitem_' + alphaname + '" class="tip">' + sec.code + '</li>');
		var tip = alphaname == '0000'
				? EStr.INTRO_SECTION
				: EParser.insideTemplate(sec.title) + '\<br/><small>tytuł sekcji: <tt>' + sec.title + '</tt></small>';
		item.data({
				'section' : 'ed_section_' + alphaname,
				'code' : sec['code'],
				'tip' : tip 
			})
			.click(function() {
				EUi.content.find('.ed_section').removeClass('active');
				EUi.content.find('#' + $(this).data('section')).addClass('active');
				$(this).addClass('active').siblings().removeClass('active');
				$('textarea.newform').trigger('change');
			});
		
		// insert alphabetically
		var added = false;
		EUi.menu.children("li").each(function() {
			if ($(this).attr('id') > item.attr('id') || $(this).attr('id') == 'ed_menuitem_new') {
				item.insertBefore($(this));
				added = true;
				return false;
			}
		});
		if (!added) {
			item.appendTo(EUi.menu);
		}			
	},

	addNewSection : function() {
		var defaultLang = EUtil.getSection();
		if (!defaultLang) {
			defaultLang = $.cookie('lastAdded');
		}
		var defaultText = defaultLang ? defaultLang : mw.config.get('wgPageName') + EStr.ADD_SECTION_TEMPLATE;
		var message = defaultLang ? EStr.ADD_SECTION_MESSAGE_DEFAULT : EStr.ADD_SECTION_MESSAGE; 
		
		jPrompt(message, defaultText, EStr.ADD_SECTION_TITLE,
			function(val) {
				if (!val) {
					return false;
				}
				var sec = EParser.getSectionFromInput(val);
				
				if (sec['code']) {
					var alpha = sec['alpha'];
					if (Ed.content['sections'][alpha] !== undefined) {
						jAlert(EStr.ADD_SECTION_ALREADY, EStr.ADD_SECTION_ALREADY_TITLE);
					}
					else {
						Ed.content.sections[alpha] = sec;
						ESectionParser.parse(sec, alpha);
						
						EUi.addSection(alpha);
						EUi.prepareFormSubsections(alpha);
						$.cookie('lastAdded', sec['code']);
					}
					$('#ed_menuitem_' + alpha).click();
					$('#ed_section_' + alpha + ' textarea').autoResize().trigger('change');
				}
				else {
					jAlert(EStr.ADD_SECTION_NONEXISTENT, EStr.ADD_SECTION_NONEXISTENT_TITLE, function() {
						EUi.addNewSection();
					});							
				}
			});
	},
	
	editSectionTitle : function(alpha, section) {
		jPrompt(EStr.EDIT_SECTION_TITLE_MESSAGE, section.title, EStr.EDIT_SECTION_TITLE, function(res) {
			if (!res) {
				return;
			}
			section.title = res;
			var tip = EParser.insideTemplate(res) + '\<br/><small>tytuł sekcji: <tt>' + res + '</tt></small>';
			$('#ed_menuitem_' + alpha).data('tip', tip);
		});
	},
	
	deleteSection : function(alpha, section, force) {
		var del = function() {
			delete Ed.content.sections[alpha];
			$('#ed_menuitem_' + alpha).remove();
			$('#ed_section_' + alpha).remove();
			EUi.clickSection();
		};
		if (force) {
			del();
		}
		else {
			jConfirm(EStr.DELETE_SECTION_MESSAGE, EStr.DELETE_SECTION_TITLE, function(res) {
				if (res) { del(); }
			});
		}
	},
	
	deleteEmptySections : function() {
		for (var alpha in Ed.content.sections) {
			var sec = Ed.content.sections[alpha];
			var empty = true;
			$('#ed_section_' + alpha).find('textarea').each(function() {
				if ($(this).val()) {
					empty = false;
				}
			});
			if (empty) {
				EUi.deleteSection(alpha, sec, 1);
			}
		}
	},
		
	prepareFormSubsections : function(alpha) {
		var section = Ed.content['sections'][alpha];
		var fset = $('#ed_section_' + alpha);
				
		if (alpha != '0000') {
			var editlink = $('<a href="#"/>').text(EStr.EDIT_SECTION_TITLE).click(function() {
				EUi.editSectionTitle(alpha, section);
				return false;
			});
			var deletelink = $('<a href="#"/>').text(EStr.DELETE_SECTION).click(function() {
				EUi.deleteSection(alpha, section);
				return false;
			});
			fset.append($('<p class="top"/>').append(editlink).append(deletelink));
		}
		
		for (i = 0; i < section.subsections.length; i++) {
			if (section.subsections[i].active) {
				var obj = EUi.getSubsectionObj(alpha, section, section.subsections[i]);
				fset.append(obj);
			}
		}
	},
	
	getSubsectionObj : function(alpha, section, subsection) {
		var name = alpha + '_' + subsection.title.replace(' ', '_');
		
		var p = $('<p id="ed_subsection_' + name + '"/>');
		var caption = EConstants.SUBSECTION_TITLE[subsection.title];
		var label = $('<label class="newform" for="ed_' + name + '">' + caption + '</label>');
		var textarea = $('<textarea class="newform" name="ed_' + name + '" id="ed_' + name + '">'
				+ subsection.content + '</textarea>');
		if (ESectionParser.obligatorySubsection(subsection, section)) {
			label.addClass('oblig_subsection').append(EStr.OBLIGATORY_SUBSECTION);
			textarea.addClass('oblig_subsection');
		}
		else if (ESectionParser.botSubsection(subsection, section)) {
			label.addClass('bot_subsection').append(EStr.BOT_SUBSECTION);
			textarea.addClass('bot_subsection');
		}
		p.append(label).append(textarea);
		
		return p;
	},
	
	rebindFormActions : function() {
		this.form.find('textarea').removeAttr('name');
		this.form.parent('form').submit(function() {
			if (EUi.usingNew) {
				EUi.deleteEmptySections();
				EUi.oldform.find('textarea').val(EPrinter.recalculateCode(this.form));
			}
			return true;
		});
	}
};


window.EFilesLoaded++;
window.ETryInit();