/**
 *
 */

window.EConstants = {
	INTRO : '«',
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
			'' : 'Sekcja wstępna'
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
			'az', 'be', 'bs', 'crh', 'jdt', 'lad', 'slovio', 'sr', 'tk', 'tt', 'tut', 'ug'
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
			'przykłady' : ": (1.1) ''[[przykład|Przykład]] [[zdanie|zdania]].''",
			'tłumaczenia' : "* angielski: (1.1) [[ ]]"
		},
	SAMPLE_SUBSECTION_CONTENTS_FOREIGN :
		{
			'znaczenia' : "''rzeczownik, rodzaj żeński, męski''\n: (1.1) [[krótki|krótka]] [[definicja]]",
			'przykłady' : ": (1.1) ''[[przykład|Przykład]] [[zdanie|zdania]].'' → [[tłumaczenie|Tłumaczenie]] [[zdanie|zdania]]."
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
	API_ID :
		{
			0 : 'add_ipa',
			1 : 'add_iw'
		},

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

window.EStr = {
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
		'Dodaj IPA',
	GET_IPA:
		'Spróbuj pobrać wymowę zapisaną w międzynarodowym alfabecie fonetycznym z innych wersji językowych Wikisłownika',
	ADD_INTERWIKI:
		'Dodaj (zaktualizuj) interwiki',
	GET_INTERWIKI:
		'Pobierz interwiki z innych wersji językowych Wikisłownika',
	WILL_BE_SHOWN:
		'<br/><small>Wyniki zapytania z poszczególnych wersji językowych zostaną pokazane w okienku, które umożliwi ich proste dodawanie do hasła.</small>',
	NO_IPA_FOUND:
		'Nie znaleziono IPA',
	AJAX_IPA_RESULT_INSTRUCTION:
		'<div id="ajax_result_disc"><small>\
		Poniżej wyświetlono zapisy w międzynarodowym alfabecie fonetycznym, które udało się znaleźć \
		w artykułach o tej samej nazwie w innych wersjach językowych Wikisłownika. Kliknij wybrany wynik, aby wstawić go w miejscu, \
		w którym znajduje się teraz kursor.\
		</small></div>',
	VIEW_ARTICLE:
		'zobacz hasło',
};


window.EFilesLoaded++;
window.ETryInit();
