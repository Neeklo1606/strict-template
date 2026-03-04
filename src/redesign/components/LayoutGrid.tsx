import { Link } from 'react-router-dom';
import type { LayoutGroup } from '@/redesign/data/types';
import { formatPrice } from '@/redesign/data/mock-data';

interface Props {
  layouts: LayoutGroup[];
  complexSlug: string;
}

const LayoutCard = ({ layout }: { layout: LayoutGroup }) => (
  <div className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow">
    <div className="aspect-square bg-muted flex items-center justify-center p-4">
      <img src={layout.planImage} alt={`${layout.rooms}-комн`} className="max-w-full max-h-full object-contain" />
    </div>
    <div className="p-3 space-y-1">
      <h4 className="font-semibold text-sm">{layout.rooms === 0 ? 'Студия' : `${layout.rooms}-комнатная`}</h4>
      <p className="text-xs text-muted-foreground">{layout.area} м²</p>
      <p className="text-sm font-bold">от {formatPrice(layout.priceFrom)}</p>
      <p className="text-xs text-primary">{layout.availableCount} квартир</p>
    </div>
  </div>
);

const LayoutGrid = ({ layouts, complexSlug }: Props) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    {layouts.map(l => (
      <LayoutCard key={l.id} layout={l} />
    ))}
  </div>
);

export default LayoutGrid;
