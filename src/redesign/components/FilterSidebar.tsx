import { useState, useMemo, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ChevronDown, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CatalogFilters } from '@/redesign/data/types';
import { districts, subways, builders, deadlines, formatPrice } from '@/redesign/data/mock-data';

interface Props {
  filters: CatalogFilters;
  onChange: (f: CatalogFilters) => void;
  totalCount: number;
  className?: string;
}

const roomOptions = [0, 1, 2, 3, 4]; // 0 = studio
const roomLabels: Record<number, string> = { 0: 'Студия', 1: '1', 2: '2', 3: '3', 4: '4+' };
const finishingOptions = ['без отделки', 'черновая', 'чистовая', 'под ключ'];
const statusOptions = [
  { value: 'building', label: 'Строится' },
  { value: 'completed', label: 'Сдан' },
  { value: 'planned', label: 'Планируется' },
];

const FilterSection = ({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border pb-4">
      <button className="flex items-center justify-between w-full py-2" onClick={() => setOpen(!open)}>
        <span className="text-sm font-semibold">{title}</span>
        <ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="pt-1 space-y-2">{children}</div>}
    </div>
  );
};

const FilterSidebar = ({ filters, onChange, totalCount, className }: Props) => {
  const update = useCallback(<K extends keyof CatalogFilters>(key: K, val: CatalogFilters[K]) => {
    onChange({ ...filters, [key]: val });
  }, [filters, onChange]);

  const toggleArray = useCallback((key: 'rooms' | 'district' | 'subway' | 'builder' | 'finishing' | 'deadline' | 'status', val: string | number) => {
    const arr = filters[key] as (string | number)[];
    const next = arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
    onChange({ ...filters, [key]: next });
  }, [filters, onChange]);

  const hasFilters = useMemo(() => {
    return filters.rooms.length > 0 || filters.district.length > 0 || filters.subway.length > 0 ||
      filters.builder.length > 0 || filters.finishing.length > 0 || filters.deadline.length > 0 ||
      filters.status.length > 0 || filters.search !== '' ||
      filters.priceMin !== undefined || filters.priceMax !== undefined ||
      filters.areaMin !== undefined || filters.areaMax !== undefined;
  }, [filters]);

  return (
    <div className={cn('space-y-3', className)}>
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Поиск по названию, району, метро..."
          className="pl-9 h-9 text-sm"
          value={filters.search}
          onChange={e => update('search', e.target.value)}
        />
      </div>

      {/* Rooms */}
      <FilterSection title="Комнаты">
        <div className="flex gap-1.5">
          {roomOptions.map(r => (
            <button
              key={r}
              onClick={() => toggleArray('rooms', r)}
              className={cn(
                'h-8 px-3 rounded-lg text-sm font-medium border transition-colors',
                filters.rooms.includes(r)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background border-border text-foreground hover:border-primary/50'
              )}
            >
              {roomLabels[r]}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Цена">
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="от 3 млн"
            className="h-8 text-sm"
            value={filters.priceMin ?? ''}
            onChange={e => update('priceMin', e.target.value ? Number(e.target.value) : undefined)}
          />
          <Input
            type="number"
            placeholder="до 60 млн"
            className="h-8 text-sm"
            value={filters.priceMax ?? ''}
            onChange={e => update('priceMax', e.target.value ? Number(e.target.value) : undefined)}
          />
        </div>
      </FilterSection>

      {/* Area */}
      <FilterSection title="Площадь, м²">
        <div className="flex gap-2">
          <Input type="number" placeholder="от" className="h-8 text-sm" value={filters.areaMin ?? ''} onChange={e => update('areaMin', e.target.value ? Number(e.target.value) : undefined)} />
          <Input type="number" placeholder="до" className="h-8 text-sm" value={filters.areaMax ?? ''} onChange={e => update('areaMax', e.target.value ? Number(e.target.value) : undefined)} />
        </div>
      </FilterSection>

      {/* District */}
      <FilterSection title="Район" defaultOpen={false}>
        <div className="space-y-1.5 max-h-40 overflow-y-auto">
          {districts.map(d => (
            <label key={d} className="flex items-center gap-2 cursor-pointer text-sm">
              <Checkbox checked={filters.district.includes(d)} onCheckedChange={() => toggleArray('district', d)} />
              {d}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Subway */}
      <FilterSection title="Метро" defaultOpen={false}>
        <div className="space-y-1.5 max-h-40 overflow-y-auto">
          {subways.map(s => (
            <label key={s} className="flex items-center gap-2 cursor-pointer text-sm">
              <Checkbox checked={filters.subway.includes(s)} onCheckedChange={() => toggleArray('subway', s)} />
              {s}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Builder */}
      <FilterSection title="Застройщик" defaultOpen={false}>
        <div className="space-y-1.5 max-h-40 overflow-y-auto">
          {builders.map(b => (
            <label key={b} className="flex items-center gap-2 cursor-pointer text-sm">
              <Checkbox checked={filters.builder.includes(b)} onCheckedChange={() => toggleArray('builder', b)} />
              {b}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Finishing */}
      <FilterSection title="Отделка" defaultOpen={false}>
        <div className="space-y-1.5">
          {finishingOptions.map(f => (
            <label key={f} className="flex items-center gap-2 cursor-pointer text-sm capitalize">
              <Checkbox checked={filters.finishing.includes(f)} onCheckedChange={() => toggleArray('finishing', f)} />
              {f}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Deadline */}
      <FilterSection title="Срок сдачи" defaultOpen={false}>
        <div className="space-y-1.5">
          {deadlines.map(d => (
            <label key={d} className="flex items-center gap-2 cursor-pointer text-sm">
              <Checkbox checked={filters.deadline.includes(d)} onCheckedChange={() => toggleArray('deadline', d)} />
              {d}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Status */}
      <FilterSection title="Статус" defaultOpen={false}>
        <div className="space-y-1.5">
          {statusOptions.map(s => (
            <label key={s.value} className="flex items-center gap-2 cursor-pointer text-sm">
              <Checkbox checked={filters.status.includes(s.value)} onCheckedChange={() => toggleArray('status', s.value)} />
              {s.label}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Floor */}
      <FilterSection title="Этаж" defaultOpen={false}>
        <div className="flex gap-2">
          <Input type="number" placeholder="от" className="h-8 text-sm" value={filters.floorMin ?? ''} onChange={e => update('floorMin', e.target.value ? Number(e.target.value) : undefined)} />
          <Input type="number" placeholder="до" className="h-8 text-sm" value={filters.floorMax ?? ''} onChange={e => update('floorMax', e.target.value ? Number(e.target.value) : undefined)} />
        </div>
      </FilterSection>

      {/* Actions */}
      <div className="pt-2 space-y-2">
        <Button className="w-full h-10 text-sm">
          Показать {totalCount} объектов
        </Button>
        {hasFilters && (
          <Button variant="ghost" className="w-full h-8 text-sm text-muted-foreground" onClick={() => onChange({ rooms: [], district: [], subway: [], builder: [], finishing: [], deadline: [], status: [], search: '' })}>
            <X className="w-3.5 h-3.5 mr-1" /> Сбросить фильтры
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
