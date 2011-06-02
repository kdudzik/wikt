if (console == undefined) {
	console = { log: function(x) {} };
}
mw.loader.load('http://pl.wiktionary.org/w/index.php?title=Wikipedysta:ToSter/ed.onefile.css&action=raw&ctype=text/css', 'text/css');

window.Ed = {
		
		code : '',
		content : {},
		
			
		parseContentToSections :
		function() {
			Ed.content.sections = EParser.getSections(Ed.code);
		},
			
		parseSectionsToSubsections :
		function() {
			for (var alphaname in Ed.content.sections) {
				var sec = Ed.content.sections[alphaname];
				ESectionParser.parse(sec, alphaname);
			}
		},

		init :
		function() {
			var tbox = $('#wpTextbox1'),
				oldform = $('.wikiEditor-ui');
			Ed.code = tbox.val();
			
			Ed.parseContentToSections();
			Ed.parseSectionsToSubsections();
			
			EdUi.prepareForm(oldform);

	        $('.tip').livequery(function() {
				$(this).tooltip('tip');
	        });			
		}
		
		
	};

window.EParser = {
	getSections :
	function(code) {
		code = code.replace(/\s*==\s*([^=]+)\s*==\s*/g, '<BE>$1<EN>');
		var sections = code.split('<BE>');
		var reta = {};
		for (s in sections) {
			if (!sections[s].length) {
				continue;
			}
			sec = sections[s].split('<EN>');
			
			if (sec.length == 1) {
				// sekcja zerowa
				reta['0000'] = {
					'content' : $.trim(sec[0])
				};
			}
			else {
				var section = this.getSectionFromString($.trim(sec[0]));
				var alphacode = section.alpha;
				reta[alphacode] = section;
				reta[alphacode].content = $.trim(sec[1]);					
			}
		}

		return reta;
	},
		
	getSectionFromString :
	function(str) {
		return {
			'title' : str,
			'short' : this.insideTemplate(str).replace(/język /, ''),
			'content' : '',
			'alpha' : this.getAlphabetical(str),
			'code'  : this.getCode(str)
		};
	},
		
	getSectionFromInput :
	function(str) {
		var langname = EdConstants.CODE_TO_LANG[str];
		if (langname !== undefined) {
			str = mw.config.get('wgPageName') + ' {{' + langname + '}}';
		}
		return this.getSectionFromString(str);
	},

	insideTemplate  :
	function(str) {
		return str.replace(/.*\{\{(.*?)(\}\}|\|).*/g, '$1');
	},
		
	getAlphabetical :
	function(str) {
		var template = this.insideTemplate(str);
		if (template == EdStr.INTERNATIONAL_USAGE) {
			return '0001';
		}
		else if (template == EdStr.POLISH) {
			return '0002';
		}
		else if (template == EdStr.POLISH_FOREIGN) {
			return '0003';
		}
		else if (template == EdStr.LATIN_FOREIGN) {
			return '0004';
		}
		else if (template == EdStr.CHINESE_SIGN) {
			return '0005';
		}
		return template.replace(/język /, '')
			.replace(/[ąáåã]/, 'azz').replace('ć', 'czz')
			.replace(/[ęè]/, 'ezz').replace('ł', 'lzz')
			.replace('ń', 'nzz').replace(/[óõ]/, 'ozz')
			.replace('ś', 'szz').replace('ü', 'uzz')
			.replace('ź', 'zzy').replace('ż', 'zzz')
			.replace(/[ \|!]/, '_');
	},
		
	getCode :
	function(str) {
		var template = this.insideTemplate(str);
		var code;
		if (template.indexOf('język ') != -1) {
			template = template.replace(/język /, '');
			code = EdConstants.LANG_CODES_LONG[template];
		}
		else {
			code = EdConstants.LANG_CODES_SHORT[template];
		}
		return code ? code : '';			
	}
};

window.ESectionParser = {
		
	parse:
	function(section, alphaname) {
		var subsections = [];
		var mode = '';
		var code = section.code;
		
		if (!section.title) {
			mode = 'INTRO';
		}
		else if (code == 'pl') {
			mode = 'POLISH';
		}
		else if (code == 'zh-char') {
			mode = 'CHINESE';
		}
		else if (code == 'egy') {
			mode = 'EGYPTIAN';
		}
		else if ($.inArray(code, EdConstants.NON_LATIN_LANGS) != -1) {
			mode = 'NON_LATIN';
		}
		else if ($.inArray(code, EdConstants.DOUBLE_LANGS) != -1) {
			mode = 'DOUBLE';
		}
		else {
			mode = 'LATIN';
		}
		subsections.push({ title: '', content: '', shortened: false });
		
		var titlesArray;
		switch (mode) {
		case 'INTRO':
			titlesArray = []; break;
		case 'POLISH':
			titlesArray = EdConstants.SUBSECTIONS.POLISH; break;
		case 'CHINESE':
			titlesArray = EdConstants.SUBSECTIONS.CHINESE; break;
		case 'EGYPTIAN':
			titlesArray = EdConstants.SUBSECTIONS.EGYPTIAN; break;
		case 'NON_LATIN':
			titlesArray = EdConstants.SUBSECTIONS.NON_LATIN; break;
		case 'DOUBLE':
			titlesArray = EdConstants.SUBSECTIONS.DOUBLE; break;
		case 'LATIN':
			titlesArray = EdConstants.SUBSECTIONS.LATIN; break;
		}
		for (i in titlesArray) {
			subsections.push({ title: titlesArray[i], content: '', shortened: false });
		}
		
		section.subsections = subsections;
		section.mode = mode; 
		this.parsePreparedSubsections(section.content, section.subsections);
	},
		
	parsePreparedSubsections :
	function(str, subsections) {
		var positions = [];
		for (i in subsections) {
			var title = subsections[i].title;
			positions.push({
				index: title == '' ? 0 : str.indexOf('{{' + title),
				title: title
			});
		}
		positions.sort(function(a, b) {
			return a.index - b.index;
		});
		
		for (i in subsections) {
			var sub = subsections[i];
			for (j in positions) {
				j = parseInt(j);
				var pos = positions[j];
				if (pos.title == sub.title) {
					if (pos.index != -1) {
						if (j < positions.length - 1) {
							sub.content = $.trim(str.substring(pos.index, positions[j + 1].index));
						}
						else {
							sub.content = $.trim(str.substring(pos.index));
						}
					}
					var repl = new RegExp('\{\{' + sub.title + '\}\}');
					var changed = sub.content.replace(repl, '');
					if (changed != sub.content) {
						sub.content = $.trim(changed);
						sub.shortened = true;
					}
					break;
				}
			}
		}
	}
};
	
window.EPrinter = {
		recalculateCode : function(form) {
			var code = '';
			for (alpha in Ed.content.sections) {
				var sec = Ed.content.sections[alpha];
				if (alpha == '0000') {
					code = $('#ed_0000_').val();
					code = $.trim(code) + '\n';
				}
				else {
					code += '== ' + sec.title + ' ==\n';
					for (i = 0; i < sec.subsections.length; i++) {
						var subs = sec.subsections[i];
						subs.content = $('#ed_' + alpha + '_' + subs.title.replace(' ', '_')).val();
						if (subs.title == '' && subs.content != '') {
							code += $.trim(subs.content) + '\n';
						}
						else if (subs.title != '' && subs.content == '') {
							code += '{{' + subs.title + '}}\n';
						}
						else if (subs.shortened) {
							code += '{{' + subs.title + '}}\n' + $.trim(subs.content) + '\n';
						}
						else if (subs.content != '') {
							code += $.trim(subs.content) + '\n';
						}
					}
					code += '\n';
				}
			}
			code = $.trim(code);
			return code;
		}
	};
	
window.EdConstants = {
		INTRO : '«',
	SUBSECTIONS :
	{
		POLISH :
		[
		 	'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje',
		 	'synonimy', 'antonimy', 'pokrewne', 'frazeologia', 'etymologia',
		 	'uwagi', 'tłumaczenia', 'źródła'
		],
		LATIN :
		[
		 	'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje',
		 	'synonimy', 'antonimy', 'pokrewne', 'frazeologia', 'etymologia',
		 	'uwagi', 'źródła'
		],
		NON_LATIN :
		[
		 	'transliteracja', 'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje',
		 	'synonimy', 'antonimy', 'pokrewne', 'frazeologia', 'etymologia',
		 	'uwagi', 'źródła'
		],
		DOUBLE :
		[
		 	'ortografie', 'transliteracja', 'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje',
		 	'synonimy', 'antonimy', 'pokrewne', 'frazeologia', 'etymologia',
		 	'uwagi', 'źródła'
		],
		CHINESE :
			// zh-char
		[
		 	'klucz', 'kreski', 'warianty', 'kolejność', 'znaczenia', 'etymologia', 'kody', 'słowniki',
			'uwagi', 'źródła'
		],
		EGYPTIAN :
			// egy
		[
		 	'zapis hieroglificzny', 'transliteracja', 'transkrypcja', 'znaczenia', 'determinatywy',
			'odmiana', 'przykłady', 'składnia', 'kolokacje', 'synonimy', 'antonimy', 'pokrewne',
			'frazeologia', 'etymologia', 'uwagi', 'źródła'
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
		'ortografie' : 'Zapisy w ortografiach alternatywnych',
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
		'' : 'Sekcja wstępna'
	},
	NON_LATIN_LANGS :
		['ru', 'uk', 'kk', 'be', 'hy', 'ka', 'he', 'yi', 'ar', 'fa', 'jp', 'ko', 'th', 'ur',
		 'hi', 'zh', 'bg', 'mk', 'el', 'gr', 'bo', 'cau', 'ab', 'ady', 'akk', 'am', 'arc',
		 'as', 'bn', 'av', 'ba', 'bal', 'my', 'gez', 'gu', 'got', 'myv', 'ky', 'dz', 'cv', 
		 'ce', 'kjh', 'bs', 'ta', 'inh', 'iu', 'kn', 'ks', 'mr', 'km', 'kv', 'kok', 'cr',
		 'ku', 'lo', 'lez', 'ml', 'dv', 'mn', 'ne', 'new', 'os', 'ps', 'pa', 'rom', 'sa',
		 'sd', 'ckb', 'cu', 'sux', 'si', 'tab', 'tg', 'tzm', 'te', 'zrp'],
	DOUBLE_LANGS :
		['sr', 'tut', 'jdt', 'lad', 'tt', 'tk', 'ug', 'slovio'],
	LANG_CODES_SHORT :
	{
		'dżuhuri' : 'jdt', 'esperanto' : 'eo', 'ewe' : 'ee', 'hindi' : 'hi', 
		'ido' : 'io', 'interlingua' : 'ia', 'inuktitut' : 'iu', 'ladino' : 'lad', 
		'lingala' : 'ln', 'lojban' : 'jbo', 'novial' : 'nov', 'papiamento' : 'pap',
		'pitjantjatjara' : 'pjt', 'sanskryt' : 'sa', 'slovio' : 'slovio', 'sranan tongo' : 'srn', 
		'tetum' : 'tet', 'tok pisin' : 'tpi', 'tupinambá' : 'tpn', 'użycie międzynarodowe' : 'inter',
		'volapük' : 'vo', 'znak chiński' : 'zh-char', 'jidysz' : 'yi', 'jèrriais' : 'roa',
		'termin obcy w języku polskim' : 'termin obcy w języku polskim',
		'termin obcy w języku łacińskim' : 'termin obcy w języku łacińskim'
	},
	LANG_CODES_LONG :
	{
		'kaszmirski' : 'ks', 'marathi' : 'mr', 'newarski' : 'new', 'sorani' : 'ckb',
		'zazaki' : 'zza', '!Xóõ' : 'khi', 'abazyński' : 'cau', 'abchaski' : 'ab',
		'abenaki' : 'abe', 'adygejski' : 'ady', 'afrykanerski' : 'af', 'ajmara' : 'ay',
		'akadyjski' : 'akk', 'aklanon' : 'akl', 'alabama' : 'akz', 'albański' : 'sq',
		'alemański' : 'als', 'aleucki' : 'ale', 'amharski' : 'am', 'angielski' : 'en',
		'arabski' : 'ar', 'aragoński' : 'an', 'aramejski' : 'arc', 'arapaho' : 'arp',
		'arumuński' : 'roa', 'assamski' : 'as', 'asturyjski' : 'ast', 'awarski' : 'av',
		'azerski' : 'az', 'bambara' : 'bm', 'banjumasański' : 'map', 'baskijski' : 'eu',
		'baszkirski' : 'ba', 'bawarski' : 'gem', 'beludżi' : 'bal', 'bengalski' : 'bn',
		'białoruski' : 'be', 'białoruski (taraszkiewica)' : 'be', 'birmański' : 'my', 'boloński' : 'egl',
		'bośniacki' : 'bs', 'bułgarski' : 'bg', 'bretoński' : 'br', 'cebuano' : 'ceb',
		'chakaski' : 'kjh', 'chickasaw' : 'nai', 'chiński standardowy' : 'zh', 'chorwacki' : 'hr',
		'czagatajski' : 'chg', 'czarnogórski' : 'ch', 'czeczeński' : 'ce', 'czeski' : 'cs',
		'czirokeski' : 'chr', 'czuwaski' : 'cv', 'dalmatyński' : 'dlm', 'dolnoniemiecki' : 'nds',
		'dolnołużycki' : 'dsb', 'duński' : 'da', 'dzongkha' : 'dz', 'erzja' : 'myv',
		'estoński' : 'et', 'etruski' : 'ett', 'farerski' : 'fo', 'fidżyjski' : 'fj',
		'filipino' : 'fil', 'fiński' : 'fi', 'francuski' : 'fr', 'friulski' : 'fur',
		'fryzyjski' : 'fy', 'ful' : 'ff', 'ga' : 'gaa', 'gagauski' : 'tut',
		'galicyjski' : 'gl', 'gaskoński' : 'oc', 'gocki' : 'got', 'grenlandzki' : 'kl',
		'gruziński' : 'ka', 'guarani' : 'gn', 'gudźarati' : 'gu', 'gyyz' : 'gez',
		'górnołużycki' : 'hsb', 'haitański' : 'ht', 'hausa' : 'ha', 'hawajski' : 'haw',
		'hebrajski' : 'he', 'hiszpański' : 'es', 'holenderski' : 'nl', 'hupa' : 'hup',
		'ilokano' : 'ilo', 'indonezyjski' : 'id', 'inguski' : 'inh', 'irlandzki' : 'ga',
		'islandzki' : 'is', 'istriocki' : 'ist', 'japoński' : 'ja', 'joruba' : 'yor',
		'kabylski' : 'kab', 'kakczikel' : 'myn', 'kannada' : 'kn', 'karakałpacki' : 'kaa',
		'kaszubski' : 'csb', 'kataloński' : 'ca', 'kazachski' : 'kk', 'keczua' : 'qu',
		'khmerski' : 'km', 'kirgiski' : 'ky', 'klingoński' : 'tlh', 'komi' : 'kv',
		'komi-jaźwiński' : 'kom', 'komi-permiacki' : 'koi', 'komi-zyriański' : 'kpv', 'konkani' : 'kok',
		'koreański' : 'ko', 'kornijski' : 'kw', 'korsykański' : 'co', 'kri' : 'cr',
		'krymskotatarski' : 'crh', 'kurdyjski' : 'ku', 'ladyński' : 'lld', 'langwedocki' : 'oci',
		'laotański' : 'lo', 'lezgiński' : 'lez', 'liguryjski' : 'lij', 'limburski' : 'lim',
		'litewski' : 'lt', 'lombardzki' : 'lmo', 'luksemburski' : 'lb', 'luo' : 'luo',
		'macedoński' : 'mk', 'malajalam' : 'ml', 'malajski' : 'ms', 'malediwski' : 'dv',
		'malgaski' : 'mg', 'maltański' : 'mt', 'maoryski' : 'mi', 'mikmak' : 'mic',
		'minnan' : 'zh', 'mongolski' : 'mn', 'mołdawski' : 'mo', 'nahuatl' : 'nah',
		'nauruański' : 'na', 'nawaho' : 'nv', 'neapolitański' : 'nap', 'nepalski' : 'ne',
		'niemiecki' : 'de', 'norweski (bokmål)' : 'nb', 'norweski (nynorsk)' : 'nn', 'nowogrecki' : 'el',
		'ormiański' : 'hy', 'oromo' : 'om', 'osetyjski' : 'os', 'pali' : 'pi',
		'paszto' : 'ps', 'pendżabski' : 'pa', 'perski' : 'fa', 'piemoncki' : 'pms',
		'pikardyjski' : 'pcd', 'pirahã' : 'myp', 'polski' : 'pl', 'portugalski' : 'pt',
		'połabski' : 'pox', 'pragermański' : 'gem', 'prowansalski' : 'oci', 'pruski' : 'prg',
		'północnolapoński' : 'sme', 'rarotonga' : 'rar', 'romansz' : 'roh', 'romski' : 'rom',
		'rosyjski' : 'ru', 'rumuński' : 'ro', 'rundi' : 'rn', 'russenorsk' : 'crp',
		'sardyński' : 'sc', 'serbski' : 'sr', 'sindhi' : 'sd', 'sko' : 'sko',
		'skolt' : 'sms', 'somalijski' : 'so', 'staro-cerkiewno-słowiański' : 'cu', 'staro-wysoko-niemiecki' : 'goh',
		'staroangielski' : 'ang', 'staroegipski' : 'egy', 'starofrancuski' : 'fro', 'starogrecki' : 'gr',
		'staroirlandzki' : 'sga', 'staronordyjski' : 'non', 'suahili' : 'sw', 'sumeryjski' : 'sux',
		'sundajski' : 'su', 'susu' : 'sus', 'sycylijski' : 'scn', 'syngaleski' : 'si',
		'szkocki' : 'sco', 'szkocki gaelicki' : 'gla', 'szwabski' : 'gsw', 'szwedzki' : 'sv',
		'słowacki' : 'sk', 'słoweński' : 'sl', 'słowiński' : 'slov', 'tabasarański' : 'tab',
		'tadżycki' : 'tg', 'tagalski' : 'tl', 'tahitański' : 'ty', 'tajski' : 'th',
		'tamazight' : 'tzm', 'tamilski' : 'ta', 'tatarski' : 'tt', 'telugu' : 'te',
		'tigrinia' : 'ti', 'tonga' : 'to', 'turecki' : 'tr', 'turkmeński' : 'tk',
		'tuvalu' : 'tvl', 'twi' : 'tw', 'tybetański' : 'bo', 'ujgurski' : 'ug',
		'ukraiński' : 'uk', 'urdu' : 'ur', 'uwea' : 'wls', 'uzbecki' : 'uz',
		'võro' : 'fiu', 'walijski' : 'cy', 'waloński' : 'wa', 'wczesny nowoangielski' : 'emen',
		'wenecki' : 'vec', 'wepski' : 'fiu', 'wietnamski' : 'vi', 'wilamowski' : 'wym',
		'wolof' : 'wo', 'wysokoislandzki' : 'art', 'węgierski' : 'hu', 'włoski' : 'it',
		'yupik środkowy' : 'ypk', 'zarfatit' : 'zrp', 'zulu' : 'zu', 'łaciński' : 'la',
		'łotewski' : 'lv', 'średnio-dolno-niemiecki' : 'średnio-dolno-niemiecki', 'średnio-wysoko-niemiecki' : 'gmh',
		'średnioangielski' : 'enm', 'żmudzki' : 'bat'
	},
	CODE_TO_LANG :
	{
		'ks' : 'język kaszmirski', 'mr' : 'język marathi', 'new' : 'język newarski', 'ckb' : 'język sorani',
		'zza' : 'język zazaki', 'khi' : 'język !Xóõ', 'cau' : 'język abazyński', 'ab' : 'język abchaski',
		'abe' : 'język abenaki', 'ady' : 'język adygejski', 'af' : 'język afrykanerski', 'ay' : 'język ajmara',
		'akk' : 'język akadyjski', 'akl' : 'język aklanon', 'akz' : 'język alabama', 'sq' : 'język albański',
		'als' : 'język alemański', 'ale' : 'język aleucki', 'am' : 'język amharski', 'en' : 'język angielski',
		'ar' : 'język arabski', 'an' : 'język aragoński', 'arc' : 'język aramejski', 'arp' : 'język arapaho',
		'roa' : 'język arumuński', 'as' : 'język assamski', 'ast' : 'język asturyjski', 'av' : 'język awarski',
		'az' : 'język azerski', 'bm' : 'język bambara', 'map' : 'język banjumasański', 'eu' : 'język baskijski',
		'ba' : 'język baszkirski', 'gem' : 'język bawarski', 'bal' : 'język beludżi', 'bn' : 'język bengalski',
		'be' : 'język białoruski', 'my' : 'język birmański', 'egl' : 'język boloński',
		'bs' : 'język bośniacki', 'bg' : 'język bułgarski', 'br' : 'język bretoński', 'ceb' : 'język cebuano',
		'kjh' : 'język chakaski', 'nai' : 'język chickasaw', 'zh' : 'język chiński standardowy', 'hr' : 'język chorwacki',
		'chg' : 'język czagatajski', 'ch' : 'język czarnogórski', 'ce' : 'język czeczeński', 'cs' : 'język czeski',
		'chr' : 'język czirokeski', 'cv' : 'język czuwaski', 'dlm' : 'język dalmatyński', 'nds' : 'język dolnoniemiecki',
		'dsb' : 'język dolnołużycki', 'da' : 'język duński', 'dz' : 'język dzongkha', 'myv' : 'język erzja',
		'et' : 'język estoński', 'ett' : 'język etruski', 'fo' : 'język farerski', 'fj' : 'język fidżyjski',
		'fil' : 'język filipino', 'fi' : 'język fiński', 'fr' : 'język francuski', 'fur' : 'język friulski',
		'fy' : 'język fryzyjski', 'ff' : 'język ful', 'gaa' : 'język ga', 'tut' : 'język gagauski',
		'gl' : 'język galicyjski', 'oc' : 'język gaskoński', 'got' : 'język gocki', 'kl' : 'język grenlandzki',
		'ka' : 'język gruziński', 'gn' : 'język guarani', 'gu' : 'język gudźarati', 'gez' : 'język gyyz',
		'hsb' : 'język górnołużycki', 'ht' : 'język haitański', 'ha' : 'język hausa', 'haw' : 'język hawajski',
		'he' : 'język hebrajski', 'es' : 'język hiszpański', 'nl' : 'język holenderski', 'hup' : 'język hupa',
		'ilo' : 'język ilokano', 'id' : 'język indonezyjski', 'inh' : 'język inguski', 'ga' : 'język irlandzki',
		'is' : 'język islandzki', 'ist' : 'język istriocki', 'ja' : 'język japoński', 'yor' : 'język joruba',
		'kab' : 'język kabylski', 'myn' : 'język kakczikel', 'kn' : 'język kannada', 'kaa' : 'język karakałpacki',
		'csb' : 'język kaszubski', 'ca' : 'język kataloński', 'kk' : 'język kazachski', 'qu' : 'język keczua',
		'km' : 'język khmerski', 'ky' : 'język kirgiski', 'tlh' : 'język klingoński', 'kv' : 'język komi',
		'kom' : 'język komi-jaźwiński', 'koi' : 'język komi-permiacki', 'kpv' : 'język komi-zyriański', 'kok' : 'język konkani',
		'ko' : 'język koreański', 'kw' : 'język kornijski', 'co' : 'język korsykański', 'cr' : 'język kri',
		'crh' : 'język krymskotatarski', 'ku' : 'język kurdyjski', 'lld' : 'język ladyński', 'oci' : 'język langwedocki',
		'lo' : 'język laotański', 'lez' : 'język lezgiński', 'lij' : 'język liguryjski', 'lim' : 'język limburski',
		'lt' : 'język litewski', 'lmo' : 'język lombardzki', 'lb' : 'język luksemburski', 'luo' : 'język luo',
		'mk' : 'język macedoński', 'ml' : 'język malajalam', 'ms' : 'język malajski', 'dv' : 'język malediwski',
		'mg' : 'język malgaski', 'mt' : 'język maltański', 'mi' : 'język maoryski', 'mic' : 'język mikmak',
		'mn' : 'język mongolski', 'mo' : 'język mołdawski', 'nah' : 'język nahuatl',
		'na' : 'język nauruański', 'nv' : 'język nawaho', 'nap' : 'język neapolitański', 'ne' : 'język nepalski',
		'de' : 'język niemiecki', 'nb' : 'język norweski (bokmål)', 'nn' : 'język norweski (nynorsk)', 'el' : 'język nowogrecki',
		'hy' : 'język ormiański', 'om' : 'język oromo', 'os' : 'język osetyjski', 'pi' : 'język pali',
		'ps' : 'język paszto', 'pa' : 'język pendżabski', 'fa' : 'język perski', 'pms' : 'język piemoncki',
		'pcd' : 'język pikardyjski', 'myp' : 'język pirahã', 'pl' : 'język polski', 'pt' : 'język portugalski',
		'pox' : 'język połabski', 'gem' : 'język pragermański', 'oci' : 'język prowansalski', 'prg' : 'język pruski',
		'sme' : 'język północnolapoński', 'rar' : 'język rarotonga', 'roh' : 'język romansz', 'rom' : 'język romski',
		'ru' : 'język rosyjski', 'ro' : 'język rumuński', 'rn' : 'język rundi', 'crp' : 'język russenorsk',
		'sc' : 'język sardyński', 'sr' : 'język serbski', 'sd' : 'język sindhi', 'sko' : 'język sko',
		'sms' : 'język skolt', 'so' : 'język somalijski', 'cu' : 'język staro-cerkiewno-słowiański', 'goh' : 'język staro-wysoko-niemiecki',
		'ang' : 'język staroangielski', 'egy' : 'język staroegipski', 'fro' : 'język starofrancuski', 'gr' : 'język starogrecki',
		'sga' : 'język staroirlandzki', 'non' : 'język staronordyjski', 'sw' : 'język suahili', 'sux' : 'język sumeryjski',
		'su' : 'język sundajski', 'sus' : 'język susu', 'scn' : 'język sycylijski', 'si' : 'język syngaleski',
		'sco' : 'język szkocki', 'gla' : 'język szkocki gaelicki', 'gsw' : 'język szwabski', 'sv' : 'język szwedzki',
		'sk' : 'język słowacki', 'sl' : 'język słoweński', 'slov' : 'język słowiński', 'tab' : 'język tabasarański',
		'tg' : 'język tadżycki', 'tl' : 'język tagalski', 'ty' : 'język tahitański', 'th' : 'język tajski',
		'tzm' : 'język tamazight', 'ta' : 'język tamilski', 'tt' : 'język tatarski', 'te' : 'język telugu',
		'ti' : 'język tigrinia', 'to' : 'język tonga', 'tr' : 'język turecki', 'tk' : 'język turkmeński',
		'tvl' : 'język tuvalu', 'tw' : 'język twi', 'bo' : 'język tybetański', 'ug' : 'język ujgurski',
		'uk' : 'język ukraiński', 'ur' : 'język urdu', 'wls' : 'język uwea', 'uz' : 'język uzbecki',
		'fiu' : 'język võro', 'cy' : 'język walijski', 'wa' : 'język waloński', 'emen' : 'język wczesny nowoangielski',
		'vec' : 'język wenecki', 'fiu' : 'język wepski', 'vi' : 'język wietnamski', 'wym' : 'język wilamowski',
		'wo' : 'język wolof', 'art' : 'język wysokoislandzki', 'hu' : 'język węgierski', 'it' : 'język włoski',
		'ypk' : 'język yupik środkowy', 'zrp' : 'język zarfatit', 'zu' : 'język zulu', 'la' : 'język łaciński',
		'lv' : 'język łotewski', 'średnio-dolno-niemiecki' : 'język średnio-dolno-niemiecki', 'gmh' : 'język średnio-wysoko-niemiecki',
		'enm' : 'język średnioangielski', 'bat' : 'język żmudzki', 'jdt' : 'dżuhuri', 'eo' : 'esperanto', 'ee' : 'ewe',
		'hi' : 'hindi', 'io' : 'ido', 'ia' : 'interlingua', 'iu' : 'inuktitut',
		'lad' : 'ladino', 'ln' : 'lingala', 'jbo' : 'lojban', 'nov' : 'novial',
		'pap' : 'papiamento', 'pjt' : 'pitjantjatjara', 'sa' : 'sanskryt', 'slovio' : 'slovio',
		'srn' : 'sranan tongo', 'tet' : 'tetum', 'tpi' : 'tok pisin', 'tpn' : 'tupinambá',
		'inter' : 'użycie międzynarodowe', 'vo' : 'volapük', 'zh-char' : 'znak chiński', 'yi' : 'jidysz',
		'roa' : 'jèrriais', 'termin obcy w języku polskim' : 'termin obcy w języku polskim',
		'termin obcy w języku łacińskim' : 'termin obcy w języku łacińskim'
	}
};

window.EdStr = {
	TOGGLE_EDITOR :
		'Przełącz edytor',
	ADD : 
		'+ dodaj',
	ADD_SECTION_MESSAGE : 
		'Podaj tytuł sekcji nowego języka.\n\
		Zamiast wielokropka wstaw odpowiednią nazwę języka.\n\
		<small>Zobacz też: \
		<a href="http://pl.wiktionary.org/wiki/Wikis%C5%82ownik:Zasady_tworzenia_hase%C5%82#Nag.C5.82.C3.B3wek" \
		target="_blank">Zasady tworzenia haseł: Nagłówek</a>.\n\
		Jeśli znasz kod ISO języka, który chcesz dodać, wystarczy, że wpiszesz go w poniższe pole.</small>',
	ADD_SECTION_TEMPLATE : 
		' {{język …}}',
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
		// TODO kat
		'Podałeś nieistniejący język. Sprawdź <a>listę dostępnych języków</a>.',
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
	INTRO:
		'Sekcja wstępna'
};
		
window.EdUi = {
		
		oldform :
			undefined,
		form :
			$('<div id="ed"/>'),
		menu :
			$('<ul id="ed_menu"/>'),
		content :
			$('<div id="ed_content"/>'),
		usingNew :
			true,

		prepareForm :
		function(oldform) {
			this.oldform = oldform;
			EdUi.form.append(EdUi.menu).append(EdUi.content);
			oldform.before(EdUi.form).hide();
			EdUi.form.show();

			var toggleEditor = $('<a href="#" id="toggleEditor">' + EdStr.TOGGLE_EDITOR + '</a>');
			toggleEditor.insertAfter('h1:first').click(function() {
				oldform.toggle();
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
				var p = $('<p id="ed_subsection_' + alpha + '_' + subsection.title.replace(' ', '_') + '"/>');
				p.append(EdUi.labeledInput('ed_' + alpha + '_' + subsection.title.replace(' ', '_'), 
						EdConstants.SUBSECTION_TITLE[subsection.title], subsection.content));
				return p;
			}
		},
		
		getSubsectionIntro :
		function(alpha, content) {
			var p = $('<p id="ed_subsection_' + alpha + '_intro"/>');
			p.append(EdUi.labeledInput('ed_' + alpha + '_intro', EdStr.INTRO, content));
			return p;
		},
		
		rebindFormActions :
		function() {
			this.form.find('textarea').removeAttr('name');
			this.form.parent('form').submit(function() {
				if (EdUi.usingNew) {
					EdUi.oldform.find('textarea').val(EPrinter.recalculateCode(this.form));
				}
				return true;
			});
		}
	};

//jQuery Alert Dialogs Plugin
//
// Version 1.1
//
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 14 May 2009
//
// Visit http://abeautifulsite.net/notebook/87 for more information
//
// Usage:
//		jAlert( message, [title, callback] )
//		jConfirm( message, [title, callback] )
//		jPrompt( message, [value, title, callback] )
// 
// History:
//
//		1.00 - Released (29 December 2008)
//
//		1.01 - Fixed bug where unbinding would destroy all resize events
//
// License:
// 
// This plugin is dual-licensed under the GNU General Public License and the MIT License and
// is copyright 2008 A Beautiful Site, LLC. 
//
(function($) {
	
	$.alerts = {
		
		// These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time
		
		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		overlayOpacity: .2,                // transparency level of overlay
		overlayColor: '#000',               // base color of overlay
		draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '&nbsp;OK&nbsp;',         // text for the OK button
		cancelButton: '&nbsp;Anuluj&nbsp;', // text for the Cancel button
		dialogClass: null,                  // if specified, this class will be applied to all dialogs
		
		// Public methods
		
		alert: function(message, title, callback) {
			if( title == null ) title = 'Ostrzeżenie';
			$.alerts._show(title, message, null, 'alert', function(result) {
				if( callback ) callback(result);
			});
		},
		
		confirm: function(message, title, callback) {
			if( title == null ) title = 'Potwierdzenie';
			$.alerts._show(title, message, null, 'confirm', function(result) {
				if( callback ) callback(result);
			});
		},
			
		prompt: function(message, value, title, callback) {
			if( title == null ) title = 'Pytanie';
			$.alerts._show(title, message, value, 'prompt', function(result) {
				if( callback ) callback(result);
			});
		},
		
		// Private methods
		
		_show: function(title, msg, value, type, callback) {
			
			$.alerts._hide();
			$.alerts._overlay('show');
			
			$("BODY").append(
			  '<div id="popup_container">' +
			    '<h1 id="popup_title"></h1>' +
			    '<div id="popup_content">' +
			      '<div id="popup_message"></div>' +
				'</div>' +
			  '</div>');
			
			if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);
			
			// IE6 Fix
			var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 
			
			$("#popup_container").css({
				position: pos,
				zIndex: 99999,
				padding: 0,
				margin: 0
			});
			
			$("#popup_title").text(title);
			$("#popup_content").addClass(type);
			$("#popup_message").text(msg);
			$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );
			
			$("#popup_container").css({
				minWidth: $("#popup_container").outerWidth(),
				maxWidth: $("#popup_container").outerWidth()
			});
			
			$.alerts._reposition();
			$.alerts._maintainPosition(true);
			
			switch( type ) {
				case 'alert':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'confirm':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'prompt':
					$("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_prompt").width( $("#popup_message").width() );
					$("#popup_ok").click( function() {
						var val = $("#popup_prompt").val();
						$.alerts._hide();
						if( callback ) callback( val );
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback( null );
					});
					$("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					if( value ) $("#popup_prompt").val(value);
					$("#popup_prompt").focus().select();
				break;
			}
			
			// Make draggable
			if( $.alerts.draggable ) {
				try {
					$("#popup_container").draggable({ handle: $("#popup_title") });
					$("#popup_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}
		},
		
		_hide: function() {
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},
		
		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.alerts._overlay('hide');
					$("BODY").append('<div id="popup_overlay"></div>');
					$("#popup_overlay").css({
						position: 'absolute',
						zIndex: 99998,
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(document).height(),
						background: $.alerts.overlayColor,
						opacity: $.alerts.overlayOpacity
					});
				break;
				case 'hide':
					$("#popup_overlay").remove();
				break;
			}
		},
		
		_reposition: function() {
			var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
			if( $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();
			
			$("#popup_container").css({
				top: top + 'px',
				left: left + 'px'
			});
			$("#popup_overlay").height( $(document).height() );
		},
		
		_maintainPosition: function(status) {
			if( $.alerts.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', $.alerts._reposition);
					break;
					case false:
						$(window).unbind('resize', $.alerts._reposition);
					break;
				}
			}
		}
		
	};
	
	// Shortcut functions
	jAlert = function(message, title, callback) {
		$.alerts.alert(message, title, callback);
	};
	
	jConfirm = function(message, title, callback) {
		$.alerts.confirm(message, title, callback);
	};
		
	jPrompt = function(message, value, title, callback) {
		$.alerts.prompt(message, value, title, callback);
	};
	
})(jQuery);

/************************************************************************/
/*                    tinyTips Plugin                			     	*/
/*                      Version: 1.0                 			   		*/
/*                      Mike Merritt                  					*/
/*                 Updated: Feb 4th, 2010                  				*/
/* Copyright (c) 2009 Mike Merritt

	Permission is hereby granted, free of charge, to any person
	obtaining a copy of this software and associated documentation
	files (the "Software"), to deal in the Software without
	restriction, including without limitation the rights to use,
	copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the
	Software is furnished to do so, subject to the following
	conditions:
	
	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.
**************************************************************************/

(function($){  
	$.fn.tooltip = function (supCont) {
		
		/* User settings
		**********************************/
		
		// Enter the markup for your tooltips here. The wrapping div must have a class of tinyTip and 
		// it must have a div with the class "content" somewhere inside of it.
		var tipFrame = '<div class="tinyTip"><div class="content"></div></div>';
		
		// Speed of the animations in milliseconds - 1000 = 1 second.
		var animSpeed = 200;
		
		/***************************************************************************************************/
		/* End of user settings - Do not edit below this line unless you are trying to edit functionality. */
		/***************************************************************************************************/
		
		// Global tinyTip variable;
		var tinyTip;
		var tText;
		
		// When we hover over the element that we want the tooltip applied to
		$(this).hover(function() {
		
			// Inject the markup for the tooltip into the page and
			// set the tooltip global to the current markup and then hide it.
			$('body').append(tipFrame);
			tinyTip = $('div.tinyTip');
			tinyTip.hide();
			
			// Grab the content for the tooltip from the title attribute (or the supplied content) and
			// inject it into the markup for the current tooltip. NOTE: title attribute is used unless
			// other content is supplied instead.
			if (supCont === 'tip') {
				var tipCont = $(this).data('tip');
			} else if (supCont !== 'tip') {
				var tipCont = supCont;
			}
			$('.tinyTip .content').html(tipCont);
			tText = $(this).data('tip');
			
			// Offsets so that the tooltip is centered over the element it is being applied to but
			// raise it up above the element so it isn't covering it.
			var yOffset = tinyTip.height() + 17;
			var xOffset = (((tinyTip.width() - 10) / 2)) - ($(this).width() / 2);
			
			// Grab the coordinates for the element with the tooltip and make a new copy
			// so that we can keep the original un-touched.
			var pos = $(this).offset();
			var nPos = pos;
			
			// Add the offsets to the tooltip position
			nPos.top = pos.top - yOffset;
			nPos.left = pos.left - xOffset;
			
			// Make sure that the tooltip has absolute positioning and a high z-index, 
			// then place it at the correct spot and fade it in.
			tinyTip.css('position', 'absolute').css('z-index', '1000');
			tinyTip.css(nPos).fadeIn(animSpeed);
			
		}, function() {
			
			$(this).data('tip', tText);
		
			// Fade the tooltip out once the mouse moves away and then remove it from the DOM.
			$('div.tinyTip').fadeOut(animSpeed, function() {
				$(this).remove();
			});
			
		});
		
	};

})(jQuery);

/*
 * jQuery autoResize (textarea auto-resizer)
 * @copyright James Padolsey http://james.padolsey.com
 * @version 1.04
 */

(function($){
    
    $.fn.autoResize = function(options) {
        
        // Just some abstracted details,
        // to make plugin users happy:
        var settings = $.extend({
            onResize : function(){},
            animate : false,
            animateDuration : 150,
            animateCallback : function(){},
            extraSpace : 5,
            limit: 1000
        }, options);
        
        // Only textarea's auto-resize:
        this.filter('textarea').each(function(){
            
                // Get rid of scrollbars and disable WebKit resizing:
            var textarea = $(this).css({resize:'none','overflow-y':'hidden'}),
            
                // Cache original height, for use later:
                origHeight = textarea.height(),
                
                // Need clone of textarea, hidden off screen:
                clone = (function(){
                    
                    // Properties which may effect space taken up by chracters:
                    var props = ['height','width','lineHeight','textDecoration','letterSpacing'],
                        propOb = {};
                        
                    // Create object of styles to apply:
                    $.each(props, function(i, prop){
                        propOb[prop] = textarea.css(prop);
                    });
                    
                    // Clone the actual textarea removing unique properties
                    // and insert before original textarea:
                    return textarea.clone().removeAttr('id').removeAttr('name').css({
                        position: 'absolute',
                        top: 0,
                        left: -9999
                    }).css(propOb).attr('tabIndex','-1').insertBefore(textarea);
					
                })(),
                lastScrollTop = null,
                updateSize = function() {
					
                    // Prepare the clone:
                    clone.height(0).val($(this).val()).scrollTop(10000);
					
                    // Find the height of text:
                    var scrollTop = Math.max(clone.scrollTop(), origHeight) + settings.extraSpace,
                        toChange = $(this).add(clone);
						
                    // Don't do anything if scrollTip hasen't changed:
                    if (lastScrollTop === scrollTop) { return; }
                    lastScrollTop = scrollTop;
					
                    // Check for limit:
                    if ( scrollTop >= settings.limit ) {
                        $(this).css('overflow-y','');
                        return;
                    }
                    // Fire off callback:
                    settings.onResize.call(this);
					
                    // Either animate or directly apply height:
                    settings.animate && textarea.css('display') === 'block' ?
                        toChange.stop().animate({height:scrollTop}, settings.animateDuration, settings.animateCallback)
                        : toChange.height(scrollTop);
                };
            
            // Bind namespaced handlers to appropriate events:
            textarea
                .unbind('.dynSiz')
                .bind('keyup.dynSiz', updateSize)
                .bind('keydown.dynSiz', updateSize)
                .bind('change.dynSiz', updateSize);
            
        });
        
        // Chain:
        return this;
        
    };
    
    
    
})(jQuery);

/*! Copyright (c) 2008 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.0.3
 * Requires jQuery 1.1.3+
 * Docs: http://docs.jquery.com/Plugins/livequery
 */

(function($) {
	
$.extend($.fn, {
	livequery: function(type, fn, fn2) {
		var self = this, q;
		
		// Handle different call patterns
		if ($.isFunction(type))
			fn2 = fn, fn = type, type = undefined;
			
		// See if Live Query already exists
		$.each( $.livequery.queries, function(i, query) {
			if ( self.selector == query.selector && self.context == query.context &&
				type == query.type && (!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid) )
					// Found the query, exit the each loop
					return (q = query) && false;
		});
		
		// Create new Live Query if it wasn't found
		q = q || new $.livequery(this.selector, this.context, type, fn, fn2);
		
		// Make sure it is running
		q.stopped = false;
		
		// Run it immediately for the first time
		q.run();
		
		// Contnue the chain
		return this;
	},
	
	expire: function(type, fn, fn2) {
		var self = this;
		
		// Handle different call patterns
		if ($.isFunction(type))
			fn2 = fn, fn = type, type = undefined;
			
		// Find the Live Query based on arguments and stop it
		$.each( $.livequery.queries, function(i, query) {
			if ( self.selector == query.selector && self.context == query.context && 
				(!type || type == query.type) && (!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid) && !this.stopped )
					$.livequery.stop(query.id);
		});
		
		// Continue the chain
		return this;
	}
});

$.livequery = function(selector, context, type, fn, fn2) {
	this.selector = selector;
	this.context  = context || document;
	this.type     = type;
	this.fn       = fn;
	this.fn2      = fn2;
	this.elements = [];
	this.stopped  = false;
	
	// The id is the index of the Live Query in $.livequery.queries
	this.id = $.livequery.queries.push(this)-1;
	
	// Mark the functions for matching later on
	fn.$lqguid = fn.$lqguid || $.livequery.guid++;
	if (fn2) fn2.$lqguid = fn2.$lqguid || $.livequery.guid++;
	
	// Return the Live Query
	return this;
};

$.livequery.prototype = {
	stop: function() {
		var query = this;
		
		if ( this.type )
			// Unbind all bound events
			this.elements.unbind(this.type, this.fn);
		else if (this.fn2)
			// Call the second function for all matched elements
			this.elements.each(function(i, el) {
				query.fn2.apply(el);
			});
			
		// Clear out matched elements
		this.elements = [];
		
		// Stop the Live Query from running until restarted
		this.stopped = true;
	},
	
	run: function() {
		// Short-circuit if stopped
		if ( this.stopped ) return;
		var query = this;
		
		var oEls = this.elements,
			els  = $(this.selector, this.context),
			nEls = els.not(oEls);
		
		// Set elements to the latest set of matched elements
		this.elements = els;
		
		if (this.type) {
			// Bind events to newly matched elements
			nEls.bind(this.type, this.fn);
			
			// Unbind events to elements no longer matched
			if (oEls.length > 0)
				$.each(oEls, function(i, el) {
					if ( $.inArray(el, els) < 0 )
						$.event.remove(el, query.type, query.fn);
				});
		}
		else {
			// Call the first function for newly matched elements
			nEls.each(function() {
				query.fn.apply(this);
			});
			
			// Call the second function for elements no longer matched
			if ( this.fn2 && oEls.length > 0 )
				$.each(oEls, function(i, el) {
					if ( $.inArray(el, els) < 0 )
						query.fn2.apply(el);
				});
		}
	}
};

$.extend($.livequery, {
	guid: 0,
	queries: [],
	queue: [],
	running: false,
	timeout: null,
	
	checkQueue: function() {
		if ( $.livequery.running && $.livequery.queue.length ) {
			var length = $.livequery.queue.length;
			// Run each Live Query currently in the queue
			while ( length-- )
				$.livequery.queries[ $.livequery.queue.shift() ].run();
		}
	},
	
	pause: function() {
		// Don't run anymore Live Queries until restarted
		$.livequery.running = false;
	},
	
	play: function() {
		// Restart Live Queries
		$.livequery.running = true;
		// Request a run of the Live Queries
		$.livequery.run();
	},
	
	registerPlugin: function() {
		$.each( arguments, function(i,n) {
			// Short-circuit if the method doesn't exist
			if (!$.fn[n]) return;
			
			// Save a reference to the original method
			var old = $.fn[n];
			
			// Create a new method
			$.fn[n] = function() {
				// Call the original method
				var r = old.apply(this, arguments);
				
				// Request a run of the Live Queries
				$.livequery.run();
				
				// Return the original methods result
				return r;
			};
		});
	},
	
	run: function(id) {
		if (id != undefined) {
			// Put the particular Live Query in the queue if it doesn't already exist
			if ( $.inArray(id, $.livequery.queue) < 0 )
				$.livequery.queue.push( id );
		}
		else
			// Put each Live Query in the queue if it doesn't already exist
			$.each( $.livequery.queries, function(id) {
				if ( $.inArray(id, $.livequery.queue) < 0 )
					$.livequery.queue.push( id );
			});
		
		// Clear timeout if it already exists
		if ($.livequery.timeout) clearTimeout($.livequery.timeout);
		// Create a timeout to check the queue and actually run the Live Queries
		$.livequery.timeout = setTimeout($.livequery.checkQueue, 20);
	},
	
	stop: function(id) {
		if (id != undefined)
			// Stop are particular Live Query
			$.livequery.queries[ id ].stop();
		else
			// Stop all Live Queries
			$.each( $.livequery.queries, function(id) {
				$.livequery.queries[ id ].stop();
			});
	}
});

// Register core DOM manipulation methods
$.livequery.registerPlugin('append', 'prepend', 'after', 'before', 'wrap', 'attr', 'removeAttr', 'addClass', 'removeClass', 'toggleClass', 'empty', 'remove');

// Run Live Queries when the Document is ready
$(function() { $.livequery.play(); });


// Save a reference to the original init method
var init = $.prototype.init;

// Create a new init method that exposes two new properties: selector and context
$.prototype.init = function(a,c) {
	// Call the original init and save the result
	var r = init.apply(this, arguments);
	
	// Copy over properties if they exist already
	if (a && a.selector)
		r.context = a.context, r.selector = a.selector;
		
	// Set properties
	if ( typeof a == 'string' )
		r.context = c || document, r.selector = a;
	
	// Return the result
	return r;
};

// Give the init function the jQuery prototype for later instantiation (needed after Rev 4091)
$.prototype.init.prototype = $.prototype;
	
})(jQuery);

if ((mw.config.get('wgAction') == 'edit' || mw.config.get('wgAction') == 'submit')
		&& mw.config.get('wgNamespaceNumber') == 0) {	
	$(document).ready(Ed.init);
}