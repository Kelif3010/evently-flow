import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarClock, MapPin, Heart, Utensils, Hotel,
  Clock, ChevronDown, ChevronUp, Info, Users,
  Music, Camera, Gift, Car, Train, Shirt, Sparkles, ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const schedule = [
  { time: "13:00", title: "Ankommen & Einchecken", desc: "Begrüßung und Willkommensdrinks", icon: "🏰", location: "Schloss-Eingang" },
  { time: "14:00", title: "Sektempfang", desc: "Aperitif und erste Gespräche", icon: "🥂", location: "Schlossgarten" },
  { time: "14:30", title: "Trauung", desc: "Freie Trauung in der Orangerie", icon: "💍", location: "Orangerie" },
  { time: "15:30", title: "Gratulation & Fotos", desc: "Empfangslinie und Gruppenfotos", icon: "📸", location: "Schlossgarten" },
  { time: "16:30", title: "Kaffee & Kuchen", desc: "Kuchenbuffet mit Hochzeitstorte", icon: "🎂", location: "Terrasse" },
  { time: "18:00", title: "Abendessen", desc: "3-Gänge-Menü im Festsaal", icon: "🍽️", location: "Festsaal" },
  { time: "20:00", title: "Reden & Überraschungen", desc: "Reden und besondere Momente", icon: "🎤", location: "Festsaal" },
  { time: "20:30", title: "Eröffnungstanz", desc: "Erster Tanz des Brautpaars", icon: "💃", location: "Tanzfläche" },
  { time: "21:00", title: "Party & Tanz", desc: "DJ bis Mitternacht", icon: "🎶", location: "Festsaal" },
  { time: "00:00", title: "Mitternachtssnack", desc: "Burger, Pommes und Snacks", icon: "🍔", location: "Terrasse" },
];

const menuItems = [
  { course: "Vorspeise", dishes: [
    { name: "Burrata mit Tomaten", desc: "Frische Burrata auf Heirloom-Tomaten mit Basilikum-Pesto", tags: ["Vegetarisch"] },
    { name: "Rote-Bete-Carpaccio", desc: "Marinierte Rote Bete mit Ziegenkäse und Walnüssen", tags: ["Vegetarisch", "Glutenfrei"] },
  ]},
  { course: "Hauptgang", dishes: [
    { name: "Rinderfilet", desc: "Rosa gebratenes Filet mit Trüffel-Jus und Kartoffelgratin", tags: ["Standard"] },
    { name: "Wildlachs", desc: "Gebratener Lachs auf Fenchel-Risotto mit Zitrus-Beurre-blanc", tags: ["Fisch"] },
    { name: "Pilz-Wellington", desc: "Kräuterseitling im Blätterteig mit Trüffel-Sauce", tags: ["Vegetarisch"] },
  ]},
  { course: "Dessert", dishes: [
    { name: "Crème Brûlée", desc: "Klassische Vanille-Crème-Brûlée mit frischen Beeren", tags: ["Glutenfrei"] },
    { name: "Schokoladen-Fondant", desc: "Warmer Schokoladenkuchen mit Vanilleeis", tags: ["Vegetarisch"] },
  ]},
];

const seatingInfo = {
  table: "Tisch 1",
  tablemates: ["Sophie Weber", "Max Weber", "Anna Hoffmann", "Paul Hoffmann", "Lena Schulz"],
};

const hotels = [
  { name: "Schlosshotel Elmau", price: "ab €189/Nacht", code: "LAURAMARKUS26", distance: "Am Veranstaltungsort", features: ["Spa & Wellness", "Frühstück inkl.", "Parkplatz"] },
  { name: "Gasthof Alpenblick", price: "ab €95/Nacht", code: "HOCHZEIT2026", distance: "5 Min Fahrt", features: ["Frühstück inkl.", "Parkplatz"] },
  { name: "Hotel Bergzeit", price: "ab €120/Nacht", code: "EVORIA26", distance: "10 Min Fahrt", features: ["Halbpension mögl.", "Pool"] },
];

const faqs = [
  { q: "Gibt es einen Dresscode?", a: "Wir freuen uns über elegante Garderobe in gedeckten, warmen Farben. Bitte keine reinen weißen Outfits." },
  { q: "Können Kinder mitkommen?", a: "Wir feiern diesen Tag gerne mit euch als Paar. Für Kinderbetreuung können wir euch einen lokalen Service empfehlen." },
  { q: "Gibt es Parkplätze?", a: "Ja, kostenlose Parkplätze stehen direkt am Schloss zur Verfügung." },
  { q: "Bis wann sollte ich mich zurückmelden?", a: "Bitte gebt eure Rückmeldung bis zum 1. Juni 2026 über das RSVP-Formular." },
  { q: "Gibt es einen Shuttle-Service?", a: "Ja! Vom Bahnhof Klais fahren Shuttles zur Location (alle 30 Min ab 12:30)." },
  { q: "Darf ich Fotos machen?", a: "Ja! Wir haben auch eine Foto-Box. Für die Trauung bitten wir euch, die Handys in der Tasche zu lassen – unser Fotograf übernimmt." },
  { q: "Gibt es Geschenkwünsche?", a: "Eure Anwesenheit ist das größte Geschenk! Wenn ihr uns etwas schenken möchtet, freuen wir uns über einen Beitrag zu unserer Flitterwochen-Kasse." },
];

const importantNotes = [
  { icon: Shirt, title: "Dresscode", desc: "Elegante Abendgarderobe in warmen, gedeckten Farben. Kein reines Weiß bitte." },
  { icon: Camera, title: "Unplugged Ceremony", desc: "Während der Trauung bitte keine Handyfotos – genießt den Moment. 📵" },
  { icon: Gift, title: "Geschenke", desc: "Statt Geschenken freuen wir uns über einen Beitrag zur Flitterwochen-Kasse." },
  { icon: Music, title: "Musikwünsche", desc: "Eure Wünsche aus dem RSVP-Formular sind auf der DJ-Playlist! 🎵" },
];

const GuestPortalDemo = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("schedule");

  const tabs = [
    { id: "schedule", label: "Tagesablauf", icon: Clock },
    { id: "seating", label: "Dein Tisch", icon: Users },
    { id: "menu", label: "Menü", icon: Utensils },
    { id: "travel", label: "Anreise", icon: MapPin },
    { id: "hotels", label: "Hotels", icon: Hotel },
    { id: "faq", label: "FAQ", icon: Info },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground font-body hover:text-foreground">
            <ArrowLeft size={16} /> Evoria
          </Link>
          <span className="font-heading text-lg font-bold text-gradient-gold">Laura & Markus</span>
          <Link to="/demo/rsvp">
            <Button size="sm" variant="outline" className="font-body text-xs">RSVP ändern</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-12 md:py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-champagne/50 via-background to-background pointer-events-none" />
        <div className="relative container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Heart size={28} className="mx-auto text-accent mb-3" />
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Willkommen, Sophie!</h1>
            <p className="mt-3 text-muted-foreground font-body max-w-lg mx-auto">
              Wir freuen uns, euch bei unserer Hochzeit begrüßen zu dürfen. Hier findet ihr alle wichtigen Informationen.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm font-body text-foreground">
              <span className="flex items-center gap-2"><CalendarClock size={16} className="text-primary" /> 15. August 2026</span>
              <span className="hidden sm:block text-border">|</span>
              <span className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> Schloss Elmau, Bayern</span>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-champagne rounded-full text-sm font-body">
              <Sparkles size={14} className="text-primary" />
              <span className="text-foreground font-medium">Status: Zugesagt</span>
              <span className="text-muted-foreground">· Begleitperson: Max Weber</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Notes */}
      <div className="container mx-auto px-4 max-w-4xl mb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {importantNotes.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border p-4 text-center"
            >
              <note.icon size={20} className="mx-auto text-primary mb-2" />
              <h3 className="text-sm font-heading font-semibold text-foreground">{note.title}</h3>
              <p className="text-xs text-muted-foreground font-body mt-1">{note.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex gap-1 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-body font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20 max-w-4xl">
        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2 mb-6">
              <Clock size={22} className="text-primary" /> Tagesablauf
            </h2>
            <div className="space-y-0">
              {schedule.map((e, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full bg-champagne flex items-center justify-center text-lg flex-shrink-0">
                      {e.icon}
                    </div>
                    {i < schedule.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
                  </div>
                  <div className="pb-5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-body font-bold text-primary">{e.time}</span>
                      <span className="text-xs text-muted-foreground font-body">📍 {e.location}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-foreground">{e.title}</h3>
                    <p className="text-sm text-muted-foreground font-body">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Seating Tab */}
        {activeTab === "seating" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2 mb-6">
              <Users size={22} className="text-primary" /> Dein Tisch
            </h2>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-champagne rounded-2xl">
                <span className="text-3xl">🪑</span>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground font-body">Du sitzt am</p>
                  <p className="font-heading text-2xl font-bold text-foreground">{seatingInfo.table}</p>
                </div>
              </div>
            </div>
            
            {/* Visual table */}
            <div className="relative mx-auto mb-8" style={{ width: 220, height: 220 }}>
              <div className="absolute inset-0 rounded-full border-2 border-border bg-secondary/20 flex items-center justify-center">
                <span className="text-sm font-body text-muted-foreground">{seatingInfo.table}</span>
              </div>
              {[...seatingInfo.tablemates, "Du (Sophie)"].map((name, i, arr) => {
                const angle = (i / arr.length) * 2 * Math.PI - Math.PI / 2;
                const cx = 110 + 92 * Math.cos(angle) - 20;
                const cy = 110 + 92 * Math.sin(angle) - 20;
                const isYou = name.includes("Du");
                return (
                  <div
                    key={i}
                    className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-xs font-heading font-bold ${
                      isYou ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2" : "bg-champagne text-primary border-2 border-primary/20"
                    }`}
                    style={{ left: cx, top: cy }}
                    title={name}
                  >
                    {name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                  </div>
                );
              })}
            </div>
            
            <h3 className="font-heading text-lg font-semibold text-foreground mb-3">Deine Tischpartner</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {seatingInfo.tablemates.map((name, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 bg-secondary/30 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-champagne flex items-center justify-center text-xs font-heading font-bold text-primary">
                    {name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <span className="text-sm font-body text-foreground">{name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Menu Tab */}
        {activeTab === "menu" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2 mb-2">
              <Utensils size={22} className="text-primary" /> Menü
            </h2>
            <p className="text-sm text-muted-foreground font-body mb-6">Deine Wahl: <span className="text-foreground font-medium">Vegetarisch</span></p>
            
            {menuItems.map((course, ci) => (
              <div key={ci} className="mb-8 last:mb-0">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-champagne flex items-center justify-center text-xs text-primary font-bold">{ci + 1}</span>
                  {course.course}
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {course.dishes.map((dish, di) => (
                    <div key={di} className="bg-secondary/30 rounded-xl p-4 hover:bg-secondary/50 transition-colors">
                      <h4 className="font-heading font-semibold text-foreground">{dish.name}</h4>
                      <p className="text-sm text-muted-foreground font-body mt-1">{dish.desc}</p>
                      <div className="flex gap-1.5 mt-2">
                        {dish.tags.map((tag, ti) => (
                          <span key={ti} className="text-xs px-2 py-0.5 rounded-full bg-champagne text-primary font-body">{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Travel Tab */}
        {activeTab === "travel" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2 mb-6">
              <MapPin size={22} className="text-primary" /> Anreise
            </h2>
            <div className="space-y-4">
              <div className="bg-champagne/50 rounded-xl p-5">
                <p className="font-heading font-semibold text-foreground">📍 Schloss Elmau</p>
                <p className="text-sm text-muted-foreground font-body mt-1">In Elmau 2, 82493 Krün, Bayern</p>
                <Button variant="outline" size="sm" className="font-body mt-3">🗺️ In Google Maps öffnen</Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-secondary/30 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Car size={18} className="text-primary" />
                    <h3 className="font-heading font-semibold text-foreground">Mit dem Auto</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground font-body space-y-1.5">
                    <li>• A95 Richtung Garmisch-Partenkirchen</li>
                    <li>• Ausfahrt Klais</li>
                    <li>• Beschilderung „Schloss Elmau" folgen</li>
                    <li>• Kostenfreie Parkplätze vor Ort</li>
                  </ul>
                </div>
                <div className="bg-secondary/30 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Train size={18} className="text-primary" />
                    <h3 className="font-heading font-semibold text-foreground">Mit dem Zug</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground font-body space-y-1.5">
                    <li>• Zielbahnhof: Klais</li>
                    <li>• Shuttle-Service ab 12:30 Uhr</li>
                    <li>• Alle 30 Minuten</li>
                    <li>• Fahrzeit zur Location: ~15 Min</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gold-light/50 rounded-xl p-4">
                <p className="text-sm font-body text-foreground">
                  🚌 <strong>Shuttle-Rückfahrt:</strong> Um 23:00, 00:00 und 01:00 Uhr zurück nach Klais und zu den Hotels.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Hotels Tab */}
        {activeTab === "hotels" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2 mb-2">
              <Hotel size={22} className="text-primary" /> Unterkünfte
            </h2>
            <p className="text-sm text-muted-foreground font-body mb-6">Wir haben Zimmerkontingente für euch reserviert.</p>
            <div className="space-y-4">
              {hotels.map((h, i) => (
                <div key={i} className="bg-secondary/30 rounded-xl p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{h.name}</h3>
                      <p className="text-sm text-muted-foreground font-body">{h.price} · {h.distance}</p>
                      <div className="flex gap-2 mt-2">
                        {h.features.map((f, fi) => (
                          <span key={fi} className="text-xs px-2 py-0.5 rounded-full bg-champagne text-primary font-body">{f}</span>
                        ))}
                      </div>
                      <p className="text-xs text-primary font-body mt-2">Buchungscode: <span className="font-semibold font-mono">{h.code}</span></p>
                    </div>
                    <Button variant="outline" size="sm" className="font-body self-start sm:self-center">Zur Buchung</Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2 mb-6">
              <Info size={22} className="text-primary" /> Häufige Fragen
            </h2>
            <div className="space-y-2">
              {faqs.map((f, i) => (
                <div key={i} className="border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left font-body font-medium text-foreground hover:bg-secondary/50 transition-colors"
                  >
                    <span className="text-sm">{f.q}</span>
                    {openFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openFaq === i && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pb-4 text-sm text-muted-foreground font-body">
                      {f.a}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <div className="text-center pt-12">
          <Heart size={24} className="mx-auto text-accent/50 mb-3" />
          <p className="font-heading text-lg font-semibold text-foreground">Wir freuen uns auf euch!</p>
          <p className="text-sm text-muted-foreground font-body mt-1">Laura & Markus · 15. August 2026</p>
          <p className="text-xs text-muted-foreground font-body mt-6">
            Powered by <Link to="/" className="text-primary hover:underline">Evoria</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuestPortalDemo;
