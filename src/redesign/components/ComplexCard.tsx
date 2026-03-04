import { Link } from 'react-router-dom';
import { MapPin, Building2, CalendarDays, Heart, Train } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { ResidentialComplex } from '@/redesign/data/types';
import { formatPrice } from '@/redesign/data/mock-data';

interface Props {
  complex: ResidentialComplex;
  variant?: 'grid' | 'list';
}

const statusLabels: Record<string, { label: string; className: string }> = {
  completed: { label: 'Сдан', className: 'bg-green-500/90 text-primary-foreground' },
  building: { label: 'Строится', className: 'bg-primary/90 text-primary-foreground' },
  planned: { label: 'Проект', className: 'bg-muted text-muted-foreground' },
};

const ComplexCard = ({ complex, variant = 'grid' }: Props) => {
  const [liked, setLiked] = useState(false);
  const totalApts = complex.buildings.reduce((s, b) => s + b.apartments.filter(a => a.status === 'available').length, 0);
  const status = statusLabels[complex.status];

  if (variant === 'list') {
    return (
      <Link
        to={`/redesign/complex/${complex.slug}`}
        className="group flex rounded-2xl overflow-hidden bg-card border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
      >
        {/* Image */}
        <div className="relative w-[320px] shrink-0 overflow-hidden bg-muted">
          <img src={complex.images[0]} alt={complex.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm', status.className)}>
              {status.label}
            </span>
          </div>
          <button
            className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center"
            onClick={e => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
          >
            <Heart className={cn('w-4 h-4', liked ? 'fill-destructive text-destructive' : 'text-muted-foreground')} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors mb-2">{complex.name}</h3>
            <div className="space-y-1.5 mb-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{complex.district} · {complex.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Train className="w-3.5 h-3.5 shrink-0" />
                <span>м. {complex.subway} · {complex.subwayDistance}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="w-3.5 h-3.5 shrink-0" />
                <span>{complex.builder}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                <span>Сдача: {complex.deadline}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {complex.advantages.slice(0, 3).map((a, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-accent text-accent-foreground text-xs">{a}</span>
              ))}
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-border flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">от {formatPrice(complex.priceFrom)}</p>
              <p className="text-xs text-muted-foreground">{totalApts} квартир</p>
            </div>
            <span className="text-primary font-medium text-sm">Подробнее →</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/redesign/complex/${complex.slug}`}
      className="group rounded-2xl overflow-hidden bg-card border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img src={complex.images[0]} alt={complex.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="px-2.5 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-full text-xs font-medium">
            от {formatPrice(complex.priceFrom)}
          </span>
          {complex.status === 'completed' && (
            <span className="px-2.5 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-primary-foreground">Сдан</span>
          )}
        </div>
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center"
          onClick={e => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
        >
          <Heart className={cn('w-4 h-4', liked ? 'fill-destructive text-destructive' : 'text-muted-foreground')} />
        </button>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors">{complex.name}</h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{complex.district} · м. {complex.subway} · {complex.subwayDistance}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Building2 className="w-3.5 h-3.5 shrink-0" />
          <span>{complex.builder}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="w-3.5 h-3.5 shrink-0" />
          <span>Сдача: {complex.deadline}</span>
        </div>
        <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{totalApts} квартир</span>
          <span className="text-primary font-medium">Подробнее →</span>
        </div>
      </div>
    </Link>
  );
};

export default ComplexCard;
