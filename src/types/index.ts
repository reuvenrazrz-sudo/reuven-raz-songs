export interface Song {
  id: string;
  title_he: string;
  title_original: string;
  title_en?: string;
  original_text: string;
  translation_he: string;
  translation_en?: string;
  artist: string;
  year?: number;
  youtube_url?: string;
  album?: string;
  likes_count: number;
  created_at: string;
}

export interface Review {
  id: string;
  song_id: string;
  author_name: string;
  content: string;
  created_at: string;
}

export interface Article {
  id: string;
  title_he: string;
  title_en?: string;
  title_ru?: string;
  content_he: string;
  content_en?: string;
  content_ru?: string;
  song_id?: string;
  image_url?: string;
  published_at: string;
}

export interface SongLink {
  title: string;
  url: string;
  platform: 'youtube' | 'spotify' | 'soundcloud' | 'bandcamp' | 'website' | 'other';
}

export interface MySong {
  id: string;
  title: string;
  description: string;
  audio_url?: string;
  video_url?: string;
  image_url?: string;
  links?: SongLink[];
  created_at: string;
}
