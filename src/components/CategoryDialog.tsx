import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tags, Pencil, Trash2, Plus, Search } from 'lucide-react';
import { availableIcons, getIconByName } from './IconPicker';

export interface CategoryData {
  id: string;
  label: string;
  iconName: string;
}

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: CategoryData[];
  onSave: (categories: CategoryData[]) => void;
  linkCountByCategory: Record<string, number>;
}

export default function CategoryDialog({ open, onOpenChange, categories, onSave, linkCountByCategory }: CategoryDialogProps) {
  const [items, setItems] = useState<CategoryData[]>(categories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState('');
  const [editIconName, setEditIconName] = useState('');
  const [iconSearch, setIconSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newIconName, setNewIconName] = useState('Globe');

  // Reset state saat dialog dibuka
  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      setItems(categories);
      setEditingId(null);
      setShowAddForm(false);
      setNewLabel('');
      setNewIconName('Globe');
      setIconSearch('');
    }
    onOpenChange(isOpen);
  };

  const handleSaveAll = () => {
    onSave(items);
    onOpenChange(false);
  };

  const handleDelete = (id: string) => {
    const count = linkCountByCategory[id] || 0;
    if (count > 0) {
      if (!confirm(`Kategori ini digunakan oleh ${count} link. Yakin ingin menghapus? Link-link tersebut akan tetap ada tetapi tidak terkategorikan.`)) {
        return;
      }
    }
    setItems(prev => prev.filter(c => c.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleStartEdit = (cat: CategoryData) => {
    setEditingId(cat.id);
    setEditLabel(cat.label);
    setEditIconName(cat.iconName);
    setIconSearch('');
  };

  const handleSaveEdit = () => {
    if (!editLabel.trim()) return;
    setItems(prev => prev.map(c =>
      c.id === editingId ? { ...c, label: editLabel.trim(), iconName: editIconName } : c
    ));
    setEditingId(null);
  };

  const handleAdd = () => {
    if (!newLabel.trim()) return;
    const id = newLabel.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    if (items.some(c => c.id === id)) {
      alert('ID kategori sudah ada, gunakan nama lain.');
      return;
    }
    setItems(prev => [...prev, { id, label: newLabel.trim(), iconName: newIconName }]);
    setNewLabel('');
    setNewIconName('Globe');
    setShowAddForm(false);
  };

  const filteredIcons = iconSearch.trim()
    ? availableIcons.filter(i => i.name.toLowerCase().includes(iconSearch.toLowerCase()))
    : availableIcons;

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Tags className="w-5 h-5 text-purple-400" />
            Kelola Kategori
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* List Kategori */}
          <div className="space-y-2">
            {items.map((cat) => {
              const count = linkCountByCategory[cat.id] || 0;
              const isEditing = editingId === cat.id;

              return (
                <div
                  key={cat.id}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/60 border border-slate-700"
                >
                  {isEditing ? (
                    <>
                      <div className="flex-1 space-y-2">
                        <Input
                          value={editLabel}
                          onChange={(e) => setEditLabel(e.target.value)}
                          placeholder="Nama kategori..."
                          className="bg-slate-700 border-slate-600 text-white text-sm"
                        />
                        {/* Icon picker mini untuk edit */}
                        <div className="relative">
                          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                          <Input
                            value={iconSearch}
                            onChange={(e) => setIconSearch(e.target.value)}
                            placeholder="Cari icon..."
                            className="bg-slate-700 border-slate-600 text-white text-xs pl-8"
                          />
                        </div>
                        <div className="grid grid-cols-10 gap-1 max-h-24 overflow-y-auto p-1 bg-slate-700/50 rounded-md">
                          {filteredIcons.slice(0, 40).map(({ name, icon: Icon }) => (
                            <button
                              key={name}
                              onClick={() => setEditIconName(name)}
                              className={`w-6 h-6 rounded flex items-center justify-center transition-all ${
                                editIconName === name
                                  ? 'bg-blue-500 text-white'
                                  : 'text-slate-400 hover:bg-slate-600 hover:text-white'
                              }`}
                              title={name}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={handleSaveEdit}
                        className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-xs font-medium hover:bg-blue-400"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1.5 rounded-lg bg-slate-600 text-slate-300 text-xs hover:bg-slate-500"
                      >
                        Batal
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-slate-700 text-slate-300">
                        {getIconByName(cat.iconName)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{cat.label}</p>
                        <p className="text-xs text-slate-500">{count} link</p>
                      </div>
                      <button
                        onClick={() => handleStartEdit(cat)}
                        className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-slate-600 transition-all"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-slate-600 transition-all"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tambah Kategori */}
          {showAddForm ? (
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-600 space-y-3">
              <Input
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Nama kategori baru..."
                className="bg-slate-700 border-slate-600 text-white"
              />
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  value={iconSearch}
                  onChange={(e) => setIconSearch(e.target.value)}
                  placeholder="Cari icon..."
                  className="bg-slate-700 border-slate-600 text-white text-sm pl-9"
                />
              </div>
              <div className="grid grid-cols-10 gap-1 max-h-32 overflow-y-auto p-1 bg-slate-700/50 rounded-md">
                {filteredIcons.map(({ name, icon: Icon }) => (
                  <button
                    key={name}
                    onClick={() => setNewIconName(name)}
                    className={`w-7 h-7 rounded flex items-center justify-center transition-all ${
                      newIconName === name
                        ? 'bg-blue-500 text-white ring-1 ring-blue-400'
                        : 'text-slate-400 hover:bg-slate-600 hover:text-white'
                    }`}
                    title={name}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleAdd}
                  disabled={!newLabel.trim()}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Tambah
                </Button>
                <Button
                  variant="outline"
                  onClick={() => { setShowAddForm(false); setNewLabel(''); setNewIconName('Globe'); }}
                  className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 text-sm"
                >
                  Batal
                </Button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-2.5 rounded-xl border border-dashed border-slate-600 text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Tambah Kategori Baru
            </button>
          )}
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
            onClick={handleSaveAll}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            Simpan Semua
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
