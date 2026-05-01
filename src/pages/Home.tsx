import { useState, useEffect } from 'react';
import {
  Search, Globe, Plus, LogIn, LogOut, Shield, Settings, Tags
} from 'lucide-react';
import LinkCard from '@/components/LinkCard';
import LinkDialog, { type LinkData } from '@/components/LinkDialog';
import LoginDialog from '@/components/LoginDialog';
import SettingsDialog from '@/components/SettingsDialog';
import CategoryDialog, { type CategoryData } from '@/components/CategoryDialog';
import { getIconByName } from '@/components/IconPicker';

const initialCategories: CategoryData[] = [
  { id: 'sosial', label: 'Sosial Media', iconName: 'MessageCircle' },
  { id: 'hiburan', label: 'Hiburan', iconName: 'Video' },
  { id: 'belajar', label: 'Belajar', iconName: 'BookOpen' },
  { id: 'kerja', label: 'Produktivitas', iconName: 'Briefcase' },
  { id: 'berita', label: 'Berita', iconName: 'Newspaper' },
  { id: 'jaringan', label: 'Jaringan', iconName: 'Router' },
];

const initialLinks: LinkData[] = [
  { id: '1', title: 'Facebook', url: 'https://facebook.com', description: 'Jaringan sosial terbesar untuk terhubung dengan teman dan keluarga', color: '#1877F2', category: 'sosial', iconName: 'Heart' },
  { id: '2', title: 'Twitter/X', url: 'https://twitter.com', description: 'Platform microblogging untuk berbagi pemikiran dan berita terkini', color: '#1DA1F2', category: 'sosial', iconName: 'MessageCircle' },
  { id: '3', title: 'Instagram', url: 'https://instagram.com', description: 'Platform berbagi foto dan video dengan filter yang menarik', color: '#E4405F', category: 'sosial', iconName: 'Camera' },
  { id: '4', title: 'LinkedIn', url: 'https://linkedin.com', description: 'Jaringan profesional untuk karier dan networking bisnis', color: '#0A66C2', category: 'sosial', iconName: 'Briefcase' },
  { id: '5', title: 'TikTok', url: 'https://tiktok.com', description: 'Platform video pendek yang viral dan kreatif', color: '#000000', category: 'sosial', iconName: 'Music' },
  { id: '6', title: 'Discord', url: 'https://discord.com', description: 'Platform komunikasi untuk komunitas dan gaming', color: '#5865F2', category: 'sosial', iconName: 'MessageCircle' },
  { id: '7', title: 'YouTube', url: 'https://youtube.com', description: 'Platform video terbesar dengan konten dari seluruh dunia', color: '#FF0000', category: 'hiburan', iconName: 'Video' },
  { id: '8', title: 'Netflix', url: 'https://netflix.com', description: 'Layanan streaming film dan serial TV original', color: '#E50914', category: 'hiburan', iconName: 'Video' },
  { id: '9', title: 'Spotify', url: 'https://spotify.com', description: 'Platform musik streaming dengan jutaan lagu', color: '#1DB954', category: 'hiburan', iconName: 'Music' },
  { id: '10', title: 'Steam', url: 'https://store.steampowered.com', description: 'Platform distribusi game PC terbesar', color: '#1b2838', category: 'hiburan', iconName: 'Gamepad2' },
  { id: '11', title: 'Twitch', url: 'https://twitch.tv', description: 'Platform live streaming gaming dan esports', color: '#9146FF', category: 'hiburan', iconName: 'Video' },
  { id: '12', title: 'Khan Academy', url: 'https://khanacademy.org', description: 'Platform belajar gratis untuk semua jenjang', color: '#14BF96', category: 'belajar', iconName: 'BookOpen' },
  { id: '13', title: 'Coursera', url: 'https://coursera.org', description: 'Kursus online dari universitas top dunia', color: '#0056D2', category: 'belajar', iconName: 'GraduationCap' },
  { id: '14', title: 'Wikipedia', url: 'https://wikipedia.org', description: 'Ensiklopedia gratis yang dapat diedit siapa saja', color: '#3366CC', category: 'belajar', iconName: 'BookOpen' },
  { id: '15', title: 'GitHub', url: 'https://github.com', description: 'Platform kolaborasi pengembangan perangkat lunak', color: '#181717', category: 'belajar', iconName: 'Code' },
  { id: '16', title: 'Google Drive', url: 'https://drive.google.com', description: 'Penyimpanan cloud dan berbagi file', color: '#4285F4', category: 'kerja', iconName: 'Cloud' },
  { id: '17', title: 'Notion', url: 'https://notion.so', description: 'Workspace all-in-one untuk catatan dan proyek', color: '#000000', category: 'kerja', iconName: 'PenTool' },
  { id: '18', title: 'Trello', url: 'https://trello.com', description: 'Tools manajemen proyek dengan papan kanban', color: '#0079BF', category: 'kerja', iconName: 'LayoutTemplate' },
  { id: '19', title: 'Figma', url: 'https://figma.com', description: 'Tools desain UI/UX kolaboratif berbasis web', color: '#F24E1E', category: 'kerja', iconName: 'PenTool' },
  { id: '20', title: 'Slack', url: 'https://slack.com', description: 'Platform komunikasi tim untuk kolaborasi', color: '#4A154B', category: 'kerja', iconName: 'MessageCircle' },
  { id: '21', title: 'BBC News', url: 'https://bbc.com/news', description: 'Berita internasional terkini dan terpercaya', color: '#BB1919', category: 'berita', iconName: 'Newspaper' },
  { id: '22', title: 'CNN', url: 'https://cnn.com', description: 'Jaringan berita kabel terbesar di dunia', color: '#CC0000', category: 'berita', iconName: 'Newspaper' },
  { id: '23', title: 'Google News', url: 'https://news.google.com', description: 'Agregator berita dari berbagai sumber', color: '#4285F4', category: 'berita', iconName: 'Newspaper' },
  { id: '24', title: 'Reddit', url: 'https://reddit.com', description: 'Komunitas diskusi dengan berbagai topik', color: '#FF4500', category: 'berita', iconName: 'MessageCircle' },
  { id: '25', title: 'Cisco', url: 'https://cisco.com', description: 'Solusi jaringan enterprise dan perangkat keras jaringan', color: '#049fd9', category: 'jaringan', iconName: 'Router' },
  { id: '26', title: 'Wireshark', url: 'https://wireshark.org', description: 'Tools analisis protokol jaringan open source', color: '#1679A7', category: 'jaringan', iconName: 'Activity' },
  { id: '27', title: 'Speedtest', url: 'https://speedtest.net', description: 'Tes kecepatan internet broadband', color: '#1CAAD9', category: 'jaringan', iconName: 'Gauge' },
  { id: '28', title: 'Juniper', url: 'https://juniper.net', description: 'Perangkat lunak dan jaringan enterprise', color: '#84B135', category: 'jaringan', iconName: 'Server' },
  { id: '29', title: 'ARIN', url: 'https://arin.net', description: 'Registry alamat IP Amerika Utara', color: '#003366', category: 'jaringan', iconName: 'Database' },
  { id: '30', title: 'RFC Editor', url: 'https://rfceditor.org', description: 'Dokumen spesifikasi teknis protokol internet', color: '#8B5CF6', category: 'jaringan', iconName: 'FileText' },
];

const DEFAULT_PASSWORD = 'admin123';

function getSavedLinks(): LinkData[] | null {
  try {
    const saved = localStorage.getItem('portal_links');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveLinks(links: LinkData[]) {
  localStorage.setItem('portal_links', JSON.stringify(links));
}

function getSavedCategories(): CategoryData[] | null {
  try {
    const saved = localStorage.getItem('portal_categories');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveCategories(categories: CategoryData[]) {
  localStorage.setItem('portal_categories', JSON.stringify(categories));
}

function getSavedPassword(): string {
  try {
    const saved = localStorage.getItem('portal_password');
    return saved ? atob(saved) : DEFAULT_PASSWORD;
  } catch {
    return DEFAULT_PASSWORD;
  }
}

function savePassword(password: string) {
  localStorage.setItem('portal_password', btoa(password));
}

export default function Home() {
  const [links, setLinks] = useState<LinkData[]>(() => getSavedLinks() || initialLinks);
  const [categories, setCategories] = useState<CategoryData[]>(() => getSavedCategories() || initialCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkData | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('portal_admin') === 'true');
  const [adminPassword, setAdminPassword] = useState(() => getSavedPassword());

  useEffect(() => {
    saveLinks(links);
  }, [links]);

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  const filteredLinks = links.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         link.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || link.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const linkCountByCategory: Record<string, number> = {};
  links.forEach(link => {
    linkCountByCategory[link.category] = (linkCountByCategory[link.category] || 0) + 1;
  });

  const handleAdd = () => {
    setEditingLink(null);
    setDialogOpen(true);
  };

  const handleEdit = (link: LinkData) => {
    setEditingLink(link);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setLinks(prev => prev.filter(l => l.id !== id));
  };

  const handleSave = (link: LinkData) => {
    if (editingLink) {
      setLinks(prev => prev.map(l => l.id === link.id ? link : l));
    } else {
      setLinks(prev => [...prev, link]);
    }
  };

  const handleLogin = () => {
    localStorage.setItem('portal_admin', 'true');
    setIsAdmin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('portal_admin');
    setIsAdmin(false);
  };

  const handleReset = () => {
    if (confirm('Reset semua data ke default?')) {
      setLinks(initialLinks);
      setCategories(initialCategories);
    }
  };

  const handlePasswordChange = (newPassword: string) => {
    setAdminPassword(newPassword);
    savePassword(newPassword);
  };

  const handleSaveCategories = (newCategories: CategoryData[]) => {
    setCategories(newCategories);
    // Jika kategori aktif tidak ada lagi di daftar baru, reset ke 'all'
    if (activeCategory !== 'all' && !newCategories.some(c => c.id === activeCategory)) {
      setActiveCategory('all');
    }
  };

  // Build list kategori untuk tampilan (all + dynamic categories)
  const displayCategories = [
    { id: 'all', label: 'Semua', iconName: 'Globe' },
    ...categories,
  ];

  return (
    <div className="portal-container min-h-screen">
      {/* Header */}
      <header className="pt-12 pb-8 px-4 text-center">
        <div className="animate-float mb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Globe className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Portal Link
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Akses cepat ke website favorit Anda dalam satu portal
        </p>
        
        {/* Admin Badge */}
        {isAdmin && (
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-medium text-amber-400">Mode Admin</span>
          </div>
        )}
      </header>

      {/* Search & Actions */}
      <div className="max-w-2xl mx-auto px-4 mb-8">
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari website..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
              style={{ color: '#ffffff' }}
            />
          </div>
          
          {isAdmin ? (
            <>
              <button
                onClick={handleAdd}
                className="px-4 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Tambah</span>
              </button>
              <button
                onClick={() => setSettingsOpen(true)}
                className="px-4 py-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 font-medium flex items-center gap-2 transition-all"
                title="Pengaturan"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium flex items-center gap-2 transition-all whitespace-nowrap"
                title="Logout Admin"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setLoginOpen(true)}
              className="px-4 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 font-medium flex items-center gap-2 transition-all whitespace-nowrap"
              title="Login Admin"
            >
              <LogIn className="w-5 h-5" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          )}
        </div>
        
        {/* Reset to default - admin only */}
        {isAdmin && (
          <div className="flex justify-end mt-2">
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-red-400 transition-colors"
            >
              Reset ke default
            </button>
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2 px-4 mb-2">
        {displayCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`category-badge flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span className="w-4 h-4 flex items-center justify-center">
              {getIconByName(cat.iconName)}
            </span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Manage Categories - admin only */}
      {isAdmin && (
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setCategoryDialogOpen(true)}
            className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20 transition-all"
          >
            <Tags className="w-3.5 h-3.5" />
            Kelola Kategori
          </button>
        </div>
      )}

      {/* Links Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredLinks.map((link, index) => (
            <div
              key={link.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <LinkCard
                link={link}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isAdmin={isAdmin}
              />
            </div>
          ))}
        </div>

        {filteredLinks.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">
              Tidak ada hasil yang cocok
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-slate-500 text-sm">
        <p>Portal Link - Akses cepat ke dunia digital</p>
        {!isAdmin && (
          <p className="mt-1 text-xs text-slate-600">
            Login sebagai admin untuk mengelola link
          </p>
        )}
      </footer>

      {/* Dialogs */}
      <LinkDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
        editingLink={editingLink}
        categories={categories}
      />
      
      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onLogin={handleLogin}
        adminPassword={adminPassword}
      />

      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        currentPassword={adminPassword}
        onPasswordChange={handlePasswordChange}
      />

      <CategoryDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        categories={categories}
        onSave={handleSaveCategories}
        linkCountByCategory={linkCountByCategory}
      />
    </div>
  );
}
