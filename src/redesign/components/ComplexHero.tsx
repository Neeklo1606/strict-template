import { MapPin, Building2, CalendarDays, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ResidentialComplex } from '@/redesign/data/types';
import { formatPrice } from '@/redesign/data/mock-data';

const ComplexHero = ({ complex }: { complex: ResidentialComplex }) => {
  const totalApts = complex.buildings.reduce((s, b) => s + b.apartments.filter(a => a.status === 'available').length, 0);

  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-card">
      <div className="relative h-64 sm:h-80 bg-muted">
        <img src={complex.images[0]} alt={complex.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
          <div className="flex gap-2 mb-2">
            {complex.status === 'completed' && <span className="px-2.5 py-1 bg-green-500 rounded-full text-xs font-medium">Сдан</span>}
            {complex.status === 'building' && <span className="px-2.5 py-1 bg-primary rounded-full text-xs font-medium">Строится</span>}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">{complex.name}</h1>
          <div className="flex items-center gap-1.5 text-sm opacity-90">
            <MapPin className="w-4 h-4" />
            {complex.address} · м. {complex.subway}
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Цена от</p>
            <p className="font-bold text-lg">{formatPrice(complex.priceFrom)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Застройщик</p>
            <p className="font-semibold text-sm flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />{complex.builder}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Сдача</p>
            <p className="font-semibold text-sm flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" />{complex.deadline}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Квартир</p>
            <p className="font-semibold text-sm">{totalApts} доступно</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {complex.advantages.map((a, i) => (
            <span key={i} className="px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-medium flex items-center gap-1">
              <Shield className="w-3 h-3" />{a}
            </span>
          ))}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{complex.description}</p>
      </div>
    </div>
  );
};

export default ComplexHero;
