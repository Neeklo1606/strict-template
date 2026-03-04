import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import type { Apartment } from '@/redesign/data/types';
import { formatPrice } from '@/redesign/data/mock-data';

interface Props {
  apartments: Apartment[];
  floors: number;
  sections: number;
  buildingName: string;
}

const statusBg: Record<string, string> = {
  available: 'bg-green-100 hover:bg-green-200 border-green-300 text-green-800',
  reserved: 'bg-amber-100 border-amber-300 text-amber-800',
  sold: 'bg-muted border-border text-muted-foreground',
};

const Chessboard = ({ apartments, floors, sections, buildingName }: Props) => {
  const grid = new Map<string, Apartment>();
  apartments.forEach(a => {
    grid.set(`${a.floor}-${a.section}`, a);
  });

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">{buildingName}</h3>
      <div className="overflow-x-auto">
        <div className="inline-grid gap-1" style={{ gridTemplateColumns: `40px repeat(${sections}, minmax(80px, 1fr))` }}>
          {/* Header */}
          <div className="text-xs text-muted-foreground font-medium flex items-center justify-center">Эт.</div>
          {Array.from({ length: sections }, (_, s) => (
            <div key={s} className="text-xs text-muted-foreground font-medium text-center py-1">Секц. {s + 1}</div>
          ))}

          {/* Floors top to bottom */}
          {Array.from({ length: floors }, (_, fi) => {
            const floor = floors - fi;
            return (
              <>
                <div key={`f-${floor}`} className="text-xs text-muted-foreground flex items-center justify-center font-medium">{floor}</div>
                {Array.from({ length: sections }, (_, s) => {
                  const apt = grid.get(`${floor}-${s + 1}`);
                  if (!apt) return <div key={`${floor}-${s}`} className="h-12 bg-muted/30 rounded border border-border/50" />;
                  return (
                    <Link
                      key={`${floor}-${s}`}
                      to={apt.status !== 'sold' ? `/redesign/apartment/${apt.id}` : '#'}
                      className={cn(
                        'h-12 rounded border text-[10px] leading-tight flex flex-col items-center justify-center transition-colors',
                        statusBg[apt.status],
                        apt.status === 'sold' && 'pointer-events-none opacity-60'
                      )}
                    >
                      <span className="font-medium">{apt.rooms}к · {apt.area}м²</span>
                      <span>{formatPrice(apt.price)}</span>
                    </Link>
                  );
                })}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Chessboard;
