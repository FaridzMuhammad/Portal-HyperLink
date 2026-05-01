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
import { Label } from '@/components/ui/label';
import { Settings, Lock, Eye, EyeOff } from 'lucide-react';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPassword: string;
  onPasswordChange: (newPassword: string) => void;
}

export default function SettingsDialog({ open, onOpenChange, currentPassword, onPasswordChange }: SettingsDialogProps) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    setError('');
    setSuccess(false);

    if (oldPassword !== currentPassword) {
      setError('Password lama salah!');
      return;
    }

    if (!newPassword.trim() || newPassword.length < 4) {
      setError('Password baru minimal 4 karakter!');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Konfirmasi password tidak cocok!');
      return;
    }

    onPasswordChange(newPassword);
    setSuccess(true);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');

    setTimeout(() => {
      onOpenChange(false);
      setSuccess(false);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-400" />
            Pengaturan Admin
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <p className="text-sm text-slate-400">
            Ubah password admin portal.
          </p>

          {/* Password Lama */}
          <div>
            <Label className="text-slate-300 text-xs mb-1.5 block">Password Lama</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                type={showOld ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => { setOldPassword(e.target.value); setError(''); }}
                placeholder="Password saat ini..."
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Password Baru */}
          <div>
            <Label className="text-slate-300 text-xs mb-1.5 block">Password Baru</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setError(''); }}
                placeholder="Minimal 4 karakter..."
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Konfirmasi Password Baru */}
          <div>
            <Label className="text-slate-300 text-xs mb-1.5 block">Konfirmasi Password Baru</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                placeholder="Ulangi password baru..."
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 pl-10"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs">{error}</p>
          )}
          {success && (
            <p className="text-emerald-400 text-xs font-medium">Password berhasil diubah!</p>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => { onOpenChange(false); setError(''); setOldPassword(''); setNewPassword(''); setConfirmPassword(''); }}
            className="bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Batal
          </Button>
          <Button
            onClick={handleSave}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
