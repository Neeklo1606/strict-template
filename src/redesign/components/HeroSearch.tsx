import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal, ChevronDown, Building2, Home, TreePine, Store } from 'lucide-react';
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

const HeroSearch = () => {
  const [activeTab, setActiveTab] = useState('apartments');
  const [q, setQ] = useState('');
  const [results, setResults] = useState<ResidentialComplex[]>([]);
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
    timerRef.current = setTimeout(() => setResults(val.length >= 2 ? searchComplexes(val) : []), 200);
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

  const handleTabClick = (value: string) => {
    setActiveTab(value);
  };

  return (
    <section className="relative bg-background">
      <div className="max-w-[1400px] mx-auto px-4 pt-6 pb-8 sm:pt-10 sm:pb-12">
        {/* Title + Geo selector */}
        <div className="flex flex-col items-center gap-3 mb-8">
          {/* Compact geo selector */}
          <div className="relative" ref={regionRef}>
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
              <ul className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 py-1.5 bg-card border border-border rounded-xl shadow-lg z-50 min-w-[220px] max-h-[300px] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-150">
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

          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-bold text-center leading-tight">
            <span className="text-primary italic">Live Grid.</span>{' '}
            62 000+ квартир по России
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
          {objectTabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.value}
                onClick={() => handleTabClick(tab.value)}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border',
                  activeTab === tab.value
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-background border-border hover:bg-secondary hover:border-primary/30'
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
          {/* Белгород — accent regional tab */}
          <Link
            to="/catalog?region=belgorod"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border border-primary/30 bg-accent text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <MapPin className="w-4 h-4" />
            Белгород
          </Link>
        </div>

        {/* Search bar */}
        <div className="bg-muted/50 rounded-2xl border border-border p-3 sm:p-4 max-w-[1000px] mx-auto">
          {/* Main search row */}
          <div className="flex flex-col lg:flex-row gap-2 sm:gap-3">
            {/* Search input */}
            <div ref={searchRef} className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Район, метро, ЖК, улица или застройщик"
                className="pl-10 h-12 bg-background border-border text-sm"
                value={q}
                onFocus={() => setSearchFocused(true)}
                onChange={e => handleSearch(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') doSearch(); }}
              />
              {searchFocused && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 max-h-[280px] overflow-y-auto animate-in fade-in-0 slide-in-from-top-1 duration-150">
                  {results.map(c => (
                    <Link
                      key={c.id}
                      to={`/complex/${c.slug}`}
                      onClick={() => { setSearchFocused(false); setQ(''); }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border last:border-0"
                    >
                      <img src={c.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.district} · м. {c.subway}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Inline filters — desktop */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Property type */}
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
                  {propertyType}
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

              {/* Price range */}
              <div className="flex items-center h-12 rounded-xl border border-border bg-background overflow-hidden">
                <input
                  type="text"
                  placeholder="Цена от"
                  className="w-24 h-full px-3 text-sm bg-transparent outline-none"
                  value={priceFrom}
                  onChange={e => setPriceFrom(e.target.value.replace(/\D/g, ''))}
                />
                <div className="w-px h-6 bg-border" />
                <input
                  type="text"
                  placeholder="до, ₽"
                  className="w-24 h-full px-3 text-sm bg-transparent outline-none"
                  value={priceTo}
                  onChange={e => setPriceTo(e.target.value.replace(/\D/g, ''))}
                />
              </div>

              {/* Deadline */}
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

              {/* All filters */}
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="h-12 px-4 rounded-xl border border-border bg-background hover:bg-secondary text-sm flex items-center gap-1.5 whitespace-nowrap transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Все фильтры
              </button>
            </div>
          </div>

          {/* Mobile filters row */}
          <div className="flex lg:hidden gap-2 mt-2 overflow-x-auto pb-1 scrollbar-hide">
            <div ref={ptRef} className="relative shrink-0">
              <button
                onClick={() => setPtOpen(!ptOpen)}
                className="h-10 px-3 rounded-lg border border-border bg-background text-xs flex items-center gap-1 whitespace-nowrap"
              >
                {propertyType}
                <ChevronDown className="w-3 h-3" />
              </button>
              {ptOpen && (
                <ul className="absolute top-full left-0 mt-1 py-1 bg-card border border-border rounded-lg shadow-lg z-50 min-w-[160px]">
                  {propertyTypes.map(t => (
                    <li key={t}>
                      <button onClick={() => { setPropertyType(t); setPtOpen(false); }} className="w-full text-left px-3 py-2 text-xs hover:bg-muted/50">{t}</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button className="h-10 px-3 rounded-lg border border-border bg-background text-xs whitespace-nowrap shrink-0">Цена</button>
            <div ref={dlRef} className="relative shrink-0">
              <button
                onClick={() => setDlOpen(!dlOpen)}
                className="h-10 px-3 rounded-lg border border-border bg-background text-xs flex items-center gap-1 whitespace-nowrap"
              >
                {deadline}
                <ChevronDown className="w-3 h-3" />
              </button>
              {dlOpen && (
                <ul className="absolute top-full left-0 mt-1 py-1 bg-card border border-border rounded-lg shadow-lg z-50 min-w-[120px]">
                  {deadlines.map(d => (
                    <li key={d}>
                      <button onClick={() => { setDeadline(d); setDlOpen(false); }} className="w-full text-left px-3 py-2 text-xs hover:bg-muted/50">{d}</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="h-10 px-3 rounded-lg border border-border bg-background text-xs flex items-center gap-1 whitespace-nowrap shrink-0"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Фильтры
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between mt-3 sm:mt-4 gap-3">
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <Link
                to="/map"
                className="flex items-center gap-2 h-11 px-5 rounded-xl border border-border bg-background text-sm font-medium hover:bg-secondary transition-colors"
              >
                <MapPin className="w-4 h-4 text-primary" />
                На карте
              </Link>
              <Button onClick={doSearch} className="h-11 px-6 rounded-xl text-sm font-medium shadow-sm">
                58 728 квартир в 370 ЖК
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSearch;
