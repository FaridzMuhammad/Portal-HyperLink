-- Create database (run manually: CREATE DATABASE portal_link;)

-- Links table
CREATE TABLE IF NOT EXISTS links (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  description TEXT DEFAULT '',
  color VARCHAR(50) DEFAULT '#1877F2',
  category VARCHAR(255) DEFAULT '',
  icon_name VARCHAR(100) DEFAULT 'Globe',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(255) PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  icon_name VARCHAR(100) DEFAULT 'Globe',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  key VARCHAR(255) PRIMARY KEY,
  value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed default categories
INSERT INTO categories (id, label, icon_name) VALUES
  ('sosial', 'Sosial Media', 'MessageCircle'),
  ('hiburan', 'Hiburan', 'Video'),
  ('belajar', 'Belajar', 'BookOpen'),
  ('kerja', 'Produktivitas', 'Briefcase'),
  ('berita', 'Berita', 'Newspaper'),
  ('jaringan', 'Jaringan', 'Router')
ON CONFLICT (id) DO NOTHING;

-- Seed default links
INSERT INTO links (id, title, url, description, color, category, icon_name) VALUES
  ('1', 'Facebook', 'https://facebook.com', 'Jaringan sosial terbesar untuk terhubung dengan teman dan keluarga', '#1877F2', 'sosial', 'Heart'),
  ('2', 'Twitter/X', 'https://twitter.com', 'Platform microblogging untuk berbagi pemikiran dan berita terkini', '#1DA1F2', 'sosial', 'MessageCircle'),
  ('3', 'Instagram', 'https://instagram.com', 'Platform berbagi foto dan video dengan filter yang menarik', '#E4405F', 'sosial', 'Camera'),
  ('4', 'LinkedIn', 'https://linkedin.com', 'Jaringan profesional untuk karier dan networking bisnis', '#0A66C2', 'sosial', 'Briefcase'),
  ('5', 'TikTok', 'https://tiktok.com', 'Platform video pendek yang viral dan kreatif', '#000000', 'sosial', 'Music'),
  ('6', 'Discord', 'https://discord.com', 'Platform komunikasi untuk komunitas dan gaming', '#5865F2', 'sosial', 'MessageCircle'),
  ('7', 'YouTube', 'https://youtube.com', 'Platform video terbesar dengan konten dari seluruh dunia', '#FF0000', 'hiburan', 'Video'),
  ('8', 'Netflix', 'https://netflix.com', 'Layanan streaming film dan serial TV original', '#E50914', 'hiburan', 'Video'),
  ('9', 'Spotify', 'https://spotify.com', 'Platform musik streaming dengan jutaan lagu', '#1DB954', 'hiburan', 'Music'),
  ('10', 'Steam', 'https://store.steampowered.com', 'Platform distribusi game PC terbesar', '#1b2838', 'hiburan', 'Gamepad2'),
  ('11', 'Twitch', 'https://twitch.tv', 'Platform live streaming gaming dan esports', '#9146FF', 'hiburan', 'Video'),
  ('12', 'Khan Academy', 'https://khanacademy.org', 'Platform belajar gratis untuk semua jenjang', '#14BF96', 'belajar', 'BookOpen'),
  ('13', 'Coursera', 'https://coursera.org', 'Kursus online dari universitas top dunia', '#0056D2', 'belajar', 'GraduationCap'),
  ('14', 'Wikipedia', 'https://wikipedia.org', 'Ensiklopedia gratis yang dapat diedit siapa saja', '#3366CC', 'belajar', 'BookOpen'),
  ('15', 'GitHub', 'https://github.com', 'Platform kolaborasi pengembangan perangkat lunak', '#181717', 'belajar', 'Code'),
  ('16', 'Google Drive', 'https://drive.google.com', 'Penyimpanan cloud dan berbagi file', '#4285F4', 'kerja', 'Cloud'),
  ('17', 'Notion', 'https://notion.so', 'Workspace all-in-one untuk catatan dan proyek', '#000000', 'kerja', 'PenTool'),
  ('18', 'Trello', 'https://trello.com', 'Tools manajemen proyek dengan papan kanban', '#0079BF', 'kerja', 'LayoutTemplate'),
  ('19', 'Figma', 'https://figma.com', 'Tools desain UI/UX kolaboratif berbasis web', '#F24E1E', 'kerja', 'PenTool'),
  ('20', 'Slack', 'https://slack.com', 'Platform komunikasi tim untuk kolaborasi', '#4A154B', 'kerja', 'MessageCircle'),
  ('21', 'BBC News', 'https://bbc.com/news', 'Berita internasional terkini dan terpercaya', '#BB1919', 'berita', 'Newspaper'),
  ('22', 'CNN', 'https://cnn.com', 'Jaringan berita kabel terbesar di dunia', '#CC0000', 'berita', 'Newspaper'),
  ('23', 'Google News', 'https://news.google.com', 'Agregator berita dari berbagai sumber', '#4285F4', 'berita', 'Newspaper'),
  ('24', 'Reddit', 'https://reddit.com', 'Komunitas diskusi dengan berbagai topik', '#FF4500', 'berita', 'MessageCircle'),
  ('25', 'Cisco', 'https://cisco.com', 'Solusi jaringan enterprise dan perangkat keras jaringan', '#049fd9', 'jaringan', 'Router'),
  ('26', 'Wireshark', 'https://wireshark.org', 'Tools analisis protokol jaringan open source', '#1679A7', 'jaringan', 'Activity'),
  ('27', 'Speedtest', 'https://speedtest.net', 'Tes kecepatan internet broadband', '#1CAAD9', 'jaringan', 'Gauge'),
  ('28', 'Juniper', 'https://juniper.net', 'Perangkat lunak dan jaringan enterprise', '#84B135', 'jaringan', 'Server'),
  ('29', 'ARIN', 'https://arin.net', 'Registry alamat IP Amerika Utara', '#003366', 'jaringan', 'Database'),
  ('30', 'RFC Editor', 'https://rfceditor.org', 'Dokumen spesifikasi teknis protokol internet', '#8B5CF6', 'jaringan', 'FileText')
ON CONFLICT (id) DO NOTHING;

-- Seed default password (base64 encoded)
INSERT INTO settings (key, value) VALUES
  ('admin_password', 'YWRtaW4xMjM=')
ON CONFLICT (key) DO NOTHING;
