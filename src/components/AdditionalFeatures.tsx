import { Home, Percent, Search, Building, Handshake, Shield } from 'lucide-react';

const features = [
  { icon: Home, title: 'Максимальная база данных' },
  { icon: Percent, title: 'Кредитный калькулятор' },
  { icon: Search, title: 'Как определить рыночную стоимость' },
  { icon: Building, title: 'Все предложения' },
  { icon: Handshake, title: 'Как купить квартиру' },
  { icon: Shield, title: 'Безопасная сделка' },
];

const AdditionalFeatures = () => (
  <section className="py-12">
    <div className="max-w-[1400px] mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Дополнительные возможности</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {features.map((f, i) => (
          <div key={i} className="bg-secondary rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow min-h-[140px] justify-center">
            <f.icon className="w-10 h-10 text-primary mb-3" />
            <span className="text-sm font-medium leading-tight">{f.title}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AdditionalFeatures;
