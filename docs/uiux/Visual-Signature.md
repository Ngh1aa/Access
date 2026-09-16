# ACCESS — Visual Signature & Micro-Interaction Contract

## 1. Visual Signature Concept: "Digital Credential Crossing Physical Space"

The core brand motif of ACCESS is the visual and physical convergence of digital identity and physical architecture:
```
┌──────────────────────────────────────┐
│  DIGITAL CREDENTIAL                  │
│  Apple Wallet / Dynamic QR Pass      │
│  User: ĐỖ ANH NGHĨA                  │
│  Role: Product Designer / Employee   │
│  Permissions: Floors 01–04           │
└──────────────────┬───────────────────┘
                   │  Encrypted NFC / BLE Intent
                   ▼
┌──────────────────────────────────────┐
│  SMART ACCESS READER                 │
│  Multi-spectrum 360° LED Ring        │
│  Status: [ READING → VALIDATING ]    │
└──────────────────┬───────────────────┘
                   │  Sub-second Relay Latch
                   ▼
┌──────────────────────────────────────┐
│  PHYSICAL ENVIRONMENT                │
│  Architectural Glass Entrance        │
│  Turnstile / Magnetic Latch Released │
│  Status: [ ACCESS GRANTED ]          │
└──────────────────────────────────────┘
```

This motif recurs across:
1. **The Hero Experience**: Interactive live presentation of the credential approaching the reader and unlocking the door.
2. **Product Page Demonstrations**: Live simulator allowing the visitor to trigger real unlocks, test temporary visitor QR codes, or observe security lockdown.
3. **Visitor Journey**: Physical check-in kiosk translating digital invitation into dynamic physical credentials.
4. **Spatial Matrix**: Interactive floorplan mapping permissions to physical building zones.

## 2. Smart Reader Hardware States & Specifications

The ACCESS Smart Reader (Standard Wall-Mount & Slim Mullion) communicates status via an integrated LED light ring and audio click/feedback tone:

| State | LED Visual Ring | Audio/Haptic Signal | System Meaning |
| :--- | :--- | :--- | :--- |
| **Idle / Armed** | Soft pulsing ice-blue breathing light (`#38BDF8` @ 20% opacity) | Silent | Reader is connected to local controller & cloud mesh; waiting for BLE/NFC. |
| **Detecting** | Rotating ice-blue beam (`#38BDF8` 100%) | Micro-haptic click | Device/credential detected within 10cm range; cryptographic exchange initiating. |
| **Access Granted** | Instantaneous emerald green sweep (`#10B981` glow) + perimeter ring solid | Sub-second pleasant dual-tone chime (520Hz + 680Hz) | Identity verified, schedule checked, magnetic latch unlatched for 5 seconds. |
| **Access Denied** | Controlled double crimson flash (`#EF4444`) | Low reject tone (180Hz) | Invalid credential, out of schedule, or restricted floor. |
| **Pass Expired** | Double amber pulse (`#F59E0B`) | Short cautionary buzz | Visitor or contractor pass validity window has lapsed. |
| **Emergency Lockdown**| Synchronized rapid red strobing light across all site readers | Continuous pulsed alarm tone | Admin triggered site-wide lockdown; all exterior and high-security doors sealed. |

## 3. Personas in Interactive Prototypes

1. **Đỗ Anh Nghĩa**
   - Type: Full-Time Employee
   - Credential: Apple Wallet Pass / Apple Watch
   - Location: ACCESS HQ — Ho Chi Minh City
   - Permission: Floors 01–04 (All Access)
   - Schedule: Mon–Fri, 08:00–20:00

2. **Marcus Chen**
   - Type: Verified Visitor
   - Host: Đỗ Anh Nghĩa (Product Designer)
   - Organization: Figma APAC
   - Credential: Dynamic Browser QR Pass + Mobile Link
   - Location: ACCESS HQ, Floor 03 (Design Studio & Meeting Wing)
   - Schedule: Today, 10:00–12:00 (Auto-expiring)

3. **Sarah Jenkins**
   - Type: Certified Contractor
   - Company: Apex Network Infrastructure
   - Credential: High-Security Temporary Token
   - Location: ACCESS HQ, Server Room 4B
   - Permission: Escorted Server Access
   - Schedule: Today, 13:00–15:00 (2-Hour Window)

4. **Alex Rivera (Former Staff)**
   - Type: De-provisioned Employee
   - Event: Offboarding triggered via Workday SCIM
   - Status: Credential Instant Revoked, Access Denied.
