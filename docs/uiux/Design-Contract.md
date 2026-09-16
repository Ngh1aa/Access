# ACCESS — Design Contract

## 1. Visual Direction & Aesthetic Pillars
- **Keywords**: Secure · Architectural · Frictionless.
- **Atmosphere**: Premium enterprise technology operating at the intersection of architecture, hardware engineering, and digital identity.
- **Prohibitions**:
  - No neon "cyber-hacker" green (#00FF00) or glowing terminal aesthetic.
  - No generic SaaS pastel purple/pink gradients.
  - No generic smiling office stock photos.
  - No unstyled Bootstrap-style card grids.

## 2. Color System
| Token Name | Hex Value | Usage / Semantic Role |
| :--- | :--- | :--- |
| `--bg-dark` | `#0B0D11` | Primary dark surface, architectural contrast sections, header |
| `--bg-dark-elevated` | `#13161F` | Elevated dark cards, reader housing, phone mockups |
| `--bg-light` | `#F8F9FA` | Crisp light surfaces, body canvas for product storytelling |
| `--bg-white` | `#FFFFFF` | Primary white card backgrounds, clean contrast panels |
| `--border-dark` | `rgba(255, 255, 255, 0.10)` | Dark mode hairline borders |
| `--border-light` | `rgba(15, 23, 42, 0.08)` | Light mode subtle architectural dividers |
| `--text-primary` | `#0F172A` | High-contrast body text on light backgrounds |
| `--text-secondary` | `#475569` | Secondary descriptive text |
| `--text-dark-primary` | `#F8FAFC` | Headings & text on dark containers |
| `--text-dark-secondary` | `#94A3B8` | Subtitles & secondary specs on dark |
| `--accent-cobalt` | `#2563EB` | Primary brand accent & active state |
| `--accent-cobalt-dark` | `#1D4ED8` | Hover & focus brand state |
| `--signal-ice` | `#38BDF8` | Digital handshake, NFC/BLE detection pulse |
| `--status-granted` | `#10B981` | Access Granted LED state, valid credentials |
| `--status-warning` | `#F59E0B` | Temporary passes, expiring windows |
| `--status-denied` | `#EF4444` | Access Denied, Revoked, Emergency Lockdown |

## 3. Typography Hierarchy
- **Primary Display & Headings**: `Plus Jakarta Sans`, sans-serif (700 / 600 / 500)
  - Display Hero: `clamp(2.75rem, 6vw, 5.25rem)` with tracking `-0.035em`, line-height `1.05`
  - Section Titles (H2): `clamp(2rem, 4vw, 3.25rem)` with tracking `-0.025em`, line-height `1.15`
  - Subheadings (H3): `clamp(1.25rem, 2.5vw, 1.75rem)` with tracking `-0.02em`
- **Body Text**: `Inter`, system-ui, sans-serif (400 / 500)
  - Body Large: `1.125rem` (`18px`), line-height `1.65`
  - Body Base: `1rem` (`16px`), line-height `1.6`
  - Body Small / Captions: `0.875rem` (`14px`), line-height `1.5`
- **Technical & Credential Monospace**: `DM Mono`, `JetBrains Mono`, monospace (400 / 500)
  - Badge numbers, floor routing (`FL-01..04`), timestamp logs, NFC reader hex codes.

## 4. Layout & Grid Architecture
- Max container width: `1320px` with fluid gutter `clamp(1.25rem, 4vw, 3rem)`.
- Asymmetric edge-to-edge balance: 60% architectural media / spatial mockups, 40% precision product storytelling.
- Sticky progression flows for visitor journeys and identity synchronization.
- Breakpoints:
  - Desktop Ultra: `1440px+`
  - Desktop Standard: `1200px`
  - Tablet Landscape: `1024px`
  - Tablet Portrait: `768px`
  - Mobile: `390px` to `480px`

## 5. Accessibility & Motion
- WCAG 2.2 AA compliance: minimum 4.5:1 text contrast on all viewports.
- Non-color reliant feedback: every access state carries an explicit icon, text badge, and color accent.
- All interactive controls have visible focus rings (`3px solid rgba(37, 99, 235, 0.5)`).
- Full `@media (prefers-reduced-motion: reduce)` support: disables pulse loops and rapid transitions while retaining clear visual state indication.
