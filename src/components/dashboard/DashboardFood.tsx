import { useState } from "react";
import { Utensils, AlertTriangle, Plus, Edit2, Trash2, Check, X, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MenuItem {
  id: number;
  course: string;
  name: string;
  description: string;
  dietary: string[];
}

const initialMenu: MenuItem[] = [
  { id: 1, course: "Vorspeise", name: "Burrata mit Tomaten", description: "Frische Burrata auf Heirloom-Tomaten mit Basilikum-Pesto", dietary: ["Vegetarisch"] },
  { id: 2, course: "Vorspeise", name: "Rote-Bete-Carpaccio", description: "Marinierte Rote Bete mit Ziegenkäse und Walnüssen", dietary: ["Vegetarisch", "Glutenfrei"] },
  { id: 3, course: "Hauptgang", name: "Rinderfilet", description: "Rosa gebratenes Filet mit Trüffel-Jus, Kartoffelgratin und Saisongemüse", dietary: ["Standard"] },
  { id: 4, course: "Hauptgang", name: "Wildlachs", description: "Gebratener Lachs auf Fenchel-Risotto mit Zitrus-Beurre-blanc", dietary: ["Fisch", "Glutenfrei"] },
  { id: 5, course: "Hauptgang", name: "Pilz-Wellington", description: "Kräuterseitling im Blätterteig mit Trüffel-Sauce", dietary: ["Vegetarisch", "Vegan Option"] },
  { id: 6, course: "Dessert", name: "Crème Brûlée", description: "Klassische Vanille-Crème-Brûlée mit frischen Beeren", dietary: ["Vegetarisch", "Glutenfrei"] },
  { id: 7, course: "Dessert", name: "Schokoladen-Fondant", description: "Warmer Schokoladenkuchen mit Vanilleeis", dietary: ["Vegetarisch"] },
];

const mealStats = [
  { label: "Standard", count: 42, pct: 48, color: "bg-primary" },
  { label: "Vegetarisch", count: 23, pct: 26, color: "bg-gold" },
  { label: "Vegan", count: 14, pct: 16, color: "bg-accent" },
  { label: "Fisch", count: 8, pct: 10, color: "bg-taupe" },
];

const allergyData = [
  { allergy: "Laktoseintoleranz", guests: ["Sophie Weber", "Lisa Hartmann", "Tim Vogel", "Petra Klein", "Jan Beck"], count: 5 },
  { allergy: "Nussallergie", guests: ["Anna Hoffmann", "Moritz Lang", "Eva Richter", "Tom Stein"], count: 4 },
  { allergy: "Glutenunverträglichkeit", guests: ["Emma Wagner", "Frank Meier", "Sabine Wolf"], count: 3 },
  { allergy: "Halal", guests: ["Nico Klein", "Sara Klein"], count: 2 },
  { allergy: "Fischallergie", guests: ["Felix Braun"], count: 1 },
];

const DashboardFood = () => {
  const [menu, setMenu] = useState<MenuItem[]>(initialMenu);
  const [expandedAllergy, setExpandedAllergy] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "menu" | "allergies">("overview");
  const [showAddDish, setShowAddDish] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<MenuItem>>({});
  const [newDish, setNewDish] = useState({ name: "", description: "", course: "Vorspeise", dietary: "" });

  const courses = ["Vorspeise", "Hauptgang", "Dessert"];

  const addDish = () => {
    if (!newDish.name) return;
    setMenu([...menu, {
      id: Date.now(),
      course: newDish.course,
      name: newDish.name,
      description: newDish.description,
      dietary: newDish.dietary.split(",").map(d => d.trim()).filter(Boolean),
    }]);
    setNewDish({ name: "", description: "", course: "Vorspeise", dietary: "" });
    setShowAddDish(false);
  };

  const removeDish = (id: number) => setMenu(menu.filter(m => m.id !== id));

  const startEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setEditData({ ...item, dietary: item.dietary });
  };

  const saveEdit = () => {
    setMenu(menu.map(m => m.id === editingId ? { ...m, ...editData } as MenuItem : m));
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <Utensils size={24} className="text-primary" /> Essen & Allergien
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">Menüplanung und Diätanforderungen eurer Gäste</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-0">
        {[
          { id: "overview" as const, label: "Übersicht" },
          { id: "menu" as const, label: "Menükarte" },
          { id: "allergies" as const, label: "Allergien & Diäten" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-body font-medium border-b-2 -mb-px transition-colors ${
              activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <PieChart size={18} className="text-primary" /> Essenswahl-Verteilung
            </h3>
            <div className="space-y-4">
              {mealStats.map((m, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-body mb-1.5">
                    <span className="text-foreground font-medium">{m.label}</span>
                    <span className="text-muted-foreground">{m.count} Gäste ({m.pct}%)</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${m.color} transition-all duration-1000`} style={{ width: `${m.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-accent" /> Allergie-Zusammenfassung
            </h3>
            <div className="space-y-2">
              {allergyData.map((a, i) => (
                <div key={i} className="bg-secondary/30 rounded-lg p-3 flex items-center justify-between hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-rose-light flex items-center justify-center text-xs font-bold text-accent">{a.count}</span>
                    <span className="text-sm font-body font-medium text-foreground">{a.allergy}</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-body">{a.count} Gäste</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "menu" && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button size="sm" className="font-body" onClick={() => setShowAddDish(true)}>
              <Plus size={14} className="mr-1.5" /> Gericht hinzufügen
            </Button>
          </div>
          {courses.map(course => (
            <div key={course}>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3">{course}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {menu.filter(m => m.course === course).map(item => (
                  <div key={item.id} className="bg-card rounded-xl border border-border p-5 hover:border-primary/30 hover:shadow-md transition-all group">
                    {editingId === item.id ? (
                      <div className="space-y-3">
                        <input value={editData.name || ""} onChange={e => setEditData({...editData, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-body" />
                        <input value={editData.description || ""} onChange={e => setEditData({...editData, description: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-body" />
                        <div className="flex gap-2">
                          <Button size="sm" className="font-body" onClick={saveEdit}><Check size={14} className="mr-1" /> Speichern</Button>
                          <Button variant="outline" size="sm" className="font-body" onClick={() => setEditingId(null)}>Abbrechen</Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-heading font-semibold text-foreground">{item.name}</h4>
                            <p className="text-sm text-muted-foreground font-body mt-1">{item.description}</p>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => startEdit(item)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground"><Edit2 size={14} /></button>
                            <button onClick={() => removeDish(item.id)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
                          </div>
                        </div>
                        <div className="flex gap-1.5 mt-3">
                          {item.dietary.map((d, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-champagne text-primary font-body">{d}</span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Add Dish Dialog */}
          <Dialog open={showAddDish} onOpenChange={setShowAddDish}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-heading">Gericht hinzufügen</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-1.5">Gang</label>
                  <select value={newDish.course} onChange={e => setNewDish({...newDish, course: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-body">
                    {courses.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-1.5">Name *</label>
                  <input value={newDish.name} onChange={e => setNewDish({...newDish, name: e.target.value})} placeholder="z.B. Caesar Salad" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-1.5">Beschreibung</label>
                  <input value={newDish.description} onChange={e => setNewDish({...newDish, description: e.target.value})} placeholder="Kurze Beschreibung" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-1.5">Diät-Tags (kommagetrennt)</label>
                  <input value={newDish.dietary} onChange={e => setNewDish({...newDish, dietary: e.target.value})} placeholder="Vegetarisch, Glutenfrei" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button className="font-body flex-1" onClick={addDish}>Hinzufügen</Button>
                  <Button variant="outline" className="font-body" onClick={() => setShowAddDish(false)}>Abbrechen</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {activeTab === "allergies" && (
        <div className="space-y-4">
          {allergyData.map((a, i) => (
            <div key={i} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-all">
              <button
                onClick={() => setExpandedAllergy(expandedAllergy === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle size={16} className="text-accent" />
                  <span className="text-sm font-body font-medium text-foreground">{a.allergy}</span>
                </div>
                <span className="text-sm font-body text-muted-foreground">{a.count} Gäste</span>
              </button>
              {expandedAllergy === i && (
                <div className="px-5 pb-4 animate-fade-in">
                  <div className="flex flex-wrap gap-2">
                    {a.guests.map((g, j) => (
                      <span key={j} className="text-sm px-3 py-1.5 bg-secondary rounded-lg font-body text-foreground">{g}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardFood;
