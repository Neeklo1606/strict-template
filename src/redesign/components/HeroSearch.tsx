import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal, ChevronDown, Building2, Home, TreePine, Store, Train, MapPinned, Landmark, Route, HardHat, Banknote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { searchComplexes } from '@/redesign/data/mock-data';
import type { ResidentialComplex } from '@/redesign/data/types';

const objectTabs = [
  { label: 'Квартиры', icon: Building2, value: 'apartments' },
  { label: 'Дома', icon: Home, value: 'houses' },
  { label: 'Участки', icon: TreePine, value: 'land' },
  { label: 'Коммерция', icon: Store, value: 'commercial' },
];

const regions = [
  'Москва и МО',
  'Санкт-Петербург и ЛО',
  'Краснодарский край',
  'Московская область',
  'Ленинградская область',
  'Татарстан',
  'Крым',
  'Сочи',
  'Другой регион',
];

const propertyTypes = ['Тип квартиры', 'Студия', '1-комнатная', '2-комнатная', '3-комнатная', '4+ комнат'];
const deadlines = ['Срок сдачи', 'Сдан', '2025', '2026', '2027', '2028+'];

/* ---------- categorised suggestions ---------- */
type Suggestion = { label: string; type: 'metro' | 'district' | 'complex' | 'street' | 'builder' | 'bank'; icon: typeof Train };
const staticSuggestions: Suggestion[] = [
  { label: 'Сокольники', type: 'metro', icon: Train },
  { label: 'Тверская', type: 'metro', icon: Train },
  { label: 'Парк Культуры', type: 'metro', icon: Train },
  { label: 'Хамовники', type: 'district', icon: MapPinned },
  { label: 'Пресненский', type: 'district', icon: MapPinned },
  { label: 'Басманный', type: 'district', icon: MapPinned },
  { label: 'ул. Ленина', type: 'street', icon: Route },
  { label: 'ул. Профсоюзная', type: 'street', icon: Route },
  { label: 'ПИК', type: 'builder', icon: HardHat },
  { label: 'Самолёт', type: 'builder', icon: HardHat },
  { label: 'Донстрой', type: 'builder', icon: HardHat },
  { label: 'Сбербанк', type: 'bank', icon: Banknote },
  { label: 'ВТБ', type: 'bank', icon: Banknote },
];

const typeLabels: Record<string, string> = {
  metro: 'Метро', district: 'Район', complex: 'ЖК', street: 'Улица', builder: 'Застройщик', bank: 'Банк',
};

function filterSuggestions(q: string): Suggestion[] {
  if (q.length < 2) return [];
  const lower = q.toLowerCase();
  return staticSuggestions.filter(s => s.label.toLowerCase().includes(lower)).slice(0, 6);
}

const HeroSearch = () => {
  const [activeTab, setActiveTab] = useState('apartments');
  const [q, setQ] = useState('');
  const [complexResults, setComplexResults] = useState<ResidentialComplex[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Москва и МО');
  const [regionOpen, setRegionOpen] = useState(false);
  const [propertyType, setPropertyType] = useState('Тип квартиры');
  const [ptOpen, setPtOpen] = useState(false);
  const [deadline, setDeadline] = useState('Срок сдачи');
  const [dlOpen, setDlOpen] = useState(false);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const ptRef = useRef<HTMLDivElement>(null);
  const dlRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleSearch = useCallback((val: string) => {
    setQ(val);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setComplexResults(val.length >= 2 ? searchComplexes(val) : []);
      setSuggestions(filterSuggestions(val));
    }, 200);
  }, []);

  const doSearch = () => {
    const params = new URLSearchParams();
    if (q) params.set('search', q);
    if (activeTab !== 'apartments') params.set('type', activeTab);
    if (propertyType !== 'Тип квартиры') params.set('rooms', propertyType);
    if (deadline !== 'Срок сдачи') params.set('deadline', deadline);
    if (priceFrom) params.set('priceFrom', priceFrom);
    if (priceTo) params.set('priceTo', priceTo);
    navigate(`/catalog?${params.toString()}`);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchFocused(false);
      if (regionRef.current && !regionRef.current.contains(e.target as Node)) setRegionOpen(false);
      if (ptRef.current && !ptRef.current.contains(e.target as Node)) setPtOpen(false);
      if (dlRef.current && !dlRef.current.contains(e.target as Node)) setDlOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const hasAutocomplete = searchFocused && (suggestions.length > 0 || complexResults.length > 0);

  return (
    <section className="relative bg-background">
      {/* Mobile: compact padding, Desktop: generous */}
      <div className="max-w-[1400px] mx-auto px-4 pt-4 pb-5 sm:pt-10 sm:pb-12">

        {/* Geo selector — left-aligned, separate from title */}
        <div className="flex flex-col gap-2 sm:gap-3 mb-5 sm:mb-8">
          <div className="relative w-fit" ref={regionRef}>
            <button
              onClick={() => setRegionOpen(!regionOpen)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border',
                regionOpen
                  ? 'border-primary bg-accent text-primary'
                  : 'border-border bg-muted/50 text-muted-foreground hover:text-foreground hover:border-primary/40'
              )}
            >
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>{selectedRegion}</span>
              <ChevronDown className={cn('w-3 h-3 shrink-0 transition-transform duration-200', regionOpen && 'rotate-180')} />
            </button>
            {regionOpen && (
              <ul className="absolute top-full left-0 mt-1.5 py-1.5 bg-card border border-border rounded-xl shadow-lg z-50 min-w-[220px] max-h-[300px] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-150">
                {regions.map(r => (
                  <li key={r}>
                    <button
                      onClick={() => { setSelectedRegion(r); setRegionOpen(false); }}
                      className={cn(
                        'w-full text-left px-4 py-2 text-sm hover:bg-muted/50 transition-colors flex items-center gap-2',
                        selectedRegion === r && 'text-primary font-medium'
                      )}
                    >
                      {selectedRegion === r && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                      {r}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Title — left-aligned */}
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold leading-tight">
            <span className="text-primary italic">Live Grid.</span>{' '}
            <span className="hidden sm:inline">62 000+ квартир по России</span>
            <span className="sm:hidden">62 000+ квартир</span>
          </h1>
        </div>

        {/* Tabs — horizontal scroll on mobile */}
        <div className="flex items-center sm:justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {objectTabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  'flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 border shrink-0',
                  activeTab === tab.value
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-background border-border hover:bg-secondary hover:border-primary/30'
                )}
              >
                <Icon className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                {tab.label}
              </button>
            );
          })}
          <div className="w-px h-6 bg-border shrink-0 mx-0.5 hidden sm:block" />
          <Link
            to="/catalog?region=belgorod"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 bg-[hsl(30,100%,50%)] text-primary-foreground hover:bg-[hsl(30,100%,45%)] shadow-sm"
          >
            🏙 Белгород
          </Link>
        </div>

        {/* Search block — compact on mobile */}
        <div className="bg-muted/50 rounded-xl sm:rounded-2xl border border-border p-2.5 sm:p-4 max-w-[1000px] mx-auto">
          {/* Search input */}
          <div className="flex flex-col lg:flex-row gap-2 sm:gap-3">
            <div ref={searchRef} className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Метро, район, ЖК, улица, застройщик"
                className="pl-9 h-10 sm:h-12 bg-background border-border text-sm"
                value={q}
                onFocus={() => setSearchFocused(true)}
                onChange={e => handleSearch(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') doSearch(); }}
              />
              {hasAutocomplete && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 max-h-[300px] sm:max-h-[360px] overflow-y-auto animate-in fade-in-0 slide-in-from-top-1 duration-150">
                  {suggestions.length > 0 && (
                    <div className="py-1">
                      {suggestions.map((s, i) => {
                        const Icon = s.icon;
                        return (
                          <button
                            key={`${s.type}-${i}`}
                            onClick={() => { setQ(s.label); setSearchFocused(false); doSearch(); }}
                            className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 hover:bg-muted/50 transition-colors text-left"
                          >
                            <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span className="text-sm">{s.label}</span>
                            <span className="ml-auto text-[10px] text-muted-foreground uppercase tracking-wider">{typeLabels[s.type]}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {complexResults.length > 0 && (
                    <>
                      {suggestions.length > 0 && <div className="h-px bg-border" />}
                      <div className="py-1">
                        <p className="px-3 sm:px-4 py-1 text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Жилые комплексы</p>
                        {complexResults.map(c => (
                          <Link
                            key={c.id}
                            to={`/complex/${c.slug}`}
                            onClick={() => { setSearchFocused(false); setQ(''); }}
                            className="flex items-center gap-3 px-3 sm:px-4 py-2 hover:bg-muted/50 transition-colors"
                          >
                            <img src={c.images[0]} alt="" className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-cover shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">{c.name}</p>
                              <p className="text-xs text-muted-foreground">{c.district} · м. {c.subway}</p>
                            </div>
                            <Landmark className="w-4 h-4 text-muted-foreground shrink-0 ml-auto hidden sm:block" />
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Desktop inline filters */}
            <div className="hidden lg:flex items-center gap-2">
              <div ref={ptRef} className="relative">
                <button
                  onClick={() => setPtOpen(!ptOpen)}
                  className={cn(
                    'h-12 px-4 rounded-xl border text-sm flex items-center gap-1.5 whitespace-nowrap transition-colors',
                    propertyType !== 'Тип квартиры'
                      ? 'border-primary/50 bg-accent text-accent-foreground'
                      : 'border-border bg-background hover:bg-secondary'
                  )}
                >
                  {propertyType === 'Тип квартиры' ? 'Тип' : propertyType}
                  <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', ptOpen && 'rotate-180')} />
                </button>
                {ptOpen && (
                  <ul className="absolute top-full right-0 mt-1 py-2 bg-card border border-border rounded-xl shadow-lg z-50 min-w-[180px] animate-in fade-in-0 zoom-in-95 duration-150">
                    {propertyTypes.map(t => (
                      <li key={t}>
                        <button
                          onClick={() => { setPropertyType(t); setPtOpen(false); }}
                          className={cn('w-full text-left px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors', propertyType === t && 'text-primary font-medium')}
                        >{t}</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex items-center h-12 rounded-xl border border-border bg-background overflow-hidden">
                <input type="text" placeholder="Цена от" className="w-24 h-full px-3 text-sm bg-transparent outline-none" value={priceFrom} onChange={e => setPriceFrom(e.target.value.replace(/\D/g, ''))} />
                <div className="w-px h-6 bg-border" />
                <input type="text" placeholder="до, ₽" className="w-24 h-full px-3 text-sm bg-transparent outline-none" value={priceTo} onChange={e => setPriceTo(e.target.value.replace(/\D/g, ''))} />
              </div>

              <div ref={dlRef} className="relative">
                <button
                  onClick={() => setDlOpen(!dlOpen)}
                  className={cn(
                    'h-12 px-4 rounded-xl border text-sm flex items-center gap-1.5 whitespace-nowrap transition-colors',
                    deadline !== 'Срок сдачи'
                      ? 'border-primary/50 bg-accent text-accent-foreground'
                      : 'border-border bg-background hover:bg-secondary'
                  )}
                >
                  {deadline}
                  <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', dlOpen && 'rotate-180')} />
                </button>
                {dlOpen && (
                  <ul className="absolute top-full right-0 mt-1 py-2 bg-card border border-border rounded-xl shadow-lg z-50 min-w-[140px] animate-in fade-in-0 zoom-in-95 duration-150">
                    {deadlines.map(d => (
                      <li key={d}>
                        <button
                          onClick={() => { setDeadline(d); setDlOpen(false); }}
                          className={cn('w-full text-left px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors', deadline === d && 'text-primary font-medium')}
                        >{d}</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="h-12 px-4 rounded-xl border border-border bg-background hover:bg-secondary text-sm flex items-center gap-1.5 whitespace-nowrap transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Фильтры
              </button>
            </div>
          </div>

          {/* Mobile filters — scrollable pills */}
          <div className="flex lg:hidden gap-1.5 mt-2 overflow-x-auto scrollbar-hide -mx-2.5 px-2.5">
            <button
              onClick={() => setPtOpen(!ptOpen)}
              className="h-8 px-2.5 rounded-lg border border-border bg-background text-[11px] flex items-center gap-1 whitespace-nowrap shrink-0"
            >
              {propertyType === 'Тип квартиры' ? 'Тип' : propertyType}
              <ChevronDown className="w-2.5 h-2.5" />
            </button>
            <button className="h-8 px-2.5 rounded-lg border border-border bg-background text-[11px] whitespace-nowrap shrink-0">Цена</button>
            <button
              onClick={() => setDlOpen(!dlOpen)}
              className="h-8 px-2.5 rounded-lg border border-border bg-background text-[11px] flex items-center gap-1 whitespace-nowrap shrink-0"
            >
              {deadline}
              <ChevronDown className="w-2.5 h-2.5" />
            </button>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="h-8 px-2.5 rounded-lg border border-border bg-background text-[11px] flex items-center gap-1 whitespace-nowrap shrink-0"
            >
              <SlidersHorizontal className="w-3 h-3" />
              Ещё
            </button>
          </div>

          {/* Bottom: action row */}
          <div className="flex items-center justify-between mt-2.5 sm:mt-4 gap-2">
            <p className="hidden sm:block text-xs text-muted-foreground">
              {selectedRegion} · {activeTab === 'apartments' ? 'квартиры' : activeTab === 'houses' ? 'дома' : activeTab === 'land' ? 'участки' : 'коммерция'}
            </p>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link
                to="/map"
                className="hidden sm:flex items-center gap-2 h-10 sm:h-11 px-4 sm:px-5 rounded-xl border border-border bg-background text-sm font-medium hover:bg-secondary transition-colors"
              >
                <MapPin className="w-4 h-4 text-primary" />
                На карте
              </Link>
              <Button onClick={doSearch} className="h-10 sm:h-11 flex-1 sm:flex-none sm:px-6 rounded-xl text-xs sm:text-sm font-medium shadow-sm">
                58 728 объектов · 370 ЖК
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSearch;
