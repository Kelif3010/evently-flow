import { useState } from "react";
import { Globe, MapPin, TrendingUp, Heart, Star } from "lucide-react";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

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
  const [hoveredDest, setHoveredDest] = useState<string | null>(null);
  const sorted = [...suggestions].filter(s => filter === "Alle" || s.continent === filter).sort((a, b) => b.votes - a.votes);
  const totalVotes = suggestions.reduce((s, x) => s + x.votes, 0);
  const topDest = suggestions.sort((a, b) => b.votes - a.votes)[0];
  const animTotal = useAnimatedNumber(totalVotes);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
          <Globe size={24} className="text-primary" /> Flitterwochen-Vorschläge
        </h2>
        <p className="text-sm text-muted-foreground font-body mt-1">
          Eure Gäste empfehlen euch diese Reiseziele · {animTotal} Vorschläge
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
          <div key={i} className="bg-card rounded-xl border border-border p-4 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-body">{s.label}</span>
              <s.icon size={16} className="text-primary" />
            </div>
            <p className="text-xl font-heading font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground font-body">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* World Map */}
      <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">🌍 Weltkarte der Vorschläge</h3>
        <div className="relative rounded-xl overflow-hidden min-h-[350px]" style={{ background: "linear-gradient(135deg, hsl(210, 40%, 96%), hsl(200, 30%, 92%))" }}>
          {/* SVG World Map with country outlines */}
          <svg viewBox="-20 -20 1040 540" className="w-full h-auto">
            {/* Ocean background */}
            <rect x="-20" y="-20" width="1040" height="540" fill="hsl(205, 35%, 90%)" rx="12" />
            
            {/* Simplified continent shapes */}
            {/* North America */}
            <path d="M120,80 L180,60 L230,70 L250,90 L260,130 L250,160 L230,180 L210,200 L190,230 L170,250 L150,240 L130,220 L120,190 L110,160 L100,130 L110,100 Z" 
              fill="hsl(140, 20%, 82%)" stroke="hsl(140, 15%, 70%)" strokeWidth="1" className="transition-colors duration-300" />
            {/* South America */}
            <path d="M200,270 L230,260 L260,280 L270,310 L280,350 L270,390 L250,420 L230,440 L210,430 L200,400 L190,360 L185,320 L190,290 Z" 
              fill="hsl(140, 20%, 82%)" stroke="hsl(140, 15%, 70%)" strokeWidth="1" />
            {/* Europe */}
            <path d="M440,70 L470,60 L510,65 L530,80 L540,100 L530,130 L520,150 L500,160 L480,155 L460,140 L450,120 L440,100 Z" 
              fill="hsl(45, 25%, 85%)" stroke="hsl(45, 20%, 72%)" strokeWidth="1" />
            {/* Africa */}
            <path d="M460,180 L500,170 L540,180 L560,210 L570,250 L565,300 L550,340 L530,370 L510,390 L490,380 L470,350 L460,310 L450,270 L445,230 L450,200 Z" 
              fill="hsl(30, 25%, 82%)" stroke="hsl(30, 20%, 70%)" strokeWidth="1" />
            {/* Asia */}
            <path d="M550,60 L620,50 L700,55 L770,70 L820,90 L840,120 L830,160 L800,190 L760,200 L720,210 L680,200 L640,190 L600,170 L570,150 L560,120 L545,90 Z" 
              fill="hsl(20, 20%, 85%)" stroke="hsl(20, 15%, 72%)" strokeWidth="1" />
            {/* Southeast Asia / Indonesia */}
            <path d="M740,220 L780,215 L820,230 L840,250 L830,270 L800,280 L770,275 L750,260 L740,240 Z" 
              fill="hsl(20, 20%, 85%)" stroke="hsl(20, 15%, 72%)" strokeWidth="1" />
            {/* Australia */}
            <path d="M780,330 L830,310 L880,320 L900,350 L890,380 L860,400 L830,410 L800,400 L780,380 L770,355 Z" 
              fill="hsl(350, 15%, 85%)" stroke="hsl(350, 10%, 72%)" strokeWidth="1" />
            
            {/* Grid lines */}
            <line x1="0" y1="250" x2="1000" y2="250" stroke="hsl(200, 20%, 85%)" strokeWidth="0.5" strokeDasharray="4" />
            <line x1="500" y1="0" x2="500" y2="500" stroke="hsl(200, 20%, 85%)" strokeWidth="0.5" strokeDasharray="4" />
          </svg>

          {/* Destination pins with pulsing effect */}
          {suggestions.map((dest) => {
            const x = ((dest.lng + 180) / 360) * 100;
            const y = ((90 - dest.lat) / 180) * 100;
            const size = Math.max(32, Math.min(56, dest.votes * 3));
            const isHovered = hoveredDest === dest.id;
            return (
              <div
                key={dest.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${Math.max(5, Math.min(95, x))}%`, top: `${Math.max(5, Math.min(95, y))}%`, zIndex: isHovered ? 20 : 10 }}
                onMouseEnter={() => setHoveredDest(dest.id)}
                onMouseLeave={() => setHoveredDest(null)}
              >
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ width: size, height: size, animationDuration: "2s" }} />
                <div
                  className={`rounded-full bg-primary/30 border-2 border-primary flex items-center justify-center transition-all duration-300 ${isHovered ? "scale-125 shadow-lg" : ""}`}
                  style={{ width: size, height: size }}
                >
                  <span style={{ fontSize: size > 40 ? "18px" : "14px" }}>{dest.emoji}</span>
                </div>
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 animate-fade-in">
                    <div className="bg-card border border-border rounded-xl p-3 shadow-xl whitespace-nowrap">
                      <p className="font-heading text-sm font-bold text-foreground">{dest.destination}</p>
                      <p className="text-xs text-muted-foreground font-body">{dest.votes} Stimmen · {dest.country}</p>
                    </div>
                  </div>
                )}
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
            className={`px-4 py-2 rounded-full text-sm font-body transition-all ${
              filter === c ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
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
            <div
              key={dest.id}
              className="bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredDest(dest.id)}
              onMouseLeave={() => setHoveredDest(null)}
            >
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
                      <div className="h-full rounded-full bg-primary transition-all duration-1000" style={{ width: `${pct}%` }} />
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
