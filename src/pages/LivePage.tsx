import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const IMG_1 = 'https://cdn.poehali.dev/projects/9df3bbc5-6dd9-4564-ab49-b7688afd02ac/files/5b79f9e1-ca67-411a-b2a6-c3957d9b7b25.jpg';
const IMG_2 = 'https://cdn.poehali.dev/projects/9df3bbc5-6dd9-4564-ab49-b7688afd02ac/files/519a18f4-8b7d-4bd8-b486-fa80d6f02fcf.jpg';

const LIVE_LIST = [
  { name: 'Дарья Кравцова', handle: '@daria', title: 'Утренняя йога в прямом эфире', viewers: '1.2K', img: IMG_2, color: 'from-orange-400 to-rose-400', tags: ['Йога', 'Здоровье'] },
  { name: 'Артём Морозов', handle: '@artyom', title: 'Разбор кода и Q&A с подписчиками', viewers: '843', img: IMG_1, color: 'from-sky-400 to-indigo-400', tags: ['Код', 'IT'] },
  { name: 'Маша Иванова', handle: '@masha', title: 'Рисую акварелью в прямом эфире', viewers: '521', img: IMG_2, color: 'from-emerald-400 to-teal-400', tags: ['Арт', 'Живопись'] },
  { name: 'Костя Лебедев', handle: '@kostya', title: 'Путешествие по Алтаю — день 3', viewers: '2.1K', img: IMG_1, color: 'from-amber-400 to-orange-400', tags: ['Путешествия', 'Горы'] },
];

const CHAT = [
  { author: 'Игорь', text: 'Привет всем! 👋', color: 'from-sky-400 to-indigo-400' },
  { author: 'Маша', text: 'Как красиво!', color: 'from-emerald-400 to-teal-400' },
  { author: 'Лена', text: 'Продолжай, ты молодец! ❤️', color: 'from-fuchsia-400 to-purple-400' },
  { author: 'Дима', text: 'Откуда это снято?', color: 'from-cyan-400 to-blue-400' },
];

const LivePage = () => {
  const [active, setActive] = useState(0);
  const [chatMsg, setChatMsg] = useState('');
  const [chat, setChat] = useState(CHAT);

  const live = LIVE_LIST[active];

  const sendMsg = () => {
    if (!chatMsg.trim()) return;
    setChat([...chat, { author: 'Вы', text: chatMsg, color: 'from-primary to-rose-400' }]);
    setChatMsg('');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center gap-3 px-5 py-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur z-10">
        <Link to="/" className="p-2 -ml-2 hover:bg-secondary rounded-full transition-colors">
          <Icon name="ArrowLeft" size={22} />
        </Link>
        <span className="font-display font-bold text-lg flex-1">Трансляции</span>
        <span className="flex items-center gap-1.5 text-destructive text-sm font-semibold">
          <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" /> LIVE
        </span>
      </header>

      <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-[1fr_320px] lg:gap-0">
        {/* Player */}
        <div>
          <div className="relative bg-black aspect-video">
            <img src={live.img} alt={live.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute top-4 left-4 flex items-center gap-1.5 bg-destructive text-white text-xs font-bold px-3 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> LIVE
            </span>
            <span className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
              <Icon name="Eye" size={14} /> {live.viewers}
            </span>
            <div className="absolute bottom-4 inset-x-4 text-white">
              <h2 className="font-display font-bold text-xl">{live.title}</h2>
              <p className="text-sm opacity-80 mt-1">{live.name}</p>
            </div>
          </div>

          {/* Author bar */}
          <div className="px-5 py-4 flex items-center gap-3 border-b border-border">
            <Link to="/profile" className={`h-11 w-11 rounded-full bg-gradient-to-tr ${live.color} flex items-center justify-center text-white font-semibold shrink-0`}>
              {live.name[0]}
            </Link>
            <Link to="/profile" className="flex-1">
              <p className="font-semibold">{live.name}</p>
              <p className="text-xs text-muted-foreground">{live.handle}</p>
            </Link>
            <button className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
              Подписаться
            </button>
          </div>

          {/* Other streams (desktop) */}
          <div className="hidden lg:block px-5 py-4">
            <p className="font-display font-bold mb-3">Другие эфиры</p>
            <div className="grid grid-cols-2 gap-3">
              {LIVE_LIST.filter((_, i) => i !== active).map((l, i) => (
                <button key={i} onClick={() => setActive(LIVE_LIST.indexOf(l))} className="relative rounded-2xl overflow-hidden aspect-video group text-left">
                  <img src={l.img} alt={l.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute top-2 left-2 bg-destructive text-white text-[10px] font-bold px-2 py-0.5 rounded-full">LIVE</span>
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <p className="text-xs font-semibold leading-tight line-clamp-2">{l.title}</p>
                    <p className="text-[10px] opacity-70 mt-0.5">{l.viewers} зрителей</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile streams list */}
          <div className="lg:hidden px-5 py-4">
            <p className="font-display font-bold mb-3">Другие эфиры</p>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {LIVE_LIST.filter((_, i) => i !== active).map((l, i) => (
                <button key={i} onClick={() => setActive(LIVE_LIST.indexOf(l))} className="relative rounded-2xl overflow-hidden aspect-video w-48 shrink-0 group">
                  <img src={l.img} alt={l.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute top-2 left-2 bg-destructive text-white text-[10px] font-bold px-2 py-0.5 rounded-full">LIVE</span>
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <p className="text-xs font-semibold line-clamp-1">{l.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="lg:border-l border-border flex flex-col" style={{ height: 'calc(100vh - 65px)' }}>
          <div className="px-4 py-3 border-b border-border font-semibold text-sm">Чат эфира</div>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 no-scrollbar">
            {chat.map((m, i) => (
              <div key={i} className="flex gap-2.5 animate-fade-in">
                <div className={`h-7 w-7 rounded-full bg-gradient-to-tr ${m.color} flex items-center justify-center text-white text-xs font-semibold shrink-0`}>{m.author[0]}</div>
                <div>
                  <span className="text-xs font-semibold mr-2">{m.author}</span>
                  <span className="text-sm">{m.text}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-border flex gap-2">
            <input
              value={chatMsg}
              onChange={(e) => setChatMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMsg()}
              placeholder="Написать в чат..."
              className="flex-1 bg-secondary rounded-xl px-3 py-2 text-sm outline-none"
            />
            <button onClick={sendMsg} className="px-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              <Icon name="SendHorizontal" size={18} />
            </button>
          </div>
        </div>
      </div>

      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-background/90 backdrop-blur border-t border-border flex items-center justify-around py-2.5 z-20">
        <Link to="/" className="p-2 text-muted-foreground"><Icon name="House" size={24} /></Link>
        <Link to="/stories" className="p-2 text-muted-foreground"><Icon name="CirclePlay" size={24} /></Link>
        <Link to="/live" className="p-2 text-primary"><Icon name="Radio" size={24} /></Link>
        <Link to="/search" className="p-2 text-muted-foreground"><Icon name="Search" size={24} /></Link>
        <Link to="/profile" className="p-2 text-muted-foreground"><Icon name="User" size={24} /></Link>
      </nav>
    </div>
  );
};

export default LivePage;
