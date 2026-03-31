import { motion } from "framer-motion";
import dashboardImg from "@/assets/dashboard-preview.jpg";
import guestPortalImg from "@/assets/guest-portal-preview.jpg";

const DashboardPreview = () => (
  <section className="py-20 md:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-body font-medium text-primary uppercase tracking-wider"
        >
          Produkt-Vorschau
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-3 font-heading text-3xl md:text-4xl font-bold"
        >
          Zwei Welten, <span className="text-gradient-gold">eine Plattform</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-muted-foreground font-body leading-relaxed"
        >
          Das Admin-Dashboard für das Brautpaar und das elegante Gästeportal – nahtlos verbunden.
        </motion.p>
      </div>

      <div className="space-y-16">
        {/* Admin Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/3">
              <span className="inline-block px-3 py-1 rounded-full bg-gold-light text-sm font-body font-medium text-champagne-foreground mb-3">
                Für das Brautpaar
              </span>
              <h3 className="font-heading text-2xl font-bold text-foreground">Admin-Dashboard</h3>
              <p className="mt-3 text-muted-foreground font-body leading-relaxed">
                Gästeübersicht, RSVP-Status, Essenspräferenzen, Aufgaben-Checkliste, Hotelinfos und mehr – alles auf einen Blick.
              </p>
              <ul className="mt-4 space-y-2 text-sm font-body text-foreground">
                {["Gäste & RSVP-Status", "Essens- & Allergieübersicht", "Aufgaben & Checklisten", "Tischplanung", "Budget & Dienstleister"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-2/3">
              <div className="rounded-xl overflow-hidden border border-border shadow-xl">
                <img src={dashboardImg} alt="Evoria Admin Dashboard" width={1920} height={1080} loading="lazy" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Guest Portal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="flex flex-col lg:flex-row-reverse gap-8 items-center">
            <div className="lg:w-1/3">
              <span className="inline-block px-3 py-1 rounded-full bg-rose-light text-sm font-body font-medium text-accent-foreground mb-3">
                Für die Gäste
              </span>
              <h3 className="font-heading text-2xl font-bold text-foreground">Gästeportal</h3>
              <p className="mt-3 text-muted-foreground font-body leading-relaxed">
                Eure Gäste erhalten eine elegante Eventseite mit allen Infos – ohne App, ohne Aufwand.
              </p>
              <ul className="mt-4 space-y-2 text-sm font-body text-foreground">
                {["RSVP & Begleitperson", "Essenswünsche & Allergien", "Hotelempfehlungen", "Tagesablauf", "FAQ & wichtige Hinweise"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-2/3">
              <div className="rounded-xl overflow-hidden border border-border shadow-xl">
                <img src={guestPortalImg} alt="Evoria Gästeportal" width={1920} height={1080} loading="lazy" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default DashboardPreview;
