import { Link } from 'react-router-dom';
import { Search, ArrowRight, Building2, MapPin, TrendingUp, CalendarDays, Train } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RedesignHeader from '@/redesign/components/RedesignHeader';
import ComplexCard from '@/redesign/components/ComplexCard';
import { complexes, formatPrice } from '@/redesign/data/mock-data';
import { useState } from 'react';

const stats = [
  { icon: Building2, label: 'Жилых комплексов', value: '120+' },
  { icon: MapPin, label: 'Районов Москвы', value: '45' },
  { icon: TrendingUp, label: 'Средний рост цен', value: '+12%' },
];

const quickFilters = [
  { label: 'Студии', search: '' },
  { label: '1-комнатные', search: '' },
  { label: '2-комнатные', search: '' },
  { label: 'До 6 млн ₽', search: '' },
  { label: 'Сданные ЖК', search: '' },
  { label: 'Бизнес-класс', search: '' },
];

const RedesignIndex = () => {
  const [q, setQ] = useState('');
  const featured = complexes.slice(0, 6);

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <RedesignHeader />

      {/* Hero */}
      <section className="relative bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-4 py-16 sm:py-24 relative">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Найдите идеальную<br />квартиру в&nbsp;новостройке
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-lg">
              Актуальная база квартир от&nbsp;ведущих застройщиков Москвы и&nbsp;области. Честные цены, проверенные объекты, экспертная поддержка.
            </p>
            <div className="flex gap-2 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                <Input
                  placeholder="Район, метро, ЖК или застройщик..."
                  className="pl-10 h-12 text-sm bg-background shadow-sm"
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') window.location.href = `/redesign/catalog${q ? `?search=${q}` : ''}`; }}
                />
              </div>
              <Link to={`/redesign/catalog${q ? `?search=${q}` : ''}`}>
                <Button className="h-12 px-8 shadow-sm">Найти</Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
              {quickFilters.map(tag => (
                <Link key={tag.label} to="/redesign/catalog" className="px-3.5 py-2 rounded-full bg-background border border-border text-xs font-medium hover:border-primary/50 hover:bg-accent transition-colors shadow-sm">
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1400px] mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {stats.map(s => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shrink-0">
                <s.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Популярные комплексы</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Самые востребованные ЖК Москвы</p>
          </div>
          <Link to="/redesign/catalog" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
            Все комплексы <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map(c => <ComplexCard key={c.id} complex={c} />)}
        </div>
      </section>

      {/* Map CTA */}
      <section className="max-w-[1400px] mx-auto px-4 pb-8">
        <Link to="/redesign/map" className="block rounded-2xl bg-muted border border-border p-8 sm:p-10 hover:border-primary/30 transition-colors group">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">Поиск на карте</h3>
              <p className="text-sm text-muted-foreground">Найдите ЖК рядом с нужным метро или районом</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto hidden sm:block" />
          </div>
        </Link>
      </section>

      {/* CTA */}
      <section className="max-w-[1400px] mx-auto px-4 pb-12">
        <div className="rounded-2xl bg-primary p-8 sm:p-12 text-primary-foreground text-center">
          <h2 className="text-2xl font-bold mb-2">Нужна помощь с выбором?</h2>
          <p className="text-sm opacity-90 mb-6 max-w-md mx-auto">Наши эксперты подберут квартиру по вашим критериям бесплатно</p>
          <Button variant="secondary" size="lg" className="shadow-sm">Получить консультацию</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© 2026 Недвижимость · Все права защищены</span>
          <div className="flex gap-4">
            <Link to="/redesign/catalog" className="hover:text-foreground transition-colors">Каталог</Link>
            <Link to="/redesign/map" className="hover:text-foreground transition-colors">Карта</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RedesignIndex;
