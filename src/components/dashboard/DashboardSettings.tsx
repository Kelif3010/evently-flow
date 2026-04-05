import { useState } from "react";
import { Settings, Save, Globe, Palette, Bell, Calendar, Moon, Sun, Type, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

const accentColors = [
  { label: "Gold", value: "#C08B3F" },
  { label: "Rose", value: "#C97B8B" },
  { label: "Salbei", value: "#7B9E87" },
  { label: "Lavendel", value: "#8B7BC0" },
  { label: "Blau", value: "#5B8EC0" },
  { label: "Koralle", value: "#C07B5B" },
];

const fontPairs = [
  { label: "Playfair + DM Sans", heading: "'Playfair Display', serif", body: "'DM Sans', sans-serif" },
  { label: "Cormorant + Lato", heading: "'Cormorant Garamond', serif", body: "'Lato', sans-serif" },
  { label: "Montserrat + Open Sans", heading: "'Montserrat', sans-serif", body: "'Open Sans', sans-serif" },
];

const DashboardSettings = () => {
  const { theme, toggleTheme } = useTheme();
  const [eventName, setEventName] = useState("Hochzeit Laura & Markus");
  const [eventDate, setEventDate] = useState("2026-08-15");
  const [eventLocation, setEventLocation] = useState("Schloss Elmau, Bayern");
  const [rsvpDeadline, setRsvpDeadline] = useState("2026-06-01");
  const [accessCode, setAccessCode] = useState("LAURAMARKUS26");
  const [portalPublic, setPortalPublic] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [rsvpReminder, setRsvpReminder] = useState(true);
  const [guestbookNotify, setGuestbookNotify] = useState(true);
  const [photoNotify, setPhotoNotify] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#C08B3F");
  const [selectedFont, setSelectedFont] = useState(0);
  const [greetingText, setGreetingText] = useState("Wir freuen uns, euch bei unserer Hochzeit begrüßen zu dürfen!");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={`w-12 h-7 rounded-full transition-colors ${checked ? "bg-primary" : "bg-border"}`}>
      <div className={`w-5 h-5 rounded-full bg-primary-foreground transition-transform mx-1 ${checked ? "translate-x-5" : ""}`} />
    </button>
  );

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
      <div className="bg-card rounded-xl border border-border p-6 space-y-5 hover:shadow-lg transition-all duration-300">
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

      {/* Design & Theme */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-5 hover:shadow-lg transition-all duration-300">
        <h3 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
          <Palette size={18} className="text-primary" /> Design & Theme
        </h3>

        {/* Dark Mode */}
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center gap-3">
            {theme === "dark" ? <Moon size={18} className="text-primary" /> : <Sun size={18} className="text-primary" />}
            <div>
              <p className="text-sm font-body font-medium text-foreground">Dark Mode</p>
              <p className="text-xs text-muted-foreground font-body">Dunkles Farbschema aktivieren</p>
            </div>
          </div>
          <Toggle checked={theme === "dark"} onChange={toggleTheme} />
        </div>

        {/* Accent Color */}
        <div>
          <label className="block text-sm font-body font-medium text-foreground mb-3">Akzentfarbe</label>
          <div className="flex flex-wrap gap-3">
            {accentColors.map(c => (
              <button
                key={c.value}
                onClick={() => setPrimaryColor(c.value)}
                className={`w-12 h-12 rounded-xl transition-all duration-300 hover:scale-110 ${primaryColor === c.value ? "ring-2 ring-offset-2 ring-primary scale-110" : ""}`}
                style={{ backgroundColor: c.value }}
                title={c.label}
              />
            ))}
            <div className="flex items-center gap-2">
              <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-12 h-12 rounded-xl border border-border cursor-pointer" />
              <input value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-24 px-3 py-2 rounded-lg border border-border bg-background text-xs font-body font-mono focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
        </div>

        {/* Font Selection */}
        <div>
          <label className="block text-sm font-body font-medium text-foreground mb-3 flex items-center gap-2">
            <Type size={16} className="text-primary" /> Schriftart
          </label>
          <div className="grid gap-3">
            {fontPairs.map((f, i) => (
              <button
                key={i}
                onClick={() => setSelectedFont(i)}
                className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                  selectedFont === i ? "border-primary bg-champagne/30 shadow-md" : "border-border hover:border-primary/30"
                }`}
              >
                <p className="text-base font-medium text-foreground" style={{ fontFamily: f.heading }}>{f.label}</p>
                <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: f.body }}>
                  Vorschau: Willkommen zu unserer Hochzeit
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-xl border border-border p-6 bg-background">
          <div className="flex items-center gap-2 mb-3">
            <Eye size={16} className="text-primary" />
            <span className="text-sm font-body font-medium text-foreground">Vorschau</span>
          </div>
          <div className="rounded-lg p-6 text-center" style={{ borderLeft: `4px solid ${primaryColor}` }}>
            <h4 className="font-heading text-xl font-bold text-foreground" style={{ fontFamily: fontPairs[selectedFont].heading }}>
              {eventName}
            </h4>
            <p className="text-sm text-muted-foreground mt-2" style={{ fontFamily: fontPairs[selectedFont].body }}>
              {greetingText}
            </p>
            <div className="mt-4 inline-block px-6 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: primaryColor, color: "white" }}>
              RSVP Bestätigen
            </div>
          </div>
        </div>
      </div>

      {/* Portal Settings */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-5 hover:shadow-lg transition-all duration-300">
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
            <Toggle checked={portalPublic} onChange={() => setPortalPublic(!portalPublic)} />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4 hover:shadow-lg transition-all duration-300">
        <h3 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
          <Bell size={18} className="text-primary" /> Benachrichtigungen
        </h3>
        <div className="space-y-0 divide-y divide-border">
          {[
            { label: "E-Mail bei neuer Rückmeldung", desc: "Benachrichtigung bei jeder RSVP-Antwort", checked: emailNotifications, toggle: () => setEmailNotifications(!emailNotifications) },
            { label: "RSVP-Erinnerungen", desc: "Automatische Erinnerungen an Gäste ohne Antwort", checked: rsvpReminder, toggle: () => setRsvpReminder(!rsvpReminder) },
            { label: "Gästebuch-Einträge", desc: "Benachrichtigung bei neuen Gästebuch-Nachrichten", checked: guestbookNotify, toggle: () => setGuestbookNotify(!guestbookNotify) },
            { label: "Foto-Uploads", desc: "Benachrichtigung wenn Gäste Fotos hochladen", checked: photoNotify, toggle: () => setPhotoNotify(!photoNotify) },
          ].map((n, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-body font-medium text-foreground">{n.label}</p>
                <p className="text-xs text-muted-foreground font-body">{n.desc}</p>
              </div>
              <Toggle checked={n.checked} onChange={n.toggle} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;
