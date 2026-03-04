import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Calculator, MapPin, Building2, CalendarDays, Ruler, ChefHat, Layers, Paintbrush } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RedesignHeader from '@/redesign/components/RedesignHeader';
import { getApartmentById, formatPrice } from '@/redesign/data/mock-data';

const RedesignApartment = () => {
  const { id } = useParams<{ id: string }>();
  const result = getApartmentById(id || '');

  if (!result) {
    return (
      <div className="min-h-screen bg-background">
        <RedesignHeader />
        <div className="max-w-[1400px] mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Квартира не найдена</p>
          <Link to="/redesign/catalog" className="text-primary text-sm mt-2 inline-block">← Каталог</Link>
        </div>
      </div>
    );
  }

  const { apartment: apt, complex, building } = result;

  const details = [
    { icon: Layers, label: 'Комнат', value: apt.rooms === 0 ? 'Студия' : `${apt.rooms}` },
    { icon: Ruler, label: 'Площадь', value: `${apt.area} м²` },
    { icon: ChefHat, label: 'Кухня', value: `${apt.kitchenArea} м²` },
    { icon: Building2, label: 'Этаж', value: `${apt.floor} из ${apt.totalFloors}` },
    { icon: Paintbrush, label: 'Отделка', value: apt.finishing },
    { icon: CalendarDays, label: 'Сдача', value: building.deadline },
  ];

  return (
    <div className="min-h-screen bg-background">
      <RedesignHeader />
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <Link to={`/redesign/complex/${complex.slug}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> {complex.name}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Plan */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="aspect-[4/3] bg-muted flex items-center justify-center p-8">
                <img src={apt.planImage} alt="Планировка" className="max-w-full max-h-full object-contain" />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs text-muted-foreground mb-1">{complex.name} · {building.name}</p>
              <h1 className="text-2xl font-bold mb-1">{apt.rooms === 0 ? 'Студия' : `${apt.rooms}-комнатная`}, {apt.area} м²</h1>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                <MapPin className="w-3.5 h-3.5" />
                {complex.address} · м. {complex.subway}
              </div>

              <div className="border-t border-border pt-4 mb-4">
                <p className="text-3xl font-bold">{formatPrice(apt.price)}</p>
                <p className="text-sm text-muted-foreground">{apt.pricePerMeter.toLocaleString('ru-RU')} ₽/м²</p>
              </div>

              <div className="space-y-3">
                {details.map(d => (
                  <div key={d.label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><d.icon className="w-4 h-4" />{d.label}</span>
                    <span className="font-medium capitalize">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
              <Button className="w-full h-11"><Phone className="w-4 h-4 mr-2" /> Позвонить</Button>
              <Button variant="outline" className="w-full h-11"><MessageCircle className="w-4 h-4 mr-2" /> Записаться на просмотр</Button>
              <Button variant="secondary" className="w-full h-11"><Calculator className="w-4 h-4 mr-2" /> Рассчитать ипотеку</Button>
            </div>

            {/* Builder */}
            <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-xs font-bold text-muted-foreground">{complex.builder.charAt(0)}</div>
              <div>
                <p className="text-sm font-semibold">{complex.builder}</p>
                <p className="text-xs text-muted-foreground">Застройщик</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedesignApartment;
