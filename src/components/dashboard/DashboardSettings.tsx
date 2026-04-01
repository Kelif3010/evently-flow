import { useState } from "react";
import { Settings, Save, Globe, Palette, Bell, Lock, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardSettings = () => {
  const [eventName, setEventName] = useState("Hochzeit Laura & Markus");
  const [eventDate, setEventDate] = useState("2026-08-15");
  const [eventLocation, setEventLocation] = useState("Schloss Elmau, Bayern");
  const [rsvpDeadline, setRsvpDeadline] = useState("2026-06-01");
  const [accessCode, setAccessCode] = useState("LAURAMARKUS26");
  const [portalPublic, setPortalPublic] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [rsvpReminder, setRsvpReminder] = useState(true);
  const [primaryColor, setPrimaryColor] = useState("#C08B3F");
  const [greetingText, setGreetingText] = useState("Wir freuen uns, euch bei unserer Hochzeit begrüßen zu dürfen!");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <Settings size={24} className="text-primary" /> Einstellungen
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">Event- und Portal-Einstellungen verwalten</p>
        </div>
        <Button className="font-body" onClick={handleSave}>
          <Save size={14} className="mr-1.5" /> {saved ? "Gespeichert ✓" : "Speichern"}
        </Button>
      </div>

      {/* Event Details */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-5">
        <h3 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
          <Calendar size={18} className="text-primary" /> Event-Details
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1.5">Event-Name</label>
            <input value={eventName} onChange={e => setEventName(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1.5">Datum</label>
            <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1.5">Veranstaltungsort</label>
            <input value={eventLocation} onChange={e => setEventLocation(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1.5">RSVP-Frist</label>
            <input type="date" value={rsvpDeadline} onChange={e => setRsvpDeadline(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
      </div>

      {/* Portal Settings */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-5">
        <h3 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
          <Globe size={18} className="text-primary" /> Gästeportal
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1.5">Zugangscode</label>
            <input value={accessCode} onChange={e => setAccessCode(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body font-mono focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <p className="text-xs text-muted-foreground font-body mt-1">Gäste benötigen diesen Code, um auf das Portal zuzugreifen</p>
          </div>
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1.5">Begrüßungstext</label>
            <textarea value={greetingText} onChange={e => setGreetingText(e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
          </div>
          <div className="flex items-center justify-between py-3 border-t border-border">
            <div>
              <p className="text-sm font-body font-medium text-foreground">Portal öffentlich</p>
              <p className="text-xs text-muted-foreground font-body">Ohne Zugangscode erreichbar</p>
            </div>
            <button onClick={() => setPortalPublic(!portalPublic)} className={`w-12 h-7 rounded-full transition-colors ${portalPublic ? "bg-primary" : "bg-border"}`}>
              <div className={`w-5 h-5 rounded-full bg-primary-foreground transition-transform mx-1 ${portalPublic ? "translate-x-5" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Design */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-5">
        <h3 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
          <Palette size={18} className="text-primary" /> Design
        </h3>
        <div>
          <label className="block text-sm font-body font-medium text-foreground mb-1.5">Akzentfarbe</label>
          <div className="flex items-center gap-3">
            <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-10 h-10 rounded-lg border border-border cursor-pointer" />
            <input value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-32 px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body font-mono focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <h3 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
          <Bell size={18} className="text-primary" /> Benachrichtigungen
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-body font-medium text-foreground">E-Mail bei neuer Rückmeldung</p>
              <p className="text-xs text-muted-foreground font-body">Benachrichtigung bei jeder RSVP-Antwort</p>
            </div>
            <button onClick={() => setEmailNotifications(!emailNotifications)} className={`w-12 h-7 rounded-full transition-colors ${emailNotifications ? "bg-primary" : "bg-border"}`}>
              <div className={`w-5 h-5 rounded-full bg-primary-foreground transition-transform mx-1 ${emailNotifications ? "translate-x-5" : ""}`} />
            </button>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-border">
            <div>
              <p className="text-sm font-body font-medium text-foreground">RSVP-Erinnerungen</p>
              <p className="text-xs text-muted-foreground font-body">Automatische Erinnerungen an Gäste ohne Antwort</p>
            </div>
            <button onClick={() => setRsvpReminder(!rsvpReminder)} className={`w-12 h-7 rounded-full transition-colors ${rsvpReminder ? "bg-primary" : "bg-border"}`}>
              <div className={`w-5 h-5 rounded-full bg-primary-foreground transition-transform mx-1 ${rsvpReminder ? "translate-x-5" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;
