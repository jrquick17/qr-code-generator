# 📱 Static QR Code Generator

A fast, lightweight, and modern **QR Code Generator** web application built with **HTML5, CSS3, and Vanilla JavaScript**. It runs **100% client-side** directly in the user's browser with zero backend dependencies, making it completely free, private, and effortlessly hostable on **GitHub Pages**.

---

## ✨ Features

- ⚡ **100% Client-Side & Private:** No server calls or external API data logging — your inputs never leave your browser.
- 🎨 **Custom Color Styling:** Pick custom foreground (code) and background colors, or choose from curated color presets.
- 📐 **High-Resolution PNG Download:** Export crisp, high-DPI QR codes (256px, 512px HD, or 1024px Print quality) with quiet-zone padding.
- 📋 **Direct Clipboard Copy:** Copy generated QR code images straight to your clipboard with one click.
- 🎛️ **Content Type Presets:**
  - **URL:** Direct website links
  - **Text:** Plain text notes and messages
  - **Wi-Fi:** Quick network connection configuration (`WIFI:S:SSID;T:WPA;P:Password;;`)
  - **Email:** Direct `mailto:` action triggers
- 🛡️ **Configurable Error Correction:** Choose between Level L (7%), Level M (15%), Level Q (25%), and Level H (30% recovery).
- 📱 **Fully Responsive UI:** Centered glass/card elevation layout tailored for desktop, tablet, and mobile screens.
- ⌨️ **Keyboard Accessible:** Press `Enter` to quickly generate, with clear focus indicators and feedback animations.

---

## 🛠️ Tech Stack

- **HTML5:** Semantic, accessible structure and Open Graph metadata.
- **CSS3:** Custom properties (CSS variables), CSS Grid & Flexbox, smooth transitions, and responsive breakpoints.
- **Vanilla JavaScript (ES6+):** Pure DOM manipulation, Canvas rendering, and Clipboard API integration.
- **[qrcode.js](https://cdnjs.com/libraries/qrcodejs):** Fast, reliable, client-side QR code generator loaded via CDN.

---

## 📁 File Structure

```text
qr-code-generator/
├── index.html      # Main application markup & CDN script inclusion
├── style.css       # Design tokens, typography, layout & animations
├── script.js       # App logic, event handlers & export pipeline
└── README.md       # Project documentation & GitHub Pages deployment guide
```

---

## 💻 Local Development

To test and run the project locally without deploying:

### Option A: VS Code Live Server
- Install the **Live Server** extension in VS Code.
- Right-click `index.html` and select **"Open with Live Server"**.

### Option B: Python 3 Built-in Server
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

### Option C: Node.js `npx serve`
```bash
npx serve .
```

---

## 📄 License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute it as needed!
