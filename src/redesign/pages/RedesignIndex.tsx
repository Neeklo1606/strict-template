import { Link } from 'react-router-dom';
import { Search, ArrowRight, Building2, MapPin, TrendingUp } from 'lucide-react';
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

const RedesignIndex = () => {
  const [q, setQ] = useState('');
  const featured = complexes.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <RedesignHeader />

      {/* Hero */}
      <section className="relative bg-muted py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 max-w-xl">Найдите идеальную квартиру в&nbsp;новостройке</h1>
          <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-lg">Актуальная база квартир от застройщиков Москвы и области. Честные цены, проверенные объекты.</p>
          <div className="flex gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Район, метро, ЖК или застройщик..." className="pl-9 h-11" value={q} onChange={e => setQ(e.target.value)} />
            </div>
            <Link to={`/redesign/catalog${q ? `?search=${q}` : ''}`}>
              <Button className="h-11 px-6">Найти</Button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {['Студия', '1-комн', '2-комн', 'До 6 млн', 'Сданные'].map(tag => (
              <Link key={tag} to="/redesign/catalog" className="px-3 py-1.5 rounded-full bg-background border border-border text-xs font-medium hover:border-primary/50 transition-colors">{tag}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1400px] mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-3 gap-4">
          {stats.map(s => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0"><s.icon className="w-5 h-5 text-accent-foreground" /></div>
              <div><p className="text-lg font-bold">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Популярные комплексы</h2>
          <Link to="/redesign/catalog" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
            Все комплексы <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map(c => <ComplexCard key={c.id} complex={c} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1400px] mx-auto px-4 pb-12">
        <div className="rounded-2xl bg-primary p-8 sm:p-12 text-primary-foreground text-center">
          <h2 className="text-2xl font-bold mb-2">Нужна помощь с выбором?</h2>
          <p className="text-sm opacity-90 mb-6 max-w-md mx-auto">Наши эксперты подберут квартиру по вашим критериям бесплатно</p>
          <Button variant="secondary" size="lg">Получить консультацию</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-[1400px] mx-auto px-4 text-center text-xs text-muted-foreground">
          © 2026 Redesign · Все права защищены
        </div>
      </footer>
    </div>
  );
};

export default RedesignIndex;
