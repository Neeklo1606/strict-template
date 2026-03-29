import { useState, useRef } from 'react';
import PropertyCard, { type PropertyData } from './PropertyCard';
import StartSaleCard, { type StartSaleData } from './StartSaleCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import building1 from '@/assets/building1.jpg';
import building2 from '@/assets/building2.jpg';
import building3 from '@/assets/building3.jpg';
import building4 from '@/assets/building4.jpg';

const hotDeals: PropertyData[] = [
  { image: building2, title: 'ЖК Высотный', price: 'от 8.9 млн', address: 'Москва, Ленинский пр-т', area: '52 м²', rooms: '2 комн.', badges: ['Скидка 10%'] },
  { image: building1, title: 'ЖК Солнечный', price: 'от 5.1 млн', address: 'Москва, ул. Солнечная', area: '34 м²', rooms: '1 комн.', badges: ['Акция'] },
  { image: building3, title: 'ЖК Престиж', price: 'от 15.2 млн', address: 'Москва, Тверская', area: '78 м²', rooms: '3 комн.', badges: ['Горячее предложение'] },
  { image: building4, title: 'ЖК Зеленый', price: 'от 6.7 млн', address: 'МО, г. Красногорск', area: '42 м²', rooms: '1 комн.', badges: ['Скидка 5%'] },
];

const startSales: StartSaleData[] = [
  { image: building3, title: 'ЖК Новый Город', price: 'от 4.5 млн', address: 'МО, г. Балашиха', badges: ['Старт 2 кв. 2026'], developer: 'ПИК', description: 'Новый район с развитой инфраструктурой', apartments: [
    { type: 'Студия', price: 'от 3.8 млн', count: 15 }, { type: '1-комн.', price: 'от 4.5 млн', count: 32 }, { type: '2-комн.', price: 'от 6.9 млн', count: 20 }, { type: '3-комн.', price: 'от 9.2 млн', count: 8 },
  ]},
  { image: building2, title: 'ЖК Метрополь', price: 'от 11.8 млн', address: 'Москва, Арбат', badges: ['Старт 2 кв. 2027'], developer: 'Донстрой', description: 'Премиальный комплекс в центре', apartments: [
    { type: '1-комн.', price: 'от 11.8 млн', count: 18 }, { type: '2-комн.', price: 'от 18.5 млн', count: 12 }, { type: '3-комн.', price: 'от 28.0 млн', count: 6 },
  ]},
  { image: building1, title: 'ЖК Ривьера', price: 'от 7.3 млн', address: 'Москва, наб. Москвы', badges: ['Старт 2 кв. 2027'], developer: 'ЛСР', description: 'Видовые квартиры у воды', apartments: [
    { type: 'Студия', price: 'от 5.1 млн', count: 10 }, { type: '1-комн.', price: 'от 7.3 млн', count: 22 }, { type: '2-комн.', price: 'от 12.4 млн', count: 14 },
  ]},
  { image: building4, title: 'ЖК Династия', price: 'от 22.1 млн', address: 'Москва, Хамовники', badges: ['Старт 2 кв. 2027'], developer: 'Capital Group', description: 'Элитный район Москвы', apartments: [
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
    <section className={cn('py-8', isHot && 'bg-accent/30')}>
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <div className="flex items-center gap-2">
            {isHot && <Flame className="w-5 h-5 text-destructive" />}
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
          <div className="flex items-center gap-3">
            {/* Desktop arrows */}
            <div className="hidden lg:flex items-center gap-1.5">
              <button onClick={() => scroll('left')} className="w-8 h-8 rounded-full border border-border bg-background flex items-center justify-center hover:bg-secondary transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => scroll('right')} className="w-8 h-8 rounded-full border border-border bg-background flex items-center justify-center hover:bg-secondary transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            {type === 'start' ? (
              <Button size="lg" className="w-full sm:w-auto" onClick={() => setHelpOpen(true)}>
                Помощь с подбором
              </Button>
            ) : (
              <a href="/catalog" className="text-primary text-sm font-medium hover:underline">Все предложения →</a>
            )}
          </div>
        </div>

        {/* Cards — swipe on mobile, grid on lg */}
        <div
          ref={scrollRef}
          className="flex lg:grid lg:grid-cols-4 gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0"
        >
          {data.map((p, i) => (
            <div key={i} className="min-w-[280px] sm:min-w-[300px] lg:min-w-0 snap-start">
              <PropertyCard data={p} variant={isHot ? 'hot' : 'default'} />
            </div>
          ))}
        </div>
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
