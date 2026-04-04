import { useState } from "react";
import {
  Settings, GripVertical, Plus, Trash2, Eye, ArrowLeft, Check, Edit2,
  Link2, ChevronDown, ChevronUp, RotateCcw, FolderPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface RSVPField {
  id: string;
  label: string;
  type: "toggle" | "text" | "textarea" | "select" | "checkbox" | "number";
  enabled: boolean;
  required: boolean;
  category: string;
  description: string;
  options?: string[];
  dependency?: { fieldId: string; value: string; action: "show" | "hide" };
}

const defaultFields: RSVPField[] = [
  { id: "attendance", label: "Teilnahme (Zu-/Absage)", type: "toggle", enabled: true, required: true, category: "Basis", description: "Grundlegende Zu- oder Absage" },
  { id: "guest_name", label: "Name des Gastes", type: "text", enabled: true, required: true, category: "Basis", description: "Vor- und Nachname" },
  { id: "plus_one", label: "Begleitperson", type: "toggle", enabled: true, required: false, category: "Basis", description: "Ob eine Begleitperson mitkommt" },
  { id: "plus_one_name", label: "Name der Begleitperson", type: "text", enabled: true, required: false, category: "Basis", description: "Name des Plus-One", dependency: { fieldId: "plus_one", value: "ja", action: "show" } },
  { id: "meal_guest", label: "Essenspräferenz (Gast)", type: "select", enabled: true, required: true, category: "Essen", description: "Menüwahl des Gastes", options: ["Standard", "Vegetarisch", "Vegan", "Fisch"], dependency: { fieldId: "attendance", value: "ja", action: "show" } },
  { id: "allergies", label: "Allergien & Unverträglichkeiten", type: "textarea", enabled: true, required: false, category: "Essen", description: "Freitext für Allergien" },
  { id: "travel_method", label: "Anreise", type: "select", enabled: true, required: false, category: "Anreise", description: "Wie reist der Gast an?", options: ["Auto", "Zug", "Flugzeug", "Sonstiges"] },
  { id: "hotel_needed", label: "Übernachtung benötigt?", type: "toggle", enabled: true, required: false, category: "Anreise", description: "Braucht der Gast ein Hotelzimmer?" },
  { id: "music_wish", label: "Musikwünsche", type: "text", enabled: true, required: false, category: "Spaß & Kreatives", description: "Songs die gespielt werden sollen" },
  { id: "honeymoon_tip", label: "Flitterwochen-Tipp", type: "text", enabled: true, required: false, category: "Spaß & Kreatives", description: "Wo sollte das Paar die Flitterwochen verbringen?" },
  { id: "message", label: "Nachricht ans Brautpaar", type: "textarea", enabled: true, required: false, category: "Spaß & Kreatives", description: "Persönliche Worte" },
  { id: "participation", label: "Möchtest du bei der Hochzeit mitwirken?", type: "toggle", enabled: true, required: false, category: "Mitwirkung", description: "Rede, Spiel, Überraschung, etc." },
  { id: "participation_type", label: "Art der Mitwirkung", type: "text", enabled: true, required: false, category: "Mitwirkung", description: "Was ist geplant?", dependency: { fieldId: "participation", value: "ja", action: "show" } },
  { id: "photo_permission", label: "Fotoerlaubnis", type: "toggle", enabled: false, required: false, category: "Sonstiges", description: "Dürfen Fotos vom Gast veröffentlicht werden?" },
  { id: "children_count", label: "Anzahl Kinder", type: "number", enabled: false, required: false, category: "Basis", description: "Wie viele Kinder kommen mit?" },
];

const DashboardRSVPBuilder = () => {
  const [fields, setFields] = useState<RSVPField[]>(defaultFields);
  const [saved, setSaved] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editingField, setEditingField] = useState<RSVPField | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newField, setNewField] = useState<Partial<RSVPField>>({ label: "", type: "text", category: "Sonstiges", description: "", options: [] });
  const [expandedDep, setExpandedDep] = useState<string | null>(null);

  const categories = Array.from(new Set(fields.map(f => f.category)));
  const enabledCount = fields.filter(f => f.enabled).length;

  const toggleField = (id: string) => setFields(fields.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  const toggleRequired = (id: string) => setFields(fields.map(f => f.id === id ? { ...f, required: !f.required } : f));
  const removeField = (id: string) => setFields(fields.filter(f => f.id !== id));
  const resetFields = () => setFields(defaultFields);

  const addCustomField = () => {
    if (!newField.label) return;
    setFields([...fields, {
      id: `custom_${Date.now()}`,
      label: newField.label!,
      type: newField.type as RSVPField["type"],
      category: newField.category!,
      description: newField.description || "",
      enabled: true,
      required: false,
      options: newField.options,
    }]);
    setNewField({ label: "", type: "text", category: "Sonstiges", description: "", options: [] });
    setShowAdd(false);
  };

  const saveEdit = () => {
    if (!editingField) return;
    setFields(fields.map(f => f.id === editingField.id ? editingField : f));
    setEditingField(null);
  };

  const setDependency = (fieldId: string, dep: RSVPField["dependency"]) => {
    setFields(fields.map(f => f.id === fieldId ? { ...f, dependency: dep } : f));
  };

  const addCategory = () => {
    if (!newCategoryName) return;
    // Just add a placeholder field to create the category
    setFields([...fields, {
      id: `cat_placeholder_${Date.now()}`,
      label: "Neues Feld",
      type: "text",
      category: newCategoryName,
      description: "Beschreibung hinzufügen",
      enabled: false,
      required: false,
    }]);
    setNewCategoryName("");
    setShowCategoryDialog(false);
  };

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const toggleableFields = fields.filter(f => f.type === "toggle");

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
            {enabledCount} Felder aktiv · Felder bearbeiten, Abhängigkeiten setzen, eigene Kategorien erstellen
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="font-body" onClick={() => setShowPreview(true)}>
            <Eye size={14} className="mr-1.5" /> Vorschau
          </Button>
          <Button variant="outline" size="sm" className="font-body" onClick={() => setShowCategoryDialog(true)}>
            <FolderPlus size={14} className="mr-1.5" /> Kategorie
          </Button>
          <Button variant="outline" size="sm" className="font-body" onClick={() => setShowAdd(true)}>
            <Plus size={14} className="mr-1.5" /> Feld hinzufügen
          </Button>
          <Button variant="outline" size="sm" className="font-body" onClick={resetFields}>
            <RotateCcw size={14} className="mr-1.5" /> Zurücksetzen
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
          <p className="text-sm font-body font-medium text-foreground">RSVP-Builder</p>
          <p className="text-xs text-muted-foreground font-body mt-1">
            Felder aktivieren/deaktivieren, als Pflicht markieren, bearbeiten oder löschen. Erstellt Abhängigkeiten (z.B. „Zeige Feld X nur wenn Y = Ja") und eigene Kategorien.
          </p>
        </div>
      </div>

      {/* Field Categories */}
      {categories.map(category => {
        const catFields = fields.filter(f => f.category === category);
        return (
          <div key={category} className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-4 bg-secondary/30 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-heading text-base font-semibold text-foreground">{category}</h3>
                <p className="text-xs text-muted-foreground font-body">{catFields.filter(f => f.enabled).length} von {catFields.length} aktiv</p>
              </div>
            </div>
            <div className="divide-y divide-border">
              {catFields.map(field => (
                <div key={field.id}>
                  <div className={`flex items-center gap-3 px-5 py-4 transition-colors ${field.enabled ? "" : "opacity-50"}`}>
                    <GripVertical size={14} className="text-muted-foreground cursor-grab flex-shrink-0" />

                    <button
                      onClick={() => toggleField(field.id)}
                      className={`w-11 h-6 rounded-full transition-colors flex-shrink-0 ${field.enabled ? "bg-primary" : "bg-border"}`}
                    >
                      <div className={`w-[18px] h-[18px] rounded-full bg-primary-foreground transition-transform mx-0.5 ${field.enabled ? "translate-x-[22px]" : "translate-x-0"}`} />
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-body font-medium text-foreground">{field.label}</p>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground font-body">
                          {field.type === "text" ? "Text" : field.type === "textarea" ? "Textbereich" : field.type === "toggle" ? "Ja/Nein" : field.type === "number" ? "Zahl" : field.type === "select" ? "Auswahl" : "Checkbox"}
                        </span>
                        {field.dependency && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-body flex items-center gap-1">
                            <Link2 size={10} /> Abhängig
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground font-body">{field.description}</p>
                    </div>

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

                    <button onClick={() => setExpandedDep(expandedDep === field.id ? null : field.id)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground" title="Abhängigkeit">
                      <Link2 size={14} />
                    </button>
                    <button onClick={() => setEditingField({...field})} className="p-1.5 rounded hover:bg-secondary text-muted-foreground" title="Bearbeiten">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => removeField(field.id)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-destructive" title="Löschen">
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Dependency editor */}
                  {expandedDep === field.id && (
                    <div className="px-5 pb-4 bg-secondary/10 border-t border-border">
                      <div className="pt-3 space-y-2">
                        <p className="text-xs font-body font-medium text-foreground">Abhängigkeit: Zeige dieses Feld nur wenn...</p>
                        <div className="flex gap-2 flex-wrap items-center">
                          <select
                            value={field.dependency?.fieldId || ""}
                            onChange={e => setDependency(field.id, { fieldId: e.target.value, value: field.dependency?.value || "ja", action: "show" })}
                            className="px-3 py-2 rounded-lg border border-border bg-background text-xs font-body"
                          >
                            <option value="">Kein Feld</option>
                            {toggleableFields.filter(f => f.id !== field.id).map(f => (
                              <option key={f.id} value={f.id}>{f.label}</option>
                            ))}
                          </select>
                          <span className="text-xs text-muted-foreground font-body">=</span>
                          <select
                            value={field.dependency?.value || "ja"}
                            onChange={e => setDependency(field.id, { ...field.dependency!, value: e.target.value })}
                            className="px-3 py-2 rounded-lg border border-border bg-background text-xs font-body"
                          >
                            <option value="ja">Ja</option>
                            <option value="nein">Nein</option>
                          </select>
                          {field.dependency?.fieldId && (
                            <button onClick={() => setDependency(field.id, undefined)} className="text-xs text-destructive font-body hover:underline">Entfernen</button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Add Field Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Feld hinzufügen</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <input value={newField.label} onChange={e => setNewField({...newField, label: e.target.value})} placeholder="Feldname" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <select value={newField.type} onChange={e => setNewField({...newField, type: e.target.value as RSVPField["type"]})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-body">
              <option value="text">Textfeld</option>
              <option value="textarea">Textbereich</option>
              <option value="toggle">Ja/Nein</option>
              <option value="number">Zahl</option>
              <option value="select">Auswahl</option>
              <option value="checkbox">Checkbox</option>
            </select>
            <select value={newField.category} onChange={e => setNewField({...newField, category: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-body">
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <input value={newField.description} onChange={e => setNewField({...newField, description: e.target.value})} placeholder="Kurzbeschreibung" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            {newField.type === "select" && (
              <input value={newField.options?.join(", ")} onChange={e => setNewField({...newField, options: e.target.value.split(",").map(s => s.trim())})} placeholder="Optionen (kommagetrennt)" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            )}
            <div className="flex gap-2 pt-2">
              <Button className="font-body flex-1" onClick={addCustomField}>Hinzufügen</Button>
              <Button variant="outline" className="font-body" onClick={() => setShowAdd(false)}>Abbrechen</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Field Dialog */}
      <Dialog open={!!editingField} onOpenChange={() => setEditingField(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Feld bearbeiten</DialogTitle>
          </DialogHeader>
          {editingField && (
            <div className="space-y-3">
              <input value={editingField.label} onChange={e => setEditingField({...editingField, label: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <select value={editingField.type} onChange={e => setEditingField({...editingField, type: e.target.value as RSVPField["type"]})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-body">
                <option value="text">Textfeld</option>
                <option value="textarea">Textbereich</option>
                <option value="toggle">Ja/Nein</option>
                <option value="number">Zahl</option>
                <option value="select">Auswahl</option>
              </select>
              <input value={editingField.description} onChange={e => setEditingField({...editingField, description: e.target.value})} placeholder="Beschreibung" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <select value={editingField.category} onChange={e => setEditingField({...editingField, category: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-body">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
              {editingField.type === "select" && (
                <input value={editingField.options?.join(", ")} onChange={e => setEditingField({...editingField, options: e.target.value.split(",").map(s => s.trim())})} placeholder="Optionen (kommagetrennt)" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
              )}
              <div className="flex gap-2 pt-2">
                <Button className="font-body flex-1" onClick={saveEdit}>Speichern</Button>
                <Button variant="outline" className="font-body" onClick={() => setEditingField(null)}>Abbrechen</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-heading">Neue Kategorie erstellen</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <input value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} placeholder="Kategorie-Name" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <div className="flex gap-2">
              <Button className="font-body flex-1" onClick={addCategory}>Erstellen</Button>
              <Button variant="outline" className="font-body" onClick={() => setShowCategoryDialog(false)}>Abbrechen</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">RSVP-Formular Vorschau</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {categories.map(cat => {
              const catFields = fields.filter(f => f.category === cat && f.enabled);
              if (catFields.length === 0) return null;
              return (
                <div key={cat}>
                  <h4 className="text-sm font-heading font-semibold text-foreground mb-3 pb-2 border-b border-border">{cat}</h4>
                  <div className="space-y-3">
                    {catFields.map(field => (
                      <div key={field.id}>
                        <label className="text-sm font-body font-medium text-foreground flex items-center gap-1">
                          {field.label}
                          {field.required && <span className="text-destructive">*</span>}
                        </label>
                        <p className="text-xs text-muted-foreground font-body mb-1.5">{field.description}</p>
                        {field.dependency && (
                          <p className="text-[10px] text-primary font-body mb-1">
                            ↳ Wird nur angezeigt wenn „{fields.find(f => f.id === field.dependency?.fieldId)?.label}" = {field.dependency.value}
                          </p>
                        )}
                        {field.type === "text" && <input disabled placeholder={field.label} className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/30 text-sm font-body" />}
                        {field.type === "textarea" && <textarea disabled placeholder={field.label} className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/30 text-sm font-body h-16" />}
                        {field.type === "number" && <input disabled type="number" placeholder="0" className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/30 text-sm font-body" />}
                        {field.type === "toggle" && (
                          <div className="flex gap-3">
                            <button className="px-4 py-2 rounded-lg border border-primary bg-primary/10 text-sm font-body text-primary">Ja</button>
                            <button className="px-4 py-2 rounded-lg border border-border text-sm font-body text-muted-foreground">Nein</button>
                          </div>
                        )}
                        {field.type === "select" && (
                          <select disabled className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/30 text-sm font-body">
                            <option>Bitte wählen...</option>
                            {field.options?.map(o => <option key={o}>{o}</option>)}
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardRSVPBuilder;
