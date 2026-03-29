import { Heart, Flame } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface PropertyData {
  image: string;
  title: string;
  price: string;
  address: string;
  area?: string;
  rooms?: string;
  badges?: string[];
  slug?: string;
  description?: string;
  metro?: string;
  district?: string;
  buildingClass?: string;
  deadline?: string;
  mortgage?: string;
  coords?: [number, number];
}

const hotBadgeStyle: Record<string, string> = {
  'Скидка': 'bg-destructive text-destructive-foreground',
  'Акция': 'bg-primary text-primary-foreground',
  'Горячее предложение': 'bg-destructive text-destructive-foreground',
};

const getHotBadgeClass = (label: string) => {
  for (const key of Object.keys(hotBadgeStyle)) {
    if (label.toLowerCase().includes(key.toLowerCase())) return hotBadgeStyle[key];
  }
  return 'bg-destructive/90 text-destructive-foreground';
};

const PropertyCard = ({ data, basePath = '', variant = 'default' }: { data: PropertyData; basePath?: string; variant?: 'default' | 'hot' }) => {
  const [liked, setLiked] = useState(false);
  const slug = data.slug || data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-zа-яё0-9-]/gi, '');
  const linkPath = `/complex/${slug}`;
  const isHot = variant === 'hot';

  return (
    <div className={cn(
      'group rounded-2xl overflow-hidden bg-card border transition-all duration-300 ease-in-out will-change-transform',
      isHot
        ? 'border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1'
        : 'border-border hover:shadow-xl hover:-translate-y-1'
    )}>
      <Link to={linkPath} className="block">
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: '220px' }}>
          <img
            src={data.image}
            alt={data.title}
            className={cn(
              'w-full h-full object-cover transition-transform duration-300 ease-in-out',
              isHot ? 'group-hover:scale-[1.05]' : 'group-hover:scale-[1.03]'
            )}
          />
          {/* Hot overlay */}
          {isHot && (
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent transition-opacity duration-300 group-hover:from-foreground/30" />
          )}
          {/* Badges */}
          {data.badges && data.badges.length > 0 && (
            <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
              {data.badges.map((b, i) => (
                <span
                  key={i}
                  className={cn(
                    'px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1',
                    isHot ? getHotBadgeClass(b) : 'bg-background/85 backdrop-blur-sm text-foreground'
                  )}
                >
                  {isHot && <Flame className="w-3 h-3" />}
                  {b}
                </span>
              ))}
            </div>
          )}
          {/* Favorite */}
          <button
            className="absolute top-2.5 right-2.5 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center z-10 transition-transform duration-200 active:scale-90"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
          >
            <Heart className={cn('w-4 h-4', liked ? 'fill-destructive text-destructive' : 'text-muted-foreground')} />
          </button>
        </div>

        {/* Info */}
        <div className="p-3.5">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-sm leading-tight truncate">{data.title}</h3>
            <span className={cn(
              'font-bold whitespace-nowrap shrink-0',
              isHot ? 'text-base text-primary' : 'text-sm'
            )}>{data.price}</span>
          </div>
          {data.description ? (
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">{data.description}</p>
          ) : (
            <>
              <p className="text-xs text-muted-foreground mt-1">{data.address}</p>
              <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                {data.area && <span>{data.area}</span>}
                {data.rooms && <span>{data.rooms}</span>}
              </div>
            </>
          )}
          <span className="text-primary text-xs font-medium mt-2 inline-block hover:underline">Подробнее</span>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
