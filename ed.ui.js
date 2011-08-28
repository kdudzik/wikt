EUi = {

	oldform : undefined,
	tbox : undefined,
	form : $('<div id="ed"/>'),
	menu : $('<ul id="ed_menu"/>'),
	content : $('<div id="ed_content"/>'),
	usingNew : true,
	activeLangCode : '',
	activeLangId : '',

	prepareForm : function (oldform, tbox) {
		var toggleEditor;

		this.oldform = oldform;
		this.tbox = tbox;
		EUi.form.append(EUi.menu).append(EUi.content);
		oldform.first().before(EUi.form);
		EUi.usingNew = $.cookie('usenew') === null || $.cookie('usenew') === '1';

		if (EUi.usingNew) {
			oldform.hide();
			EUi.form.show();
		}

		toggleEditor = $('<a href="#" id="toggleEditor">' + EStr.TOGGLE_EDITOR + '</a>');
		toggleEditor.insertAfter('h1:first').click(function () {
			EUi.usingNew = !EUi.usingNew;
			if (EUi.usingNew) {
				oldform.hide();
				EUi.form.show();
				Ed.resetNew();
			} else {
				oldform.show();
				EUi.form.hide();
				EUi.tbox.val(EPrinter.recalculateCode());
			}
			ESpecialChars.toggle();
			$.cookie('usenew', +EUi.usingNew);
			return false;
		});

		EUi.prepareFormSections();
		EUi.rebindFormActions();
		EKeyboard.init();
		$('#ed .tip').live('mouseover', $(this).showtip).live('mouseout', $(this).hidetip);
	},

	reset : function () {
		EUi.menu.html('');
		EUi.content.html('');

		EUi.prepareFormSections();
		EUi.rebindFormActions();
	},

	clickDefaultSection : function () {
		var firstTab;

		if (!EUi.usingNew) {
			return false;
		}
		firstTab = EUi.menu.children(':not(#ed_menuitem_' + EConstants.SECTION_ID_INTRO + ')').first();
		if (firstTab.attr('id') !== 'ed_menuitem_new') {
			firstTab.click();
		} else if (Ed.content.sections[EConstants.SECTION_ID_INTRO] !== undefined) {
			$('#ed_menuitem_' + EConstants.SECTION_ID_INTRO).click();
		} else {
			$('#ed_menuitem_new').click();
		}
		return true;
	},

	prepareFormSections : function () {
		var id, addItem,
			size = 0;

		for (id in Ed.content.sections) {
			if (Ed.content.sections.hasOwnProperty(id)) {
				EUi.addSection(id);
				EUi.prepareFormSubsections(id);
				size += 1;
			}
		}

		if (!EUtil.isEditingSection()) {
			addItem = $('<li id="ed_menuitem_new" class="tip menuitem">' + EStr.ADD + '</li>');
			addItem.appendTo(EUi.menu).click(function () {
				EUi.addNewSection();
				return false;
			}).data('tip', EStr.ADD_SECTION);
		}

		if (size > EConstants.ONELINE_SECTIONS) {
			$('#ed_menu li.menuitem:nth-child(' + Math.floor(size / 2) + ')').css('clear', 'left');
		}

		EUi.clickDefaultSection();
		EUi.resizeTextareas();
		if ($('#ed_menuitem_' + EConstants.SECTION_ID_INTRO).length === 0 && !EUtil.isEditingSection()) {
			EUi.addIntroAdder();
		}
		$(window).resize(EUi.resizeTextareas);
	},

	addSection : function (id) {
		var item, tip, added = false,
			sec = Ed.content.sections[id],
			fset = $('<fieldset class="ed_section" id="ed_section_' + id + '"/>');

		fset.appendTo(EUi.content);

		if (id === EConstants.SECTION_ID_INTRO) {
			sec.code = EConstants.INTRO;
			sec.title = '';
		}

		item = $('<li id="ed_menuitem_' + id + '" class="tip menuitem">' + sec.code + '</li>');
		tip = id === EConstants.SECTION_ID_INTRO ?
			EStr.INTRO_SECTION :
			EParser.insideTemplate(sec.title) + '<br/><small>tytuł sekcji: <tt>' + sec.title + '</tt></small>';
		item.data({ 'section' : 'ed_section_' + id, 'code' : sec.code, 'tip' : tip }).click(function () {
			var defFocus;

			EKeyboard.hide();
			EUi.hideResult();
			EUi.content.find('.ed_section').removeClass('active');
			EUi.content.find('#' + $(this).data('section')).addClass('active');
			$(this).addClass('active').siblings().removeClass('active');
			EUi.resizeTextareas();
			EUi.activeLangCode = $(this).data('code');
			EUi.activeLangId = id;
			defFocus = $('#ed_content textarea.oblig_subsection:visible');
			if (defFocus.length === 0) {
				defFocus = $('#ed_content fieldset.active textarea:first');
			}
			window.setTimeout(function () { defFocus.focus(); }, 100); //FIXME why?
			return false;
		});

		// insert alphabetically
		EUi.menu.children('li').each(function () {
			if ($(this).attr('id') > item.attr('id') || $(this).attr('id') === 'ed_menuitem_new') {
				item.insertBefore($(this));
				added = true;
				return false;
			}
		});
		if (!added) {
			item.appendTo(EUi.menu);
		}
	},

	addNewSection : function () {
		var defaultText, message,
			defaultLang = EUtil.getSection();

		if (!defaultLang) {
			defaultLang = $.cookie('lastAdded');
		}
		defaultText = defaultLang ?
			EParser.getTitleFromCode(defaultLang) :
			mw.config.get('wgPageName') + EStr.ADD_SECTION_TEMPLATE;
		message = defaultLang ? EStr.ADD_SECTION_MESSAGE_DEFAULT : EStr.ADD_SECTION_MESSAGE;

		jPrompt(message, defaultText, EStr.ADD_SECTION_TITLE,
			function (val) {
				var sec, id;

				if (!val) {
					return;
				}
				sec = EParser.getSectionFromInput(val);

				if (sec.code) {
					id = sec.id;
					if (Ed.content.sections[id] !== undefined) {
						jAlert(EStr.ADD_SECTION_ALREADY, EStr.ADD_SECTION_ALREADY_TITLE);
					} else {
						Ed.content.sections[id] = sec;
						ESectionParser.parse(sec);

						EUi.addSection(id);
						EUi.prepareFormSubsections(id);
						EUi.addDefaultTexts(id, sec.code);
						$.cookie('lastAdded', sec.code);
					}
					$('#ed_menuitem_' + id).click();
					$('#ed_section_' + id + ' textarea').reverse().autoresize();
				} else {
					jAlert(EStr.ADD_SECTION_NONEXISTENT, EStr.ADD_SECTION_NONEXISTENT_TITLE, function () {
						EUi.addNewSection();
					});
				}
			});
	},

	editSectionTitle : function (id, section) {
		jPrompt(EStr.EDIT_SECTION_TITLE_MESSAGE, section.title, EStr.EDIT_SECTION_TITLE, function (res) {
			var tip;

			if (!res) {
				return;
			}
			section.title = res;
			tip = EParser.insideTemplate(res) + '<br/><small>tytuł sekcji: <tt>' + res + '</tt></small>';
			$('#ed_menuitem_' + id).data('tip', tip);
		});
	},

	deleteSection : function (id, force) {
		var del = function () {
			delete Ed.content.sections[id];
			$('#ed_menuitem_' + id).remove();
			$('#ed_section_' + id).remove();
			EUi.clickDefaultSection();
		};

		if (force) {
			del();
		} else {
			jConfirm(EStr.DELETE_SECTION_MESSAGE, EStr.DELETE_SECTION_TITLE, function (res) {
				if (res) { del(); }
			});
		}
	},

	deleteEmptySections : function () {
		var id, sec, empty,
			setNotEmpty = function () {
				if ($(this).val()) {
					empty = false;
				}
			};

		for (id in Ed.content.sections) {
			if (Ed.content.sections.hasOwnProperty(id)) {
				sec = Ed.content.sections[id];
				empty = true;
				$('#ed_section_' + id).find('textarea').each(setNotEmpty);
				if (empty) {
					EUi.deleteSection(id, 1);
				}
			}
		}
	},

	prepareFormSubsections : function (id) {
		var editlink, deletelink, i,
			section = Ed.content.sections[id],
			fset = $('#ed_section_' + id);

		if (id !== EConstants.SECTION_ID_INTRO) {
			editlink = $('<a/>').text(EStr.EDIT_SECTION_TITLE).click(function () {
				EUi.editSectionTitle(id, section);
				return false;
			});
			deletelink = $('<a/>').text(EStr.DELETE_SECTION).click(function () {
				EUi.deleteSection(id);
				return false;
			});
			fset.append($('<p class="top"/>').append(editlink).append(deletelink));
		}

		for (i = 0; i < section.subsections.length; i += 1) {
			if (section.subsections[i].active) {
				fset.append(EUi.getSubsectionObj(id, section, section.subsections[i]));
			}
		}
		EUi.prepareSectionAutomation(id);
		if (id === 'esperanto') {
			EUi.prepareEsperanto();
		}
	},

	getSubsectionObj : function (langid, section, subsection) {
		var name = langid + '_' + subsection.title.replace(/ /g, '_'),
			p = $('<p id="ed_subsection_' + name + '"/>'),
			caption = EConstants.SUBSECTION_TITLE[subsection.title],
			label = $('<label class="newform" for="ed_' + name + '">' + caption + '</label>'),
			textarea = $('<textarea class="newform keyboardable" name="ed_' + name + '" id="ed_' + name + '"/>').val(subsection.content),
			extra = $('<div class="subsection_extra" id="ed_' + name + '_extra"/>');

		if (ESectionParser.obligatorySubsection(subsection, section)) {
			label.addClass('oblig_subsection').append(EStr.OBLIGATORY_SUBSECTION);
			textarea.addClass('oblig_subsection');
		} else if (ESectionParser.botSubsection(subsection, section)) {
			label.addClass('bot_subsection').append(EStr.BOT_SUBSECTION);
			textarea.addClass('bot_subsection');
		}
		p.append(label).append(textarea).append(extra);

		return p;
	},

	rebindFormActions : function () {
		this.form.find('textarea').removeAttr('name');
		this.form.parent('form').submit(function () {
			if (EUi.usingNew) {
				EUi.deleteEmptySections();
				EUi.tbox.val(EPrinter.recalculateCode());
			}
			return true;
		});
	},

	resizeTextareas : function () {
		$('#ed_content fieldset.active').find('textarea').reverse().autoresize();
	},

	addIntroAdder : function () {
		var addIntro = $('<li id="ed_menuitem_newintro" class="tip menuitem">' + EStr.ADD_INTRO + '</li>');

		addIntro.appendTo(EUi.menu).click(function () {
			var sec = {
				'title' : '',
				'content' : '',
				'id' : EConstants.SECTION_ID_INTRO,
				'initcontent' : ''
			};

			Ed.content.sections[EConstants.SECTION_ID_INTRO] = sec;
			ESectionParser.parse(sec);
			EUi.addSection(EConstants.SECTION_ID_INTRO);
			EUi.prepareFormSubsections(EConstants.SECTION_ID_INTRO);
			$('#ed_menuitem_newintro').hide();
			$('#ed_menuitem_' + EConstants.SECTION_ID_INTRO).click();
			EAutomator.fillInterwiki();
			return false;
		}).data('tip', EStr.ADD_INTRO_SECTION);
	},

	addExtraButtons : function (sectionName, subsectionName, idpart, buttonContent, onclick, tooltip) {
		var input, extra, button;

		input = $('#ed_' + sectionName + '_' + subsectionName);
		extra = $('#ed_' + sectionName + '_' + subsectionName + '_extra');
		button = $('<span class="tip tipdown"/>').html(buttonContent).click(onclick);
		button = button.data('tip', tooltip).attr('id', 'ed_' + sectionName + '_extra_' + idpart);
		extra.append(button).addClass('active');
	},

	prepareSectionAutomation : function (id) {
		if (id === EConstants.SECTION_ID_INTRO) {
			EUi.addExtraButtons(id, '', EConstants.API_ID[EConstants.MODE_IW], EStr.ADD_INTERWIKI, EAutomator.fillInterwiki, EStr.GET_INTERWIKI);
		} else {
			EUi.addExtraButtons(id, '', EConstants.API_ID[EConstants.MODE_PICTURE], EStr.ADD_PICTURE, EAutomator.getPicture, EStr.GET_PICTURE + EStr.WILL_BE_SHOWN);
		}
		EUi.addExtraButtons(id, 'wymowa', EConstants.API_ID[EConstants.MODE_IPA], EStr.ADD_IPA, EAutomator.getIPA, EStr.GET_IPA + EStr.WILL_BE_SHOWN);
		EUi.addExtraButtons(id, 'wymowa', EConstants.API_ID[EConstants.MODE_AUDIO], EStr.ADD_AUDIO, EAutomator.getAudio, EStr.GET_AUDIO + EStr.WILL_BE_SHOWN);
		$(document).keyup(function (e) {
			if (e.keyCode === 27) {
				EUi.hideResult();
				return false;
			}
		});
	},

	showResult : function (ajaxResult, buttonIdPart) {
		var ajr = $('#ajax_results'),
			closelink = $('<a id="closelink" class="tip">×</a>');

		if (ajr.length === 0) {
			ajr = $('<div id="ajax_results"/>').appendTo($('#ed'));
			$(window).resize(EUi.relocateResult);
		}
		ajr.html('').append(ajaxResult).show().data('buttonIdPart', buttonIdPart);
		EUi.relocateResult();

		closelink.prependTo(ajr).data('tip', EStr.ESCAPE).click(function () {
			EUi.hideResult();
			return false;
		});

	},

	relocateResult : function () {
		var nPos = {},
			ajr = $('#ajax_results'),
			button = $('#ed_' + EUtil.getActiveLangId() + '_extra_' + ajr.data('buttonIdPart')),
			textbox = button.parent().prev();

		nPos.top = button.position().top;
		nPos.left = textbox.position().left + 60;
		ajr.css(nPos);
		ajr.width(textbox.outerWidth() - 120);
	},

	hideResult : function () {
		$('#ajax_results').hide();
	},

	addDefaultTexts : function (langid, code) {
		var subs, defaultText,
			arr = code === 'pl' ? EConstants.SAMPLE_SUBSECTION_CONTENTS_POLISH : EConstants.SAMPLE_SUBSECTION_CONTENTS_FOREIGN;

		for (subs in arr) {
			if (arr.hasOwnProperty(subs)) {
				defaultText = arr[subs];
				EUi.val(langid, subs, defaultText);
			}
		}
		EAutomator.addTransliteration(langid, code);
	},

	removeDefaultTexts : function (langid, code) {
		var subs, defaultText,
			arr = code === 'pl' ? EConstants.SAMPLE_SUBSECTION_CONTENTS_POLISH : EConstants.SAMPLE_SUBSECTION_CONTENTS_FOREIGN;

		for (subs in arr) {
			if (arr.hasOwnProperty(subs)) {
				defaultText = arr[subs];
				if (EUi.val(langid, subs) === defaultText) {
					EUi.val(langid, subs, '');
				}
			}
		}
	},

	val : function (langid, subsectionTitle, newValue) {
		if (newValue === undefined) {
			return $.trim($('#ed_' + langid + '_' + subsectionTitle.replace(/ /g, '_')).val());
		} else {
			$('#ed_' + langid + '_' + subsectionTitle).val(newValue);
			return 0;
		}
	},

	relatedS : undefined,
	derivedS : undefined,

	prepareEsperanto : function () {
		var meaningTA = $('#ed_esperanto_znaczenia'),
			related = $('#ed_subsection_esperanto_pokrewne'),
			derived = $('#ed_subsection_esperanto_pochodne'),
			updateEsperanto = function () {
				var isMorpheme = meaningTA.val().match(/\{\{\s*morfem\s*[\|\}]/g) !== null,
					isOtherPart = meaningTA.val().match(/''\s*(rzeczownik|przymiotnik|czasownik|przysłówek|skrót|spójnik|liczebnik|zaimek|wykrzyknik|partykuła)/g) !== null;

				if (isMorpheme) {
					derived.removeClass('inactive');
					derived.data('tip', '');
				} else {
					derived.addClass('inactive');
					derived.data('tip', EStr.SECTION_DERIVED_INACTIVE);
				}
				if (isOtherPart) {
					related.removeClass('inactive');
					related.data('tip', '');
				} else {
					related.addClass('inactive');
					related.data('tip', EStr.SECTION_RELATED_INACTIVE);
				}

				if (meaningTA.val() === '') {
					EUi.derivedS.active = true;
					EUi.relatedS.active = true;
				} else {
					EUi.derivedS.active = isMorpheme;
					EUi.relatedS.active = isOtherPart;
				}
			};

		$.each(Ed.content.sections.esperanto.subsections, function () {
			if (this.title === 'pochodne') {
				EUi.derivedS = this;
			} else if (this.title === 'pokrewne') {
				EUi.relatedS = this;
			}
		});
		related.addClass('tip');
		derived.addClass('tip');
		meaningTA.change(updateEsperanto).blur(updateEsperanto).keyup(updateEsperanto).focus(updateEsperanto);
		updateEsperanto();
	}
};


window.EFilesLoaded++;
window.ETryInit();
