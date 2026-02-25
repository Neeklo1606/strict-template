import { useState } from 'react';
import { Phone, Menu } from 'lucide-react';
import BurgerMenu from './BurgerMenu';

const navItems = [
  { label: 'Каталог', href: '/catalog' },
  { label: 'Квартиры', href: '/catalog?type=apartments' },
  { label: 'Комплексы', href: '/catalog-zhk' },
  { label: 'Контакты', href: '#contacts' },
  { label: 'Всё', href: '/catalog' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">LG</span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, i) => (
              <a key={i} href={item.href} className="px-3 py-1.5 text-sm hover:text-primary transition-colors">{item.label}</a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3 text-sm">
            <a href="tel:+74950000000" className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>+7 (495) 000-00-00</span>
            </a>
          </div>
          <button className="lg:hidden" onClick={() => setMenuOpen(true)}><Menu className="w-6 h-6" /></button>
        </div>
      </header>
      <BurgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Header;
