import { useCMSStore } from '../store/cms-store';
import { FileText, Image, Users, BarChart3, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { pages, media, users } = useCMSStore();

  const stats = [
    { label: 'Страницы', value: pages.length, icon: FileText, color: 'bg-blue-500/10 text-blue-600' },
    { label: 'Медиа', value: media.length, icon: Image, color: 'bg-green-500/10 text-green-600' },
    { label: 'Пользователи', value: users.length, icon: Users, color: 'bg-purple-500/10 text-purple-600' },
    { label: 'Опубликовано', value: pages.filter(p => p.status === 'published').length, icon: BarChart3, color: 'bg-amber-500/10 text-amber-600' },
  ];

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Дашборд</h1>
          <p className="text-muted-foreground text-sm mt-1">Обзор вашей CMS</p>
        </div>
        <Link
          to="/admin/pages"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Новая страница
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-background border rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-muted-foreground text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-background border rounded-2xl p-5">
        <h2 className="font-semibold mb-4">Последние страницы</h2>
        <div className="space-y-2">
          {pages.slice(0, 5).map(p => (
            <Link
              key={p.id}
              to={`/admin/editor/${p.id}`}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{p.title}</span>
                <span className="text-xs text-muted-foreground">{p.slug}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-lg ${
                p.status === 'published' ? 'bg-green-100 text-green-700' :
                p.status === 'draft' ? 'bg-amber-100 text-amber-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {p.status === 'published' ? 'Опубликовано' : p.status === 'draft' ? 'Черновик' : 'Архив'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
