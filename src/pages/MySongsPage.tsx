import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Music, Play, Youtube, ExternalLink, Link as LinkIcon } from 'lucide-react';
import type { MySong, SongLink } from '../types';
import { supabase } from '../lib/supabase';

const MySongsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [songs, setSongs] = useState<MySong[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('my_songs')
        .select('*')
        .order('created_at', { ascending: false });
      if (data && data.length > 0) {
        setSongs(data);
      } else {
        setSongs([]);
      }
    } catch (e) {
      setSongs([]);
    }
    setLoading(false);
  };

  const getYouTubeId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const getLinkIcon = (platform: SongLink['platform']) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'spotify':
        return <Music className="w-4 h-4" />;
      default:
        return <LinkIcon className="w-4 h-4" />;
    }
  };

  const getLinkColor = (platform: SongLink['platform']) => {
    switch (platform) {
      case 'youtube':
        return 'bg-red-50 text-red-600 hover:bg-red-100';
      case 'spotify':
        return 'bg-green-50 text-green-600 hover:bg-green-100';
      case 'soundcloud':
        return 'bg-orange-50 text-orange-600 hover:bg-orange-100';
      case 'bandcamp':
        return 'bg-blue-50 text-blue-600 hover:bg-blue-100';
      default:
        return 'bg-gray-50 text-gray-600 hover:bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-accent-700 to-accent-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold flex items-center gap-4">
            <Music className="w-10 h-10 text-gold-400" />
            {t('mySongs')}
          </h1>
          <p className="mt-2 text-accent-200">
            {language === 'he' && 'השירים והיצירות המקוריות שלי'}
            {language === 'en' && 'My original songs and compositions'}
            {language === 'ru' && 'Мои оригинальные песни и композиции'}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4" />
                  <div className="h-6 bg-gray-200 rounded mb-2 w-3/4" />
                  <div className="h-4 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          ) : songs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {songs.map((song) => (
                <div key={song.id} className="card group">
                  {/* Image or Video */}
                  {song.video_url ? (
                    <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gray-900">
                      {getYouTubeId(song.video_url) ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${getYouTubeId(song.video_url)}`}
                          title={song.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      ) : (
                        <a
                          href={song.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition-colors"
                        >
                          <Play className="w-16 h-16 text-white" />
                        </a>
                      )}
                    </div>
                  ) : song.image_url ? (
                    <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gray-100">
                      <img
                        src={song.image_url}
                        alt={song.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                      <Music className="w-16 h-16 text-primary-400" />
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-primary-800 mb-2">{song.title}</h3>

                  {/* Description */}
                  {song.description && (
                    <p className="text-gray-600 text-sm mb-4">{song.description}</p>
                  )}

                  {/* Links */}
                  {song.links && song.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {song.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${getLinkColor(link.platform)}`}
                        >
                          {getLinkIcon(link.platform)}
                          {link.title}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Audio Link (legacy) */}
                  {song.audio_url && !song.video_url && (!song.links || song.links.length === 0) && (
                    <a
                      href={song.audio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 text-sm font-medium mt-2"
                    >
                      <Play className="w-4 h-4" />
                      {language === 'he' && 'האזן'}
                      {language === 'en' && 'Listen'}
                      {language === 'ru' && 'Слушать'}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Music className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 text-xl">{t('noSongsYet')}</p>
              <p className="text-gray-300 mt-2">
                {language === 'he' && 'השירים שלי יתווספו בקרוב'}
                {language === 'en' && 'My songs will be added soon'}
                {language === 'ru' && 'Мои песни скоро будут добавлены'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MySongsPage;
