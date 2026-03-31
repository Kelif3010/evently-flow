import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Laura & Markus",
    role: "Hochzeit in München, Juli 2025",
    text: "Evoria hat uns so viel Stress erspart! Unsere Gäste konnten alles online erledigen – Rückmeldungen, Essenswünsche, Hotelinfos. Wir hatten endlich den Kopf frei für die schönen Dinge.",
  },
  {
    name: "Sophia & Jonas",
    role: "Hochzeit am Bodensee, September 2025",
    text: "Das Dashboard ist unfassbar übersichtlich. Wir hatten jederzeit den Überblick über alle Zusagen und konnten die Sitzordnung im Tool planen. Absolute Empfehlung!",
  },
  {
    name: "Anna & David",
    role: "Hochzeit in Wien, Mai 2025",
    text: "Unsere Gäste waren begeistert von der Eventseite. Alles sah so professionell aus – und wir mussten keine einzige WhatsApp-Nachricht mehr zur Organisation schreiben.",
  },
];

const TestimonialsSection = () => (
  <section className="py-20 md:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-body font-medium text-primary uppercase tracking-wider"
        >
          Erfahrungen
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-3 font-heading text-3xl md:text-4xl font-bold"
        >
          Paare lieben Evoria
        </motion.h2>
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-card rounded-2xl border border-border p-8"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={16} className="fill-gold text-gold" />
              ))}
            </div>
            <p className="text-foreground font-body leading-relaxed italic">"{t.text}"</p>
            <div className="mt-6 pt-4 border-t border-border">
              <p className="font-heading font-semibold text-foreground">{t.name}</p>
              <p className="text-sm text-muted-foreground font-body">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
