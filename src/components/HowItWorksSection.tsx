import { motion } from "framer-motion";
import { CalendarPlus, Send, ClipboardList, PartyPopper } from "lucide-react";

const steps = [
  { icon: CalendarPlus, step: "01", title: "Event anlegen", desc: "Erstellt euer Event in wenigen Minuten – mit allen Details und eurem persönlichen Design." },
  { icon: Send, step: "02", title: "Gäste einladen", desc: "Ladet eure Gäste per Link oder Code ein – ganz ohne App-Download." },
  { icon: ClipboardList, step: "03", title: "Rückmeldungen sammeln", desc: "RSVPs, Allergien, Hotelwünsche und mehr – alles läuft automatisch zusammen." },
  { icon: PartyPopper, step: "04", title: "Entspannt feiern", desc: "Am großen Tag habt ihr alles im Griff – und könnt einfach genießen." },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-20 md:py-28 bg-champagne/30">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-body font-medium text-primary uppercase tracking-wider"
        >
          So funktioniert's
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-3 font-heading text-3xl md:text-4xl font-bold"
        >
          In 4 Schritten zur stressfreien Hochzeit
        </motion.h2>
      </div>

      <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-background border border-border flex items-center justify-center shadow-md">
              <s.icon size={28} className="text-primary" />
            </div>
            <span className="mt-4 block text-sm font-body font-bold text-primary">{s.step}</span>
            <h3 className="mt-1 font-heading text-xl font-semibold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
