import { useState, useRef } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export interface ZhkApartment { type: string; area: string; price: string; }
export interface ZhkData {
  images: string[];
  name: string;
  price: string;
  unitsCount: string;
  badges: string[];
  apartments: ZhkApartment[];
  slug?: string;
}

const ZhkCard = ({ data }: { data: ZhkData }) => {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const touchRef = useRef(0);
  const navigate = useNavigate();
  const slug = data.slug || 'smorodina';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const segment = Math.floor((x / rect.width) * data.images.length);
    const idx = Math.min(data.images.length - 1, Math.max(0, segment));
    if (idx !== photoIdx) setPhotoIdx(idx);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking heart or "Подробнее"
    if ((e.target as HTMLElement).closest('[data-no-nav]')) return;
    navigate(`/zhk/${slug}`);
  };

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (expanded) {
      navigate(`/zhk/${slug}`);
    } else {
      setExpanded(true);
    }
  };

  return (
    <div
      className="rounded-2xl overflow-hidden bg-card border border-border hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setExpanded(false); }}
      onClick={handleCardClick}
    >
      {/* Photo area */}
      <div
        className="relative overflow-hidden shrink-0 transition-all duration-300 ease-in-out"
        style={{ height: hovered || expanded ? '180px' : '250px' }}
        onMouseMove={handleMouseMove}
        onTouchStart={e => { touchRef.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          const diff = e.changedTouches[0].clientX - touchRef.current;
          if (Math.abs(diff) > 50) {
            if (diff > 0) setPhotoIdx(p => Math.max(0, p - 1));
            else setPhotoIdx(p => Math.min(data.images.length - 1, p + 1));
          }
        }}
      >
        <img
          src={data.images[photoIdx]}
          alt={data.name}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {data.badges.map((b, i) => (
            <span key={i} className="px-2.5 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium">{b}</span>
          ))}
        </div>

        {/* Heart */}
        <button
          data-no-nav
          className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center z-10"
          onClick={e => { e.stopPropagation(); setLiked(!liked); }}
        >
          <Heart className={cn("w-4 h-4", liked ? "fill-primary text-primary" : "text-muted-foreground")} />
        </button>

        {/* Dots */}
        {data.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {data.images.map((_, i) => (
              <div key={i} className={cn("w-2 h-2 rounded-full transition-colors duration-200", i === photoIdx ? "bg-background" : "bg-background/40")} />
            ))}
          </div>
        )}
      </div>

      {/* Info area */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="font-semibold text-sm hover:text-primary transition-colors">{data.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{data.unitsCount}</p>
          </div>
          <div className="text-right shrink-0">
            <span className="font-bold text-sm">{data.price}</span>
          </div>
        </div>

        {/* Expandable apartments */}
        <div className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          (hovered || expanded) ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
        )}>
          {data.apartments.slice(0, 4).map((apt, i) => (
            <div key={i} className="flex justify-between items-center py-1.5 border-b border-border last:border-0 gap-2">
              <span className="text-primary text-xs font-medium whitespace-nowrap">{apt.type}</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{apt.area}</span>
              <span className="text-xs font-medium whitespace-nowrap">{apt.price}</span>
            </div>
          ))}
        </div>

        <button
          data-no-nav
          className="text-primary text-xs font-medium self-end mt-2 hover:underline hover:text-primary/80 transition-colors cursor-pointer"
          onClick={handleDetailsClick}
        >
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default ZhkCard;
