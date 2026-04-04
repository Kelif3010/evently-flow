import { useState } from "react";
import { Globe, MapPin, TrendingUp, Heart, Plane, Star } from "lucide-react";

interface HoneymoonSuggestion {
  id: string;
  destination: string;
  country: string;
  votes: number;
  suggestedBy: string[];
  lat: number;
  lng: number;
  emoji: string;
  continent: string;
}

const suggestions: HoneymoonSuggestion[] = [
  { id: "1", destination: "Malediven", country: "Malediven", votes: 18, suggestedBy: ["Sophie", "Thomas", "Anna", "+15"], lat: 3.2, lng: 73.2, emoji: "🏝️", continent: "Asien" },
  { id: "2", destination: "Santorini", country: "Griechenland", votes: 14, suggestedBy: ["Felix", "Maria", "+12"], lat: 36.4, lng: 25.4, emoji: "🏛️", continent: "Europa" },
  { id: "3", destination: "Bali", country: "Indonesien", votes: 12, suggestedBy: ["Jan", "Lisa", "+10"], lat: -8.3, lng: 115.1, emoji: "🌺", continent: "Asien" },
  { id: "4", destination: "Toskana", country: "Italien", votes: 9, suggestedBy: ["Peter", "+8"], lat: 43.7, lng: 11.2, emoji: "🍷", continent: "Europa" },
  { id: "5", destination: "Island", country: "Island", votes: 7, suggestedBy: ["Hannah", "+6"], lat: 64.1, lng: -21.9, emoji: "🌋", continent: "Europa" },
  { id: "6", destination: "Japan", country: "Japan", votes: 6, suggestedBy: ["Markus B.", "+5"], lat: 36.2, lng: 138.2, emoji: "🗾", continent: "Asien" },
  { id: "7", destination: "Kapstadt", country: "Südafrika", votes: 5, suggestedBy: ["Claudia", "+4"], lat: -33.9, lng: 18.4, emoji: "🦁", continent: "Afrika" },
  { id: "8", destination: "Costa Rica", country: "Costa Rica", votes: 4, suggestedBy: ["Stefan", "+3"], lat: 9.7, lng: -83.7, emoji: "🌿", continent: "Amerika" },
];

const continents = ["Alle", "Europa", "Asien", "Afrika", "Amerika"];

const DashboardHoneymoon = () => {
  const [filter, setFilter] = useState("Alle");
  const sorted = [...suggestions]
    .filter(s => filter === "Alle" || s.continent === filter)
    .sort((a, b) => b.votes - a.votes);
  const totalVotes = suggestions.reduce((s, x) => s + x.votes, 0);
  const topDest = suggestions.sort((a, b) => b.votes - a.votes)[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
          <Globe size={24} className="text-primary" /> Flitterwochen-Vorschläge
        </h2>
        <p className="text-sm text-muted-foreground font-body mt-1">
          Eure Gäste empfehlen euch diese Reiseziele · {totalVotes} Vorschläge
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Top-Ziel", value: topDest.destination, sub: `${topDest.votes} Stimmen`, icon: Star },
          { label: "Vorschläge gesamt", value: totalVotes, sub: `${suggestions.length} Ziele`, icon: TrendingUp },
          { label: "Beliebtester Kontinent", value: "Asien", sub: "36 Stimmen", icon: Globe },
          { label: "Gäste abgestimmt", value: "67%", sub: "83 von 124", icon: Heart },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-body">{s.label}</span>
              <s.icon size={16} className="text-primary" />
            </div>
            <p className="text-xl font-heading font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground font-body">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Interactive World Map Visualization */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">🌍 Weltkarte der Vorschläge</h3>
        <div className="relative bg-gradient-to-br from-blue-950/20 via-blue-900/10 to-teal-900/20 rounded-xl p-6 min-h-[300px] overflow-hidden">
          {/* Simple SVG world map approximation */}
          <svg viewBox="0 0 1000 500" className="w-full h-auto opacity-20">
            <ellipse cx="500" cy="250" rx="480" ry="230" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/30" />
            <line x1="20" y1="250" x2="980" y2="250" stroke="currentColor" strokeWidth="0.5" className="text-primary/20" />
            <line x1="500" y1="20" x2="500" y2="480" stroke="currentColor" strokeWidth="0.5" className="text-primary/20" />
          </svg>

          {/* Destination pins */}
          {suggestions.map((dest) => {
            const x = ((dest.lng + 180) / 360) * 100;
            const y = ((90 - dest.lat) / 180) * 100;
            const size = Math.max(28, Math.min(60, dest.votes * 3));
            return (
              <div
                key={dest.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: `${Math.max(5, Math.min(95, x))}%`, top: `${Math.max(5, Math.min(95, y))}%` }}
              >
                <div
                  className="rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center animate-pulse"
                  style={{ width: size, height: size }}
                >
                  <span className="text-sm">{dest.emoji}</span>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-card border border-border rounded-lg p-3 shadow-lg whitespace-nowrap">
                    <p className="font-heading text-sm font-bold text-foreground">{dest.destination}</p>
                    <p className="text-xs text-muted-foreground font-body">{dest.votes} Stimmen</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {continents.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full text-sm font-body transition-colors ${
              filter === c ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Ranking */}
      <div className="space-y-3">
        {sorted.map((dest, i) => {
          const pct = Math.round((dest.votes / totalVotes) * 100);
          return (
            <div key={dest.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-heading font-bold ${
                  i === 0 ? "bg-primary/20 text-primary" : i === 1 ? "bg-gold/20 text-gold" : i === 2 ? "bg-accent/20 text-accent" : "bg-secondary text-muted-foreground"
                }`}>
                  {i < 3 ? ["🥇", "🥈", "🥉"][i] : `${i + 1}`}
                </div>
                <div className="text-3xl">{dest.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading text-base font-semibold text-foreground">{dest.destination}</h4>
                    <span className="text-xs text-muted-foreground font-body">{dest.country}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-sm font-body font-medium text-foreground w-10 text-right">{pct}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-body mt-1">
                    Empfohlen von: {dest.suggestedBy.join(", ")}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-2xl font-heading font-bold text-foreground">{dest.votes}</p>
                  <p className="text-xs text-muted-foreground font-body">Stimmen</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardHoneymoon;
