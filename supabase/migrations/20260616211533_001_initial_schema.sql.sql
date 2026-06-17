-- Aquarium Songs Table
CREATE TABLE aquarium_songs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_he TEXT NOT NULL,
  title_original TEXT NOT NULL,
  title_en TEXT,
  original_text TEXT NOT NULL,
  translation_he TEXT NOT NULL,
  translation_en TEXT,
  artist TEXT DEFAULT 'בוריס גרבנשצ''יקוב / אקוואריום',
  year INTEGER,
  album TEXT,
  youtube_url TEXT,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Song Reviews Table
CREATE TABLE song_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  song_id UUID REFERENCES aquarium_songs(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Articles Table
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_he TEXT NOT NULL,
  title_en TEXT,
  title_ru TEXT,
  content_he TEXT NOT NULL,
  content_en TEXT,
  content_ru TEXT,
  song_id UUID REFERENCES aquarium_songs(id) ON DELETE SET NULL,
  image_url TEXT,
  published_at DATE DEFAULT CURRENT_DATE
);

-- My Songs Table (for Reuven's original compositions)
CREATE TABLE my_songs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  audio_url TEXT,
  video_url TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE aquarium_songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE song_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE my_songs ENABLE ROW LEVEL SECURITY;

-- Policies for aquarium_songs (public read, authenticated write)
CREATE POLICY "select_aquarium_songs" ON aquarium_songs FOR SELECT
  TO authenticated, anon USING (true);

CREATE POLICY "insert_aquarium_songs" ON aquarium_songs FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_aquarium_songs" ON aquarium_songs FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- Policies for song_reviews (public read, authenticated write)
CREATE POLICY "select_song_reviews" ON song_reviews FOR SELECT
  TO authenticated, anon USING (true);

CREATE POLICY "insert_song_reviews" ON song_reviews FOR INSERT
  TO authenticated WITH CHECK (true);

-- Policies for articles (public read, authenticated write)
CREATE POLICY "select_articles" ON articles FOR SELECT
  TO authenticated, anon USING (true);

CREATE POLICY "insert_articles" ON articles FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_articles" ON articles FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_articles" ON articles FOR DELETE
  TO authenticated USING (true);

-- Policies for my_songs (public read, authenticated write)
CREATE POLICY "select_my_songs" ON my_songs FOR SELECT
  TO authenticated, anon USING (true);

CREATE POLICY "insert_my_songs" ON my_songs FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_my_songs" ON my_songs FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_my_songs" ON my_songs FOR DELETE
  TO authenticated USING (true);

-- Create indexes for better query performance
CREATE INDEX idx_song_reviews_song_id ON song_reviews(song_id);
CREATE INDEX idx_articles_song_id ON articles(song_id);
CREATE INDEX idx_aquarium_songs_created_at ON aquarium_songs(created_at DESC);
CREATE INDEX idx_song_reviews_created_at ON song_reviews(created_at DESC);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);