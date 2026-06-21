import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const IMG_1 = 'https://cdn.poehali.dev/projects/9df3bbc5-6dd9-4564-ab49-b7688afd02ac/files/5b79f9e1-ca67-411a-b2a6-c3957d9b7b25.jpg';
const IMG_2 = 'https://cdn.poehali.dev/projects/9df3bbc5-6dd9-4564-ab49-b7688afd02ac/files/519a18f4-8b7d-4bd8-b486-fa80d6f02fcf.jpg';

const COMMENTS = [
  { author: 'Игорь', handle: '@igor', text: 'Невероятная красота! Где это снято?', time: '1 ч', likes: 24, color: 'from-sky-400 to-indigo-400' },
  { author: 'Маша', handle: '@masha', text: 'Боже, хочу туда. Давно собираюсь в горы 🏔', time: '2 ч', likes: 11, color: 'from-emerald-400 to-teal-400' },
  { author: 'Костя', handle: '@kostya', text: 'Дарья, ты как всегда в своём репертуаре — потрясающие кадры', time: '3 ч', likes: 8, color: 'from-amber-400 to-orange-400' },
  { author: 'Лена', handle: '@lena', text: 'Такой рассвет это что-то нереальное 🌅', time: '4 ч', likes: 5, color: 'from-fuchsia-400 to-purple-400' },
];

const RELATED = [
  { img: IMG_1, title: 'Минимализм в работе', author: 'Артём М.', views: '8.1K', dur: '1:20' },
  { img: IMG_2, title: 'Закат в горах Алтая', author: 'Дарья К.', views: '24.9K', dur: '0:30' },
  { img: IMG_1, title: 'Утро в горах', author: 'Дарья К.', views: '5.6K', dur: '2:10' },
];

const VideoPage = () => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(COMMENTS);
  const [likedComments, setLikedComments] = useState<Record<number, boolean>>({});

  const handleSendComment = () => {
    if (!commentText.trim()) return;
    setComments([
      { author: 'Вы', handle: '@you', text: commentText, time: 'только что', likes: 0, color: 'from-primary to-rose-400' },
      ...comments,
    ]);
    setCommentText('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 py-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-secondary rounded-full transition-colors">
          <Icon name="ArrowLeft" size={22} />
        </button>
        <span className="font-display font-bold text-lg flex-1">Видео</span>
        <button className="p-2 hover:bg-secondary rounded-full transition-colors">
          <Icon name="MoreHorizontal" size={22} />
        </button>
      </header>

      <div className="max-w-5xl mx-auto lg:grid lg:grid-cols-[1fr_340px] lg:gap-6 lg:px-6 lg:py-6">
        <div>
          {/* Player */}
          <div
            className="relative bg-black aspect-video cursor-pointer group"
            onClick={() => setPlaying((v) => !v)}
          >
            <img src={IMG_2} alt="видео" className="w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
              <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <Icon name={playing ? 'Pause' : 'Play'} size={32} className="text-white fill-white" />
              </div>
            </div>
            {/* Progress bar */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20">
              <div className="h-full bg-primary w-1/3 rounded-full" />
            </div>
            {/* Controls bar */}
            <div className="absolute bottom-2 inset-x-3 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs">0:18 / 0:55</span>
              <div className="flex-1" />
              <button className="text-white" onClick={(e) => e.stopPropagation()}>
                <Icon name="Volume2" size={18} />
              </button>
              <button className="text-white" onClick={(e) => e.stopPropagation()}>
                <Icon name="Maximize2" size={18} />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="px-5 lg:px-0 py-4 border-b border-border">
            <h1 className="font-display font-bold text-xl leading-tight mb-2">
              Поймала рассвет в горах. Иногда нужно просто остановиться и подышать.
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span>31.2K просмотров</span>
              <span>·</span>
              <span>2 часа назад</span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 mb-4">
              <Link to="/profile" className="h-11 w-11 rounded-full bg-gradient-to-tr from-primary to-rose-400 flex items-center justify-center text-white font-semibold shrink-0">
                Д
              </Link>
              <Link to="/profile" className="flex-1">
                <p className="font-semibold">Дарья Кравцова</p>
                <p className="text-xs text-muted-foreground">34.2K подписчиков</p>
              </Link>
              <button className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
                Подписаться
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLiked((v) => !v)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all ${liked ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/70'}`}
              >
                <Icon name="Heart" size={18} className={liked ? 'fill-primary-foreground' : ''} />
                {1248 + (liked ? 1 : 0)}
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary hover:bg-secondary/70 font-medium text-sm transition-all">
                <Icon name="MessageCircle" size={18} />
                86
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary hover:bg-secondary/70 font-medium text-sm transition-all">
                <Icon name="Send" size={18} />
                Поделиться
              </button>
              <button
                onClick={() => setSaved((v) => !v)}
                className={`ml-auto p-2.5 rounded-full transition-all ${saved ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/70'}`}
              >
                <Icon name="Bookmark" size={18} className={saved ? 'fill-primary-foreground' : ''} />
              </button>
            </div>
          </div>

          {/* Comments */}
          <div className="px-5 lg:px-0 py-4">
            <h2 className="font-display font-bold text-lg mb-4">Комментарии · {comments.length}</h2>

            {/* Input */}
            <div className="flex gap-3 mb-6">
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary to-rose-400 flex items-center justify-center text-white font-semibold shrink-0 text-sm">
                В
              </div>
              <div className="flex-1 flex items-center gap-2 bg-secondary rounded-2xl px-4 py-2">
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendComment()}
                  placeholder="Ваш комментарий..."
                  className="flex-1 bg-transparent text-sm outline-none"
                />
                <button onClick={handleSendComment} className="text-primary">
                  <Icon name="SendHorizontal" size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-5">
              {comments.map((c, i) => (
                <div key={i} className="flex gap-3 animate-fade-in">
                  <div className={`h-9 w-9 rounded-full bg-gradient-to-tr ${c.color} flex items-center justify-center text-white font-semibold shrink-0 text-sm`}>
                    {c.author[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-semibold text-sm">{c.author}</span>
                      <span className="text-xs text-muted-foreground">{c.time}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{c.text}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button
                        onClick={() => setLikedComments((s) => ({ ...s, [i]: !s[i] }))}
                        className={`flex items-center gap-1.5 text-xs transition-colors ${likedComments[i] ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        <Icon name="Heart" size={14} className={likedComments[i] ? 'fill-primary' : ''} />
                        {c.likes + (likedComments[i] ? 1 : 0)}
                      </button>
                      <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        Ответить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        <aside className="hidden lg:block">
          <h3 className="font-display font-bold text-lg mb-4">Похожие видео</h3>
          <div className="space-y-4">
            {RELATED.map((v, i) => (
              <Link to="/video" key={i} className="flex gap-3 group">
                <div className="relative w-40 shrink-0 rounded-xl overflow-hidden aspect-video">
                  <img src={v.img} alt={v.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">{v.dur}</span>
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className="font-medium text-sm leading-snug line-clamp-2">{v.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{v.author}</p>
                  <p className="text-xs text-muted-foreground">{v.views} просмотров</p>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>

      {/* Mobile bottom nav */}
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

export default VideoPage;
