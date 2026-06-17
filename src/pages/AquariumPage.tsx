import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Music, Image, Youtube, Coffee, CreditCard, Facebook, Instagram, ExternalLink } from 'lucide-react';
import SongCard from '../components/SongCard';
import type { Song } from '../types';
import { supabase } from '../lib/supabase';

const AquariumPage: React.FC = () => {
  const { t } = useLanguage();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  // Configure your links here
  const links = {
    youtubeChannel: 'https://www.youtube.com/@YOUR_CHANNEL',
    spotify: 'https://open.spotify.com/artist/3EebnhLFTVjtVA1Qbgq1yM',
    kofi: 'https://ko-fi.com/YOUR_KOFI',
    paypal: 'https://paypal.me/YOUR_PAYPAL',
    facebook: 'https://facebook.com/YOUR_FACEBOOK',
    instagram: 'https://instagram.com/YOUR_INSTAGRAM',
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('aquarium_songs')
        .select('*')
        .order('created_at', { ascending: false });
      if (data && data.length > 0) {
        setSongs(data);
      } else {
        setSongs(getMockSongs());
      }
    } catch (e) {
      setSongs(getMockSongs());
    }
    setLoading(false);
  };

  const getMockSongs = (): Song[] => [
    {
      id: '1',
      title_he: 'רכבת לאחרת',
      title_original: 'Поезд в огне',
      title_en: 'Train on Fire',
      original_text: `На другом берегу небо выгнулось аркой
И полковник Кадыров уверенно жмёт на курок
Но я так люблю этот город за то, что в нём окна
Не глядят на тебя, если ты не глядишь на них в упор
А поезд в огне, и нам нечего больше терять
Нам будет чему горреть, но мы будем жить, я обещаю тебе
А поезд в огне...`,
      translation_he: `בגדה השנייה השמיים התקמרו כקשת
והקולונל קדירוב לוחץ בביטחון על ההדק
אבל אני כל כך אוהב את העיר הזו כי בה החלונות
לא מביטים אליך, אם אתה לא מביט אליהם במבט ישיר
והרכבת באש, ואין לנו מה להפסיד יותר
יהיה לנו מה לשרוף, אבל נחיה, אני מבטיח לך
והרכבת באש...`,
      artist: "אקוואריום / בוריס גרבנשצ'יקוב",
      year: 1989,
      album: 'רכבת לאחרת',
      likes_count: 42,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      title_he: 'עיר הזהב',
      title_original: 'Город золотой',
      title_en: 'City of Gold',
      original_text: `Под небом голубым есть город золотой
С прозрачными воротами и яркою звездой
А в городе том сад, всё травы да цветы
Гуляют там животные невиданной красы
Одно как жёлтый огнегривый лев
Другое, что конь, полных сил
Их золотые, как рыба, гривы
И их нельзя ничем, их нельзя ничем`,
      translation_he: `תחת שמיים כחולים יש עיר של זהב
עם שערים שקופים וכוכב בוהק
ובעיר ההיא גן, כולו עשבים ופרחים
משוטטים שם חיות של יופי שלא נראה כמותו
אחת כאריה צהוב בעל רעמת אש
אחרת, כסוס, מלא כוח
רעמותיהם הזהובות, כמו דג
ואותם לא ניתן בשום דבר`,
      artist: "אקוואריום / בוריס גרבנשצ'יקוב",
      year: 1987,
      album: 'עשר שנים אחרי',
      likes_count: 89,
      created_at: new Date().toISOString(),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Title and Subtitle */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{t('aquariumTitle')}</h1>
            <p className="text-lg text-primary-200">{t('aquariumSubtitle')}</p>
          </div>

          {/* Two Photos with Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Boris Photo with Spotify Button */}
            <div className="flex flex-col items-center">
              <div className="bg-white/10 rounded-xl p-4 flex flex-col items-center justify-center aspect-square w-full max-w-[250px] mb-4">
                <Image className="w-20 h-20 text-primary-300 mb-2" />
                <p className="text-primary-200 text-sm text-center">בוריס גרבנשצ'יקוב</p>
                <p className="text-primary-400 text-xs mt-1">public/images/bg-photo.jpg</p>
              </div>
              <a
                href={links.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 px-6 py-3 rounded-lg transition-colors font-medium"
              >
                <Music className="w-5 h-5" />
                {t('borisSpotify')}
              </a>
            </div>

            {/* Reuven Photo with YouTube Button */}
            <div className="flex flex-col items-center">
              <div className="bg-white/10 rounded-xl p-4 flex flex-col items-center justify-center aspect-square w-full max-w-[250px] mb-4">
                <Image className="w-20 h-20 text-primary-300 mb-2" />
                <p className="text-primary-200 text-sm text-center">ראובן רז</p>
                <p className="text-primary-400 text-xs mt-1">public/images/my-logo.png</p>
              </div>
              <a
                href={links.youtubeChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 px-6 py-3 rounded-lg transition-colors font-medium"
              >
                <Youtube className="w-5 h-5" />
                {t('myYoutubeChannel')}
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mt-8">
            <a
              href={links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600/80 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors"
            >
              <Facebook className="w-5 h-5" />
              Facebook
            </a>
            <a
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-pink-600/80 hover:bg-pink-600 px-4 py-2 rounded-lg transition-colors"
            >
              <Instagram className="w-5 h-5" />
              Instagram
            </a>
          </div>

          {/* Support Buttons */}
          <div className="text-center mt-8 pt-8 border-t border-white/20">
            <p className="text-primary-200 mb-3 text-sm">{t('supportMyWork')}</p>
            <div className="flex justify-center gap-4">
              <a
                href={links.kofi}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 px-5 py-2 rounded-lg transition-colors font-medium"
              >
                <Coffee className="w-5 h-5" />
                {t('koFi')}
              </a>
              <a
                href={links.paypal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg transition-colors font-medium"
              >
                <CreditCard className="w-5 h-5" />
                {t('paypal')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Songs Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-8">{t('aquarium')}</h2>

          {loading ? (
            <div className="grid grid-cols-1 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4 w-1/2" />
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="h-32 bg-gray-100 rounded" />
                    <div className="h-32 bg-gray-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {songs.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Interesting Links Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-6">{t('interestingLinks')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href={links.youtubeChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors group"
            >
              <Youtube className="w-8 h-8 text-red-600" />
              <div>
                <p className="font-semibold text-gray-800 group-hover:text-red-600">YouTube</p>
                <p className="text-sm text-gray-500">{t('myYoutubeChannel')}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 mr-auto" />
            </a>

            <a
              href={links.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
            >
              <Music className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-semibold text-gray-800 group-hover:text-green-600">Spotify</p>
                <p className="text-sm text-gray-500">{t('borisSpotify')}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 mr-auto" />
            </a>

            <a
              href={links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
            >
              <Facebook className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-800 group-hover:text-blue-600">Facebook</p>
                <p className="text-sm text-gray-500">{t('followMe')}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 mr-auto" />
            </a>

            <a
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors group"
            >
              <Instagram className="w-8 h-8 text-pink-600" />
              <div>
                <p className="font-semibold text-gray-800 group-hover:text-pink-600">Instagram</p>
                <p className="text-sm text-gray-500">{t('followMe')}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 mr-auto" />
            </a>
          </div>

          {/* Support Links */}
          <div className="flex justify-center gap-6 mt-6 pt-6 border-t border-gray-100">
            <a
              href={links.kofi}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium"
            >
              <Coffee className="w-5 h-5" />
              {t('koFi')}
            </a>
            <a
              href={links.paypal}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium"
            >
              <CreditCard className="w-5 h-5" />
              {t('paypal')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AquariumPage;
