import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Globe, Search } from 'lucide-react';
import { availableIcons, getIconByName } from './IconPicker';
import { type CategoryData } from './CategoryDialog';

const colorOptions = [
  '#1877F2', '#1DA1F2', '#E4405F', '#FF0000', '#E50914',
  '#1DB954', '#9146FF', '#14BF96', '#0056D2', '#4285F4',
  '#F24E1E', '#FF4500', '#BB1919', '#CC0000', '#0A66C2',
  '#5865F2', '#181717', '#4A154B', '#0079BF', '#1b2838',
  '#00A859', '#F97316', '#8B5CF6', '#EC4899',
];

export interface LinkData {
  id: string;
  title: string;
  url: string;
  description: string;
  color: string;
  category: string;
  iconName: string;
}

interface LinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (link: LinkData) => void;
  editingLink: LinkData | null;
  categories: CategoryData[];
}

export default function LinkDialog({ open, onOpenChange, onSave, editingLink, categories }: LinkDialogProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#1877F2');
  const [category, setCategory] = useState('');
  const [iconName, setIconName] = useState('Globe');
  const [iconSearch, setIconSearch] = useState('');

  useEffect(() => {
    if (editingLink) {
      setTitle(editingLink.title);
      setUrl(editingLink.url);
      setDescription(editingLink.description);
      setColor(editingLink.color);
      setCategory(editingLink.category);
      setIconName(editingLink.iconName || 'Globe');
    } else {
      setTitle('');
      setUrl('');
      setDescription('');
      setColor('#1877F2');
      setCategory(categories[0]?.id || '');
      setIconName('Globe');
    }
    setIconSearch('');
  }, [editingLink, open, categories]);

  const handleSave = () => {
    if (!title.trim() || !url.trim()) return;
    let finalUrl = url.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }
    onSave({
      id: editingLink?.id || crypto.randomUUID(),
      title: title.trim(),
      url: finalUrl,
      description: description.trim(),
      color,
      category,
      iconName,
    });
    onOpenChange(false);
  };

  const filteredIcons = iconSearch.trim()
    ? availableIcons.filter(i => i.name.toLowerCase().includes(iconSearch.toLowerCase()))
    : availableIcons;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            {editingLink ? 'Edit Link' : 'Tambah Link Baru'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label className="text-slate-300 text-xs mb-1.5 block">Nama Website</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Google"
              className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          <div>
            <Label className="text-slate-300 text-xs mb-1.5 block">URL / Link</Label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Contoh: google.com"
              className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          <div>
            <Label className="text-slate-300 text-xs mb-1.5 block">Deskripsi</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi singkat..."
              className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          {/* Icon Picker */}
          <div>
            <Label className="text-slate-300 text-xs mb-1.5 block">Pilih Icon</Label>
            <div className="flex items-center gap-3 mb-2">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${color}20`, color }}
              >
                {getIconByName(iconName)}
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  value={iconSearch}
                  onChange={(e) => setIconSearch(e.target.value)}
                  placeholder="Cari icon..."
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 pl-9 text-sm"
                />
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto rounded-lg border border-slate-700 bg-slate-800/50 p-2">
              <div className="grid grid-cols-8 gap-1">
                {filteredIcons.map(({ name, icon: Icon }) => (
                  <button
                    key={name}
                    onClick={() => setIconName(name)}
                    className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${
                      iconName === name
                        ? 'bg-blue-500 text-white ring-2 ring-blue-400'
                        : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                    title={name}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
              {filteredIcons.length === 0 && (
                <p className="text-xs text-slate-500 text-center py-4">Tidak ada icon yang cocok</p>
              )}
            </div>
          </div>

          {/* Kategori - dinamis */}
          <div>
            <Label className="text-slate-300 text-xs mb-1.5 block">Kategori</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    category === cat.id
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  <span className="w-3.5 h-3.5 flex items-center justify-center">
                    {getIconByName(cat.iconName)}
                  </span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-slate-300 text-xs mb-1.5 block">Warna Icon</Label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full transition-all border-2 ${
                    color === c ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Batal
          </Button>
          <Button
            onClick={handleSave}
            disabled={!title.trim() || !url.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {editingLink ? 'Simpan Perubahan' : 'Tambah Link'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
