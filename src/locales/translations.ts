export type Language = 'he' | 'en' | 'ru';

export interface Translations {
  [key: string]: {
    he: string;
    en: string;
    ru: string;
  };
}

export const translations: Translations = {
  // Header
  bsd: {
    he: 'בס"ד',
    en: 'With God\'s Help',
    ru: 'С Б-жьей помощью',
  },

  // Navigation
  home: {
    he: 'דף הבית',
    en: 'Home',
    ru: 'Главная',
  },
  aquarium: {
    he: 'שירי אקוואריום',
    en: 'Aquarium Songs',
    ru: 'Песни Аквариума',
  },
  mySongs: {
    he: 'השירים שלי',
    en: 'My Songs',
    ru: 'Мои песни',
  },
  articles: {
    he: 'מאמרים',
    en: 'Articles',
    ru: 'Статьи',
  },

  // Homepage
  welcomeTitle: {
    he: 'ראובן רז - שירים ותרגומים',
    en: 'Reuven Raz - Songs and Translations',
    ru: 'Рувен Раз - Песни и переводы',
  },
  welcomeSubtitle: {
    he: 'מתרגם ומפיק מוזיקלי',
    en: 'Translator and Music Producer',
    ru: 'Переводчик и музыкальный продюсер',
  },
  aquariumCTA: {
    he: 'למדור שירי אקוואריום',
    en: 'Aquarium Songs Section',
    ru: 'Раздел песен Аквариума',
  },
  exploreMusic: {
    he: 'לגלות את המוזיקה',
    en: 'Explore the Music',
    ru: 'Откройте для себя музыку',
  },

  // Aquarium Section
  aquariumTitle: {
    he: "שירי בוריס גרבנשצ'יקוב ואקוואריום בתרגום לעברית ובביצוע ראובן רז וחבריו",
    en: "Songs of Boris Grebenshchikov and Aquarium in Hebrew Translation, Performed by Reuven Raz and Friends",
    ru: "Песни Бориса Гребенщикова и Аквариума в переводе на иврит в исполнении Рувена Раза и друзей",
  },
  aquariumSubtitle: {
    he: "תרגומים לעברית של שירי בוריס גרבנשצ'יקוב ולהקת אקוואריום",
    en: "Hebrew translations of Boris Grebenshchikov and Aquarium band songs",
    ru: "Переводы песен Бориса Гребенщикова и группы Аквариум на иврит",
  },
  myYoutubeChannel: {
    he: 'ערוץ היוטיוב של ראובן רז',
    en: "Reuven Raz's YouTube Channel",
    ru: 'Канал Рувена Раза на YouTube',
  },
  borisSpotify: {
    he: "ספוטיפיי של בוריס גרבנשצ'יקוב",
    en: "Boris Grebenshchikov's Spotify",
    ru: 'Spotify Бориса Гребенщикова',
  },
  interestingLinks: {
    he: 'קישורים מעניינים',
    en: 'Interesting Links',
    ru: 'Интересные ссылки',
  },
  followMe: {
    he: 'עקבו אחריי',
    en: 'Follow Me',
    ru: 'Подписывайтесь',
  },
  supportMyWork: {
    he: 'תמיכה בעבודה שלי',
    en: 'Support My Work',
    ru: 'Поддержать мою работу',
  },
  koFi: {
    he: 'Ko-fi',
    en: 'Ko-fi',
    ru: 'Ko-fi',
  },
  paypal: {
    he: 'PayPal',
    en: 'PayPal',
    ru: 'PayPal',
  },
  officialWebsite: {
    he: 'האתר הרשמי',
    en: 'Official Website',
    ru: 'Официальный сайт',
  },
  spotify: {
    he: 'ספוטיפיי',
    en: 'Spotify',
    ru: 'Spotify',
  },
  originalText: {
    he: 'מקור',
    en: 'Original',
    ru: 'Оригинал',
  },
  hebrewTranslation: {
    he: 'תרגום עברי',
    en: 'Hebrew Translation',
    ru: 'Перевод на иврит',
  },
  review: {
    he: 'ביקורת',
    en: 'Review',
    ru: 'Отзыв',
  },
  reviews: {
    he: 'ביקורות',
    en: 'Reviews',
    ru: 'Отзывы',
  },
  writeReview: {
    he: 'כתוב ביקורת',
    en: 'Write a Review',
    ru: 'Написать отзыв',
  },
  like: {
    he: 'אהבתי',
    en: 'Like',
    ru: 'Нравится',
  },
  likes: {
    he: 'אהבות',
    en: 'Likes',
    ru: 'Лайков',
  },

  // Song Card
  listenOnYoutube: {
    he: 'האזן ביוטיוב',
    en: 'Listen on YouTube',
    ru: 'Слушать на YouTube',
  },

  // Articles
  readMore: {
    he: 'קרא עוד',
    en: 'Read More',
    ru: 'Читать далее',
  },
  articleAnalysis: {
    he: 'ניתוח השיר',
    en: 'Song Analysis',
    ru: 'Анализ песни',
  },

  // Footer
  copyright: {
    he: 'כל הזכויות שמורות',
    en: 'All Rights Reserved',
    ru: 'Все права защищены',
  },
  contact: {
    he: 'צור קשר',
    en: 'Contact',
    ru: 'Контакты',
  },

  // Language Switcher
  selectLanguage: {
    he: 'בחר שפה',
    en: 'Select Language',
    ru: 'Выберите язык',
  },

  // Empty States
  noSongsYet: {
    he: 'אין שירים עדיין',
    en: 'No songs yet',
    ru: 'Пока нет песен',
  },
  noArticlesYet: {
    he: 'אין מאמרים עדיין',
    en: 'No articles yet',
    ru: 'Пока нет статей',
  },
  comingSoon: {
    he: 'בקרוב',
    en: 'Coming Soon',
    ru: 'Скоро',
  },

  // Form
  submit: {
    he: 'שלח',
    en: 'Submit',
    ru: 'Отправить',
  },
  cancel: {
    he: 'ביטול',
    en: 'Cancel',
    ru: 'Отмена',
  },
  yourName: {
    he: 'שמך',
    en: 'Your Name',
    ru: 'Ваше имя',
  },
  yourReview: {
    he: 'הביקורת שלך',
    en: 'Your Review',
    ru: 'Ваш отзыв',
  },
};

export const getTranslation = (key: string, lang: Language): string => {
  if (translations[key]) {
    return translations[key][lang];
  }
  return key;
};
