import { Link } from 'react-router-dom';
import { MapPin, Heart } from 'lucide-react';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalApts = complex.buildings.reduce((s, b) => s + b.apartments.filter(a => a.status === 'available').length, 0);
  const status = statusLabels[complex.status];

  if (variant === 'list') {
    return (
      <Link
        to={`/complex/${complex.slug}`}
        className="group flex rounded-xl overflow-hidden bg-card border border-border transition-all duration-200 hover:shadow-md"
      >
        <div className="relative w-[260px] shrink-0 overflow-hidden bg-muted">
          <img src={complex.images[0]} alt={complex.name} className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]" />
          <span className={cn('absolute top-2 left-2 px-2 py-0.5 rounded-full text-[11px] font-medium backdrop-blur-sm', status.className)}>
            {status.label}
          </span>
          <button
            className="absolute top-2 right-2 w-7 h-7 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center"
            onClick={e => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
          >
            <Heart className={cn('w-3.5 h-3.5', liked ? 'fill-destructive text-destructive' : 'text-muted-foreground')} />
          </button>
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-semibold text-base leading-tight truncate group-hover:text-primary transition-colors">{complex.name}</h3>
            <p className="text-lg font-bold mt-1">от {formatPrice(complex.priceFrom)}</p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{complex.district} · {complex.address}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">В продаже {totalApts} квартир · Сдача {complex.deadline}</p>
          </div>
          <span className="text-primary text-xs font-medium mt-2">Подробнее →</span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/complex/${complex.slug}`}
      className="group relative flex flex-col rounded-xl overflow-hidden bg-card border border-border cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-px"
    >
      {/* Image — compact height */}
      <div className="relative shrink-0 overflow-hidden h-[180px]">
        <img
          src={complex.images[currentImageIndex] || complex.images[0]}
          alt={complex.name}
          className="w-full h-full object-cover object-center transition-transform duration-200 group-hover:scale-[1.02]"
        />
        <span className={cn('absolute top-2 left-2 px-2 py-0.5 rounded-full text-[11px] font-medium backdrop-blur-sm', status.className)}>
          {status.label}
        </span>
        <button
          type="button"
          className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center z-10 bg-background/70 backdrop-blur-sm transition-opacity duration-200 hover:bg-background/90 active:scale-95"
          aria-label="Добавить в избранное"
          onClick={e => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
        >
          <Heart className={cn('w-4 h-4', liked ? 'fill-destructive text-destructive' : 'text-muted-foreground')} />
        </button>
        {complex.images.length > 1 && (
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {complex.images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={cn(
                  'w-1.5 h-1.5 rounded-full transition-colors duration-150 cursor-pointer',
                  index === currentImageIndex ? 'bg-background' : 'bg-background/40'
                )}
                onClick={e => { e.preventDefault(); e.stopPropagation(); setCurrentImageIndex(index); }}
                aria-label={`Изображение ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info — tight */}
      <div className="flex flex-col p-3 gap-0.5">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-sm leading-tight truncate">{complex.name}</h3>
          <span className="font-bold text-sm shrink-0 text-primary">от {formatPrice(complex.priceFrom)}</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{complex.district} · м. {complex.subway}</span>
        </div>
        <p className="text-[11px] text-muted-foreground">В продаже {totalApts} квартир · Сдача {complex.deadline}</p>
        <span className="text-primary text-[11px] font-medium mt-1 hover:underline">Подробнее</span>
      </div>
    </Link>
  );
};

export default ComplexCard;
