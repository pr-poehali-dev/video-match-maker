import { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const TAGS = ['Путешествия', 'Природа', 'Йога', 'Работа', 'Арт', 'Еда', 'Музыка', 'Спорт'];

const UploadPage = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [cover, setCover] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState<'all' | 'subs' | 'me'>('all');
  const [publishing, setPublishing] = useState(false);
  const [done, setDone] = useState(false);
  const [step, setStep] = useState<'upload' | 'edit'>('upload');

  const handleFile = (f: File) => {
    if (!f.type.startsWith('video/')) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setStep('edit');
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const onCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setCover(URL.createObjectURL(f));
  };

  const toggleTag = (t: string) => {
    setTags((s) => s.includes(t) ? s.filter((x) => x !== t) : [...s, t]);
  };

  const publish = () => {
    if (!title.trim()) return;
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setDone(true);
      setTimeout(() => navigate('/'), 2000);
    }, 2000);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-scale-in">
          <div className="h-20 w-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-5">
            <Icon name="CheckCircle2" size={40} className="text-primary" />
          </div>
          <h2 className="font-display font-bold text-2xl mb-2">Опубликовано!</h2>
          <p className="text-muted-foreground">Ваше видео появится в ленте через несколько секунд</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-10">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 py-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-secondary rounded-full transition-colors">
          <Icon name="ArrowLeft" size={22} />
        </button>
        <span className="font-display font-bold text-lg flex-1">Загрузка видео</span>
        {step === 'edit' && (
          <button
            onClick={publish}
            disabled={!title.trim() || publishing}
            className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {publishing ? 'Публикуем...' : 'Опубликовать'}
          </button>
        )}
      </header>

      <div className="max-w-2xl mx-auto px-5 py-6">
        {step === 'upload' ? (
          /* Drop zone */
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => fileRef.current?.click()}
            className={`flex flex-col items-center justify-center gap-5 rounded-3xl border-2 border-dashed cursor-pointer transition-all min-h-[380px] ${
              dragOver
                ? 'border-primary bg-accent'
                : 'border-border hover:border-primary/50 hover:bg-secondary/50'
            }`}
          >
            <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            <div className="h-20 w-20 rounded-2xl bg-secondary flex items-center justify-center">
              <Icon name="Film" size={36} className="text-primary" />
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-xl mb-2">Перетащите видео сюда</p>
              <p className="text-muted-foreground text-sm">или нажмите, чтобы выбрать файл</p>
              <p className="text-muted-foreground text-xs mt-1">MP4, MOV, AVI · до 2 GB</p>
            </div>
            <button className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
              Выбрать файл
            </button>
          </div>
        ) : (
          <div className="space-y-5 animate-fade-in">
            {/* Preview + cover */}
            <div className="grid grid-cols-[1fr_auto] gap-4 items-start">
              <div className="rounded-2xl overflow-hidden bg-black aspect-video relative">
                {preview && (
                  <video src={preview} className="w-full h-full object-cover" muted />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                    <Icon name="Play" size={24} className="text-white fill-white" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded backdrop-blur">
                  {file ? (file.size / 1024 / 1024).toFixed(1) + ' MB' : ''}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={onCoverChange} />
                <button
                  onClick={() => coverRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 w-28 aspect-video rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors overflow-hidden"
                >
                  {cover ? (
                    <img src={cover} alt="обложка" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Icon name="Image" size={20} className="text-muted-foreground" />
                      <span className="text-[11px] text-muted-foreground text-center leading-tight">Обложка</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => { setFile(null); setPreview(null); setCover(null); setStep('upload'); }}
                  className="w-28 text-center text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
                >
                  Заменить
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-sm font-semibold mb-2 block">Название *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Напишите название видео..."
                maxLength={100}
                className="w-full bg-secondary rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring/40 transition-all"
              />
              <p className="text-xs text-muted-foreground mt-1.5 text-right">{title.length}/100</p>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-semibold mb-2 block">Описание</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Расскажите о видео..."
                rows={3}
                maxLength={500}
                className="w-full bg-secondary rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring/40 transition-all resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1.5 text-right">{desc.length}/500</p>
            </div>

            {/* Tags */}
            <div>
              <label className="text-sm font-semibold mb-3 block">Теги</label>
              <div className="flex flex-wrap gap-2">
                {TAGS.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggleTag(t)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      tags.includes(t)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary hover:bg-secondary/70 text-foreground'
                    }`}
                  >
                    {tags.includes(t) && '✓ '}{t}
                  </button>
                ))}
              </div>
            </div>

            {/* Privacy */}
            <div>
              <label className="text-sm font-semibold mb-3 block">Доступ</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'all', icon: 'Globe', label: 'Все' },
                  { id: 'subs', icon: 'Users', label: 'Подписчики' },
                  { id: 'me', icon: 'Lock', label: 'Только я' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPrivacy(p.id as typeof privacy)}
                    className={`flex flex-col items-center gap-2 py-3 rounded-2xl border-2 text-sm font-medium transition-all ${
                      privacy === p.id
                        ? 'border-primary bg-accent text-primary'
                        : 'border-border bg-secondary hover:border-primary/30'
                    }`}
                  >
                    <Icon name={p.icon} size={20} />
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Publish button (bottom) */}
            <button
              onClick={publish}
              disabled={!title.trim() || publishing}
              className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {publishing ? (
                <>
                  <Icon name="Loader2" size={20} className="animate-spin" />
                  Публикуем...
                </>
              ) : (
                <>
                  <Icon name="Upload" size={20} />
                  Опубликовать видео
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-background/90 backdrop-blur border-t border-border flex items-center justify-around py-2.5 z-20">
        <Link to="/" className="p-2 text-muted-foreground"><Icon name="House" size={24} /></Link>
        <Link to="/stories" className="p-2 text-muted-foreground"><Icon name="CirclePlay" size={24} /></Link>
        <Link to="/live" className="p-2 text-muted-foreground"><Icon name="Radio" size={24} /></Link>
        <Link to="/search" className="p-2 text-muted-foreground"><Icon name="Search" size={24} /></Link>
        <Link to="/profile" className="p-2 text-muted-foreground"><Icon name="User" size={24} /></Link>
      </nav>
    </div>
  );
};

export default UploadPage;
