

## Einstellungen: Tabs + Theme Studio

### Aktueller Zustand
Die Einstellungen zeigen alles untereinander in einer langen scrollbaren Liste (Event-Details, Design & Theme, Gästeportal, Benachrichtigungen).

### Plan

**1. Tab-basierte Navigation in den Einstellungen**

Die Einstellungen werden mit `shadcn Tabs` in separate Reiter aufgeteilt:

| Tab | Icon | Inhalt |
|-----|------|--------|
| **Allgemein** | Calendar | Event-Name, Datum, Ort, RSVP-Frist |
| **Theme Studio** | Palette | Neuer umfangreicher Design-Editor (siehe unten) |
| **Gästeportal** | Globe | Zugangscode, Begrüßungstext, Portal öffentlich |
| **Benachrichtigungen** | Bell | Alle Notification-Toggles |

**2. Theme Studio (neuer Tab)**

Ein vollwertiger Design-Editor der **global** wirkt (CSS-Variablen auf `:root` ändern):

- **Dark/Light Mode Toggle** mit Live-Umschaltung
- **Akzentfarbe** — Farbpalette + Custom Color Picker → setzt `--primary` CSS-Variable global via `document.documentElement.style.setProperty`
- **Schriftart-Auswahl** — Font-Paare (Playfair+DM Sans, Cormorant+Lato, Montserrat+Open Sans) → setzt `--font-heading` und `--font-body` CSS-Variablen global
- **Border-Radius** — Slider (0px bis 20px) → setzt `--radius` global
- **Live-Vorschau** — Ein Preview-Panel das eine Mini-Karte mit Überschrift, Text und Button zeigt, die sofort auf alle Änderungen reagiert
- Einstellungen werden in `localStorage` persistiert und beim Laden wiederhergestellt via erweitertem `useTheme` Hook

**3. Technische Umsetzung**

- `DashboardSettings.tsx` komplett umbauen: Wrapper mit `<Tabs>` Komponente, jeder Tab-Inhalt als eigener Abschnitt
- `useTheme.ts` erweitern: neben dark/light auch `primaryColor`, `fontPair`, `borderRadius` speichern und als CSS-Variablen auf `:root` setzen
- Bestehende Inhalte bleiben identisch, werden nur in die richtigen Tabs verschoben

