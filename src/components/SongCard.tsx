import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Heart, MessageSquare, Play, ExternalLink } from 'lucide-react';
import type { Song, Review } from '../types';
import { supabase } from '../lib/supabase';

interface SongCardProps {
  song: Song;
  onShowDetails?: (song: Song) => void;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const { t, language } = useLanguage();
  const [likes, setLikes] = useState(song.likes_count || 0);
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ author: '', content: '' });
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    fetchReviews();
    checkIfLiked();
  }, [song.id]);

  const fetchReviews = async () => {
    try {
      const { data } = await supabase
        .from('song_reviews')
        .select('*')
        .eq('song_id', song.id)
        .order('created_at', { ascending: false });
      if (data) setReviews(data);
    } catch (e) {
      setReviews([]);
    }
  };

  const checkIfLiked = () => {
    const likedSongs = JSON.parse(localStorage.getItem('liked_songs') || '[]');
    setHasLiked(likedSongs.includes(song.id));
  };

  const handleLike = async () => {
    const likedSongs = JSON.parse(localStorage.getItem('liked_songs') || '[]');

    if (hasLiked) {
      setLikes((prev) => Math.max(0, prev - 1));
      const index = likedSongs.indexOf(song.id);
      if (index > -1) likedSongs.splice(index, 1);
    } else {
      setLikes((prev) => prev + 1);
      likedSongs.push(song.id);
    }

    localStorage.setItem('liked_songs', JSON.stringify(likedSongs));
    setHasLiked(!hasLiked);

    try {
      await supabase
        .from('aquarium_songs')
        .update({ likes_count: hasLiked ? likes - 1 : likes + 1 })
        .eq('id', song.id);
    } catch (e) {
      // Table might not exist yet
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author.trim() || !newReview.content.trim()) return;

    try {
      const { data } = await supabase
        .from('song_reviews')
        .insert({
          song_id: song.id,
          author_name: newReview.author,
          content: newReview.content,
        })
        .select()
        .single();

      if (data) {
        setReviews([data, ...reviews]);
        setNewReview({ author: '', content: '' });
      }
    } catch (e) {
      const tempReview: Review = {
        id: `temp-${Date.now()}`,
        song_id: song.id,
        author_name: newReview.author,
        content: newReview.content,
        created_at: new Date().toISOString(),
      };
      setReviews([tempReview, ...reviews]);
      setNewReview({ author: '', content: '' });
    }
  };

  const getLocalizedTitle = () => {
    if (language === 'he') return song.title_he;
    if (language === 'en' && song.title_en) return song.title_en;
    return song.title_original;
  };

  return (
    <div className="card bg-white">
      {/* Song Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-primary-800 mb-1">{getLocalizedTitle()}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {song.year && <span>{song.year}</span>}
          {song.album && <span>• {song.album}</span>}
        </div>
      </div>

      {/* Side-by-Side Text Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Original Text Column */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {t('originalText')}
            </span>
            <span className="text-xs text-gray-400">Русский</span>
          </div>
          <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-sans text-sm" dir="ltr">
            {song.original_text}
          </pre>
        </div>

        {/* Hebrew Translation Column */}
        <div className="bg-gold-50 rounded-lg p-4 border-2 border-gold-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gold-700 uppercase tracking-wide">
              {t('hebrewTranslation')}
            </span>
            <span className="text-xs text-gold-500">עברית</span>
          </div>
          <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-sans text-sm" dir="rtl">
            {song.translation_he}
          </pre>
        </div>
      </div>

      {/* YouTube Link */}
      {song.youtube_url && (
        <div className="mb-4">
          <a
            href={song.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-3 px-4 rounded-lg transition-colors"
          >
            <Play className="w-5 h-5 fill-current" />
            {t('listenOnYoutube')}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        {/* Like Button */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            hasLiked
              ? 'bg-accent-100 text-accent-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Heart className={`w-5 h-5 ${hasLiked ? 'fill-accent-500' : ''}`} />
          <span className="font-medium">{likes}</span>
        </button>

        {/* Reviews Toggle */}
        <button
          onClick={() => setShowReviews(!showReviews)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          <span>{t('reviews')} ({reviews.length})</span>
        </button>
      </div>

      {/* Reviews Section */}
      {showReviews && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
          {reviews.length > 0 ? (
            <div className="space-y-3">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-primary-700">{review.author_name}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(review.created_at).toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US')}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">{review.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 text-sm py-4">
              {t('noSongsYet')}
            </p>
          )}

          <form onSubmit={handleSubmitReview} className="space-y-3">
            <input
              type="text"
              value={newReview.author}
              onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
              placeholder={t('yourName')}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 text-right"
            />
            <textarea
              value={newReview.content}
              onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
              placeholder={t('yourReview')}
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 text-right resize-none"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowReviews(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {t('cancel')}
              </button>
              <button type="submit" className="btn-primary text-sm">
                {t('submit')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SongCard;
