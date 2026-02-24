import { Heart } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface PropertyData {
  image: string;
  title: string;
  price: string;
  address: string;
  area?: string;
  rooms?: string;
  badges?: string[];
  slug?: string;
}

const PropertyCard = ({ data }: { data: PropertyData }) => {
  const [liked, setLiked] = useState(false);
  const slug = data.slug || data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-zа-яё0-9-]/gi, '');
  return (
    <Link to={`/object/${slug}`} className="rounded-2xl overflow-hidden bg-card border border-border hover:shadow-lg transition-shadow group block">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={data.image} alt={data.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {data.badges && data.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {data.badges.map((b, i) => (
              <span key={i} className="px-2.5 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium">{b}</span>
            ))}
          </div>
        )}
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center"
          onClick={() => setLiked(!liked)}
        >
          <Heart className={cn("w-4 h-4", liked ? "fill-destructive text-destructive" : "text-muted-foreground")} />
        </button>
      </div>
      <div className="p-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-sm leading-tight">{data.title}</h3>
          <span className="text-sm font-bold whitespace-nowrap">{data.price}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{data.address}</p>
        <div className="flex gap-3 mt-1.5 text-xs text-muted-foreground">
          {data.area && <span>{data.area}</span>}
          {data.rooms && <span>{data.rooms}</span>}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
