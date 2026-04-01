import { useState } from "react";
import { CheckCircle, XCircle, Clock, Copy, ExternalLink, Send, Eye, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface RSVPResponse {
  id: number;
  name: string;
  status: "Zugesagt" | "Abgesagt" | "Ausstehend";
  respondedAt: string;
  plusOne: string;
  meal: string;
  musicWish: string;
  travelMethod: string;
  participation: string;
}

const responses: RSVPResponse[] = [
  { id: 1, name: "Sophie Weber", status: "Zugesagt", respondedAt: "12.03.2026", plusOne: "Max Weber", meal: "Vegetarisch", musicWish: "ABBA – Dancing Queen", travelMethod: "Auto", participation: "Rede halten" },
  { id: 2, name: "Thomas Müller", status: "Zugesagt", respondedAt: "14.03.2026", plusOne: "–", meal: "Standard", musicWish: "Ed Sheeran – Perfect", travelMethod: "Zug", participation: "–" },
  { id: 3, name: "Anna Hoffmann", status: "Zugesagt", respondedAt: "15.03.2026", plusOne: "Paul Hoffmann", meal: "Vegan", musicWish: "–", travelMethod: "Auto", participation: "Spiel organisieren" },
  { id: 4, name: "Felix Braun", status: "Abgesagt", respondedAt: "16.03.2026", plusOne: "–", meal: "–", musicWish: "–", travelMethod: "–", participation: "–" },
  { id: 5, name: "Maria Schmidt", status: "Ausstehend", respondedAt: "–", plusOne: "–", meal: "–", musicWish: "–", travelMethod: "–", participation: "–" },
  { id: 6, name: "Moritz Becker", status: "Ausstehend", respondedAt: "–", plusOne: "–", meal: "–", musicWish: "–", travelMethod: "–", participation: "–" },
  { id: 7, name: "Emma Wagner", status: "Zugesagt", respondedAt: "18.03.2026", plusOne: "Jan Wagner", meal: "Fisch", musicWish: "Coldplay – Yellow", travelMethod: "Auto", participation: "–" },
  { id: 8, name: "Lena Schulz", status: "Zugesagt", respondedAt: "19.03.2026", plusOne: "–", meal: "Vegetarisch", musicWish: "Fleetwood Mac – Dreams", travelMethod: "Zug", participation: "Foto-Slideshow" },
];

const DashboardRSVP = () => {
  const [filter, setFilter] = useState<string>("Alle");
  const [copied, setCopied] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const rsvpLink = "https://evoria.app/event/laura-markus/rsvp";

  const accepted = responses.filter(r => r.status === "Zugesagt").length;
  const declined = responses.filter(r => r.status === "Abgesagt").length;
  const pending = responses.filter(r => r.status === "Ausstehend").length;

  const filtered = filter === "Alle" ? responses : responses.filter(r => r.status === filter);

  const copyLink = () => {
    navigator.clipboard?.writeText(rsvpLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <CheckCircle size={24} className="text-primary" /> RSVP-Verwaltung
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">Rückmeldungen eurer Gäste verwalten</p>
        </div>
        <div className="flex gap-2">
          <Link to="/demo/dashboard/rsvp-builder">
            <Button variant="outline" size="sm" className="font-body"><Settings size={14} className="mr-1.5" /> Formular bearbeiten</Button>
          </Link>
          <Link to="/demo/rsvp">
            <Button variant="outline" size="sm" className="font-body"><Eye size={14} className="mr-1.5" /> Vorschau</Button>
          </Link>
        </div>
      </div>

      {/* RSVP Link Share */}
      <div className="bg-champagne/50 rounded-xl border border-border p-5">
        <p className="text-sm font-body font-medium text-foreground mb-3">📎 RSVP-Link für eure Gäste</p>
        <div className="flex gap-2">
          <input value={rsvpLink} readOnly className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body text-muted-foreground" />
          <Button size="sm" variant="outline" className="font-body" onClick={copyLink}>
            <Copy size={14} className="mr-1.5" /> {copied ? "Kopiert!" : "Kopieren"}
          </Button>
          <Button size="sm" className="font-body"><Send size={14} className="mr-1.5" /> Versenden</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-5 text-center">
          <div className="w-10 h-10 rounded-full bg-champagne flex items-center justify-center mx-auto mb-2">
            <CheckCircle size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-heading font-bold text-foreground">{accepted}</p>
          <p className="text-xs text-muted-foreground font-body">Zusagen</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 text-center">
          <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center mx-auto mb-2">
            <XCircle size={20} className="text-accent" />
          </div>
          <p className="text-2xl font-heading font-bold text-foreground">{declined}</p>
          <p className="text-xs text-muted-foreground font-body">Absagen</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 text-center">
          <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center mx-auto mb-2">
            <Clock size={20} className="text-gold" />
          </div>
          <p className="text-2xl font-heading font-bold text-foreground">{pending}</p>
          <p className="text-xs text-muted-foreground font-body">Ausstehend</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["Alle", "Zugesagt", "Abgesagt", "Ausstehend"].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-body transition-colors ${
              filter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Responses list */}
      <div className="bg-card rounded-xl border border-border divide-y divide-border">
        {filtered.map(r => (
          <div key={r.id}>
            <button
              onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-champagne flex items-center justify-center text-xs font-heading font-bold text-primary">
                  {r.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="text-left">
                  <p className="text-sm font-body font-medium text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground font-body">{r.respondedAt !== "–" ? `Antwort am ${r.respondedAt}` : "Noch keine Antwort"}</p>
                </div>
              </div>
              <span className={`text-xs font-body font-medium px-2.5 py-1 rounded-full ${
                r.status === "Zugesagt" ? "bg-champagne text-primary" :
                r.status === "Abgesagt" ? "bg-rose-light text-accent" :
                "bg-gold-light text-champagne-foreground"
              }`}>
                {r.status}
              </span>
            </button>
            {expandedId === r.id && r.status === "Zugesagt" && (
              <div className="px-5 pb-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { label: "Begleitperson", value: r.plusOne },
                  { label: "Essenswahl", value: r.meal },
                  { label: "Anreise", value: r.travelMethod },
                  { label: "Musikwunsch", value: r.musicWish },
                  { label: "Mitwirkung", value: r.participation },
                ].map((d, i) => (
                  <div key={i} className="bg-secondary/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground font-body">{d.label}</p>
                    <p className="text-sm font-body font-medium text-foreground mt-0.5">{d.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Send Reminder */}
      {pending > 0 && (
        <div className="bg-gold-light/50 rounded-xl border border-border p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-body font-medium text-foreground">📩 {pending} Gäste haben noch nicht geantwortet</p>
            <p className="text-xs text-muted-foreground font-body mt-1">Erinnerung per E-Mail an alle ausstehenden Gäste senden</p>
          </div>
          <Button size="sm" className="font-body"><Send size={14} className="mr-1.5" /> Erinnerung senden</Button>
        </div>
      )}
    </div>
  );
};

export default DashboardRSVP;
