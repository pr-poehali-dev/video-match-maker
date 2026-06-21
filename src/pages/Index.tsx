import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const IMG_1 = 'https://cdn.poehali.dev/projects/9df3bbc5-6dd9-4564-ab49-b7688afd02ac/files/5b79f9e1-ca67-411a-b2a6-c3957d9b7b25.jpg';
const IMG_2 = 'https://cdn.poehali.dev/projects/9df3bbc5-6dd9-4564-ab49-b7688afd02ac/files/519a18f4-8b7d-4bd8-b486-fa80d6f02fcf.jpg';

const NAV = [
  { icon: 'House', label: 'Лента' },
  { icon: 'CirclePlay', label: 'Сториз' },
  { icon: 'Radio', label: 'Трансляции' },
  { icon: 'Search', label: 'Поиск' },
  { icon: 'Bell', label: 'Уведомления' },
  { icon: 'Mail', label: 'Сообщения' },
  { icon: 'User', label: 'Профиль' },
];

const STORIES = [
  { name: 'Анна', color: 'from-orange-400 to-rose-400' },
  { name: 'Игорь', color: 'from-sky-400 to-indigo-400' },
  { name: 'Маша', color: 'from-emerald-400 to-teal-400' },
  { name: 'Костя', color: 'from-amber-400 to-orange-400' },
  { name: 'Лена', color: 'from-fuchsia-400 to-purple-400' },
  { name: 'Дима', color: 'from-cyan-400 to-blue-400' },
  { name: 'Соня', color: 'from-pink-400 to-red-400' },
];

const LIVE = [
  { name: 'Дарья К.', title: 'Утренняя йога в прямом эфире', viewers: '1.2K', img: IMG_2 },
  { name: 'Артём М.', title: 'Разбор кода и Q&A', viewers: '843', img: IMG_1 },
];

const POSTS = [
  {
    author: 'Дарья Кравцова',
    handle: '@daria',
    time: '2 ч',
    text: 'Поймала рассвет в горах. Иногда нужно просто остановиться и подышать.',
    img: IMG_2,
    likes: 1248,
    comments: 86,
  },
  {
    author: 'Артём Морозов',
    handle: '@artyom',
    time: '5 ч',
    text: 'Новое рабочее место готово. Минимум вещей — максимум фокуса.',
    img: IMG_1,
    likes: 932,
    comments: 41,
  },
];

const Index = () => {
  const [active, setActive] = useState('Лента');
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-[230px_1fr] lg:grid-cols-[230px_1fr_280px]">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col gap-1 p-6 sticky top-0 h-screen border-r border-border">
          <div className="flex items-center gap-2 px-3 mb-8">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center">
              <Icon name="Aperture" className="text-primary-foreground" size={20} />
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight">Лумен</span>
          </div>
          {NAV.map((item) =>
            item.label === 'Профиль' ? (
              <Link
                key={item.label}
                to="/profile"
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all text-muted-foreground hover:bg-secondary/60"
              >
                <Icon name={item.icon} size={21} />
                <span className="text-[15px]">{item.label}</span>
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => setActive(item.label)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all ${
                  active === item.label
                    ? 'bg-secondary font-semibold text-foreground'
                    : 'text-muted-foreground hover:bg-secondary/60'
                }`}
              >
                <Icon name={item.icon} size={21} />
                <span className="text-[15px]">{item.label}</span>
              </button>
            )
          )}
          <button className="mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
            <Icon name="Plus" size={18} />
            Создать
          </button>
        </aside>

        {/* Main feed */}
        <main className="min-h-screen border-r border-border">
          {/* Mobile header */}
          <header className="md:hidden flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur z-10">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Icon name="Aperture" className="text-primary-foreground" size={18} />
              </div>
              <span className="font-display font-extrabold text-lg">Лумен</span>
            </div>
            <Icon name="Mail" size={22} className="text-muted-foreground" />
          </header>

          {/* Stories */}
          <section className="px-5 py-5 border-b border-border">
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              <div className="flex flex-col items-center gap-2 shrink-0">
                <button className="h-16 w-16 rounded-full border-2 border-dashed border-border flex items-center justify-center hover:border-primary transition-colors">
                  <Icon name="Plus" size={22} className="text-muted-foreground" />
                </button>
                <span className="text-xs text-muted-foreground">Ваша</span>
              </div>
              {STORIES.map((s) => (
                <div key={s.name} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
                  <div className={`h-16 w-16 rounded-full p-[2.5px] bg-gradient-to-tr ${s.color} group-hover:scale-105 transition-transform`}>
                    <div className="h-full w-full rounded-full bg-background p-[2px]">
                      <div className={`h-full w-full rounded-full bg-gradient-to-tr ${s.color} flex items-center justify-center text-white font-semibold`}>
                        {s.name[0]}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-foreground">{s.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Live now */}
          <section className="px-5 py-5 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-destructive animate-pulse-ring" />
                Сейчас в эфире
              </h2>
              <button className="text-sm text-primary font-medium">Все</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {LIVE.map((l) => (
                <div key={l.name} className="relative rounded-2xl overflow-hidden aspect-[4/5] group cursor-pointer animate-scale-in">
                  <img src={l.img} alt={l.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 flex items-center gap-1 bg-destructive text-white text-[11px] font-bold px-2 py-1 rounded-full">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" /> LIVE
                  </span>
                  <span className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 text-white text-[11px] px-2 py-1 rounded-full backdrop-blur">
                    <Icon name="Eye" size={12} /> {l.viewers}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-sm font-semibold leading-tight">{l.title}</p>
                    <p className="text-xs opacity-80 mt-0.5">{l.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Feed */}
          <section className="divide-y divide-border">
            {POSTS.map((p, i) => (
              <article key={i} className="p-5 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-center gap-3 mb-3">
                  <Link to="/profile" className="h-11 w-11 rounded-full bg-gradient-to-tr from-primary to-rose-400 flex items-center justify-center text-white font-semibold shrink-0">
                    {p.author[0]}
                  </Link>
                  <Link to="/profile" className="flex-1">
                    <p className="font-semibold text-[15px] leading-tight">{p.author}</p>
                    <p className="text-xs text-muted-foreground">{p.handle} · {p.time}</p>
                  </Link>
                  <button className="px-4 py-1.5 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors">
                    Подписаться
                  </button>
                </div>
                <p className="text-[15px] leading-relaxed mb-3">{p.text}</p>
                <div className="rounded-2xl overflow-hidden mb-3">
                  <img src={p.img} alt="" className="w-full object-cover max-h-[460px]" />
                </div>
                <div className="flex items-center gap-6 text-muted-foreground">
                  <button
                    onClick={() => setLiked((s) => ({ ...s, [i]: !s[i] }))}
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Icon name="Heart" size={20} className={liked[i] ? 'fill-primary text-primary' : ''} />
                    <span className="text-sm">{p.likes + (liked[i] ? 1 : 0)}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <Icon name="MessageCircle" size={20} />
                    <span className="text-sm">{p.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <Icon name="Send" size={20} />
                  </button>
                  <button className="ml-auto hover:text-foreground transition-colors">
                    <Icon name="Bookmark" size={20} />
                  </button>
                </div>
              </article>
            ))}
          </section>
        </main>

        {/* Right rail */}
        <aside className="hidden lg:flex flex-col gap-6 p-6 sticky top-0 h-screen">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Поиск"
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-secondary text-sm outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>

          <div className="rounded-2xl bg-card border border-border p-5">
            <h3 className="font-display font-bold mb-4">Рекомендации</h3>
            <div className="space-y-4">
              {['Ольга Лебедева', 'Павел Сорокин', 'Вера Зайцева'].map((n) => (
                <div key={n} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-400 flex items-center justify-center text-white text-sm font-semibold">
                    {n[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{n}</p>
                    <p className="text-xs text-muted-foreground">Новый автор</p>
                  </div>
                  <button className="text-xs font-semibold text-primary">Читать</button>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground px-2 leading-relaxed">
            Лумен · 2026 — социальная платформа для авторов видео-контента.
          </p>
        </aside>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-background/90 backdrop-blur border-t border-border flex items-center justify-around py-2.5 z-20">
        {NAV.slice(0, 5).map((item) => (
          <button
            key={item.label}
            onClick={() => setActive(item.label)}
            className={`p-2 ${active === item.label ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Icon name={item.icon} size={24} />
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Index;