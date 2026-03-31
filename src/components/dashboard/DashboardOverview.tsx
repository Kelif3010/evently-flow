import {
  Users, CheckCircle, XCircle, Clock, Utensils, Hotel,
  ListChecks, TrendingUp, ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Gäste gesamt", value: "124", icon: Users, change: "+8 diese Woche", color: "text-primary" },
  { label: "Zusagen", value: "87", icon: CheckCircle, change: "70%", color: "text-green-600" },
  { label: "Absagen", value: "12", icon: XCircle, change: "10%", color: "text-accent" },
  { label: "Ausstehend", value: "25", icon: Clock, change: "20%", color: "text-gold" },
];

const recentGuests = [
  { name: "Sophie Weber", status: "Zugesagt", meal: "Vegetarisch", plusOne: "Ja" },
  { name: "Thomas Müller", status: "Zugesagt", meal: "Standard", plusOne: "Nein" },
  { name: "Maria Schmidt", status: "Ausstehend", meal: "–", plusOne: "–" },
  { name: "Felix Braun", status: "Abgesagt", meal: "–", plusOne: "–" },
  { name: "Anna Hoffmann", status: "Zugesagt", meal: "Vegan", plusOne: "Ja" },
];

const upcomingTasks = [
  { task: "Blumendeko bestätigen", due: "In 3 Tagen", done: false },
  { task: "DJ-Playlist finalisieren", due: "In 5 Tagen", done: false },
  { task: "Tischkarten drucken", due: "In 1 Woche", done: false },
  { task: "Menü mit Caterer abstimmen", due: "Erledigt", done: true },
  { task: "Fotografen-Briefing", due: "Erledigt", done: true },
];

const DashboardOverview = () => (
  <div className="space-y-6">
    {/* Demo Banner */}
    <div className="bg-gold-light rounded-xl p-4 flex items-center justify-between">
      <p className="text-sm font-body text-champagne-foreground">
        🎯 <strong>Demo-Modus</strong> – Dies ist eine interaktive Vorschau des Evoria Dashboards.
      </p>
      <Link to="/" className="text-sm font-body font-medium text-primary hover:underline">
        Zurück zur Website
      </Link>
    </div>

    {/* Stats */}
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

    <div className="grid lg:grid-cols-2 gap-6">
      {/* Recent Guests */}
      <div className="bg-card rounded-xl border border-border">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-heading text-lg font-semibold text-foreground">Letzte Rückmeldungen</h3>
          <Link to="/demo/dashboard/guests" className="text-sm text-primary font-body flex items-center gap-1 hover:underline">
            Alle <ArrowRight size={14} />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recentGuests.map((g, i) => (
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
                g.status === "Zugesagt" ? "bg-green-100 text-green-700" :
                g.status === "Abgesagt" ? "bg-rose-light text-accent" :
                "bg-gold-light text-champagne-foreground"
              }`}>
                {g.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks */}
      <div className="bg-card rounded-xl border border-border">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-heading text-lg font-semibold text-foreground">Aufgaben</h3>
          <Link to="/demo/dashboard/tasks" className="text-sm text-primary font-body flex items-center gap-1 hover:underline">
            Alle <ArrowRight size={14} />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {upcomingTasks.map((t, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3">
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                t.done ? "bg-primary border-primary" : "border-border"
              }`}>
                {t.done && <CheckCircle size={12} className="text-primary-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-body ${t.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {t.task}
                </p>
              </div>
              <span className={`text-xs font-body ${t.done ? "text-muted-foreground" : "text-primary"}`}>
                {t.due}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Meal overview & Budget quick stats */}
    <div className="grid lg:grid-cols-3 gap-6">
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
            { label: "Dekoration", amount: "€1.950" },
            { label: "Musik & DJ", amount: "€2.000" },
          ].map((b, i) => (
            <div key={i} className="flex justify-between text-sm font-body">
              <span className="text-foreground">{b.label}</span>
              <span className="text-muted-foreground">{b.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Hotel Stats */}
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-base font-semibold text-foreground">Hotel-Buchungen</h3>
        <Hotel size={18} className="text-primary" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { hotel: "Schlosshotel Elmau", booked: 18, total: 25 },
          { hotel: "Gasthof Alpenblick", booked: 12, total: 15 },
          { hotel: "Hotel Bergzeit", booked: 6, total: 10 },
        ].map((h, i) => (
          <div key={i} className="bg-secondary/50 rounded-lg p-4">
            <p className="text-sm font-body font-medium text-foreground">{h.hotel}</p>
            <p className="text-xs text-muted-foreground font-body mt-1">{h.booked} von {h.total} Zimmern gebucht</p>
            <div className="h-2 bg-secondary rounded-full overflow-hidden mt-2">
              <div className="h-full rounded-full bg-primary" style={{ width: `${(h.booked / h.total) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default DashboardOverview;
