import { useState } from "react";
import { PieChart, Plus, Edit2, Trash2, Check, X, TrendingUp, TrendingDown, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BudgetItem {
  id: number;
  category: string;
  planned: number;
  actual: number;
  paid: boolean;
  vendor: string;
  notes: string;
}

const initialItems: BudgetItem[] = [
  { id: 1, category: "Location", planned: 6000, actual: 5500, paid: true, vendor: "Schloss Elmau", notes: "Inkl. Bestuhlung & Deko-Grundpaket" },
  { id: 2, category: "Catering", planned: 7000, actual: 6200, paid: false, vendor: "Gourmet Events GmbH", notes: "87 Personen, 3-Gänge + Mitternachtssnack" },
  { id: 3, category: "Fotograf", planned: 3000, actual: 2800, paid: true, vendor: "Studio Lichtblick", notes: "8h + Fotobox + Online-Galerie" },
  { id: 4, category: "Dekoration", planned: 2500, actual: 1950, paid: false, vendor: "Blütenwerk Floristik", notes: "Tischdeko, Brautstrauß, Kirchenschmuck" },
  { id: 5, category: "Musik & DJ", planned: 2000, actual: 2000, paid: true, vendor: "DJ Marco", notes: "20:00–01:00, eigene Anlage" },
  { id: 6, category: "Brautkleid & Anzug", planned: 3000, actual: 2700, paid: true, vendor: "Brautmoden Eleganz", notes: "Kleid, Schleier, Anzug, Accessoires" },
  { id: 7, category: "Einladungen & Papeterie", planned: 500, actual: 380, paid: true, vendor: "Letterpress Studio", notes: "Save-the-Date, Einladungen, Menükarten" },
  { id: 8, category: "Eheringe", planned: 1500, actual: 1400, paid: true, vendor: "Juwelier Goldschmied", notes: "Platin, graviert" },
  { id: 9, category: "Hochzeitstorte", planned: 800, actual: 750, paid: false, vendor: "Konditorei Süß", notes: "3-stöckig, Naked Cake" },
  { id: 10, category: "Transport", planned: 400, actual: 350, paid: false, vendor: "Oldtimer-Verleih", notes: "Brautauto + Shuttlebus" },
  { id: 11, category: "Sonstiges", planned: 1300, actual: 420, paid: false, vendor: "Diverse", notes: "Gastgeschenke, Trinkgelder, Notfallbudget" },
];

const DashboardBudget = () => {
  const [items, setItems] = useState<BudgetItem[]>(initialItems);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<BudgetItem>>({});
  const [newItem, setNewItem] = useState({ category: "", planned: 0, actual: 0, vendor: "", notes: "" });

  const totalPlanned = items.reduce((s, i) => s + i.planned, 0);
  const totalActual = items.reduce((s, i) => s + i.actual, 0);
  const totalPaid = items.filter(i => i.paid).reduce((s, i) => s + i.actual, 0);
  const remaining = totalPlanned - totalActual;
  const pctUsed = Math.round((totalActual / totalPlanned) * 100);

  const addItem = () => {
    if (!newItem.category) return;
    setItems([...items, { id: Date.now(), ...newItem, paid: false }]);
    setNewItem({ category: "", planned: 0, actual: 0, vendor: "", notes: "" });
    setShowAdd(false);
  };

  const togglePaid = (id: number) => setItems(items.map(i => i.id === id ? { ...i, paid: !i.paid } : i));
  const removeItem = (id: number) => setItems(items.filter(i => i.id !== id));

  const fmt = (n: number) => `€${n.toLocaleString("de-DE")}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <PieChart size={24} className="text-primary" /> Budget
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">Gesamtbudget und Ausgaben im Überblick</p>
        </div>
        <Button size="sm" className="font-body" onClick={() => setShowAdd(!showAdd)}>
          <Plus size={14} className="mr-1.5" /> Position hinzufügen
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <p className="text-sm text-muted-foreground font-body">Geplant</p>
          <p className="text-2xl font-heading font-bold text-foreground mt-1">{fmt(totalPlanned)}</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <p className="text-sm text-muted-foreground font-body">Ausgegeben</p>
          <p className="text-2xl font-heading font-bold text-foreground mt-1">{fmt(totalActual)}</p>
          <p className="text-xs text-muted-foreground font-body mt-1">{pctUsed}% des Budgets</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <p className="text-sm text-muted-foreground font-body">Bezahlt</p>
          <p className="text-2xl font-heading font-bold text-primary mt-1">{fmt(totalPaid)}</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <p className="text-sm text-muted-foreground font-body">Verbleibend</p>
          <p className={`text-2xl font-heading font-bold mt-1 ${remaining >= 0 ? "text-primary" : "text-destructive"}`}>
            {remaining >= 0 ? fmt(remaining) : `-${fmt(Math.abs(remaining))}`}
          </p>
          <div className="flex items-center gap-1 mt-1">
            {remaining >= 0 ? <TrendingDown size={12} className="text-primary" /> : <TrendingUp size={12} className="text-destructive" />}
            <span className="text-xs text-muted-foreground font-body">{remaining >= 0 ? "Unter Budget" : "Über Budget"}</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex justify-between text-sm font-body mb-2">
          <span className="text-foreground font-medium">Budget-Fortschritt</span>
          <span className="text-muted-foreground">{fmt(totalActual)} / {fmt(totalPlanned)}</span>
        </div>
        <div className="h-4 bg-secondary rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-500 ${pctUsed > 100 ? "bg-destructive" : pctUsed > 85 ? "bg-gold" : "bg-primary"}`} style={{ width: `${Math.min(pctUsed, 100)}%` }} />
        </div>
      </div>

      {/* Add Form */}
      {showAdd && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h3 className="font-heading text-lg font-semibold text-foreground">Neue Position</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <input value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} placeholder="Kategorie" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input type="number" value={newItem.planned || ""} onChange={e => setNewItem({...newItem, planned: Number(e.target.value)})} placeholder="Geplant (€)" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input type="number" value={newItem.actual || ""} onChange={e => setNewItem({...newItem, actual: Number(e.target.value)})} placeholder="Tatsächlich (€)" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input value={newItem.vendor} onChange={e => setNewItem({...newItem, vendor: e.target.value})} placeholder="Dienstleister" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="font-body" onClick={addItem}>Hinzufügen</Button>
            <Button variant="outline" size="sm" className="font-body" onClick={() => setShowAdd(false)}>Abbrechen</Button>
          </div>
        </div>
      )}

      {/* Budget Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider">Kategorie</th>
                <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Dienstleister</th>
                <th className="text-right p-4 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider">Geplant</th>
                <th className="text-right p-4 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider">Tatsächlich</th>
                <th className="text-center p-4 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider">Bezahlt</th>
                <th className="text-right p-4 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider">Aktion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map(item => {
                const diff = item.planned - item.actual;
                return (
                  <tr key={item.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="p-4">
                      <p className="text-sm font-body font-medium text-foreground">{item.category}</p>
                      <p className="text-xs text-muted-foreground font-body">{item.notes}</p>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-sm font-body text-muted-foreground">{item.vendor}</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-sm font-body text-foreground">{fmt(item.planned)}</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-sm font-body text-foreground">{fmt(item.actual)}</span>
                      {diff !== 0 && (
                        <span className={`block text-xs font-body ${diff > 0 ? "text-primary" : "text-destructive"}`}>
                          {diff > 0 ? `−${fmt(diff)}` : `+${fmt(Math.abs(diff))}`}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => togglePaid(item.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mx-auto transition-colors ${item.paid ? "bg-primary border-primary" : "border-border hover:border-primary/50"}`}>
                        {item.paid && <Check size={12} className="text-primary-foreground" />}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => removeItem(item.id)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-destructive">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-border bg-secondary/30">
                <td className="p-4 font-body font-semibold text-foreground" colSpan={2}>Gesamt</td>
                <td className="p-4 text-right font-body font-semibold text-foreground">{fmt(totalPlanned)}</td>
                <td className="p-4 text-right font-body font-semibold text-foreground">{fmt(totalActual)}</td>
                <td className="p-4 text-center">
                  <span className="text-xs font-body text-muted-foreground">{items.filter(i => i.paid).length}/{items.length}</span>
                </td>
                <td className="p-4" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardBudget;
