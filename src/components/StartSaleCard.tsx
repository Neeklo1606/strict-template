import { Heart, CalendarClock, MapPin, ChevronRight } from 'lucide-react';
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
  district?: string;
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
  const totalUnits = apartments.reduce((s, a) => s + a.count, 0);

  const handleTap = useCallback((e: React.MouseEvent) => {
    if ('ontouchstart' in window && !expanded) {
      e.preventDefault();
      setExpanded(true);
    }
  }, [expanded]);

  return (
    <div
      className="group rounded-xl overflow-hidden bg-card border border-border transition-all duration-200 will-change-transform hover:shadow-md hover:-translate-y-px"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <Link to={linkPath} className="block" onClick={handleTap}>
        {/* Image — shrinks on expand */}
        <div
          className={cn(
            'relative overflow-hidden transition-all duration-300 ease-in-out',
            expanded ? 'h-[100px]' : 'h-[160px]',
          )}
        >
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />

          {/* Start date badge */}
          {data.badges && data.badges.length > 0 && (
            <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
              {data.badges.map((b, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 bg-primary text-primary-foreground shadow-sm"
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

        {/* Info block — always visible */}
        <div className="p-3">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-sm leading-tight truncate">{data.title}</h3>
            <span className="font-bold text-sm shrink-0">{data.price}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{data.district || data.address}{data.developer ? ` · ${data.developer}` : ''}</span>
          </div>
          <p className="text-[11px] text-muted-foreground">{totalUnits} квартир в продаже</p>
        </div>
      </Link>

      {/* Expandable apartment list */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          expanded ? 'max-h-[220px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="px-3 pb-3">
          <div className="border-t border-border pt-2 space-y-0.5">
            {apartments.map((apt, i) => (
              <Link
                key={i}
                to={`${linkPath}?rooms=${encodeURIComponent(apt.type)}`}
                className="flex items-center justify-between py-1.5 px-2 -mx-1 rounded-lg hover:bg-secondary transition-colors text-xs group/row"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-foreground font-medium">{apt.type}</span>
                <div className="flex items-center gap-2.5">
                  <span className="text-muted-foreground">{apt.count} шт.</span>
                  <span className="font-semibold text-primary">{apt.price}</span>
                  <ChevronRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover/row:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* "Подробнее" — visible only when collapsed */}
      <div className={cn(
        'px-3 pb-3 transition-all duration-200',
        expanded ? 'hidden' : 'block',
      )}>
        <span className="text-primary text-[11px] font-medium mt-1 hover:underline">Подробнее →</span>
      </div>
    </div>
  );
};

export default StartSaleCard;