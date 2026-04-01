import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, ArrowLeft, ArrowRight, Check, User, Users, Utensils,
  MapPin, Music, Sparkles, Plane, MessageCircle, Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { id: 1, label: "Teilnahme", icon: Heart },
  { id: 2, label: "Persönliches", icon: User },
  { id: 3, label: "Essen", icon: Utensils },
  { id: 4, label: "Anreise", icon: MapPin },
  { id: 5, label: "Mitwirkung", icon: Sparkles },
  { id: 6, label: "Spaß & Kreatives", icon: Music },
];

const RSVPPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form data
  const [attendance, setAttendance] = useState<"yes" | "no" | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestAge, setGuestAge] = useState("");
  const [hasPlusOne, setHasPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState("");
  const [mealGuest, setMealGuest] = useState("");
  const [mealPlusOne, setMealPlusOne] = useState("");
  const [allergies, setAllergies] = useState("");
  const [travelMethod, setTravelMethod] = useState("");
  const [hotelNeeded, setHotelNeeded] = useState(false);
  const [shuttleNeeded, setShuttleNeeded] = useState(false);
  const [participation, setParticipation] = useState(false);
  const [participationType, setParticipationType] = useState("");
  const [participationSecret, setParticipationSecret] = useState(false);
  const [participationDuration, setParticipationDuration] = useState("");
  const [participationTiming, setParticipationTiming] = useState("");
  const [participationTech, setParticipationTech] = useState("");
  const [musicWish, setMusicWish] = useState("");
  const [honeymoonTip, setHoneymoonTip] = useState("");
  const [message, setMessage] = useState("");
  const [photoPermission, setPhotoPermission] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const next = () => {
    if (attendance === "no" && currentStep === 1) {
      setSubmitted(true);
      return;
    }
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
    else {
      setSubmitted(true);
      setTimeout(() => navigate("/demo/guest-portal"), 3000);
    }
  };
  const prev = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  const inputCls = "w-full px-4 py-3 rounded-xl border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";
  const selectCls = inputCls;

  const ChoiceButton = ({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`flex-1 py-4 px-4 rounded-xl border-2 font-body font-medium transition-all ${
        selected ? "border-primary bg-champagne text-foreground" : "border-border text-muted-foreground hover:border-primary/30"
      }`}
    >
      {children}
    </button>
  );

  const ToggleSwitch = ({ checked, onChange, label, description }: { checked: boolean; onChange: (v: boolean) => void; label: string; description?: string }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-body font-medium text-foreground">{label}</p>
        {description && <p className="text-xs text-muted-foreground font-body">{description}</p>}
      </div>
      <button onClick={() => onChange(!checked)} className={`w-12 h-7 rounded-full transition-colors ${checked ? "bg-primary" : "bg-border"}`}>
        <div className={`w-5 h-5 rounded-full bg-primary-foreground transition-transform mx-1 ${checked ? "translate-x-5" : ""}`} />
      </button>
    </div>
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-champagne flex items-center justify-center mb-6">
            <Check size={40} className="text-primary" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground">
            {attendance === "no" ? "Schade, dass du nicht dabei sein kannst!" : "Vielen Dank!"}
          </h1>
          <p className="mt-3 text-muted-foreground font-body">
            {attendance === "no"
              ? "Wir werden dich vermissen. Danke für deine Rückmeldung."
              : "Deine Rückmeldung wurde gespeichert. Du wirst jetzt zum Gästeportal weitergeleitet..."}
          </p>
          {attendance === "yes" && (
            <div className="mt-6">
              <div className="w-8 h-8 mx-auto border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <Link to="/demo/guest-portal" className="mt-4 inline-block text-sm text-primary font-body hover:underline">
                Direkt zum Gästeportal →
              </Link>
            </div>
          )}
          {attendance === "no" && (
            <Link to="/" className="mt-6 inline-block text-sm text-primary font-body hover:underline">
              Zurück zur Startseite
            </Link>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground font-body hover:text-foreground">
            <ArrowLeft size={16} /> Evoria
          </Link>
          <span className="font-heading text-lg font-bold text-gradient-gold">Laura & Markus</span>
          <div className="w-20" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  currentStep >= step.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  {currentStep > step.id ? <Check size={16} /> : <step.icon size={16} />}
                </div>
                {i < steps.length - 1 && (
                  <div className={`hidden sm:block w-8 lg:w-16 h-0.5 mx-1 ${currentStep > step.id ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-sm font-body text-muted-foreground text-center">
            Schritt {currentStep} von {steps.length}: <span className="text-foreground font-medium">{steps[currentStep - 1].label}</span>
          </p>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card rounded-2xl border border-border p-6 md:p-8"
          >
            {/* Step 1: Attendance */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Heart size={32} className="mx-auto text-accent mb-3" />
                  <h2 className="font-heading text-2xl font-bold text-foreground">Könnt ihr dabei sein?</h2>
                  <p className="mt-2 text-muted-foreground font-body">Wir freuen uns auf eure Rückmeldung bis zum 1. Juni 2026</p>
                </div>
                <div className="flex gap-3">
                  <ChoiceButton selected={attendance === "yes"} onClick={() => setAttendance("yes")}>
                    ✅ Ja, ich komme gerne!
                  </ChoiceButton>
                  <ChoiceButton selected={attendance === "no"} onClick={() => setAttendance("no")}>
                    😔 Leider nicht
                  </ChoiceButton>
                </div>
              </div>
            )}

            {/* Step 2: Personal */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
                  <User size={22} className="text-primary" /> Persönliche Angaben
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">Dein Name *</label>
                    <input value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="Vor- und Nachname" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">Alter</label>
                    <input type="number" value={guestAge} onChange={e => setGuestAge(e.target.value)} placeholder="z.B. 28" className={inputCls} />
                  </div>
                </div>
                <ToggleSwitch checked={hasPlusOne} onChange={setHasPlusOne} label="Ich bringe eine Begleitperson mit" description="Plus-One zur Hochzeit" />
                {hasPlusOne && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">Name der Begleitperson</label>
                    <input value={plusOneName} onChange={e => setPlusOneName(e.target.value)} placeholder="Vor- und Nachname" className={inputCls} />
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 3: Food */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
                  <Utensils size={22} className="text-primary" /> Essenspräferenzen
                </h2>
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-2">Deine Menüwahl *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Standard", "Vegetarisch", "Vegan", "Fisch"].map(m => (
                      <ChoiceButton key={m} selected={mealGuest === m} onClick={() => setMealGuest(m)}>{m}</ChoiceButton>
                    ))}
                  </div>
                </div>
                {hasPlusOne && (
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-2">Menüwahl Begleitperson</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Standard", "Vegetarisch", "Vegan", "Fisch"].map(m => (
                        <ChoiceButton key={m} selected={mealPlusOne === m} onClick={() => setMealPlusOne(m)}>{m}</ChoiceButton>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-1.5">Allergien & Unverträglichkeiten</label>
                  <textarea value={allergies} onChange={e => setAllergies(e.target.value)} placeholder="z.B. Laktose, Nüsse, Gluten..." rows={3} className={`${inputCls} resize-none`} />
                </div>
              </div>
            )}

            {/* Step 4: Travel */}
            {currentStep === 4 && (
              <div className="space-y-5">
                <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
                  <MapPin size={22} className="text-primary" /> Anreise & Unterkunft
                </h2>
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-2">Wie reist du an?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { label: "🚗 Auto", value: "Auto" },
                      { label: "🚂 Zug", value: "Zug" },
                      { label: "✈️ Flugzeug", value: "Flugzeug" },
                      { label: "🚗 Fahrgemeinschaft", value: "Fahrgemeinschaft" },
                      { label: "🚌 Bus", value: "Bus" },
                      { label: "📍 Sonstiges", value: "Sonstiges" },
                    ].map(t => (
                      <ChoiceButton key={t.value} selected={travelMethod === t.value} onClick={() => setTravelMethod(t.value)}>
                        {t.label}
                      </ChoiceButton>
                    ))}
                  </div>
                </div>
                <ToggleSwitch checked={hotelNeeded} onChange={setHotelNeeded} label="Ich benötige eine Übernachtung" description="Wir haben Hotel-Kontingente reserviert" />
                <ToggleSwitch checked={shuttleNeeded} onChange={setShuttleNeeded} label="Shuttle-Service gewünscht" description="Transfer vom Bahnhof/Hotel zur Location" />
              </div>
            )}

            {/* Step 5: Participation */}
            {currentStep === 5 && (
              <div className="space-y-5">
                <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles size={22} className="text-primary" /> Mitwirkung
                </h2>
                <p className="text-sm text-muted-foreground font-body">Möchtest du etwas zur Hochzeit beitragen? Eine Rede, ein Spiel, eine Überraschung?</p>
                <ToggleSwitch checked={participation} onChange={setParticipation} label="Ja, ich möchte mitwirken!" />
                {participation && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 bg-secondary/30 rounded-xl p-4">
                    <div>
                      <label className="block text-sm font-body font-medium text-foreground mb-1.5">Was hast du geplant?</label>
                      <input value={participationType} onChange={e => setParticipationType(e.target.value)} placeholder="z.B. Rede, Spiel, Song, Überraschung..." className={inputCls} />
                    </div>
                    <ToggleSwitch checked={participationSecret} onChange={setParticipationSecret} label="🤫 Soll es eine Überraschung bleiben?" description="Wird dem Brautpaar nicht angezeigt" />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-body font-medium text-foreground mb-1.5">Zeitbedarf (Minuten)</label>
                        <input type="number" value={participationDuration} onChange={e => setParticipationDuration(e.target.value)} placeholder="z.B. 5" className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-sm font-body font-medium text-foreground mb-1.5">Gewünschter Zeitpunkt</label>
                        <select value={participationTiming} onChange={e => setParticipationTiming(e.target.value)} className={selectCls}>
                          <option value="">Bitte wählen</option>
                          <option>Empfang</option>
                          <option>Nach der Trauung</option>
                          <option>Beim Abendessen</option>
                          <option>Abends / Party</option>
                          <option>Egal – überrascht uns!</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-body font-medium text-foreground mb-1.5">Benötigte Technik</label>
                      <input value={participationTech} onChange={e => setParticipationTech(e.target.value)} placeholder="z.B. Beamer, Mikrofon, Lautsprecher..." className={inputCls} />
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 6: Fun */}
            {currentStep === 6 && (
              <div className="space-y-5">
                <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
                  <Music size={22} className="text-primary" /> Spaß & Kreatives
                </h2>
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-1.5">🎵 Musikwünsche</label>
                  <input value={musicWish} onChange={e => setMusicWish(e.target.value)} placeholder="Welcher Song muss unbedingt gespielt werden?" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-1.5">✈️ Flitterwochen-Tipp</label>
                  <input value={honeymoonTip} onChange={e => setHoneymoonTip(e.target.value)} placeholder="Wo sollte das Brautpaar die Flitterwochen verbringen?" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-1.5">💌 Nachricht ans Brautpaar</label>
                  <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Persönliche Worte, Wünsche, Erinnerungen..." rows={4} className={`${inputCls} resize-none`} />
                </div>
                <ToggleSwitch checked={photoPermission} onChange={setPhotoPermission} label="📸 Fotoerlaubnis" description="Meine Fotos dürfen in der Hochzeitsgalerie erscheinen" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={prev} disabled={currentStep === 1} className="font-body">
            <ArrowLeft size={14} className="mr-1.5" /> Zurück
          </Button>
          <Button
            onClick={next}
            disabled={currentStep === 1 && attendance === null}
            className="font-body"
          >
            {currentStep === steps.length ? "Absenden" : attendance === "no" && currentStep === 1 ? "Absenden" : "Weiter"}
            {currentStep < steps.length && attendance !== "no" && <ArrowRight size={14} className="ml-1.5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RSVPPage;
