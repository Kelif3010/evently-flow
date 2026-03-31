import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarClock, MapPin, Heart, Users, Utensils, Hotel,
  Clock, ChevronDown, ChevronUp, Check, ArrowLeft, Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const timelineEvents = [
  { time: "14:00", title: "Empfang", desc: "Sektempfang im Schlossgarten", icon: "🥂" },
  { time: "15:00", title: "Trauung", desc: "Freie Trauung in der Orangerie", icon: "💍" },
  { time: "16:00", title: "Aperitif & Fotos", desc: "Häppchen und Gruppenfotos", icon: "📸" },
  { time: "18:00", title: "Abendessen", desc: "3-Gänge-Menü im Festsaal", icon: "🍽️" },
  { time: "20:00", title: "Eröffnungstanz", desc: "Erster Tanz des Brautpaars", icon: "💃" },
  { time: "20:30", title: "Party & Tanz", desc: "DJ bis Mitternacht", icon: "🎶" },
  { time: "00:00", title: "Mitternachtssnack", desc: "Burger & Pommes", icon: "🍔" },
];

const hotels = [
  { name: "Schlosshotel Elmau", price: "ab €189/Nacht", code: "LAURAMARKUS26", distance: "0 min (am Veranstaltungsort)", link: "#" },
  { name: "Gasthof Alpenblick", price: "ab €95/Nacht", code: "HOCHZEIT2026", distance: "5 min Fahrt", link: "#" },
  { name: "Hotel Bergzeit", price: "ab €120/Nacht", code: "EVORIA26", distance: "10 min Fahrt", link: "#" },
];

const faqs = [
  { q: "Gibt es einen Dresscode?", a: "Wir freuen uns über elegante Garderobe in gedeckten, warmen Farben. Bitte keine reinen weißen Outfits." },
  { q: "Können Kinder mitkommen?", a: "Wir feiern diesen Tag gerne mit euch als Paar. Für Kinderbetreuung können wir euch einen lokalen Service empfehlen." },
  { q: "Gibt es Parkplätze?", a: "Ja, kostenlose Parkplätze stehen direkt am Schloss zur Verfügung." },
  { q: "Bis wann sollte ich mich zurückmelden?", a: "Bitte gebt eure Rückmeldung bis zum 1. Juni 2026." },
  { q: "Kann ich eine Begleitperson mitbringen?", a: "Bitte prüft eure Einladung – dort steht, ob ein Plus-One vorgesehen ist." },
];

const GuestPortalDemo = () => {
  const [rsvpStatus, setRsvpStatus] = useState<"pending" | "accepted" | "declined">("pending");
  const [plusOne, setPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState("");
  const [meal, setMeal] = useState("");
  const [allergies, setAllergies] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground font-body hover:text-foreground">
            <ArrowLeft size={16} /> Zurück zu Evoria
          </Link>
          <span className="font-heading text-lg font-bold text-gradient-gold">Evoria</span>
          <div className="w-20" />
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-16 md:py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-champagne/50 via-background to-background pointer-events-none" />
        <div className="relative container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-rose-light text-sm font-body text-accent-foreground">
              💒 Demo – Gästeportal
            </span>
            <Heart size={32} className="mx-auto text-accent mb-4" />
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground">Laura & Markus</h1>
            <p className="mt-3 text-lg text-muted-foreground font-body">laden euch herzlich ein zu ihrer Hochzeit</p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm font-body text-foreground">
              <span className="flex items-center gap-2"><CalendarClock size={16} className="text-primary" /> 15. August 2026</span>
              <span className="hidden sm:block text-border">|</span>
              <span className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> Schloss Elmau, Bayern</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20 max-w-3xl space-y-12">
        {/* RSVP */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border p-6 md:p-8"
        >
          <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <Users size={22} className="text-primary" /> Rückmeldung
          </h2>
          <p className="mt-2 text-sm text-muted-foreground font-body">Bitte gebt uns bis zum 1. Juni 2026 Bescheid.</p>

          {submitted ? (
            <div className="mt-6 text-center py-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-champagne flex items-center justify-center mb-4">
                <Check size={32} className="text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">Vielen Dank!</h3>
              <p className="mt-2 text-muted-foreground font-body">
                Eure Rückmeldung wurde gespeichert. Wir freuen uns auf euch!
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              {/* RSVP Choice */}
              <div className="flex gap-3">
                <button
                  onClick={() => setRsvpStatus("accepted")}
                  className={`flex-1 py-4 rounded-xl border-2 font-body font-medium transition-all ${
                    rsvpStatus === "accepted"
                      ? "border-primary bg-champagne text-foreground"
                      : "border-border text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  ✅ Ich komme gerne
                </button>
                <button
                  onClick={() => setRsvpStatus("declined")}
                  className={`flex-1 py-4 rounded-xl border-2 font-body font-medium transition-all ${
                    rsvpStatus === "declined"
                      ? "border-accent bg-rose-light text-foreground"
                      : "border-border text-muted-foreground hover:border-accent/30"
                  }`}
                >
                  ❌ Leider nicht
                </button>
              </div>

              {rsvpStatus === "accepted" && (
                <div className="space-y-5">
                  {/* Plus One */}
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={plusOne}
                        onChange={(e) => setPlusOne(e.target.checked)}
                        className="w-5 h-5 rounded border-border accent-primary"
                      />
                      <span className="text-sm font-body text-foreground">Ich bringe eine Begleitperson mit</span>
                    </label>
                    {plusOne && (
                      <input
                        type="text"
                        placeholder="Name der Begleitperson"
                        value={plusOneName}
                        onChange={(e) => setPlusOneName(e.target.value)}
                        className="mt-3 w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    )}
                  </div>

                  {/* Meal */}
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-2">
                      <Utensils size={14} className="inline mr-1.5 text-primary" />
                      Essenswahl
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Standard", "Vegetarisch", "Vegan", "Fisch"].map((m) => (
                        <button
                          key={m}
                          onClick={() => setMeal(m)}
                          className={`py-3 rounded-lg border font-body text-sm transition-all ${
                            meal === m
                              ? "border-primary bg-champagne text-foreground font-medium"
                              : "border-border text-muted-foreground hover:border-primary/30"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Allergies */}
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-2">
                      Allergien oder Unverträglichkeiten
                    </label>
                    <textarea
                      placeholder="z.B. Laktoseintoleranz, Nussallergie..."
                      value={allergies}
                      onChange={(e) => setAllergies(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    />
                  </div>
                </div>
              )}

              <Button
                onClick={handleSubmit}
                disabled={rsvpStatus === "pending"}
                className="w-full font-body bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                Rückmeldung absenden
              </Button>
            </div>
          )}
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border p-6 md:p-8"
        >
          <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <Clock size={22} className="text-primary" /> Tagesablauf
          </h2>
          <div className="mt-6 space-y-0">
            {timelineEvents.map((e, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-champagne flex items-center justify-center text-lg">
                    {e.icon}
                  </div>
                  {i < timelineEvents.length - 1 && (
                    <div className="w-px flex-1 bg-border my-1" />
                  )}
                </div>
                <div className="pb-6">
                  <span className="text-xs font-body font-bold text-primary">{e.time}</span>
                  <h3 className="font-heading font-semibold text-foreground">{e.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Hotels */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border p-6 md:p-8"
        >
          <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <Hotel size={22} className="text-primary" /> Unterkünfte
          </h2>
          <p className="mt-2 text-sm text-muted-foreground font-body">Wir haben Zimmerkontingente für euch reserviert.</p>
          <div className="mt-6 space-y-4">
            {hotels.map((h, i) => (
              <div key={i} className="bg-background rounded-xl border border-border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{h.name}</h3>
                  <p className="text-sm text-muted-foreground font-body">{h.price} · {h.distance}</p>
                  <p className="text-xs text-primary font-body mt-1">Code: <span className="font-semibold">{h.code}</span></p>
                </div>
                <Button variant="outline" size="sm" className="font-body self-start sm:self-center">
                  Zur Buchung
                </Button>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Anreise */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border p-6 md:p-8"
        >
          <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <MapPin size={22} className="text-primary" /> Anreise
          </h2>
          <div className="mt-4 space-y-4 font-body text-sm text-foreground">
            <div className="bg-background rounded-xl border border-border p-4">
              <p className="font-medium">📍 Schloss Elmau</p>
              <p className="text-muted-foreground mt-1">In Elmau 2, 82493 Krün, Bayern</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-background rounded-xl border border-border p-4">
                <p className="font-medium">🚗 Mit dem Auto</p>
                <p className="text-muted-foreground mt-1">A95 Richtung Garmisch, Ausfahrt Klais. Kostenfreie Parkplätze vor Ort.</p>
              </div>
              <div className="bg-background rounded-xl border border-border p-4">
                <p className="font-medium">🚂 Mit dem Zug</p>
                <p className="text-muted-foreground mt-1">Bis Bhf. Klais, dann Shuttle-Service (15 Min). Details folgen per E-Mail.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border p-6 md:p-8"
        >
          <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <Info size={22} className="text-primary" /> Häufige Fragen
          </h2>
          <div className="mt-6 space-y-2">
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
                  <div className="px-5 pb-4 text-sm text-muted-foreground font-body">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <div className="text-center pt-8">
          <Heart size={24} className="mx-auto text-accent/50 mb-3" />
          <p className="font-heading text-lg font-semibold text-foreground">Wir freuen uns auf euch!</p>
          <p className="text-sm text-muted-foreground font-body mt-1">Laura & Markus</p>
          <p className="text-xs text-muted-foreground font-body mt-6">
            Powered by <Link to="/" className="text-primary hover:underline">Evoria</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuestPortalDemo;
