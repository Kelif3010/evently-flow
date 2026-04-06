import { useState } from "react";
import { Monitor, Eye, RotateCcw, Plus, GripVertical, Smartphone, Tablet, Monitor as DesktopIcon, Palette, Type, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

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

// Mini phone preview component
const PhonePreview = ({ sections, previewDevice }: { sections: PortalSection[]; previewDevice: string }) => {
  const activeSections = sections.filter(s => s.enabled);
  const width = previewDevice === "phone" ? "w-[280px]" : previewDevice === "tablet" ? "w-[360px]" : "w-full";

  return (
    <div className={`${width} mx-auto bg-background rounded-2xl border-2 border-border shadow-xl overflow-hidden transition-all duration-300`}>
      {/* Phone notch */}
      {previewDevice === "phone" && (
        <div className="flex justify-center pt-2 pb-1 bg-secondary/30">
          <div className="w-20 h-1.5 bg-border rounded-full" />
        </div>
      )}
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/10 to-transparent px-4 py-6 text-center border-b border-border">
        <p className="text-[10px] text-muted-foreground font-body uppercase tracking-widest mb-1">Die Hochzeit von</p>
        <h3 className="font-heading text-lg font-bold text-foreground">Laura & Markus</h3>
        <p className="text-[10px] text-muted-foreground font-body mt-1">15. September 2025 · Schloss Neuschwanstein</p>
      </div>
      {/* Sections */}
      <div className="px-3 py-3 space-y-2 max-h-[400px] overflow-y-auto scrollbar-thin">
        {activeSections.map((section, i) => (
          <div
            key={section.id}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-200"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="text-base">{section.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-body font-medium text-foreground truncate">{section.label}</p>
              <p className="text-[10px] text-muted-foreground font-body truncate">{section.description}</p>
            </div>
          </div>
        ))}
        {activeSections.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-xs font-body">Keine Sektionen aktiv</div>
        )}
      </div>
      {/* Bottom bar */}
      <div className="border-t border-border px-4 py-2 bg-secondary/20 flex justify-center gap-6">
        <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
      </div>
    </div>
  );
};

const DashboardGuestPortalConfig = () => {
  const [sections, setSections] = useState(defaultSections);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSection, setNewSection] = useState({ label: "", description: "", emoji: "📌" });
  const [previewDevice, setPreviewDevice] = useState<"phone" | "tablet" | "desktop">("phone");
  const [activeTab, setActiveTab] = useState("sections");

  // Portal settings
  const [portalPublic, setPortalPublic] = useState(false);
  const [showCountdownBar, setShowCountdownBar] = useState(true);
  const [welcomeText, setWelcomeText] = useState("Wir freuen uns auf euch! 🎉");
  const [headerImage, setHeaderImage] = useState("");

  const toggleSection = (id: string) => {
    setSections(sections.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const resetSections = () => setSections(defaultSections);

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

  const removeSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
            <Monitor size={22} className="text-primary" /> Gästeseite konfigurieren
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-body mt-1">
            {sections.filter(s => s.enabled).length} von {sections.length} Sektionen aktiv
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link to="/demo/guest-portal">
            <Button variant="outline" size="sm" className="font-body text-xs">
              <Eye size={14} className="mr-1.5" /> Vorschau
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="font-body text-xs" onClick={() => setShowAddSection(true)}>
            <Plus size={14} className="mr-1.5" /> Sektion
          </Button>
          <Button variant="outline" size="sm" className="font-body text-xs" onClick={resetSections}>
            <RotateCcw size={14} className="mr-1.5" /> Reset
          </Button>
        </div>
      </div>

      {/* Main content: left config + right preview */}
      <div className="flex flex-col xl:flex-row gap-4">
        {/* Left: Config panel */}
        <div className="flex-1 min-w-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="sections" className="font-body text-xs">📦 Sektionen</TabsTrigger>
              <TabsTrigger value="appearance" className="font-body text-xs">🎨 Aussehen</TabsTrigger>
              <TabsTrigger value="access" className="font-body text-xs">🔒 Zugang</TabsTrigger>
            </TabsList>

            {/* Sections tab */}
            <TabsContent value="sections" className="space-y-3 mt-0">
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="px-4 py-3 bg-secondary/30 border-b border-border flex items-center justify-between">
                  <h3 className="font-heading text-sm font-semibold text-foreground">Sektionen verwalten</h3>
                  <span className="text-xs text-muted-foreground font-body">Per Drag & Drop sortieren</span>
                </div>
                <div className="divide-y divide-border max-h-[60vh] overflow-y-auto">
                  {sections.map((section, idx) => (
                    <div
                      key={section.id}
                      draggable
                      onDragStart={() => handleDragStart(idx)}
                      onDragOver={(e) => handleDragOver(e, idx)}
                      onDrop={() => handleDrop(idx)}
                      onDragEnd={handleDragEnd}
                      className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 cursor-grab active:cursor-grabbing ${
                        section.enabled ? "" : "opacity-50"
                      } ${dragOverIdx === idx && dragIdx !== idx ? "bg-primary/5 border-l-4 border-l-primary" : ""} ${
                        dragIdx === idx ? "opacity-30" : ""
                      } hover:bg-secondary/20`}
                    >
                      <GripVertical size={14} className="text-muted-foreground flex-shrink-0" />
                      <span className="text-lg flex-shrink-0">{section.emoji}</span>

                      <button
                        onClick={() => toggleSection(section.id)}
                        className={`w-10 h-5 rounded-full transition-colors flex-shrink-0 relative ${section.enabled ? "bg-primary" : "bg-border"}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-primary-foreground transition-transform absolute top-0.5 ${section.enabled ? "left-[22px]" : "left-0.5"}`} />
                      </button>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-body font-medium text-foreground truncate">{section.label}</p>
                        <p className="text-xs text-muted-foreground font-body truncate hidden sm:block">{section.description}</p>
                      </div>

                      {section.id.startsWith("custom_") && (
                        <button onClick={() => removeSection(section.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                          <span className="text-xs">✕</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Appearance tab */}
            <TabsContent value="appearance" className="space-y-4 mt-0">
              <div className="bg-card rounded-xl border border-border p-4 space-y-4">
                <h3 className="font-heading text-sm font-semibold text-foreground flex items-center gap-2">
                  <Type size={16} className="text-primary" /> Begrüßungstext
                </h3>
                <textarea
                  value={welcomeText}
                  onChange={e => setWelcomeText(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  placeholder="Willkommensnachricht für eure Gäste..."
                />
              </div>

              <div className="bg-card rounded-xl border border-border p-4 space-y-4">
                <h3 className="font-heading text-sm font-semibold text-foreground flex items-center gap-2">
                  <Image size={16} className="text-primary" /> Header-Bild
                </h3>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/30 transition-colors cursor-pointer">
                  <Image size={24} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground font-body">Bild hier ablegen oder klicken</p>
                  <p className="text-[10px] text-muted-foreground/60 font-body mt-1">JPG, PNG · max 5 MB</p>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-4 space-y-3">
                <h3 className="font-heading text-sm font-semibold text-foreground flex items-center gap-2">
                  <Palette size={16} className="text-primary" /> Darstellung
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-body font-medium text-foreground">Countdown-Balken</p>
                    <p className="text-xs text-muted-foreground font-body">Zeigt einen Countdown oben auf der Gästeseite</p>
                  </div>
                  <Switch checked={showCountdownBar} onCheckedChange={setShowCountdownBar} />
                </div>
              </div>
            </TabsContent>

            {/* Access tab */}
            <TabsContent value="access" className="space-y-4 mt-0">
              <div className="bg-card rounded-xl border border-border p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-body font-medium text-foreground">Portal öffentlich</p>
                    <p className="text-xs text-muted-foreground font-body">Ohne Passwort erreichbar</p>
                  </div>
                  <Switch checked={portalPublic} onCheckedChange={setPortalPublic} />
                </div>
                {!portalPublic && (
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">Zugangscode</label>
                    <input
                      defaultValue="LAURA-MARKUS-2025"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-body font-mono focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                )}
              </div>

              <div className="bg-card rounded-xl border border-border p-4 space-y-3">
                <h3 className="font-heading text-sm font-semibold text-foreground">Gästeportal-Link</h3>
                <div className="flex gap-2">
                  <input
                    readOnly
                    value="evoria.app/g/laura-markus"
                    className="flex-1 px-3 py-2 rounded-lg border border-border bg-secondary/30 text-sm font-body font-mono text-muted-foreground"
                  />
                  <Button variant="outline" size="sm" className="font-body text-xs">Kopieren</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right: Live Preview */}
        <div className="xl:w-[340px] flex-shrink-0">
          <div className="sticky top-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading text-sm font-semibold text-foreground">Live-Vorschau</h3>
              <div className="flex gap-1 bg-secondary/50 rounded-lg p-0.5">
                {([
                  { key: "phone" as const, icon: Smartphone, size: 14 },
                  { key: "tablet" as const, icon: Tablet, size: 14 },
                  { key: "desktop" as const, icon: DesktopIcon, size: 14 },
                ]).map(d => (
                  <button
                    key={d.key}
                    onClick={() => setPreviewDevice(d.key)}
                    className={`p-1.5 rounded-md transition-colors ${previewDevice === d.key ? "bg-card shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <d.icon size={d.size} />
                  </button>
                ))}
              </div>
            </div>
            <PhonePreview sections={sections} previewDevice={previewDevice} />
          </div>
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
