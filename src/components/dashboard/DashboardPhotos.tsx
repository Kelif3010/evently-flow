import { useState } from "react";
import { Camera, Upload, Download, Trash2, Heart, Eye, Grid, List, Filter, Check, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Photo {
  id: number;
  url: string;
  emoji: string;
  uploadedBy: string;
  date: string;
  approved: boolean;
  featured: boolean;
  likes: number;
}

const initialPhotos: Photo[] = [
  { id: 1, emoji: "📸", url: "#", uploadedBy: "Sophie Weber", date: "15.08.2026", approved: true, featured: true, likes: 12 },
  { id: 2, emoji: "🥂", url: "#", uploadedBy: "Thomas Müller", date: "15.08.2026", approved: true, featured: false, likes: 8 },
  { id: 3, emoji: "💐", url: "#", uploadedBy: "Anna Hoffmann", date: "15.08.2026", approved: false, featured: false, likes: 3 },
  { id: 4, emoji: "💍", url: "#", uploadedBy: "Lena Schulz", date: "15.08.2026", approved: true, featured: true, likes: 24 },
  { id: 5, emoji: "🎂", url: "#", uploadedBy: "Felix Braun", date: "15.08.2026", approved: false, featured: false, likes: 5 },
  { id: 6, emoji: "💃", url: "#", uploadedBy: "Emma Wagner", date: "15.08.2026", approved: true, featured: false, likes: 15 },
  { id: 7, emoji: "🌸", url: "#", uploadedBy: "Nico Klein", date: "15.08.2026", approved: true, featured: false, likes: 7 },
  { id: 8, emoji: "🎶", url: "#", uploadedBy: "Moritz Becker", date: "15.08.2026", approved: false, featured: false, likes: 2 },
];

const DashboardPhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [filter, setFilter] = useState<"all" | "approved" | "pending" | "featured">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const filtered = photos.filter(p => {
    if (filter === "approved") return p.approved;
    if (filter === "pending") return !p.approved;
    if (filter === "featured") return p.featured;
    return true;
  });

  const approvePhoto = (id: number) => setPhotos(photos.map(p => p.id === id ? { ...p, approved: true } : p));
  const toggleFeatured = (id: number) => setPhotos(photos.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
  const deletePhoto = (id: number) => setPhotos(photos.filter(p => p.id !== id));
  const toggleSelect = (id: number) => setSelectedPhotos(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const bulkApprove = () => { setPhotos(photos.map(p => selectedPhotos.includes(p.id) ? { ...p, approved: true } : p)); setSelectedPhotos([]); };
  const bulkDelete = () => { setPhotos(photos.filter(p => !selectedPhotos.includes(p.id))); setSelectedPhotos([]); };

  const stats = {
    total: photos.length,
    approved: photos.filter(p => p.approved).length,
    pending: photos.filter(p => !p.approved).length,
    featured: photos.filter(p => p.featured).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <Camera size={24} className="text-primary" /> Fotogalerie
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">
            Kuratiere die Hochzeitsfotos eurer Gäste
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="font-body"><Download size={14} className="mr-1.5" /> Alle herunterladen</Button>
          <Button size="sm" className="font-body"><Upload size={14} className="mr-1.5" /> Fotos hochladen</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Gesamt", value: stats.total, icon: Camera, color: "text-primary" },
          { label: "Freigegeben", value: stats.approved, icon: Check, color: "text-primary" },
          { label: "Ausstehend", value: stats.pending, icon: Eye, color: "text-accent" },
          { label: "Favoriten", value: stats.featured, icon: Star, color: "text-yellow-500" },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-1">
              <s.icon size={16} className={s.color} />
              <span className="text-xs text-muted-foreground font-body">{s.label}</span>
            </div>
            <span className="font-heading text-2xl font-bold text-foreground">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Filters & View */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex gap-2">
          {(["all", "approved", "pending", "featured"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-all ${
                filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "Alle" : f === "approved" ? "Freigegeben" : f === "pending" ? "Ausstehend" : "Favoriten"}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
            <Grid size={16} />
          </button>
          <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map(photo => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`relative bg-card rounded-xl border overflow-hidden group cursor-pointer transition-all ${
                selectedPhotos.includes(photo.id) ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary/30"
              }`}
              onClick={() => setLightbox(photo)}
            >
              <div className="aspect-square bg-secondary/50 flex items-center justify-center text-5xl relative">
                {photo.emoji}
                {!photo.approved && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-accent text-primary-foreground rounded-full text-xs font-body">Ausstehend</div>
                )}
                {photo.featured && (
                  <Star size={14} className="absolute top-2 right-2 text-yellow-500 fill-yellow-500" />
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-body font-medium text-foreground truncate">{photo.uploadedBy}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground font-body">{photo.date}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><Heart size={10} /> {photo.likes}</span>
                </div>
              </div>
              {/* Hover actions */}
              <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2" onClick={e => e.stopPropagation()}>
                <button onClick={() => toggleSelect(photo.id)} className="p-2 bg-background rounded-full hover:bg-secondary">
                  <Check size={14} className={selectedPhotos.includes(photo.id) ? "text-primary" : "text-muted-foreground"} />
                </button>
                {!photo.approved && (
                  <button onClick={() => approvePhoto(photo.id)} className="p-2 bg-background rounded-full hover:bg-secondary">
                    <Check size={14} className="text-primary" />
                  </button>
                )}
                <button onClick={() => toggleFeatured(photo.id)} className="p-2 bg-background rounded-full hover:bg-secondary">
                  <Star size={14} className={photo.featured ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"} />
                </button>
                <button onClick={() => deletePhoto(photo.id)} className="p-2 bg-background rounded-full hover:bg-secondary">
                  <Trash2 size={14} className="text-accent" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground uppercase">Foto</th>
                <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground uppercase">Hochgeladen von</th>
                <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground uppercase hidden md:table-cell">Datum</th>
                <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground uppercase">Status</th>
                <th className="text-right p-4 text-xs font-body font-semibold text-muted-foreground uppercase">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(photo => (
                <tr key={photo.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-4"><span className="text-2xl">{photo.emoji}</span></td>
                  <td className="p-4 text-sm font-body text-foreground">{photo.uploadedBy}</td>
                  <td className="p-4 text-sm font-body text-muted-foreground hidden md:table-cell">{photo.date}</td>
                  <td className="p-4">
                    <span className={`text-xs font-body font-medium px-2.5 py-1 rounded-full ${photo.approved ? "bg-champagne text-primary" : "bg-rose-light text-accent"}`}>
                      {photo.approved ? "Freigegeben" : "Ausstehend"}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-1">
                    {!photo.approved && (
                      <button onClick={() => approvePhoto(photo.id)} className="p-1.5 rounded hover:bg-secondary text-primary"><Check size={14} /></button>
                    )}
                    <button onClick={() => toggleFeatured(photo.id)} className="p-1.5 rounded hover:bg-secondary">
                      <Star size={14} className={photo.featured ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"} />
                    </button>
                    <button onClick={() => deletePhoto(photo.id)} className="p-1.5 rounded hover:bg-secondary text-accent"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Bulk actions */}
      {selectedPhotos.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background rounded-xl px-6 py-3 flex items-center gap-4 shadow-xl z-40">
          <span className="text-sm font-body">{selectedPhotos.length} ausgewählt</span>
          <Button size="sm" variant="outline" className="font-body text-foreground border-background/30 hover:bg-background/10" onClick={bulkApprove}>
            <Check size={14} className="mr-1.5" /> Freigeben
          </Button>
          <Button size="sm" variant="outline" className="font-body text-foreground border-background/30 hover:bg-background/10" onClick={bulkDelete}>
            <Trash2 size={14} className="mr-1.5" /> Löschen
          </Button>
          <button onClick={() => setSelectedPhotos([])} className="ml-2 text-background/60 hover:text-background"><X size={16} /></button>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-card rounded-2xl p-6 max-w-md w-full text-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-8xl mb-4">{lightbox.emoji}</div>
              <p className="font-heading font-semibold text-foreground">{lightbox.uploadedBy}</p>
              <p className="text-sm text-muted-foreground font-body">{lightbox.date}</p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <span className="flex items-center gap-1 text-sm text-muted-foreground"><Heart size={14} /> {lightbox.likes}</span>
                <span className={`text-xs font-body font-medium px-2.5 py-1 rounded-full ${lightbox.approved ? "bg-champagne text-primary" : "bg-rose-light text-accent"}`}>
                  {lightbox.approved ? "Freigegeben" : "Ausstehend"}
                </span>
              </div>
              <div className="flex gap-2 mt-6 justify-center">
                {!lightbox.approved && <Button size="sm" className="font-body" onClick={() => { approvePhoto(lightbox.id); setLightbox({ ...lightbox, approved: true }); }}>Freigeben</Button>}
                <Button variant="outline" size="sm" className="font-body" onClick={() => setLightbox(null)}>Schließen</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPhotos;
