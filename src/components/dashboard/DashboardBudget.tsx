import { useState } from "react";
import { PieChart as PieChartIcon, Plus, Trash2, Check, TrendingUp, TrendingDown, Euro, BarChart3, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

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

const COLORS = [
  "hsl(33, 55%, 48%)", "hsl(350, 35%, 72%)", "hsl(40, 60%, 50%)",
  "hsl(30, 10%, 55%)", "hsl(200, 50%, 50%)", "hsl(150, 40%, 45%)",
  "hsl(280, 40%, 55%)", "hsl(20, 60%, 55%)", "hsl(170, 40%, 45%)",
  "hsl(60, 50%, 50%)", "hsl(0, 0%, 60%)",
];

const DashboardBudget = () => {
  const [items, setItems] = useState<BudgetItem[]>(initialItems);
  const [showAdd, setShowAdd] = useState(false);
  const [filterMode, setFilterMode] = useState<"alle" | "offen" | "bezahlt">("alle");
  const [activeView, setActiveView] = useState<"overview" | "table">("overview");
  const [newItem, setNewItem] = useState({ category: "", planned: 0, actual: 0, vendor: "", notes: "" });

  const totalPlanned = items.reduce((s, i) => s + i.planned, 0);
  const totalActual = items.reduce((s, i) => s + i.actual, 0);
  const totalPaid = items.filter(i => i.paid).reduce((s, i) => s + i.actual, 0);
  const remaining = totalPlanned - totalActual;
  const pctUsed = Math.round((totalActual / totalPlanned) * 100);

  const animPlanned = useAnimatedNumber(totalPlanned);
  const animActual = useAnimatedNumber(totalActual);
  const animPaid = useAnimatedNumber(totalPaid);
  const animRemaining = useAnimatedNumber(Math.abs(remaining));

  const addItem = () => {
    if (!newItem.category) return;
    setItems([...items, { id: Date.now(), ...newItem, paid: false }]);
    setNewItem({ category: "", planned: 0, actual: 0, vendor: "", notes: "" });
    setShowAdd(false);
  };

  const togglePaid = (id: number) => setItems(items.map(i => i.id === id ? { ...i, paid: !i.paid } : i));
  const removeItem = (id: number) => setItems(items.filter(i => i.id !== id));

  const fmt = (n: number) => `€${n.toLocaleString("de-DE")}`;

  const filteredItems = items.filter(i => {
    if (filterMode === "offen") return !i.paid;
    if (filterMode === "bezahlt") return i.paid;
    return true;
  });

  const pieData = items.map(i => ({ name: i.category, value: i.actual }));
  const barData = items.map(i => ({ name: i.category.length > 8 ? i.category.slice(0, 8) + "…" : i.category, Geplant: i.planned, Ausgegeben: i.actual }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <PieChartIcon size={24} className="text-primary" /> Budget
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">Gesamtbudget und Ausgaben im Überblick</p>
        </div>
        <Button size="sm" className="font-body" onClick={() => setShowAdd(true)}>
          <Plus size={14} className="mr-1.5" /> Position hinzufügen
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Geplant", value: fmt(animPlanned), color: "" },
          { label: "Ausgegeben", value: fmt(animActual), sub: `${pctUsed}% des Budgets`, color: "" },
          { label: "Bezahlt", value: fmt(animPaid), color: "text-primary" },
          { label: "Verbleibend", value: remaining >= 0 ? fmt(animRemaining) : `-${fmt(animRemaining)}`, color: remaining >= 0 ? "text-primary" : "text-destructive" },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all duration-300">
            <p className="text-sm text-muted-foreground font-body">{s.label}</p>
            <p className={`text-2xl font-heading font-bold mt-1 ${s.color || "text-foreground"}`}>{s.value}</p>
            {s.sub && <p className="text-xs text-muted-foreground font-body mt-1">{s.sub}</p>}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex justify-between text-sm font-body mb-2">
          <span className="text-foreground font-medium">Budget-Fortschritt</span>
          <span className="text-muted-foreground">{fmt(totalActual)} / {fmt(totalPlanned)}</span>
        </div>
        <div className="h-4 bg-secondary rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${pctUsed > 100 ? "bg-destructive" : pctUsed > 85 ? "bg-gold" : "bg-primary"}`} style={{ width: `${Math.min(pctUsed, 100)}%` }} />
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <PieChartIcon size={18} className="text-primary" /> Ausgabenverteilung
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ borderRadius: "12px", border: "1px solid hsl(35, 20%, 90%)", fontSize: "13px" }} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-primary" /> Budget vs. Ausgaben
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} barGap={4}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ borderRadius: "12px", border: "1px solid hsl(35, 20%, 90%)", fontSize: "13px" }} />
              <Bar dataKey="Geplant" fill="hsl(35, 20%, 85%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Ausgegeben" fill="hsl(33, 55%, 48%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(["alle", "offen", "bezahlt"] as const).map(m => (
          <button
            key={m}
            onClick={() => setFilterMode(m)}
            className={`px-4 py-2 rounded-full text-sm font-body transition-colors ${
              filterMode === m ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {m === "alle" ? "Alle" : m === "offen" ? "Offen" : "Bezahlt"}
          </button>
        ))}
      </div>

      {/* Add Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Neue Budget-Position</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">Kategorie *</label>
              <input value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} placeholder="z.B. Blumen" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Geplant (€)</label>
                <input type="number" value={newItem.planned || ""} onChange={e => setNewItem({...newItem, planned: Number(e.target.value)})} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Tatsächlich (€)</label>
                <input type="number" value={newItem.actual || ""} onChange={e => setNewItem({...newItem, actual: Number(e.target.value)})} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">Dienstleister</label>
              <input value={newItem.vendor} onChange={e => setNewItem({...newItem, vendor: e.target.value})} placeholder="Name des Anbieters" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">Notizen</label>
              <input value={newItem.notes} onChange={e => setNewItem({...newItem, notes: e.target.value})} placeholder="Optionale Notizen" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="flex gap-2 pt-2">
              <Button className="font-body flex-1" onClick={addItem}>Hinzufügen</Button>
              <Button variant="outline" className="font-body" onClick={() => setShowAdd(false)}>Abbrechen</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
              {filteredItems.map(item => {
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
                      <button onClick={() => togglePaid(item.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mx-auto transition-all duration-300 ${item.paid ? "bg-primary border-primary scale-110" : "border-border hover:border-primary/50"}`}>
                        {item.paid && <Check size={12} className="text-primary-foreground" />}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => removeItem(item.id)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-destructive transition-colors">
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
