# 📱 Free Permanent QR Code Generator — Never Expires & 100% Free Forever

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![100% Client-Side](https://img.shields.io/badge/Privacy-100%25%20Client--Side-brightgreen.svg)](#-privacy--zero-data-collection)
[![No Expiration](https://img.shields.io/badge/Expiry-Never%20Expires-success.svg)](#-the-qr-code-expiration-trap--why-this-exists)
[![No Account Required](https://img.shields.io/badge/Account-No%20Sign--up%20Needed-orange.svg)](#-features)
[![Print Ready HD](https://img.shields.io/badge/Export-1024px%20HD%20PNG-blueviolet.svg)](#-export--print-ready-resolutions)

> **A fast, free, open-source, and private QR Code Generator that produces 100% static, permanent QR codes.**
> **No subscriptions. No expiration dates. No redirected links. No accounts. No scan limits. No paywalls.**

🔗 **Live Demo:** [https://jrquick17.github.io/qr-code-generator/](https://jrquick17.github.io/qr-code-generator/)

---

## 🚨 The "Expiring QR Code" Trap — Why This Tool Exists

Have you ever searched Google for a *"free QR code generator"*, generated a code for your restaurant menu, business cards, wedding invitations, or product packaging, only to find out **weeks later that your QR codes stopped working and demanded a $15–$40/month subscription?**

### How the Predatory "Free Trial" Scam Works:
1. **The Bait:** Commercial QR code generators advertise themselves as "Free".
2. **The Middleman Redirect:** Instead of encoding your actual website link (`https://yourwebsite.com`), they generate a **dynamic redirect URL** pointing to their proprietary servers (`https://scam-qr-service.com/redirect/xyz123`).
3. **The Paywall:** After 14 days or 50 scans, they deactivate the redirect and replace your link with an **"Account Expired / Pay Now"** warning page.
4. **The Hostage Situation:** Since your QR codes are already printed on physical flyers, signs, stickers, or packaging, you are forced to pay ongoing monthly fees to keep them alive.

---

## 🛡️ Static vs. "Free Trial" Dynamic QR Codes

| Feature | 🔒 This Static QR Code Generator | 💸 Commercial "Free Trial" Generators |
| :--- | :--- | :--- |
| **Expiration Date** | **NEVER EXPIRES (Permanent Forever)** | Expired after 14–30 days or scan limit |
| **Pricing / Fees** | **100% Free Forever (Open Source)** | $10 – $50 / month recurring subscription |
| **Middleman Server / Redirect** | ❌ None (Direct payload encoding) | ⚠️ Routes through proprietary servers |
| **Requires Account / Credit Card** | ❌ No sign-up, no login, no credit card | ⚠️ Demands email registration & billing |
| **Scan Limits** | **Unlimited Scans Forever** | Limited (e.g. 50–100 free scans max) |
| **Privacy & Security** | **100% Client-Side (Zero Server Logs)** | Tracks user IPs, device data & scan habits |
| **Offline Scannability** | ✅ Scannable offline (Wi-Fi, Text, Contacts) | ❌ Fails without active internet redirect |
| **Print Safe** | ✅ **Safe for lifetime physical printing** | ❌ High risk of breaking printed materials |

---

## ✨ Features

- ⏳ **Permanent & Lifetime Validity:** Encodes your exact destination URL or text directly into the QR matrix. Once generated, your QR code will work for years without maintenance.
- ⚡ **100% Client-Side & Private:** All QR code generation and image processing happens inside your web browser via Vanilla JavaScript and HTML5 Canvas. Your data, links, and passwords are never transmitted to any external server.
- 🎨 **Custom Brand Colors & Themes:** Customize foreground and background colors with real-time hex previews and instant contrast validation, or choose from curated modern color presets.
- 📐 **High-Resolution Print Export:** Export sharp, uncompressed PNG files at **256px**, **512px (HD)**, or **1024px (Ultra-HD / 300+ DPI Print)** with crisp quiet-zone margins.
- 📋 **1-Click Clipboard Copy:** Instantly copy the generated QR image to your clipboard to paste directly into Figma, Photoshop, Canva, Word, or Slack.
- 🎛️ **Content Type Presets:**
  - 🌐 **Website URL:** Direct link to any website, social media page, Google Review link, or online portfolio.
  - 📝 **Plain Text:** Unformatted messages, serial numbers, product IDs, or notes.
  - 📶 **Wi-Fi Network:** Automatic instant connection setup (`WIFI:S:SSID;T:WPA;P:Password;;`) for cafes, offices, Airbnbs, and home guests.
  - ✉️ **Email (`mailto:`):** Pre-formatted email triggers with subject lines and recipient addresses.
- 🛡️ **Configurable Reed-Solomon Error Correction:** Choose between Level L (7%), Level M (15%), Level Q (25%), and Level H (30% recovery) so damaged, dirty, or stylized codes still scan reliably.
- 📱 **Mobile & Desktop Responsive:** Clean, accessible interface that works seamlessly on smartphones, tablets, and desktop browsers.
- ⌨️ **Keyboard Accessible:** Full keyboard navigation support (`Tab`, `Enter` to generate) with clear focus indicators.

---

## 🎯 Common Use Cases

| Use Case | Why Use Permanent Static QR Codes |
| :--- | :--- |
| 🍽️ **Restaurant Menus & Table Tents** | Print once on acrylic stands or tables without fear of links expiring mid-service. |
| 💼 **Business Cards & Resumes** | Put your portfolio, LinkedIn, or vCard on printed cards that remain valid indefinitely. |
| 📄 **Flyers, Posters & Event Banners** | Distribute marketing materials knowing scans won't be blocked by a paywall. |
| 📦 **Product Packaging & Labels** | Place user manual links, warranties, or batch IDs on physical boxes and stickers. |
| 📶 **Guest Wi-Fi Signs** | Display Wi-Fi credentials in guest rooms, cafes, and offices for 1-tap connection. |
| 💒 **Wedding & Event Invitations** | Direct guests to RSVP forms, venue maps, and gift registries permanently. |

---

## 🛠️ Tech Stack & Architecture

- **HTML5:** Semantic markup, Open Graph tags, and structured meta information.
- **CSS3:** Modern design tokens (CSS custom properties), Glassmorphism styling, CSS Grid & Flexbox, micro-animations, and responsive breakpoints.
- **Vanilla JavaScript (ES6+):** Pure DOM manipulation, Canvas pixel-scaling pipeline, and modern Clipboard API.
- **[qrcode.js](https://cdnjs.com/libraries/qrcodejs):** Standard-compliant, lightweight, offline QR code generation engine loaded via secure CDN.

---

## 🚀 How to Run Locally

You can run this project locally without installing any dependencies or server runtimes.

### Option A: Open Directly in Browser
Simply double-click [`index.html`](file:///c:/Users/jrqui/development/encounting/qr-code-generator/index.html) or drag it into any web browser.

### Option B: Python 3 Local Server
```bash
python -m http.server 8000
```
Visit `http://localhost:8000` in your browser.

### Option C: VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension.
3. Right-click `index.html` and choose **"Open with Live Server"**.

### Option D: Node.js `npx serve`
```bash
npx serve .
```

---

## 🌐 1-Click Free Hosting & Deployment

Since this app is 100% static (HTML, CSS, JS), you can deploy it for free anywhere:

- **GitHub Pages:** Go to **Settings > Pages**, select `main` (or `master`) branch `/root`, and click **Save**.
- **Cloudflare Pages:** Connect your GitHub repo and select "Direct Upload" / Framework preset "None".
- **Vercel:** Run `vercel` in the project root or import repository directly.
- **Netlify:** Drag and drop the repository folder into [Netlify Drop](https://app.netlify.com/drop).

---

## ❓ Frequently Asked Questions (FAQ)

### Will my generated QR code ever expire?
**No, never.** This generator creates standard static QR codes where the target URL or text is permanently etched directly into the black-and-white pixel matrix. There is no middleman redirect server, no tracking link, and no database. As long as your destination website exists, the QR code will scan forever.

### Why do other websites charge monthly subscriptions for QR codes?
Commercial QR generator websites deliberately route your scans through their own private redirect servers ("dynamic QR codes"). Once you print the code on paper, they hold the redirect link hostage and demand recurring monthly fees ($10–$50/mo) to keep routing scans to your real website.

### Is this QR code generator truly 100% free?
**Yes.** This is an open-source project released under the MIT license. There are no paid tiers, no premium features, no trial periods, and no hidden fees.

### Is my data private? Does this tool track scans?
**Your data never leaves your device.** All encoding and rendering is performed 100% client-side in your web browser. Nothing is sent to, logged by, or stored on any server.

### Can I print these QR codes on merchandise, flyers, and billboards?
**Yes.** For professional printing, select the **1024 × 1024 px (Print / 4K)** export option. This provides ultra-high pixel density and clean quiet-zone margins suitable for business cards, banners, laser engraving, stickers, and t-shirts.

### What is the Error Correction Level and which should I choose?
QR codes use Reed-Solomon Error Correction to allow codes to be scanned even if partially dirty, covered, or scuffed:
- **Level L (7%):** Smallest matrix size; best for long text strings.
- **Level M (15%):** Default balance for standard screen and digital uses.
- **Level Q (25%):** High reliability for physical signs and packaging.
- **Level H (30% - Recommended):** Maximum recovery capability; best for outdoor flyers, restaurant table tents, and printed physical merchandise.

---

## 🤝 Contributing & Star the Project

If this free tool saved you from paid QR code subscription scams or broken printed materials, please **give this repository a ⭐️ Star on GitHub**! Starring helps this free tool rank higher on search engines and outrank predatory paid services.

Pull requests, feature suggestions, and bug reports are warmly welcome!

---

## 📄 License

Distributed under the **MIT License**. You are free to use, modify, copy, distribute, and integrate this project into your own personal or commercial workflows without restriction. See [`LICENSE`](https://opensource.org/licenses/MIT) for details.

---

<sub>**Keywords:** free qr code generator, permanent qr code generator, qr code generator that never expires, static qr code generator, free qr code maker no subscription, qr code generator no sign up, avoid qr code scams, non expiring qr code generator, open source qr code generator, print ready high res qr code, free wifi qr code generator.</sub>
