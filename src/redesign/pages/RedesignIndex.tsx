import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RedesignHeader from '@/redesign/components/RedesignHeader';
import HeroSearch from '@/redesign/components/HeroSearch';
import ComplexCard from '@/redesign/components/ComplexCard';
import QuizSection from '@/components/QuizSection';
import PropertyGridSection from '@/components/PropertyGridSection';
import AboutPlatform from '@/components/AboutPlatform';
import AdditionalFeatures from '@/components/AdditionalFeatures';
import LatestNews from '@/components/LatestNews';
import ContactsSection from '@/components/ContactsSection';
import FooterSection from '@/components/FooterSection';
import { complexes } from '@/redesign/data/mock-data';

const RedesignIndex = () => {
  const featured = complexes.slice(0, 4);

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <RedesignHeader />
      <HeroSearch />

      {/* Популярные ЖК — clean showcase */}
      <section className="max-w-[1400px] mx-auto px-4 py-10 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-bold">Популярные ЖК</h2>
          <div className="flex items-center gap-2">
            <Link
              to="/map"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-border text-xs sm:text-sm font-medium hover:bg-secondary transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-primary" />
              На карте
            </Link>
            <Link
              to="/catalog"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-border text-xs sm:text-sm font-medium hover:bg-secondary transition-colors"
            >
              Все предложения
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Desktop: 4 cols, Tablet: 3, Mobile: 2 compact */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {featured.map(c => <ComplexCard key={c.id} complex={c} />)}
        </div>

        {/* Mobile "all" link */}
        <Link
          to="/catalog"
          className="flex sm:hidden items-center justify-center gap-1.5 mt-4 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors"
        >
          Все предложения
          <ArrowRight className="w-4 h-4" />
        </Link>
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
