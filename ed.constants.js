/**
 * 
 */

window.EdConstants = {
	INTRO : '«',
	SUBSECTIONS :
	{
		POLISH : [
		 	'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje',
		 	'synonimy', 'antonimy', 'pokrewne', 'frazeologia', 'etymologia',
		 	'uwagi', 'tłumaczenia', 'źródła'
		],
		LATIN : [
		 	'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje',
		 	'synonimy', 'antonimy', 'pokrewne', 'frazeologia', 'etymologia',
		 	'uwagi', 'źródła'
		],
		NON_LATIN : [
		 	'transliteracja', 'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje',
		 	'synonimy', 'antonimy', 'pokrewne', 'frazeologia', 'etymologia',
		 	'uwagi', 'źródła'
		],
		DOUBLE : [
		 	'ortografie', 'transliteracja', 'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje',
		 	'synonimy', 'antonimy', 'pokrewne', 'frazeologia', 'etymologia',
		 	'uwagi', 'źródła'
		],
		CHINESE : [ // zh-char
		 	'klucz', 'kreski', 'warianty', 'kolejność', 'znaczenia', 'etymologia', 'kody', 'słowniki',
			'uwagi', 'źródła'
		],
		KOREAN: [ // ko
		 	'transliteracja', 'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje',
		 	'synonimy', 'antonimy', 'pokrewne', 'frazeologia', 'etymologia', 'hanja', //'hanja-kreski'?
		 	'uwagi', 'źródła'
		],
		JAPANESE: [ // ja
		 	'transliteracja', 'czytania', 'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje',
		 	'synonimy', 'antonimy', 'złożenia', 'pokrewne', 'frazeologia', 'etymologia',
		 	'uwagi', 'źródła'		
		],
		EGYPTIAN : [ // egy
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
		'czytania' : 'Czytania',
		'złożenia' : 'Złożenia',
		'hanja' : 'Hanja',
		'' : 'Sekcja wstępna'
	},
	NON_LATIN_LANGS :
		['ru', 'uk', 'kk', 'be', 'hy', 'ka', 'he', 'yi', 'ar', 'fa', 'ja', 'ko', 'th', 'ur',
		 'hi', 'zh', 'bg', 'mk', 'el', 'gr', 'bo', 'cau', 'ab', 'ady', 'akk', 'am', 'arc',
		 'as', 'bn', 'av', 'ba', 'bal', 'my', 'gez', 'gu', 'got', 'myv', 'ky', 'dz', 'cv', 
		 'ce', 'kjh', 'bs', 'ta', 'inh', 'iu', 'kn', 'ks', 'mr', 'km', 'kv', 'kok', 'cr',
		 'ku', 'lo', 'lez', 'ml', 'dv', 'mn', 'ne', 'new', 'os', 'ps', 'pa', 'rom', 'sa',
		 'sd', 'ckb', 'cu', 'sux', 'si', 'tab', 'tg', 'tzm', 'te', 'zrp'],
	DOUBLE_LANGS :
		['sr', 'tut', 'jdt', 'lad', 'tt', 'tk', 'ug', 'slovio', 'az', 'crh', 'be'],
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
		'Dodajesz nową sekcję językową.<br/>\
		Podaj nazwę języka (np. <tt>polski</tt>, <tt>tatarski</tt>) lub jego kod ISO (<tt>pl</tt>, <tt>tt</tt>).<br/>\
		<small>Zobacz też: \
		<a href="http://pl.wiktionary.org/wiki/Wikis%C5%82ownik:Zasady_tworzenia_hase%C5%82#Nag.C5.82.C3.B3wek" \
		target="_blank">Zasady tworzenia haseł: Nagłówek</a>.<br/>\
		Możesz też dodać niestandardowy nagłówek (np. akcenty, linki do poszczególnych wyrazów). W tym celu \
		wpisz cały kod nagłówka jak poniżej (bez znaków ==).</small>',
	ADD_SECTION_MESSAGE_DEFAULT :
		'Dodajesz nową sekcję językową.<br/>\
		Podaj nazwę języka (np. <tt>polski</tt>, <tt>tatarski</tt>) lub jego kod ISO (<tt>pl</tt>, <tt>tt</tt>).<br/>\
		<small>Zobacz też: \
		<a href="http://pl.wiktionary.org/wiki/Wikis%C5%82ownik:Zasady_tworzenia_hase%C5%82#Nag.C5.82.C3.B3wek" \
		target="_blank">Zasady tworzenia haseł: Nagłówek</a>.<br/>\
		Możesz też dodać niestandardowy nagłówek (np. akcenty, linki do poszczególnych wyrazów). W tym celu \
		wpisz cały kod nagłówka (bez znaków ==).</small>',
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
	INTRO:
		'Sekcja wstępna',
	OBLIGATORY_SUBSECTION:
		'<br />(sekcja obowiązkowa)',
	EDIT_SECTION_TITLE:
		'Edytuj nagłówek tej sekcji językowej',
	EDIT_SECTION_TITLE_MESSAGE:
		'Podaj nową zawartość nagłówka bieżącej sekcji językowej (bez znaków <tt>==</tt>)',
	DELETE_SECTION:
		'Usuń tę sekcję językową',
	DELETE_SECTION_MESSAGE:
		'Czy na pewno usunąć bieżącą sekcję językową?'
};


window.EdFilesLoaded++;
window.EdTryInit();