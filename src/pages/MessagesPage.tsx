import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const CHATS = [
  { name: 'Игорь', handle: '@igor', last: 'Откуда это снято?', time: '5 мин', color: 'from-sky-400 to-indigo-400', unread: 2 },
  { name: 'Маша', handle: '@masha', last: 'Спасибо за ответ! 🙏', time: '1 ч', color: 'from-emerald-400 to-teal-400', unread: 0 },
  { name: 'Костя', handle: '@kostya', last: 'Жду новых видео!', time: '3 ч', color: 'from-amber-400 to-orange-400', unread: 1 },
  { name: 'Лена', handle: '@lena', last: 'Ты вдохновляешь ❤️', time: '6 ч', color: 'from-fuchsia-400 to-purple-400', unread: 0 },
  { name: 'Дима', handle: '@dima', last: 'Привет! Понравилось твоё видео', time: '1 д', color: 'from-cyan-400 to-blue-400', unread: 0 },
];

const HISTORY: Record<string, { from: 'me' | 'them'; text: string }[]> = {
  'Игорь': [
    { from: 'them', text: 'Привет! Видел твой рассвет в горах 🏔' },
    { from: 'me', text: 'Привет! Спасибо, рада что понравилось 😊' },
    { from: 'them', text: 'Откуда это снято?' },
  ],
  'Маша': [
    { from: 'them', text: 'Дарья, как ты это делаешь? Такие кадры...' },
    { from: 'me', text: 'Просто просыпаюсь рано и иду туда, где красиво 🌅' },
    { from: 'them', text: 'Спасибо за ответ! 🙏' },
  ],
  'Костя': [
    { from: 'them', text: 'Жду новых видео!' },
  ],
  'Лена': [
    { from: 'them', text: 'Ты вдохновляешь ❤️' },
    { from: 'me', text: 'Это очень приятно, спасибо тебе!' },
  ],
  'Дима': [
    { from: 'them', text: 'Привет! Понравилось твоё видео' },
  ],
};

const MessagesPage = () => {
  const [active, setActive] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [histories, setHistories] = useState(HISTORY);

  const chat = active ? CHATS.find((c) => c.name === active) : null;
  const messages = active ? (histories[active] || []) : [];

  const send = () => {
    if (!input.trim() || !active) return;
    setHistories((h) => ({ ...h, [active]: [...(h[active] || []), { from: 'me', text: input }] }));
    setInput('');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center gap-3 px-5 py-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur z-10">
        {active ? (
          <>
            <button onClick={() => setActive(null)} className="p-2 -ml-2 hover:bg-secondary rounded-full transition-colors">
              <Icon name="ArrowLeft" size={22} />
            </button>
            <div className={`h-9 w-9 rounded-full bg-gradient-to-tr ${chat?.color} flex items-center justify-center text-white font-semibold text-sm shrink-0`}>
              {chat?.name[0]}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-base leading-tight">{chat?.name}</p>
              <p className="text-xs text-muted-foreground">{chat?.handle}</p>
            </div>
            <Link to="/profile" className="p-2 hover:bg-secondary rounded-full transition-colors">
              <Icon name="User" size={20} />
            </Link>
          </>
        ) : (
          <>
            <Link to="/" className="p-2 -ml-2 hover:bg-secondary rounded-full transition-colors">
              <Icon name="ArrowLeft" size={22} />
            </Link>
            <span className="font-display font-bold text-lg flex-1">Сообщения</span>
            <button className="p-2 hover:bg-secondary rounded-full transition-colors">
              <Icon name="PenSquare" size={22} />
            </button>
          </>
        )}
      </header>

      {!active ? (
        <div className="max-w-2xl mx-auto pb-20 lg:pb-0">
          {/* Search */}
          <div className="px-5 py-4">
            <div className="flex items-center gap-2 bg-secondary rounded-2xl px-4 py-2.5">
              <Icon name="Search" size={18} className="text-muted-foreground shrink-0" />
              <input placeholder="Поиск сообщений..." className="flex-1 bg-transparent text-sm outline-none" />
            </div>
          </div>

          {/* Chats list */}
          <div className="divide-y divide-border">
            {CHATS.map((c) => (
              <button
                key={c.name}
                onClick={() => setActive(c.name)}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-secondary/40 transition-colors text-left"
              >
                <div className="relative">
                  <div className={`h-12 w-12 rounded-full bg-gradient-to-tr ${c.color} flex items-center justify-center text-white font-semibold`}>
                    {c.name[0]}
                  </div>
                  {c.unread > 0 && (
                    <div className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground text-[10px] font-bold">{c.unread}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between">
                    <p className={`font-semibold text-sm ${c.unread > 0 ? 'text-foreground' : ''}`}>{c.name}</p>
                    <span className="text-xs text-muted-foreground">{c.time}</span>
                  </div>
                  <p className={`text-sm truncate mt-0.5 ${c.unread > 0 ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>{c.last}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 65px)' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 no-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.from === 'me'
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'bg-secondary text-foreground rounded-bl-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Сообщение..."
              className="flex-1 bg-secondary rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring/30"
            />
            <button
              onClick={send}
              className="px-4 rounded-2xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Icon name="SendHorizontal" size={18} />
            </button>
          </div>
        </div>
      )}

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

export default MessagesPage;
