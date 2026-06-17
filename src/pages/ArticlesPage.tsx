import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, Calendar, ArrowLeft } from 'lucide-react';
import type { Article } from '../types';
import { supabase } from '../lib/supabase';

const ArticlesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .order('published_at', { ascending: false });
      if (data && data.length > 0) {
        setArticles(data);
      } else {
        // Set mock data if no articles exist
        setArticles(getMockArticles());
      }
    } catch (e) {
      // Table might not exist, use mock data
      setArticles(getMockArticles());
    }
    setLoading(false);
  };

  const getMockArticles = (): Article[] => [
    {
      id: '1',
      title_he: 'ניתוח השיר "רכבת לאחרת"',
      title_en: 'Analysis of "Train on Fire"',
      title_ru: 'Анализ песни "Поезд в огне"',
      content_he: `השיר "רכבת לאחרת" הוא אחד מהשירים המפורסמים ביותר של בוריס גרבנשצ'יקוב ולהקת אקוואריום.

השיר נכתב בתקופה של שינויים דרמטיים בברית המועצות, והוא משקף את תחושת הסכנה והתקווה של אותם ימים.

הפזמון החוזר "והרכבת באש" מסמל את החברה הבוערת, אך הבטחת הדובר "נחיה, אני מבטיח לך" מביעה תקווה ונחישות.

המוזיקה משלבת רוק עם אלמנטים של מוזיקה מסורתית רוסית, מה שהופך אותו ליצירה ייחודית.`,
      content_en: `The song "Train on Fire" is one of Boris Grebenshchikov and Aquarium's most famous songs.

Written during a period of dramatic changes in the Soviet Union, it reflects the sense of danger and hope of those times.

The recurring refrain "And the train is on fire" symbolizes a society in flames, but the speaker's promise "We will live, I promise you" expresses hope and determination.

The music combines rock with elements of traditional Russian music, making it a unique work.`,
      content_ru: `Песня "Поезд в огне" — одна из самых известных песен Бориса Гребенщикова и группы "Аквариум".

Написанная в период драматических перемен в Советском Союзе, она отражает чувство опасности и надежды того времени.

Повторяющийся припев "А поезд в огне" символизирует горящее общество, но обещание лирического героя "мы будем жить, я обещаю тебе" выражает надежду и решимость.

Музыка сочетает рок с элементами традиционной русской музыки, что делает её уникальным произведением.`,
      published_at: '2024-01-15',
    },
  ];

  const getLocalizedContent = (article: Article) => {
    const title = language === 'he' ? article.title_he :
                   language === 'en' ? (article.title_en || article.title_he) :
                   (article.title_ru || article.title_he);
    const content = language === 'he' ? article.content_he :
                    language === 'en' ? (article.content_en || article.content_he) :
                    (article.content_ru || article.content_he);
    return { title, content };
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'he' ? 'he-IL' : language === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold flex items-center gap-4">
            <BookOpen className="w-10 h-10 text-gold-400" />
            {t('articles')}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4 w-3/4" />
                  <div className="h-4 bg-gray-100 rounded mb-2" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : selectedArticle ? (
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => setSelectedArticle(null)}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-800 mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                {language === 'he' ? 'חזרה לרשימה' : 'Back to list'}
              </button>

              <article className="card">
                <h2 className="text-3xl font-bold text-primary-800 mb-4">
                  {getLocalizedContent(selectedArticle).title}
                </h2>

                <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(selectedArticle.published_at)}</span>
                </div>

                {selectedArticle.image_url && (
                  <div className="aspect-video rounded-lg overflow-hidden mb-6 bg-gray-100">
                    <img
                      src={selectedArticle.image_url}
                      alt={getLocalizedContent(selectedArticle).title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="prose prose-lg max-w-none text-right">
                  {getLocalizedContent(selectedArticle).content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => {
                const { title, content } = getLocalizedContent(article);
                return (
                  <article
                    key={article.id}
                    className="card group cursor-pointer"
                    onClick={() => setSelectedArticle(article)}
                  >
                    {article.image_url && (
                      <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gray-100">
                        <img
                          src={article.image_url}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(article.published_at)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-primary-800 mb-3 group-hover:text-accent-600 transition-colors">
                      {title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3">
                      {content.substring(0, 150)}...
                    </p>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 text-xl">{t('noArticlesYet')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ArticlesPage;
