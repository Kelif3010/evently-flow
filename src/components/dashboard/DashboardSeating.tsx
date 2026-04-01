import { useState } from "react";
import { LayoutGrid, Plus, Users, GripVertical, X, Edit2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TableGuest {
  id: number;
  name: string;
}

interface EventTable {
  id: number;
  name: string;
  capacity: number;
  guests: TableGuest[];
  shape: "round" | "rectangular";
}

const initialTables: EventTable[] = [
  { id: 1, name: "Ehrentisch", capacity: 8, shape: "rectangular", guests: [
    { id: 1, name: "Laura (Braut)" }, { id: 2, name: "Markus (Bräutigam)" },
    { id: 3, name: "Mutter Laura" }, { id: 4, name: "Vater Laura" },
    { id: 5, name: "Mutter Markus" }, { id: 6, name: "Vater Markus" },
  ]},
  { id: 2, name: "Tisch 1", capacity: 8, shape: "round", guests: [
    { id: 7, name: "Sophie Weber" }, { id: 8, name: "Max Weber" },
    { id: 9, name: "Anna Hoffmann" }, { id: 10, name: "Paul Hoffmann" },
    { id: 11, name: "Lena Schulz" },
  ]},
  { id: 3, name: "Tisch 2", capacity: 8, shape: "round", guests: [
    { id: 12, name: "Thomas Müller" }, { id: 13, name: "Emma Wagner" },
    { id: 14, name: "Jan Wagner" },
  ]},
  { id: 4, name: "Tisch 3", capacity: 8, shape: "round", guests: [
    { id: 15, name: "Lukas Fischer" }, { id: 16, name: "Nico Klein" },
    { id: 17, name: "Sara Klein" },
  ]},
  { id: 5, name: "Tisch 4", capacity: 6, shape: "round", guests: [] },
];

const unassigned: TableGuest[] = [
  { id: 100, name: "Maria Schmidt" },
  { id: 101, name: "Moritz Becker" },
  { id: 102, name: "Julia Hartmann" },
  { id: 103, name: "Peter Neumann" },
];

const DashboardSeating = () => {
  const [tables, setTables] = useState<EventTable[]>(initialTables);
  const [unassignedGuests, setUnassignedGuests] = useState<TableGuest[]>(unassigned);
  const [editingTable, setEditingTable] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [dragGuest, setDragGuest] = useState<{ guest: TableGuest; fromTable: number | null } | null>(null);

  const totalSeats = tables.reduce((s, t) => s + t.capacity, 0);
  const totalAssigned = tables.reduce((s, t) => s + t.guests.length, 0);

  const addTable = () => {
    const newTable: EventTable = {
      id: Date.now(),
      name: `Tisch ${tables.length}`,
      capacity: 8,
      shape: "round",
      guests: [],
    };
    setTables([...tables, newTable]);
  };

  const removeTable = (id: number) => {
    const table = tables.find(t => t.id === id);
    if (table) {
      setUnassignedGuests([...unassignedGuests, ...table.guests]);
      setTables(tables.filter(t => t.id !== id));
    }
  };

  const startEdit = (table: EventTable) => {
    setEditingTable(table.id);
    setEditName(table.name);
  };

  const saveEdit = (id: number) => {
    setTables(tables.map(t => t.id === id ? { ...t, name: editName } : t));
    setEditingTable(null);
  };

  const assignGuest = (guest: TableGuest, toTableId: number) => {
    if (dragGuest?.fromTable === null) {
      setUnassignedGuests(prev => prev.filter(g => g.id !== guest.id));
    } else if (dragGuest?.fromTable) {
      setTables(prev => prev.map(t => t.id === dragGuest.fromTable ? { ...t, guests: t.guests.filter(g => g.id !== guest.id) } : t));
    }
    setTables(prev => prev.map(t => t.id === toTableId ? { ...t, guests: [...t.guests, guest] } : t));
    setDragGuest(null);
  };

  const unassignGuest = (guest: TableGuest, fromTableId: number) => {
    setTables(prev => prev.map(t => t.id === fromTableId ? { ...t, guests: t.guests.filter(g => g.id !== guest.id) } : t));
    setUnassignedGuests(prev => [...prev, guest]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <LayoutGrid size={24} className="text-primary" /> Tischplanung
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">
            {tables.length} Tische · {totalAssigned} von {totalSeats} Plätzen belegt · {unassignedGuests.length} nicht zugeordnet
          </p>
        </div>
        <Button size="sm" className="font-body" onClick={addTable}>
          <Plus size={14} className="mr-1.5" /> Tisch hinzufügen
        </Button>
      </div>

      {/* Unassigned Guests */}
      {unassignedGuests.length > 0 && (
        <div className="bg-gold-light/50 rounded-xl border border-border p-5">
          <h3 className="font-heading text-base font-semibold text-foreground mb-3 flex items-center gap-2">
            <Users size={16} className="text-gold" /> Nicht zugeordnete Gäste ({unassignedGuests.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {unassignedGuests.map(g => (
              <div
                key={g.id}
                draggable
                onDragStart={() => setDragGuest({ guest: g, fromTable: null })}
                className="flex items-center gap-2 px-3 py-2 bg-background rounded-lg border border-border text-sm font-body cursor-grab hover:border-primary/50 transition-colors"
              >
                <GripVertical size={12} className="text-muted-foreground" />
                {g.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tables Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {tables.map(table => (
          <div
            key={table.id}
            onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add("ring-2", "ring-primary/50"); }}
            onDragLeave={e => { e.currentTarget.classList.remove("ring-2", "ring-primary/50"); }}
            onDrop={e => {
              e.currentTarget.classList.remove("ring-2", "ring-primary/50");
              if (dragGuest && table.guests.length < table.capacity) {
                assignGuest(dragGuest.guest, table.id);
              }
            }}
            className="bg-card rounded-xl border border-border p-5 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              {editingTable === table.id ? (
                <div className="flex items-center gap-2">
                  <input value={editName} onChange={e => setEditName(e.target.value)} className="px-2 py-1 rounded border border-border bg-background text-sm font-body w-32" autoFocus />
                  <button onClick={() => saveEdit(table.id)} className="p-1 text-primary"><Check size={14} /></button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-semibold text-foreground">{table.name}</h3>
                  <button onClick={() => startEdit(table)} className="p-1 text-muted-foreground hover:text-foreground"><Edit2 size={12} /></button>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className={`text-xs font-body px-2 py-0.5 rounded-full ${table.shape === "round" ? "bg-champagne" : "bg-gold-light"}`}>
                  {table.shape === "round" ? "⬤ Rund" : "▬ Eckig"}
                </span>
                <button onClick={() => removeTable(table.id)} className="p-1 text-muted-foreground hover:text-destructive"><X size={14} /></button>
              </div>
            </div>

            {/* Visual table */}
            <div className="relative mx-auto mb-4" style={{ width: 160, height: table.shape === "round" ? 160 : 100 }}>
              <div className={`absolute inset-0 border-2 border-border ${table.shape === "round" ? "rounded-full" : "rounded-xl"} bg-secondary/30 flex items-center justify-center`}>
                <span className="text-xs font-body text-muted-foreground">{table.guests.length}/{table.capacity}</span>
              </div>
              {table.guests.slice(0, 8).map((g, i) => {
                const angle = (i / Math.max(table.capacity, 1)) * 2 * Math.PI - Math.PI / 2;
                const rx = table.shape === "round" ? 68 : 72;
                const ry = table.shape === "round" ? 68 : 38;
                const cx = 80 + rx * Math.cos(angle) - 14;
                const cy = (table.shape === "round" ? 80 : 50) + ry * Math.sin(angle) - 14;
                return (
                  <div
                    key={g.id}
                    className="absolute w-7 h-7 rounded-full bg-champagne border-2 border-primary/30 flex items-center justify-center text-[10px] font-heading font-bold text-primary cursor-pointer hover:scale-110 transition-transform"
                    style={{ left: cx, top: cy }}
                    title={g.name}
                  >
                    {g.name.split(" ").map(n => n[0]).join("")}
                  </div>
                );
              })}
            </div>

            {/* Guest list */}
            <div className="space-y-1.5">
              {table.guests.map(g => (
                <div key={g.id} className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-secondary/50 group">
                  <span className="text-sm font-body text-foreground">{g.name}</span>
                  <button
                    onClick={() => unassignGuest(g, table.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {table.guests.length === 0 && (
                <p className="text-xs text-muted-foreground font-body text-center py-2">Gäste hierher ziehen</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSeating;
