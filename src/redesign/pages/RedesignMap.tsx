import { useState } from 'react';
import RedesignHeader from '@/redesign/components/RedesignHeader';
import MapSearch from '@/redesign/components/MapSearch';
import FilterSidebar from '@/redesign/components/FilterSidebar';
import { complexes } from '@/redesign/data/mock-data';
import { defaultFilters, type CatalogFilters } from '@/redesign/data/types';
import { useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RedesignMap = () => {
  const [filters, setFilters] = useState<CatalogFilters>({ ...defaultFilters });
  const [active, setActive] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return complexes.filter(c => {
      const q = filters.search.toLowerCase();
      if (q && !c.name.toLowerCase().includes(q) && !c.district.toLowerCase().includes(q) && !c.subway.toLowerCase().includes(q)) return false;
      if (filters.district.length && !filters.district.includes(c.district)) return false;
      if (filters.subway.length && !filters.subway.includes(c.subway)) return false;
      if (filters.builder.length && !filters.builder.includes(c.builder)) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <RedesignHeader />
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Filters sidebar */}
        <aside className="hidden lg:block w-[280px] border-r border-border p-4 overflow-y-auto">
          <FilterSidebar filters={filters} onChange={setFilters} totalCount={filtered.length} />
        </aside>

        {/* Map */}
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-3 lg:hidden">
            <span className="text-sm font-semibold">{filtered.length} объектов</span>
            <Button variant="outline" size="sm" onClick={() => setShowFilters(true)}>
              <SlidersHorizontal className="w-4 h-4 mr-1" /> Фильтры
            </Button>
          </div>
          <MapSearch complexes={filtered} activeSlug={active} onSelect={setActive} />
        </div>
      </div>

      {/* Mobile filters */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
          <div className="flex items-center justify-between h-14 px-4 border-b border-border sticky top-0 bg-background z-10">
            <span className="font-semibold">Фильтры</span>
            <button onClick={() => setShowFilters(false)}><X className="w-6 h-6" /></button>
          </div>
          <div className="p-4">
            <FilterSidebar filters={filters} onChange={setFilters} totalCount={filtered.length} />
            <Button className="w-full mt-4" onClick={() => setShowFilters(false)}>Применить</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RedesignMap;
