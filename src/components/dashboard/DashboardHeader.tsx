import { Menu } from "lucide-react";

interface DashboardHeaderProps {
  onMobileMenuToggle?: () => void;
}

const DashboardHeader = ({ onMobileMenuToggle }: DashboardHeaderProps) => (
  <header className="h-14 flex items-center px-4 lg:px-6 border-b border-border bg-card flex-shrink-0">
    <button onClick={onMobileMenuToggle} className="md:hidden p-2 text-foreground">
      <Menu size={20} />
    </button>
  </header>
);

export default DashboardHeader;
