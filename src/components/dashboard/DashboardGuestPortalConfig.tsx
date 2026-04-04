import { useState } from "react";
import { Monitor, Eye, GripVertical, ToggleLeft, ToggleRight, ArrowUp, ArrowDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PortalSection {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  emoji: string;
}

const defaultSections: PortalSection[] = [
  { id: "countdown", label: "Countdown", description: "Countdown bis zum großen Tag", enabled: true, emoji: "⏳" },
  { id: "info", label: "Event-Informationen", description: "Datum, Ort, Dresscode", enabled: true, emoji: "📍" },
  { id: "timeline", label: "Tagesablauf", description: "Zeitlicher Ablauf des Tages", enabled: true, emoji: "📅" },
  { id: "seating", label: "Sitzplatz", description: "Persönlicher Sitzplatz des Gastes", enabled: true, emoji: "🪑" },
  { id: "meal", label: "Menü & Essen", description: "Gewähltes Menü und Details", enabled: true, emoji: "🍽️" },
  { id: "wishlist", label: "Wunschliste", description: "Geschenke-Wunschliste", enabled: true, emoji: "🎁" },
  { id: "photos", label: "Fotogalerie", description: "Fotos hochladen und ansehen", enabled: true, emoji: "📸" },
  { id: "music", label: "Musikwünsche", description: "Songs zur Playlist hinzufügen", enabled: true, emoji: "🎵" },
  { id: "guestbook", label: "Gästebuch", description: "Nachrichten ans Brautpaar", enabled: true, emoji: "📖" },
  { id: "travel", label: "Anreise & Hotels", description: "Hotel-Infos und Anfahrt", enabled: false, emoji: "🏨" },
  { id: "faq", label: "FAQ", description: "Häufige Fragen", enabled: false, emoji: "❓" },
];

const DashboardGuestPortalConfig = () => {
  const [sections, setSections] = useState(defaultSections);

  const toggleSection = (id: string) => {
    setSections(sections.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const moveSection = (id: string, dir: -1 | 1) => {
    const idx = sections.findIndex(s => s.id === id);
    if ((dir === -1 && idx === 0) || (dir === 1 && idx === sections.length - 1)) return;
    const newSections = [...sections];
    [newSections[idx], newSections[idx + dir]] = [newSections[idx + dir], newSections[idx]];
    setSections(newSections);
  };

  const resetSections = () => setSections(defaultSections);

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <Monitor size={24} className="text-primary" /> Gästeseite konfigurieren
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">
            Bestimmt, was eure Gäste sehen und in welcher Reihenfolge · {sections.filter(s => s.enabled).length} Sektionen aktiv
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/demo/guest-portal">
            <Button variant="outline" size="sm" className="font-body">
              <Eye size={14} className="mr-1.5" /> Vorschau
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="font-body" onClick={resetSections}>
            <RotateCcw size={14} className="mr-1.5" /> Zurücksetzen
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="bg-champagne/50 rounded-xl border border-border p-4 flex items-start gap-3">
        <span className="text-lg">💡</span>
        <div>
          <p className="text-sm font-body font-medium text-foreground">So funktioniert die Gästeseite</p>
          <p className="text-xs text-muted-foreground font-body mt-1">
            Aktiviert oder deaktiviert Sektionen und ordnet sie per Pfeil-Buttons an. Eure Gäste sehen die Seite genau in der Reihenfolge, die ihr hier festlegt.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 bg-secondary/30 border-b border-border">
          <h3 className="font-heading text-base font-semibold text-foreground">Sektionen</h3>
        </div>
        <div className="divide-y divide-border">
          {sections.map((section, idx) => (
            <div key={section.id} className={`flex items-center gap-4 px-5 py-4 transition-colors ${section.enabled ? "" : "opacity-50"}`}>
              <GripVertical size={14} className="text-muted-foreground flex-shrink-0" />
              <span className="text-xl flex-shrink-0">{section.emoji}</span>

              <button
                onClick={() => toggleSection(section.id)}
                className={`w-11 h-6 rounded-full transition-colors flex-shrink-0 ${section.enabled ? "bg-primary" : "bg-border"}`}
              >
                <div className={`w-[18px] h-[18px] rounded-full bg-primary-foreground transition-transform mx-0.5 ${section.enabled ? "translate-x-[22px]" : "translate-x-0"}`} />
              </button>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-body font-medium text-foreground">{section.label}</p>
                <p className="text-xs text-muted-foreground font-body">{section.description}</p>
              </div>

              <div className="flex gap-1">
                <button onClick={() => moveSection(section.id, -1)} disabled={idx === 0} className="p-1.5 rounded hover:bg-secondary text-muted-foreground disabled:opacity-30">
                  <ArrowUp size={14} />
                </button>
                <button onClick={() => moveSection(section.id, 1)} disabled={idx === sections.length - 1} className="p-1.5 rounded hover:bg-secondary text-muted-foreground disabled:opacity-30">
                  <ArrowDown size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardGuestPortalConfig;
