import PropertyCard, { type PropertyData } from './PropertyCard';
import building1 from '@/assets/building1.jpg';
import building2 from '@/assets/building2.jpg';
import building3 from '@/assets/building3.jpg';
import building4 from '@/assets/building4.jpg';

const hotDeals: PropertyData[] = [
  { image: building2, title: 'ЖК Высотный', price: 'от 8.9 млн', address: 'Москва, Ленинский пр-т', area: '52 м²', rooms: '2 комн.', badges: ['Скидка 10%'] },
  { image: building1, title: 'ЖК Солнечный', price: 'от 5.1 млн', address: 'Москва, ул. Солнечная', area: '34 м²', rooms: '1 комн.', badges: ['Акция'] },
  { image: building3, title: 'ЖК Престиж', price: 'от 15.2 млн', address: 'Москва, Тверская', area: '78 м²', rooms: '3 комн.' },
  { image: building4, title: 'ЖК Зеленый', price: 'от 6.7 млн', address: 'МО, г. Красногорск', area: '42 м²', rooms: '1 комн.' },
];

const startSales: PropertyData[] = [
  { image: building3, title: 'ЖК Новый Город', price: 'от 4.5 млн', address: 'МО, г. Балашиха', area: '30 м²', rooms: 'Студия', badges: ['Старт продаж'] },
  { image: building2, title: 'ЖК Метрополь', price: 'от 11.8 млн', address: 'Москва, Арбат', area: '65 м²', rooms: '2 комн.', badges: ['Новинка'] },
  { image: building1, title: 'ЖК Ривьера', price: 'от 7.3 млн', address: 'Москва, наб. Москвы', area: '48 м²', rooms: '1 комн.' },
  { image: building4, title: 'ЖК Династия', price: 'от 22.1 млн', address: 'Москва, Хамовники', area: '95 м²', rooms: '3 комн.' },
];

interface Props { title: string; type: 'hot' | 'start'; }

const PropertyGridSection = ({ title, type }: Props) => {
  const data = type === 'hot' ? hotDeals : startSales;
  return (
    <section className="py-8">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button className="text-primary text-sm font-medium hover:underline">Все предложения →</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((p, i) => (
            <PropertyCard key={i} data={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyGridSection;
