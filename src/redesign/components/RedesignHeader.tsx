import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Phone, Menu, X, Search, Home, LayoutGrid, Heart, LogIn, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { searchComplexes } from '@/redesign/data/mock-data';
import type { ResidentialComplex } from '@/redesign/data/types';

const catalogCategories = [
  { label: 'Квартиры', href: '/catalog?type=apartments', sub: [
    { label: 'Новостройки', href: '/catalog?type=apartments&market=new' },
    { label: 'Вторичка', href: '/catalog?type=apartments&market=secondary' },
  ]},
  { label: 'Дома', href: '/catalog?type=houses' },
  { label: 'Участки', href: '/catalog?type=land' },
  { label: 'Коммерческая недвижимость', href: '/catalog?type=commercial' },
];

const RedesignHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ResidentialComplex[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setResults(searchComplexes(q)), 200);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
      if (catalogRef.current && !catalogRef.current.contains(e.target as Node)) setCatalogOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 flex items-center justify-center">
              <img src="/logo.svg" alt="Live Grid" className="w-full h-full object-contain" />
            </div>
            <span className="hidden sm:block font-semibold text-sm tracking-tight">Live Grid</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Каталог with dropdown */}
            <div ref={catalogRef} className="relative">
              <button
                onClick={() => setCatalogOpen(!catalogOpen)}
                className={cn(
                  'px-3.5 py-2 text-sm rounded-lg transition-colors flex items-center gap-1',
                  catalogOpen
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                Каталог
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', catalogOpen && 'rotate-180')} />
              </button>
              {catalogOpen && (
                <div className="absolute top-full left-0 mt-1 py-2 bg-card border border-border rounded-xl shadow-lg z-50 min-w-[260px]">
                  {catalogCategories.map(item => (
                    <div key={item.href}>
                      <Link
                        to={item.href}
                        onClick={() => setCatalogOpen(false)}
                        className="block px-4 py-2.5 text-sm font-medium hover:bg-muted/50 transition-colors"
                      >
                        {item.label}
                      </Link>
                      {'sub' in item && item.sub && (
                        <div className="pl-4">
                          {item.sub.map(sub => (
                            <Link
                              key={sub.href}
                              to={sub.href}
                              onClick={() => setCatalogOpen(false)}
                              className="block px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/catalog?city=belgorod"
              className={cn(
                'px-3.5 py-2 text-sm rounded-lg transition-colors',
                'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              Белгород
            </Link>
            <Link
              to="/mortgage"
              className={cn(
                'px-3.5 py-2 text-sm rounded-lg transition-colors',
                'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              Ипотека
            </Link>
            <Link
              to="#contacts"
              className={cn(
                'px-3.5 py-2 text-sm rounded-lg transition-colors',
                'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              Контакты
            </Link>
          </nav>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link
              to="/favorites"
              className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-secondary transition-colors"
              title="Избранное"
            >
              <Heart className="w-6 h-6 text-muted-foreground" />
            </Link>
            <div className="w-px h-5 bg-border" />
            <a
              href="tel:+79045393434"
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm hover:text-primary hover:bg-muted/50 transition-colors"
            >
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span>+7 (904) 539-34-34</span>
            </a>
            <Link
              to="/register"
              className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <LogIn className="w-4 h-4" />
              Войти
            </Link>
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
          <div className="lg:hidden border-t border-border px-4 py-3 bg-background animate-in slide-in-from-top-2 duration-200">
            <div ref={searchRef} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Район, метро, ЖК, улица..."
                className="pl-9 h-10"
                autoFocus
                value={query}
                onChange={e => handleSearch(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && query) { navigate(`/catalog?search=${query}`); setSearchOpen(false); } }}
              />
              {results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50">
                  {results.map(c => (
                    <Link
                      key={c.id}
                      to={`/complex/${c.slug}`}
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
            <p className="px-4 pt-2 pb-1 text-xs text-muted-foreground font-medium uppercase tracking-wider">Каталог</p>
            {catalogCategories.map(item => (
              <div key={item.href}>
                <Link to={item.href} onClick={() => setMenuOpen(false)}
                  className="py-3 px-4 rounded-xl text-sm font-medium hover:bg-accent transition-colors block">{item.label}</Link>
                {'sub' in item && item.sub && item.sub.map(sub => (
                  <Link key={sub.href} to={sub.href} onClick={() => setMenuOpen(false)}
                    className="py-2 px-8 rounded-xl text-xs text-muted-foreground hover:bg-accent transition-colors block">{sub.label}</Link>
                ))}
              </div>
            ))}
            <div className="h-px bg-border my-2" />
            <Link to="/catalog?city=belgorod" onClick={() => setMenuOpen(false)} className="py-3 px-4 rounded-xl text-sm font-medium hover:bg-accent transition-colors">Белгород</Link>
            <Link to="/mortgage" onClick={() => setMenuOpen(false)} className="py-3 px-4 rounded-xl text-sm font-medium hover:bg-accent transition-colors">Ипотека</Link>
            <Link to="#contacts" onClick={() => setMenuOpen(false)} className="py-3 px-4 rounded-xl text-sm font-medium hover:bg-accent transition-colors">Контакты</Link>
          </nav>
          <div className="mt-auto p-4 border-t border-border space-y-3">
            <a href="tel:+79045393434" className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" /> +7 (904) 539-34-34
            </a>
            <Link to="/register" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-full py-2.5 text-sm font-medium">
              <LogIn className="w-4 h-4" /> Войти
            </Link>
          </div>
        </div>
      )}

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border safe-area-bottom">
        <div className="flex items-center justify-around h-14">
          <Link to="/" className={cn('flex flex-col items-center gap-0.5 text-[10px] py-1', location.pathname === '/' ? 'text-primary' : 'text-muted-foreground')}>
            <Home className="w-5 h-5" />
            <span>Главная</span>
          </Link>
          <Link to="/catalog" className={cn('flex flex-col items-center gap-0.5 text-[10px] py-1', location.pathname === '/catalog' ? 'text-primary' : 'text-muted-foreground')}>
            <LayoutGrid className="w-5 h-5" />
            <span>Каталог</span>
          </Link>
          <Link to="/favorites" className={cn('flex flex-col items-center gap-0.5 text-[10px] py-1', 'text-muted-foreground')}>
            <Heart className="w-5 h-5" />
            <span>Избранное</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RedesignHeader;
