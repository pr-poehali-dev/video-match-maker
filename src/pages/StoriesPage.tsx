import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const IMG_1 = 'https://cdn.poehali.dev/projects/9df3bbc5-6dd9-4564-ab49-b7688afd02ac/files/5b79f9e1-ca67-411a-b2a6-c3957d9b7b25.jpg';
const IMG_2 = 'https://cdn.poehali.dev/projects/9df3bbc5-6dd9-4564-ab49-b7688afd02ac/files/519a18f4-8b7d-4bd8-b486-fa80d6f02fcf.jpg';

const STORIES_LIST = [
  { name: 'Дарья', handle: '@daria', color: 'from-orange-400 to-rose-400', img: IMG_2, time: '2 ч', text: 'Поймала рассвет в горах ✦', seen: false },
  { name: 'Артём', handle: '@artyom', color: 'from-sky-400 to-indigo-400', img: IMG_1, time: '3 ч', text: 'Новое рабочее место 🖥', seen: false },
  { name: 'Маша', handle: '@masha', color: 'from-emerald-400 to-teal-400', img: IMG_2, time: '5 ч', text: 'Горный воздух — лучшее лекарство', seen: true },
  { name: 'Костя', handle: '@kostya', color: 'from-amber-400 to-orange-400', img: IMG_1, time: '6 ч', text: 'Работаю из кафе', seen: true },
  { name: 'Лена', handle: '@lena', color: 'from-fuchsia-400 to-purple-400', img: IMG_2, time: '8 ч', text: 'Закат был просто фантастическим 🌅', seen: true },
  { name: 'Игорь', handle: '@igor', color: 'from-cyan-400 to-blue-400', img: IMG_1, time: '10 ч', text: 'Новый проект запущен!', seen: true },
];

const StoriesPage = () => {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<Record<number, boolean>>({});
  const [reply, setReply] = useState('');

  const story = STORIES_LIST[active];
  const progress = seen[active] ? 100 : 60;

  const goNext = () => {
    setSeen((s) => ({ ...s, [active]: true }));
    if (active < STORIES_LIST.length - 1) setActive((v) => v + 1);
  };
  const goPrev = () => { if (active > 0) setActive((v) => v - 1); };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 py-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur z-10">
        <Link to="/" className="p-2 -ml-2 hover:bg-secondary rounded-full transition-colors">
          <Icon name="ArrowLeft" size={22} />
        </Link>
        <span className="font-display font-bold text-lg flex-1">Сториз</span>
      </header>

      <div className="max-w-5xl mx-auto px-5 py-6 lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
        {/* List */}
        <aside className="hidden lg:block space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Новые</p>
          {STORIES_LIST.filter((_, i) => !seen[i] && !STORIES_LIST[i].seen).map((s, i) => (
            <button key={i} onClick={() => setActive(i)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-colors ${active === i ? 'bg-secondary' : 'hover:bg-secondary/60'}`}>
              <div className={`h-12 w-12 rounded-full p-[2px] bg-gradient-to-tr ${s.color} shrink-0`}>
                <div className="h-full w-full rounded-full bg-background p-[1.5px]">
                  <div className={`h-full w-full rounded-full bg-gradient-to-tr ${s.color} flex items-center justify-center text-white font-semibold text-sm`}>{s.name[0]}</div>
                </div>
              </div>
              <div className="text-left min-w-0">
                <p className="font-semibold text-sm">{s.name}</p>
                <p className="text-xs text-muted-foreground truncate">{s.text}</p>
              </div>
            </button>
          ))}
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-4 mb-3">Просмотренные</p>
          {STORIES_LIST.filter((s, i) => seen[i] || s.seen).map((s, i) => {
            const realIndex = STORIES_LIST.indexOf(s);
            return (
              <button key={i} onClick={() => setActive(realIndex)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-colors ${active === realIndex ? 'bg-secondary' : 'hover:bg-secondary/60'}`}>
                <div className="h-12 w-12 rounded-full border-2 border-border shrink-0 flex items-center justify-center bg-muted text-muted-foreground font-semibold text-sm">{s.name[0]}</div>
                <div className="text-left min-w-0">
                  <p className="font-semibold text-sm text-muted-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{s.text}</p>
                </div>
              </button>
            );
          })}
        </aside>

        {/* Viewer */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-sm">
            {/* Progress bars */}
            <div className="flex gap-1 mb-3">
              {STORIES_LIST.map((_, i) => (
                <div key={i} className="flex-1 h-0.5 rounded-full bg-border overflow-hidden">
                  <div className={`h-full bg-foreground rounded-full transition-all duration-300 ${i < active || seen[i] ? 'w-full' : i === active ? `w-[${progress}%]` : 'w-0'}`} style={{ width: i < active || seen[i] ? '100%' : i === active ? `${progress}%` : '0%' }} />
                </div>
              ))}
            </div>

            {/* Story card */}
            <div className="relative rounded-3xl overflow-hidden aspect-[9/16] bg-black animate-scale-in">
              <img src={story.img} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

              {/* Author */}
              <div className="absolute top-4 inset-x-4 flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full bg-gradient-to-tr ${story.color} flex items-center justify-center text-white font-semibold text-sm`}>{story.name[0]}</div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{story.name}</p>
                  <p className="text-white/70 text-xs">{story.time}</p>
                </div>
                <button className="text-white/80 hover:text-white"><Icon name="X" size={20} /></button>
              </div>

              {/* Text */}
              <div className="absolute bottom-16 inset-x-4">
                <p className="text-white text-lg font-medium leading-snug">{story.text}</p>
              </div>

              {/* Nav zones */}
              <button onClick={goPrev} className="absolute left-0 top-0 w-1/3 h-full" />
              <button onClick={goNext} className="absolute right-0 top-0 w-1/3 h-full" />
            </div>

            {/* Reply */}
            <div className="flex gap-2 mt-3">
              <input
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder={`Ответить ${story.name}...`}
                className="flex-1 bg-secondary rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring/30"
              />
              <button onClick={() => setReply('')} className="px-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
                <Icon name="SendHorizontal" size={18} />
              </button>
            </div>

            {/* Mobile list */}
            <div className="flex gap-3 mt-5 overflow-x-auto no-scrollbar lg:hidden pb-2">
              {STORIES_LIST.map((s, i) => (
                <button key={i} onClick={() => setActive(i)} className="flex flex-col items-center gap-1.5 shrink-0">
                  <div className={`h-14 w-14 rounded-full p-[2px] ${seen[i] || s.seen ? 'bg-border' : `bg-gradient-to-tr ${s.color}`}`}>
                    <div className="h-full w-full rounded-full bg-background p-[1.5px]">
                      <div className={`h-full w-full rounded-full flex items-center justify-center font-semibold text-sm text-white ${seen[i] || s.seen ? 'bg-muted text-muted-foreground' : `bg-gradient-to-tr ${s.color}`}`}>{s.name[0]}</div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{s.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-background/90 backdrop-blur border-t border-border flex items-center justify-around py-2.5 z-20">
        <Link to="/" className="p-2 text-muted-foreground"><Icon name="House" size={24} /></Link>
        <Link to="/stories" className="p-2 text-primary"><Icon name="CirclePlay" size={24} /></Link>
        <Link to="/live" className="p-2 text-muted-foreground"><Icon name="Radio" size={24} /></Link>
        <Link to="/search" className="p-2 text-muted-foreground"><Icon name="Search" size={24} /></Link>
        <Link to="/profile" className="p-2 text-muted-foreground"><Icon name="User" size={24} /></Link>
      </nav>
    </div>
  );
};

export default StoriesPage;
