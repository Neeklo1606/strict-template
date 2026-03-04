import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Phone, Menu, LogIn, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Каталог', href: '/redesign/catalog' },
  { label: 'Карта', href: '/redesign/map' },
  { label: 'Застройщики', href: '/redesign/catalog?tab=builders' },
];

const RedesignHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Link to="/redesign" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">RE</span>
            </div>
            <span className="hidden sm:block font-semibold text-sm">Redesign</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'px-3 py-1.5 text-sm rounded-lg transition-colors',
                  location.pathname === item.href ? 'bg-accent text-accent-foreground font-medium' : 'hover:text-primary'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 text-sm">
            <a href="tel:+74950000000" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4 text-muted-foreground" />
              +7 (495) 000-00-00
            </a>
            <Link to="/login" className="bg-primary text-primary-foreground px-5 py-1.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1.5">
              <LogIn className="w-4 h-4" /> Войти
            </Link>
          </div>

          <button className="lg:hidden" onClick={() => setMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-background flex flex-col">
          <div className="flex items-center justify-between h-14 px-4 border-b border-border">
            <span className="font-semibold">Меню</span>
            <button onClick={() => setMenuOpen(false)}><X className="w-6 h-6" /></button>
          </div>
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map(item => (
              <Link key={item.href} to={item.href} onClick={() => setMenuOpen(false)}
                className="py-3 px-4 rounded-xl text-sm hover:bg-accent transition-colors">{item.label}</Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default RedesignHeader;
