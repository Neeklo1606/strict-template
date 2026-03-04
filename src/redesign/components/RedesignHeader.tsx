import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Phone, Menu, X, Search, MapPin, Building2, Home, LayoutGrid, Map as MapIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { searchComplexes } from '@/redesign/data/mock-data';
import type { ResidentialComplex } from '@/redesign/data/types';

const navItems = [
  { label: 'Каталог', href: '/redesign/catalog' },
  { label: 'На карте', href: '/redesign/map' },
  { label: 'Застройщики', href: '/redesign/catalog?tab=builders' },
];

const RedesignHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ResidentialComplex[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setResults(searchComplexes(q)), 200);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/redesign" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <Home className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="hidden sm:block font-semibold text-sm tracking-tight">Недвижимость</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'px-3.5 py-2 text-sm rounded-lg transition-colors',
                  location.pathname === item.href
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop search */}
          <div ref={searchRef} className="hidden lg:block relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="ЖК, район, метро..."
              className="pl-9 h-10 bg-muted/50 border-transparent focus:border-border focus:bg-background text-sm"
              value={query}
              onFocus={() => setSearchOpen(true)}
              onChange={e => handleSearch(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && query) { navigate(`/redesign/catalog?search=${query}`); setSearchOpen(false); } }}
            />
            {searchOpen && results.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50">
                {results.map(c => (
                  <Link
                    key={c.id}
                    to={`/redesign/complex/${c.slug}`}
                    onClick={() => { setSearchOpen(false); setQuery(''); }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border last:border-0"
                  >
                    <img src={c.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.district} · м. {c.subway}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-3 text-sm shrink-0">
            <a href="tel:+74950000000" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm">+7 (495) 000-00-00</span>
            </a>
          </div>

          {/* Mobile buttons */}
          <div className="flex lg:hidden items-center gap-2">
            <button onClick={() => setSearchOpen(!searchOpen)} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => setMenuOpen(true)} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="lg:hidden border-t border-border px-4 py-3 bg-background">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="ЖК, район, метро..."
                className="pl-9 h-10"
                autoFocus
                value={query}
                onChange={e => handleSearch(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && query) { navigate(`/redesign/catalog?search=${query}`); setSearchOpen(false); } }}
              />
            </div>
            {results.length > 0 && (
              <div className="mt-2 bg-card border border-border rounded-xl overflow-hidden">
                {results.map(c => (
                  <Link
                    key={c.id}
                    to={`/redesign/complex/${c.slug}`}
                    onClick={() => { setSearchOpen(false); setQuery(''); }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border last:border-0"
                  >
                    <img src={c.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.district} · м. {c.subway}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-background flex flex-col animate-in slide-in-from-right">
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            <span className="font-semibold">Меню</span>
            <button onClick={() => setMenuOpen(false)} className="w-10 h-10 flex items-center justify-center"><X className="w-5 h-5" /></button>
          </div>
          <nav className="flex flex-col p-4 gap-1">
            {navItems.map(item => (
              <Link key={item.href} to={item.href} onClick={() => setMenuOpen(false)}
                className="py-3 px-4 rounded-xl text-sm font-medium hover:bg-accent transition-colors">{item.label}</Link>
            ))}
          </nav>
          <div className="mt-auto p-4 border-t border-border">
            <a href="tel:+74950000000" className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" /> +7 (495) 000-00-00
            </a>
          </div>
        </div>
      )}

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border safe-area-bottom">
        <div className="flex items-center justify-around h-14">
          <Link to="/redesign" className={cn('flex flex-col items-center gap-0.5 text-[10px] py-1', location.pathname === '/redesign' ? 'text-primary' : 'text-muted-foreground')}>
            <Home className="w-5 h-5" />
            <span>Главная</span>
          </Link>
          <Link to="/redesign/catalog" className={cn('flex flex-col items-center gap-0.5 text-[10px] py-1', location.pathname === '/redesign/catalog' ? 'text-primary' : 'text-muted-foreground')}>
            <LayoutGrid className="w-5 h-5" />
            <span>Каталог</span>
          </Link>
          <Link to="/redesign/map" className={cn('flex flex-col items-center gap-0.5 text-[10px] py-1', location.pathname === '/redesign/map' ? 'text-primary' : 'text-muted-foreground')}>
            <MapIcon className="w-5 h-5" />
            <span>Карта</span>
          </Link>
          <Link to="/redesign/catalog" className={cn('flex flex-col items-center gap-0.5 text-[10px] py-1', 'text-muted-foreground')}>
            <Building2 className="w-5 h-5" />
            <span>Застройщики</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RedesignHeader;
