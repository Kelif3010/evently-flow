import { useState } from "react";
import { Settings, Save, Globe, Palette, Bell, Calendar, Moon, Sun, Type, Eye, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useTheme, fontPairs } from "@/hooks/useTheme";

const accentColors = [
  { label: "Gold", value: "#C08B3F" },
  { label: "Rose", value: "#C97B8B" },
  { label: "Salbei", value: "#7B9E87" },
  { label: "Lavendel", value: "#8B7BC0" },
  { label: "Blau", value: "#5B8EC0" },
  { label: "Koralle", value: "#C07B5B" },
];

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button onClick={onChange} className={`w-12 h-7 rounded-full transition-colors ${checked ? "bg-primary" : "bg-border"}`}>
    <div className={`w-5 h-5 rounded-full bg-primary-foreground transition-transform mx-1 ${checked ? "translate-x-5" : ""}`} />
  </button>
);

const DashboardSettings = () => {
  const { theme, toggleTheme, primaryColor, setPrimaryColor, fontPairIndex, setFontPair, borderRadius, setBorderRadius, resetToDefaults } = useTheme();

  const [eventName, setEventName] = useState("Hochzeit Laura & Markus");
  const [eventDate, setEventDate] = useState("2026-08-15");
  const [eventLocation, setEventLocation] = useState("Schloss Elmau, Bayern");
  const [rsvpDeadline, setRsvpDeadline] = useState("2026-06-01");
  const [accessCode, setAccessCode] = useState("LAURAMARKUS26");
  const [portalPublic, setPortalPublic] = useState(true);
  const [greetingText, setGreetingText] = useState("Wir freuen uns, euch bei unserer Hochzeit begrüßen zu dürfen!");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [rsvpReminder, setRsvpReminder] = useState(true);
  const [guestbookNotify, setGuestbookNotify] = useState(true);
  const [photoNotify, setPhotoNotify] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground";

  return (
    <div className="space-y-6 max-w-4xl">
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

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="general" className="flex items-center gap-1.5 text-xs sm:text-sm">
            <Calendar size={15} /> Allgemein
          </TabsTrigger>
          <TabsTrigger value="theme" className="flex items-center gap-1.5 text-xs sm:text-sm">
            <Palette size={15} /> Theme Studio
          </TabsTrigger>
          <TabsTrigger value="portal" className="flex items-center gap-1.5 text-xs sm:text-sm">
            <Globe size={15} /> Gästeportal
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1.5 text-xs sm:text-sm">
            <Bell size={15} /> Benachrichtigungen
          </TabsTrigger>
        </TabsList>

        {/* Allgemein */}
        <TabsContent value="general">
          <div className="bg-card rounded-xl border border-border p-6 space-y-5">
            <h3 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
              <Calendar size={18} className="text-primary" /> Event-Details
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Event-Name</label>
                <input value={eventName} onChange={e => setEventName(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Datum</label>
                <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Veranstaltungsort</label>
                <input value={eventLocation} onChange={e => setEventLocation(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">RSVP-Frist</label>
                <input type="date" value={rsvpDeadline} onChange={e => setRsvpDeadline(e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Theme Studio */}
        <TabsContent value="theme">
          <div className="space-y-6">
            {/* Dark Mode */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {theme === "dark" ? <Moon size={18} className="text-primary" /> : <Sun size={18} className="text-primary" />}
                  <div>
                    <p className="text-sm font-body font-medium text-foreground">Dark Mode</p>
                    <p className="text-xs text-muted-foreground font-body">Dunkles Farbschema aktivieren</p>
                  </div>
                </div>
                <Toggle checked={theme === "dark"} onChange={toggleTheme} />
              </div>
            </div>

            {/* Accent Color */}
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <label className="block text-sm font-body font-medium text-foreground">Akzentfarbe</label>
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
                  <input value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-24 px-3 py-2 rounded-lg border border-border bg-background text-xs font-body font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
            </div>

            {/* Font Selection */}
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <label className="block text-sm font-body font-medium text-foreground flex items-center gap-2">
                <Type size={16} className="text-primary" /> Schriftart
              </label>
              <div className="grid gap-3">
                {fontPairs.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => setFontPair(i)}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                      fontPairIndex === i ? "border-primary bg-primary/10 shadow-md" : "border-border hover:border-primary/30"
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

            {/* Border Radius */}
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <label className="block text-sm font-body font-medium text-foreground">Eckenradius</label>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border-2 border-primary bg-primary/10" style={{ borderRadius: `${borderRadius}rem` }} />
                <Slider
                  value={[borderRadius]}
                  onValueChange={([v]) => setBorderRadius(v)}
                  min={0}
                  max={1.5}
                  step={0.05}
                  className="flex-1"
                />
                <span className="text-xs font-mono text-muted-foreground w-16 text-right">{borderRadius.toFixed(2)}rem</span>
              </div>
            </div>

            {/* Live Preview */}
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-primary" />
                <span className="text-sm font-body font-medium text-foreground">Live-Vorschau</span>
              </div>
              <div className="rounded-lg border border-border p-6 bg-background">
                <div className="text-center space-y-3" style={{ borderLeft: `4px solid ${primaryColor}`, paddingLeft: "1.5rem", textAlign: "left" }}>
                  <h4 className="font-heading text-xl font-bold text-foreground">{eventName}</h4>
                  <p className="text-sm text-muted-foreground font-body">{greetingText}</p>
                  <div className="inline-block px-6 py-2 text-sm font-medium text-primary-foreground" style={{ backgroundColor: primaryColor, borderRadius: `${borderRadius}rem` }}>
                    RSVP Bestätigen
                  </div>
                </div>
              </div>
            </div>

            {/* Reset */}
            <div className="flex justify-end">
              <Button variant="outline" onClick={resetToDefaults} className="font-body text-sm">
                <RotateCcw size={14} className="mr-1.5" /> Auf Standard zurücksetzen
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Gästeportal */}
        <TabsContent value="portal">
          <div className="bg-card rounded-xl border border-border p-6 space-y-5">
            <h3 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
              <Globe size={18} className="text-primary" /> Gästeportal
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Zugangscode</label>
                <input value={accessCode} onChange={e => setAccessCode(e.target.value)} className={`${inputClass} font-mono`} />
                <p className="text-xs text-muted-foreground font-body mt-1">Gäste benötigen diesen Code, um auf das Portal zuzugreifen</p>
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Begrüßungstext</label>
                <textarea value={greetingText} onChange={e => setGreetingText(e.target.value)} rows={3} className={`${inputClass} resize-none`} />
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
        </TabsContent>

        {/* Benachrichtigungen */}
        <TabsContent value="notifications">
          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardSettings;
