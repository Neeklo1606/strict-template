import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import RedesignHeader from '@/redesign/components/RedesignHeader';
import LayoutGrid from '@/redesign/components/LayoutGrid';
import { getComplexBySlug, getLayoutGroups } from '@/redesign/data/mock-data';
import { useMemo } from 'react';

const RedesignLayouts = () => {
  const { complex: slug } = useParams<{ complex: string }>();
  const complex = getComplexBySlug(slug || '');
  const layouts = useMemo(() => complex ? getLayoutGroups(complex.id) : [], [complex]);

  if (!complex) {
    return (
      <div className="min-h-screen bg-background">
        <RedesignHeader />
        <div className="max-w-[1400px] mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Комплекс не найден</p>
          <Link to="/redesign/catalog" className="text-primary text-sm mt-2 inline-block">← Каталог</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <RedesignHeader />
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <Link to={`/redesign/complex/${complex.slug}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> {complex.name}
        </Link>
        <h1 className="text-xl font-bold mb-6">Планировки — {complex.name}</h1>
        <LayoutGrid layouts={layouts} complexSlug={complex.slug} />
      </div>
    </div>
  );
};

export default RedesignLayouts;
