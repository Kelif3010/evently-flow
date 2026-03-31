import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="bg-secondary border-t border-border py-16">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <span className="font-heading text-2xl font-bold text-gradient-gold">Evoria</span>
          <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed">
            Die All-in-One Plattform für eure Hochzeit. Planung, Gäste & Eventseite – alles an einem Ort.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-foreground mb-4">Produkt</h4>
          <ul className="space-y-2 text-sm text-muted-foreground font-body">
            <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
            <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
            <li><a href="#how-it-works" className="hover:text-foreground transition-colors">So funktioniert's</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Demo ansehen</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-foreground mb-4">Rechtliches</h4>
          <ul className="space-y-2 text-sm text-muted-foreground font-body">
            <li><a href="#" className="hover:text-foreground transition-colors">Datenschutz</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Impressum</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">AGB</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-foreground mb-4">Kontakt</h4>
          <ul className="space-y-2 text-sm text-muted-foreground font-body">
            <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">hello@evoria.app</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground font-body">
          © 2026 Evoria. Alle Rechte vorbehalten.
        </p>
        <p className="text-sm text-muted-foreground font-body flex items-center gap-1">
          Made with <Heart size={14} className="text-accent" /> for couples everywhere
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
