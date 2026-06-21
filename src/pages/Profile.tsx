import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const IMG_1 = 'https://cdn.poehali.dev/projects/9df3bbc5-6dd9-4564-ab49-b7688afd02ac/files/5b79f9e1-ca67-411a-b2a6-c3957d9b7b25.jpg';
const IMG_2 = 'https://cdn.poehali.dev/projects/9df3bbc5-6dd9-4564-ab49-b7688afd02ac/files/519a18f4-8b7d-4bd8-b486-fa80d6f02fcf.jpg';

const TABS = [
  { id: 'videos', icon: 'Grid3x3', label: 'Видео' },
  { id: 'live', icon: 'Radio', label: 'Эфиры' },
  { id: 'saved', icon: 'Bookmark', label: 'Сохранённое' },
];

const VIDEOS = [
  { img: IMG_2, views: '12.4K', dur: '0:45' },
  { img: IMG_1, views: '8.1K', dur: '1:20' },
  { img: IMG_2, views: '24.9K', dur: '0:30' },
  { img: IMG_1, views: '5.6K', dur: '2:10' },
  { img: IMG_2, views: '31.2K', dur: '0:55' },
  { img: IMG_1, views: '3.3K', dur: '1:05' },
];

const FOLLOWERS = ['Анна', 'Игорь', 'Маша', 'Костя', 'Лена'];

const Profile = () => {
  const [tab, setTab] = useState('videos');
  const [following, setFollowing] = useState(false);
  const [notif, setNotif] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Top bar */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur z-10 max-w-2xl mx-auto">
        <Link to="/" className="p-2 -ml-2 hover:bg-secondary rounded-full transition-colors">
          <Icon name="ArrowLeft" size={22} />
        </Link>
        <span className="font-display font-bold text-lg">@daria</span>
        <button className="p-2 -mr-2 hover:bg-secondary rounded-full transition-colors">
          <Icon name="Settings" size={22} />
        </button>
      </header>

      <div className="max-w-2xl mx-auto">
        {/* Profile head */}
        <section className="px-5 py-6 animate-fade-in">
          <div className="flex items-start gap-5">
            <div className="h-24 w-24 rounded-full p-[3px] bg-gradient-to-tr from-primary to-rose-400 shrink-0">
              <div className="h-full w-full rounded-full bg-background p-[2px]">
                <div className="h-full w-full rounded-full bg-gradient-to-tr from-primary to-rose-400 flex items-center justify-center text-white text-3xl font-bold">
                  Д
                </div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-2 text-center pt-2">
              {[
                { n: '128', l: 'видео' },
                { n: '34.2K', l: 'подписчиков' },
                { n: '512', l: 'подписки' },
              ].map((s) => (
                <div key={s.l} className="cursor-pointer hover:opacity-70 transition-opacity">
                  <p className="font-display font-bold text-xl">{s.n}</p>
                  <p className="text-xs text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h1 className="font-display font-bold text-xl">Дарья Кравцова</h1>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Создаю видео о путешествиях и осознанной жизни. Рассветы, горы, тишина. ✦
            </p>
          </div>

          <div className="flex gap-2 mt-5">
            <button
              onClick={() => setFollowing((v) => !v)}
              className={`flex-1 py-2.5 rounded-2xl font-semibold transition-all ${
                following
                  ? 'bg-secondary text-foreground'
                  : 'bg-primary text-primary-foreground hover:opacity-90'
              }`}
            >
              {following ? 'Вы подписаны' : 'Подписаться'}
            </button>
            <Link
              to="/messages"
              className="flex-1 py-2.5 rounded-2xl font-semibold bg-secondary hover:bg-secondary/70 transition-colors text-center"
            >
              Сообщение
            </Link>
            <button
              onClick={() => setNotif((v) => !v)}
              className={`px-4 rounded-2xl transition-colors ${notif ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/70'}`}
            >
              <Icon name="Bell" size={20} className={notif ? 'fill-primary-foreground' : ''} />
            </button>
          </div>

          {/* Followers preview */}
          <div className="flex items-center gap-3 mt-5">
            <div className="flex -space-x-3">
              {FOLLOWERS.map((f, i) => (
                <div
                  key={f}
                  className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-tr from-sky-400 to-indigo-400 flex items-center justify-center text-white text-xs font-semibold"
                  style={{ zIndex: FOLLOWERS.length - i }}
                >
                  {f[0]}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">Анна</span> и ещё 34.1K подписаны
            </p>
          </div>
        </section>

        {/* Tabs */}
        <div className="flex border-b border-border sticky top-[65px] bg-background/80 backdrop-blur z-10">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={t.icon} size={18} />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'videos' && (
          <section className="grid grid-cols-3 gap-1 p-1">
            {VIDEOS.map((v, i) => (
              <Link
                to="/video"
                key={i}
                className="relative aspect-[3/4] overflow-hidden group animate-scale-in rounded-sm"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <img src={v.img} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs font-medium">
                  <Icon name="Play" size={12} className="fill-white" /> {v.views}
                </span>
                <span className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur">
                  {v.dur}
                </span>
              </Link>
            ))}
          </section>
        )}

        {tab === 'live' && (
          <section className="px-5 py-6 grid grid-cols-2 gap-3">
            {[
              { title: 'Утренняя йога', viewers: '1.2K', img: IMG_2 },
              { title: 'Горный закат', viewers: '3.4K', img: IMG_1 },
            ].map((l, i) => (
              <Link to="/live" key={i} className="relative rounded-2xl overflow-hidden aspect-video group">
                <img src={l.img} alt={l.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-2 left-2 bg-destructive text-white text-[10px] font-bold px-2 py-0.5 rounded-full">ЗАПИСЬ</span>
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <p className="text-xs font-semibold">{l.title}</p>
                  <p className="text-[10px] opacity-70">{l.viewers} зрителей</p>
                </div>
              </Link>
            ))}
          </section>
        )}

        {tab === 'saved' && (
          <section className="grid grid-cols-3 gap-1 p-1">
            {VIDEOS.slice(0, 3).map((v, i) => (
              <Link
                to="/video"
                key={i}
                className="relative aspect-[3/4] overflow-hidden group animate-scale-in rounded-sm"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <img src={v.img} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs font-medium">
                  <Icon name="Bookmark" size={12} className="fill-white" /> {v.views}
                </span>
              </Link>
            ))}
          </section>
        )}
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-background/90 backdrop-blur border-t border-border flex items-center justify-around py-2.5 z-20">
        <Link to="/" className="p-2 text-muted-foreground"><Icon name="House" size={24} /></Link>
        <Link to="/stories" className="p-2 text-muted-foreground"><Icon name="CirclePlay" size={24} /></Link>
        <Link to="/live" className="p-2 text-muted-foreground"><Icon name="Radio" size={24} /></Link>
        <Link to="/search" className="p-2 text-muted-foreground"><Icon name="Search" size={24} /></Link>
        <Link to="/profile" className="p-2 text-primary"><Icon name="User" size={24} /></Link>
      </nav>
    </div>
  );
};

export default Profile;
