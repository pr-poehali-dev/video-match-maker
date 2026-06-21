import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const NOTIFS = [
  { type: 'like', author: 'Игорь', text: 'оценил ваше видео «Рассвет в горах»', time: '5 мин', color: 'from-sky-400 to-indigo-400', icon: 'Heart', read: false },
  { type: 'follow', author: 'Маша', text: 'подписалась на вас', time: '20 мин', color: 'from-emerald-400 to-teal-400', icon: 'UserPlus', read: false },
  { type: 'comment', author: 'Костя', text: 'прокомментировал: «Невероятная красота! Где это снято?»', time: '1 ч', color: 'from-amber-400 to-orange-400', icon: 'MessageCircle', read: false },
  { type: 'live', author: 'Дарья', text: 'начала прямой эфир — «Утренняя йога»', time: '2 ч', color: 'from-orange-400 to-rose-400', icon: 'Radio', read: true },
  { type: 'follow', author: 'Лена', text: 'подписалась на вас', time: '3 ч', color: 'from-fuchsia-400 to-purple-400', icon: 'UserPlus', read: true },
  { type: 'like', author: 'Дима', text: 'оценил ваш комментарий', time: '5 ч', color: 'from-cyan-400 to-blue-400', icon: 'Heart', read: true },
  { type: 'comment', author: 'Соня', text: 'ответила на ваш комментарий: «Полностью согласна!»', time: '6 ч', color: 'from-pink-400 to-red-400', icon: 'MessageCircle', read: true },
  { type: 'follow', author: 'Артём', text: 'подписался на вас', time: '8 ч', color: 'from-sky-400 to-indigo-400', icon: 'UserPlus', read: true },
];

const TABS = ['Все', 'Подписки', 'Комментарии', 'Лайки'];

const NotificationsPage = () => {
  const [tab, setTab] = useState('Все');
  const [read, setRead] = useState<Record<number, boolean>>({});

  const filtered = NOTIFS.filter((n) => {
    if (tab === 'Подписки') return n.type === 'follow';
    if (tab === 'Комментарии') return n.type === 'comment';
    if (tab === 'Лайки') return n.type === 'like';
    return true;
  });

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <header className="flex items-center gap-3 px-5 py-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur z-10">
        <Link to="/" className="p-2 -ml-2 hover:bg-secondary rounded-full transition-colors">
          <Icon name="ArrowLeft" size={22} />
        </Link>
        <span className="font-display font-bold text-lg flex-1">Уведомления</span>
        <button className="text-sm text-primary font-medium hover:opacity-70 transition-opacity">
          Прочитать все
        </button>
      </header>

      <div className="max-w-2xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-2 px-5 py-4 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium shrink-0 transition-all ${tab === t ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/70'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="divide-y divide-border">
          {filtered.map((n, i) => {
            const isRead = read[i] || n.read;
            return (
              <button
                key={i}
                onClick={() => setRead((s) => ({ ...s, [i]: true }))}
                className={`w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-secondary/40 transition-colors animate-fade-in ${isRead ? '' : 'bg-accent/30'}`}
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div className="relative shrink-0">
                  <div className={`h-11 w-11 rounded-full bg-gradient-to-tr ${n.color} flex items-center justify-center text-white font-semibold`}>
                    {n.author[0]}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center ${n.type === 'like' ? 'bg-destructive' : n.type === 'follow' ? 'bg-primary' : 'bg-emerald-500'}`}>
                    <Icon name={n.icon} size={11} className="text-white fill-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-snug">
                    <span className="font-semibold">{n.author}</span> {n.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{n.time} назад</p>
                </div>
                {!isRead && (
                  <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-background/90 backdrop-blur border-t border-border flex items-center justify-around py-2.5 z-20">
        <Link to="/" className="p-2 text-muted-foreground"><Icon name="House" size={24} /></Link>
        <Link to="/stories" className="p-2 text-muted-foreground"><Icon name="CirclePlay" size={24} /></Link>
        <Link to="/live" className="p-2 text-muted-foreground"><Icon name="Radio" size={24} /></Link>
        <Link to="/search" className="p-2 text-muted-foreground"><Icon name="Search" size={24} /></Link>
        <Link to="/profile" className="p-2 text-muted-foreground"><Icon name="User" size={24} /></Link>
      </nav>
    </div>
  );
};

export default NotificationsPage;
