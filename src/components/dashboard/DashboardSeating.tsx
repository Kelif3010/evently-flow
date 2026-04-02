import { useState, useRef, useCallback, useEffect } from "react";
import { LayoutGrid, Plus, Users, GripVertical, X, Edit2, Check, Move, Eye, List, Maximize2, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  x: number;
  y: number;
}

const initialTables: EventTable[] = [
  { id: 1, name: "Ehrentisch", capacity: 8, shape: "rectangular", x: 350, y: 80, guests: [
    { id: 1, name: "Laura (Braut)" }, { id: 2, name: "Markus (Bräutigam)" },
    { id: 3, name: "Mutter Laura" }, { id: 4, name: "Vater Laura" },
    { id: 5, name: "Mutter Markus" }, { id: 6, name: "Vater Markus" },
  ]},
  { id: 2, name: "Tisch 1", capacity: 8, shape: "round", x: 120, y: 280, guests: [
    { id: 7, name: "Sophie Weber" }, { id: 8, name: "Max Weber" },
    { id: 9, name: "Anna Hoffmann" }, { id: 10, name: "Paul Hoffmann" },
    { id: 11, name: "Lena Schulz" },
  ]},
  { id: 3, name: "Tisch 2", capacity: 8, shape: "round", x: 400, y: 280, guests: [
    { id: 12, name: "Thomas Müller" }, { id: 13, name: "Emma Wagner" },
    { id: 14, name: "Jan Wagner" },
  ]},
  { id: 4, name: "Tisch 3", capacity: 8, shape: "round", x: 680, y: 280, guests: [
    { id: 15, name: "Lukas Fischer" }, { id: 16, name: "Nico Klein" },
    { id: 17, name: "Sara Klein" },
  ]},
  { id: 5, name: "Tisch 4", capacity: 6, shape: "round", x: 260, y: 480, guests: [] },
];

const unassigned: TableGuest[] = [
  { id: 100, name: "Maria Schmidt" },
  { id: 101, name: "Moritz Becker" },
  { id: 102, name: "Julia Hartmann" },
  { id: 103, name: "Peter Neumann" },
];

// ─── Add Table Dialog ───
const AddTableDialog = ({ open, onClose, onAdd }: {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, capacity: number, shape: "round" | "rectangular") => void;
}) => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(8);
  const [shape, setShape] = useState<"round" | "rectangular">("round");

  const handleAdd = () => {
    onAdd(name || `Tisch`, capacity, shape);
    setName("");
    setCapacity(8);
    setShape("round");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Neuen Tisch erstellen</DialogTitle>
          <DialogDescription className="font-body text-muted-foreground">
            Wähle Form, Plätze und Namen für den neuen Tisch.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5 py-2">
          {/* Shape selection */}
          <div className="space-y-2">
            <Label className="font-body text-sm font-medium">Tischform</Label>
            <div className="grid grid-cols-2 gap-3">
              {(["round", "rectangular"] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setShape(s)}
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    shape === s
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className={`${s === "round" ? "w-16 h-16 rounded-full" : "w-20 h-12 rounded-xl"} border-2 ${shape === s ? "border-primary bg-primary/10" : "border-muted-foreground/30 bg-secondary/50"} transition-colors`} />
                  <span className="text-sm font-body font-medium">{s === "round" ? "Rund" : "Eckig"}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Capacity */}
          <div className="space-y-2">
            <Label className="font-body text-sm font-medium">Anzahl Plätze</Label>
            <div className="flex items-center gap-2">
              {[4, 6, 8, 10, 12].map(n => (
                <button
                  key={n}
                  onClick={() => setCapacity(n)}
                  className={`w-10 h-10 rounded-lg font-body text-sm font-semibold transition-all ${
                    capacity === n
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label className="font-body text-sm font-medium">Tischname</Label>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="z.B. Ehrentisch, Tisch Familie Müller"
              className="font-body"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="font-body">Abbrechen</Button>
          <Button onClick={handleAdd} className="font-body">
            <Plus size={14} className="mr-1.5" /> Tisch erstellen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ─── Floor Plan View ───
const FloorPlanView = ({ tables, setTables, unassignedGuests, setUnassignedGuests, onSelectTable }: {
  tables: EventTable[];
  setTables: React.Dispatch<React.SetStateAction<EventTable[]>>;
  unassignedGuests: TableGuest[];
  setUnassignedGuests: React.Dispatch<React.SetStateAction<TableGuest[]>>;
  onSelectTable: (id: number | null) => void;
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<{ id: number; offX: number; offY: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [roomSize] = useState({ w: 900, h: 600 });

  const handleMouseDown = (e: React.MouseEvent, table: EventTable) => {
    e.stopPropagation();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    setDragging({
      id: table.id,
      offX: (e.clientX - rect.left) / zoom - table.x,
      offY: (e.clientY - rect.top) / zoom - table.y,
    });
    setSelectedTable(table.id);
    onSelectTable(table.id);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(roomSize.w - 80, (e.clientX - rect.left) / zoom - dragging.offX));
    const y = Math.max(0, Math.min(roomSize.h - 80, (e.clientY - rect.top) / zoom - dragging.offY));
    setTables(prev => prev.map(t => t.id === dragging.id ? { ...t, x, y } : t));
  }, [dragging, zoom, roomSize, setTables]);

  const handleMouseUp = () => setDragging(null);

  const handleCanvasClick = () => {
    setSelectedTable(null);
    onSelectTable(null);
  };

  // Drop guest onto table in floor plan
  const handleDrop = (e: React.DragEvent, tableId: number) => {
    e.preventDefault();
    const guestData = e.dataTransfer.getData("guest");
    if (!guestData) return;
    const { guest, fromTable } = JSON.parse(guestData);
    const targetTable = tables.find(t => t.id === tableId);
    if (!targetTable || targetTable.guests.length >= targetTable.capacity) return;
    if (fromTable === null) {
      setUnassignedGuests(prev => prev.filter(g => g.id !== guest.id));
    } else {
      setTables(prev => prev.map(t => t.id === fromTable ? { ...t, guests: t.guests.filter(g => g.id !== guest.id) } : t));
    }
    setTables(prev => prev.map(t => t.id === tableId ? { ...t, guests: [...t.guests, guest] } : t));
  };

  const getTableSize = (table: EventTable) => {
    const base = Math.max(80, 60 + table.capacity * 4);
    return table.shape === "round"
      ? { w: base, h: base }
      : { w: base * 1.4, h: base * 0.7 };
  };

  return (
    <div className="relative">
      {/* Zoom controls */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-card/90 backdrop-blur rounded-lg border border-border p-1 shadow-sm">
        <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-1.5 rounded hover:bg-secondary transition-colors">
          <ZoomOut size={14} className="text-muted-foreground" />
        </button>
        <span className="text-xs font-body text-muted-foreground w-10 text-center">{Math.round(zoom * 100)}%</span>
        <button onClick={() => setZoom(z => Math.min(1.5, z + 0.1))} className="p-1.5 rounded hover:bg-secondary transition-colors">
          <ZoomIn size={14} className="text-muted-foreground" />
        </button>
        <button onClick={() => setZoom(1)} className="p-1.5 rounded hover:bg-secondary transition-colors">
          <Maximize2 size={14} className="text-muted-foreground" />
        </button>
      </div>

      {/* Room canvas */}
      <div
        ref={canvasRef}
        className="relative overflow-auto rounded-xl border-2 border-dashed border-border bg-secondary/20 cursor-crosshair select-none"
        style={{ height: 500 }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
      >
        <div style={{ width: roomSize.w * zoom, height: roomSize.h * zoom, position: "relative", transformOrigin: "0 0" }}>
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            {Array.from({ length: Math.ceil(roomSize.w / 50) }).map((_, i) => (
              <line key={`v${i}`} x1={i * 50 * zoom} y1={0} x2={i * 50 * zoom} y2={roomSize.h * zoom} stroke="hsl(var(--border))" strokeWidth={1} />
            ))}
            {Array.from({ length: Math.ceil(roomSize.h / 50) }).map((_, i) => (
              <line key={`h${i}`} x1={0} y1={i * 50 * zoom} x2={roomSize.w * zoom} y2={i * 50 * zoom} stroke="hsl(var(--border))" strokeWidth={1} />
            ))}
          </svg>

          {/* Room labels */}
          <div className="absolute top-2 left-3 text-[10px] font-body text-muted-foreground/50 uppercase tracking-widest" style={{ transform: `scale(${zoom})`, transformOrigin: "0 0" }}>
            Raumansicht · Draufsicht
          </div>

          {/* Dance floor indicator */}
          <div
            className="absolute border-2 border-dashed border-primary/20 rounded-2xl flex items-center justify-center"
            style={{
              left: 350 * zoom,
              top: 400 * zoom,
              width: 200 * zoom,
              height: 150 * zoom,
            }}
          >
            <span className="text-xs font-body text-primary/30 font-medium" style={{ fontSize: 11 * zoom }}>Tanzfläche</span>
          </div>

          {/* Tables */}
          {tables.map(table => {
            const size = getTableSize(table);
            const isSelected = selectedTable === table.id;
            const fillPercent = table.guests.length / table.capacity;
            return (
              <div
                key={table.id}
                className={`absolute cursor-grab active:cursor-grabbing transition-shadow ${
                  isSelected ? "z-20" : "z-10"
                }`}
                style={{
                  left: table.x * zoom,
                  top: table.y * zoom,
                  width: size.w * zoom,
                  height: size.h * zoom,
                }}
                onMouseDown={e => handleMouseDown(e, table)}
                onDragOver={e => e.preventDefault()}
                onDrop={e => handleDrop(e, table.id)}
              >
                {/* Table shape */}
                <div className={`w-full h-full ${table.shape === "round" ? "rounded-full" : "rounded-xl"} border-2 transition-all flex flex-col items-center justify-center gap-0.5 ${
                  isSelected
                    ? "border-primary bg-primary/15 shadow-lg shadow-primary/20"
                    : fillPercent >= 1
                      ? "border-primary/40 bg-primary/8"
                      : "border-border bg-card/80 hover:border-primary/30"
                }`}>
                  <span className="font-heading font-semibold text-foreground leading-none" style={{ fontSize: 10 * zoom }}>
                    {table.name}
                  </span>
                  <span className="font-body text-muted-foreground" style={{ fontSize: 9 * zoom }}>
                    {table.guests.length}/{table.capacity}
                  </span>
                </div>

                {/* Guest dots around table */}
                {table.guests.slice(0, table.capacity).map((g, i) => {
                  const angle = (i / table.capacity) * 2 * Math.PI - Math.PI / 2;
                  const rx = (size.w / 2 + 12) * zoom;
                  const ry = (size.h / 2 + 12) * zoom;
                  const cx = (size.w * zoom) / 2 + rx * Math.cos(angle) - 8 * zoom;
                  const cy = (size.h * zoom) / 2 + ry * Math.sin(angle) - 8 * zoom;
                  return (
                    <div
                      key={g.id}
                      className="absolute rounded-full bg-champagne border border-primary/30 flex items-center justify-center"
                      style={{
                        left: cx,
                        top: cy,
                        width: 16 * zoom,
                        height: 16 * zoom,
                        fontSize: 6 * zoom,
                      }}
                      title={g.name}
                    >
                      <span className="font-heading font-bold text-primary leading-none">
                        {g.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── List View ───
const TableListView = ({ tables, setTables, unassignedGuests, setUnassignedGuests }: {
  tables: EventTable[];
  setTables: React.Dispatch<React.SetStateAction<EventTable[]>>;
  unassignedGuests: TableGuest[];
  setUnassignedGuests: React.Dispatch<React.SetStateAction<TableGuest[]>>;
}) => {
  const [editingTable, setEditingTable] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [dragGuest, setDragGuest] = useState<{ guest: TableGuest; fromTable: number | null } | null>(null);

  const startEdit = (table: EventTable) => {
    setEditingTable(table.id);
    setEditName(table.name);
  };

  const saveEdit = (id: number) => {
    setTables(tables.map(t => t.id === id ? { ...t, name: editName } : t));
    setEditingTable(null);
  };

  const removeTable = (id: number) => {
    const table = tables.find(t => t.id === id);
    if (table) {
      setUnassignedGuests(prev => [...prev, ...table.guests]);
      setTables(tables.filter(t => t.id !== id));
    }
  };

  const unassignGuest = (guest: TableGuest, fromTableId: number) => {
    setTables(prev => prev.map(t => t.id === fromTableId ? { ...t, guests: t.guests.filter(g => g.id !== guest.id) } : t));
    setUnassignedGuests(prev => [...prev, guest]);
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

  return (
    <>
      {/* Unassigned Guests */}
      {unassignedGuests.length > 0 && (
        <div className="bg-rose-light/30 rounded-xl border border-border p-5">
          <h3 className="font-heading text-base font-semibold text-foreground mb-3 flex items-center gap-2">
            <Users size={16} className="text-accent" /> Nicht zugeordnete Gäste ({unassignedGuests.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {unassignedGuests.map(g => (
              <div
                key={g.id}
                draggable
                onDragStart={e => {
                  setDragGuest({ guest: g, fromTable: null });
                  e.dataTransfer.setData("guest", JSON.stringify({ guest: g, fromTable: null }));
                }}
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
    </>
  );
};

// ─── Detail Panel for selected table in floor plan ───
const TableDetailPanel = ({ table, tables, setTables, unassignedGuests, setUnassignedGuests, onClose }: {
  table: EventTable;
  tables: EventTable[];
  setTables: React.Dispatch<React.SetStateAction<EventTable[]>>;
  unassignedGuests: TableGuest[];
  setUnassignedGuests: React.Dispatch<React.SetStateAction<TableGuest[]>>;
  onClose: () => void;
}) => {
  const unassignGuest = (guest: TableGuest) => {
    setTables(prev => prev.map(t => t.id === table.id ? { ...t, guests: t.guests.filter(g => g.id !== guest.id) } : t));
    setUnassignedGuests(prev => [...prev, guest]);
  };

  const assignFromUnassigned = (guest: TableGuest) => {
    if (table.guests.length >= table.capacity) return;
    setUnassignedGuests(prev => prev.filter(g => g.id !== guest.id));
    setTables(prev => prev.map(t => t.id === table.id ? { ...t, guests: [...t.guests, guest] } : t));
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 space-y-3 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-foreground">{table.name}</h3>
        <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground"><X size={14} /></button>
      </div>
      <div className="flex items-center gap-3 text-xs font-body text-muted-foreground">
        <span>{table.shape === "round" ? "⬤ Rund" : "▬ Eckig"}</span>
        <span>{table.guests.length}/{table.capacity} Plätze</span>
      </div>

      {/* Current guests */}
      <div className="space-y-1">
        <span className="text-xs font-body font-medium text-muted-foreground">Gäste am Tisch</span>
        {table.guests.map(g => (
          <div key={g.id} className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-secondary/50 group">
            <span className="text-sm font-body">{g.name}</span>
            <button onClick={() => unassignGuest(g)} className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive"><X size={12} /></button>
          </div>
        ))}
        {table.guests.length === 0 && <p className="text-xs text-muted-foreground py-1">Keine Gäste zugeordnet</p>}
      </div>

      {/* Quick assign */}
      {unassignedGuests.length > 0 && table.guests.length < table.capacity && (
        <div className="space-y-1 pt-2 border-t border-border">
          <span className="text-xs font-body font-medium text-muted-foreground">Schnell zuordnen</span>
          {unassignedGuests.slice(0, 5).map(g => (
            <button key={g.id} onClick={() => assignFromUnassigned(g)} className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-primary/5 text-sm font-body text-left transition-colors">
              <Plus size={12} className="text-primary" /> {g.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Main Component ───
const DashboardSeating = () => {
  const [tables, setTables] = useState<EventTable[]>(initialTables);
  const [unassignedGuests, setUnassignedGuests] = useState<TableGuest[]>(unassigned);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [viewMode, setViewMode] = useState<"floorplan" | "list">("floorplan");
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  const totalSeats = tables.reduce((s, t) => s + t.capacity, 0);
  const totalAssigned = tables.reduce((s, t) => s + t.guests.length, 0);
  const selectedTable = tables.find(t => t.id === selectedTableId) || null;

  const handleAddTable = (name: string, capacity: number, shape: "round" | "rectangular") => {
    const newTable: EventTable = {
      id: Date.now(),
      name: name || `Tisch ${tables.length}`,
      capacity,
      shape,
      x: 100 + Math.random() * 400,
      y: 100 + Math.random() * 300,
      guests: [],
    };
    setTables(prev => [...prev, newTable]);
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
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center bg-secondary rounded-lg p-0.5">
            <button
              onClick={() => setViewMode("floorplan")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-body font-medium transition-all ${
                viewMode === "floorplan" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye size={13} /> Raumansicht
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-body font-medium transition-all ${
                viewMode === "list" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List size={13} /> Listenansicht
            </button>
          </div>
          <Button size="sm" className="font-body" onClick={() => setShowAddDialog(true)}>
            <Plus size={14} className="mr-1.5" /> Tisch hinzufügen
          </Button>
        </div>
      </div>

      {viewMode === "floorplan" ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
          {/* Floor plan */}
          <FloorPlanView
            tables={tables}
            setTables={setTables}
            unassignedGuests={unassignedGuests}
            setUnassignedGuests={setUnassignedGuests}
            onSelectTable={setSelectedTableId}
          />

          {/* Side panel */}
          <div className="space-y-4">
            {/* Unassigned guests (draggable) */}
            {unassignedGuests.length > 0 && (
              <div className="bg-rose-light/30 rounded-xl border border-border p-4">
                <h3 className="font-heading text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Users size={14} className="text-accent" /> Nicht zugeordnet ({unassignedGuests.length})
                </h3>
                <div className="space-y-1.5">
                  {unassignedGuests.map(g => (
                    <div
                      key={g.id}
                      draggable
                      onDragStart={e => {
                        e.dataTransfer.setData("guest", JSON.stringify({ guest: g, fromTable: null }));
                      }}
                      className="flex items-center gap-2 px-2 py-1.5 bg-background rounded-lg border border-border text-xs font-body cursor-grab hover:border-primary/50 transition-colors"
                    >
                      <GripVertical size={10} className="text-muted-foreground" />
                      {g.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected table detail */}
            {selectedTable ? (
              <TableDetailPanel
                table={selectedTable}
                tables={tables}
                setTables={setTables}
                unassignedGuests={unassignedGuests}
                setUnassignedGuests={setUnassignedGuests}
                onClose={() => setSelectedTableId(null)}
              />
            ) : (
              <div className="bg-card rounded-xl border border-border p-4 text-center">
                <Move size={20} className="mx-auto text-muted-foreground/50 mb-2" />
                <p className="text-xs font-body text-muted-foreground">
                  Klicke auf einen Tisch um Details zu sehen.<br />Ziehe Tische um sie im Raum zu platzieren.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <TableListView
          tables={tables}
          setTables={setTables}
          unassignedGuests={unassignedGuests}
          setUnassignedGuests={setUnassignedGuests}
        />
      )}

      <AddTableDialog open={showAddDialog} onClose={() => setShowAddDialog(false)} onAdd={handleAddTable} />
    </div>
  );
};

export default DashboardSeating;
