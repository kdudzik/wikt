/**
 * 
 */

window.EdConstants = {
	INTRO : '«',
	SUBSECTIONS :
		{
			POLISH :
			 	['wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje',
			 	 'synonimy', 'antonimy', 'pokrewne', 'frazeologia', 'etymologia',
			 	 'uwagi', 'tłumaczenia', 'źródła'],
			LATIN :
			 	['wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje',
			 	 'synonimy', 'antonimy', 'pokrewne', 'frazeologia', 'etymologia',
			 	 'uwagi', 'źródła'],
			NON_LATIN :
			 	['transliteracja', 'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje',
			 	 'synonimy', 'antonimy', 'pokrewne', 'frazeologia', 'etymologia',
			 	 'uwagi', 'źródła'],
			DOUBLE :
			 	['ortografie', 'transliteracja', 'wymowa', 'znaczenia', 'odmiana', 'przykłady', 'składnia', 'kolokacje',
			 	 'synonimy', 'antonimy', 'pokrewne', 'frazeologia', 'etymologia',
			 	 'uwagi', 'źródła'],
			CHINESE :
				['klucz', 'kreski', 'warianty', 'kolejność', 'znaczenia', 'etymologia', 'kody', 'słowniki',
				 'uwagi', 'źródła']
		},
	LANG_CODES_SHORT :
		{
			'dżuhuri' : 'jdt', 'esperanto' : 'eo', 'ewe' : 'ee', 'hindi' : 'hi', 
			'ido' : 'io', 'interlingua' : 'ia', 'inuktitut' : 'iu', 'ladino' : 'lad', 
			'lingala' : 'ln', 'lojban' : 'jbo', 'novial' : 'nov', 'papiamento' : 'pap',
			'pitjantjatjara' : 'pjt', 'sanskryt' : 'sa', 'slovio' : 'slovio', 'sranan tongo' : 'srn', 
			'tetum' : 'tet', 'tok pisin' : 'tpi', 'tupinambá' : 'tpn', 'użycie międzynarodowe' : 'inter',
			'volapük' : 'vo', 'znak chiński' : 'zh-char', 'jidysz' : 'yi', 'jèrriais' : 'roa'
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
			'łotewski' : 'lv', 'średnio-dolno-niemiecki' : '', 'średnio-wysoko-niemiecki' : 'gmh',
			'średnioangielski' : 'enm', 'żmudzki' : 'bat'
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
		target="_blank">Zasady tworzenia haseł: Nagłówek</a></small>',
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
		'znak chiński'
};


window.EdFilesLoaded++;
window.EdTryInit();