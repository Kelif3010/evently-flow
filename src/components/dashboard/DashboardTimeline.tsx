import { useState } from "react";
import { CalendarClock, Plus, GripVertical, Edit2, Trash2, Check, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimelineEvent {
  id: number;
  time: string;
  endTime: string;
  title: string;
  description: string;
  icon: string;
  location: string;
  responsible: string;
  notes: string;
}

const initialEvents: TimelineEvent[] = [
  { id: 1, time: "13:00", endTime: "14:00", title: "Ankommen & Einchecken", description: "Gäste kommen an und werden begrüßt", icon: "🏰", location: "Schloss-Eingang", responsible: "Trauzeugen", notes: "Willkommensdrinks bereitstellen" },
  { id: 2, time: "14:00", endTime: "14:30", title: "Sektempfang", description: "Aperitif und erste Gespräche im Schlossgarten", icon: "🥂", location: "Schlossgarten", responsible: "Caterer", notes: "Fingerfood & alkoholfreie Optionen" },
  { id: 3, time: "14:30", endTime: "15:30", title: "Trauung", description: "Freie Trauung in der Orangerie", icon: "💍", location: "Orangerie", responsible: "Trauredner", notes: "Musikeinsatz bei Einzug der Braut" },
  { id: 4, time: "15:30", endTime: "16:30", title: "Gratulation & Fotos", description: "Empfangslinie und Gruppenfotos", icon: "📸", location: "Schlossgarten & Terrasse", responsible: "Fotograf", notes: "Fotoliste vorbereiten" },
  { id: 5, time: "16:30", endTime: "18:00", title: "Kaffee & Kuchen", description: "Kuchenbuffet mit Hochzeitstorte", icon: "🎂", location: "Festsaal-Terrasse", responsible: "Caterer / Konditor", notes: "Tortenanschnitt um 17:00" },
  { id: 6, time: "18:00", endTime: "20:00", title: "Abendessen", description: "3-Gänge-Menü im Festsaal", icon: "🍽️", location: "Festsaal", responsible: "Caterer", notes: "Allergien beachten, veganes Menü Tisch 4" },
  { id: 7, time: "20:00", endTime: "20:30", title: "Reden & Überraschungen", description: "Reden der Trauzeugen und Gäste-Überraschungen", icon: "🎤", location: "Festsaal", responsible: "Trauzeugen / Moderator", notes: "Max. 5 Min pro Rede" },
  { id: 8, time: "20:30", endTime: "21:00", title: "Eröffnungstanz", description: "Erster Tanz des Brautpaars, dann alle aufs Parkett", icon: "💃", location: "Festsaal / Tanzfläche", responsible: "DJ", notes: "Song: Ed Sheeran – Perfect" },
  { id: 9, time: "21:00", endTime: "00:00", title: "Party & Tanz", description: "DJ-Set mit Wunschliste der Gäste", icon: "🎶", location: "Festsaal", responsible: "DJ", notes: "Playlist aus RSVP-Musikwünschen" },
  { id: 10, time: "00:00", endTime: "01:00", title: "Mitternachtssnack", description: "Burger, Pommes und Snacks", icon: "🍔", location: "Terrasse / Bar", responsible: "Caterer", notes: "Auch vegetarische Burger" },
];

const DashboardTimeline = () => {
  const [events, setEvents] = useState<TimelineEvent[]>(initialEvents);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<TimelineEvent>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<TimelineEvent>>({ time: "", endTime: "", title: "", description: "", icon: "📌", location: "", responsible: "", notes: "" });

  const startEdit = (event: TimelineEvent) => {
    setEditingId(event.id);
    setEditData(event);
  };

  const saveEdit = () => {
    setEvents(events.map(e => e.id === editingId ? { ...e, ...editData } as TimelineEvent : e));
    setEditingId(null);
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.time) return;
    const event: TimelineEvent = { id: Date.now(), ...newEvent } as TimelineEvent;
    const updated = [...events, event].sort((a, b) => a.time.localeCompare(b.time));
    setEvents(updated);
    setNewEvent({ time: "", endTime: "", title: "", description: "", icon: "📌", location: "", responsible: "", notes: "" });
    setShowAdd(false);
  };

  const removeEvent = (id: number) => setEvents(events.filter(e => e.id !== id));

  const totalDuration = () => {
    if (events.length < 2) return "–";
    const first = events[0].time;
    const last = events[events.length - 1].endTime;
    return `${first} – ${last}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <CalendarClock size={24} className="text-primary" /> Tagesablauf
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">
            {events.length} Programmpunkte · {totalDuration()}
          </p>
        </div>
        <Button size="sm" className="font-body" onClick={() => setShowAdd(!showAdd)}>
          <Plus size={14} className="mr-1.5" /> Programmpunkt hinzufügen
        </Button>
      </div>

      {/* Add Form */}
      {showAdd && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h3 className="font-heading text-lg font-semibold text-foreground">Neuer Programmpunkt</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <input value={newEvent.time} onChange={e => setNewEvent({...newEvent, time: e.target.value})} placeholder="Uhrzeit (z.B. 14:00)" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input value={newEvent.endTime} onChange={e => setNewEvent({...newEvent, endTime: e.target.value})} placeholder="Ende (z.B. 15:00)" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} placeholder="Titel" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input value={newEvent.icon} onChange={e => setNewEvent({...newEvent, icon: e.target.value})} placeholder="Emoji (z.B. 🎶)" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <input value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} placeholder="Beschreibung" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} placeholder="Ort" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="font-body" onClick={addEvent}>Hinzufügen</Button>
            <Button variant="outline" size="sm" className="font-body" onClick={() => setShowAdd(false)}>Abbrechen</Button>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-0">
        {events.map((event, i) => (
          <div key={event.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-champagne flex items-center justify-center text-xl flex-shrink-0">
                {event.icon}
              </div>
              {i < events.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
            </div>
            <div className="flex-1 pb-6">
              {editingId === event.id ? (
                <div className="bg-card rounded-xl border border-border p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input value={editData.time || ""} onChange={e => setEditData({...editData, time: e.target.value})} className="px-3 py-2 rounded-lg border border-border bg-background text-sm font-body" />
                    <input value={editData.endTime || ""} onChange={e => setEditData({...editData, endTime: e.target.value})} className="px-3 py-2 rounded-lg border border-border bg-background text-sm font-body" />
                  </div>
                  <input value={editData.title || ""} onChange={e => setEditData({...editData, title: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-body" />
                  <input value={editData.description || ""} onChange={e => setEditData({...editData, description: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-body" />
                  <div className="flex gap-2">
                    <Button size="sm" className="font-body" onClick={saveEdit}><Check size={14} className="mr-1" /> Speichern</Button>
                    <Button variant="outline" size="sm" className="font-body" onClick={() => setEditingId(null)}>Abbrechen</Button>
                  </div>
                </div>
              ) : (
                <div className="bg-card rounded-xl border border-border p-4 hover:border-primary/30 transition-colors group">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-body font-bold text-primary">{event.time} – {event.endTime}</span>
                        <span className="text-xs text-muted-foreground font-body">📍 {event.location}</span>
                      </div>
                      <h3 className="font-heading font-semibold text-foreground">{event.title}</h3>
                      <p className="text-sm text-muted-foreground font-body mt-0.5">{event.description}</p>
                      {event.responsible && (
                        <p className="text-xs text-muted-foreground font-body mt-2">👤 {event.responsible}</p>
                      )}
                      {event.notes && (
                        <p className="text-xs text-primary/70 font-body mt-1">📝 {event.notes}</p>
                      )}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEdit(event)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground"><Edit2 size={14} /></button>
                      <button onClick={() => removeEvent(event.id)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardTimeline;
