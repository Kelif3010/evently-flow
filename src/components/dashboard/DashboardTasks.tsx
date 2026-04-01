import { useState } from "react";
import { ListChecks, Plus, Check, Clock, Trash2, Calendar, Tag, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Task {
  id: number;
  title: string;
  done: boolean;
  dueDate: string;
  category: string;
  priority: "hoch" | "mittel" | "niedrig";
  assignee: string;
}

const initialTasks: Task[] = [
  { id: 1, title: "Einladungen versenden", done: true, dueDate: "01.03.2026", category: "Papeterie", priority: "hoch", assignee: "Laura" },
  { id: 2, title: "Menü mit Caterer finalisieren", done: true, dueDate: "15.03.2026", category: "Catering", priority: "hoch", assignee: "Markus" },
  { id: 3, title: "Fotografen-Briefing vorbereiten", done: true, dueDate: "20.03.2026", category: "Fotografie", priority: "mittel", assignee: "Laura" },
  { id: 4, title: "DJ-Playlist zusammenstellen", done: false, dueDate: "01.05.2026", category: "Musik", priority: "mittel", assignee: "Markus" },
  { id: 5, title: "Blumendeko bestätigen", done: false, dueDate: "15.05.2026", category: "Dekoration", priority: "hoch", assignee: "Laura" },
  { id: 6, title: "Tischkarten drucken lassen", done: false, dueDate: "01.06.2026", category: "Papeterie", priority: "mittel", assignee: "Laura" },
  { id: 7, title: "Sitzordnung finalisieren", done: false, dueDate: "15.06.2026", category: "Planung", priority: "hoch", assignee: "Beide" },
  { id: 8, title: "Gastgeschenke besorgen", done: false, dueDate: "01.07.2026", category: "Geschenke", priority: "niedrig", assignee: "Markus" },
  { id: 9, title: "Probefrisur & Make-up", done: false, dueDate: "15.07.2026", category: "Beauty", priority: "mittel", assignee: "Laura" },
  { id: 10, title: "Hochzeitstorte Probeessen", done: false, dueDate: "01.07.2026", category: "Catering", priority: "niedrig", assignee: "Beide" },
  { id: 11, title: "Shuttle-Service organisieren", done: false, dueDate: "01.08.2026", category: "Transport", priority: "mittel", assignee: "Markus" },
  { id: 12, title: "Notfall-Kit zusammenstellen", done: false, dueDate: "10.08.2026", category: "Planung", priority: "niedrig", assignee: "Laura" },
  { id: 13, title: "Reden der Trauzeugen koordinieren", done: false, dueDate: "01.08.2026", category: "Zeremonie", priority: "mittel", assignee: "Beide" },
  { id: 14, title: "Ehering abholen", done: false, dueDate: "12.08.2026", category: "Zeremonie", priority: "hoch", assignee: "Markus" },
];

const DashboardTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showAdd, setShowAdd] = useState(false);
  const [filterCat, setFilterCat] = useState("Alle");
  const [filterAssignee, setFilterAssignee] = useState("Alle");
  const [hideCompleted, setHideCompleted] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", dueDate: "", category: "Planung", priority: "mittel" as const, assignee: "Beide" });

  const categories = ["Alle", ...Array.from(new Set(tasks.map(t => t.category)))];
  const assignees = ["Alle", "Laura", "Markus", "Beide"];

  const toggleDone = (id: number) => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const removeTask = (id: number) => setTasks(tasks.filter(t => t.id !== id));

  const addTask = () => {
    if (!newTask.title) return;
    setTasks([...tasks, { id: Date.now(), ...newTask, done: false }]);
    setNewTask({ title: "", dueDate: "", category: "Planung", priority: "mittel", assignee: "Beide" });
    setShowAdd(false);
  };

  const filtered = tasks.filter(t => {
    if (hideCompleted && t.done) return false;
    if (filterCat !== "Alle" && t.category !== filterCat) return false;
    if (filterAssignee !== "Alle" && t.assignee !== filterAssignee) return false;
    return true;
  });

  const done = tasks.filter(t => t.done).length;
  const total = tasks.length;
  const pct = Math.round((done / total) * 100);

  const priorityBadge = (p: string) => {
    const cls = p === "hoch" ? "bg-rose-light text-accent" : p === "mittel" ? "bg-gold-light text-champagne-foreground" : "bg-secondary text-muted-foreground";
    return <span className={`text-xs font-body px-2 py-0.5 rounded-full ${cls}`}>{p}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <ListChecks size={24} className="text-primary" /> Aufgaben
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">{done} von {total} erledigt · {pct}% geschafft</p>
        </div>
        <Button size="sm" className="font-body" onClick={() => setShowAdd(!showAdd)}>
          <Plus size={14} className="mr-1.5" /> Aufgabe hinzufügen
        </Button>
      </div>

      {/* Progress */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex justify-between text-sm font-body mb-2">
          <span className="text-foreground font-medium">Fortschritt</span>
          <span className="text-muted-foreground">{done}/{total}</span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="px-3 py-2 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={filterAssignee} onChange={e => setFilterAssignee(e.target.value)} className="px-3 py-2 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30">
          {assignees.map(a => <option key={a}>{a}</option>)}
        </select>
        <label className="flex items-center gap-2 text-sm font-body text-foreground cursor-pointer">
          <input type="checkbox" checked={hideCompleted} onChange={e => setHideCompleted(e.target.checked)} className="w-4 h-4 rounded accent-primary" />
          Erledigte ausblenden
        </label>
      </div>

      {/* Add Form */}
      {showAdd && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h3 className="font-heading text-lg font-semibold text-foreground">Neue Aufgabe</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <input value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} placeholder="Aufgabe" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 sm:col-span-2" />
            <input value={newTask.dueDate} onChange={e => setNewTask({...newTask, dueDate: e.target.value})} placeholder="Fällig am (z.B. 01.06.2026)" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <select value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value as any})} className="px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option value="hoch">Hoch</option>
              <option value="mittel">Mittel</option>
              <option value="niedrig">Niedrig</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="font-body" onClick={addTask}>Hinzufügen</Button>
            <Button variant="outline" size="sm" className="font-body" onClick={() => setShowAdd(false)}>Abbrechen</Button>
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="bg-card rounded-xl border border-border divide-y divide-border">
        {filtered.map(task => (
          <div key={task.id} className="flex items-center gap-4 px-5 py-4 hover:bg-secondary/20 transition-colors group">
            <button
              onClick={() => toggleDone(task.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                task.done ? "bg-primary border-primary" : "border-border hover:border-primary/50"
              }`}
            >
              {task.done && <Check size={12} className="text-primary-foreground" />}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-body font-medium ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.title}</p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground font-body flex items-center gap-1"><Calendar size={10} /> {task.dueDate}</span>
                <span className="text-xs text-muted-foreground font-body flex items-center gap-1"><Tag size={10} /> {task.category}</span>
                <span className="text-xs text-muted-foreground font-body">👤 {task.assignee}</span>
              </div>
            </div>
            {priorityBadge(task.priority)}
            <button onClick={() => removeTask(task.id)} className="opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-destructive transition-opacity">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground font-body">Keine Aufgaben gefunden.</div>
        )}
      </div>
    </div>
  );
};

export default DashboardTasks;
