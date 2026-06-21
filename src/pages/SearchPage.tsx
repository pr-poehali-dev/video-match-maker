import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const IMG_1 = 'https://cdn.poehali.dev/projects/9df3bbc5-6dd9-4564-ab49-b7688afd02ac/files/5b79f9e1-ca67-411a-b2a6-c3957d9b7b25.jpg';
const IMG_2 = 'https://cdn.poehali.dev/projects/9df3bbc5-6dd9-4564-ab49-b7688afd02ac/files/519a18f4-8b7d-4bd8-b486-fa80d6f02fcf.jpg';

const CATEGORIES = ['Всё', 'Видео', 'Авторы', 'Эфиры', 'Тэги'];

const TRENDING = ['#горы', '#закат', '#минимализм', '#путешествия', '#йога', '#природа', '#работа', '#вдохновение'];

const RESULTS = [
  { type: 'video', img: IMG_2, title: 'Рассвет в горах Алтая', author: 'Дарья К.', views: '31.2K', dur: '0:55' },
  { type: 'author', name: 'Дарья Кравцова', handle: '@daria', subs: '34.2K', color: 'from-orange-400 to-rose-400' },
  { type: 'video', img: IMG_1, title: 'Минимализм в рабочем пространстве', author: 'Артём М.', views: '8.1K', dur: '1:20' },
  { type: 'author', name: 'Артём Морозов', handle: '@artyom', subs: '12.5K', color: 'from-sky-400 to-indigo-400' },
  { type: 'video', img: IMG_2, title: 'Утренняя йога — начни день правильно', author: 'Дарья К.', views: '24.9K', dur: '0:30' },
  { type: 'video', img: IMG_1, title: 'Как я организую своё рабочее время', author: 'Артём М.', views: '5.6K', dur: '2:10' },
];

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('Всё');

  const filtered = query
    ? RESULTS.filter((r) =>
        (r.type === 'video' && r.title.toLowerCase().includes(query.toLowerCase())) ||
        (r.type === 'author' && r.name.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <header className="flex items-center gap-3 px-5 py-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur z-10">
        <Link to="/" className="p-2 -ml-2 hover:bg-secondary rounded-full transition-colors">
          <Icon name="ArrowLeft" size={22} />
        </Link>
        <div className="flex-1 flex items-center gap-2 bg-secondary rounded-2xl px-4 py-2.5">
          <Icon name="Search" size={18} className="text-muted-foreground shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск видео и авторов..."
            className="flex-1 bg-transparent text-sm outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-muted-foreground">
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </header>

      <div className="max-w-2xl mx-auto">
        {/* Categories */}
        <div className="flex gap-2 px-5 py-4 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium shrink-0 transition-all ${cat === c ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/70'}`}
            >
              {c}
            </button>
          ))}
        </div>

        {!query ? (
          <div className="px-5">
            <h2 className="font-display font-bold text-lg mb-4">В тренде</h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {TRENDING.map((t) => (
                <button
                  key={t}
                  onClick={() => setQuery(t.replace('#', ''))}
                  className="px-4 py-2 bg-secondary hover:bg-secondary/70 rounded-full text-sm transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>

            <h2 className="font-display font-bold text-lg mb-4">Популярное сейчас</h2>
            <div className="grid grid-cols-2 gap-3">
              {RESULTS.filter((r) => r.type === 'video').map((r, i) => (
                <Link to="/video" key={i} className="relative rounded-2xl overflow-hidden aspect-video group">
                  <img src={r.img} alt={r.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <p className="text-xs font-semibold line-clamp-2 leading-snug">{r.title}</p>
                    <p className="text-[10px] opacity-70 mt-0.5">{r.views} просмотров</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="px-5 space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">Ничего не найдено по запросу «{query}»</p>
              </div>
            ) : (
              filtered.map((r, i) => (
                r.type === 'video' ? (
                  <Link to="/video" key={i} className="flex gap-3 group animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
                    <div className="relative w-36 shrink-0 rounded-xl overflow-hidden aspect-video">
                      <img src={r.img} alt={r.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">{r.dur}</span>
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <p className="font-medium text-sm leading-snug line-clamp-2">{r.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{r.author}</p>
                      <p className="text-xs text-muted-foreground">{r.views} просмотров</p>
                    </div>
                  </Link>
                ) : (
                  <Link to="/profile" key={i} className="flex items-center gap-3 py-1 animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
                    <div className={`h-12 w-12 rounded-full bg-gradient-to-tr ${r.color} flex items-center justify-center text-white font-semibold shrink-0`}>{r.name[0]}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.handle} · {r.subs} подписчиков</p>
                    </div>
                    <button className="px-4 py-1.5 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors">
                      Читать
                    </button>
                  </Link>
                )
              ))
            )}
          </div>
        )}
      </div>

      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-background/90 backdrop-blur border-t border-border flex items-center justify-around py-2.5 z-20">
        <Link to="/" className="p-2 text-muted-foreground"><Icon name="House" size={24} /></Link>
        <Link to="/stories" className="p-2 text-muted-foreground"><Icon name="CirclePlay" size={24} /></Link>
        <Link to="/live" className="p-2 text-muted-foreground"><Icon name="Radio" size={24} /></Link>
        <Link to="/search" className="p-2 text-primary"><Icon name="Search" size={24} /></Link>
        <Link to="/profile" className="p-2 text-muted-foreground"><Icon name="User" size={24} /></Link>
      </nav>
    </div>
  );
};

export default SearchPage;
