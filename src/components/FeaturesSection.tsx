import { motion } from "framer-motion";
import {
  Users, CheckCircle, UserPlus, Utensils, Hotel, CalendarClock,
  ListChecks, LayoutGrid, FileText, KeyRound, Bell, PieChart,
} from "lucide-react";

const features = [
  { icon: Users, title: "Gästeverwaltung", desc: "Alle Gäste an einem Ort – mit Status, Kontaktdaten und Gruppenzugehörigkeit." },
  { icon: CheckCircle, title: "RSVP / Zu- & Absagen", desc: "Gäste melden sich bequem online an – ihr seht den Status in Echtzeit." },
  { icon: UserPlus, title: "Plus-One Verwaltung", desc: "Begleitpersonen werden automatisch mit erfasst und verwaltet." },
  { icon: Utensils, title: "Allergien & Essenswünsche", desc: "Gäste geben ihre Präferenzen direkt an – keine manuellen Rückfragen mehr." },
  { icon: Hotel, title: "Hotel & Unterkünfte", desc: "Hotelempfehlungen und Kontingente direkt auf der Gästeseite anzeigen." },
  { icon: CalendarClock, title: "Event-Zeitplan", desc: "Tagesablauf übersichtlich darstellen – für euch und eure Gäste." },
  { icon: ListChecks, title: "Aufgaben & Checklisten", desc: "Vergesst nichts – plant jede Aufgabe mit Deadline und Verantwortlichen." },
  { icon: LayoutGrid, title: "Tischplanung", desc: "Sitzordnung visuell planen und verwalten – per Drag & Drop." },
  { icon: FileText, title: "Info-Bereich für Gäste", desc: "Dokumente, Hinweise und wichtige Details zentral bereitstellen." },
  { icon: KeyRound, title: "Eventseite mit Zugangscode", desc: "Individuelle, geschützte Eventseite für eure Gäste." },
  { icon: Bell, title: "Automatische Erinnerungen", desc: "Sanfte Erinnerungen an ausstehende RSVPs – ohne dass ihr nachhaken müsst." },
  { icon: PieChart, title: "Budget & Dienstleister", desc: "Optional: Behaltet Kosten und Anbieter im Überblick." },
];

const FeaturesSection = () => (
  <section id="features" className="py-20 md:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-body font-medium text-primary uppercase tracking-wider"
        >
          Features
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-3 font-heading text-3xl md:text-4xl font-bold"
        >
          Alles, was ihr für den perfekten Tag braucht
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-muted-foreground font-body leading-relaxed"
        >
          Von der ersten Einladung bis zur Sitzordnung – Evoria deckt jeden Schritt ab.
        </motion.p>
      </div>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-lg bg-champagne flex items-center justify-center mb-4 group-hover:bg-gold-light transition-colors">
              <f.icon size={22} className="text-primary" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
