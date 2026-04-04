import { useState } from "react";
import { Gift, Plus, ExternalLink, Heart, ShoppingCart, Trash2, Edit2, Check, X, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface WishItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  link: string;
  reserved: boolean;
  reservedBy?: string;
  priority: "high" | "medium" | "low";
}

const defaultItems: WishItem[] = [
  { id: "1", name: "KitchenAid Artisan Küchenmaschine", price: 599, image: "🍳", category: "Küche", link: "https://amazon.de", reserved: true, reservedBy: "Sophie Weber", priority: "high" },
  { id: "2", name: "Dyson V15 Staubsauger", price: 699, image: "🏠", category: "Haushalt", link: "https://amazon.de", reserved: false, priority: "medium" },
  { id: "3", name: "Samsonite Koffer-Set", price: 349, image: "🧳", category: "Flitterwochen", link: "https://amazon.de", reserved: true, reservedBy: "Thomas Müller", priority: "high" },
  { id: "4", name: "Nespresso Kaffeemaschine", price: 199, image: "☕", category: "Küche", link: "https://amazon.de", reserved: false, priority: "low" },
  { id: "5", name: "Le Creuset Bräter", price: 299, image: "🍲", category: "Küche", link: "https://amazon.de", reserved: false, priority: "medium" },
  { id: "6", name: "Bettwäsche-Set Luxus", price: 189, image: "🛏️", category: "Haushalt", link: "https://amazon.de", reserved: true, reservedBy: "Anna Hoffmann", priority: "low" },
  { id: "7", name: "Flitterwochen-Fond", price: 0, image: "✈️", category: "Flitterwochen", link: "", reserved: false, priority: "high" },
  { id: "8", name: "Weingläser 6er-Set", price: 89, image: "🍷", category: "Küche", link: "https://amazon.de", reserved: false, priority: "low" },
];

const categories = ["Alle", "Küche", "Haushalt", "Flitterwochen"];

const DashboardWishlist = () => {
  const [items, setItems] = useState<WishItem[]>(defaultItems);
  const [filter, setFilter] = useState("Alle");
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", price: 0, category: "Küche", link: "", priority: "medium" as WishItem["priority"] });

  const filtered = filter === "Alle" ? items : items.filter(i => i.category === filter);
  const reservedCount = items.filter(i => i.reserved).length;
  const totalValue = items.reduce((s, i) => s + i.price, 0);
  const reservedValue = items.filter(i => i.reserved).reduce((s, i) => s + i.price, 0);

  const addItem = () => {
    if (!newItem.name) return;
    setItems([...items, {
      id: `w_${Date.now()}`,
      ...newItem,
      image: newItem.category === "Küche" ? "🍳" : newItem.category === "Flitterwochen" ? "✈️" : "🏠",
      reserved: false,
    }]);
    setNewItem({ name: "", price: 0, category: "Küche", link: "", priority: "medium" });
    setShowAdd(false);
  };

  const removeItem = (id: string) => setItems(items.filter(i => i.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <Gift size={24} className="text-primary" /> Wunschliste
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">
            Verwaltet eure Wunschliste · {reservedCount} von {items.length} reserviert
          </p>
        </div>
        <Button size="sm" className="font-body" onClick={() => setShowAdd(true)}>
          <Plus size={14} className="mr-1.5" /> Wunsch hinzufügen
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Wünsche gesamt", value: items.length, icon: Gift },
          { label: "Reserviert", value: reservedCount, icon: ShoppingCart },
          { label: "Gesamtwert", value: `€${totalValue.toLocaleString()}`, icon: Heart },
          { label: "Reservierter Wert", value: `€${reservedValue.toLocaleString()}`, icon: Check },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-body">{s.label}</span>
              <s.icon size={16} className="text-primary" />
            </div>
            <p className="text-2xl font-heading font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full text-sm font-body transition-colors ${
              filter === c ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(item => (
          <div key={item.id} className={`bg-card rounded-xl border border-border p-5 relative group transition-all hover:shadow-md ${item.reserved ? "opacity-75" : ""}`}>
            {item.reserved && (
              <div className="absolute top-3 right-3 bg-primary/10 text-primary text-[10px] font-body font-medium px-2 py-0.5 rounded-full">
                Reserviert
              </div>
            )}
            <div className="text-4xl mb-3">{item.image}</div>
            <h4 className="font-heading text-sm font-semibold text-foreground mb-1">{item.name}</h4>
            <p className="text-xs text-muted-foreground font-body mb-2">{item.category}</p>
            {item.price > 0 ? (
              <p className="text-lg font-heading font-bold text-foreground">€{item.price}</p>
            ) : (
              <p className="text-sm font-body text-primary font-medium">Beitrag frei wählbar</p>
            )}
            {item.reservedBy && (
              <p className="text-xs text-muted-foreground font-body mt-2">Reserviert von {item.reservedBy}</p>
            )}
            {item.link && (
              <a href={item.link} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-primary font-body hover:underline">
                <ExternalLink size={12} /> Link öffnen
              </a>
            )}
            <button
              onClick={() => removeItem(item.id)}
              className="absolute bottom-3 right-3 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary text-muted-foreground hover:text-destructive"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Add Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Wunsch hinzufügen</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <input value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} placeholder="Name des Wunsches" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input type="number" value={newItem.price || ""} onChange={e => setNewItem({...newItem, price: Number(e.target.value)})} placeholder="Preis in €" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <select value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-body">
              <option>Küche</option><option>Haushalt</option><option>Flitterwochen</option>
            </select>
            <input value={newItem.link} onChange={e => setNewItem({...newItem, link: e.target.value})} placeholder="Link (z.B. Amazon URL)" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <div className="flex gap-2 pt-2">
              <Button className="font-body flex-1" onClick={addItem}>Hinzufügen</Button>
              <Button variant="outline" className="font-body" onClick={() => setShowAdd(false)}>Abbrechen</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardWishlist;
