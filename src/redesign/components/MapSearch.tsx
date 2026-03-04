import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { ResidentialComplex } from '@/redesign/data/types';
import { formatPrice } from '@/redesign/data/mock-data';

declare global {
  interface Window { ymaps: any; }
}

const DEFAULT_CENTER = [55.751244, 37.618423];
const DEFAULT_ZOOM = 11;

interface Props {
  complexes: ResidentialComplex[];
  activeSlug?: string | null;
  onSelect?: (slug: string) => void;
}

const MapSearch = ({ complexes, activeSlug, onSelect }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.ymaps) { window.ymaps.ready(() => setReady(true)); return; }
    const s = document.createElement('script');
    s.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    s.async = true;
    s.onload = () => window.ymaps.ready(() => setReady(true));
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    if (!ready || !mapRef.current || mapInstance.current) return;
    mapInstance.current = new window.ymaps.Map(mapRef.current, {
      center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM,
      controls: ['zoomControl', 'geolocationControl'],
    });
  }, [ready]);

  useEffect(() => {
    if (!mapInstance.current) return;
    const map = mapInstance.current;
    markersRef.current.forEach(m => map.geoObjects.remove(m));
    markersRef.current = [];

    complexes.forEach(c => {
      const pm = new window.ymaps.Placemark(c.coords, {
        balloonContentHeader: `<strong>${c.name}</strong>`,
        balloonContentBody: `<div style="max-width:220px"><div style="font-weight:700;margin-bottom:4px">от ${formatPrice(c.priceFrom)}</div><div style="font-size:12px;color:#666">${c.district} · м.${c.subway}</div><a href="/redesign/complex/${c.slug}" style="color:#2563eb;font-size:13px;margin-top:4px;display:block">Подробнее →</a></div>`,
      }, { preset: 'islands#blueCircleDotIcon' });
      pm.events.add('click', () => onSelect?.(c.slug));
      map.geoObjects.add(pm);
      markersRef.current.push(pm);
    });
  }, [complexes, ready]);

  const centerOn = useCallback((slug: string) => {
    const c = complexes.find(x => x.slug === slug);
    if (c && mapInstance.current) mapInstance.current.setCenter(c.coords, 14, { duration: 400 });
    onSelect?.(slug);
  }, [complexes, onSelect]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[70vh]">
      <div ref={mapRef} className="flex-1 rounded-2xl overflow-hidden border border-border bg-muted min-h-[300px]" />
      <div className="w-full lg:w-[360px] overflow-y-auto space-y-2 shrink-0">
        {complexes.map(c => (
          <button
            key={c.slug}
            onClick={() => centerOn(c.slug)}
            className={cn(
              'w-full text-left rounded-xl border p-3 transition-colors',
              activeSlug === c.slug ? 'border-primary bg-accent' : 'border-border bg-card hover:border-primary/50'
            )}
          >
            <p className="font-semibold text-sm">{c.name}</p>
            <p className="text-xs text-muted-foreground">{c.district} · м. {c.subway}</p>
            <p className="text-sm font-bold mt-1">от {formatPrice(c.priceFrom)}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MapSearch;
