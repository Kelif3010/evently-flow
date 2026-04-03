import { useState } from "react";
import { Music, Plus, Trash2, Heart, ExternalLink, Link2, Check, Search, ListMusic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Song {
  id: number;
  title: string;
  artist: string;
  addedBy: string;
  likes: number;
  isCouplePick: boolean;
}

const initialSongs: Song[] = [
  { id: 1, title: "Perfect", artist: "Ed Sheeran", addedBy: "Brautpaar", likes: 15, isCouplePick: true },
  { id: 2, title: "At Last", artist: "Etta James", addedBy: "Brautpaar", likes: 12, isCouplePick: true },
  { id: 3, title: "Thinking Out Loud", artist: "Ed Sheeran", addedBy: "Brautpaar", likes: 9, isCouplePick: true },
  { id: 4, title: "Can't Help Falling in Love", artist: "Elvis Presley", addedBy: "Sophie W.", likes: 8, isCouplePick: false },
  { id: 5, title: "Uptown Funk", artist: "Bruno Mars", addedBy: "Thomas M.", likes: 11, isCouplePick: false },
  { id: 6, title: "Don't Stop Me Now", artist: "Queen", addedBy: "Anna H.", likes: 7, isCouplePick: false },
  { id: 7, title: "Shut Up and Dance", artist: "Walk the Moon", addedBy: "Felix B.", likes: 5, isCouplePick: false },
  { id: 8, title: "I Gotta Feeling", artist: "Black Eyed Peas", addedBy: "Lena S.", likes: 6, isCouplePick: false },
];

const DashboardMusic = () => {
  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newSong, setNewSong] = useState({ title: "", artist: "" });
  const [spotifyLink, setSpotifyLink] = useState("https://open.spotify.com/playlist/...");
  const [appleLink, setAppleLink] = useState("");
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [filter, setFilter] = useState<"all" | "couple" | "guests">("all");

  const filtered = songs
    .filter(s => {
      if (filter === "couple") return s.isCouplePick;
      if (filter === "guests") return !s.isCouplePick;
      return true;
    })
    .filter(s => s.title.toLowerCase().includes(search.toLowerCase()) || s.artist.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.likes - a.likes);

  const addSong = () => {
    if (!newSong.title.trim()) return;
    setSongs([...songs, { id: Date.now(), title: newSong.title, artist: newSong.artist, addedBy: "Brautpaar", likes: 0, isCouplePick: true }]);
    setNewSong({ title: "", artist: "" });
    setShowAdd(false);
  };

  const removeSong = (id: number) => setSongs(songs.filter(s => s.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <Music size={24} className="text-primary" /> Musik & Playlist
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">
            {songs.length} Songs · {songs.filter(s => !s.isCouplePick).length} Gästewünsche
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="font-body" onClick={() => setShowLinkModal(true)}>
            <Link2 size={14} className="mr-1.5" /> Playlists verknüpfen
          </Button>
          <Button size="sm" className="font-body" onClick={() => setShowAdd(true)}>
            <Plus size={14} className="mr-1.5" /> Song hinzufügen
          </Button>
        </div>
      </div>

      {/* Linked Playlists */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div className={`bg-card rounded-xl border p-4 flex items-center gap-4 ${spotifyLink ? "border-green-500/30" : "border-border"}`}>
          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-2xl">🎵</div>
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-foreground text-sm">Spotify</h3>
            <p className="text-xs text-muted-foreground font-body">{spotifyLink ? "Verknüpft ✓" : "Nicht verknüpft"}</p>
          </div>
          {spotifyLink && (
            <Button variant="outline" size="sm" className="font-body text-xs">
              <ExternalLink size={12} className="mr-1" /> Öffnen
            </Button>
          )}
        </div>
        <div className={`bg-card rounded-xl border p-4 flex items-center gap-4 ${appleLink ? "border-pink-500/30" : "border-border"}`}>
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-2xl">🎶</div>
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-foreground text-sm">Apple Music</h3>
            <p className="text-xs text-muted-foreground font-body">{appleLink ? "Verknüpft ✓" : "Nicht verknüpft"}</p>
          </div>
          <Button variant="outline" size="sm" className="font-body text-xs" onClick={() => setShowLinkModal(true)}>
            {appleLink ? <><ExternalLink size={12} className="mr-1" /> Öffnen</> : "Verknüpfen"}
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Song suchen..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div className="flex gap-2">
          {(["all", "couple", "guests"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-all ${
                filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}>
              {f === "all" ? "Alle" : f === "couple" ? "Unsere Picks" : "Gästewünsche"}
            </button>
          ))}
        </div>
      </div>

      {/* Add Song */}
      {showAdd && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-3">Song hinzufügen</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <input value={newSong.title} onChange={e => setNewSong({ ...newSong, title: e.target.value })} placeholder="Titel"
              className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input value={newSong.artist} onChange={e => setNewSong({ ...newSong, artist: e.target.value })} placeholder="Interpret"
              className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex gap-2 mt-3">
            <Button size="sm" className="font-body" onClick={addSong}>Hinzufügen</Button>
            <Button variant="outline" size="sm" className="font-body" onClick={() => setShowAdd(false)}>Abbrechen</Button>
          </div>
        </motion.div>
      )}

      {/* Song List */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="divide-y divide-border">
          {filtered.map((song, i) => (
            <motion.div key={song.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-secondary/20 transition-colors">
              <span className="text-sm font-body text-muted-foreground w-6 text-right">{i + 1}</span>
              <div className="w-10 h-10 rounded-lg bg-champagne flex items-center justify-center">
                {song.isCouplePick ? "💍" : "🎵"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-body font-medium text-foreground truncate">{song.title}</p>
                <p className="text-xs text-muted-foreground font-body truncate">{song.artist} · hinzugefügt von {song.addedBy}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Heart size={12} className={song.likes > 5 ? "text-accent fill-accent" : ""} /> {song.likes}
                </span>
                {song.isCouplePick && <span className="text-xs px-2 py-0.5 bg-champagne text-primary rounded-full font-body">Unsere Wahl</span>}
                <button onClick={() => removeSong(song.id)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground">
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground font-body">Keine Songs gefunden.</div>
        )}
      </div>

      {/* Link Playlists Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 bg-foreground/60 flex items-center justify-center p-4" onClick={() => setShowLinkModal(false)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Playlists verknüpfen</h3>
            <p className="text-sm text-muted-foreground font-body mb-4">Füge eure Playlist-Links ein, damit Gäste Songs hinzufügen können.</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-body font-medium text-foreground flex items-center gap-2 mb-1.5">
                  <span className="text-lg">🎵</span> Spotify Playlist-Link
                </label>
                <input value={spotifyLink} onChange={e => setSpotifyLink(e.target.value)} placeholder="https://open.spotify.com/playlist/..."
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-xs font-body font-medium text-foreground flex items-center gap-2 mb-1.5">
                  <span className="text-lg">🎶</span> Apple Music Playlist-Link
                </label>
                <input value={appleLink} onChange={e => setAppleLink(e.target.value)} placeholder="https://music.apple.com/playlist/..."
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button size="sm" className="font-body flex-1" onClick={() => setShowLinkModal(false)}>
                <Check size={14} className="mr-1.5" /> Speichern
              </Button>
              <Button variant="outline" size="sm" className="font-body" onClick={() => setShowLinkModal(false)}>Abbrechen</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DashboardMusic;
