import { useState } from "react";
import {
  Users, CheckCircle, XCircle, Clock, Utensils,
  ListChecks, TrendingUp, ArrowRight, Settings2, Plus, X, RotateCcw,
  Camera, Music, Gift, BookOpen, Globe, Send, Heart, MessageSquare, Plane,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// ── Widget definitions ──

interface WidgetDef {
  id: string;
  title: string;
  icon: any;
  category: string;
  size: "sm" | "md" | "lg";
}

const allWidgets: WidgetDef[] = [
  { id: "stats", title: "RSVP-Statistiken", icon: Users, category: "Basis", size: "lg" },
  { id: "recent_guests", title: "Letzte Rückmeldungen", icon: CheckCircle, category: "Basis", size: "md" },
  { id: "tasks", title: "Aufgaben", icon: ListChecks, category: "Basis", size: "md" },
  { id: "activity", title: "Letzte Aktivitäten", icon: TrendingUp, category: "Basis", size: "md" },
  { id: "meals", title: "Essenswahl", icon: Utensils, category: "Basis", size: "sm" },
  { id: "allergies", title: "Allergien & Diäten", icon: Utensils, category: "Basis", size: "sm" },
  { id: "budget", title: "Budget-Übersicht", icon: TrendingUp, category: "Basis", size: "sm" },
  { id: "guestbook", title: "Letzte Gästebuch-Einträge", icon: BookOpen, category: "Erlebnis", size: "md" },
  { id: "photos", title: "Foto-Uploads", icon: Camera, category: "Erlebnis", size: "sm" },
  { id: "music", title: "Musik-Vorschläge", icon: Music, category: "Erlebnis", size: "sm" },
  { id: "wishlist", title: "Wunschlisten-Status", icon: Gift, category: "Erlebnis", size: "sm" },
  { id: "invitations", title: "Einladungs-Fortschritt", icon: Send, category: "Kommunikation", size: "sm" },
  { id: "honeymoon", title: "Flitterwochen Top-Ziele", icon: Globe, category: "Erlebnis", size: "sm" },
];

const defaultWidgetIds = ["stats", "recent_guests", "tasks", "activity", "meals", "allergies", "budget"];

// ── Widget Renderers ──

const StatsWidget = () => {
  const stats = [
    { label: "Gäste gesamt", value: "124", icon: Users, change: "+8 diese Woche", color: "text-primary" },
    { label: "Zusagen", value: "87", icon: CheckCircle, change: "70%", color: "text-primary" },
    { label: "Absagen", value: "12", icon: XCircle, change: "10%", color: "text-accent" },
    { label: "Ausstehend", value: "25", icon: Clock, change: "20%", color: "text-gold" },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground font-body">{s.label}</span>
            <s.icon size={18} className={s.color} />
          </div>
          <p className="text-3xl font-heading font-bold text-foreground">{s.value}</p>
          <p className="text-xs text-muted-foreground font-body mt-1 flex items-center gap-1">
            <TrendingUp size={12} /> {s.change}
          </p>
        </div>
      ))}
    </div>
  );
};

const RecentGuestsWidget = () => {
  const guests = [
    { name: "Sophie Weber", status: "Zugesagt", meal: "Vegetarisch", plusOne: "Ja" },
    { name: "Thomas Müller", status: "Zugesagt", meal: "Standard", plusOne: "Nein" },
    { name: "Maria Schmidt", status: "Ausstehend", meal: "–", plusOne: "–" },
    { name: "Felix Braun", status: "Abgesagt", meal: "–", plusOne: "–" },
    { name: "Anna Hoffmann", status: "Zugesagt", meal: "Vegan", plusOne: "Ja" },
  ];
  return (
    <div className="bg-card rounded-xl border border-border">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h3 className="font-heading text-lg font-semibold text-foreground">Letzte Rückmeldungen</h3>
        <Link to="/demo/dashboard/guests" className="text-sm text-primary font-body flex items-center gap-1 hover:underline">Alle <ArrowRight size={14} /></Link>
      </div>
      <div className="divide-y divide-border">
        {guests.map((g, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-champagne flex items-center justify-center text-xs font-heading font-bold text-primary">
                {g.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-body font-medium text-foreground">{g.name}</p>
                <p className="text-xs text-muted-foreground font-body">{g.meal} · Plus-One: {g.plusOne}</p>
              </div>
            </div>
            <span className={`text-xs font-body font-medium px-2.5 py-1 rounded-full ${
              g.status === "Zugesagt" ? "bg-champagne text-primary" : g.status === "Abgesagt" ? "bg-rose-light text-accent" : "bg-gold-light text-champagne-foreground"
            }`}>{g.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TasksWidget = () => {
  const tasks = [
    { task: "Blumendeko bestätigen", due: "In 3 Tagen", done: false },
    { task: "DJ-Playlist finalisieren", due: "In 5 Tagen", done: false },
    { task: "Tischkarten drucken", due: "In 1 Woche", done: false },
    { task: "Menü mit Caterer abstimmen", due: "Erledigt", done: true },
    { task: "Fotografen-Briefing", due: "Erledigt", done: true },
  ];
  return (
    <div className="bg-card rounded-xl border border-border">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h3 className="font-heading text-lg font-semibold text-foreground">Aufgaben</h3>
        <Link to="/demo/dashboard/tasks" className="text-sm text-primary font-body flex items-center gap-1 hover:underline">Alle <ArrowRight size={14} /></Link>
      </div>
      <div className="divide-y divide-border">
        {tasks.map((t, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-3">
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${t.done ? "bg-primary border-primary" : "border-border"}`}>
              {t.done && <CheckCircle size={12} className="text-primary-foreground" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-body ${t.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{t.task}</p>
            </div>
            <span className={`text-xs font-body ${t.done ? "text-muted-foreground" : "text-primary"}`}>{t.due}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ActivityWidget = () => {
  const activities = [
    { text: "Maria Müller hat zugesagt", time: "vor 2 Stunden", icon: CheckCircle, color: "text-primary" },
    { text: "Anna Fischer hat Allergien aktualisiert", time: "vor 5 Stunden", icon: Utensils, color: "text-accent" },
    { text: "Paul Bauer hat Songwunsch eingereicht", time: "gestern", icon: Music, color: "text-gold" },
    { text: "3 neue RSVP-Antworten", time: "gestern", icon: Send, color: "text-primary" },
    { text: "Hotel Schlossblick Kontingent bestätigt", time: "vor 2 Tagen", icon: CheckCircle, color: "text-primary" },
  ];
  return (
    <div className="bg-card rounded-xl border border-border">
      <div className="p-5 border-b border-border">
        <h3 className="font-heading text-lg font-semibold text-foreground">Letzte Aktivitäten</h3>
      </div>
      <div className="divide-y divide-border">
        {activities.map((a, i) => (
          <div key={i} className="flex items-start gap-3 px-5 py-3">
            <div className={`mt-0.5 ${a.color}`}><a.icon size={16} /></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body text-foreground">{a.text}</p>
              <p className="text-xs text-muted-foreground font-body">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MealsWidget = () => (
  <div className="bg-card rounded-xl border border-border p-5">
    <h3 className="font-heading text-base font-semibold text-foreground mb-4">Essenswahl</h3>
    <div className="space-y-3">
      {[
        { label: "Standard", count: 42, pct: 48, color: "bg-primary" },
        { label: "Vegetarisch", count: 23, pct: 26, color: "bg-gold" },
        { label: "Vegan", count: 14, pct: 16, color: "bg-accent" },
        { label: "Sonstiges", count: 8, pct: 10, color: "bg-taupe" },
      ].map((m, i) => (
        <div key={i}>
          <div className="flex justify-between text-sm font-body mb-1">
            <span className="text-foreground">{m.label}</span>
            <span className="text-muted-foreground">{m.count} ({m.pct}%)</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AllergiesWidget = () => (
  <div className="bg-card rounded-xl border border-border p-5">
    <h3 className="font-heading text-base font-semibold text-foreground mb-4">Allergien & Diäten</h3>
    <div className="space-y-2">
      {[
        { label: "Laktoseintoleranz", count: 5 },
        { label: "Glutenfrei", count: 3 },
        { label: "Nussallergie", count: 4 },
        { label: "Halal", count: 2 },
        { label: "Keine Angabe", count: 73 },
      ].map((a, i) => (
        <div key={i} className="flex items-center justify-between py-1.5">
          <div className="flex items-center gap-2">
            <Utensils size={14} className="text-accent" />
            <span className="text-sm font-body text-foreground">{a.label}</span>
          </div>
          <span className="text-sm font-body text-muted-foreground">{a.count} Gäste</span>
        </div>
      ))}
    </div>
  </div>
);

const BudgetWidget = () => (
  <div className="bg-card rounded-xl border border-border p-5">
    <h3 className="font-heading text-base font-semibold text-foreground mb-4">Budget-Übersicht</h3>
    <div className="text-center mb-4">
      <p className="text-3xl font-heading font-bold text-foreground">€18.450</p>
      <p className="text-sm text-muted-foreground font-body">von €25.000 geplant</p>
    </div>
    <div className="h-3 bg-secondary rounded-full overflow-hidden mb-4">
      <div className="h-full rounded-full bg-primary" style={{ width: "74%" }} />
    </div>
    <div className="space-y-2">
      {[
        { label: "Location", amount: "€5.500" },
        { label: "Catering", amount: "€6.200" },
        { label: "Fotograf", amount: "€2.800" },
      ].map((b, i) => (
        <div key={i} className="flex justify-between text-sm font-body">
          <span className="text-foreground">{b.label}</span>
          <span className="text-muted-foreground">{b.amount}</span>
        </div>
      ))}
    </div>
  </div>
);

const GuestbookWidget = () => (
  <div className="bg-card rounded-xl border border-border">
    <div className="flex items-center justify-between p-5 border-b border-border">
      <h3 className="font-heading text-lg font-semibold text-foreground">Letzte Gästebuch-Einträge</h3>
      <Link to="/demo/dashboard/guestbook" className="text-sm text-primary font-body flex items-center gap-1 hover:underline">Alle <ArrowRight size={14} /></Link>
    </div>
    <div className="divide-y divide-border">
      {[
        { author: "Sophie Weber", msg: "Wir freuen uns riesig auf eure Hochzeit! 💕", time: "vor 2 Std.", mood: "🥰" },
        { author: "Thomas Müller", msg: "Herzlichen Glückwunsch euch beiden!", time: "vor 5 Std.", mood: "🎉" },
        { author: "Anna Hoffmann", msg: "Ich kenne Laura schon seit dem Kindergarten...", time: "gestern", mood: "😊" },
      ].map((e, i) => (
        <div key={i} className="flex items-start gap-3 px-5 py-3">
          <span className="text-lg">{e.mood}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-body font-medium text-foreground">{e.author}</p>
            <p className="text-xs text-muted-foreground font-body truncate">{e.msg}</p>
          </div>
          <span className="text-xs text-muted-foreground font-body flex-shrink-0">{e.time}</span>
        </div>
      ))}
    </div>
  </div>
);

const PhotosWidget = () => (
  <div className="bg-card rounded-xl border border-border p-5">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-heading text-base font-semibold text-foreground">Foto-Uploads</h3>
      <Camera size={18} className="text-primary" />
    </div>
    <p className="text-3xl font-heading font-bold text-foreground">47</p>
    <p className="text-xs text-muted-foreground font-body mt-1">Fotos hochgeladen</p>
    <div className="flex gap-1 mt-3">
      {["📸", "🌅", "💐", "🥂"].map((e, i) => (
        <div key={i} className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-lg">{e}</div>
      ))}
    </div>
  </div>
);

const MusicWidget = () => (
  <div className="bg-card rounded-xl border border-border p-5">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-heading text-base font-semibold text-foreground">Musik-Vorschläge</h3>
      <Music size={18} className="text-primary" />
    </div>
    <p className="text-3xl font-heading font-bold text-foreground">23</p>
    <p className="text-xs text-muted-foreground font-body mt-1">Songwünsche eingereicht</p>
    <div className="mt-3 space-y-1.5">
      {["Perfect – Ed Sheeran", "Marry You – Bruno Mars", "Can't Help Falling..."].map((s, i) => (
        <p key={i} className="text-xs font-body text-foreground truncate">🎵 {s}</p>
      ))}
    </div>
  </div>
);

const WishlistWidget = () => (
  <div className="bg-card rounded-xl border border-border p-5">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-heading text-base font-semibold text-foreground">Wunschliste</h3>
      <Gift size={18} className="text-primary" />
    </div>
    <p className="text-3xl font-heading font-bold text-foreground">5/8</p>
    <p className="text-xs text-muted-foreground font-body mt-1">Wünsche reserviert</p>
    <div className="h-2 bg-secondary rounded-full overflow-hidden mt-3">
      <div className="h-full rounded-full bg-primary" style={{ width: "62%" }} />
    </div>
  </div>
);

const InvitationsWidget = () => (
  <div className="bg-card rounded-xl border border-border p-5">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-heading text-base font-semibold text-foreground">Einladungen</h3>
      <Send size={18} className="text-primary" />
    </div>
    <p className="text-3xl font-heading font-bold text-foreground">98/124</p>
    <p className="text-xs text-muted-foreground font-body mt-1">Einladungen versendet</p>
    <div className="h-2 bg-secondary rounded-full overflow-hidden mt-3">
      <div className="h-full rounded-full bg-primary" style={{ width: "79%" }} />
    </div>
  </div>
);

const HoneymoonWidget = () => (
  <div className="bg-card rounded-xl border border-border p-5">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-heading text-base font-semibold text-foreground">Flitterwochen</h3>
      <Globe size={18} className="text-primary" />
    </div>
    <div className="space-y-2">
      {[
        { dest: "🏝️ Malediven", votes: 18 },
        { dest: "🏛️ Santorini", votes: 14 },
        { dest: "🌺 Bali", votes: 12 },
      ].map((d, i) => (
        <div key={i} className="flex items-center justify-between">
          <span className="text-sm font-body text-foreground">{d.dest}</span>
          <span className="text-xs text-muted-foreground font-body">{d.votes} Stimmen</span>
        </div>
      ))}
    </div>
  </div>
);

const widgetRenderers: Record<string, () => JSX.Element> = {
  stats: StatsWidget,
  recent_guests: RecentGuestsWidget,
  tasks: TasksWidget,
  activity: ActivityWidget,
  meals: MealsWidget,
  allergies: AllergiesWidget,
  budget: BudgetWidget,
  guestbook: GuestbookWidget,
  photos: PhotosWidget,
  music: MusicWidget,
  wishlist: WishlistWidget,
  invitations: InvitationsWidget,
  honeymoon: HoneymoonWidget,
};

// ── Main Component ──

const DashboardOverview = () => {
  const [activeWidgets, setActiveWidgets] = useState<string[]>(defaultWidgetIds);
  const [editMode, setEditMode] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const removeWidget = (id: string) => setActiveWidgets(activeWidgets.filter(w => w !== id));
  const addWidget = (id: string) => { setActiveWidgets([...activeWidgets, id]); setShowAddDialog(false); };
  const resetWidgets = () => { setActiveWidgets(defaultWidgetIds); setEditMode(false); };

  const availableToAdd = allWidgets.filter(w => !activeWidgets.includes(w.id));

  const moveWidget = (idx: number, dir: -1 | 1) => {
    if ((dir === -1 && idx === 0) || (dir === 1 && idx === activeWidgets.length - 1)) return;
    const newW = [...activeWidgets];
    [newW[idx], newW[idx + dir]] = [newW[idx + dir], newW[idx]];
    setActiveWidgets(newW);
  };

  return (
    <div className="space-y-6">
      {/* Demo Banner + Edit Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="bg-gold-light rounded-xl p-4 flex-1">
          <p className="text-sm font-body text-champagne-foreground">
            🎯 <strong>Demo-Modus</strong> – Dies ist eine interaktive Vorschau des Evoria Dashboards.
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {editMode && (
            <>
              <Button variant="outline" size="sm" className="font-body" onClick={() => setShowAddDialog(true)}>
                <Plus size={14} className="mr-1.5" /> Widget hinzufügen
              </Button>
              <Button variant="outline" size="sm" className="font-body" onClick={resetWidgets}>
                <RotateCcw size={14} className="mr-1.5" /> Zurücksetzen
              </Button>
            </>
          )}
          <Button
            variant={editMode ? "default" : "outline"}
            size="sm"
            className="font-body"
            onClick={() => setEditMode(!editMode)}
          >
            <Settings2 size={14} className="mr-1.5" />
            {editMode ? "Fertig" : "Anpassen"}
          </Button>
        </div>
      </div>

      {/* Widgets */}
      {activeWidgets.map((widgetId, idx) => {
        const Renderer = widgetRenderers[widgetId];
        const def = allWidgets.find(w => w.id === widgetId);
        if (!Renderer || !def) return null;

        return (
          <div key={widgetId} className="relative group">
            {editMode && (
              <div className="absolute -top-2 right-2 z-10 flex gap-1 bg-card border border-border rounded-lg shadow-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => moveWidget(idx, -1)} disabled={idx === 0} className="p-1.5 rounded hover:bg-secondary text-muted-foreground disabled:opacity-30 text-xs">↑</button>
                <button onClick={() => moveWidget(idx, 1)} disabled={idx === activeWidgets.length - 1} className="p-1.5 rounded hover:bg-secondary text-muted-foreground disabled:opacity-30 text-xs">↓</button>
                <button onClick={() => removeWidget(widgetId)} className="p-1.5 rounded hover:bg-secondary text-destructive text-xs"><X size={14} /></button>
              </div>
            )}
            <div className={editMode ? "ring-1 ring-primary/20 ring-dashed rounded-xl" : ""}>
              <Renderer />
            </div>
          </div>
        );
      })}

      {/* Add Widget Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading">Widget hinzufügen</DialogTitle>
          </DialogHeader>
          {availableToAdd.length === 0 ? (
            <p className="text-sm text-muted-foreground font-body py-4">Alle Widgets sind bereits aktiv.</p>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {availableToAdd.map(w => (
                <button
                  key={w.id}
                  onClick={() => addWidget(w.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-left"
                >
                  <w.icon size={18} className="text-primary" />
                  <div>
                    <p className="text-sm font-body font-medium text-foreground">{w.title}</p>
                    <p className="text-xs text-muted-foreground font-body">{w.category}</p>
                  </div>
                  <Plus size={16} className="ml-auto text-muted-foreground" />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardOverview;
