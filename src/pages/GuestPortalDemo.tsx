import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarClock, MapPin, Heart, Utensils, Hotel,
  Clock, ChevronDown, ChevronUp, Info, Users,
  Music, Camera, Gift, Car, Train, Shirt, Sparkles, ArrowLeft,
  ExternalLink, ShoppingCart, MessageCircle,
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

const wishlistItems = [
  { id: 1, name: "KitchenAid Artisan Küchenmaschine", price: "€599", image: "🍳", url: "#", reserved: false, category: "Küche" },
  { id: 2, name: "Dyson V15 Akkusauger", price: "€649", image: "🧹", url: "#", reserved: true, reservedBy: "Anna H.", category: "Haushalt" },
  { id: 3, name: "Samsonite Koffer-Set (2-teilig)", price: "€349", image: "🧳", url: "#", reserved: false, category: "Flitterwochen" },
  { id: 4, name: "Nespresso Vertuo Kaffeemaschine", price: "€199", image: "☕", url: "#", reserved: false, category: "Küche" },
  { id: 5, name: "Le Creuset Bräter 26cm", price: "€299", image: "🍲", url: "#", reserved: true, reservedBy: "Paul H.", category: "Küche" },
  { id: 6, name: "Flitterwochen-Beitrag", price: "ab €50", image: "✈️", url: "#", reserved: false, category: "Flitterwochen" },
  { id: 7, name: "Bang & Olufsen Beoplay A9", price: "€2.799", image: "🔊", url: "#", reserved: false, category: "Wohnen" },
  { id: 8, name: "Rimowa Cabin Trolley", price: "€590", image: "💼", url: "#", reserved: false, category: "Flitterwochen" },
];

const guestbookEntries = [
  { name: "Anna & Paul", message: "Wir freuen uns so für euch! Das wird der schönste Tag! ❤️", date: "12. März 2026" },
  { name: "Lena S.", message: "Ihr seid das tollste Paar – ich kann es kaum erwarten! 🥳", date: "8. März 2026" },
  { name: "Thomas M.", message: "Endlich! Herzlichen Glückwunsch euch beiden! 🍾", date: "1. März 2026" },
];

const faqs = [
  { q: "Gibt es einen Dresscode?", a: "Wir freuen uns über elegante Garderobe in gedeckten, warmen Farben. Bitte keine reinen weißen Outfits." },
  { q: "Können Kinder mitkommen?", a: "Wir feiern diesen Tag gerne mit euch als Paar. Für Kinderbetreuung können wir euch einen lokalen Service empfehlen." },
  { q: "Gibt es Parkplätze?", a: "Ja, kostenlose Parkplätze stehen direkt am Schloss zur Verfügung." },
  { q: "Bis wann sollte ich mich zurückmelden?", a: "Bitte gebt eure Rückmeldung bis zum 1. Juni 2026 über das RSVP-Formular." },
  { q: "Gibt es einen Shuttle-Service?", a: "Ja! Vom Bahnhof Klais fahren Shuttles zur Location (alle 30 Min ab 12:30)." },
  { q: "Darf ich Fotos machen?", a: "Ja! Wir haben auch eine Foto-Box. Für die Trauung bitten wir euch, die Handys in der Tasche zu lassen – unser Fotograf übernimmt." },
  { q: "Gibt es Geschenkwünsche?", a: "Schaut euch unsere Wunschliste an! Ihr findet sie im Tab 'Wunschliste' oben." },
];

const importantNotes = [
  { icon: Shirt, title: "Dresscode", desc: "Elegante Abendgarderobe in warmen, gedeckten Farben. Kein reines Weiß bitte." },
  { icon: Camera, title: "Unplugged Ceremony", desc: "Während der Trauung bitte keine Handyfotos – genießt den Moment. 📵" },
  { icon: Gift, title: "Wunschliste", desc: "Schaut euch unsere Wunschliste an – oder schenkt Flitterwochen-Guthaben." },
  { icon: Music, title: "Musikwünsche", desc: "Eure Wünsche aus dem RSVP-Formular sind auf der DJ-Playlist! 🎵" },
];

const GuestPortalDemo = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("schedule");
  const [reservedItems, setReservedItems] = useState<number[]>(
    wishlistItems.filter(i => i.reserved).map(i => i.id)
  );
  const [guestbookMsg, setGuestbookMsg] = useState("");
  const [localEntries, setLocalEntries] = useState(guestbookEntries);
  const [wishlistFilter, setWishlistFilter] = useState("Alle");

  const [photoUploadName, setPhotoUploadName] = useState("");
  const [guestSongTitle, setGuestSongTitle] = useState("");
  const [guestSongArtist, setGuestSongArtist] = useState("");
  const [guestSongs, setGuestSongs] = useState([
    { title: "Perfect", artist: "Ed Sheeran", addedBy: "Brautpaar", likes: 15 },
    { title: "Uptown Funk", artist: "Bruno Mars", addedBy: "Thomas M.", likes: 11 },
    { title: "Can't Help Falling in Love", artist: "Elvis Presley", addedBy: "Sophie W.", likes: 8 },
    { title: "Don't Stop Me Now", artist: "Queen", addedBy: "Anna H.", likes: 7 },
    { title: "I Gotta Feeling", artist: "Black Eyed Peas", addedBy: "Lena S.", likes: 6 },
  ]);
  const [guestPhotos, setGuestPhotos] = useState([
    { emoji: "📸", uploadedBy: "Thomas M.", likes: 8 },
    { emoji: "💐", uploadedBy: "Anna H.", likes: 12 },
    { emoji: "🥂", uploadedBy: "Lena S.", likes: 5 },
    { emoji: "💍", uploadedBy: "Felix B.", likes: 24 },
    { emoji: "🎂", uploadedBy: "Emma W.", likes: 15 },
    { emoji: "💃", uploadedBy: "Nico K.", likes: 7 },
  ]);

  const tabs = [
    { id: "schedule", label: "Tagesablauf", icon: Clock },
    { id: "seating", label: "Dein Tisch", icon: Users },
    { id: "menu", label: "Menü", icon: Utensils },
    { id: "photos", label: "Fotos", icon: Camera },
    { id: "music", label: "Musik", icon: Music },
    { id: "wishlist", label: "Wunschliste", icon: Gift },
    { id: "travel", label: "Anreise", icon: MapPin },
    { id: "hotels", label: "Hotels", icon: Hotel },
    { id: "guestbook", label: "Gästebuch", icon: MessageCircle },
    { id: "faq", label: "FAQ", icon: Info },
  ];

  // Countdown
  const weddingDate = new Date("2026-08-15T14:00:00");
  const now = new Date();
  const diffMs = weddingDate.getTime() - now.getTime();
  const daysLeft = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  const handleReserve = (id: number) => {
    setReservedItems(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const handleGuestbookSubmit = () => {
    if (!guestbookMsg.trim()) return;
    setLocalEntries([
      { name: "Sophie W.", message: guestbookMsg, date: "Gerade eben" },
      ...localEntries,
    ]);
    setGuestbookMsg("");
  };

  const wishlistCategories = ["Alle", ...Array.from(new Set(wishlistItems.map(i => i.category)))];
  const filteredWishlist = wishlistFilter === "Alle" ? wishlistItems : wishlistItems.filter(i => i.category === wishlistFilter);

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

      {/* Hero with Countdown */}
      <section className="relative py-12 md:py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-champagne/50 via-background to-background pointer-events-none" />
        <div className="relative container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Heart size={28} className="mx-auto text-accent mb-3" />
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Willkommen, Sophie!</h1>
            <p className="mt-3 text-muted-foreground font-body max-w-lg mx-auto">
              Wir freuen uns, euch bei unserer Hochzeit begrüßen zu dürfen.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm font-body text-foreground">
              <span className="flex items-center gap-2"><CalendarClock size={16} className="text-primary" /> 15. August 2026</span>
              <span className="hidden sm:block text-border">|</span>
              <span className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> Schloss Elmau, Bayern</span>
            </div>

            {/* Countdown */}
            <div className="mt-6 inline-flex items-center gap-4 px-6 py-4 bg-card rounded-2xl border border-border shadow-sm">
              {[
                { val: daysLeft, label: "Tage" },
                { val: Math.floor((diffMs / (1000 * 60 * 60)) % 24), label: "Std" },
                { val: Math.floor((diffMs / (1000 * 60)) % 60), label: "Min" },
              ].map((u, i) => (
                <div key={i} className="text-center">
                  <span className="font-heading text-2xl md:text-3xl font-bold text-primary">{u.val}</span>
                  <p className="text-xs text-muted-foreground font-body">{u.label}</p>
                </div>
              ))}
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
                    <div className="w-11 h-11 rounded-full bg-champagne flex items-center justify-center text-lg flex-shrink-0">{e.icon}</div>
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
                  <div key={i} className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-xs font-heading font-bold ${
                    isYou ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2" : "bg-champagne text-primary border-2 border-primary/20"
                  }`} style={{ left: cx, top: cy }} title={name}>
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

        {/* Wishlist Tab */}
        {activeTab === "wishlist" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2 mb-2">
              <Gift size={22} className="text-primary" /> Wunschliste
            </h2>
            <p className="text-sm text-muted-foreground font-body mb-6">
              Wir freuen uns über eure Anwesenheit! Falls ihr uns etwas schenken möchtet, haben wir eine kleine Liste zusammengestellt.
            </p>

            {/* Category filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
              {wishlistCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setWishlistFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-body font-medium whitespace-nowrap transition-all ${
                    wishlistFilter === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {filteredWishlist.map(item => {
                const isReserved = reservedItems.includes(item.id);
                return (
                  <div key={item.id} className={`rounded-xl border p-4 transition-all ${
                    isReserved ? "border-primary/30 bg-champagne/30" : "border-border hover:border-primary/20"
                  }`}>
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{item.image}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading font-semibold text-foreground text-sm">{item.name}</h4>
                        <p className="text-sm font-body text-primary font-medium mt-0.5">{item.price}</p>
                        <span className="text-xs text-muted-foreground font-body">{item.category}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      {isReserved ? (
                        <span className="text-xs font-body text-primary bg-champagne px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                          <Sparkles size={12} /> Reserviert {item.reserved && item.reservedBy ? `von ${item.reservedBy}` : "von dir"}
                        </span>
                      ) : (
                        <>
                          <Button size="sm" variant="outline" className="font-body text-xs flex-1" onClick={() => handleReserve(item.id)}>
                            <ShoppingCart size={12} className="mr-1" /> Reservieren
                          </Button>
                          <Button size="sm" variant="outline" className="font-body text-xs">
                            <ExternalLink size={12} />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 bg-champagne/50 rounded-xl p-4 text-center">
              <p className="text-sm font-body text-foreground">
                💰 <strong>Flitterwochen-Kasse:</strong> Ihr könnt auch einen beliebigen Betrag zu unserer Reise beitragen.
              </p>
              <Button variant="outline" size="sm" className="font-body mt-3">✈️ Zur Flitterwochen-Kasse</Button>
            </div>
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
              <div className="bg-secondary/30 rounded-xl p-4">
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

        {/* Guestbook Tab */}
        {activeTab === "guestbook" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2 mb-6">
              <MessageCircle size={22} className="text-primary" /> Digitales Gästebuch
            </h2>
            
            {/* Write entry */}
            <div className="bg-champagne/30 rounded-xl p-5 mb-6">
              <label className="block text-sm font-body font-medium text-foreground mb-2">Schreib uns etwas 💌</label>
              <textarea
                value={guestbookMsg}
                onChange={e => setGuestbookMsg(e.target.value)}
                placeholder="Glückwünsche, Erinnerungen, lustige Geschichten..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
              <Button size="sm" className="font-body mt-3" onClick={handleGuestbookSubmit} disabled={!guestbookMsg.trim()}>
                <Heart size={14} className="mr-1.5" /> Eintrag absenden
              </Button>
            </div>

            {/* Entries */}
            <div className="space-y-3">
              {localEntries.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={i === 0 ? { opacity: 0, y: -10 } : {}}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-secondary/30 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-champagne flex items-center justify-center text-xs font-heading font-bold text-primary">
                      {entry.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-body font-medium text-foreground">{entry.name}</p>
                      <p className="text-xs text-muted-foreground font-body">{entry.date}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground font-body">{entry.message}</p>
                </motion.div>
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
