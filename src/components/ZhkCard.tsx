import { useState, useRef } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ZhkApartment { type: string; area: string; price: string; }
export interface ZhkData {
  images: string[];
  name: string;
  price: string;
  unitsCount: string;
  badges: string[];
  apartments: ZhkApartment[];
}

const ZhkCard = ({ data }: { data: ZhkData }) => {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const touchRef = useRef(0);

  const handlePhotoNav = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) {
      setPhotoIdx(p => Math.max(0, p - 1));
    } else {
      setPhotoIdx(p => Math.min(data.images.length - 1, p + 1));
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden bg-card border border-border hover:shadow-lg transition-all flex flex-col" style={{ height: '400px' }}>
      {/* Photo area - fixed */}
      <div
        className="relative overflow-hidden cursor-pointer shrink-0"
        style={{ height: '250px' }}
        onClick={handlePhotoNav}
        onTouchStart={e => { touchRef.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          const diff = e.changedTouches[0].clientX - touchRef.current;
          if (Math.abs(diff) > 50) {
            if (diff > 0) setPhotoIdx(p => Math.max(0, p - 1));
            else setPhotoIdx(p => Math.min(data.images.length - 1, p + 1));
          } else {
            setExpanded(!expanded);
          }
        }}
      >
        <img src={data.images[photoIdx]} alt={data.name} className="w-full h-full object-cover" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {data.badges.map((b, i) => (
            <span key={i} className="px-2.5 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium">{b}</span>
          ))}
        </div>

        {/* Heart */}
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center z-10"
          onClick={e => { e.stopPropagation(); setLiked(!liked); }}
        >
          <Heart className={cn("w-4 h-4", liked ? "fill-primary text-primary" : "text-muted-foreground")} />
        </button>

        {/* Dots */}
        {data.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {data.images.map((_, i) => (
              <div key={i} className={cn("w-2 h-2 rounded-full transition-colors", i === photoIdx ? "bg-background" : "bg-background/40")} />
            ))}
          </div>
        )}

        {/* Expanded details overlay - inside photo area */}
        <div className={cn(
          "absolute inset-x-0 bottom-0 bg-background/95 backdrop-blur-sm p-4 transition-all duration-300 z-20",
          expanded ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        )}>
          {data.apartments.map((apt, i) => (
            <div key={i} className="flex justify-between items-center py-1.5 border-b border-border last:border-0 gap-2">
              <span className="text-primary text-sm font-medium">{apt.type}</span>
              <span className="text-xs text-muted-foreground">{apt.area}</span>
              <span className="text-xs font-medium">{apt.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Info area */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="font-semibold text-sm">{data.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{data.unitsCount}</p>
          </div>
          <div className="text-right shrink-0">
            <span className="font-bold text-sm">{data.price}</span>
          </div>
        </div>
        <button
          className="text-primary text-xs font-medium self-end mt-2"
          onClick={() => setExpanded(!expanded)}
        >
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default ZhkCard;
