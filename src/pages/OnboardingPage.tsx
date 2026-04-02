import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, ArrowRight, ArrowLeft, Check, Users, MapPin,
  CalendarClock, Palette, Sparkles, Globe, Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const onboardingSteps = [
  { id: 1, label: "Willkommen", icon: Heart },
  { id: 2, label: "Eure Namen", icon: Users },
  { id: 3, label: "Details", icon: CalendarClock },
  { id: 4, label: "Stil", icon: Palette },
  { id: 5, label: "Features", icon: Sparkles },
];

const styleOptions = [
  { id: "elegant", label: "Elegant & Klassisch", emoji: "🏛️", desc: "Schloss, Gold, Champagner" },
  { id: "rustic", label: "Rustikal & Natürlich", emoji: "🌿", desc: "Scheune, Holz, Grün" },
  { id: "modern", label: "Modern & Minimalistisch", emoji: "✨", desc: "Clean, Monochrom, Schlicht" },
  { id: "boho", label: "Boho & Romantisch", emoji: "🌸", desc: "Freiluft, Blumen, Pastelltöne" },
  { id: "beach", label: "Beach & Destination", emoji: "🏖️", desc: "Strand, Blau, Entspannt" },
  { id: "vintage", label: "Vintage & Retro", emoji: "📷", desc: "Antik, Spitze, Nostalgie" },
];

const featureOptions = [
  { id: "rsvp", label: "RSVP & Zu-/Absagen", emoji: "✅", default: true },
  { id: "meals", label: "Essenswünsche & Allergien", emoji: "🍽️", default: true },
  { id: "seating", label: "Tischplanung", emoji: "🪑", default: true },
  { id: "timeline", label: "Tagesablauf", emoji: "⏰", default: true },
  { id: "hotels", label: "Hotel-Empfehlungen", emoji: "🏨", default: false },
  { id: "wishlist", label: "Wunschliste / Geschenke", emoji: "🎁", default: false },
  { id: "photos", label: "Fotogalerie", emoji: "📸", default: false },
  { id: "music", label: "Musikwünsche der Gäste", emoji: "🎵", default: false },
  { id: "shuttle", label: "Shuttle-Service", emoji: "🚌", default: false },
  { id: "dresscode", label: "Dresscode-Hinweis", emoji: "👗", default: false },
  { id: "countdown", label: "Countdown-Timer", emoji: "⏳", default: false },
  { id: "guestbook", label: "Digitales Gästebuch", emoji: "💌", default: false },
];

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [partnerA, setPartnerA] = useState("");
  const [partnerB, setPartnerB] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [venue, setVenue] = useState("");
  const [venueCity, setVenueCity] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [style, setStyle] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    featureOptions.filter(f => f.default).map(f => f.id)
  );
  const [eventUrl, setEventUrl] = useState("");

  const inputCls = "w-full px-4 py-3 rounded-xl border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const next = () => {
    if (step < onboardingSteps.length) setStep(step + 1);
    else navigate("/demo/dashboard");
  };
  const prev = () => { if (step > 1) setStep(step - 1); };

  const canProceed = () => {
    if (step === 2) return partnerA.trim() && partnerB.trim();
    return true;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {onboardingSteps.map((s) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                step >= s.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}>
                {step > s.id ? <Check size={16} /> : <s.icon size={16} />}
              </div>
              {s.id < onboardingSteps.length && (
                <div className={`hidden sm:block w-8 h-0.5 ${step > s.id ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="bg-card rounded-2xl border border-border p-8 md:p-10"
          >
            {/* Step 1: Welcome */}
            {step === 1 && (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-champagne flex items-center justify-center">
                  <Heart size={36} className="text-primary" />
                </div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  Willkommen bei Evoria! 💍
                </h1>
                <p className="text-muted-foreground font-body max-w-md mx-auto text-lg">
                  In wenigen Schritten richten wir euer persönliches Hochzeitsportal ein. 
                  Alles kann später jederzeit angepasst werden.
                </p>
                <div className="grid sm:grid-cols-3 gap-3 pt-4">
                  {[
                    { emoji: "📋", title: "Planen", desc: "Gäste, Budget, Aufgaben" },
                    { emoji: "💌", title: "Einladen", desc: "RSVP & Gästeportal" },
                    { emoji: "🎉", title: "Feiern", desc: "Entspannt genießen" },
                  ].map((item, i) => (
                    <div key={i} className="bg-secondary/30 rounded-xl p-4 text-center">
                      <span className="text-2xl">{item.emoji}</span>
                      <p className="font-heading font-semibold text-foreground mt-2">{item.title}</p>
                      <p className="text-xs text-muted-foreground font-body">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Names */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Users size={28} className="mx-auto text-primary mb-3" />
                  <h2 className="font-heading text-2xl font-bold text-foreground">Wie heißt ihr?</h2>
                  <p className="text-muted-foreground font-body mt-1">Eure Namen erscheinen auf dem Gästeportal und den Einladungen.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">Person 1 *</label>
                    <input value={partnerA} onChange={e => setPartnerA(e.target.value)} placeholder="z.B. Laura" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">Person 2 *</label>
                    <input value={partnerB} onChange={e => setPartnerB(e.target.value)} placeholder="z.B. Markus" className={inputCls} />
                  </div>
                </div>
                {partnerA && partnerB && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
                    <p className="font-heading text-xl text-foreground">
                      {partnerA} <Heart size={18} className="inline text-accent mx-1" /> {partnerB}
                    </p>
                    <div className="mt-3">
                      <label className="block text-sm font-body font-medium text-foreground mb-1.5">Eure Event-URL (optional)</label>
                      <div className="flex items-center gap-0 max-w-sm mx-auto">
                        <span className="px-3 py-3 bg-secondary rounded-l-xl border border-r-0 border-border text-sm font-body text-muted-foreground">evoria.de/</span>
                        <input 
                          value={eventUrl || `${partnerA.toLowerCase()}-${partnerB.toLowerCase()}`} 
                          onChange={e => setEventUrl(e.target.value)} 
                          className={`${inputCls} rounded-l-none`} 
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 3: Details */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <CalendarClock size={28} className="mx-auto text-primary mb-3" />
                  <h2 className="font-heading text-2xl font-bold text-foreground">Wann und wo feiert ihr?</h2>
                  <p className="text-muted-foreground font-body mt-1">Alles optional – ihr könnt das jederzeit ergänzen.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">Datum</label>
                    <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">Geschätzte Gästezahl</label>
                    <input type="number" value={guestCount} onChange={e => setGuestCount(e.target.value)} placeholder="z.B. 80" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                    <MapPin size={14} className="inline mr-1" /> Veranstaltungsort
                  </label>
                  <input value={venue} onChange={e => setVenue(e.target.value)} placeholder="z.B. Schloss Elmau" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                    <Globe size={14} className="inline mr-1" /> Stadt / Region
                  </label>
                  <input value={venueCity} onChange={e => setVenueCity(e.target.value)} placeholder="z.B. Garmisch-Partenkirchen, Bayern" className={inputCls} />
                </div>
              </div>
            )}

            {/* Step 4: Style */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Palette size={28} className="mx-auto text-primary mb-3" />
                  <h2 className="font-heading text-2xl font-bold text-foreground">Welcher Stil passt zu euch?</h2>
                  <p className="text-muted-foreground font-body mt-1">Wir passen das Design eures Gästeportals an.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {styleOptions.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setStyle(s.id)}
                      className={`text-left p-4 rounded-xl border-2 transition-all ${
                        style === s.id 
                          ? "border-primary bg-champagne" 
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <span className="text-2xl">{s.emoji}</span>
                      <p className="font-heading font-semibold text-foreground mt-2">{s.label}</p>
                      <p className="text-xs text-muted-foreground font-body">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Features */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Sparkles size={28} className="mx-auto text-primary mb-3" />
                  <h2 className="font-heading text-2xl font-bold text-foreground">Was braucht ihr?</h2>
                  <p className="text-muted-foreground font-body mt-1">Wählt die Module für eure Hochzeit. Alles kann später geändert werden.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {featureOptions.map(f => (
                    <button
                      key={f.id}
                      onClick={() => toggleFeature(f.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                        selectedFeatures.includes(f.id)
                          ? "border-primary bg-champagne"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <span className="text-xl">{f.emoji}</span>
                      <span className="text-sm font-body font-medium text-foreground">{f.label}</span>
                      {selectedFeatures.includes(f.id) && (
                        <Check size={16} className="ml-auto text-primary" />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-center text-muted-foreground font-body">
                  {selectedFeatures.length} Module ausgewählt
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <Button variant="outline" onClick={prev} className="font-body">
              <ArrowLeft size={14} className="mr-1.5" /> Zurück
            </Button>
          ) : <div />}
          <Button onClick={next} disabled={!canProceed()} className="font-body">
            {step === onboardingSteps.length ? (
              <>Zum Dashboard <Sparkles size={14} className="ml-1.5" /></>
            ) : (
              <>Weiter <ArrowRight size={14} className="ml-1.5" /></>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
