let EnumsService = function () {
  let enums = {
    sex: {
      0: 'Male',
      1: 'Female',
      2: 'Other',
    },
    volunteer_level: {
      0: 'Unverified',
      1: 'Verified',
      2: 'Trained',
      3: 'hasObserved',
      4: 'beenObserved'
    },
    days: {
      0: 'Monday',
      1: 'Tuesday',
      2: 'Wednesday',
      3: 'Thursday',
      4: 'Friday',
      5: 'Saturday',
      6: 'Sunday',
    },
    preferred_contact: {
      0: 'Email',
      1: 'Text',
      2: 'Both',
    },
    languages: {
    	'af': 'Afrikaans',
    	'ar': 'Arabic',
    	'ast': 'Asturian',
    	'az': 'Azerbaijani',
    	'bg': 'Bulgarian',
    	'be': 'Belarusian',
    	'bn': 'Bengali',
    	'br': 'Breton',
    	'bs': 'Bosnian',
    	'ca': 'Catalan',
    	'cs': 'Czech',
    	'cy': 'Welsh',
    	'da': 'Danish',
    	'de': 'German',
    	'el': 'Greek',
    	'en': 'English',
    	'en-au': 'Australian English',
    	'en-gb': 'British English',
    	'eo': 'Esperanto',
    	'es': 'Spanish',
    	'es-ar': 'Argentinian Spanish',
    	'es-co': 'Colombian Spanish',
    	'es-mx': 'Mexican Spanish',
    	'es-ni': 'Nicaraguan Spanish',
    	'es-ve': 'Venezuelan Spanish',
    	'et': 'Estonian',
    	'eu': 'Basque',
    	'fa': 'Persian',
    	'fi': 'Finnish',
    	'fr': 'French',
    	'fy': 'Frisian',
    	'ga': 'Irish',
    	'gd': 'Scottish Gaelic',
    	'gl': 'Galician',
    	'he': 'Hebrew',
    	'hi': 'Hindi',
    	'hr': 'Croatian',
    	'hu': 'Hungarian',
    	'ia': 'Interlingua',
    	'id': 'Indonesian',
    	'io': 'Ido',
    	'is': 'Icelandic',
    	'it': 'Italian',
    	'ja': 'Japanese',
    	'ka': 'Georgian',
    	'kk': 'Kazakh',
    	'km': 'Khmer',
    	'kn': 'Kannada',
    	'ko': 'Korean',
    	'lb': 'Luxembourgish',
    	'lt': 'Lithuanian',
    	'lv': 'Latvian',
    	'mk': 'Macedonian',
    	'ml': 'Malayalam',
    	'mn': 'Mongolian',
    	'mr': 'Marathi',
    	'my': 'Burmese',
    	'nb': 'Norwegian Bokmal',
    	'ne': 'Nepali',
    	'nl': 'Dutch',
    	'nn': 'Norwegian Nynorsk',
    	'os': 'Ossetic',
    	'pa': 'Punjabi',
    	'pl': 'Polish',
    	'pt': 'Portuguese',
    	'pt-br': 'Brazilian Portuguese',
    	'ro': 'Romanian',
    	'ru': 'Russian',
    	'sk': 'Slovak',
    	'sl': 'Slovenian',
    	'sq': 'Albanian',
    	'sr': 'Serbian',
    	'sr-latn': 'Serbian Latin',
    	'sv': 'Swedish',
    	'sw': 'Swahili',
    	'ta': 'Tamil',
    	'te': 'Telugu',
    	'th': 'Thai',
    	'tr': 'Turkish',
    	'tt': 'Tatar',
    	'udm': 'Udmurt',
    	'uk': 'Ukrainian',
    	'ur': 'Urdu',
    	'vi': 'Vietnamese',
    	'zh-hans': 'Simplified Chinese',
    	'zh-hant': 'Traditional Chinese',
    },
    carriers: {
      0: "Other",
      1: "AT&T",
      2: "Sprint",
      3: "T-Mobile",
      4: "Verizon",
      5: "Alltel",
      6: "Boost",
      7: "Centennial Wireless",
      8: "Cincinnati Bell",
      9: "Cricket Wireless",
      10: "Metro PCS",
      11: "Qwest",
      12: "Rogers",
      13: "Telus",
      14: "U.S. Cellular",
      15: "Virgin Mobile USA",
    },
    assignment_type: {
      0: 'in-person',
      1: 'written',
      2: 'training'
    },
    assignment_status: {
      0: 'unapproved',
      1: 'approved',
      2: 'complete'
    }
  };
  enums.arrays = {
    sex: [
      {'key': 0, 'name': 'Male'},
      {'key': 1, 'name': 'Female'},
      {'key': 2, 'name': 'Other'}
    ],
    volunteer_level: [
      {'key': 0, 'name': 'Unverified'},
      {'key': 1, 'name': 'Verified'},
      {'key': 2, 'name': 'Trained'},
      {'key': 3, 'name': 'hasObserved'},
      {'key': 4, 'name': 'beenObserved'}
    ],
    days: [
      {'key': 0, 'name': 'Monday'},
      {'key': 1, 'name': 'Tuesday'},
      {'key': 2, 'name': 'Wednesday'},
      {'key': 3, 'name': 'Thursday'},
      {'key': 4, 'name': 'Friday'},
      {'key': 5, 'name': 'Saturday'},
      {'key': 6, 'name': 'Sunday'}
    ],
    preferred_contact: [
      {'key': 0, 'name': 'Email'},
      {'key': 1, 'name': 'Text'},
      {'key': 2, 'name': 'Both'}
    ],
    languages: [
    	{'key': 'af', 'name': 'Afrikaans'},
    	{'key': 'ar', 'name': 'Arabic'},
    	{'key': 'ast', 'name': 'Asturian'},
    	{'key': 'az', 'name': 'Azerbaijani'},
    	{'key': 'bg', 'name': 'Bulgarian'},
    	{'key': 'be', 'name': 'Belarusian'},
    	{'key': 'bn', 'name': 'Bengali'},
    	{'key': 'br', 'name': 'Breton'},
    	{'key': 'bs', 'name': 'Bosnian'},
    	{'key': 'ca', 'name': 'Catalan'},
    	{'key': 'cs', 'name': 'Czech'},
    	{'key': 'cy', 'name': 'Welsh'},
    	{'key': 'da', 'name': 'Danish'},
    	{'key': 'de', 'name': 'German'},
    	{'key': 'el', 'name': 'Greek'},
    	{'key': 'en', 'name': 'English'},
    	{'key': 'en-au', 'name': 'Australian English'},
    	{'key': 'en-gb', 'name': 'British English'},
    	{'key': 'eo', 'name': 'Esperanto'},
    	{'key': 'es', 'name': 'Spanish'},
    	{'key': 'es-ar', 'name': 'Argentinian Spanish'},
    	{'key': 'es-co', 'name': 'Colombian Spanish'},
    	{'key': 'es-mx', 'name': 'Mexican Spanish'},
    	{'key': 'es-ni', 'name': 'Nicaraguan Spanish'},
    	{'key': 'es-ve', 'name': 'Venezuelan Spanish'},
    	{'key': 'et', 'name': 'Estonian'},
    	{'key': 'eu', 'name': 'Basque'},
    	{'key': 'fa', 'name': 'Persian'},
    	{'key': 'fi', 'name': 'Finnish'},
    	{'key': 'fr', 'name': 'French'},
    	{'key': 'fy', 'name': 'Frisian'},
    	{'key': 'ga', 'name': 'Irish'},
    	{'key': 'gd', 'name': 'Scottish Gaelic'},
    	{'key': 'gl', 'name': 'Galician'},
    	{'key': 'he', 'name': 'Hebrew'},
    	{'key': 'hi', 'name': 'Hindi'},
    	{'key': 'hr', 'name': 'Croatian'},
    	{'key': 'hu', 'name': 'Hungarian'},
    	{'key': 'ia', 'name': 'Interlingua'},
    	{'key': 'id', 'name': 'Indonesian'},
    	{'key': 'io', 'name': 'Ido'},
    	{'key': 'is', 'name': 'Icelandic'},
    	{'key': 'it', 'name': 'Italian'},
    	{'key': 'ja', 'name': 'Japanese'},
    	{'key': 'ka', 'name': 'Georgian'},
    	{'key': 'kk', 'name': 'Kazakh'},
    	{'key': 'km', 'name': 'Khmer'},
    	{'key': 'kn', 'name': 'Kannada'},
    	{'key': 'ko', 'name': 'Korean'},
    	{'key': 'lb', 'name': 'Luxembourgish'},
    	{'key': 'lt', 'name': 'Lithuanian'},
    	{'key': 'lv', 'name': 'Latvian'},
    	{'key': 'mk', 'name': 'Macedonian'},
    	{'key': 'ml', 'name': 'Malayalam'},
    	{'key': 'mn', 'name': 'Mongolian'},
    	{'key': 'mr', 'name': 'Marathi'},
    	{'key': 'my', 'name': 'Burmese'},
    	{'key': 'nb', 'name': 'Norwegian Bokmal'},
    	{'key': 'ne', 'name': 'Nepali'},
    	{'key': 'nl', 'name': 'Dutch'},
    	{'key': 'nn', 'name': 'Norwegian Nynorsk'},
    	{'key': 'os', 'name': 'Ossetic'},
    	{'key': 'pa', 'name': 'Punjabi'},
    	{'key': 'pl', 'name': 'Polish'},
    	{'key': 'pt', 'name': 'Portuguese'},
    	{'key': 'pt-br', 'name': 'Brazilian Portuguese'},
    	{'key': 'ro', 'name': 'Romanian'},
    	{'key': 'ru', 'name': 'Russian'},
    	{'key': 'sk', 'name': 'Slovak'},
    	{'key': 'sl', 'name': 'Slovenian'},
    	{'key': 'sq', 'name': 'Albanian'},
    	{'key': 'sr', 'name': 'Serbian'},
    	{'key': 'sr-latn', 'name': 'Serbian Latin'},
    	{'key': 'sv', 'name': 'Swedish'},
    	{'key': 'sw', 'name': 'Swahili'},
    	{'key': 'ta', 'name': 'Tamil'},
    	{'key': 'te', 'name': 'Telugu'},
    	{'key': 'th', 'name': 'Thai'},
    	{'key': 'tr', 'name': 'Turkish'},
    	{'key': 'tt', 'name': 'Tatar'},
    	{'key': 'udm', 'name': 'Udmurt'},
    	{'key': 'uk', 'name': 'Ukrainian'},
    	{'key': 'ur', 'name': 'Urdu'},
    	{'key': 'vi', 'name': 'Vietnamese'},
    	{'key': 'zh-hans', 'name': 'Simplified Chinese'},
    	{'key': 'zh-hant', 'name': 'Traditional Chinese'}
    ],
    carriers: [
      {'key': 0, 'name': "Other"},
      {'key': 1, 'name': "AT&T"},
      {'key': 2, 'name': "Sprint"},
      {'key': 3, 'name': "T-Mobile"},
      {'key': 4, 'name': "Verizon"},
      {'key': 5, 'name': "Alltel"},
      {'key': 6, 'name': "Boost"},
      {'key': 7, 'name': "Centennial Wireless"},
      {'key': 8, 'name': "Cincinnati Bell"},
      {'key': 9, 'name': "Cricket Wireless"},
      {'key': 10, 'name': "Metro PCS"},
      {'key': 11, 'name': "Qwest"},
      {'key': 12, 'name': "Rogers"},
      {'key': 13, 'name': "Telus"},
      {'key': 14, 'name': "U.S. Cellular"},
      {'key': 15, 'name': "Virgin Mobile USA"},
    ],
    assignment_type: [
      {'key': 0, 'name': 'in-person'},
      {'key': 1, 'name': 'written'},
      {'key': 2, 'name': 'training'}
    ],
    assignment_status: [
      {'key': 0, 'name': 'unapproved'},
      {'key': 1, 'name': 'approved'},
      {'key': 2, 'name': 'complete'}
    ],
    availability_times: [
      '08:00:00',
      '08:30:00',
      '09:00:00',
      '09:30:00',
      '10:00:00',
      '10:30:00',
      '11:00:00',
      '11:30:00',
      '12:00:00',
      '12:30:00',
      '13:00:00',
      '13:30:00',
      '14:00:00',
      '14:30:00',
      '15:00:00',
      '15:30:00',
      '16:00:00',
      '16:30:00',
      '17:00:00',
      '17:30:00',
      '18:00:00',
      '18:30:00',
    ]
  };
  return enums;
};
export default EnumsService;
