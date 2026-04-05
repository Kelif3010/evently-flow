import { useState, useRef, useCallback } from "react";
import {
  Users, CheckCircle, XCircle, Clock, Utensils,
  ListChecks, TrendingUp, ArrowRight, Settings2, Plus, X, RotateCcw,
  Camera, Music, Gift, BookOpen, Globe, Send, Heart, MessageSquare, Plane,
  LayoutGrid, List, AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

// ── Widget definitions ──

interface WidgetDef {
  id: string;
  title: string;
  icon: any;
  category: string;
  size: "sm" | "md" | "lg";
  colSpan?: number;
}

const allWidgets: WidgetDef[] = [
  { id: "stats", title: "RSVP-Statistiken", icon: Users, category: "Basis", size: "lg", colSpan: 4 },
  { id: "recent_guests", title: "Letzte Rückmeldungen", icon: CheckCircle, category: "Basis", size: "md", colSpan: 2 },
  { id: "tasks", title: "Aufgaben", icon: ListChecks, category: "Basis", size: "md", colSpan: 2 },
  { id: "activity", title: "Letzte Aktivitäten", icon: TrendingUp, category: "Basis", size: "md", colSpan: 2 },
  { id: "meals", title: "Essenswahl", icon: Utensils, category: "Basis", size: "sm", colSpan: 1 },
  { id: "allergies", title: "Allergien & Diäten", icon: Utensils, category: "Basis", size: "sm", colSpan: 1 },
  { id: "budget", title: "Budget-Übersicht", icon: TrendingUp, category: "Basis", size: "sm", colSpan: 1 },
  { id: "guestbook", title: "Letzte Gästebuch-Einträge", icon: BookOpen, category: "Erlebnis", size: "md", colSpan: 2 },
  { id: "photos", title: "Foto-Uploads", icon: Camera, category: "Erlebnis", size: "sm", colSpan: 1 },
  { id: "music", title: "Musik-Vorschläge", icon: Music, category: "Erlebnis", size: "sm", colSpan: 1 },
  { id: "wishlist", title: "Wunschlisten-Status", icon: Gift, category: "Erlebnis", size: "sm", colSpan: 1 },
  { id: "invitations", title: "Einladungs-Fortschritt", icon: Send, category: "Kommunikation", size: "sm", colSpan: 1 },
  { id: "honeymoon", title: "Flitterwochen Top-Ziele", icon: Globe, category: "Erlebnis", size: "sm", colSpan: 1 },
];

const defaultWidgetIds = ["stats", "recent_guests", "tasks", "activity", "meals", "allergies", "budget"];

// ── Animated Stat Card ──
const AnimatedStat = ({ label, target, icon: Icon, change, color }: { label: string; target: number; icon: any; change: string; color: string }) => {
  const value = useAnimatedNumber(target);
  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground font-body">{label}</span>
        <Icon size={18} className={`${color} group-hover:scale-110 transition-transform`} />
      </div>
      <p className="text-3xl font-heading font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground font-body mt-1 flex items-center gap-1">
        <TrendingUp size={12} /> {change}
      </p>
    </div>
  );
};

// ── Widget Renderers ──

const StatsWidget = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <AnimatedStat label="Gäste gesamt" target={124} icon={Users} change="+8 diese Woche" color="text-primary" />
    <AnimatedStat label="Zusagen" target={87} icon={CheckCircle} change="70%" color="text-primary" />
    <AnimatedStat label="Absagen" target={12} icon={XCircle} change="10%" color="text-accent" />
    <AnimatedStat label="Ausstehend" target={25} icon={Clock} change="20%" color="text-gold" />
  </div>
);

const RecentGuestsWidget = () => {
  const guests = [
    { name: "Sophie Weber", status: "Zugesagt", meal: "Vegetarisch", plusOne: "Ja" },
    { name: "Thomas Müller", status: "Zugesagt", meal: "Standard", plusOne: "Nein" },
    { name: "Maria Schmidt", status: "Ausstehend", meal: "–", plusOne: "–" },
    { name: "Felix Braun", status: "Abgesagt", meal: "–", plusOne: "–" },
    { name: "Anna Hoffmann", status: "Zugesagt", meal: "Vegan", plusOne: "Ja" },
  ];
  return (
    <div className="bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h3 className="font-heading text-lg font-semibold text-foreground">Letzte Rückmeldungen</h3>
        <Link to="/demo/dashboard/guests" className="text-sm text-primary font-body flex items-center gap-1 hover:underline">Alle <ArrowRight size={14} /></Link>
      </div>
      <div className="divide-y divide-border">
        {guests.map((g, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-secondary/30 transition-colors" style={{ animationDelay: `${i * 80}ms` }}>
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
    <div className="bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h3 className="font-heading text-lg font-semibold text-foreground">Aufgaben</h3>
        <Link to="/demo/dashboard/tasks" className="text-sm text-primary font-body flex items-center gap-1 hover:underline">Alle <ArrowRight size={14} /></Link>
      </div>
      <div className="divide-y divide-border">
        {tasks.map((t, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-secondary/30 transition-colors">
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
    <div className="bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300">
      <div className="p-5 border-b border-border">
        <h3 className="font-heading text-lg font-semibold text-foreground">Letzte Aktivitäten</h3>
      </div>
      <div className="divide-y divide-border">
        {activities.map((a, i) => (
          <div key={i} className="flex items-start gap-3 px-5 py-3 hover:bg-secondary/30 transition-colors">
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
  <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all duration-300">
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
            <div className={`h-full rounded-full ${m.color} transition-all duration-1000`} style={{ width: `${m.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AllergiesWidget = () => (
  <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all duration-300">
    <h3 className="font-heading text-base font-semibold text-foreground mb-4">Allergien & Diäten</h3>
    <div className="space-y-2">
      {[
        { label: "Laktoseintoleranz", count: 5 },
        { label: "Glutenfrei", count: 3 },
        { label: "Nussallergie", count: 4 },
        { label: "Halal", count: 2 },
        { label: "Keine Angabe", count: 73 },
      ].map((a, i) => (
        <div key={i} className="flex items-center justify-between py-1.5 hover:bg-secondary/30 rounded-lg px-2 transition-colors">
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

const BudgetWidget = () => {
  const spent = useAnimatedNumber(18450);
  const pctUsed = 74;
  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all duration-300">
      <h3 className="font-heading text-base font-semibold text-foreground mb-4">Budget-Übersicht</h3>
      <div className="text-center mb-4">
        <p className="text-3xl font-heading font-bold text-foreground">€{spent.toLocaleString("de-DE")}</p>
        <p className="text-sm text-muted-foreground font-body">von €25.000 geplant</p>
      </div>
      <div className="h-3 bg-secondary rounded-full overflow-hidden mb-4">
        <div className="h-full rounded-full bg-primary transition-all duration-1000" style={{ width: `${pctUsed}%` }} />
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
};

const GuestbookWidget = () => (
  <div className="bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300">
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
        <div key={i} className="flex items-start gap-3 px-5 py-3 hover:bg-secondary/30 transition-colors">
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

const PhotosWidget = () => {
  const count = useAnimatedNumber(47);
  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading text-base font-semibold text-foreground">Foto-Uploads</h3>
        <Camera size={18} className="text-primary" />
      </div>
      <p className="text-3xl font-heading font-bold text-foreground">{count}</p>
      <p className="text-xs text-muted-foreground font-body mt-1">Fotos hochgeladen</p>
      <div className="flex gap-1 mt-3">
        {["📸", "🌅", "💐", "🥂"].map((e, i) => (
          <div key={i} className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-lg hover:scale-110 transition-transform cursor-pointer">{e}</div>
        ))}
      </div>
    </div>
  );
};

const MusicWidget = () => {
  const count = useAnimatedNumber(23);
  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading text-base font-semibold text-foreground">Musik-Vorschläge</h3>
        <Music size={18} className="text-primary" />
      </div>
      <p className="text-3xl font-heading font-bold text-foreground">{count}</p>
      <p className="text-xs text-muted-foreground font-body mt-1">Songwünsche eingereicht</p>
      <div className="mt-3 space-y-1.5">
        {["Perfect – Ed Sheeran", "Marry You – Bruno Mars", "Can't Help Falling..."].map((s, i) => (
          <p key={i} className="text-xs font-body text-foreground truncate">🎵 {s}</p>
        ))}
      </div>
    </div>
  );
};

const WishlistWidget = () => (
  <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-heading text-base font-semibold text-foreground">Wunschliste</h3>
      <Gift size={18} className="text-primary" />
    </div>
    <p className="text-3xl font-heading font-bold text-foreground">5/8</p>
    <p className="text-xs text-muted-foreground font-body mt-1">Wünsche reserviert</p>
    <div className="h-2 bg-secondary rounded-full overflow-hidden mt-3">
      <div className="h-full rounded-full bg-primary transition-all duration-1000" style={{ width: "62%" }} />
    </div>
  </div>
);

const InvitationsWidget = () => {
  const sent = useAnimatedNumber(98);
  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading text-base font-semibold text-foreground">Einladungen</h3>
        <Send size={18} className="text-primary" />
      </div>
      <p className="text-3xl font-heading font-bold text-foreground">{sent}/124</p>
      <p className="text-xs text-muted-foreground font-body mt-1">Einladungen versendet</p>
      <div className="h-2 bg-secondary rounded-full overflow-hidden mt-3">
        <div className="h-full rounded-full bg-primary transition-all duration-1000" style={{ width: "79%" }} />
      </div>
    </div>
  );
};

const HoneymoonWidget = () => (
  <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all duration-300">
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
        <div key={i} className="flex items-center justify-between hover:bg-secondary/30 rounded-lg px-2 py-1 transition-colors">
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const removeWidget = (id: string) => setActiveWidgets(activeWidgets.filter(w => w !== id));
  const addWidget = (id: string) => { setActiveWidgets([...activeWidgets, id]); setShowAddDialog(false); };
  const resetWidgets = () => { setActiveWidgets(defaultWidgetIds); setEditMode(false); };

  const availableToAdd = allWidgets.filter(w => !activeWidgets.includes(w.id));

  // Budget banner
  const pctUsed = 74;
  const showYellowBanner = pctUsed >= 90 && pctUsed < 100;
  const showRedBanner = pctUsed >= 100;

  // Drag and drop
  const handleDragStart = (idx: number) => {
    if (!editMode) return;
    setDragIdx(idx);
  };
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (!editMode) return;
    setDragOverIdx(idx);
  };
  const handleDrop = (idx: number) => {
    if (dragIdx === null || !editMode) return;
    const newWidgets = [...activeWidgets];
    const [moved] = newWidgets.splice(dragIdx, 1);
    newWidgets.splice(idx, 0, moved);
    setActiveWidgets(newWidgets);
    setDragIdx(null);
    setDragOverIdx(null);
  };
  const handleDragEnd = () => {
    setDragIdx(null);
    setDragOverIdx(null);
  };

  const getGridClass = (widgetId: string) => {
    if (viewMode === "list") return "col-span-full";
    const def = allWidgets.find(w => w.id === widgetId);
    if (!def) return "col-span-full";
    if (def.colSpan === 4) return "col-span-full";
    if (def.colSpan === 2) return "col-span-full lg:col-span-2";
    return "col-span-full sm:col-span-2 lg:col-span-1";
  };

  return (
    <div className="space-y-6">
      {/* Budget Banners */}
      {showRedBanner && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
          <AlertTriangle size={20} className="text-destructive" />
          <div>
            <p className="text-sm font-body font-medium text-destructive">Budget überschritten!</p>
            <p className="text-xs text-destructive/80 font-body">Ihr habt das geplante Budget um {pctUsed - 100}% überschritten.</p>
          </div>
        </div>
      )}
      {showYellowBanner && (
        <div className="bg-gold-light border border-gold/30 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
          <AlertTriangle size={20} className="text-gold" />
          <div>
            <p className="text-sm font-body font-medium text-foreground">Budget-Warnung</p>
            <p className="text-xs text-muted-foreground font-body">{pctUsed}% des Budgets sind bereits verplant.</p>
          </div>
        </div>
      )}

      {/* Demo Banner + Edit Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="bg-gold-light rounded-xl p-4 flex-1">
          <p className="text-sm font-body text-champagne-foreground">
            🎯 <strong>Demo-Modus</strong> – Dies ist eine interaktive Vorschau des Evoria Dashboards.
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {/* View mode toggle */}
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-secondary"}`}
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-secondary"}`}
            >
              <List size={14} />
            </button>
          </div>
          {editMode && (
            <>
              <Button variant="outline" size="sm" className="font-body" onClick={() => setShowAddDialog(true)}>
                <Plus size={14} className="mr-1.5" /> Widget
              </Button>
              <Button variant="outline" size="sm" className="font-body" onClick={resetWidgets}>
                <RotateCcw size={14} className="mr-1.5" /> Reset
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

      {/* Widgets Grid */}
      <div className={viewMode === "grid" ? "grid grid-cols-full sm:grid-cols-2 lg:grid-cols-4 gap-4" : "space-y-4"}>
        {activeWidgets.map((widgetId, idx) => {
          const Renderer = widgetRenderers[widgetId];
          const def = allWidgets.find(w => w.id === widgetId);
          if (!Renderer || !def) return null;

          return (
            <div
              key={widgetId}
              className={`relative group animate-fade-in ${getGridClass(widgetId)} ${
                editMode ? "cursor-grab active:cursor-grabbing" : ""
              } ${dragOverIdx === idx && dragIdx !== idx ? "ring-2 ring-primary ring-dashed rounded-xl" : ""} ${
                dragIdx === idx ? "opacity-50" : ""
              }`}
              draggable={editMode}
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={() => handleDrop(idx)}
              onDragEnd={handleDragEnd}
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              {editMode && (
                <div className="absolute -top-2 right-2 z-10 flex gap-1 bg-card border border-border rounded-lg shadow-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => removeWidget(widgetId)} className="p-1.5 rounded hover:bg-secondary text-destructive text-xs"><X size={14} /></button>
                </div>
              )}
              <div className={editMode ? "ring-1 ring-primary/20 ring-dashed rounded-xl" : ""}>
                <Renderer />
              </div>
            </div>
          );
        })}
      </div>

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
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-left group"
                >
                  <w.icon size={18} className="text-primary group-hover:scale-110 transition-transform" />
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
