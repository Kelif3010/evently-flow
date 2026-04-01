import { useState } from "react";
import { Users, Search, Plus, Filter, Download, Mail, Trash2, Edit2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Guest {
  id: number;
  name: string;
  email: string;
  status: "Zugesagt" | "Abgesagt" | "Ausstehend";
  meal: string;
  allergies: string;
  plusOne: string;
  table: string;
  group: string;
}

const initialGuests: Guest[] = [
  { id: 1, name: "Sophie Weber", email: "sophie@email.de", status: "Zugesagt", meal: "Vegetarisch", allergies: "Laktose", plusOne: "Max Weber", table: "Tisch 1", group: "Familie Braut" },
  { id: 2, name: "Thomas Müller", email: "thomas@email.de", status: "Zugesagt", meal: "Standard", allergies: "–", plusOne: "–", table: "Tisch 2", group: "Freunde" },
  { id: 3, name: "Maria Schmidt", email: "maria@email.de", status: "Ausstehend", meal: "–", allergies: "–", plusOne: "–", table: "–", group: "Familie Bräutigam" },
  { id: 4, name: "Felix Braun", email: "felix@email.de", status: "Abgesagt", meal: "–", allergies: "–", plusOne: "–", table: "–", group: "Freunde" },
  { id: 5, name: "Anna Hoffmann", email: "anna@email.de", status: "Zugesagt", meal: "Vegan", allergies: "Nüsse", plusOne: "Paul Hoffmann", table: "Tisch 1", group: "Familie Braut" },
  { id: 6, name: "Lukas Fischer", email: "lukas@email.de", status: "Zugesagt", meal: "Standard", allergies: "–", plusOne: "–", table: "Tisch 3", group: "Kollegen" },
  { id: 7, name: "Emma Wagner", email: "emma@email.de", status: "Zugesagt", meal: "Fisch", allergies: "Gluten", plusOne: "Jan Wagner", table: "Tisch 2", group: "Freunde" },
  { id: 8, name: "Moritz Becker", email: "moritz@email.de", status: "Ausstehend", meal: "–", allergies: "–", plusOne: "–", table: "–", group: "Kollegen" },
  { id: 9, name: "Lena Schulz", email: "lena@email.de", status: "Zugesagt", meal: "Vegetarisch", allergies: "–", plusOne: "–", table: "Tisch 4", group: "Familie Bräutigam" },
  { id: 10, name: "Nico Klein", email: "nico@email.de", status: "Zugesagt", meal: "Standard", allergies: "Halal", plusOne: "Sara Klein", table: "Tisch 3", group: "Freunde" },
];

const DashboardGuests = () => {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("Alle");
  const [filterGroup, setFilterGroup] = useState<string>("Alle");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGuest, setNewGuest] = useState({ name: "", email: "", group: "Freunde" });
  const [selectedGuests, setSelectedGuests] = useState<number[]>([]);

  const groups = ["Alle", ...Array.from(new Set(guests.map(g => g.group)))];
  const statuses = ["Alle", "Zugesagt", "Abgesagt", "Ausstehend"];

  const filtered = guests.filter(g => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase()) || g.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Alle" || g.status === filterStatus;
    const matchGroup = filterGroup === "Alle" || g.group === filterGroup;
    return matchSearch && matchStatus && matchGroup;
  });

  const addGuest = () => {
    if (!newGuest.name.trim()) return;
    const guest: Guest = {
      id: Date.now(),
      name: newGuest.name,
      email: newGuest.email,
      status: "Ausstehend",
      meal: "–",
      allergies: "–",
      plusOne: "–",
      table: "–",
      group: newGuest.group,
    };
    setGuests([...guests, guest]);
    setNewGuest({ name: "", email: "", group: "Freunde" });
    setShowAddModal(false);
  };

  const removeGuest = (id: number) => setGuests(guests.filter(g => g.id !== id));

  const toggleSelect = (id: number) => {
    setSelectedGuests(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const selectAll = () => {
    if (selectedGuests.length === filtered.length) setSelectedGuests([]);
    else setSelectedGuests(filtered.map(g => g.id));
  };

  const statusBadge = (status: string) => {
    const cls = status === "Zugesagt" ? "bg-champagne text-primary" :
      status === "Abgesagt" ? "bg-rose-light text-accent" :
      "bg-gold-light text-champagne-foreground";
    return <span className={`text-xs font-body font-medium px-2.5 py-1 rounded-full ${cls}`}>{status}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <Users size={24} className="text-primary" /> Gästeliste
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">
            {guests.length} Gäste · {guests.filter(g => g.status === "Zugesagt").length} Zusagen · {guests.filter(g => g.plusOne !== "–").length} Begleitpersonen
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="font-body"><Download size={14} className="mr-1.5" /> Export</Button>
          <Button variant="outline" size="sm" className="font-body"><Mail size={14} className="mr-1.5" /> Einladen</Button>
          <Button size="sm" className="font-body" onClick={() => setShowAddModal(true)}><Plus size={14} className="mr-1.5" /> Gast hinzufügen</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Gast suchen..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex gap-2">
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30">
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={filterGroup} onChange={e => setFilterGroup(e.target.value)} className="px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30">
            {groups.map(g => <option key={g}>{g}</option>)}
          </select>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h3 className="font-heading text-lg font-semibold text-foreground">Neuen Gast hinzufügen</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            <input value={newGuest.name} onChange={e => setNewGuest({...newGuest, name: e.target.value})} placeholder="Name" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input value={newGuest.email} onChange={e => setNewGuest({...newGuest, email: e.target.value})} placeholder="E-Mail" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <select value={newGuest.group} onChange={e => setNewGuest({...newGuest, group: e.target.value})} className="px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option>Familie Braut</option>
              <option>Familie Bräutigam</option>
              <option>Freunde</option>
              <option>Kollegen</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="font-body" onClick={addGuest}>Hinzufügen</Button>
            <Button variant="outline" size="sm" className="font-body" onClick={() => setShowAddModal(false)}>Abbrechen</Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left p-4">
                  <input type="checkbox" checked={selectedGuests.length === filtered.length && filtered.length > 0} onChange={selectAll} className="w-4 h-4 rounded accent-primary" />
                </th>
                <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Gruppe</th>
                <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Essen</th>
                <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Plus-One</th>
                <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider hidden xl:table-cell">Tisch</th>
                <th className="text-right p-4 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider">Aktion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(g => (
                <tr key={g.id} className={`hover:bg-secondary/20 transition-colors ${selectedGuests.includes(g.id) ? "bg-champagne/30" : ""}`}>
                  <td className="p-4">
                    <input type="checkbox" checked={selectedGuests.includes(g.id)} onChange={() => toggleSelect(g.id)} className="w-4 h-4 rounded accent-primary" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-champagne flex items-center justify-center text-xs font-heading font-bold text-primary">
                        {g.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-body font-medium text-foreground">{g.name}</p>
                        <p className="text-xs text-muted-foreground font-body">{g.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className="text-sm font-body text-muted-foreground">{g.group}</span>
                  </td>
                  <td className="p-4">{statusBadge(g.status)}</td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className="text-sm font-body text-foreground">{g.meal}</span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className="text-sm font-body text-muted-foreground">{g.plusOne}</span>
                  </td>
                  <td className="p-4 hidden xl:table-cell">
                    <span className="text-sm font-body text-muted-foreground">{g.table}</span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground" onClick={() => removeGuest(g.id)}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground font-body">Keine Gäste gefunden.</div>
        )}
      </div>

      {selectedGuests.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background rounded-xl px-6 py-3 flex items-center gap-4 shadow-xl z-40">
          <span className="text-sm font-body">{selectedGuests.length} ausgewählt</span>
          <Button size="sm" variant="outline" className="font-body text-foreground border-background/30 hover:bg-background/10">
            <Mail size={14} className="mr-1.5" /> E-Mail senden
          </Button>
          <Button size="sm" variant="outline" className="font-body text-foreground border-background/30 hover:bg-background/10" onClick={() => {
            setGuests(guests.filter(g => !selectedGuests.includes(g.id)));
            setSelectedGuests([]);
          }}>
            <Trash2 size={14} className="mr-1.5" /> Löschen
          </Button>
          <button onClick={() => setSelectedGuests([])} className="ml-2 text-background/60 hover:text-background"><X size={16} /></button>
        </div>
      )}
    </div>
  );
};

export default DashboardGuests;
