import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface DashboardHeaderProps {
  onMobileMenuToggle?: () => void;
}

const DashboardHeader = ({ onMobileMenuToggle }: DashboardHeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-14 flex items-center justify-between px-4 lg:px-6 border-b border-border bg-card flex-shrink-0">
      <button onClick={onMobileMenuToggle} className="md:hidden p-2 text-foreground">
        <Menu size={20} />
      </button>
      <div className="flex-1" />
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        title={theme === "dark" ? "Light Mode" : "Dark Mode"}
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
};

export default DashboardHeader;
