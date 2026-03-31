import { Link } from "react-router-dom";
import { Bell, Menu, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onMobileMenuToggle?: () => void;
}

const DashboardHeader = ({ onMobileMenuToggle }: DashboardHeaderProps) => (
  <header className="h-16 flex items-center justify-between px-4 lg:px-6 border-b border-border bg-card">
    <div className="flex items-center gap-3">
      <button onClick={onMobileMenuToggle} className="md:hidden p-2 text-foreground">
        <Menu size={20} />
      </button>
      <div>
        <h1 className="font-heading text-lg font-bold text-foreground">Hochzeit Laura & Markus</h1>
        <p className="text-xs text-muted-foreground font-body">15. August 2026 · Schloss Elmau, Bayern</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <Link to="/demo/guest-portal">
        <Button variant="outline" size="sm" className="font-body hidden sm:flex">
          <ExternalLink size={14} className="mr-1.5" /> Gästeseite
        </Button>
      </Link>
      <button className="relative p-2 rounded-lg hover:bg-secondary text-muted-foreground">
        <Bell size={18} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
      </button>
    </div>
  </header>
);

export default DashboardHeader;
