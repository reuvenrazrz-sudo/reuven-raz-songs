-- Add links column to my_songs table for storing multiple platform links
ALTER TABLE my_songs ADD COLUMN IF NOT EXISTS links JSONB DEFAULT '[]'::jsonb;

-- Example insert format for reference:
-- INSERT INTO my_songs (title, description, links) VALUES (
--   'Song Title',
--   'Description',
--   '[{"title": "Listen on YouTube", "url": "https://youtube.com/...", "platform": "youtube"}, {"title": "Listen on Spotify", "url": "https://open.spotify.com/...", "platform": "spotify"}]'
-- );