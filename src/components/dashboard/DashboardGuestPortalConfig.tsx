import { useState, useRef } from "react";
import { Monitor, Eye, RotateCcw, Plus, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSection, setNewSection] = useState({ label: "", description: "", emoji: "📌" });

  const toggleSection = (id: string) => {
    setSections(sections.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const resetSections = () => setSections(defaultSections);

  // Drag and drop
  const handleDragStart = (idx: number) => setDragIdx(idx);
  const handleDragOver = (e: React.DragEvent, idx: number) => { e.preventDefault(); setDragOverIdx(idx); };
  const handleDrop = (idx: number) => {
    if (dragIdx === null) return;
    const newSections = [...sections];
    const [moved] = newSections.splice(dragIdx, 1);
    newSections.splice(idx, 0, moved);
    setSections(newSections);
    setDragIdx(null);
    setDragOverIdx(null);
  };
  const handleDragEnd = () => { setDragIdx(null); setDragOverIdx(null); };

  const addSection = () => {
    if (!newSection.label) return;
    setSections([...sections, {
      id: `custom_${Date.now()}`,
      label: newSection.label,
      description: newSection.description,
      enabled: true,
      emoji: newSection.emoji,
    }]);
    setNewSection({ label: "", description: "", emoji: "📌" });
    setShowAddSection(false);
  };

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
          <Button variant="outline" size="sm" className="font-body" onClick={() => setShowAddSection(true)}>
            <Plus size={14} className="mr-1.5" /> Sektion
          </Button>
          <Button variant="outline" size="sm" className="font-body" onClick={resetSections}>
            <RotateCcw size={14} className="mr-1.5" /> Reset
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="bg-champagne/50 rounded-xl border border-border p-4 flex items-start gap-3">
        <span className="text-lg">💡</span>
        <div>
          <p className="text-sm font-body font-medium text-foreground">Drag & Drop</p>
          <p className="text-xs text-muted-foreground font-body mt-1">
            Zieht die Sektionen per Drag & Drop in die gewünschte Reihenfolge. Schaltet Sektionen ein oder aus.
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
            <div
              key={section.id}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={() => handleDrop(idx)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-4 px-5 py-4 transition-all duration-200 cursor-grab active:cursor-grabbing ${
                section.enabled ? "" : "opacity-50"
              } ${dragOverIdx === idx && dragIdx !== idx ? "bg-primary/5 border-l-4 border-l-primary" : ""} ${
                dragIdx === idx ? "opacity-30" : ""
              } hover:bg-secondary/20`}
            >
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
            </div>
          ))}
        </div>
      </div>

      {/* Add Section Dialog */}
      <Dialog open={showAddSection} onOpenChange={setShowAddSection}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-heading">Neue Sektion</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">Name</label>
              <input value={newSection.label} onChange={e => setNewSection({...newSection, label: e.target.value})} placeholder="z.B. Dresscode" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">Beschreibung</label>
              <input value={newSection.description} onChange={e => setNewSection({...newSection, description: e.target.value})} placeholder="Kurze Beschreibung" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">Emoji</label>
              <input value={newSection.emoji} onChange={e => setNewSection({...newSection, emoji: e.target.value})} className="w-20 px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="flex gap-2 pt-2">
              <Button className="font-body flex-1" onClick={addSection}>Hinzufügen</Button>
              <Button variant="outline" className="font-body" onClick={() => setShowAddSection(false)}>Abbrechen</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardGuestPortalConfig;
