import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Können Gäste ohne App teilnehmen?",
    a: "Ja! Eure Gäste brauchen keine App herunterladen. Sie erhalten einfach einen Link zur Eventseite und können alles bequem im Browser erledigen – auf dem Handy, Tablet oder Computer.",
  },
  {
    q: "Ist die Eventseite personalisierbar?",
    a: "Absolut. Ihr könnt Farben, Texte, Bilder und den gesamten Aufbau eurer Eventseite individuell gestalten. So passt sie perfekt zu eurem Stil und eurer Hochzeit.",
  },
  {
    q: "Kann ich Essenswünsche und Allergien abfragen?",
    a: "Ja, Gäste können bei der RSVP-Rückmeldung direkt ihre Essenspräferenzen und Allergien angeben. Ihr seht alle Angaben gesammelt in eurem Dashboard.",
  },
  {
    q: "Können Hotels oder Unterkünfte eingebunden werden?",
    a: "Ja, ihr könnt Hotelempfehlungen mit Links, Kontingent-Codes und Anreiseinfos direkt auf der Gästeseite hinterlegen.",
  },
  {
    q: "Kann ich auch andere Events damit planen?",
    a: "Evoria ist für Hochzeiten optimiert, eignet sich aber genauso gut für Geburtstage, Jubiläen, Firmenevents und andere private Feiern.",
  },
  {
    q: "Wie sicher sind unsere Daten?",
    a: "Datenschutz hat für uns höchste Priorität. Alle Daten werden DSGVO-konform in Europa gespeichert und verschlüsselt übertragen.",
  },
  {
    q: "Gibt es ein Abo oder versteckte Kosten?",
    a: "Nein. Evoria basiert auf einer einmaligen Zahlung – kein Abo, keine versteckten Kosten. Der Starter-Plan ist sogar komplett kostenlos.",
  },
];

const FAQSection = () => (
  <section id="faq" className="py-20 md:py-28 bg-champagne/30">
    <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
      <div className="text-center mb-14">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-body font-medium text-primary uppercase tracking-wider"
        >
          FAQ
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-3 font-heading text-3xl md:text-4xl font-bold"
        >
          Häufig gestellte Fragen
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-background border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="font-heading font-semibold text-left text-foreground hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-body leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQSection;
