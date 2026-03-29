import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, UserSearch, Building2, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const features = [
  {
    icon: Calculator,
    title: 'Ипотечный калькулятор',
    button: 'Рассчитаем ипотеку',
    action: 'calc',
  },
  {
    icon: UserSearch,
    title: 'Индивидуальный подбор',
    button: 'Помощь с подбором',
    action: 'modal',
  },
  {
    icon: Building2,
    title: 'Вся недвижимость',
    button: 'Все предложения',
    action: 'catalog',
  },
  {
    icon: UserCircle,
    title: 'Ваш личный кабинет',
    button: 'Войти / Зарегистрироваться',
    action: 'auth',
  },
];

const AdditionalFeatures = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', comment: '' });

  const handleAction = (action: string) => {
    switch (action) {
      case 'calc':
        navigate('/catalog');
        break;
      case 'modal':
        setModalOpen(true);
        break;
      case 'catalog':
        navigate('/catalog');
        break;
      case 'auth':
        navigate('/login');
        break;
    }
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-4">
        <h2 className="text-base sm:text-xl font-bold mb-4 sm:mb-6">Дополнительные возможности</h2>

        {/* Desktop grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              onClick={() => handleAction(f.action)}
              className="rounded-xl border border-border bg-card p-5 sm:p-6 flex flex-col items-center justify-center gap-3 cursor-pointer select-none h-[180px] sm:h-[200px] transition-all duration-200 hover:shadow-md hover:-translate-y-px hover:border-primary/30 group"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent flex items-center justify-center">
                <f.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-semibold text-foreground text-center leading-tight">{f.title}</span>
              <span className="text-primary text-[11px] font-medium group-hover:underline">{f.button}</span>
            </div>
          ))}
        </div>

        {/* Mobile swiper */}
        <div className="flex sm:hidden gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {features.map((f, i) => (
            <div
              key={i}
              onClick={() => handleAction(f.action)}
              className="min-w-[200px] snap-start shrink-0 rounded-xl border border-border bg-card p-4 flex flex-col items-center justify-center gap-2.5 cursor-pointer select-none h-[160px] transition-all duration-200 active:scale-[0.98]"
            >
              <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center">
                <f.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <span className="text-xs font-semibold text-foreground text-center leading-tight">{f.title}</span>
              <span className="text-primary text-[11px] font-medium">{f.button}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Помощь с подбором</DialogTitle>
            <DialogDescription>Оставьте заявку и мы подберём лучшие варианты</DialogDescription>
          </DialogHeader>
          <form
            className="space-y-4 mt-2"
            onSubmit={(e) => {
              e.preventDefault();
              setModalOpen(false);
              setFormData({ name: '', phone: '', comment: '' });
            }}
          >
            <input
              type="text"
              placeholder="Ваше имя"
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="tel"
              placeholder="Телефон"
              value={formData.phone}
              onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
              className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background outline-none focus:ring-2 focus:ring-primary/30"
            />
            <textarea
              placeholder="Комментарий"
              value={formData.comment}
              onChange={(e) => setFormData((p) => ({ ...p, comment: e.target.value }))}
              rows={3}
              className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
            <Button type="submit" className="w-full rounded-xl h-12">
              Отправить заявку
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AdditionalFeatures;
