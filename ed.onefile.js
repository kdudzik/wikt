//<nowiki>
/*global $, jQuery, mw, insertTags: true, checkSelectedText, is_opera, is_opera_seven, is_opera_95 */
/*jslint devel: true, browser: true, sloppy: true, es5: true, indent: 2, regexp: true */

var Ed, EForm, EUtil, EUi, EKeyboard, EApi, EAutomator, EConstants, EStr, EParser, ESectionParser, ESpecialChars, EPrinter;
(function ($) {
  var jPrompt, jAlert, jConfirm,
    css = "#ed {  overflow : auto;  background-color: white;  padding: 0;  display: none;  line-height: 1.3;  border: 0;  width: 100%;  height: auto; }  fieldset.ed_section {  display: none;  margin: 0;  border: 1px solid khaki;  min-height: 250px;  background-color: LemonChiffon;  padding-top: 7px; }  fieldset.ed_section.active {  display: block; }  ul#ed_menu {  background-color: white;  width: 97%;  display: block;  margin: 0;  float: left;  border: 0;  padding-left: 3%; }  ul#ed_menu li {  float: left;  padding: 3px 7px;  background: white;  border-width: 1px 1px 0 1px;  border-style: dotted;  border-color: khaki;  cursor: pointer;  list-style-type: none;  list-style-image: none; }  ul#ed_menu li.active {  background: LemonChiffon;  border-color: DarkKhaki;  border-style: solid; }  #ed_menuitem_new {  font-weight: bold; }  #ed_content {  clear: left;  padding: 0; }   fieldset.ed_section label {  float: left;  width: 20%;  padding: 2px 1% 0 1%;  line-height: 1;  clear: left;  text-align: right;  max-width: 170px; }  fieldset.ed_section textarea {  width: 77%;  border: 1px solid khaki;  height: 1em;  font-family: Consolas, \"Lucida Console\", monospace;  font-size: 9pt;  overflow: auto; }  fieldset.ed_section p {  clear: both;  text-align: center; }  fieldset.ed_section p.top {  margin-top: 10px;  margin-bottom: 10px; }  fieldset.ed_section p.top a {  margin-right: 15px; }  fieldset.ed_section a:hover {  cursor: pointer; }  label.oblig_subsection {  color: #CC0000;  font-weight: bold; }  div.subsection_extra.active {  margin-top: 6px; }  div.subsection_extra > span {  cursor: pointer;  background-color: lemonchiffon;  border: 1px dotted khaki;  padding: 5px; }  div.subsection_extra > span.apidone {  padding-right: 25px;  background: url(http://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Gtk-ok.svg/20px-Gtk-ok.svg.png) no-repeat right; }  div.subsection_extra > span.apistarted {  padding-right: 32px;  background: url(http://upload.wikimedia.org/wikipedia/commons/3/32/Loader3.gif) no-repeat right; }  div.subsection_extra > span.apierror {  padding-right: 25px;  background: url(http://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Crystal_128_error.svg/20px-Crystal_128_error.svg.png) no-repeat right; }  #popup_container {  font-size: 0.8em;  min-width: 300px; /* Dialog will be no smaller than this */  max-width: 600px; /* Dialog will wrap after this width */  background: #FFF;  border: solid 5px #999;  color: #000;  -moz-border-radius: 5px;  -webkit-border-radius: 5px;  border-radius: 5px;  z-index: 900;  position: absolute; }  #popup_overlay {  z-index: 899; }  #popup_container.prompt {  z-index: 600; }  #popup_overlay.prompt {  z-index: 599; }  #popup_title {  font-size: 1em;  font-weight: bold;  text-align: center;  line-height: 1.75em;  color: #666;  background-color: #CCC;  border: solid 1px #FFF;  border-bottom: solid 1px #999; }  #popup_content {  background: 16px 16px no-repeat url(images/info.gif);  padding: 1em 1.75em;  margin: 0em; }  #popup_content.alert {  background-image: url(images/info.gif); }  #popup_content.confirm {  background-image: url(images/important.gif); }  #popup_content.prompt {  background-image: url(images/help.gif); }  #popup_message {  padding-left: 48px; }  #popup_panel {  text-align: center;  margin: 1em 0em 0em 1em; }  #popup_prompt {  margin: .5em 0em;  border: 1px solid darkkhaki; }  .tooltip {  padding: 5px;  max-width: 450px;  background-color: lemonchiffon;  border: 1px solid darkkhaki;  color: saddlebrown; }  body.skin-monobook .tooltip, body.skin-monobook #keyboard_keys, body.skin-monobook #popup_container {  font-size: 1.4em !important; }  body.skin-monobook .tooltip small, body.skin-monobook #keyboard_keys small, body.skin-monobook #popup_container small, body.skin-monobook #ajax_results small {  font-size: 0.9em !important; }  body.skin-monobook .tooltip small tt, body.skin-monobook #keyboard_keys small tt, body.skin-monobook #popup_container small tt, body.skin-monobook #ajax_results small tt {  font-size: 1.3em !important; }  #keyboard {  width: 32px;  height: 32px;  background-color: lemonchiffon;  background-image: url('http://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Input-keyboard.svg/32px-Input-keyboard.svg.png');  border: 2px solid PaleGoldenrod;  padding: 0;  position: absolute;  z-index: 700;  cursor: pointer; }  #keyboard_keys {  font-size: 0.8em;  background-color: lemonchiffon;  border: 2px solid palegoldenrod;  padding: 5px;  max-width: 400px;  position: absolute;  z-index: 700; }  #keyboard_keys .plainlinks {  border: 0 !important; }  #keyboard_keys select {  width: 100%; }  #keyboard_keys #editpage-specialchars.plainlinks a {  padding: 1px 2px !important;  margin: 0 !important; } #keyboard_keys #editpage-specialchars.plainlinks a:hover {  text-decoration: none;  background-color: palegoldenrod !important; } #keyboard_keys #editpage-specialchars.plainlinks a.extiw {  padding: 0 !important; } #keyboard_keys #editpage-specialchars.plainlinks a.extiw:hover {  text-decoration: underline;  background-color: transparent !important; } #keyboard_keys .keyboard_always {  margin: 5px 2px; } #keyboard_keys .keyboard_always a {  padding: 2px 7px;  font-size: 1.2em;  border: 1px solid palegoldenrod;  background-color: palegoldenrod; } #keyboard_keys .keyboard_always a:hover {  text-decoration: none;  border: 1px solid darkkhaki; }  #ajax_results {  background-color: lemonchiffon;  border: 2px solid palegoldenrod;  padding: 5px;  width: 350px;  position: absolute;  z-index: 598;  word-wrap: break-word;  max-height: 450px;  overflow-y: auto; }  #ajax_results a {  cursor: pointer; } #ajax_results a:hover {  text-decoration: none;  background-color: palegoldenrod !important; } #ajax_results a#closelink {  font-size: 1.7em;  font-weight: bold;  float: right; } #ajax_results dt {  font-weight: normal;  font-style: italic; } #ajax_results dt a {  font-size: 0.85em;  font-style: normal; } #ajax_results dt a.normalsize {  font-size: 1em;  font-style: italic; } #ajax_results dt.native, #ajax_results dt.native a, #ajax_results dd.native {  font-weight: bold; } #ajax_results dd {  line-height: 1.3;  font-family: Consolas, \"Lucida Console\", monospace; } #ajax_results dd a {  padding: 2px !important; } #ajax_results dd a.ipa {  padding: 0px !important; } #ajax_result_disc {  margin-bottom: 5px; } p.inactive label {  color: #999; } p.inactive textarea {  background-color: lemonChiffon;  color: #999; } ";
  mw.util.addCSS(css);
  // jQuery Alert Dialogs Plugin
  // Version 1.1
  // Cory S.N. LaViska
  // A Beautiful Site (http://abeautifulsite.net/)
  // 14 May 2009
  // Visit http://abeautifulsite.net/notebook/87 for more information
  // This plugin is dual-licensed under the GNU General Public License and the MIT License and
  // is copyright 2008 A Beautiful Site, LLC.
  (function ($) {

    $.alerts = {
      verticalOffset: -75, // vertical offset of the dialog from center screen, in pixels
      horizontalOffset: 0, // horizontal offset of the dialog from center screen, in pixels/
      repositionOnResize: true, // re-centers the dialog on window resize
      overlayOpacity: 0.2, // transparency level of overlay
      overlayColor: '#000', // base color of overlay
      okButton: '', // text for the OK button
      cancelButton: '', // text for the Cancel button
      init: false,

      initialize: function () {
        if ($.alerts.init) {
          return;
        }
        $.alerts.okButton = '&nbsp;' + EStr.OK + '&nbsp;';
        $.alerts.cancelButton = '&nbsp;' + EStr.CANCEL + '&nbsp;';
        $.alerts.init = true;
      },

      // Public methods

      alert: function (message, title, callback) {
        $.alerts.initialize();
        if (title === undefined) {
          title = EStr.WARNING;
        }
        $.alerts.show__prv(title, message, null, 'alert', function (result) {
          if (callback) {
            callback(result);
          }
        });
      },

      confirm: function (message, title, callback) {
        $.alerts.initialize();
        if (title === undefined) {
          title = EStr.CONFIRMATION;
        }
        $.alerts.show__prv(title, message, null, 'confirm', function (result) {
          if (callback) {
            callback(result);
          }
        });
      },

      prompt: function (message, value, title, callback) {
        $.alerts.initialize();
        if (title === undefined) {
          title = EStr.QUESTION;
        }
        $.alerts.show__prv(title, message, value, 'prompt', function (result) {
          if (callback) {
            callback(result);
          }
        });
      },

      // Private methods

      show__prv: function (title, msg, value, type, callback) {

        $.alerts.hide__prv();
        $.alerts.overlay__prv('show');

        $('body').append('<div id="popup_container"><h1 id="popup_title"></h1><div id="popup_content"><div id="popup_message"></div></div></div>');

        $('#popup_container').css({
          padding: 0,
          margin: 0
        });

        $('#popup_title').text(title);
        $('#popup_content').addClass(type);
        $('#popup_message').text(msg);
        $('#popup_message').html($('#popup_message').text().replace(/\n/g, '<br />'));

        $('#popup_container').css({
          minWidth: $('#popup_container').outerWidth(),
          maxWidth: $('#popup_container').outerWidth()
        });

        $.alerts.reposition__prv();
        $.alerts.maintainPosition__prv(true);

        switch (type) {
        case 'alert':
          $('#popup_container').addClass('alert').removeClass('confirm').removeClass('prompt');
          $('#popup_overlay').addClass('alert').removeClass('confirm').removeClass('prompt');
          $('#popup_message').after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
          $('#popup_ok').click(function () {
            $.alerts.hide__prv();
            callback(true);
            return false;
          });
          $('#popup_ok').focus().keyup(function (e) {
            if (e.keyCode === 13 || e.keyCode === 27) {
              $('#popup_ok').trigger('click');
              return false;
            }
          });
          break;
        case 'confirm':
          $('#popup_container').removeClass('alert').addClass('confirm').removeClass('prompt');
          $('#popup_overlay').removeClass('alert').addClass('confirm').removeClass('prompt');
          $('#popup_message').after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
          $('#popup_ok').click(function () {
            $.alerts.hide__prv();
            if (callback) {
              callback(true);
            }
            return false;
          });
          $('#popup_cancel').click(function () {
            $.alerts.hide__prv();
            if (callback) {
              callback(false);
            }
            return false;
          });
          $('#popup_ok').focus();
          $('#popup_ok, #popup_cancel').keyup(function (e) {
            if (e.keyCode === 13) {
              $('#popup_ok').trigger('click');
            }
            if (e.keyCode === 27) {
              $('#popup_cancel').trigger('click');
              return false;
            }
          });
          break;
        case 'prompt':
          $('#popup_container').removeClass('alert').removeClass('confirm').addClass('prompt');
          $('#popup_overlay').removeClass('alert').removeClass('confirm').addClass('prompt');
          $('#popup_message').append('<br /><input type="text" id="popup_prompt" class="keyboardable" />').after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
          $('#popup_prompt').width($('#popup_message').width());
          $('#popup_ok').click(function () {
            var val = $('#popup_prompt').val();
            EKeyboard.hide();
            $.alerts.hide__prv();
            if (callback) {
              callback(val);
            }
            return false;
          });
          $('#popup_cancel').click(function () {
            EKeyboard.hide();
            $.alerts.hide__prv();
            if (callback) {
              callback(null);
            }
            return false;
          });
          $('#popup_prompt, #popup_ok, #popup_cancel').keyup(function (e) {
            if (e.keyCode === 13) {
              $('#popup_ok').trigger('click');
            }
            if (e.keyCode === 27) {
              $('#popup_cancel').trigger('click');
              return false;
            }
          });
          if (value) {
            $('#popup_prompt').val(value);
          }
          $('#popup_prompt').keyboard().focus().select();
          break;
        default:
          break;
        }
      },

      hide__prv: function () {
        $('#popup_container').remove();
        $.alerts.overlay__prv('hide');
        $.alerts.maintainPosition__prv(false);
      },

      overlay__prv: function (status) {
        switch (status) {
        case 'show':
          $.alerts.overlay__prv('hide');
          $('body').append('<div id="popup_overlay"></div>');
          $('#popup_overlay').css({
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '100%',
            height: $(document).height(),
            background: $.alerts.overlayColor,
            opacity: $.alerts.overlayOpacity
          });
          break;
        case 'hide':
          $('#popup_overlay').remove();
          break;
        default:
          break;
        }
      },

      reposition__prv: function () {
        var top = (($(window).height() / 2) - ($('#popup_container').outerHeight() / 2)) + $.alerts.verticalOffset,
          left = (($(window).width() / 2) - ($('#popup_container').outerWidth() / 2)) + $.alerts.horizontalOffset;
        if (top < 0) {
          top = 0;
        }
        if (left < 0) {
          left = 0;
        }

        // IE6 fix
        if ($.browser.msie && parseInt($.browser.version, 10) <= 6) {
          top = top + $(window).scrollTop();
        }

        $('#popup_container').css({
          top: top + 'px',
          left: left + 'px'
        });
        $('#popup_overlay').height($(document).height());
        $('#popup_prompt').keyboard().focus().select();
      },

      maintainPosition__prv: function (status) {
        if ($.alerts.repositionOnResize) {
          switch (status) {
          case true:
            $(window).bind('resize', $.alerts.reposition__prv);
            break;
          case false:
            $(window).unbind('resize', $.alerts.reposition__prv);
            break;
          default:
            break;
          }
        }
      }

    };

    // Shortcut functions
    jAlert = function (message, title, callback) {
      $.alerts.alert(message, title, callback);
    };

    jConfirm = function (message, title, callback) {
      $.alerts.confirm(message, title, callback);
    };

    jPrompt = function (message, value, title, callback) {
      $.alerts.prompt(message, value, title, callback);
    };

  }(jQuery));

  (function ($) {

    var shown = false,
      tooltip = $('<div class="tooltip"/>');

    tooltip.css('position', 'absolute').css('z-index', '1000').appendTo($('body'));

    $.fn.showtip = function () {
      var yOffset, xOffset, pos;
      if (!$(this).data('tip')) {
        return true;
      }
      tooltip.html($(this).data('tip'));

      yOffset = $(this).hasClass('tipdown') ? -$(this).outerHeight() - 3 : tooltip.height() + 17;
      xOffset = (tooltip.width() - 10) / 2 - $(this).width() / 2;
      pos = $(this).offset();
      tooltip.css({ top: pos.top - yOffset, left: pos.left - xOffset }).show();
      shown = true;
    };

    $.fn.hidetip = function () {
      tooltip.hide();
      shown = false;
    };

  }(jQuery));

  // inspired by https://github.com/jaz303/jquery-grab-bag/raw/master/javascripts/jquery.autogrow-textarea.js
  (function ($) {
    $.fn.autoresize = function () {
      var shadow = $('<div/>').css({ position: 'absolute', top: -10000, left: -10000, resize:  'none' }).appendTo(document.body);

      this.filter('textarea').each(function () {
        var $this = $(this),
          minHeight = 25,
          maxHeight = 500,
          prevHeight = 0,
          nowHeight = 0,

          update = function () {
            var val = this.value.replace(/[<>&]/g, 'w').replace(/\n$/, '<br/>&nbsp;').replace(/\n/g, '<br/>');

            shadow.html(val);
            nowHeight = Math.min(Math.max(shadow.height(), minHeight), maxHeight);
            if (nowHeight !== prevHeight) {
              $(this).css('height', nowHeight);
              EKeyboard.updatePosition($(this));
              prevHeight = nowHeight;
            }
          };

        shadow.css({
          width: $(this).width() - parseInt($this.css('paddingLeft'), 10) - parseInt($this.css('paddingRight'), 10),
          fontSize: $this.css('fontSize'),
          fontFamily: $this.css('fontFamily'),
          lineHeight: $this.css('lineHeight')
        });

        $(this).keyup(update).blur(update).focus(update);
        update.apply(this);
      });
      return this;

    };

  }(jQuery));

  EConstants = {
    SUBSECTIONS :
      {
        POLISH :
          [
            'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje', 'synonimy', 'antonimy', 'pokrewne',
            'frazeologia', 'etymologia', 'uwagi', 'tłumaczenia', 'źródła'
          ],
        LATIN :
          [
            'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje', 'synonimy', 'antonimy', 'pokrewne',
            'frazeologia', 'etymologia', 'uwagi', 'źródła'
          ],
        NON_LATIN :
          [
            'transliteracja', 'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje', 'synonimy', 'antonimy',
            'pokrewne', 'frazeologia', 'etymologia', 'uwagi', 'źródła'
          ],
        DOUBLE :
          [
            'ortografie', 'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje', 'synonimy', 'antonimy',
            'pokrewne', 'frazeologia', 'etymologia', 'uwagi', 'źródła'
          ],
        CHINESE :
          [// zh-char
            'klucz', 'kreski', 'warianty', 'kolejność', 'znaczenia', 'etymologia', 'kody', 'słowniki', 'uwagi', 'źródła'
          ],
        KOREAN:
          [// ko
            'kreski', 'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'złożenia', 'składnia', 'kolokacje', 'synonimy', 'antonimy',
            'pokrewne', 'frazeologia', 'etymologia', 'hanja', 'uwagi', 'źródła'
          ],
        JAPANESE:
          [// ja
            'transliteracja', 'czytania', 'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje', 'synonimy',
            'antonimy', 'złożenia', 'pokrewne', 'frazeologia', 'etymologia', 'uwagi', 'źródła'
          ],
        ESPERANTO :
          [//eo
            'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje', 'synonimy', 'antonimy', 'pokrewne', 'pochodne',
            'frazeologia', 'etymologia', 'uwagi', 'źródła'
          ],
        INTERNATIONAL :
          [// inter
            'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje', 'synonimy', 'antonimy', 'pokrewne', 'frazeologia',
            'etymologia', 'uwagi', 'źródła'
          ],
        EGYPTIAN :
          [// egy
            'zapis hieroglificzny', 'transliteracja', 'transkrypcja', 'znaczenia', 'determinatywy', 'odmiana', 'przykłady',
            'składnia', 'kolokacje', 'synonimy', 'antonimy', 'pokrewne', 'frazeologia', 'etymologia', 'uwagi', 'źródła'
          ],
        ALL :
          [
            'zapis hieroglificzny', 'ortografie', 'transliteracja', 'transkrypcja', 'czytania', 'klucz', 'kreski', 'warianty',
            'kolejność', 'wymowa', 'znaczenia', 'determinatywy', 'odmiana', 'przykłady', 'składnia', 'kolokacje', 'synonimy',
            'antonimy', 'złożenia', 'pokrewne', 'pochodne', 'frazeologia', 'etymologia', 'kody', 'hanja', 'słowniki', 'uwagi',
            'tłumaczenia', 'źródła'
          ]
      },
    SUBSECTION_TITLE :
      {
        'transliteracja' : 'Transliteracja',
        'wymowa' : 'Wymowa',
        'znaczenia' : 'Znaczenia',
        'odmiana' : 'Odmiana',
        'przykłady' : 'Przykłady użycia',
        'składnia' : 'Składnia',
        'kolokacje' : 'Kolokacje',
        'synonimy' : 'Synonimy',
        'antonimy' : 'Antonimy',
        'pokrewne' : 'Wyrazy pokrewne',
        'frazeologia' : 'Związki frazeologiczne',
        'etymologia' : 'Etymologia',
        'ortografie' : 'Zapisy w ortografiach alternatywnych',
        'tłumaczenia' : 'Tłumaczenia',
        'uwagi' : 'Uwagi',
        'źródła' : 'Źródła',
        'klucz' : 'Klucz',
        'kreski' : 'Liczba kresek',
        'warianty' : 'Warianty',
        'kolejność' : 'Kolejność kresek',
        'kody' : 'Kodowanie',
        'słowniki' : 'Słowniki',
        'zapis hieroglificzny' : 'Zapis hieroglificzny',
        'transkrypcja' : 'Transkrypcja',
        'determinatywy' : 'Determinatywy',
        'czytania' : 'Czytania',
        'złożenia' : 'Złożenia',
        'hanja' : 'Hanja',
        'pochodne' : 'Wyrazy pochodne',
        '' : 'Wstęp sekcji językowej'
      },
    NON_LATIN_LANGS :
      [
        'ab', 'ady', 'akk', 'am', 'ar', 'arc', 'as', 'av', 'ba', 'bal', 'be',
        'bg', 'bn', 'bo', 'cau', 'ce', 'chm', 'ckb', 'cr', 'cu', 'cv',
        'dv', 'dz', 'el', 'fa', 'gez', 'got', 'gr', 'gu', 'he', 'hi', 'hy',
        'inh', 'iu', 'ka', 'kjh', 'kk', 'km', 'kn', 'kok', 'ks', 'ku', 'kv',
        'ky', 'lez', 'lo', 'mk', 'ml', 'mn', 'mr', 'my', 'myv', 'ne', 'new',
        'or', 'os', 'pa', 'ps', 'rom', 'ru', 'sa', 'sd', 'si', 'sux', 'ta',
        'tab', 'te', 'tg', 'th', 'tzm', 'uk', 'ur', 'xcl', 'yi', 'zrp'
      ],
    DOUBLE_LANGS :
      [
        'az', 'be', 'crh', 'jdt', 'lad', 'mo', 'slovio', 'sr', 'tk', 'tt', 'tut', 'ug'
      ],
    LANG_CODES_SHORT :
      {
        'dżuhuri' : 'jdt',
        'esperanto' : 'eo',
        'ewe' : 'ee',
        'hindi' : 'hi',
        'ido' : 'io',
        'interlingua' : 'ia',
        'inuktitut' : 'iu',
        'jèrriais' : 'roa',
        'jidysz' : 'yi',
        'ladino' : 'lad',
        'lingala' : 'ln',
        'novial' : 'nov',
        'papiamento' : 'pap',
        'pitjantjatjara' : 'pjt',
        'sanskryt' : 'sa',
        'slovio' : 'slovio',
        'sranan tongo' : 'srn',
        'termin obcy w języku łacińskim' : 'termin obcy w języku łacińskim',
        'termin obcy w języku polskim' : 'termin obcy w języku polskim',
        'tetum' : 'tet',
        'tok pisin' : 'tpi',
        'tupinambá' : 'tpn',
        'użycie międzynarodowe' : 'inter',
        'volapük' : 'vo',
        'znak chiński' : 'zh-char'
      },
    LANG_CODES_LONG :
      {
        '!Xóõ' : 'khi',
        'abazyński' : 'cau',
        'abchaski' : 'ab',
        'abenaki' : 'abe',
        'adygejski' : 'ady',
        'afrykanerski' : 'af',
        'ajmara' : 'ay',
        'akadyjski' : 'akk',
        'aklanon' : 'akl',
        'alabama' : 'akz',
        'albański' : 'sq',
        'alemański' : 'als',
        'aleucki' : 'ale',
        'amharski' : 'am',
        'angielski' : 'en',
        'arabski' : 'ar',
        'aragoński' : 'an',
        'aramejski' : 'arc',
        'arapaho' : 'arp',
        'arumuński' : 'roa',
        'assamski' : 'as',
        'asturyjski' : 'ast',
        'awarski' : 'av',
        'azerski' : 'az',
        'bambara' : 'bm',
        'banjumasański' : 'map',
        'baskijski' : 'eu',
        'baszkirski' : 'ba',
        'bawarski' : 'gem',
        'beludżi' : 'bal',
        'bengalski' : 'bn',
        'białoruski (taraszkiewica)' : 'be',
        'białoruski' : 'be',
        'birmański' : 'my',
        'boloński' : 'egl',
        'bośniacki' : 'bs',
        'bretoński' : 'br',
        'brithenig' : 'bzt',
        'bułgarski' : 'bg',
        'cebuano' : 'ceb',
        'chakaski' : 'kjh',
        'chickasaw' : 'nai',
        'chiński standardowy' : 'zh',
        'chorwacki' : 'hr',
        'czagatajski' : 'chg',
        'czamorro' : 'ch',
        'czarnogórski' : 'ch',
        'czeczeński' : 'ce',
        'czeski' : 'cs',
        'czirokeski' : 'chr',
        'czuwaski' : 'cv',
        'dalmatyński' : 'dlm',
        'dolnołużycki' : 'dsb',
        'dolnoniemiecki' : 'nds',
        'duński' : 'da',
        'dzongkha' : 'dz',
        'erzja' : 'myv',
        'estoński' : 'et',
        'etruski' : 'ett',
        'farerski' : 'fo',
        'fidżyjski' : 'fj',
        'filipino' : 'fil',
        'fiński' : 'fi',
        'francuski' : 'fr',
        'friulski' : 'fur',
        'fryzyjski' : 'fy',
        'ful' : 'ff',
        'ga' : 'gaa',
        'gagauski' : 'tut',
        'galicyjski' : 'gl',
        'gaskoński' : 'oc',
        'gocki' : 'got',
        'górnołużycki' : 'hsb',
        'grenlandzki' : 'kl',
        'gruziński' : 'ka',
        'guarani' : 'gn',
        'gudźarati' : 'gu',
        'gyyz' : 'gez',
        'haitański' : 'ht',
        'hausa' : 'ha',
        'hawajski' : 'haw',
        'hebrajski' : 'he',
        'hiszpański' : 'es',
        'holenderski' : 'nl',
        'hupa' : 'hup',
        'ilokano' : 'ilo',
        'indonezyjski' : 'id',
        'inguski' : 'inh',
        'irlandzki' : 'ga',
        'islandzki' : 'is',
        'istriocki' : 'ist',
        'japoński' : 'ja',
        'joruba' : 'yor',
        'kabylski' : 'kab',
        'kakczikel' : 'myn',
        'kannada' : 'kn',
        'karakałpacki' : 'kaa',
        'kaszmirski' : 'ks',
        'kaszubski' : 'csb',
        'kataloński' : 'ca',
        'kazachski' : 'kk',
        'keczua' : 'qu',
        'khmerski' : 'km',
        'kirgiski' : 'ky',
        'klingoński' : 'tlh',
        'komi-jaźwiński' : 'kom',
        'komi-permiacki' : 'koi',
        'komi-zyriański' : 'kpv',
        'komi' : 'kv',
        'konkani' : 'kok',
        'koreański' : 'ko',
        'kornijski' : 'kw',
        'korsykański' : 'co',
        'kri' : 'cr',
        'krymskotatarski' : 'crh',
        'kurdyjski' : 'ku',
        'ladyński' : 'lld',
        'langwedocki' : 'oci',
        'laotański' : 'lo',
        'lezgiński' : 'lez',
        'liguryjski' : 'lij',
        'limburski' : 'lim',
        'litewski' : 'lt',
        'lombardzki' : 'lmo',
        'luksemburski' : 'lb',
        'luo' : 'luo',
        'łaciński' : 'la',
        'łatgalski' : 'ltg',
        'łotewski' : 'lv',
        'macedoński' : 'mk',
        'malajalam' : 'ml',
        'malajski' : 'ms',
        'malediwski' : 'dv',
        'malgaski' : 'mg',
        'maltański' : 'mt',
        'maoryski' : 'mi',
        'marathi' : 'mr',
        'maryjski' : 'chm',
        'mikmak' : 'mic',
        'minnan' : 'zh',
        'mołdawski' : 'mo',
        'mongolski' : 'mn',
        'nahuatl' : 'nah',
        'nauruański' : 'na',
        'nawaho' : 'nv',
        'neapolitański' : 'nap',
        'nepalski' : 'ne',
        'newarski' : 'new',
        'niemiecki' : 'de',
        'norweski (bokmål)' : 'nb',
        'norweski (nynorsk)' : 'nn',
        'nowogrecki' : 'el',
        'orija' : 'or',
        'ormiański' : 'hy',
        'oromo' : 'om',
        'osetyjski' : 'os',
        'pali' : 'pi',
        'paszto' : 'ps',
        'pendżabski' : 'pa',
        'perski' : 'fa',
        'piemoncki' : 'pms',
        'pikardyjski' : 'pcd',
        'pirahã' : 'myp',
        'polski' : 'pl',
        'połabski' : 'pox',
        'portugalski' : 'pt',
        'północnolapoński' : 'sme',
        'pragermański' : 'gem',
        'prowansalski' : 'oci',
        'pruski' : 'prg',
        'rarotonga' : 'rar',
        'romansz' : 'roh',
        'romski' : 'rom',
        'rosyjski' : 'ru',
        'rumuński' : 'ro',
        'rundi' : 'rn',
        'russenorsk' : 'crp',
        'sardyński' : 'sc',
        'serbski' : 'sr',
        'sindhi' : 'sd',
        'sko' : 'sko',
        'skolt' : 'sms',
        'słowacki' : 'sk',
        'słoweński' : 'sl',
        'słowiński' : 'slov',
        'somalijski' : 'so',
        'sorani' : 'ckb',
        'staro-cerkiewno-słowiański' : 'cu',
        'staro-wysoko-niemiecki' : 'goh',
        'staroangielski' : 'ang',
        'staroegipski' : 'egy',
        'starofrancuski' : 'fro',
        'starogrecki' : 'gr',
        'staroirlandzki' : 'sga',
        'staronordyjski' : 'non',
        'staroormiański' : 'xcl',
        'suahili' : 'sw',
        'sumeryjski' : 'sux',
        'sundajski' : 'su',
        'susu' : 'sus',
        'sycylijski' : 'scn',
        'syngaleski' : 'si',
        'szkocki gaelicki' : 'gla',
        'szkocki' : 'sco',
        'szwabski' : 'gsw',
        'szwedzki' : 'sv',
        'średnio-dolno-niemiecki' : 'średnio-dolno-niemiecki',
        'średnio-wysoko-niemiecki' : 'gmh',
        'średnioangielski' : 'enm',
        'tabasarański' : 'tab',
        'tadżycki' : 'tg',
        'tagalski' : 'tl',
        'tahitański' : 'ty',
        'tajski' : 'th',
        'tamazight' : 'tzm',
        'tamilski' : 'ta',
        'tatarski' : 'tt',
        'telugu' : 'te',
        'tigrinia' : 'ti',
        'tonga' : 'to',
        'turecki' : 'tr',
        'turkmeński' : 'tk',
        'tuvalu' : 'tvl',
        'twi' : 'tw',
        'tybetański' : 'bo',
        'ujgurski' : 'ug',
        'ukraiński' : 'uk',
        'urdu' : 'ur',
        'uwea' : 'wls',
        'uzbecki' : 'uz',
        'võro' : 'fiu',
        'walijski' : 'cy',
        'waloński' : 'wa',
        'wczesny nowoangielski' : 'emen',
        'wenecki' : 'vec',
        'wepski' : 'fiu',
        'węgierski' : 'hu',
        'wietnamski' : 'vi',
        'wilamowski' : 'wym',
        'włoski' : 'it',
        'wolof' : 'wo',
        'wysokoislandzki' : 'art',
        'yupik środkowy' : 'ypk',
        'zachoflamandzki' : 'vls',
        'zarfatit' : 'zrp',
        'zazaki' : 'zza',
        'zelandzki' : 'zea',
        'zulu' : 'zu',
        'żmudzki' : 'bat'
      },
    CODE_TO_LANG :
      {},
    WIKTCODE_TO_LANG :
      {
        'no' : 'Wikisłownik norweski',
        'simple' : 'Uproszczony Wikisłownik angielski',
        'li' : 'Wikisłownik limburgijski',
        'eo' : 'Wikisłownik w esperanto',
        'commons' : 'Wikimedia Commons'
      },
    ONELINE_SECTIONS :
      20,
    SUBSECTIONS_WITHOUT_NL :
      [
        'wymowa', 'transliteracja', 'transkrypcja', 'ortografie', 'klucz', 'kreski', 'czytania'
      ],
    SUBSECTIONS_WITH_NL :
      [
        'znaczenia', 'przykłady', 'tłumaczenia'
      ],
    SAMPLE_SUBSECTION_CONTENTS_POLISH :
      {
        'znaczenia' : "''rzeczownik, rodzaj żeński, męski''\n: (1.1) [[krótki|krótka]] [[definicja]]",
        'przykłady' : ": (1.1) ''[[przykład|Przykład]] [[zdanie|zdania]].'' ",
        'tłumaczenia' : "* angielski: (1.1) [[ ]]"
      },
    SAMPLE_SUBSECTION_CONTENTS_FOREIGN :
      {
        'znaczenia' : "''rzeczownik, rodzaj żeński, męski''\n: (1.1) [[krótki|krótka]] [[definicja]]",
        'przykłady' : ": (1.1) ''[[przykład|Przykład]] [[zdanie|zdania]].'' → [[tłumaczenie|Tłumaczenie]] [[zdanie|zdania]]. "
      },
    SECTION_ID_INTRO :
      '0000',
    SECTION_ID_INTERNATIONAL :
      '0001',
    SECTION_ID_POLISH :
      '0002',
    SECTION_ID_POLISH_FOREIGN :
      '0003',
    SECTION_ID_CHINESE_SIGN :
      '0004',
    SECTION_ID_LATIN_FOREIGN :
      'lzzacinzzski2',
    WIKIPEDIA :
      'wikipedia',
    WIKTIONARY :
      'wiktionary',
    WIKIMEDIA :
      'wikimedia',
    USED_WIKTIONARIES :
      [
        'en', 'de', 'es', 'ru', 'fr'
      ],
    INTERWIKI_ORDER: // http://meta.wikimedia.org/wiki/Interwiki_sorting_order
      [
        'ace', 'af', 'ak', 'als', 'am', 'ang', 'ab', 'ar', 'an', 'arc',
        'roa-rup', 'frp', 'as', 'ast', 'gn', 'av', 'ay', 'az', 'bjn', 'id',
        'ms', 'bm', 'bn', 'zh-min-nan', 'nan', 'map-bms', 'jv', 'su', 'ba',
        'be', 'be-x-old', 'bh', 'bcl', 'bi', 'bar', 'bo', 'bs', 'br', 'bug',
        'bg', 'bxr', 'ca', 'ceb', 'cv', 'cs', 'ch', 'cbk-zam', 'ny', 'sn',
        'tum', 'cho', 'co', 'cy', 'da', 'dk', 'pdc', 'de', 'dv', 'nv',
        'dsb', 'na', 'dz', 'mh', 'et', 'el', 'eml', 'en', 'myv', 'es', 'eo',
        'ext', 'eu', 'ee', 'fa', 'hif', 'fo', 'fr', 'fy', 'ff', 'fur', 'ga',
        'gv', 'sm', 'gag', 'gd', 'gl', 'gan', 'ki', 'glk', 'gu', 'got',
        'hak', 'xal', 'ko', 'ha', 'haw', 'hy', 'hi', 'ho', 'hsb', 'hr',
        'io', 'ig', 'ilo', 'bpy', 'ia', 'ie', 'iu', 'ik', 'os', 'xh', 'zu',
        'is', 'it', 'he', 'kl', 'kn', 'kr', 'pam', 'ka', 'ks', 'csb', 'kk',
        'kw', 'rw', 'ky', 'rn', 'mrj', 'sw', 'kv', 'kg', 'ht', 'ku', 'kj',
        'lad', 'lbe', 'lo', 'la', 'ltg', 'lv', 'to', 'lb', 'lt', 'lij',
        'li', 'ln', 'jbo', 'lg', 'lmo', 'hu', 'mk', 'mg', 'ml', 'krc', 'mt',
        'mi', 'mr', 'xmf', 'arz', 'mzn', 'cdo', 'mwl', 'koi', 'mdf', 'mo',
        'mn', 'mus', 'my', 'nah', 'fj', 'nl', 'nds-nl', 'cr', 'ne', 'new',
        'ja', 'nap', 'ce', 'frr', 'pih', 'no', 'nb', 'nn', 'nrm', 'nov',
        'ii', 'oc', 'mhr', 'or', 'om', 'ng', 'hz', 'uz', 'pa', 'pi', 'pfl',
        'pag', 'pnb', 'pap', 'ps', 'km', 'pcd', 'pms', 'nds', 'pl', 'pnt',
        'pt', 'aa', 'kbd', 'kaa', 'crh', 'ty', 'ksh', 'ro', 'rmy', 'rm',
        'qu', 'ru', 'rue', 'sah', 'se', 'sa', 'sg', 'sc', 'sco', 'stq',
        'st', 'tn', 'sq', 'scn', 'si', 'simple', 'sd', 'ss', 'sk', 'sl',
        'cu', 'szl', 'so', 'ckb', 'srn', 'sr', 'sh', 'fi', 'sv', 'tl', 'ta',
        'kab',  'roa-tara', 'tt', 'te', 'tet', 'th', 'vi', 'ti', 'tg',
        'tpi', 'tokipona', 'tp', 'chr', 'chy', 've', 'tr', 'tk', 'tw',
        'udm', 'uk', 'ur', 'ug', 'za', 'vec', 'vo', 'fiu-vro', 'wa',
        'zh-classical', 'vls', 'war', 'wo', 'wuu', 'ts', 'yi', 'yo',
        'zh-yue', 'diq', 'zea', 'bat-smg', 'zh', 'zh-tw', 'zh-cn'
      ],
    ALL_WIKTIONARIES:
      [
        'af', 'als', 'an', 'roa-rup', 'ast', 'gn', 'ay', 'az', 'id', 'ms', 'zh-min-nan',
        'jv', 'su', 'mt', 'bs', 'br', 'ca', 'cs', 'co', 'za', 'cy', 'da', 'de', 'na',
        'et', 'ang', 'en', 'bo', 'es', 'eo', 'eu', 'fo', 'fr', 'fy', 'gd', 'ga', 'gv',
        'sm', 'gl', 'hr', 'io', 'ia', 'ie', 'ik', 'zu', 'is', 'it', 'kl', 'csb', 'ku',
        'kw', 'rw', 'sw', 'la', 'lv', 'lb', 'lt', 'li', 'ln', 'jbo', 'hu', 'mg', 'mi',
        'nah', 'fj', 'nl', 'no', 'nn', 'oc', 'om', 'uz', 'nds', 'pl', 'pt', 'ro', 'qu',
        'sg', 'st', 'tn', 'scn', 'simple', 'sk', 'sl', 'sq', 'ss', 'so', 'sh', 'fi',
        'sv', 'tl', 'tt', 'vi', 'tpi', 'tr', 'tk', 'vo', 'wa', 'wo', 'ts', 'el',
        'be', 'bg', 'kk', 'ky', 'mk', 'mn', 'ru', 'sr', 'tg', 'uk', 'hy', 'ka', 'he',
        'yi', 'ar', 'fa', 'ha', 'ps', 'sd', 'ug', 'ur', 'dv', 'bn', 'gu', 'hi', 'ks',
        'ne', 'sa', 'mr', 'kn', 'ml', 'pa', 'ta', 'te', 'km', 'lo', 'my', 'si', 'th',
        'am', 'ti', 'iu', 'chr', 'ko', 'ja', 'zh'
      ],
    MODE_IPA : 0,
    MODE_IW : 1,
    MODE_PICTURE : 2,
    MODE_AUDIO : 3,
    MODE_INTERNAL_EXAMPLE : 4,
    API_ID :
      {
        0 : 'add_ipa',
        1 : 'add_iw',
        2 : 'add_picture',
        3 : 'add_audio',
        4 : 'add_internal_example'
      },
    IPA_MODE_ADDS_NOTHING : 1,
    IPA_MODE_ADDS_SLASH : 2,
    IPA_MODE_ADDS_BRACKET : 3,
    IPA_TEMPLATE_MODE :
      {
        'de' : 3,
        'es' : 1,
        'fr' : 2,
        'en' : 1,
        'cs' : 3,
        'sk' : 3,
        'it' : 1,
        'af' : 3,
        'ca' : 1,
        'ro' : 1,
        'et' : 3,
        'ko' : 3,
        'nl' : 1,
        'vi' : 1,
        'simple' : 1,
        'ru' : 3,
        'ja' : 2,
        'co' : 1,
        'el' : 1,
        'eo' : 1,
        'ga' : 1,
        'is' : 1,
        'li' : 1,
        'lv' : 1,
        'mg' : 2,
        'no' : 1,
        'oc' : 3,
        'sl' : 3,
        'tl' : 3
      },
    TRANSLIT_SUPPORTED :
      [
        'ru', 'uk', 'be', 'bg', 'mk'
      ],
    FORBIDDEN_IPA_CONTENT :
      [
        '…', '...', '//', '/ /', '[]', '[ ]', 'lang', '[ eˈxem.plo ]', '/xxxx/', '-'
      ],

    init : function () {
      var name;
      for (name in EConstants.LANG_CODES_SHORT) {
        if (EConstants.LANG_CODES_SHORT.hasOwnProperty(name)) {
          EConstants.CODE_TO_LANG[EConstants.LANG_CODES_SHORT[name]] = name;
        }
      }
      for (name in EConstants.LANG_CODES_LONG) {
        if (EConstants.LANG_CODES_LONG.hasOwnProperty(name)) {
          EConstants.CODE_TO_LANG[EConstants.LANG_CODES_LONG[name]] = 'język ' + name;
        }
      }
    }
  };

  EStr = {
    TOGGLE_EDITOR :
      'Przełącz edytor',
    ADD :
      '+ dodaj',
    ADD_INTRO:
      '+ sekcja wstępna',
    ADD_SECTION_MESSAGE :
      'Dodajesz nową sekcję językową.<br/>\
      Podaj nazwę języka (np. <tt>polski</tt>, <tt>tatarski</tt>) lub jego kod ISO (<tt>pl</tt>, <tt>tt</tt>).<br/>\
      <small>Zobacz też: \
      <a href="http://pl.wiktionary.org/wiki/Wikis%C5%82ownik:Zasady_tworzenia_hase%C5%82#Nag.C5.82.C3.B3wek" \
      target="_blank">Zasady tworzenia haseł: Nagłówek</a>.<br/>\
      Możesz też dodać niestandardowy nagłówek (np. akcenty, linki do poszczególnych wyrazów). W tym celu \
      wpisz cały kod nagłówka jak poniżej (bez znaków ==).</small>',
    ADD_SECTION_MESSAGE_DEFAULT :
      'Dodajesz nową sekcję językową.<br/>\
      Podaj nazwę języka (np. <tt>polski</tt>, <tt>tatarski</tt>) lub jego kod ISO (<tt>pl</tt>, <tt>tt</tt>).<br/>\
      <small>Zobacz też: \
      <a href="http://pl.wiktionary.org/wiki/Wikis%C5%82ownik:Zasady_tworzenia_hase%C5%82#Nag.C5.82.C3.B3wek" \
      target="_blank">Zasady tworzenia haseł: Nagłówek</a>.<br/>\
      Możesz też dodać niestandardowy nagłówek (np. akcenty, linki do poszczególnych wyrazów). W tym celu \
      wpisz cały kod nagłówka (bez znaków ==).</small>',
    ADD_SECTION_TEMPLATE :
      ' ({{język …}})',
    ADD_SECTION_TITLE :
      'Podaj tytuł sekcji',
    INTERNATIONAL_USAGE :
      'użycie międzynarodowe',
    POLISH :
      'język polski',
    POLISH_FOREIGN :
      'termin obcy w języku polskim',
    LATIN_FOREIGN :
      'termin obcy w języku łacińskim',
    CHINESE_SIGN :
      'znak chiński',
    ADD_SECTION_NONEXISTENT:
      'Brak języka. Sprawdź <a href="http://pl.wiktionary.org/wiki/Kategoria:Szablony_indeksuj%C4%85ce_j%C4%99zyk%C3%B3w"\
      target="_new">listę dostępnych języków</a>.',
    ADD_SECTION_NONEXISTENT_TITLE:
      'Nieprawidłowa wartość języka',
    ADD_SECTION_ALREADY:
      'W haśle istnieje już sekcja odpowiadająca wpisanemu przez Ciebie językowi. Sekcja ta została otwarta.',
    ADD_SECTION_ALREADY_TITLE:
      'Język już istnieje',
    INTRO_SECTION:
      'Sekcja wstępna:<br/>Interwiki, szablony ogólne',
    ADD_SECTION:
      'Dodaj nową sekcję językową',
    ADD_INTRO_SECTION:
      'Dodaj sekcję wstępną (interwiki, informacje ogólne).<br /><small>Linki interwiki dodawane są automatycznie po dodaniu sekcji.</small>',
    INTRO:
      'Sekcja wstępna',
    INTRO_MENU:
      'sekcja wstępna',
    OBLIGATORY_SUBSECTION:
      '<br />(sekcja obowiązkowa)',
    BOT_SUBSECTION:
      '<br />(dodaje automatycznie <a href="http://pl.wiktionary.org/wiki/Wikipedysta:Olafbot" target="_blank">bot</a>)',
    EDIT_SECTION_TITLE:
      'Edytuj nagłówek tej sekcji językowej',
    EDIT_SECTION_TITLE_MESSAGE:
      'Podaj nową zawartość nagłówka bieżącej sekcji językowej (bez znaków <tt>==</tt>)',
    DELETE_SECTION:
      'Usuń tę sekcję językową',
    DELETE_SECTION_MESSAGE:
      'Czy na pewno usunąć bieżącą sekcję językową?',
    OK:
      'OK',
    CANCEL:
      'Anuluj',
    WARNING:
      'Ostrzeżenie',
    CONFIRMATION:
      'Potwierdzenie',
    QUESTION:
      'Pytanie',
    KEYBOARD_ALWAYS:
      '<div class="keyboard_always"> \
      <a href="#" onclick="insertTags(\'•\', \'\', \'\'); return false">•</a> \
      <a href="#" onclick="insertTags(\'→\', \'\', \'\'); return false">→</a> \
      <a href="#" onclick="insertTags(\'~\', \'\', \'\'); return false">~</a> \
      <a href="#" onclick="insertTags(\'–\', \'\', \'\'); return false">–</a> \
      <a href="#" onclick="insertTags(\'„\', \'”\', \'\'); return false">„”</a> \
      </div>',
    WAITING_FOR_API:
      'Proszę poczekać, trwa wyszukiwanie za pomocą API…',
    ADD_IPA:
      'Szukaj IPA',
    ADD_INTERWIKI:
      'Dodaj (zaktualizuj) interwiki',
    ADD_PICTURE:
      'Szukaj ilustracji',
    ADD_AUDIO:
      'Szukaj nagrań dźwiękowych',
    ADD_INTERNAL_EXAMPLE:
      'Szukaj przykładów w Wikisłowniku',
    GET_IPA:
      'Spróbuj pobrać wymowę zapisaną w międzynarodowym alfabecie fonetycznym z innych wersji językowych Wikisłownika',
    GET_INTERWIKI:
      'Pobierz interwiki z innych wersji językowych Wikisłownika',
    GET_PICTURE:
      'Pobierz ilustrację z innych wersji językowych Wikisłownika',
    GET_AUDIO:
      'Pobierz nagranie dźwiękowe z innych wersji językowych Wikisłownika',
    GET_INTERNAL_EXAMPLE:
      'Pobierz przykłady z innych haseł w polskim Wikisłowniku',
    WILL_BE_SHOWN:
      '<br/><small>Wyniki zapytania z poszczególnych wersji językowych zostaną pokazane w okienku, które umożliwi ich proste dodawanie do hasła.</small>',
    NO_IPA_FOUND:
      'Nie znaleziono IPA',
    NO_PICTURE_FOUND:
      'Nie znaleziono ilustracji',
    NO_AUDIO_FOUND:
      'Nie znaleziono plików dźwiękowych',
    NO_INTERNAL_EXAMPLE_FOUND:
      'Nie znaleziono przykładu w Wikisłowniku',
    AJAX_IPA_RESULT_INSTRUCTION:
      '<div id="ajax_result_disc"><small>\
      Poniżej wyświetlono zapisy w międzynarodowym alfabecie fonetycznym, które udało się znaleźć \
      w artykułach o tej samej nazwie w innych wersjach językowych Wikisłownika. Kliknij wybrany wynik, aby wstawić go w miejscu, \
      w którym znajduje się teraz kursor.<br/> \
      Zapis zostanie wstawiony w szablonie <a href="http://pl.wiktionary.org/wiki/Wikis%C5%82ownik:Zasady_tworzenia_hase%C5%82#Sekcja_.27wymowa.27" \
      target="_blank"><tt>{{IPA}}</tt> lub <tt>{{IPA3}}</tt>, dostosuj to do danej sytuacji</a>. \
      </small></div>',
    VIEW_ARTICLE:
      'zobacz hasło',
    AJAX_PICTURE_RESULT_INSTRUCTION:
      '<div id="ajax_result_disc"><small>\
      Poniżej znajduje się lista ilustracji, które udało się znaleźć \
      w artykułach o tej samej nazwie w innych wersjach językowych Wikisłownika. Kliknij wybrany wynik, aby wstawić ten plik w miejscu, \
      w którym znajduje się teraz kursor.<br/> \
      Po najechaniu myszką na nazwę pliku pokaże się jego podgląd. \
      </small></div>',
    AJAX_AUDIO_RESULT_INSTRUCTION:
      '<div id="ajax_result_disc"><small>\
      Poniżej znajduje się lista nagrań dźwiękowych, które udało się znaleźć \
      w artykułach o tej samej nazwie w innych wersjach językowych Wikisłownika. Kliknij wybrany wynik, aby wstawić ten plik w miejscu, \
      w którym znajduje się teraz kursor.<br/> \
      Zapis zostanie wstawiony w szablonie <a href="http://pl.wiktionary.org/wiki/Wikis%C5%82ownik:Zasady_tworzenia_hase%C5%82#Sekcja_.27wymowa.27" \
      target="_blank"><tt>{{audio}}</tt> lub pokrewnym, dostosuj to do danej sytuacji</a>. \
      </small></div>',
    AJAX_INTERNAL_EXAMPLE_INSTRUCTION:
      '<div id="ajax_result_disc"><small>\
      Poniżej znajduje się lista przykładów użycia szukanego słowa, które udało się znaleźć \
      w artykułach Wikisłownika linkujących do tej strony. Kliknij wybrany wynik, aby wstawić ten przykład w miejscu, \
      w którym znajduje się teraz kursor.<br/> \
      Zapis zostanie wstawiony takiej postaci, w jakiej go widzisz. Pamiętaj, żeby sprecyzować, którego znaczenia wyrazu \
      dotyczy przykład. \
      </small></div>',
    ESCAPE:
      'Zamknij okno wyników.<br/><small>Możesz też użyć klawisza Esc</small>',
    SECTION_DERIVED_INACTIVE:
      'Sekcja <em>pochodne</em> jest nieaktywna.<br/><small>Nie zostanie dołączona do hasła, ponieważ wśród znaczeń hasła nie ma morfemu.</small>',
    SECTION_RELATED_INACTIVE:
      'Sekcja <em>pokrewne</em> jest nieaktywna.<br/><small>Nie zostanie dołączona do hasła, ponieważ wśród znaczeń hasła nie ma części mowy innej niż morfem.</small>',
    IPA_HEADER_INFO:
      'Wymowa znaleziona w sekcji oznaczonej nagłówkiem:<br />',
    IPA_HEADER_FAILED:
      '<small>Nie udało się rozpoznać sekcji językowej, w której znaleziono wymowę.</small>',
    IPA_HEADER_SIMPLE_ENGLISH:
      '<small>Wikisłownik <em>Simple English</em> zawiera tylko angielskie wyrazy.</small>'
  };


  EUtil = {
    getParameter : function (name) {
      return mw.util.getParamValue(name);
    },

    getSection : function () {
      return document.location.hash.replace('#', '');
    },

    isEditingSection : function () {
      return $('input[name="wpSection"]').val() !== '';
    },

    getActiveLangCode : function () {
      return EUi.activeLangCode;
    },

    getActiveLangId : function () {
      return EUi.activeLangId;
    },

    executeFn : function (functionName, context) { /*, args */
      var args = Array.prototype.slice.call(arguments, 2),
        namespaces = functionName.split('.'),
        func = namespaces.pop(),
        i;

      for (i = 0; i < namespaces.length; i += 1) {
        context = context[namespaces[i]];
      }
      return context[func].apply(context, args);
    },

    focusArea : function (subs, atEnd) {
      var elem = $('#ed_' + EUtil.getActiveLangId() + '_' + subs),
        len;

      elem.focus();
      if (atEnd && elem[0]) {
        if (elem[0].setSelectionRange) {
          len = elem.val().length * 2;
          elem[0].setSelectionRange(len, len);
        } else {
          elem.val(elem.val());
        }
        elem[0].scrollTop = 999999;
      }
    },

    isEmpty : function (obj) {
      var prop;

      for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }
      return true;
    },

    escapeHTML : function (html) {
      return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },

    escapeJS : function (js) {
      return js.replace(/\'/g, "\\'");
    },

    getUrl : function (langcode, page) {
      return 'http://' + langcode + '.wiktionary.org/wiki/' + mw.util.wikiUrlencode(page);
    }
  };

  $.fn.reverse = [].reverse;

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
      var i, j;
      for (i = (start || 0), j = this.length; i < j; i += 1) {
        if (this[i] === obj) { return i; }
      }
      return -1;
    };
  }

  String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };

  Ed = {

    code : '',
    content : {},

    parseContentToSections : function () {
      Ed.content.sections = EParser.getSections(Ed.code);
    },

    parseSectionsToSubsections : function () {
      var id, sec;

      for (id in Ed.content.sections) {
        if (Ed.content.sections.hasOwnProperty(id)) {
          sec = Ed.content.sections[id];
          ESectionParser.parse(sec);
        }
      }
    },

    init : function () {
      var tbox, oldform;

      if (EUtil.getParameter('oldid') && EUtil.getParameter('oldid') !== mw.config.get('wgCurRevisionId').toString()) {
        return;
      }
      EConstants.init();

      tbox = $('#wpTextbox1');
      oldform = $('div.wikiEditor-ui, #nat-instrukcja, #wpTextbox1, #toolbar');
      Ed.code = tbox.val();

      Ed.parseContentToSections();
      Ed.parseSectionsToSubsections();

      EUi.prepareForm(oldform, tbox);

    },

    resetNew : function () {
      var tbox = $('#wpTextbox1');

      Ed.content = {};
      Ed.code = tbox.val();
      Ed.parseContentToSections();
      Ed.parseSectionsToSubsections();

      EUi.reset();
    }

  };

  EParser = {
    getSections : function (code, lang) {
      var sections, reta, s, sec, section, id;

      if (lang === undefined) {
        code = code.replace(/^==([^=][^\n]+?)==\s*$/gm, '<BE>$1<EN>');
      } else {
        switch (lang) {
        case 'ru':
          code = code.replace(/^(=([^=][^\n]+?)=)\s*$/gm, '<BE>$1<EN>');
          break;
        case 'fr':
        case 'li':
        case 'nl':
        case 'oc':
          code = code.replace(/^((==\s*)?\{\{=([^=\-][^\n]*?)=\}\}(\s*==)?)\s*$/gm, '<BE>$1<EN>');
          break;
        case 'lv':
          code = code.replace(/^(\{\{-([^=\-][^\n]*?)-\}\})\s*$/gm, '<BE>$1<EN>');
          break;
        case 'co':
        case 'ga':
          code = code.replace(/^(\{\{-\w\w-\}\})\s*$/gm, '<BE>$1<EN>');
          break;
        case 'is':
          code = code.replace(/^(\{\{-\w{2,3}-\}\})\s*$/gm, '<BE>$1<EN>');
          break;
        case 'it':
          code = code.replace(/^(\{\{in\|[^\}]+\}\})\s*$/gm, '<BE>$1<EN>');
          break;
        case 'es':
          code = code.replace(/^(\{\{[A-Z\-]{2,}\|[^\}]+\}\})\s*$/gm, '<BE>$1<EN>');
          break;
        case 'af':
          code = code.replace(/^(\{\{-\w\w-\}\})\s*$/gm, '<BE>$1<EN>');
          code = code.replace(/^(==([^=][^\n]+?)==)\s*$/gm, '<BE>$1<EN>');
          break;
        default:
          code = code.replace(/^(==([^=][^\n]+?)==)\s*$/gm, '<BE>$1<EN>');
          break;
        }
      }
      sections = code.split('<BE>');
      reta = {};
      for (s in sections) {
        if (sections.hasOwnProperty(s) && sections[s].length) {
          sec = sections[s].split('<EN>');

          if (sec.length === 1) {
            // sekcja zerowa
            reta[EConstants.SECTION_ID_INTRO] = {
              content : $.trim(sec[0]),
              title : '',
              id : EConstants.SECTION_ID_INTRO,
              initcontent: $.trim(sec[0])
            };
          } else if (lang === undefined) {
            // polski
            section = this.getSectionFromTitle($.trim(sec[0]));
            id = section.id;
            reta[id] = section;
            reta[id].content = $.trim(sec[1]);
          } else {
            reta[sec[0]] = { title: sec[0], content: $.trim(sec[1]) };
          }
        }
      }

      return reta;
    },

    getSectionFromTitle : function (str) {
      var template = this.insideTemplate(str);

      return {
        'title' : str,
        'short' : template.replace(/język /, ''),
        'content' : '',
        'id' : this.langId(template),
        'code'  : this.langCode(template),
        'initcontent' : ''
      };
    },

    getTitleFromCode : function (code) {
      var lang,
        pagename = mw.config.get('wgPageName').replace(/_/g, ' ');

      if (code === 'zh-char' || code === 'zh') {
        pagename = '{{zh|' + pagename + '}}';
      } else if (code === 'ja' || code === 'ko') {
        pagename = '{{' + code + '|' + pagename + '}}';
      }
      lang = EConstants.CODE_TO_LANG[code] || code;
      return pagename + ' ({{' + lang + '}})';
    },

    getSectionFromCodeAndLang : function (code, lang) {
      return {
        'title' : EParser.getTitleFromCode(code),
        'short' : lang.replace(/język /, ''),
        'content' : '',
        'id' : this.langId(lang),
        'code'  : code,
        'initcontent' : ''
      };
    },

    langId : function (langname) {
      if (langname === EStr.INTERNATIONAL_USAGE) {
        return EConstants.SECTION_ID_INTERNATIONAL;
      } else if (langname === EStr.POLISH) {
        return EConstants.SECTION_ID_POLISH;
      } else if (langname === EStr.POLISH_FOREIGN) {
        return EConstants.SECTION_ID_POLISH_FOREIGN;
      } else if (langname === EStr.CHINESE_SIGN) {
        return EConstants.SECTION_ID_CHINESE_SIGN;
      } else if (langname === EStr.LATIN_FOREIGN) {
        return EConstants.SECTION_ID_LATIN_FOREIGN;
      }
      langname = langname.replace(/język /, '').replace(/[ąáåã]/g, 'azz').replace(/ć/g, 'czz');
      langname = langname.replace(/[ęè]/g, 'ezz').replace(/ł/g, 'lzz').replace(/ń/g, 'nzz').replace(/[óõ]/g, 'ozz');
      langname = langname.replace(/ś/g, 'szz').replace(/ü/g, 'uzz').replace(/ź/g, 'zzy').replace(/ż/g, 'zzz');
      langname = langname.replace(/[ \|!\(\)]/g, '_');
      return langname;
    },

    getSectionFromInput : function (str) {
      var code,
        langname = EConstants.CODE_TO_LANG[str];

      if (langname !== undefined) {
        return this.getSectionFromCodeAndLang(str, langname);
      }

      code = EConstants.LANG_CODES_SHORT[str];
      if (code !== undefined) {
        return this.getSectionFromCodeAndLang(code, str);
      }
      code = EConstants.LANG_CODES_LONG[str];
      if (code !== undefined) {
        return this.getSectionFromCodeAndLang(code, 'język ' + str);
      }
      return this.getSectionFromTitle(str);
    },

    insideTemplate  : function (str) {
      return str.replace(/.*\{\{(.*?)(\}\}|\|).*/g, '$1');
    },

    langCode : function (lang) {
      var code;

      if (lang.indexOf('język ') !== -1) {
        lang = lang.replace(/język /, '');
        code = EConstants.LANG_CODES_LONG[lang];
      } else {
        code = EConstants.LANG_CODES_SHORT[lang];
      }
      return code || lang;
    },

    extractSubsections : function (str, name) {
      var sec, index, re,
        sections = EParser.getSections(str),
        subsections = [];

      $.each(sections, function () {
        if (!this.content) {
          return true;
        }
        sec = this.content;
        index = sec.indexOf('{{' + name + '}}');
        if (index > -1) {
          sec = sec.substring(index + name.length + 4);
          re = new RegExp('\\{\\{(' + EConstants.SUBSECTIONS.ALL.join('|') + ')[\\}\\|]');
          subsections.push(sec.substring(0, sec.search(re)));
        }
      });
      return subsections.join('');
    }
  };

  ESectionParser = {

    parse: function (section) {
      var i, targetSubsections,
        subsections = [],
        mode = '',
        code = section.code;

      if (!section.title) {
        mode = 'INTRO';
      } else if (code === 'pl') {
        mode = 'POLISH';
      } else if (code === 'zh-char') {
        mode = 'CHINESE';
      } else if (code === 'egy') {
        mode = 'EGYPTIAN';
      } else if (code === 'ko') {
        mode = 'KOREAN';
      } else if (code === 'ja') {
        mode = 'JAPANESE';
      } else if (code === 'eo') {
        mode = 'ESPERANTO';
      } else if (code === 'inter') {
        mode = 'INTERNATIONAL';
      } else if (EConstants.NON_LATIN_LANGS.indexOf(code) !== -1) {
        mode = 'NON_LATIN';
      } else if (EConstants.DOUBLE_LANGS.indexOf(code) !== -1) {
        mode = 'DOUBLE';
      } else {
        mode = 'LATIN';
      }
      subsections.push({ title: '', content: '', shortened: false, active: true });
      for (i in EConstants.SUBSECTIONS.ALL) {
        if (EConstants.SUBSECTIONS.ALL.hasOwnProperty(i)) {
          subsections.push({
            title: EConstants.SUBSECTIONS.ALL[i],
            content: '',
            shortened: true,
            initcontent: '',
            initmultiline: false,
            active: true
          });
        }
      }

      switch (mode) {
      case 'INTRO':
        targetSubsections = []; break;
      case 'POLISH':
        targetSubsections = EConstants.SUBSECTIONS.POLISH; break;
      case 'CHINESE':
        targetSubsections = EConstants.SUBSECTIONS.CHINESE; break;
      case 'KOREAN':
        targetSubsections = EConstants.SUBSECTIONS.KOREAN; break;
      case 'JAPANESE':
        targetSubsections = EConstants.SUBSECTIONS.JAPANESE; break;
      case 'ESPERANTO':
        targetSubsections = EConstants.SUBSECTIONS.ESPERANTO; break;
      case 'INTERNATIONAL':
        targetSubsections = EConstants.SUBSECTIONS.INTERNATIONAL; break;
      case 'EGYPTIAN':
        targetSubsections = EConstants.SUBSECTIONS.EGYPTIAN; break;
      case 'NON_LATIN':
        targetSubsections = EConstants.SUBSECTIONS.NON_LATIN; break;
      case 'DOUBLE':
        targetSubsections = EConstants.SUBSECTIONS.DOUBLE; break;
      case 'LATIN':
        targetSubsections = EConstants.SUBSECTIONS.LATIN; break;
      default:
        targetSubsections = []; break;
      }

      section.subsections = subsections;
      section.mode = mode;
      ESectionParser.parsePreparedSubsections(section, targetSubsections);
    },

    alternateTitle : function (title) {
      switch (title) {
      case 'transliteracja': return '|trans';
      case 'transkrypcja': return '|transkr';
      case 'kreski': return '|hanja-kreski';
      case 'przykłady': return '|użycie';
      default: return '';
      }
    },

    parsePreparedSubsections : function (section, targetSubsections) {
      var i, j, title, alt, regex, sub, pos, repl, changed, firstbreak,
        str = section.content,
        subsections = section.subsections,
        positions = [];

      for (i in subsections) {
        if (subsections.hasOwnProperty(i)) {
          title = subsections[i].title;
          alt = ESectionParser.alternateTitle(title);
          regex = new RegExp('\\{\\{(' + title + alt + ')\\s*[\\|\\}]', 'g');
          positions.push({
            index: title === '' ? 0 : str.search(regex),
            title: title
          });
        }
      }
      positions.sort(function (a, b) {
        if (!a.index && !b.index) {
          return a.title ? 1 : -1;
        }
        return a.index - b.index;
      });

      for (i in subsections) {
        if (subsections.hasOwnProperty(i)) {
          sub = subsections[i];
          for (j in positions) {
            if (positions.hasOwnProperty(j)) {
              j = parseInt(j, 10);
              pos = positions[j];
              if (pos.title === sub.title) {
                if (pos.index !== -1) {
                  if (j < positions.length - 1) {
                    sub.content = $.trim(str.substring(pos.index, positions[j + 1].index));
                  } else {
                    sub.content = $.trim(str.substring(pos.index));
                  }
                  alt = ESectionParser.alternateTitle(sub.title);
                  repl = new RegExp('\\{\\{(' + sub.title + alt + ')\\}\\}');
                  changed = sub.content.replace(repl, '');

                  if (changed !== sub.content) {
                    firstbreak = changed.search(/\n/);
                    if (firstbreak !== -1 && firstbreak < changed.search(/\S/)) {
                      sub.initmultiline = true;
                    }
                    sub.content = $.trim(changed);
                  } else if (sub.content !== '' || sub.title === '') {
                    sub.shortened = false;
                  }
                  if (targetSubsections.indexOf(pos.title) === -1 && sub.content === '' && sub.title !== '') {
                    sub.active = false;
                  } else {
                    sub.initcontent = sub.content;
                  }
                  break;
                } else if (targetSubsections.indexOf(pos.title) === -1) {
                  sub.active = false;
                }
              }
            }
          }
        }
      }
    },

    obligatorySubsection : function (subsection, section) {
      return (subsection.title === 'znaczenia') && (section.mode !== 'CHINESE');
    },

    botSubsection : function (subsection, section) {
      return (subsection.title === 'wymowa') && (section.mode === 'POLISH') && !subsection.content;
    }
  };

  EPrinter = {
    recalculateCode : function () {
      var id, sec, i, j, subs,
        code = [],
        sortableSections = [];

      for (id in Ed.content.sections) {
        if (Ed.content.sections.hasOwnProperty(id)) {
          sec = Ed.content.sections[id];
          EUi.removeDefaultTexts(id, sec.code);
          sortableSections.push(sec);
        }
      }
      sortableSections.sort(function (a, b) { return a.id > b.id ? 1 : -1; });

      for (i in sortableSections) {
        if (sortableSections.hasOwnProperty(i)) {
          sec = sortableSections[i];
          if (sec.id === EConstants.SECTION_ID_INTRO) {
            code.push(EUi.val(EConstants.SECTION_ID_INTRO, '') + '\n');
          } else {
            code.push('== ' + sec.title + ' ==\n');
            for (j = 0; j < sec.subsections.length; j += 1) {
              subs = sec.subsections[j];
              if (subs.active) {
                subs.content = EUi.val(sec.id, subs.title);

                if (!subs.title && subs.content) {
                  code.push(subs.content + '\n');
                } else if (subs.title && !subs.content) {
                  code.push('{{' + subs.title + '}}\n');
                } else if (subs.shortened) {
                  code.push('{{' + subs.title + '}}' + EPrinter.adequateWhitespace(subs) + subs.content + '\n');
                } else if (subs.content) {
                  code.push(subs.content + '\n');
                }
              }
            }
            code.push('\n');
          }
        }
      }
      return $.trim(code.join('')).replace(/ {2,}/g, ' ');
    },

    adequateWhitespace : function (subsection) {
      var str = subsection.content;
      /*
       * Teksty zaczynające się od dwukropka, gwiazdki, zaczynające się od "<references", "{{litera|", "{{kolor|",
       * szablony zaczynające się na "{{zch-", linki do grafiki (file:, grafika: image: media: plik:, to samo dużą literą,
       * możliwe białe znaki między nawiasami kwadratowymi a tym słowem),...
       */
      if (str.search(/[:\*#]|<references|\{\{(litera|kolor)\||\{\{zch-|\[\[(file|image|grafika|plik|media):/i) === 0) {
        return '\n';
      }
      /*
       * ...teksty w polach "znaczenia", "przykłady" oraz "tłumaczenia" nie mogą występować zaraz po szablonie, jeśli
       * występują muszą być przeniesione bez dodawania dwukropka.
       */
      if (EConstants.SUBSECTIONS_WITH_NL.indexOf(subsection.title) !== -1) {
        return '\n';
      }
      /*
       * Inne teksty składające się z więcej niż jednej linii, powinny być przeniesione z dodaniem dwukropka i spacji
       * na początku pierwszej linii
       */
      if (str.indexOf('\n') !== -1 && str.search(/[:\*#]/) !== 0) {
        return '\n: ';
      }
      /*
       * Wpp: dla wypełnionych przed edycją pól zachowujemy istniejące formatowanie o ile dane pole już było niepuste.
      */
      if (subsection.initcontent) {
        return subsection.initmultiline ? '\n: ' : ' ';
      }
      /*
       * w polach pustych przed edycją: w sekcjach "wymowa", "transliteracja", "transkrypcja", "ortografie", "klucz",
       * "kreski", "czytania", "hanja-kreski" defaultem jest pisanie bezpośrednio po szablonie (po spacji)...
       */
      if (EConstants.SUBSECTIONS_WITHOUT_NL.indexOf(subsection.title) !== -1) {
        return ' ';
      }
      /*
       * a w pozostałych od następnej linii (jeśli nie jest to "znaczenie" ani pierwsza sekcja ani "przykłady",
       * ani "tłumaczenia" a tekst nie zaczyna się od dwukropka lub gwiazdki, to program powinien sam dodać dwukropek i spację)
       */
      return '\n: ';
    },

    resultToHTML : function (mode, res) {
      switch (mode) {
      case EConstants.MODE_IPA:
        return EPrinter.ipaResult(res);
      case EConstants.MODE_PICTURE:
        return EPrinter.pictureResult(res);
      case EConstants.MODE_AUDIO:
        return EPrinter.audioResult(res);
      case EConstants.MODE_INTERNAL_EXAMPLE:
        return EPrinter.internalExample(res);
      default:
        break;
      }
      return '';
    },

    ipaResult : function (res) {
      var arr = [],
        dl = $('<dl/>');

      $.each(res, function (lang, langresult) {
        arr.push({
          lang: lang,
          arr: langresult,
          caption : EConstants.WIKTCODE_TO_LANG[lang] || EConstants.CODE_TO_LANG[lang].replace('język', 'Wikisłownik') || lang
        });
      });
      arr.sort(function (a, b) {
        var active = EUtil.getActiveLangCode();

        if (a.lang === active) {
          return -1;
        } else if (b.lang === active) {
          return 1;
        } else {
          return a.caption > b.caption ? 1 : -1;
        }
      });

      $.each(arr, function () {
        var dt = $('<dt/>'),
          dd = $('<dd/>'),
          arrelem = this,
          title = mw.config.get('wgTitle');

        dt.append(arrelem.caption + ' ');
        dt.append('<a href="' + EUtil.getUrl(arrelem.lang, title) + '" target="_blank">[' + EStr.VIEW_ARTICLE + ']</a>');
        $.each(arrelem.arr, function () {
          var withOuter = EPrinter.ipaWithOuter(this.ipa, arrelem.lang),
            beg = withOuter.template === 'IPA' ? '/' : '[',
            end = withOuter.template === 'IPA' ? '/' : ']',
            link = $('<a class="ipa tip tipdown"/>');

          link.click(function () {
            EPrinter.insertCode('{{' + withOuter.template + '|' + withOuter.str + '}} ', '', '', '+IPA z [[:' + arrelem.lang + ':' + title + ']]');
            return false;
          });
          link.append(beg + withOuter.str + end);
          if (arrelem.lang === 'simple') {
            link.data('tip', EStr.IPA_HEADER_SIMPLE_ENGLISH);
          } else if (this.header) {
            link.data('tip', EStr.IPA_HEADER_INFO + '<tt>' + this.header + '</tt>');
          } else {
            link.data('tip', EStr.IPA_HEADER_FAILED);
          }
          dd.append(link).append(' ');
        });
        dl.append(dt).append(dd);
        if (arrelem.lang === EUtil.getActiveLangCode()) {
          dt.addClass('native');
          dd.addClass('native');
        }
      });
      return $(EStr.AJAX_IPA_RESULT_INSTRUCTION).append(dl);
    },

    ipaWithOuter : function (str, lang) {
      if (EConstants.IPA_TEMPLATE_MODE[lang] === EConstants.IPA_MODE_ADDS_SLASH) {
        return { template: 'IPA', str: str };
      } else if (EConstants.IPA_TEMPLATE_MODE[lang] === EConstants.IPA_MODE_ADDS_BRACKET) {
        return { template: 'IPA3', str: str };
      } else {
        if (str.indexOf('/') !== -1) {
          return { template: 'IPA', str: str.replace(/(^\s*\/\s*|\s*\/\s*$)?/g, '') };
        } else if (str.indexOf('[') !== -1) {
          return { template: 'IPA3', str: str.replace(/(^\s*\[\s*|\s*\]\s*$)?/g, '') };
        } else {
          return { template: 'IPA', str: str };
        }
      }
    },

    pictureResult : function (res) {
      var arr = [],
        dl = $('<dl/>');

      $.each(res, function (lang, langresult) {
        langresult.sort();
        arr.push({
          lang: lang,
          arr: langresult,
          caption : EConstants.WIKTCODE_TO_LANG[lang] || EConstants.CODE_TO_LANG[lang].replace('język', 'Wikisłownik') || lang
        });
      });
      arr.sort(function (a, b) {
        return a.caption > b.caption ? 1 : -1;
      });

      $.each(arr, function () {
        var dt = $('<dt/>'),
          dd = $('<dd/>'),
          arrelem = this;

        dt.append(arrelem.caption + ' ');
        dt.append('<a href="' + EUtil.getUrl(arrelem.lang, mw.config.get('wgTitle')) + '" target="_blank">[' + EStr.VIEW_ARTICLE + ']</a>');
        $.each(arrelem.arr, function () {
          var link = $('<a class="pictureInsertLink tip tipdown"/>'),
            elem = this.toString();

          link.html(elem);
          link.click(function () {
            var title = mw.config.get('wgTitle'),
              last = title.charCodeAt(title.length - 1);

            if (last >= 0x590 && last <= 0x85f) {
              EPrinter.insertCode('[[Plik:' + elem + '|thumb|' + title, ' &lrm;(1.1)]]\n', '', '+ilustracja z [[:' + arrelem.lang + ':' + title + ']]');
            } else {
              EPrinter.insertCode('[[Plik:' + elem + '|thumb|' + title, ' (1.1)]]\n', '', '+ilustracja z [[:' + arrelem.lang + ':' + title + ']]');
            }
            return false;
          });
          dd.append(link).append(' ');
        });
        dl.append(dt).append(dd);
      });
      return $(EStr.AJAX_PICTURE_RESULT_INSTRUCTION).append(dl);
    },

    setPictureTooltips : function () {
      $('#ajax_results a.pictureInsertLink').each(function () {
        var index = 'File:' + $(this).text().replace(/_/g, ' '),
          img = EAutomator.imageCache[index] || '';

        $(this).data('tip', img);
      });
    },

    audioResult : function (res) {
      var arr = [],
        dl = $('<dl/>');

      $.each(res, function (lang, langresult) {
        langresult.sort();
        arr.push({
          lang: lang,
          arr: langresult,
          caption : EConstants.WIKTCODE_TO_LANG[lang] || EConstants.CODE_TO_LANG[lang].replace('język', 'Wikisłownik') || lang
        });
      });
      arr.sort(function (a, b) {
        return a.caption > b.caption ? 1 : -1;
      });

      $.each(arr, function () {
        var dt = $('<dt/>'),
          dd = $('<dd/>'),
          arrelem = this;

        dt.append(arrelem.caption + ' ');
        dt.append('<a href="' + EUtil.getUrl(arrelem.lang, mw.config.get('wgTitle')) + '" target="_blank">[' + EStr.VIEW_ARTICLE + ']</a>');
        $.each(arrelem.arr, function () {
          var elem = this,
            template = EPrinter.audioTemplate(elem),
            link = $('<a/>');

          elem = elem.replace(/\{\{(PAGENAME|pn)\}\}/g, mw.config.get('wgTitle'));
          link.html(elem);
          link.click(function () {
            EPrinter.insertCode('{{' + template + '|' + elem + '}} ', '', '', '+nagranie wymowy');
            return false;
          });
          dd.append(link).append(' ');
        });
        dl.append(dt).append(dd);
      });
      return $(EStr.AJAX_AUDIO_RESULT_INSTRUCTION).append(dl);
    },

    audioTemplate : function (filename) {
      if (filename.indexOf('En-us-') === 0) {
        return 'audioUS';
      } else if (filename.indexOf('En-uk-') === 0) {
        return 'audioUK';
      } else if (filename.indexOf('En-au-') === 0) {
        return 'audioAU';
      } else if (filename.indexOf('En-ca-') === 0) {
        return 'audioCA';
      } else if (filename.indexOf('De-at-') === 0) {
        return 'audioAT';
      }
      return 'audio';
    },

    internalExample : function (res) {
      var dl = $('<dl/>');

      $.each(res, function (title, example) {
        var dt = $('<dt/>'),
          dd = $('<dd/>'),
          link = $('<a/>');

        dt.append('Hasło <a class="normalsize" href="' + mw.util.wikiGetlink(title) + '" target="_blank">' + title + '</a>:');
        link.text(example);
        link.click(function () {
          EPrinter.insertCode(example, '', '', '+przykład z hasła [[' + title + ']]');
          return false;
        });
        dd.append(link);
        dl.append(dt).append(dd);
      });

      return $(EStr.AJAX_INTERNAL_EXAMPLE_INSTRUCTION).append(dl);
    },

    appendEditDescription : function (res) {
      var input = $('#wpSummary'),
        val = input.val();

      if (!val) {
        input.val(res);
      } else if (val.indexOf(res) === -1) {
        if (val.endsWith('*/')) {
          input.val(val + ' ' + res);
        } else if (val.endsWith('*/ ')) {
          input.val(val + res);
        } else {
          input.val(val + ', ' + res);
        }
      }
    },

    insertCode : function (pre, post, mid, editDescription) {
      insertTags(pre, post, mid);
      EPrinter.appendEditDescription(editDescription);
      EUi.hideResult();
    }
  };

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
        sec.code = EStr.INTRO_MENU;
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
      EAutomator.addTransliteration(id, section.code);
    },

    getSubsectionObj : function (langid, section, subsection) {
      var name = langid + '_' + subsection.title.replace(/ /g, '_'),
        p = $('<p id="ed_subsection_' + name + '"/>'),
        caption = langid === EConstants.SECTION_ID_INTRO ? EStr.INTRO : EConstants.SUBSECTION_TITLE[subsection.title],
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
      $('form').submit(function () {
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
      EUi.addExtraButtons(id, 'przykłady', EConstants.API_ID[EConstants.MODE_INTERNAL_EXAMPLE], EStr.ADD_INTERNAL_EXAMPLE,
          EAutomator.getInternalExample, EStr.GET_INTERNAL_EXAMPLE + EStr.WILL_BE_SHOWN);
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

      if (ajr.length > 0 && button.length > 0) {
        nPos.top = button.position().top;
        nPos.left = textbox.position().left + 60;
        ajr.css(nPos);
        ajr.width(textbox.outerWidth() - 120);
      }
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
    },

    removeDefaultTexts : function (langid) {
      var subs, defaultText,
        arr = langid === '0002' ? EConstants.SAMPLE_SUBSECTION_CONTENTS_POLISH : EConstants.SAMPLE_SUBSECTION_CONTENTS_FOREIGN;

      for (subs in arr) {
        if (arr.hasOwnProperty(subs)) {
          defaultText = arr[subs];
          if (EUi.isDefaultText(langid, subs, 0)) {
            EUi.val(langid, subs, '');
          }
        }
      }
    },

    isDefaultText : function (langid, subsection, extendedMode) {
      var arr = langid === '0002' ? EConstants.SAMPLE_SUBSECTION_CONTENTS_POLISH : EConstants.SAMPLE_SUBSECTION_CONTENTS_FOREIGN,
        val = EUi.val(langid, subsection);

      if (extendedMode && val.search(/^: \(\d+\.\d+\)$/) !== -1) {
        EUi.val(langid, subsection, val + ' ');
        return true;
      } else {
        return val === $.trim(arr[subsection]);
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
      meaningTA.blur(updateEsperanto).focus(updateEsperanto);
      updateEsperanto();
    }
  };


  ESpecialChars = {

    obj : undefined,
    formerParent : undefined,
    detached : 0,

    detach : function () {
      var container;

      if (ESpecialChars.detached) {
        return;
      }
      container = $('#keyboard_keys');
      ESpecialChars.obj = $('#editpage-specialchars');
      ESpecialChars.formerParent = ESpecialChars.obj.parent();
      ESpecialChars.obj.detach();

      container.append(ESpecialChars.obj);
      ESpecialChars.detached = 1;
    },

    attach : function () {
      if (!ESpecialChars.detached) {
        return;
      }
      EKeyboard.hide();
      ESpecialChars.obj.detach();
      ESpecialChars.formerParent.append(ESpecialChars.obj);
      ESpecialChars.detached = 0;
    },

    toggle : function () {
      if (ESpecialChars.detached) {
        ESpecialChars.attach();
      } else {
        ESpecialChars.detach();
      }
    }
  };

  EKeyboard = {
    opened : 0,

    init : function () {
      var keyboard = $('<div id="keyboard"/>'),
        keys = $('<div id="keyboard_keys" />');

      keyboard.hide();
      keys.hide().append(EStr.KEYBOARD_ALWAYS);
      $('body').append(keyboard).append(keys);

      if (EUi.usingNew) {
        ESpecialChars.detach();
      }
      EKeyboard.opened = $.cookie('keyboard_opened') === '1';

      keyboard.click(function () {
        keys.toggle();
        EKeyboard.opened = !EKeyboard.opened;
        $.cookie('keyboard_opened', +EKeyboard.opened);
        return false;
      });
      if (EKeyboard.opened) {
        keys.show();
      }

      $(window).resize(function () {
        if (document.activeElement) {
          $(document.activeElement).focus();
        }
      });
      $('#ed .keyboardable').live('focus', $(this).keyboard);
    },

    hide : function () {
      $('#keyboard').hide();
      $('#keyboard_keys').hide();
    },

    updatePosition : function (origin) {
      var nPos;
      if (!origin.is(':visible')) {
        EKeyboard.hide();
        return;
      }
      nPos = origin.offset();

      nPos.top += (origin.height() + 7);
      nPos.left += 20;
      $('#keyboard').show().css(nPos);
      $('#keyboard_keys').css({ top: nPos.top, left: nPos.left + 34 }).data('active_area', origin.attr('id'));

      window.insertTags = EKeyboard.insertTags;
    },

    insertTags : function (tagOpen, tagClose, sampleText) {
      var txtarea, aname, areas, selText, isSample = false,
        winScroll, range, textScroll, startPos, endPos;

      function checkSelectedText() {
        if (!selText) {
          selText = sampleText;
          isSample = true;
        } else if (selText.charAt(selText.length - 1) === ' ') { //exclude ending space char
          selText = selText.substring(0, selText.length - 1);
          tagClose += ' ';
        }
      }

      if (document.editform && !EUi.usingNew) {
        txtarea = document.editform.wpTextbox1;
      } else if (EUi.usingNew) {
        aname = $('#keyboard_keys').data('active_area');
        txtarea = aname ? document.getElementById(aname) : undefined;
      }
      if (!txtarea) {
        areas = document.getElementsByTagName('textarea');
        txtarea = areas[0];
      }
      if (document.selection  && document.selection.createRange) {
        if (document.documentElement && document.documentElement.scrollTop) {
          winScroll = document.documentElement.scrollTop;
        } else if (document.body) {
          winScroll = document.body.scrollTop;
        }
        txtarea.focus();
        range = document.selection.createRange();
        selText = range.text;
        checkSelectedText();
        range.text = tagOpen + selText + tagClose;
        if (isSample && range.moveStart) {
          if (is_opera && is_opera_seven && !is_opera_95) {
            tagClose = tagClose.replace(/\n/g, '');
          }
          range.moveStart('character', -tagClose.length - selText.length);
          range.moveEnd('character', -tagClose.length);
        }
        range.select();
        if (document.documentElement && document.documentElement.scrollTop) {
          document.documentElement.scrollTop = winScroll;
        } else if (document.body) {
          document.body.scrollTop = winScroll;
        }

      } else if (txtarea.selectionStart || txtarea.selectionStart === 0) {
        textScroll = txtarea.scrollTop;
        txtarea.focus();
        startPos = txtarea.selectionStart;
        endPos = txtarea.selectionEnd;
        selText = txtarea.value.substring(startPos, endPos);
        checkSelectedText();
        txtarea.value = txtarea.value.substring(0, startPos) +
          tagOpen + selText + tagClose +
          txtarea.value.substring(endPos, txtarea.value.length);
        if (isSample) {
          txtarea.selectionStart = startPos + tagOpen.length;
          txtarea.selectionEnd = startPos + tagOpen.length + selText.length;
        } else {
          txtarea.selectionStart = startPos + tagOpen.length + selText.length + tagClose.length;
          txtarea.selectionEnd = txtarea.selectionStart;
        }
        txtarea.scrollTop = textScroll;
      }
      $(txtarea).autoresize();
      EUi.relocateResult();
    }

  };

  (function ($) {
    $.fn.keyboard = function () {
      $(this).focus(function () {
        EKeyboard.updatePosition($(this));
      });
      EKeyboard.updatePosition($(this));
      return $(this);
    };
  }(jQuery));

  EApi = {
    url : function (lang, project) {
      if (lang === undefined) {
        lang = 'pl';
      }
      if (project === undefined) {
        project = EConstants.WIKTIONARY;
      }
      return 'http://' + lang + '.' + project + '.org/w/api.php?';
    },

    commonsUrl : function () {
      return EApi.url('commons', EConstants.WIKIMEDIA);
    },

    wikiUrl : function (lang) {
      return EApi.url(lang, EConstants.WIKIPEDIA);
    },

    ask__prv : function (query, url) {
      if (url === undefined) {
        url = EApi.url();
      }
      query.action = 'query';
      query.format = 'json';
      query.meta = 'siteinfo';
      query.callback = 'EApi.callback';
      url += $.param(query);
      mw.loader.load(url);
    },

    ask : function (query, callback, url) {
      if (EApi.waiting) {
        jAlert(EStr.WAITING_FOR_API);
        return -1;
      }
      EApi.waitingName = callback;
      EApi.waiting = 1;
      EApi.ask__prv(query, url);
      return 0;
    },

    askMore : function (queries, callback) {
      var i, count = 0;

      if (EApi.waiting) {
        jAlert(EStr.WAITING_FOR_API);
        return -1;
      }
      EApi.waitingName = callback;

      for (i in queries) {
        if (queries.hasOwnProperty(i)) {
          count += 1;
        }
      }
      EApi.waiting = count;
      $.each(queries, function (url, query) {
        EApi.ask__prv(query, url);
      });
      return 0;
    },

    callback : function (res) {
      var tmp = String(EApi.waitingName);
      EApi.waitingResults.push(res);
      EApi.waiting -= 1;
      if (!EApi.waiting) {
        EApi.waitingName = '';
        EUtil.executeFn(tmp, window, EApi.waitingResults);
        EApi.waitingResults = [];
      }
    },

    started : function (mode) {
      var idpart = EConstants.API_ID[mode],
        elem = $('#ed_' + EUtil.getActiveLangId() + '_extra_' + idpart);

      elem.removeClass('apidone apierror').addClass('apistarted');
      if (elem.data('orig_html')) {
        elem.html(elem.data('orig_html'));
      }
    },

    done : function (mode, res, subs, error) {
      var idpart = EConstants.API_ID[mode],
        elem = $('#ed_' + EUtil.getActiveLangId() + '_extra_' + idpart);

      if (error === undefined) {
        elem.addClass('apidone').removeClass('apistarted apierror');
        if (res !== undefined) {
          EUi.showResult(EPrinter.resultToHTML(mode, res), idpart);
        }
      } else {
        elem.addClass('apierror').removeClass('apistarted apidone').data('orig_html', elem.html()).html(error);
      }
      if (subs !== undefined) {
        EUtil.focusArea(subs, EUi.isDefaultText(EUtil.getActiveLangId(), subs, 1));
      }
    },

    waiting : 0,
    waitingName : '',
    waitingResults : []
  };

  EAutomator = {

    /*
     * Zwraca kody wersji językowej z aktywnej sekcji + domyślnych
     */
    getActiveLangs : function () {
      var ret = EConstants.USED_WIKTIONARIES.slice(0),
        act = EUtil.getActiveLangCode();

      if (ret.indexOf(act) === -1 && act !== 'pl' && EConstants.ALL_WIKTIONARIES.indexOf(act) !== -1) {
        ret.push(act);
      }
      return ret;
    },

    /*
     * Zwraca kody wszystkich wersji językowych z sekcji + domyślnych
     */
    getAllLangs : function () {
      var id, code,
        ret = EConstants.USED_WIKTIONARIES.slice(0);

      for (id in Ed.content.sections) {
        if (Ed.content.sections.hasOwnProperty(id)) {
          code = Ed.content.sections[id].code;
          if (code !== undefined) {
            code = code.replace(/-.*/, '');
            if (code.length > 1 && code.length < 7 && code !== 'pl' && ret.indexOf(code) === -1) {
              ret.push(code);
            }
          }
        }
      }
      return $.grep(ret, function (val) { return EConstants.ALL_WIKTIONARIES.indexOf(val) !== -1; });
    },

    getInterwikiLangs : function () {
      var arr, el, res = [],
        str = $('#ed_0000_').val(),
        re = new RegExp('\\[\\[(\\w+):.*?\\]\\]', 'g');

      while ((arr = re.exec(str)) !== null) {
        el = $.trim(arr[1]);
        if (el && (el !== 'simple' || EUtil.getActiveLangCode() === 'en')) {
          res.push(el);
        }
        //TODO sortuj wg wielkości projektu
      }
      return res;
    },

    getActiveAndInterwikiLangs : function () {
      return $.merge(EAutomator.getActiveLangs(), EAutomator.getInterwikiLangs().slice(0, 50));
    },

    /*
     * Aktualizuje interwiki: do obecnych dodaje z wersji językowych z sekcji + domyślnych
     */
    fillInterwiki : function () {
      var langs, urls, query, queries = {};

      EApi.started(EConstants.MODE_IW);
      langs = EAutomator.getAllLangs();
      langs.push('pl');
      urls = $.map(langs, function (val) { return EApi.url(val); });
      query = { titles: mw.config.get('wgTitle'), prop: 'langlinks', lllimit: 200 };
      $.each(urls, function () {
        queries[this] = query;
      });
      EApi.askMore(queries, 'EAutomator.fillInterwikiRe');
      return false;

      // callback
    },
    fillInterwikiRe : function (results) {
      var iwikiString, curIwiki, re,
        iwikis = [];

      $.each(results, function () {
        var res = this;

        if (res.query === undefined || res.query.pages === undefined) {
          return false;
        }
        $.each(res.query.pages, function (j, val) {
          if (j === '-1') {
            return false;
          }
          if (iwikis.indexOf(res.query.general.lang) === -1 && res.query.general.lang !== 'pl') {
            iwikis.push(res.query.general.lang);
          }
          if (val.langlinks === undefined) {
            return false;
          }
          $.each(val.langlinks, function () {
            if (this['*'] === mw.config.get('wgTitle') && iwikis.indexOf(this.lang) === -1 && this.lang !== 'pl') {
              iwikis.push(this.lang);
            }
          });
          return true;
        });
        return true;
      });
      iwikis.sort(function (a, b) { return EConstants.INTERWIKI_ORDER.indexOf(a) - EConstants.INTERWIKI_ORDER.indexOf(b); });
      iwikiString = $.map(iwikis, function (val) { return '[[' + val + ':' + mw.config.get('wgTitle') + ']]'; }).join(' ');
      curIwiki = $('#ed_0000_').val();
      if (curIwiki === '') {
        $('#ed_0000_').val(iwikiString).autoresize();
      } else {
        re = new RegExp('(\\[\\[[a-z\\-]+' + ':' + mw.config.get('wgTitle') + '\\]\\]\\s*)+');
        $('#ed_0000_').val($.trim(iwikiString + curIwiki.replace(re, '\n'))).autoresize();
      }
      EApi.done(EConstants.MODE_IW);
    },

    getIPA : function () {
      var urls, query, queries = {};

      EApi.started(EConstants.MODE_IPA);
      urls = $.map(EAutomator.getActiveAndInterwikiLangs(), function (val) { return EApi.url(val); });
      query = { titles: mw.config.get('wgTitle'), prop: 'revisions', rvprop: 'content' };
      $.each(urls, function () {
        queries[this] = query;
      });
      EApi.askMore(queries, 'EAutomator.getIPARe');
      return false;

      // callback
    },
    getIPARe : function (results) {
      var ipas = {},
        error = EStr.NO_IPA_FOUND;

      $.each(results, function () {
        var lang,
          res = this;

        if (res.query === undefined || res.query.pages === undefined) {
          return false;
        }
        lang = res.query.general.lang;
        $.each(res.query.pages, function (j, val) {
          var content, ipa;

          if (j === '-1' || !val.revisions || !val.revisions[0]) {
            return false;
          }
          content = val.revisions[0]['*'];
          ipa = EAutomator.extractIPA(content, lang);
          if (ipa !== undefined && ipa.length) {
            ipas[lang] = ipa;
            error = undefined;
          }
          return true;
        });
        return true;
      });
      EApi.done(EConstants.MODE_IPA, ipas, 'wymowa', error);
    },

    extractFirstArgsFromTemplates : function (str, template, lang) {
      var arr, el, results = [],
        re = new RegExp('\\{\\{' + template + '\\s*\\|\\s*([^\\{\\}\\|<=]+)[\\}\\|<]', 'gi'),
        sections = EParser.getSections(str, lang);

      $.each(sections, function () {
        while ((arr = re.exec(this.content)) !== null) {
          el = $.trim(arr[1]);
          if (el && EConstants.FORBIDDEN_IPA_CONTENT.indexOf(el) === -1 && results.indexOf(el) === -1) {
            results.push({ ipa: el, header: this.title });
          }
        }
      });
      return results;
    },

    extractSecondArgsFromTemplates : function (str, template, lang) {
      var arr, el, results = [],
        re = new RegExp('\\{\\{' + template + '\\s*\\|\\s*([^\\{\\}\\|]*)\\|\\s*[\\/\\]]?([^\\{\\}\\/\\|<=]+)[\\}\\|\\/<\\]]', 'gi'),
        sections = EParser.getSections(str, lang);

      $.each(sections, function () {
        while ((arr = re.exec(this.content)) !== null) {
          el = $.trim(arr[2]);
          if (el && EConstants.FORBIDDEN_IPA_CONTENT.indexOf(el) === -1 && results.indexOf(el) === -1) {
            results.push({ ipa: el, header: this.title });
          }
        }
      });
      return results;
    },

    extractAllArgsFromTemplates : function (str, template, lang) {
      var arr, el, params, i, results = [],
        re = new RegExp('\\{\\{' + template + '\\s*\\|\\s*([^\\{\\}]*)\\}\\}', 'gi'),
        sections = EParser.getSections(str, lang);

      $.each(sections, function () {
        while ((arr = re.exec(this.content)) !== null) {
          params = arr[1].split('|');
          for (i = 0; i < params.length; i += 1) {
            el = $.trim(params[i].replace(/^.*?=/, ''));
            if (el && EConstants.FORBIDDEN_IPA_CONTENT.indexOf(el) === -1 && results.indexOf(el) === -1) {
              results.push({ ipa: el, header: this.title });
            }
          }
        }
      });

      return results;
    },

    extractIPA : function (str, lang) {
      switch (lang) {
      case 'en':
      case 'cs':
      case 'sk':
      case 'it':
      case 'af':
      case 'ko':
      case 'nl':
      case 'co':
      case 'vi':
      case 'simple':
      case 'ga':
      case 'is':
      case 'li':
      case 'lv':
      case 'no':
      case 'sl':
      case 'ja':
        return EAutomator.extractFirstArgsFromTemplates(str, 'IPA', lang);
      case 'fr':
      case 'mg':
      case 'oc':
        return EAutomator.extractFirstArgsFromTemplates(str, 'pron', lang);
      case 'de':
        return EAutomator.extractFirstArgsFromTemplates(str, 'Lautschrift', lang);
      case 'es':
        return EAutomator.extractAllArgsFromTemplates(str, 'pronunciación', lang);
      case 'ca':
        return EAutomator.extractSecondArgsFromTemplates(str, 'pron', lang);
      case 'ro':
        return EAutomator.extractFirstArgsFromTemplates(str, 'AFI', lang);
      case 'et':
        return EAutomator.extractFirstArgsFromTemplates(str, 'hääldus', lang);
      case 'el':
        return EAutomator.extractFirstArgsFromTemplates(str, 'ΔΦΑ', lang);
      case 'eo':
        return EAutomator.extractFirstArgsFromTemplates(str, 'IFA', lang);
      case 'tl':
        return EAutomator.extractFirstArgsFromTemplates(str, 'API', lang);
      case 'ru':
        return EAutomator.extractIPA_ru(str);
      default:
        return [];
      }
    },

    extractIPA_ru: function (str) {
      var arr, el,
        results = EAutomator.extractFirstArgsFromTemplates(str, 'transcription', 'ru'),
        re = /\{\{transcriptions\s*\|\s*([^\}\|]*)\s*\|\s*([^\}\|]*)\s*\}\}/g,
        sections = EParser.getSections(str, 'ru');

      $.each(sections, function () {
        while ((arr = re.exec(this.content)) !== null) {
          el = $.trim(arr[1]);
          if (el && EConstants.FORBIDDEN_IPA_CONTENT.indexOf(el) === -1 && results.indexOf(el) === -1) {
            results.push({ ipa: el, header: this.title });
          }
          el = $.trim(arr[2]);
          if (el && EConstants.FORBIDDEN_IPA_CONTENT.indexOf(el) === -1 && results.indexOf(el) === -1) {
            results.push({ ipa: el, header: this.title });
          }
        }
      });
      return results;
    },

    addTransliteration: function (sectionName, sectionCode) {
      var textarea = $('#ed_' + sectionName + '_transliteracja');
      if (EConstants.TRANSLIT_SUPPORTED.indexOf(sectionCode) === -1) {
        return;
      }
      if (textarea.val()) {
        return;
      }
      if (sectionCode === 'ru') {
        textarea.val('{{translit}}');
      } else {
        if (sectionCode === 'be') {
          sectionCode = 'by';
        }
        textarea.val('{{translit|' + sectionCode + '}}');
      }
    },

    getPicture : function () {
      var urls, query, queries = {};

      EApi.started(EConstants.MODE_PICTURE);
      urls = $.map(EAutomator.getActiveAndInterwikiLangs(), function (val) { return EApi.url(val); });
      query = { titles: mw.config.get('wgTitle'), prop: 'revisions', rvprop: 'content' };
      $.each(urls, function () {
        queries[this] = query;
      });
      EApi.askMore(queries, 'EAutomator.getPictureRe');
      return false;

      // callback
    },
    getPictureRe : function (results) {
      var pics = {},
        error = EStr.NO_PICTURE_FOUND;

      $.each(results, function () {
        var lang,
          res = this;

        if (res.query === undefined || res.query.pages === undefined) {
          return false;
        }
        lang = res.query.general.lang;
        $.each(res.query.pages, function (j, val) {
          var content, pic;

          if (j === '-1' || !val.revisions || !val.revisions[0]) {
            return false;
          }
          content = val.revisions[0]['*'];
          pic = EAutomator.extractPicture(content);
          if (pic !== undefined && pic.length) {
            pics[lang] = pic;
            error = undefined;
          }
          return true;
        });
        return true;
      });
      EApi.done(EConstants.MODE_PICTURE, pics, '', error);
      EAutomator.getPictureUrls(pics);
    },

    extractPicture : function (str) {
      var arr, el, results = [],
        re = new RegExp('[:=\\|]([^\\|\\]:=]+?\\.(jpg|png|gif|svg))', 'gi');

      while ((arr = re.exec(str)) !== null) {
        el = $.trim(arr[1]).replace(/_/g, ' ');
        if (el && results.indexOf(el) === -1) {
          el = el.charAt(0).toUpperCase() + el.substr(1);
          results.push(el);
        }
      }
      return results;
    },

    imageCache : {},

    getPictureUrls : function (results) {
      var allImages = [],
        query;

      $.each(results, function () {
        $.each(this, function () {
          if (this && allImages.indexOf(this) === -1) {
            allImages.push('File:' + this);
          }
        });
      });
      query = { titles: allImages.join('|'), prop: 'imageinfo', iiprop: 'url', iiurlwidth: 150, iiurlheight: 150 };
      EApi.ask(query, 'EAutomator.getPictureUrlsRe', EApi.commonsUrl());
    },

    getPictureUrlsRe : function (results) {
      if (!results || !results[0] || !results[0].query || !results[0].query.pages) {
        return false;
      }
      $.each(results[0].query.pages, function () {
        var loader;

        if (!this.imageinfo || !this.imageinfo[0]) {
          return true;
        }
        EAutomator.imageCache[this.title] = '<img src="' + this.imageinfo[0].thumburl + '"/>';
        loader = $(EAutomator.imageCache[this.title]);
      });
      EPrinter.setPictureTooltips();
    },

    getAudio : function () {
      var urls, lang, query, titles = [], queries = {};

      EApi.started(EConstants.MODE_AUDIO);
      urls = $.map(EAutomator.getActiveAndInterwikiLangs(), function (val) { return EApi.url(val); });
      query = { titles: mw.config.get('wgTitle'), prop: 'revisions', rvprop: 'content' };
      $.each(urls, function () {
        queries[this] = query;
      });
      lang = $.ucFirst(EUtil.getActiveLangCode());
      titles.push('File:' + lang + '-' + mw.config.get('wgTitle') + '.ogg');
      if (lang === 'En') {
        titles.push('File:' + lang + '-uk-' + mw.config.get('wgTitle') + '.ogg');
        titles.push('File:' + lang + '-us-' + mw.config.get('wgTitle') + '.ogg');
        titles.push('File:' + lang + '-au-' + mw.config.get('wgTitle') + '.ogg');
      }
      if (lang === 'De') {
        titles.push('File:' + lang + '-at-' + mw.config.get('wgTitle') + '.ogg');
      }

      queries[EApi.commonsUrl()] = { titles: titles.join('|'), prop: 'info' };
      EApi.askMore(queries, 'EAutomator.getAudioRe');
      return false;

      // callback
    },
    getAudioRe : function (results) {
      var oggs = {},
        error = EStr.NO_AUDIO_FOUND;

      $.each(results, function () {
        var lang,
          res = this;

        if (res.query === undefined || res.query.pages === undefined) {
          return false;
        }
        lang = res.query.general.lang;
        $.each(res.query.pages, function (j, val) {
          var content, ogg;

          if (j === '-1') {
            return false;
          }
          if (res.query.general.wikiid === 'commonswiki') {
            ogg = val.title.replace(/^File:/, '');
            if (oggs.commons === undefined) {
              oggs.commons = [];
            }
            oggs.commons.push(ogg);
            error = undefined;
          } else {
            if (!val.revisions || !val.revisions[0]) {
              return false;
            }
            content = val.revisions[0]['*'];
            ogg = EAutomator.extractAudio(content);
            if (ogg !== undefined && ogg.length) {
              oggs[lang] = ogg;
              error = undefined;
            }
          }
          return true;
        });
        return true;
      });
      EApi.done(EConstants.MODE_AUDIO, oggs, 'wymowa', error);
    },

    extractAudio : function (str) {
      var arr, el, results = [],
        re = new RegExp('[\\|:=]([^\\|\\]:=]+?\\.ogg)', 'gi');

      while ((arr = re.exec(str)) !== null) {
        el = $.trim(arr[1]).replace(/_/g, ' ');
        if (el && results.indexOf(el) === -1) {
          el = el.charAt(0).toUpperCase() + el.substr(1);
          results.push(el);
        }
      }
      return results;
    },

    getInternalExample : function () {
      var query;

      EApi.started(EConstants.MODE_INTERNAL_EXAMPLE);
      setTimeout(function () {
        query = { generator: 'backlinks', gbltitle: mw.config.get('wgTitle'), gbllimit: 50, gblnamespace: 0, prop: 'revisions', rvprop: 'content' };
        EApi.ask(query, 'EAutomator.getInternalExampleRe', EApi.url());
      }, 100);
      return false;
    },

    getInternalExampleRe : function (result) {
      var examples = {},
        error = EStr.NO_INTERNAL_EXAMPLE_FOUND,
        re = new RegExp("^:\\s*\\(\\d+\\.\\d+\\)\\s*('*[^\\}\\n]*\\[\\[" + mw.config.get('wgTitle') + "[\\|\\]][^\\}\\n]*)", 'm'),
        isPolish = EUtil.getActiveLangCode() === 'pl',
        delim = isPolish ? "''" : '';

      if (result[0] && result[0].query && result[0].query.pages) {
        $.each(result[0].query.pages, function () {
          var content, ex;

          if (this.title === mw.config.get('wgTitle')) {
            return true;
          }
          content = EParser.extractSubsections(this.revisions[0]['*'], 'przykłady');
          if ((arr = re.exec(content)) !== null) {
            if (isPolish) {
              ret = arr[1].replace(/(.*→\s*|'''?)/g, '');
              ex = re.exec(": (1.1) ''" + ret) === null ? null : ret;
            } else {
              ex = arr[1].replace(/'''/g, '');
            }
          }

          if (ex) {
            examples[this.title] = delim + $.trim(ex) + delim;
            error = undefined;
          }
        });
      }
      EApi.done(EConstants.MODE_INTERNAL_EXAMPLE, examples, 'przykłady', error);
    },

    extractExample : function (content, re, isPolish) {
      var arr, ret;

      content = EParser.extractSubsections(content, 'przykłady');

      if ((arr = re.exec(content)) !== null) {
        if (isPolish) {
          ret = arr[1].replace(/(.*→\s*|'''?)/g, '');
          return re.exec(": (1.1) ''" + ret) === null ? null : ret;
        } else {
          return arr[1].replace(/'''/g, '');
        }
      } else {
        return null;
      }
    }
  };


  if ((mw.config.get('wgAction') === 'edit' || mw.config.get('wgAction') === 'submit') &&
      mw.config.get('wgNamespaceNumber') === 0) {
    $(document).ready(Ed.init);
  }
}(jQuery));

