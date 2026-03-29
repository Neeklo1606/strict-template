import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RedesignHeader from '@/redesign/components/RedesignHeader';
import HeroSearch from '@/redesign/components/HeroSearch';
import ComplexCard from '@/redesign/components/ComplexCard';
import MapSearch from '@/redesign/components/MapSearch';
import QuizSection from '@/components/QuizSection';
import PropertyGridSection from '@/components/PropertyGridSection';
import AboutPlatform from '@/components/AboutPlatform';
import AdditionalFeatures from '@/components/AdditionalFeatures';

import LatestNews from '@/components/LatestNews';
import ContactsSection from '@/components/ContactsSection';
import FooterSection from '@/components/FooterSection';
import { complexes } from '@/redesign/data/mock-data';
import { useState } from 'react';

const RedesignIndex = () => {
  const [viewMode, setViewMode] = useState<'cards' | 'map'>('cards');
  const [activeComplex, setActiveComplex] = useState<string | null>(null);
  const featured = complexes.slice(0, 6);

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <RedesignHeader />
      <HeroSearch />
      

      {/* Featured */}
      <section className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Популярные комплексы</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Самые востребованные ЖК Москвы</p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setViewMode('map')}
              className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-colors bg-background border-border hover:bg-secondary"
            >
              <MapPin className="w-4 h-4" />
              На карте
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className="px-4 py-2 rounded-full border text-sm transition-colors bg-background border-border hover:bg-secondary"
            >
              Все предложения
            </button>
          </div>
        </div>
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map(c => <ComplexCard key={c.id} complex={c} />)}
          </div>
        ) : (
          <MapSearch complexes={featured} activeSlug={activeComplex} onSelect={setActiveComplex} height="450px" />
        )}
      </section>

      <PropertyGridSection title="Горячие предложения" type="hot" />
      <PropertyGridSection title="Старт продаж" type="start" />

      <div id="quiz-section">
        <QuizSection />
      </div>

      <AboutPlatform />

      <section className="max-w-[1400px] mx-auto px-4 pb-8">
        <Link to="/map" className="block rounded-2xl bg-muted border border-border p-8 sm:p-10 hover:border-primary/30 transition-colors group">
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

      <section className="max-w-[1400px] mx-auto px-4 pb-12">
        <div className="rounded-2xl bg-primary p-8 sm:p-12 text-primary-foreground text-center">
          <h2 className="text-2xl font-bold mb-2">Нужна помощь с выбором?</h2>
          <p className="text-sm opacity-90 mb-6 max-w-md mx-auto">Наши эксперты подберут квартиру по вашим критериям бесплатно</p>
          <Button variant="secondary" size="lg" className="shadow-sm">Получить консультацию</Button>
        </div>
      </section>

      <AdditionalFeatures />
      <LatestNews />
      <ContactsSection />
      <FooterSection />
    </div>
  );
};

export default RedesignIndex;
