
## Plan: Dashboard Premium-Upgrade

### 1. Animations & Micro-Interactions
- Add `useAnimatedNumber` hook for counting animations (0→124)
- Add fade-in animations to all widget cards and sections
- Add hover effects to cards (scale, shadow, border glow)
- CSS transitions throughout

### 2. Dark Mode
- Add dark mode toggle to DashboardHeader and DashboardSettings
- Use `next-themes` ThemeProvider (already installed)
- Toggle in header (moon/sun icon)

### 3. Overview Enhancements
- Grid layout option (iPhone-style tiles, 1/2/3 columns based on widget size)
- Drag-and-drop via HTML5 drag API
- Budget traffic-light banner (>90% yellow, >100% red)

### 4. Pop-up Dialogs (replace inline forms)
- DashboardGuests: Add guest dialog
- DashboardTasks: Add task dialog  
- DashboardTimeline: Add event dialog
- DashboardBudget: Add position dialog

### 5. Budget Enhancement
- Pie chart (recharts - already installed)
- Bar chart (budget vs actual per category)
- Category filters (all/open/paid)
- Position add via popup

### 6. Food/Menu Management
- Add edit/delete buttons to menu items in Menükarte tab
- Add "Gericht hinzufügen" button with dialog

### 7. Wishlist Enhancement  
- Custom categories (add/manage)
- PayPal link field in settings area

### 8. Honeymoon World Map Fix
- Replace minimal SVG with a proper world map SVG with country outlines

### 9. Settings Redesign
- Design & Theme section with dark mode, accent color, font preview
- Better organized sections

### 10. Guest Portal Config
- Drag-and-drop reordering instead of arrows
- More interactive

### 11. Konfetti on RSVP
- Add canvas-confetti for RSVP demo page acceptance

### 12. Additional innovative features
- Countdown widget in overview
- Quick actions bar
- Notification center concept
