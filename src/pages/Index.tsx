import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoryTiles from '@/components/CategoryTiles';
import NewListings from '@/components/NewListings';
import CatalogZhk from '@/components/CatalogZhk';
import QuizSection from '@/components/QuizSection';
import PropertyGridSection from '@/components/PropertyGridSection';
import AboutPlatform from '@/components/AboutPlatform';
import AdditionalFeatures from '@/components/AdditionalFeatures';
import LatestNews from '@/components/LatestNews';
import ContactsSection from '@/components/ContactsSection';
import FooterSection from '@/components/FooterSection';

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <HeroSection />
    <CategoryTiles />
    <NewListings />
    <CatalogZhk />
    <QuizSection />
    <PropertyGridSection title="Горячие предложения" type="hot" />
    <PropertyGridSection title="Старт продаж" type="start" />
    <AboutPlatform />
    <AdditionalFeatures />
    <LatestNews />
    <ContactsSection />
    <FooterSection />
  </div>
);

export default Index;
