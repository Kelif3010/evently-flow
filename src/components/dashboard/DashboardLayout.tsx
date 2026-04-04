import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import {
  Users, CheckCircle, Utensils, CalendarClock,
  ListChecks, LayoutGrid, PieChart, Settings, Home, X, Send, Camera, Music, Gift, BookOpen, Globe, Monitor,
} from "lucide-react";

const mobileNavItems = [
  { icon: Home, label: "Übersicht", path: "/demo/dashboard" },
  { icon: Users, label: "Gäste", path: "/demo/dashboard/guests" },
  { icon: Send, label: "Einladungen", path: "/demo/dashboard/invitations" },
  { icon: CheckCircle, label: "RSVP", path: "/demo/dashboard/rsvp" },
  { icon: Monitor, label: "Gästeseite", path: "/demo/dashboard/guest-portal-config" },
  { icon: Utensils, label: "Essen", path: "/demo/dashboard/meals" },
  { icon: LayoutGrid, label: "Tische", path: "/demo/dashboard/seating" },
  { icon: CalendarClock, label: "Zeitplan", path: "/demo/dashboard/timeline" },
  { icon: Camera, label: "Fotos", path: "/demo/dashboard/photos" },
  { icon: Music, label: "Musik", path: "/demo/dashboard/music" },
  { icon: Gift, label: "Wunschliste", path: "/demo/dashboard/wishlist" },
  { icon: BookOpen, label: "Gästebuch", path: "/demo/dashboard/guestbook" },
  { icon: Globe, label: "Flitterwochen", path: "/demo/dashboard/honeymoon" },
  { icon: ListChecks, label: "Aufgaben", path: "/demo/dashboard/tasks" },
  { icon: PieChart, label: "Budget", path: "/demo/dashboard/budget" },
  { icon: Settings, label: "Einstellungen", path: "/demo/dashboard/settings" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      <DashboardSidebar />

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/20" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-card border-r border-border z-10 flex flex-col">
            <div className="h-14 flex items-center justify-between px-4 border-b border-border">
              <span className="font-heading text-xl font-bold text-gradient-gold">Evoria</span>
              <button onClick={() => setMobileOpen(false)} className="p-1.5"><X size={18} /></button>
            </div>
            <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
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

      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Minimal mobile header */}
        <div className="md:hidden h-14 flex items-center px-4 border-b border-border bg-card flex-shrink-0">
          <button onClick={() => setMobileOpen(true)} className="p-2 text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
