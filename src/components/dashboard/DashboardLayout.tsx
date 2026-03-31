import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import {
  Users, CheckCircle, Utensils, Hotel, CalendarClock,
  ListChecks, LayoutGrid, PieChart, Settings, Home, X,
} from "lucide-react";

const mobileNavItems = [
  { icon: Home, label: "Übersicht", path: "/demo/dashboard" },
  { icon: Users, label: "Gäste", path: "/demo/dashboard/guests" },
  { icon: CheckCircle, label: "RSVP", path: "/demo/dashboard/rsvp" },
  { icon: Utensils, label: "Essen", path: "/demo/dashboard/meals" },
  { icon: Hotel, label: "Hotels", path: "/demo/dashboard/hotels" },
  { icon: CalendarClock, label: "Zeitplan", path: "/demo/dashboard/timeline" },
  { icon: ListChecks, label: "Aufgaben", path: "/demo/dashboard/tasks" },
  { icon: LayoutGrid, label: "Tische", path: "/demo/dashboard/seating" },
  { icon: PieChart, label: "Budget", path: "/demo/dashboard/budget" },
  { icon: Settings, label: "Settings", path: "/demo/dashboard/settings" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar />

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/20" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-card border-r border-border z-10 flex flex-col">
            <div className="h-16 flex items-center justify-between px-4 border-b border-border">
              <span className="font-heading text-xl font-bold text-gradient-gold">Evoria</span>
              <button onClick={() => setMobileOpen(false)} className="p-1.5"><X size={18} /></button>
            </div>
            <nav className="flex-1 py-4 px-2 space-y-1">
              {mobileNavItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-colors ${
                      active ? "bg-champagne text-foreground font-medium" : "text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    <item.icon size={18} className={active ? "text-primary" : ""} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMobileMenuToggle={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
