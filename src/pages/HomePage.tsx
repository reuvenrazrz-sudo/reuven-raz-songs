import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Music, ArrowLeft, BookOpen, Headphones } from 'lucide-react';
import type { Article, MySong } from '../types';
import { supabase } from '../lib/supabase';

const HomePage: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [mySongs, setMySongs] = useState<MySong[]>([]);

  // Configuration: Set to true to enable "My Songs" section
  // This will automatically show when songs exist in the array
  const SHOW_MY_SONGS_SECTION = false;

  useEffect(() => {
    fetchArticles();
    fetchMySongs();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(3);
      if (data) setArticles(data);
    } catch (e) {
      // Table might not exist yet
      setArticles([]);
    }
  };

  const fetchMySongs = async () => {
    try {
      const { data } = await supabase
        .from('my_songs')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setMySongs(data);
    } catch (e) {
      // Table might not exist yet
      setMySongs([]);
    }
  };

  const getLocalizedContent = (article: Article) => {
    const title = language === 'he' ? article.title_he :
                   language === 'en' ? (article.title_en || article.title_he) :
                   (article.title_ru || article.title_he);
    const content = language === 'he' ? article.content_he :
                    language === 'en' ? (article.content_en || article.content_he) :
                    (article.content_ru || article.content_he);
    return { title, content };
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            {/* Main Title */}
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              {t('welcomeTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-primary-200 max-w-2xl mx-auto">
              {t('welcomeSubtitle')}
            </p>

            {/* CTA Button */}
            <button
              onClick={() => navigate('/aquarium')}
              className="btn-gold text-lg px-10 py-4 inline-flex items-center gap-3 mt-8"
            >
              <Headphones className="w-6 h-6" />
              {t('aquariumCTA')}
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* My Songs Section - Conditionally Rendered */}
      {SHOW_MY_SONGS_SECTION && mySongs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="section-title flex items-center gap-3">
                <Music className="w-8 h-8 text-accent-500" />
                {t('mySongs')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mySongs.map((song) => (
                <div key={song.id} className="card group">
                  {song.image_url && (
                    <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gray-100">
                      <img
                        src={song.image_url}
                        alt={song.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-primary-800 mb-2">{song.title}</h3>
                  <p className="text-gray-600 text-sm">{song.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-gold-500" />
              {t('articles')}
            </h2>
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => {
                const { title, content } = getLocalizedContent(article);
                return (
                  <article key={article.id} className="card group cursor-pointer">
                    {article.image_url && (
                      <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gray-100">
                        <img
                          src={article.image_url}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-primary-800 mb-2 group-hover:text-accent-600 transition-colors">
                      {title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {content.substring(0, 150)}...
                    </p>
                    <span className="inline-flex items-center gap-1 mt-3 text-primary-600 text-sm font-medium group-hover:text-accent-600 transition-colors">
                      {t('readMore')}
                      <ArrowLeft className="w-4 h-4" />
                    </span>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">{t('noArticlesYet')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
