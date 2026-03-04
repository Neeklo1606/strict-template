import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { Apartment, SortField, SortDir } from '@/redesign/data/types';
import { formatPrice } from '@/redesign/data/mock-data';

interface Props {
  apartments: Apartment[];
  sort: { field: SortField; dir: SortDir };
  onSort: (field: SortField) => void;
}

const statusColors: Record<string, string> = {
  available: 'text-green-600',
  reserved: 'text-amber-500',
  sold: 'text-muted-foreground line-through',
};

const ApartmentTable = ({ apartments, sort, onSort }: Props) => {
  const SortBtn = ({ field, label }: { field: SortField; label: string }) => (
    <button className="flex items-center gap-1 hover:text-foreground transition-colors" onClick={() => onSort(field)}>
      {label}
      <ArrowUpDown className={cn('w-3.5 h-3.5', sort.field === field ? 'text-primary' : 'text-muted-foreground/50')} />
    </button>
  );

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-20"><SortBtn field="rooms" label="Комн." /></TableHead>
            <TableHead><SortBtn field="area" label="Площадь" /></TableHead>
            <TableHead>Кухня</TableHead>
            <TableHead><SortBtn field="floor" label="Этаж" /></TableHead>
            <TableHead><SortBtn field="price" label="Цена" /></TableHead>
            <TableHead>Отделка</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="w-16"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apartments.map(a => (
            <TableRow key={a.id} className="group">
              <TableCell className="font-medium">{a.rooms === 0 ? 'Ст' : a.rooms}</TableCell>
              <TableCell>{a.area} м²</TableCell>
              <TableCell className="text-muted-foreground">{a.kitchenArea} м²</TableCell>
              <TableCell>{a.floor}/{a.totalFloors}</TableCell>
              <TableCell className="font-semibold">{formatPrice(a.price)}</TableCell>
              <TableCell className="text-muted-foreground capitalize">{a.finishing}</TableCell>
              <TableCell className={statusColors[a.status]}>{a.status === 'available' ? 'Свободна' : a.status === 'reserved' ? 'Бронь' : 'Продана'}</TableCell>
              <TableCell>
                {a.status !== 'sold' && (
                  <Link to={`/redesign/apartment/${a.id}`}>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApartmentTable;
