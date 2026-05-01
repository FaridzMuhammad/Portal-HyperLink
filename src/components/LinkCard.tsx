import type { LinkData } from './LinkDialog';
import { ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { getIconByName } from './IconPicker';

interface LinkCardProps {
  link: LinkData;
  onEdit: (link: LinkData) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}

export default function LinkCard({ link, onEdit, onDelete, isAdmin }: LinkCardProps) {
  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(link);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`Hapus "${link.title}"?`)) {
      onDelete(link.id);
    }
  };

  return (
    <div className="group relative">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Card className="card-hover glass-effect p-5 flex flex-col items-center justify-start text-center cursor-pointer relative overflow-hidden min-h-[10rem]">
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
            style={{ backgroundColor: link.color }}
          />
          <div className="relative z-10 flex flex-col items-center w-full">
            <div 
              className="icon-glow w-12 h-12 rounded-xl flex items-center justify-center mb-3 flex-shrink-0"
              style={{ 
                backgroundColor: `${link.color}20`,
                color: link.color 
              }}
            >
              {getIconByName(link.iconName || 'Globe')}
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                {link.title}
              </h3>
              <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
            </div>
            <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
              {link.description}
            </p>
          </div>
        </Card>
      </a>

      {/* Edit & Delete buttons - visible for admin */}
      {isAdmin && (
        <div className="absolute top-2 right-2 flex gap-1.5 z-20">
          <button
            onClick={handleEditClick}
            className="w-8 h-8 rounded-lg bg-blue-500/90 border border-blue-400 flex items-center justify-center text-white hover:bg-blue-400 transition-all shadow-md"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={handleDeleteClick}
            className="w-8 h-8 rounded-lg bg-red-500/90 border border-red-400 flex items-center justify-center text-white hover:bg-red-400 transition-all shadow-md"
            title="Hapus"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
