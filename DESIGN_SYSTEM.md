# Design System: Enterprise IT & ERP Solutions
**Theme:** Corporate Trust, Modern Technology, Clarity.
**Target Vibe:** Professional, Reliable (Blue), Innovative (Cyan/Teal), Action-Oriented (Amber).

---

## 1. Color Palette

### Primary Colors (Brand Identity)
*   **Deep Trust Blue:** `#0B4F93` - *Main Brand Color. Used for Navbar, Primary Buttons, Headings.* (Represents: Trust, Stability)
*   **Tech Cyan:** `#00A8CC` - *Secondary Brand Color. Used for Highlights, Icons, Gradients.* (Represents: Innovation, Speed)

### Accent Colors (Action)
*   **Action Amber:** `#FF9F1C` - *CTA Buttons, Badges, Critical Alerts.* (Represents: Energy, Attention)
*   **Success Green:** `#10B981` - *Success messages, "Online" status, Positive indicators.*

### Neutrals (Backgrounds & Text)
*   **Dark Slate:** `#0F172A` - *Footer background, Dark Mode elements.* (Rich Black substitute)
*   **Heading Grey:** `#1E293B` - *H1-H6 Headings.*
*   **Body Text:** `#334155` - *Paragraphs, general text.*
*   **Surface Light:** `#F1F5F9` - *Section backgrounds (alternating).*
*   **Pure White:** `#FFFFFF` - *Card backgrounds, Hero text.*

---

## 2. Typography

### Primary Font Family: **Inter** (Google Fonts)
*   *Why:* Extremely legible on screens, modern, neutral corporate feel.
*   **Headings (H1, H2):** `Inter`, Weight 700 (Bold). Letter-spacing: `-0.02em`.
*   **Subheadings (H3, H4):** `Inter`, Weight 600 (Semi-Bold).
*   **Body Text:** `Inter`, Weight 400 (Regular).
*   **Buttons/Nav:** `Inter`, Weight 500 (Medium).

### Type Scale (Desktop)
*   **H1 (Hero):** `3.5rem` (56px) / Line-height 1.1
*   **H2 (Section Titles):** `2.5rem` (40px) / Line-height 1.2
*   **H3 (Card Titles):** `1.5rem` (24px) / Line-height 1.3
*   **Body:** `1rem` (16px) / Line-height 1.6
*   **Small/Label:** `0.875rem` (14px) / Uppercase tracking `0.05em`.

---

## 3. UI Components

### Buttons
*   **Primary (Solid):**
    *   Bg: `#0B4F93`
    *   Text: `#FFFFFF`
    *   Border: None
    *   Radius: `6px`
    *   Hover: Darken to `#083C72`, Lift `translateY(-2px)`.
*   **Secondary (Outline):**
    *   Bg: Transparent
    *   Text: `#0B4F93`
    *   Border: `2px solid #0B4F93`
    *   Radius: `6px`
    *   Hover: Bg `#0B4F93`, Text `#FFFFFF`.
*   **Accent (CTA):**
    *   Bg: `#FF9F1C`
    *   Text: `#FFFFFF`
    *   Radius: `50px` (Pill shape for high contrast).

### Cards (Services, Testimonials)
*   **Background:** `#FFFFFF`
*   **Border:** `1px solid #E2E8F0` (Subtle)
*   **Shadow (Default):** `0 4px 6px -1px rgba(0, 0, 0, 0.05)`
*   **Shadow (Hover):** `0 20px 25px -5px rgba(0, 0, 0, 0.1)`
*   **Transition:** `0.3s ease-in-out`
*   **Radius:** `12px`

### Inputs & Forms
*   **Background:** `#F8FAFC`
*   **Border:** `1px solid #CBD5E1`
*   **Focus State:** Border `#00A8CC`, Shadow `0 0 0 3px rgba(0, 168, 204, 0.2)`
*   **Radius:** `6px`
*   **Height:** `48px` (Touch friendly)

---

## 4. Spacing System (8pt Grid)
*   **XS (4px):** Tight icon spacing.
*   **S (8px):** Related elements (Headline + Subhead).
*   **M (16px):** Components internal padding.
*   **L (32px):** Between separate components.
*   **XL (64px):** Section top/bottom padding.
*   **XXL (128px):** Major visual breaks.

---

## 5. Iconography
*   **Style:** Line/Stroke Icons (e.g., FontAwesome Regular or Heroicons Outline).
*   **Weight:** Medium stroke (2px).
*   **Color:** Brand Cyan `#00A8CC` or Primary Blue `#0B4F93`.
*   **Container:** Icons inside a light circle/rounded-square background (`#E0F2FE`) for emphasis.

---

## 6. Visual Effects
*   **Gradients:** Subtle use only. E.g., Hero Overlay: `linear-gradient(135deg, rgba(15,23,42,0.9), rgba(11,79,147,0.8))`.
*   **Glassmorphism:** Used for floating elements (e.g., Sticky Headers or Product Feature overlays). `backdrop-filter: blur(12px); bg: rgba(255,255,255, 0.8)`.
