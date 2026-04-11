import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle } from 'lucide-react';

interface Props {
  title?: string;
  source?: string;
  className?: string;
}

const LeadForm = ({ title = 'Получить консультацию', source = 'lead_form', className = '' }: Props) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    // TODO: POST /api/requests
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`bg-card border border-border rounded-xl p-6 sm:p-8 text-center ${className}`}>
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <h3 className="font-bold text-lg mb-1">Спасибо!</h3>
        <p className="text-sm text-muted-foreground">Менеджер свяжется в течение 2 часов</p>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-xl p-6 sm:p-8 ${className}`}>
      <h3 className="font-bold text-lg mb-4">{title}</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          placeholder="Имя"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="h-11"
        />
        <Input
          type="tel"
          placeholder="Телефон"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          className="h-11"
        />
        <Textarea
          placeholder="Комментарий (необязательно)"
          value={comment}
          onChange={e => setComment(e.target.value)}
          rows={3}
        />
        <Button type="submit" className="w-full h-11" disabled={loading}>
          {loading ? 'Отправка...' : 'Отправить заявку'}
        </Button>
        <p className="text-[10px] text-muted-foreground text-center">
          Нажимая кнопку, вы соглашаетесь с{' '}
          <a href="/privacy" className="underline hover:text-foreground">политикой конфиденциальности</a>
        </p>
      </form>
    </div>
  );
};

export default LeadForm;
