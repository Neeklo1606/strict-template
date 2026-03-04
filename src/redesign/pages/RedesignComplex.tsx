import { useParams, Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RedesignHeader from '@/redesign/components/RedesignHeader';
import ComplexHero from '@/redesign/components/ComplexHero';
import ApartmentTable from '@/redesign/components/ApartmentTable';
import Chessboard from '@/redesign/components/Chessboard';
import LayoutGrid from '@/redesign/components/LayoutGrid';
import { getComplexBySlug, getLayoutGroups } from '@/redesign/data/mock-data';
import type { Apartment, SortField, SortDir } from '@/redesign/data/types';

const RedesignComplex = () => {
  const { slug } = useParams<{ slug: string }>();
  const complex = getComplexBySlug(slug || '');
  const [sort, setSort] = useState<{ field: SortField; dir: SortDir }>({ field: 'price', dir: 'asc' });
  const [roomFilter, setRoomFilter] = useState<number | null>(null);

  const allApartments = useMemo(() => {
    if (!complex) return [];
    let apts = complex.buildings.flatMap(b => b.apartments).filter(a => a.status !== 'sold');
    if (roomFilter !== null) apts = apts.filter(a => a.rooms === roomFilter);
    apts.sort((a, b) => {
      const m = sort.dir === 'asc' ? 1 : -1;
      return (a[sort.field] - b[sort.field]) * m;
    });
    return apts;
  }, [complex, sort, roomFilter]);

  const layouts = useMemo(() => complex ? getLayoutGroups(complex.id) : [], [complex]);

  const handleSort = (field: SortField) => {
    setSort(prev => ({ field, dir: prev.field === field && prev.dir === 'asc' ? 'desc' : 'asc' }));
  };

  if (!complex) {
    return (
      <div className="min-h-screen bg-background">
        <RedesignHeader />
        <div className="max-w-[1400px] mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Комплекс не найден</p>
          <Link to="/redesign/catalog" className="text-primary text-sm mt-2 inline-block">← Вернуться в каталог</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <RedesignHeader />
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <Link to="/redesign/catalog" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> Каталог
        </Link>

        <ComplexHero complex={complex} />

        <Tabs defaultValue="apartments" className="mt-6">
          <TabsList className="w-full justify-start bg-muted/50 rounded-xl p-1 h-auto flex-wrap">
            <TabsTrigger value="apartments" className="rounded-lg text-sm">Квартиры ({allApartments.length})</TabsTrigger>
            <TabsTrigger value="layouts" className="rounded-lg text-sm">Планировки ({layouts.length})</TabsTrigger>
            <TabsTrigger value="chess" className="rounded-lg text-sm">Шахматка</TabsTrigger>
            <TabsTrigger value="about" className="rounded-lg text-sm">О комплексе</TabsTrigger>
            <TabsTrigger value="infra" className="rounded-lg text-sm">Инфраструктура</TabsTrigger>
          </TabsList>

          <TabsContent value="apartments" className="mt-4">
            <div className="flex gap-2 mb-4 flex-wrap">
              <button onClick={() => setRoomFilter(null)} className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${roomFilter === null ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary/50'}`}>Все</button>
              {[1, 2, 3, 4].map(r => (
                <button key={r} onClick={() => setRoomFilter(r)} className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${roomFilter === r ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary/50'}`}>{r}-комн</button>
              ))}
            </div>
            <ApartmentTable apartments={allApartments} sort={sort} onSort={handleSort} />
          </TabsContent>

          <TabsContent value="layouts" className="mt-4">
            <LayoutGrid layouts={layouts} complexSlug={complex.slug} />
          </TabsContent>

          <TabsContent value="chess" className="mt-4 space-y-6">
            {complex.buildings.map(b => (
              <Chessboard key={b.id} apartments={b.apartments} floors={b.floors} sections={b.sections} buildingName={b.name} />
            ))}
          </TabsContent>

          <TabsContent value="about" className="mt-4">
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h3 className="font-semibold">О комплексе</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{complex.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                <div><p className="text-xs text-muted-foreground">Адрес</p><p className="text-sm font-medium">{complex.address}</p></div>
                <div><p className="text-xs text-muted-foreground">Застройщик</p><p className="text-sm font-medium">{complex.builder}</p></div>
                <div><p className="text-xs text-muted-foreground">Район</p><p className="text-sm font-medium">{complex.district}</p></div>
                <div><p className="text-xs text-muted-foreground">Метро</p><p className="text-sm font-medium">{complex.subway} ({complex.subwayDistance})</p></div>
                <div><p className="text-xs text-muted-foreground">Срок сдачи</p><p className="text-sm font-medium">{complex.deadline}</p></div>
                <div><p className="text-xs text-muted-foreground">Корпусов</p><p className="text-sm font-medium">{complex.buildings.length}</p></div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="infra" className="mt-4">
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold mb-4">Инфраструктура</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {complex.infrastructure.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RedesignComplex;
