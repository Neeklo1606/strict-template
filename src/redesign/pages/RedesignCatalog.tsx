import { useState, useMemo, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { LayoutGrid, List, Map, SlidersHorizontal, X, Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import RedesignHeader from '@/redesign/components/RedesignHeader';
import ComplexCard from '@/redesign/components/ComplexCard';
import FilterSidebar from '@/redesign/components/FilterSidebar';
import MapSearch from '@/redesign/components/MapSearch';
import { complexes } from '@/redesign/data/mock-data';
import { defaultFilters, type CatalogFilters } from '@/redesign/data/types';

type ViewMode = 'grid' | 'list' | 'map';

const RedesignCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filters from URL
  const initialFilters = useMemo((): CatalogFilters => {
    const f = { ...defaultFilters };
    f.search = searchParams.get('search') || '';
    const rooms = searchParams.get('rooms');
    if (rooms) f.rooms = rooms.split(',').map(Number);
    const type = searchParams.get('type');
    if (type) f.search = type;
    return f;
  }, []); // only on mount

  const [view, setView] = useState<ViewMode>('grid');
  const [filters, setFilters] = useState<CatalogFilters>(initialFilters);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [mapActive, setMapActive] = useState<string | null>(null);

  const handleFiltersChange = useCallback((f: CatalogFilters) => {
    setFilters(f);
    // Sync search to URL
    const params = new URLSearchParams();
    if (f.search) params.set('search', f.search);
    if (f.rooms.length) params.set('rooms', f.rooms.join(','));
    setSearchParams(params, { replace: true });
  }, [setSearchParams]);

  const filtered = useMemo(() => {
    return complexes.filter(c => {
      const q = filters.search.toLowerCase();
      if (q && !c.name.toLowerCase().includes(q) && !c.district.toLowerCase().includes(q) && !c.subway.toLowerCase().includes(q) && !c.builder.toLowerCase().includes(q)) return false;
      if (filters.district.length && !filters.district.includes(c.district)) return false;
      if (filters.subway.length && !filters.subway.includes(c.subway)) return false;
      if (filters.builder.length && !filters.builder.includes(c.builder)) return false;
      if (filters.deadline.length && !filters.deadline.includes(c.deadline)) return false;
      if (filters.status.length && !filters.status.includes(c.status)) return false;
      if (filters.priceMin && c.priceTo < filters.priceMin) return false;
      if (filters.priceMax && c.priceFrom > filters.priceMax) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <RedesignHeader />

      {/* Top search bar */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 py-3">
          <div className="flex items-center gap-3 max-w-[800px]">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Метро, район, ЖК, улица, застройщик"
                className="pl-9 h-10 bg-background text-sm"
                value={filters.search}
                onChange={e => handleFiltersChange({ ...filters, search: e.target.value })}
              />
            </div>
            <Link
              to="/map"
              className="hidden sm:flex items-center gap-1.5 h-10 px-4 rounded-xl border border-border bg-background text-sm font-medium hover:bg-secondary transition-colors shrink-0"
            >
              <MapPin className="w-4 h-4 text-primary" />
              На карте
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-5">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-lg font-bold">Жилые комплексы</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{filtered.length} объектов</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="lg:hidden h-9" onClick={() => setShowMobileFilters(true)}>
              <SlidersHorizontal className="w-4 h-4 mr-1.5" /> Фильтры
            </Button>
            <div className="hidden sm:flex items-center gap-0.5 border border-border rounded-xl p-1 bg-muted/50">
              {([['grid', LayoutGrid, 'Плитка'], ['list', List, 'Список'], ['map', Map, 'Карта']] as const).map(([mode, Icon, title]) => (
                <button
                  key={mode}
                  title={title}
                  onClick={() => setView(mode)}
                  className={cn(
                    'p-2 rounded-lg transition-all duration-200',
                    view === mode
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar filters (desktop) — always visible */}
          <aside className="hidden lg:block w-[260px] shrink-0">
            <div className="sticky top-20">
              <FilterSidebar filters={filters} onChange={handleFiltersChange} totalCount={filtered.length} />
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {view === 'grid' && (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {filtered.map(c => <ComplexCard key={c.id} complex={c} />)}
              </div>
            )}
            {view === 'list' && (
              <div className="space-y-3">
                {filtered.map(c => (
                  <ComplexCard key={c.id} complex={c} variant="list" />
                ))}
              </div>
            )}
            {view === 'map' && (
              <div className="h-[calc(100vh-220px)] min-h-[400px]">
                <MapSearch complexes={filtered} activeSlug={mapActive} onSelect={setMapActive} compact />
              </div>
            )}
            {filtered.length === 0 && view !== 'map' && (
              <div className="text-center py-16">
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                  <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm mb-1">Ничего не найдено</p>
                <p className="text-muted-foreground text-xs">Попробуйте изменить параметры фильтров</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[60] bg-background overflow-y-auto animate-in slide-in-from-bottom">
          <div className="flex items-center justify-between h-14 px-4 border-b border-border sticky top-0 bg-background z-10">
            <span className="font-semibold text-sm">Фильтры</span>
            <button onClick={() => setShowMobileFilters(false)} className="w-10 h-10 flex items-center justify-center">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 pb-24">
            <FilterSidebar filters={filters} onChange={handleFiltersChange} totalCount={filtered.length} />
          </div>
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
            <Button className="w-full h-11" onClick={() => setShowMobileFilters(false)}>
              Показать {filtered.length} объектов
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RedesignCatalog;