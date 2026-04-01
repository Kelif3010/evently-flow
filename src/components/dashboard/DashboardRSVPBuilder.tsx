import { useState } from "react";
import { Settings, GripVertical, Plus, Trash2, Eye, ArrowLeft, Check, ToggleLeft, ToggleRight, Type, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface RSVPField {
  id: string;
  label: string;
  type: "toggle" | "text" | "textarea" | "select" | "checkbox" | "number";
  enabled: boolean;
  required: boolean;
  category: string;
  description: string;
  options?: string[];
}

const defaultFields: RSVPField[] = [
  { id: "attendance", label: "Teilnahme (Zu-/Absage)", type: "toggle", enabled: true, required: true, category: "Basis", description: "Grundlegende Zu- oder Absage" },
  { id: "guest_name", label: "Name des Gastes", type: "text", enabled: true, required: true, category: "Basis", description: "Vor- und Nachname" },
  { id: "guest_age", label: "Alter", type: "number", enabled: true, required: false, category: "Basis", description: "Alter des Gastes" },
  { id: "plus_one", label: "Begleitperson", type: "toggle", enabled: true, required: false, category: "Basis", description: "Ob eine Begleitperson mitkommt" },
  { id: "plus_one_name", label: "Name der Begleitperson", type: "text", enabled: true, required: false, category: "Basis", description: "Name des Plus-One" },
  { id: "meal_guest", label: "Essenspräferenz (Gast)", type: "select", enabled: true, required: true, category: "Essen", description: "Menüwahl des Gastes", options: ["Standard", "Vegetarisch", "Vegan", "Fisch"] },
  { id: "meal_plus_one", label: "Essenspräferenz (Begleitperson)", type: "select", enabled: true, required: false, category: "Essen", description: "Menüwahl der Begleitperson", options: ["Standard", "Vegetarisch", "Vegan", "Fisch"] },
  { id: "allergies", label: "Allergien & Unverträglichkeiten", type: "textarea", enabled: true, required: false, category: "Essen", description: "Freitext für Allergien" },
  { id: "travel_method", label: "Anreise", type: "select", enabled: true, required: false, category: "Anreise", description: "Wie reist der Gast an?", options: ["Auto", "Zug", "Flugzeug", "Fahrgemeinschaft", "Sonstiges"] },
  { id: "hotel_needed", label: "Übernachtung benötigt?", type: "toggle", enabled: true, required: false, category: "Anreise", description: "Braucht der Gast ein Hotelzimmer?" },
  { id: "music_wish", label: "Musikwünsche", type: "text", enabled: true, required: false, category: "Spaß & Kreatives", description: "Songs die gespielt werden sollen" },
  { id: "participation", label: "Möchtest du bei der Hochzeit mitwirken?", type: "toggle", enabled: true, required: false, category: "Mitwirkung", description: "Rede, Spiel, Überraschung, etc." },
  { id: "participation_type", label: "Art der Mitwirkung", type: "text", enabled: true, required: false, category: "Mitwirkung", description: "Was ist geplant?" },
  { id: "participation_secret", label: "Soll es eine Überraschung bleiben?", type: "toggle", enabled: true, required: false, category: "Mitwirkung", description: "Geheim halten vor dem Brautpaar?" },
  { id: "participation_duration", label: "Zeitbedarf (Minuten)", type: "number", enabled: true, required: false, category: "Mitwirkung", description: "Wie viel Zeit wird benötigt?" },
  { id: "participation_timing", label: "Gewünschter Zeitpunkt", type: "select", enabled: true, required: false, category: "Mitwirkung", description: "Wann im Tagesablauf?", options: ["Empfang", "Nach der Trauung", "Beim Abendessen", "Abends / Party", "Egal"] },
  { id: "participation_tech", label: "Benötigte Technik", type: "text", enabled: true, required: false, category: "Mitwirkung", description: "Beamer, Mikrofon, Lautsprecher, etc." },
  { id: "honeymoon_tip", label: "Flitterwochen-Tipp", type: "text", enabled: true, required: false, category: "Spaß & Kreatives", description: "Wo sollte das Paar die Flitterwochen verbringen?" },
  { id: "message", label: "Nachricht ans Brautpaar", type: "textarea", enabled: true, required: false, category: "Spaß & Kreatives", description: "Persönliche Worte" },
  { id: "photo_permission", label: "Fotoerlaubnis", type: "toggle", enabled: false, required: false, category: "Sonstiges", description: "Dürfen Fotos vom Gast veröffentlicht werden?" },
  { id: "shuttle_needed", label: "Shuttle-Service benötigt?", type: "toggle", enabled: false, required: false, category: "Anreise", description: "Transport von Bahnhof/Hotel zur Location" },
  { id: "children_count", label: "Anzahl Kinder", type: "number", enabled: false, required: false, category: "Basis", description: "Wie viele Kinder kommen mit?" },
  { id: "special_song", label: "Song für den Eröffnungstanz-Vorschlag", type: "text", enabled: false, required: false, category: "Spaß & Kreatives", description: "Vorschlag für einen besonderen Song" },
  { id: "dress_code_confirm", label: "Dresscode bestätigt?", type: "toggle", enabled: false, required: false, category: "Sonstiges", description: "Dresscode gelesen und verstanden?" },
];

const DashboardRSVPBuilder = () => {
  const [fields, setFields] = useState<RSVPField[]>(defaultFields);
  const [saved, setSaved] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [newField, setNewField] = useState({ label: "", type: "text" as RSVPField["type"], category: "Sonstiges", description: "" });

  const categories = Array.from(new Set(fields.map(f => f.category)));

  const toggleField = (id: string) => {
    setFields(fields.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };

  const toggleRequired = (id: string) => {
    setFields(fields.map(f => f.id === id ? { ...f, required: !f.required } : f));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const addCustomField = () => {
    if (!newField.label) return;
    const field: RSVPField = {
      id: `custom_${Date.now()}`,
      ...newField,
      enabled: true,
      required: false,
    };
    setFields([...fields, field]);
    setNewField({ label: "", type: "text", category: "Sonstiges", description: "" });
    setShowCustom(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const enabledCount = fields.filter(f => f.enabled).length;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link to="/demo/dashboard/rsvp" className="text-sm text-muted-foreground font-body hover:text-foreground flex items-center gap-1 mb-2">
            <ArrowLeft size={14} /> Zurück zu RSVP
          </Link>
          <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <Settings size={24} className="text-primary" /> RSVP-Formular konfigurieren
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">
            Bestimmt selbst, welche Felder eure Gäste im RSVP-Formular sehen · {enabledCount} Felder aktiv
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/demo/rsvp">
            <Button variant="outline" size="sm" className="font-body"><Eye size={14} className="mr-1.5" /> Vorschau</Button>
          </Link>
          <Button size="sm" className="font-body" onClick={() => setShowCustom(!showCustom)}>
            <Plus size={14} className="mr-1.5" /> Eigenes Feld
          </Button>
          <Button className="font-body" onClick={handleSave}>
            {saved ? <><Check size={14} className="mr-1.5" /> Gespeichert</> : "Speichern"}
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="bg-champagne/50 rounded-xl border border-border p-4 flex items-start gap-3">
        <span className="text-lg">💡</span>
        <div>
          <p className="text-sm font-body font-medium text-foreground">So funktioniert der RSVP-Builder</p>
          <p className="text-xs text-muted-foreground font-body mt-1">
            Aktiviert oder deaktiviert Felder, die eure Gäste im RSVP-Formular ausfüllen sollen. Markiert wichtige Felder als Pflicht. Ihr könnt auch eigene Fragen hinzufügen.
          </p>
        </div>
      </div>

      {/* Custom Field Form */}
      {showCustom && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h3 className="font-heading text-lg font-semibold text-foreground">Eigenes Feld hinzufügen</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <input value={newField.label} onChange={e => setNewField({...newField, label: e.target.value})} placeholder="Feldname (z.B. Schuhgröße)" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <select value={newField.type} onChange={e => setNewField({...newField, type: e.target.value as RSVPField["type"]})} className="px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option value="text">Textfeld</option>
              <option value="textarea">Textbereich</option>
              <option value="toggle">Ja/Nein</option>
              <option value="number">Zahl</option>
              <option value="select">Auswahl</option>
              <option value="checkbox">Checkbox</option>
            </select>
            <select value={newField.category} onChange={e => setNewField({...newField, category: e.target.value})} className="px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30">
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <input value={newField.description} onChange={e => setNewField({...newField, description: e.target.value})} placeholder="Kurzbeschreibung" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="font-body" onClick={addCustomField}>Hinzufügen</Button>
            <Button variant="outline" size="sm" className="font-body" onClick={() => setShowCustom(false)}>Abbrechen</Button>
          </div>
        </div>
      )}

      {/* Field Categories */}
      {categories.map(category => {
        const catFields = fields.filter(f => f.category === category);
        return (
          <div key={category} className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-4 bg-secondary/30 border-b border-border">
              <h3 className="font-heading text-base font-semibold text-foreground">{category}</h3>
              <p className="text-xs text-muted-foreground font-body">{catFields.filter(f => f.enabled).length} von {catFields.length} aktiv</p>
            </div>
            <div className="divide-y divide-border">
              {catFields.map(field => (
                <div key={field.id} className={`flex items-center gap-4 px-5 py-4 transition-colors ${field.enabled ? "" : "opacity-50"}`}>
                  <GripVertical size={14} className="text-muted-foreground cursor-grab flex-shrink-0" />
                  
                  {/* Toggle */}
                  <button
                    onClick={() => toggleField(field.id)}
                    className={`w-11 h-6 rounded-full transition-colors flex-shrink-0 ${field.enabled ? "bg-primary" : "bg-border"}`}
                  >
                    <div className={`w-4.5 h-4.5 w-[18px] h-[18px] rounded-full bg-primary-foreground transition-transform mx-0.5 ${field.enabled ? "translate-x-[22px]" : "translate-x-0"}`} />
                  </button>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-body font-medium text-foreground">{field.label}</p>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-secondary text-muted-foreground font-body">
                        {field.type === "text" ? "Text" : field.type === "textarea" ? "Textbereich" : field.type === "toggle" ? "Ja/Nein" : field.type === "number" ? "Zahl" : field.type === "select" ? "Auswahl" : "Checkbox"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-body">{field.description}</p>
                  </div>

                  {/* Required toggle */}
                  {field.enabled && (
                    <button
                      onClick={() => toggleRequired(field.id)}
                      className={`text-xs font-body px-2.5 py-1 rounded-full border transition-colors ${
                        field.required ? "bg-primary/10 border-primary text-primary" : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {field.required ? "Pflicht" : "Optional"}
                    </button>
                  )}

                  {/* Delete custom fields */}
                  {field.id.startsWith("custom_") && (
                    <button onClick={() => removeField(field.id)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-destructive">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardRSVPBuilder;
