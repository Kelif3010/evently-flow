import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCTA = () => (
  <section className="py-20 md:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto text-center bg-gradient-to-br from-champagne via-background to-rose-light rounded-3xl border border-border p-12 md:p-16 overflow-hidden"
      >
        <Heart size={48} className="mx-auto text-accent/40 mb-6" />
        <h2 className="font-heading text-3xl md:text-5xl font-bold leading-tight">
          Plant eure Hochzeit <br />
          <span className="text-gradient-gold">entspannt an einem Ort.</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground font-body max-w-xl mx-auto leading-relaxed">
          Tausende Paare organisieren bereits mit Evoria. Startet jetzt kostenlos und erlebt, 
          wie einfach Hochzeitsplanung sein kann.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="font-body text-base px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
            Jetzt kostenlos starten <ArrowRight size={18} className="ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="font-body text-base px-8 border-border hover:bg-secondary">
            Demo ansehen
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground font-body">
          Kostenlos · Keine Kreditkarte · DSGVO-konform
        </p>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
