import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import dashboardImg from "@/assets/dashboard-preview.jpg";

const HeroSection = () => (
  <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
    {/* Subtle background gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-champagne/40 via-background to-background pointer-events-none" />

    <div className="container mx-auto px-4 lg:px-8 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gold-light text-sm font-body font-medium text-champagne-foreground">
            ✨ Die Zukunft der Hochzeitsplanung
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
        >
          Eure Hochzeit.{" "}
          <span className="text-gradient-gold">Ein Ort.</span>{" "}
          Kein Stress.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed"
        >
          Evoria vereint Planung, Gästeverwaltung und Eventseite in einer eleganten Plattform – damit ihr euren großen Tag genießen könnt, statt ihn zu organisieren.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="font-body text-base px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
            Kostenlos starten <ArrowRight size={18} className="ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="font-body text-base px-8 border-border hover:bg-secondary">
            <Play size={18} className="mr-2" /> Demo ansehen
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 text-sm text-muted-foreground font-body"
        >
          Keine Kreditkarte nötig · In 2 Minuten startklar
        </motion.p>
      </div>

      {/* Dashboard preview */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 max-w-5xl mx-auto"
      >
        <div className="rounded-xl overflow-hidden shadow-2xl shadow-primary/10 border border-border">
          <img
            src={dashboardImg}
            alt="Evoria Dashboard – Hochzeitsplanung auf einen Blick"
            width={1920}
            height={1080}
            className="w-full h-auto"
          />
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
