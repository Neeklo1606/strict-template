import { useState, useRef } from 'react';
import PropertyCard, { type PropertyData } from './PropertyCard';
import StartSaleCard, { type StartSaleData } from './StartSaleCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, Flame, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import complex1 from '@/assets/complex-1.jpg';
import complex2 from '@/assets/complex-2.jpg';
import complex3 from '@/assets/complex-3.jpg';
import complex4 from '@/assets/complex-4.jpg';

const hotDeals: PropertyData[] = [
  { image: complex2, title: 'ЖК Высотный', price: 'от 8.9 млн', address: 'Москва, Ленинский пр-т', area: '52 м²', rooms: '2 комн.', badges: ['Скидка 10%'] },
  { image: complex1, title: 'ЖК Солнечный', price: 'от 5.1 млн', address: 'Москва, ул. Солнечная', area: '34 м²', rooms: '1 комн.', badges: ['Акция'] },
  { image: complex3, title: 'ЖК Престиж', price: 'от 15.2 млн', address: 'Москва, Тверская', area: '78 м²', rooms: '3 комн.', badges: ['Горячее предложение'] },
  { image: complex4, title: 'ЖК Зеленый', price: 'от 6.7 млн', address: 'МО, г. Красногорск', area: '42 м²', rooms: '1 комн.', badges: ['Скидка 5%'] },
];

const startSales: StartSaleData[] = [
  { image: complex3, title: 'ЖК Новый Город', price: 'от 4.5 млн', address: 'МО, г. Балашиха', district: 'Балашиха', badges: ['Старт продаж'], developer: 'ПИК', apartments: [
    { type: 'Студия', price: 'от 3.8 млн', count: 15 }, { type: '1-комн.', price: 'от 4.5 млн', count: 32 }, { type: '2-комн.', price: 'от 6.9 млн', count: 20 }, { type: '3-комн.', price: 'от 9.2 млн', count: 8 },
  ]},
  { image: complex2, title: 'ЖК Метрополь', price: 'от 11.8 млн', address: 'Москва, Арбат', district: 'Арбат', badges: ['Старт продаж'], developer: 'Донстрой', apartments: [
    { type: '1-комн.', price: 'от 11.8 млн', count: 18 }, { type: '2-комн.', price: 'от 18.5 млн', count: 12 }, { type: '3-комн.', price: 'от 28.0 млн', count: 6 },
  ]},
  { image: complex1, title: 'ЖК Ривьера', price: 'от 7.3 млн', address: 'Москва, наб. Москвы', district: 'Хамовники', badges: ['Старт продаж'], developer: 'ЛСР', apartments: [
    { type: 'Студия', price: 'от 5.1 млн', count: 10 }, { type: '1-комн.', price: 'от 7.3 млн', count: 22 }, { type: '2-комн.', price: 'от 12.4 млн', count: 14 },
  ]},
  { image: complex4, title: 'ЖК Династия', price: 'от 22.1 млн', address: 'Москва, Хамовники', district: 'Хамовники', badges: ['Старт продаж'], developer: 'Capital Group', apartments: [
    { type: '2-комн.', price: 'от 22.1 млн', count: 8 }, { type: '3-комн.', price: 'от 35.0 млн', count: 5 }, { type: '4-комн.', price: 'от 52.0 млн', count: 3 },
  ]},
];

interface Props { title: string; type: 'hot' | 'start'; }

const PropertyGridSection = ({ title, type }: Props) => {
  const data = type === 'hot' ? hotDeals : startSales;
  const [helpOpen, setHelpOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHot = type === 'hot';
  const isStart = type === 'start';

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.75;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className={cn('py-8 sm:py-12', isHot && 'bg-accent/30')}>
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Section header — unified pattern */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            {isHot && <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-destructive" />}
            <h2 className="text-base sm:text-xl font-bold">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Desktop arrows */}
            <div className="hidden lg:flex items-center gap-1.5">
              <button onClick={() => scroll('left')} className="w-8 h-8 rounded-full border border-border bg-background flex items-center justify-center hover:bg-secondary transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => scroll('right')} className="w-8 h-8 rounded-full border border-border bg-background flex items-center justify-center hover:bg-secondary transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            {isStart ? (
              <Button size="sm" className="hidden sm:flex rounded-xl text-xs" onClick={() => setHelpOpen(true)}>
                Помощь с подбором
              </Button>
            ) : (
              <Link
                to="/catalog"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-border text-xs sm:text-sm font-medium hover:bg-secondary transition-colors"
              >
                Все предложения
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Cards — swipe on mobile, grid on lg */}
        <div
          ref={scrollRef}
          className="flex lg:grid lg:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0"
        >
          {isStart
            ? (data as StartSaleData[]).map((p, i) => (
                <div key={i} className="min-w-[260px] sm:min-w-[280px] lg:min-w-0 snap-start shrink-0">
                  <StartSaleCard data={p} />
                </div>
              ))
            : (data as PropertyData[]).map((p, i) => (
                <div key={i} className="min-w-[260px] sm:min-w-[280px] lg:min-w-0 snap-start shrink-0">
                  <PropertyCard data={p} variant="hot" />
                </div>
              ))
          }
        </div>

        {/* Mobile action link */}
        {isStart ? (
          <button
            onClick={() => setHelpOpen(true)}
            className="flex sm:hidden items-center justify-center gap-1.5 mt-3 py-2 w-full rounded-xl border border-border text-xs font-medium hover:bg-secondary transition-colors"
          >
            Помощь с подбором
          </button>
        ) : (
          <Link
            to="/catalog"
            className="flex sm:hidden items-center justify-center gap-1.5 mt-3 py-2 rounded-xl border border-border text-xs font-medium hover:bg-secondary transition-colors"
          >
            Все предложения
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Помощь с подбором</DialogTitle>
          </DialogHeader>
          <form className="space-y-4 mt-2" onSubmit={(e) => { e.preventDefault(); setHelpOpen(false); }}>
            <Input placeholder="Ваше имя" />
            <Input placeholder="Телефон" type="tel" />
            <Input placeholder="Бюджет, например: до 10 млн" />
            <Button type="submit" className="w-full">Отправить заявку</Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PropertyGridSection;
