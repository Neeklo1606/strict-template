import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import newsConstruction from '@/assets/news-construction.jpg';
import newsOffice from '@/assets/news-office.jpg';
import complex1 from '@/assets/complex-1.jpg';
import newsInterior from '@/assets/news-interior.jpg';

const news = [
  { image: newsConstruction, title: 'Обзор новостроек Москвы: что выбрать', date: '28 мар 2026', category: 'Обзор' },
  { image: newsOffice, title: 'Ипотечные ставки снижены до 6%', date: '25 мар 2026', category: 'Ипотека' },
  { image: complex1, title: 'Новый жилой комплекс на юге Москвы', date: '22 мар 2026', category: 'Новостройки' },
  { image: newsInterior, title: 'Как выбрать квартиру: советы экспертов', date: '19 мар 2026', category: 'Советы' },
];

const LatestNews = () => (
  <section className="py-8 sm:py-12">
    <div className="max-w-[1400px] mx-auto px-4">
      {/* Unified section header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-base sm:text-xl font-bold">Последние новости</h2>
        <Link
          to="/news"
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-border text-xs sm:text-sm font-medium hover:bg-secondary transition-colors"
        >
          Все новости
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Desktop grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {news.map((n, i) => (
          <a key={i} href="#" className="rounded-xl overflow-hidden bg-card border border-border hover:shadow-md hover:-translate-y-px transition-all duration-200 group">
            <div className="overflow-hidden h-[160px]">
              <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200" />
            </div>
            <div className="p-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold leading-tight bg-accent text-accent-foreground mb-1.5">{n.category}</span>
              <h3 className="font-semibold text-sm leading-tight truncate">{n.title}</h3>
              <span className="text-[11px] text-muted-foreground mt-0.5 block">{n.date}</span>
            </div>
          </a>
        ))}
      </div>

      {/* Mobile swiper */}
      <div className="flex sm:hidden gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
        {news.map((n, i) => (
          <a key={i} href="#" className="min-w-[260px] snap-start shrink-0 rounded-xl overflow-hidden bg-card border border-border hover:shadow-md transition-all duration-200 group">
            <div className="overflow-hidden h-[140px]">
              <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200" />
            </div>
            <div className="p-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold leading-tight bg-accent text-accent-foreground mb-1.5">{n.category}</span>
              <h3 className="font-semibold text-sm leading-tight truncate">{n.title}</h3>
              <span className="text-[11px] text-muted-foreground mt-0.5 block">{n.date}</span>
            </div>
          </a>
        ))}
      </div>

      <Link
        to="/news"
        className="flex sm:hidden items-center justify-center gap-1.5 mt-3 py-2 rounded-xl border border-border text-xs font-medium hover:bg-secondary transition-colors"
      >
        Все новости
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  </section>
);

export default LatestNews;
