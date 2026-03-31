import { motion } from "framer-motion";
import { MessageSquareWarning, Users, Utensils, Hotel, HelpCircle, ArrowRight } from "lucide-react";

const problems = [
  { icon: MessageSquareWarning, text: "Chaotische WhatsApp-Gruppen statt klarer Kommunikation" },
  { icon: Users, text: "Unübersichtliche Zu- und Absagen in verschiedenen Kanälen" },
  { icon: Utensils, text: "Allergien und Essenswünsche gehen unter" },
  { icon: Hotel, text: "Hotel- und Anreiseplanung ist unkoordiniert" },
  { icon: HelpCircle, text: "Ständige Rückfragen von Gästen zu Details" },
];

const ProblemSection = () => (
  <section className="py-20 md:py-28 bg-secondary/50">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Problem */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-body font-medium text-accent uppercase tracking-wider">Das Problem</span>
          <h2 className="mt-3 font-heading text-3xl md:text-4xl font-bold leading-tight">
            Hochzeitsplanung ist wunderbar – aber oft auch wunderbar chaotisch.
          </h2>
          <div className="mt-8 space-y-4">
            {problems.map((p, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-rose-light flex items-center justify-center">
                  <p.icon size={20} className="text-accent" />
                </div>
                <p className="font-body text-foreground pt-1.5">{p.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-background rounded-2xl border border-border p-8 md:p-10 shadow-lg"
        >
          <span className="text-sm font-body font-medium text-primary uppercase tracking-wider">Die Lösung</span>
          <h3 className="mt-3 font-heading text-2xl md:text-3xl font-bold leading-tight">
            Evoria bringt alles <span className="text-gradient-gold">an einen Ort.</span>
          </h3>
          <p className="mt-4 text-muted-foreground font-body leading-relaxed">
            Statt dutzender Tools, Excel-Listen und endloser Nachrichtenverläufe bietet Evoria eine einzige, 
            elegante Plattform – für euch und eure Gäste.
          </p>
          <ul className="mt-6 space-y-3 font-body">
            {[
              "Ein Dashboard für eure komplette Planung",
              "Ein Gästeportal, das Rückfragen eliminiert",
              "RSVP, Allergien, Hotels – alles automatisch erfasst",
              "Echtzeit-Übersicht über alle Rückmeldungen",
              "Elegante Eventseite mit Zugangscode",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-foreground">
                <ArrowRight size={16} className="text-primary flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ProblemSection;
