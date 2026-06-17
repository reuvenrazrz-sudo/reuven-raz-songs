import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Music, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Music className="w-8 h-8 text-gold-400" />
              <span className="text-xl font-bold">ראובן רז</span>
            </div>
            <p className="text-primary-300 text-sm leading-relaxed">
              {t('welcomeSubtitle')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gold-400">ניווט מהיר</h3>
            <ul className="space-y-2 text-primary-200">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  {t('home')}
                </a>
              </li>
              <li>
                <a href="/aquarium" className="hover:text-white transition-colors">
                  {t('aquarium')}
                </a>
              </li>
              <li>
                <a href="/my-songs" className="hover:text-white transition-colors">
                  {t('mySongs')}
                </a>
              </li>
              <li>
                <a href="/articles" className="hover:text-white transition-colors">
                  {t('articles')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gold-400">{t('contact')}</h3>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary-300" />
              <a
                href="mailto:contact@reuvenraz.com"
                className="text-primary-200 hover:text-white transition-colors"
              >
                contact@reuvenraz.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-primary-300 text-sm">
            © {currentYear} ראובן רז · {t('copyright')}
          </p>
          <p className="text-primary-300 text-sm flex items-center gap-1">
            {t('bsd')} · נבנה באהבה <Heart className="w-4 h-4 text-accent-500 fill-accent-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
