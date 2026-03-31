import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "0 €",
    period: "Kostenlos",
    desc: "Perfekt zum Ausprobieren und für kleine Feiern.",
    features: [
      "Bis zu 30 Gäste",
      "RSVP-Verwaltung",
      "Eventseite mit Zugangscode",
      "Tagesablauf",
      "E-Mail-Support",
    ],
    cta: "Kostenlos starten",
    highlight: false,
  },
  {
    name: "Premium",
    price: "49 €",
    period: "einmalig",
    desc: "Für Paare, die alles aus einer Hand wollen.",
    features: [
      "Unbegrenzte Gäste",
      "Alle Starter-Features",
      "Allergien & Essenswünsche",
      "Hotelübersicht",
      "Aufgaben & Checklisten",
      "Tischplanung",
      "Automatische Erinnerungen",
      "Personalisiertes Design",
      "Prioritäts-Support",
    ],
    cta: "Premium wählen",
    highlight: true,
  },
  {
    name: "Event Pro",
    price: "129 €",
    period: "einmalig",
    desc: "Für Hochzeitsplaner und große Events.",
    features: [
      "Alle Premium-Features",
      "Mehrere Events verwalten",
      "Budget & Dienstleister",
      "Team-Zugänge",
      "Erweiterte Statistiken",
      "API-Zugang",
      "Individuelles Branding",
      "Dedizierter Support",
    ],
    cta: "Pro starten",
    highlight: false,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-20 md:py-28 bg-secondary/50">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-body font-medium text-primary uppercase tracking-wider"
        >
          Pricing
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-3 font-heading text-3xl md:text-4xl font-bold"
        >
          Transparent & fair – für jede Feier
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-muted-foreground font-body"
        >
          Einmalzahlung, kein Abo. Euer Event, euer Preis.
        </motion.p>
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative rounded-2xl p-8 flex flex-col ${
              plan.highlight
                ? "bg-background border-2 border-primary shadow-xl shadow-primary/10 scale-[1.02]"
                : "bg-background border border-border"
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-body font-semibold">
                Beliebteste Wahl
              </span>
            )}
            <h3 className="font-heading text-xl font-bold text-foreground">{plan.name}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-heading text-4xl font-bold text-foreground">{plan.price}</span>
              <span className="text-sm text-muted-foreground font-body">{plan.period}</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground font-body">{plan.desc}</p>
            <ul className="mt-6 space-y-3 flex-1">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm font-body text-foreground">
                  <Check size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              className={`mt-8 w-full font-body ${
                plan.highlight
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {plan.cta}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
