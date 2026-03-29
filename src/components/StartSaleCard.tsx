import { Heart, CalendarClock } from 'lucide-react';
import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface StartSaleData {
  image: string;
  title: string;
  price: string;
  address: string;
  badges?: string[];
  description?: string;
  slug?: string;
  developer?: string;
  apartments?: { type: string; price: string; count: number }[];
}

const defaultApartments = [
  { type: 'Студия', price: 'от 3.2 млн', count: 12 },
  { type: '1-комн.', price: 'от 4.8 млн', count: 24 },
  { type: '2-комн.', price: 'от 7.1 млн', count: 18 },
  { type: '3-комн.', price: 'от 10.5 млн', count: 8 },
];

const StartSaleCard = ({ data }: { data: StartSaleData }) => {
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const slug = data.slug || data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-zа-яё0-9-]/gi, '');
  const linkPath = `/complex/${slug}`;
  const apartments = data.apartments || defaultApartments;

  const handleTap = useCallback((e: React.MouseEvent) => {
    // On touch devices, first tap expands, second navigates
    if ('ontouchstart' in window && !expanded) {
      e.preventDefault();
      setExpanded(true);
    }
  }, [expanded]);

  return (
    <div
      className="group rounded-2xl overflow-hidden bg-card border border-border transition-all duration-300 ease-in-out will-change-transform hover:shadow-lg hover:-translate-y-0.5"
      onMouseLeave={() => setExpanded(false)}
    >
      <Link to={linkPath} className="block" onClick={handleTap}>
        {/* Image — shrinks on hover to reveal apartment list */}
        <div
          className={cn(
            'relative overflow-hidden transition-all duration-300 ease-in-out',
            'h-[220px] group-hover:h-[120px]',
          )}
          style={expanded ? { height: '120px' } : undefined}
        >
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.03]"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 via-transparent to-transparent" />

          {/* Badge */}
          {data.badges && data.badges.length > 0 && (
            <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
              {data.badges.map((b, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 bg-accent-foreground text-background backdrop-blur-sm"
                >
                  <CalendarClock className="w-3 h-3" />
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

        {/* Base info — always visible */}
        <div className="px-3.5 pt-3 pb-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-sm leading-tight truncate">{data.title}</h3>
            <span className="text-sm font-bold whitespace-nowrap shrink-0">{data.price}</span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{data.address}{data.developer ? ` · ${data.developer}` : ''}</p>
        </div>

        {/* Expandable apartment list — revealed on hover / tap */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out',
            'max-h-0 opacity-0 group-hover:max-h-[200px] group-hover:opacity-100',
          )}
          style={expanded ? { maxHeight: '200px', opacity: 1 } : undefined}
        >
          <div className="px-3.5 pt-1.5 pb-3">
            <div className="border-t border-border pt-2 space-y-1">
              {apartments.map((apt, i) => (
                <Link
                  key={i}
                  to={`${linkPath}?rooms=${encodeURIComponent(apt.type)}`}
                  className="flex items-center justify-between py-1 px-2 -mx-1 rounded-md hover:bg-secondary transition-colors text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-foreground font-medium">{apt.type}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{apt.count} шт.</span>
                    <span className="font-semibold text-primary">{apt.price}</span>
                  </div>
                </Link>
              ))}
            </div>
            <span className="text-primary text-[11px] font-medium mt-1.5 inline-block hover:underline">Все квартиры →</span>
          </div>
        </div>

        {/* "Подробнее" — visible only when NOT expanded */}
        <div className={cn(
          'px-3.5 pb-3 transition-all duration-300 ease-in-out',
          'block group-hover:hidden',
        )}>
          {data.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{data.description}</p>
          )}
          <span className="text-primary text-xs font-medium mt-1.5 inline-block hover:underline">Подробнее</span>
        </div>
      </Link>
    </div>
  );
};

export default StartSaleCard;
