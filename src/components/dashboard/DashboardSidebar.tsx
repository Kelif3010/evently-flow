import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Users, CheckCircle, Utensils, Hotel, CalendarClock,
  ListChecks, LayoutGrid, PieChart, Settings, Home,
  ChevronLeft, Menu, Bell, LogOut, Camera, Send, Music,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Übersicht", path: "/demo/dashboard" },
  { icon: Users, label: "Gäste", path: "/demo/dashboard/guests" },
  { icon: Send, label: "Einladungen", path: "/demo/dashboard/invitations" },
  { icon: CheckCircle, label: "RSVP", path: "/demo/dashboard/rsvp" },
  { icon: Utensils, label: "Essen & Allergien", path: "/demo/dashboard/meals" },
  { icon: LayoutGrid, label: "Tischplanung", path: "/demo/dashboard/seating" },
  { icon: CalendarClock, label: "Zeitplan", path: "/demo/dashboard/timeline" },
  { icon: Camera, label: "Fotogalerie", path: "/demo/dashboard/photos" },
  { icon: Music, label: "Musik", path: "/demo/dashboard/music" },
  { icon: ListChecks, label: "Aufgaben", path: "/demo/dashboard/tasks" },
  { icon: PieChart, label: "Budget", path: "/demo/dashboard/budget" },
  { icon: Settings, label: "Einstellungen", path: "/demo/dashboard/settings" },
];

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`hidden md:flex flex-col bg-card border-r border-border transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <Link to="/" className="font-heading text-xl font-bold text-gradient-gold">
            Evoria
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground"
        >
          {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-colors ${
                active
                  ? "bg-champagne text-foreground font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={18} className={active ? "text-primary" : ""} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-border">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-champagne flex items-center justify-center text-sm font-heading font-bold text-primary">
            L&M
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-medium text-foreground truncate">Laura & Markus</p>
              <p className="text-xs text-muted-foreground font-body">Premium Plan</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
