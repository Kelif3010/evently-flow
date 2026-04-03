import { useState } from "react";
import { Send, QrCode, Link2, Copy, Check, Mail, MessageCircle, Key, Users, Search, Eye, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface GuestInvite {
  id: number;
  name: string;
  email: string;
  group: string;
  code: string;
  link: string;
  status: "Gesendet" | "Geöffnet" | "RSVP ausgefüllt" | "Nicht gesendet";
  method: "email" | "whatsapp" | "manual" | "";
}

const initialInvites: GuestInvite[] = [
  { id: 1, name: "Sophie Weber", email: "sophie@email.de", group: "Familie Braut", code: "SWEB-2026", link: "https://evoria.app/rsvp/SWEB-2026", status: "RSVP ausgefüllt", method: "email" },
  { id: 2, name: "Thomas Müller", email: "thomas@email.de", group: "Freunde", code: "TMUE-2026", link: "https://evoria.app/rsvp/TMUE-2026", status: "Geöffnet", method: "whatsapp" },
  { id: 3, name: "Maria Schmidt", email: "maria@email.de", group: "Familie Bräutigam", code: "MSCH-2026", link: "https://evoria.app/rsvp/MSCH-2026", status: "Gesendet", method: "email" },
  { id: 4, name: "Felix Braun", email: "felix@email.de", group: "Freunde", code: "FBRA-2026", link: "https://evoria.app/rsvp/FBRA-2026", status: "Nicht gesendet", method: "" },
  { id: 5, name: "Anna Hoffmann", email: "anna@email.de", group: "Familie Braut", code: "AHOF-2026", link: "https://evoria.app/rsvp/AHOF-2026", status: "RSVP ausgefüllt", method: "email" },
  { id: 6, name: "Lukas Fischer", email: "lukas@email.de", group: "Kollegen", code: "LFIS-2026", link: "https://evoria.app/rsvp/LFIS-2026", status: "Nicht gesendet", method: "" },
  { id: 7, name: "Emma Wagner", email: "emma@email.de", group: "Freunde", code: "EWAG-2026", link: "https://evoria.app/rsvp/EWAG-2026", status: "Gesendet", method: "whatsapp" },
  { id: 8, name: "Lena Schulz", email: "lena@email.de", group: "Familie Bräutigam", code: "LSCH-2026", link: "https://evoria.app/rsvp/LSCH-2026", status: "Geöffnet", method: "email" },
];

const emailTemplates = [
  { id: "elegant", name: "Elegant", preview: "Liebe/r [Name],\n\nwir laden euch herzlich zu unserer Hochzeit ein...", emoji: "💌" },
  { id: "modern", name: "Modern", preview: "Hey [Name]!\n\nWir heiraten! 🎉 Save the date...", emoji: "✨" },
  { id: "classic", name: "Klassisch", preview: "Sehr geehrte/r [Name],\n\nwir geben uns die Ehre, Sie zur Hochzeit...", emoji: "🕊️" },
];

const DashboardInvitations = () => {
  const [invites, setInvites] = useState<GuestInvite[]>(initialInvites);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Alle");
  const [showQR, setShowQR] = useState<GuestInvite | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState("elegant");
  const [showTemplates, setShowTemplates] = useState(false);
  const [showSendModal, setShowSendModal] = useState<{ guest: GuestInvite; method: string } | null>(null);

  const statuses = ["Alle", "Nicht gesendet", "Gesendet", "Geöffnet", "RSVP ausgefüllt"];
  const filtered = invites.filter(g => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Alle" || g.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: invites.length,
    sent: invites.filter(i => i.status !== "Nicht gesendet").length,
    opened: invites.filter(i => i.status === "Geöffnet" || i.status === "RSVP ausgefüllt").length,
    rsvp: invites.filter(i => i.status === "RSVP ausgefüllt").length,
  };

  const copyLink = (invite: GuestInvite) => {
    navigator.clipboard.writeText(invite.link);
    setCopiedId(invite.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const sendInvite = (id: number, method: string) => {
    setInvites(invites.map(i => i.id === id ? { ...i, status: "Gesendet" as const, method: method as any } : i));
    setShowSendModal(null);
  };

  const regenerateCode = (id: number) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const newCode = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("") + "-2026";
    setInvites(invites.map(i => i.id === id ? { ...i, code: newCode, link: `https://evoria.app/rsvp/${newCode}` } : i));
  };

  const statusBadge = (status: string) => {
    const cls = status === "RSVP ausgefüllt" ? "bg-champagne text-primary" :
      status === "Geöffnet" ? "bg-blue-100 text-blue-700" :
      status === "Gesendet" ? "bg-gold-light text-champagne-foreground" :
      "bg-secondary text-muted-foreground";
    return <span className={`text-xs font-body font-medium px-2.5 py-1 rounded-full ${cls}`}>{status}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <Send size={24} className="text-primary" /> Einladungen
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">
            QR-Codes, personalisierte Links & Versand verwalten
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="font-body" onClick={() => setShowTemplates(!showTemplates)}>
            <Mail size={14} className="mr-1.5" /> Vorlagen
          </Button>
          <Button size="sm" className="font-body">
            <Send size={14} className="mr-1.5" /> Alle einladen
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Gäste gesamt", value: stats.total, icon: Users },
          { label: "Einladungen versendet", value: stats.sent, icon: Send },
          { label: "Geöffnet", value: stats.opened, icon: Eye },
          { label: "RSVP ausgefüllt", value: stats.rsvp, icon: Check },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-1">
              <s.icon size={16} className="text-primary" />
              <span className="text-xs text-muted-foreground font-body">{s.label}</span>
            </div>
            <span className="font-heading text-2xl font-bold text-foreground">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Email Templates */}
      {showTemplates && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4">E-Mail-Vorlagen</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {emailTemplates.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplate(t.id)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  selectedTemplate === t.id ? "border-primary bg-champagne/30 ring-2 ring-primary/20" : "border-border hover:border-primary/30"
                }`}
              >
                <span className="text-2xl">{t.emoji}</span>
                <h4 className="font-heading font-semibold text-foreground mt-2">{t.name}</h4>
                <p className="text-xs text-muted-foreground font-body mt-1 whitespace-pre-line line-clamp-3">{t.preview}</p>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Gast suchen..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {statuses.map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-body font-medium whitespace-nowrap transition-all ${
                filterStatus === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Invitations Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground uppercase">Gast</th>
                <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground uppercase hidden md:table-cell">Code</th>
                <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground uppercase">Status</th>
                <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground uppercase hidden lg:table-cell">Versandweg</th>
                <th className="text-right p-4 text-xs font-body font-semibold text-muted-foreground uppercase">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(invite => (
                <tr key={invite.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-champagne flex items-center justify-center text-xs font-heading font-bold text-primary">
                        {invite.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-body font-medium text-foreground">{invite.name}</p>
                        <p className="text-xs text-muted-foreground font-body">{invite.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono bg-secondary px-2 py-1 rounded text-foreground">{invite.code}</code>
                      <button onClick={() => regenerateCode(invite.id)} className="p-1 rounded hover:bg-secondary text-muted-foreground" title="Neuen Code generieren">
                        <RefreshCw size={12} />
                      </button>
                    </div>
                  </td>
                  <td className="p-4">{statusBadge(invite.status)}</td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className="text-sm font-body text-muted-foreground">
                      {invite.method === "email" ? "📧 E-Mail" : invite.method === "whatsapp" ? "💬 WhatsApp" : invite.method === "manual" ? "🔗 Link" : "–"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => copyLink(invite)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground" title="Link kopieren">
                        {copiedId === invite.id ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
                      </button>
                      <button onClick={() => setShowQR(invite)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground" title="QR-Code">
                        <QrCode size={14} />
                      </button>
                      <button onClick={() => setShowSendModal({ guest: invite, method: "email" })} className="p-1.5 rounded hover:bg-secondary text-muted-foreground" title="Per E-Mail senden">
                        <Mail size={14} />
                      </button>
                      <button onClick={() => setShowSendModal({ guest: invite, method: "whatsapp" })} className="p-1.5 rounded hover:bg-secondary text-muted-foreground" title="Per WhatsApp senden">
                        <MessageCircle size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 bg-foreground/60 flex items-center justify-center p-4" onClick={() => setShowQR(null)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-2xl p-8 max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">QR-Code für {showQR.name}</h3>
            <p className="text-sm text-muted-foreground font-body mb-6">Scannen für persönlichen RSVP-Link</p>
            {/* QR Code Placeholder */}
            <div className="mx-auto w-48 h-48 bg-secondary rounded-2xl flex items-center justify-center mb-4 border-2 border-border">
              <div className="grid grid-cols-7 gap-1 p-4">
                {Array.from({ length: 49 }).map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-sm ${Math.random() > 0.4 ? "bg-foreground" : "bg-background"}`} />
                ))}
              </div>
            </div>
            <code className="text-xs font-mono bg-secondary px-3 py-1.5 rounded-lg text-foreground">{showQR.code}</code>
            <div className="flex gap-2 mt-6 justify-center">
              <Button size="sm" variant="outline" className="font-body"><Download size={14} className="mr-1.5" /> Herunterladen</Button>
              <Button size="sm" variant="outline" className="font-body" onClick={() => setShowQR(null)}>Schließen</Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Send Modal */}
      {showSendModal && (
        <div className="fixed inset-0 z-50 bg-foreground/60 flex items-center justify-center p-4" onClick={() => setShowSendModal(null)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
              {showSendModal.method === "email" ? "📧 E-Mail senden" : "💬 WhatsApp senden"}
            </h3>
            <p className="text-sm text-muted-foreground font-body mb-4">An: {showSendModal.guest.name}</p>
            
            {showSendModal.method === "email" ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-body font-medium text-foreground">Vorlage</label>
                  <p className="text-sm text-muted-foreground font-body mt-1">
                    {emailTemplates.find(t => t.id === selectedTemplate)?.name} – {emailTemplates.find(t => t.id === selectedTemplate)?.emoji}
                  </p>
                </div>
                <div className="bg-secondary/30 rounded-xl p-4">
                  <p className="text-sm font-body text-foreground whitespace-pre-line">
                    {emailTemplates.find(t => t.id === selectedTemplate)?.preview.replace("[Name]", showSendModal.guest.name.split(" ")[0])}
                  </p>
                  <div className="mt-3 p-3 bg-champagne/50 rounded-lg">
                    <p className="text-xs font-body text-muted-foreground">Persönlicher Link:</p>
                    <code className="text-xs font-mono text-primary">{showSendModal.guest.link}</code>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-secondary/30 rounded-xl p-4">
                <p className="text-sm font-body text-foreground">
                  Hallo {showSendModal.guest.name.split(" ")[0]}! 🎉{"\n\n"}
                  Wir laden dich herzlich zu unserer Hochzeit ein!{"\n"}
                  Bitte fülle dein RSVP aus:{"\n\n"}
                  🔗 {showSendModal.guest.link}{"\n"}
                  🔑 Code: {showSendModal.guest.code}
                </p>
              </div>
            )}

            <div className="flex gap-2 mt-6">
              <Button size="sm" className="font-body flex-1" onClick={() => sendInvite(showSendModal.guest.id, showSendModal.method)}>
                <Send size={14} className="mr-1.5" /> Senden
              </Button>
              <Button variant="outline" size="sm" className="font-body" onClick={() => setShowSendModal(null)}>Abbrechen</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const Download = ({ size, className }: { size: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
);

export default DashboardInvitations;
