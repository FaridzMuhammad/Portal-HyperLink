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
import { Shield, Lock } from 'lucide-react';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: () => void;
  adminPassword: string;
}

export default function LoginDialog({ open, onOpenChange, onLogin, adminPassword }: LoginDialogProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === adminPassword) {
      setError('');
      setPassword('');
      onLogin();
      onOpenChange(false);
    } else {
      setError('Password salah!');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            Login Admin
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <p className="text-sm text-slate-400">
            Masukkan password admin untuk mengelola link portal.
          </p>
          <div>
            <Label className="text-slate-300 text-xs mb-1.5 block">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                onKeyDown={handleKeyDown}
                placeholder="Masukkan password..."
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-amber-500 pl-10"
              />
            </div>
            {error && (
              <p className="text-red-400 text-xs mt-1.5">{error}</p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => { onOpenChange(false); setPassword(''); setError(''); }}
            className="bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Batal
          </Button>
          <Button
            onClick={handleLogin}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
          >
            Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
