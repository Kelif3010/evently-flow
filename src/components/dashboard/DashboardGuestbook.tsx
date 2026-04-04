import { useState } from "react";
import { BookOpen, Heart, Star, Search, Filter, MessageSquare } from "lucide-react";

interface GuestbookEntry {
  id: string;
  author: string;
  message: string;
  timestamp: string;
  likes: number;
  featured: boolean;
  mood: string;
}

const demoEntries: GuestbookEntry[] = [
  { id: "1", author: "Sophie Weber", message: "Wir freuen uns riesig auf eure Hochzeit! Ihr seid das perfekte Paar. 💕 Wir wünschen euch alles Glück dieser Welt!", timestamp: "Vor 2 Stunden", likes: 12, featured: true, mood: "🥰" },
  { id: "2", author: "Thomas Müller", message: "Herzlichen Glückwunsch euch beiden! Wir können es kaum erwarten zu feiern. Die Location ist fantastisch!", timestamp: "Vor 5 Stunden", likes: 8, featured: false, mood: "🎉" },
  { id: "3", author: "Anna Hoffmann", message: "Ich kenne Laura schon seit dem Kindergarten und bin so stolz auf euch! Markus, pass gut auf sie auf! 😄", timestamp: "Gestern", likes: 15, featured: true, mood: "😊" },
  { id: "4", author: "Felix Braun", message: "Freue mich auf ein fantastisches Fest mit euch! Die Vorfreude ist riesig.", timestamp: "Gestern", likes: 5, featured: false, mood: "🥂" },
  { id: "5", author: "Maria Schmidt", message: "Was für eine wundervolle Nachricht! Liebe Grüße aus München. Wir sind dabei!", timestamp: "Vor 2 Tagen", likes: 7, featured: false, mood: "💐" },
  { id: "6", author: "Jan & Lisa Hoffmann", message: "Wir freuen uns schon auf den großen Tag! Eure Liebe ist inspirierend.", timestamp: "Vor 3 Tagen", likes: 9, featured: true, mood: "💑" },
];

const DashboardGuestbook = () => {
  const [entries, setEntries] = useState(demoEntries);
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState<"all" | "featured">("all");

  const filtered = entries
    .filter(e => filterMode === "all" || e.featured)
    .filter(e => !search || e.author.toLowerCase().includes(search.toLowerCase()) || e.message.toLowerCase().includes(search.toLowerCase()));

  const toggleFeatured = (id: string) => {
    setEntries(entries.map(e => e.id === id ? { ...e, featured: !e.featured } : e));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
          <BookOpen size={24} className="text-primary" /> Gästebuch
        </h2>
        <p className="text-sm text-muted-foreground font-body mt-1">
          {entries.length} Einträge · {entries.filter(e => e.featured).length} hervorgehoben
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Einträge gesamt", value: entries.length, icon: MessageSquare },
          { label: "Hervorgehoben", value: entries.filter(e => e.featured).length, icon: Star },
          { label: "Likes gesamt", value: entries.reduce((s, e) => s + e.likes, 0), icon: Heart },
          { label: "Heute neu", value: 2, icon: BookOpen },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-body">{s.label}</span>
              <s.icon size={16} className="text-primary" />
            </div>
            <p className="text-2xl font-heading font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Einträge durchsuchen..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "featured"] as const).map(m => (
            <button
              key={m}
              onClick={() => setFilterMode(m)}
              className={`px-4 py-2 rounded-full text-sm font-body transition-colors ${
                filterMode === m ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}
            >
              {m === "all" ? "Alle" : "⭐ Hervorgehoben"}
            </button>
          ))}
        </div>
      </div>

      {/* Entries */}
      <div className="space-y-4">
        {filtered.map(entry => (
          <div key={entry.id} className={`bg-card rounded-xl border border-border p-5 transition-all hover:shadow-md ${entry.featured ? "ring-1 ring-primary/20" : ""}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-champagne flex items-center justify-center text-lg flex-shrink-0">
                  {entry.mood}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-heading text-sm font-semibold text-foreground">{entry.author}</h4>
                    {entry.featured && <Star size={14} className="text-primary fill-primary" />}
                  </div>
                  <p className="text-sm font-body text-foreground/80 leading-relaxed">{entry.message}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs text-muted-foreground font-body">{entry.timestamp}</span>
                    <span className="text-xs text-muted-foreground font-body flex items-center gap-1">
                      <Heart size={12} /> {entry.likes}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleFeatured(entry.id)}
                className={`p-2 rounded-lg transition-colors ${
                  entry.featured ? "bg-primary/10 text-primary" : "hover:bg-secondary text-muted-foreground"
                }`}
                title={entry.featured ? "Hervorhebung entfernen" : "Hervorheben"}
              >
                <Star size={16} className={entry.featured ? "fill-current" : ""} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardGuestbook;
