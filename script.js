/**
 * QR Code Generator — Client-Side Application Logic
 *
 * Fully static, zero-backend QR code generator using qrcode.js.
 * Supports custom color styling, resolution upscaling, preset modes,
 * high-DPI PNG download, and clipboard copy.
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. DOM Element References
  // -------------------------------------------------------------------------
  const qrInput = document.getElementById('qrInput');
  const qrInputLabel = document.getElementById('qrInputLabel');
  const charCount = document.getElementById('charCount');
  const btnClearInput = document.getElementById('btnClearInput');
  const btnGenerate = document.getElementById('btnGenerate');
  const btnReset = document.getElementById('btnReset');
  const btnDownload = document.getElementById('btnDownload');
  const btnCopyImage = document.getElementById('btnCopyImage');
  const qrcodeContainer = document.getElementById('qrcode');
  const qrPlaceholder = document.getElementById('qrPlaceholder');
  const qrFrame = document.getElementById('qrFrame');

  // Customization controls
  const fgColorInput = document.getElementById('fgColorInput');
  const bgColorInput = document.getElementById('bgColorInput');
  const fgHexDisplay = document.getElementById('fgHexDisplay');
  const bgHexDisplay = document.getElementById('bgHexDisplay');
  const sizeSelect = document.getElementById('sizeSelect');
  const eccSelect = document.getElementById('eccSelect');
  const presetButtons = document.querySelectorAll('.preset-btn');
  const typePills = document.querySelectorAll('.type-pill');

  // Wi-Fi inputs
  const wifiFields = document.getElementById('wifiFields');
  const wifiSsid = document.getElementById('wifiSsid');
  const wifiPassword = document.getElementById('wifiPassword');
  const wifiAuth = document.getElementById('wifiAuth');

  // Badges & Feedback
  const badgeResolution = document.getElementById('badgeResolution');
  const badgeEcc = document.getElementById('badgeEcc');
  const toastContainer = document.getElementById('toastContainer');

  // -------------------------------------------------------------------------
  // 2. Application State
  // -------------------------------------------------------------------------
  let currentQRCode = null;
  let currentContentType = 'url'; // 'url' | 'text' | 'wifi' | 'email'

  const DEFAULT_CONFIG = {
    text: 'https://jrquick.com',
    fgColor: '#0f172a',
    bgColor: '#ffffff',
    size: 512,
    ecc: 'H',
    type: 'url'
  };

  // -------------------------------------------------------------------------
  // 3. Core QR Code Generation
  // -------------------------------------------------------------------------

  /**
   * Constructs the final string payload based on the selected content type.
   * @returns {string} The text payload to encode into the QR code.
   */
  function getPayload() {
    if (currentContentType === 'wifi') {
      const ssid = wifiSsid.value.trim();
      const pass = wifiPassword.value;
      const auth = wifiAuth.value;
      if (!ssid) return '';
      // Wi-Fi standard format: WIFI:T:WPA;S:MySSID;P:MyPassword;;
      return `WIFI:T:${auth};S:${ssid};P:${pass};;`;
    }

    return qrInput.value.trim();
  }

  /**
   * Generates or re-renders the QR Code.
   */
  function generateQRCode() {
    const payload = getPayload();

    if (!payload) {
      showToast('Please enter some text or URL first.', 'error');
      highlightInputError();
      return;
    }

    // Clear previous QR code elements
    qrcodeContainer.innerHTML = '';
    qrPlaceholder.classList.add('hidden');

    const fgColor = fgColorInput.value;
    const bgColor = bgColorInput.value;
    const eccLevelKey = eccSelect.value;
    const eccLevel = (window.QRCode && window.QRCode.CorrectLevel)
      ? window.QRCode.CorrectLevel[eccLevelKey]
      : 2; // Default to H (2)

    // Render with qrcodejs
    try {
      currentQRCode = new QRCode(qrcodeContainer, {
        text: payload,
        width: 256,
        height: 256,
        colorDark: fgColor,
        colorLight: bgColor,
        correctLevel: eccLevel
      });

      // Update resolution and ECC labels
      updateMetaBadges();

      // Trigger frame micro-animation
      qrFrame.classList.remove('shake');
    } catch (err) {
      console.error('QR Code generation failed:', err);
      showToast('Error creating QR code. Data might be too long.', 'error');
    }
  }

  /**
   * Updates metadata badges below the QR code preview.
   */
  function updateMetaBadges() {
    const size = sizeSelect.value;
    badgeResolution.textContent = `${size} × ${size} px`;

    const eccMap = {
      L: 'Level L (7%)',
      M: 'Level M (15%)',
      Q: 'Level Q (25%)',
      H: 'Level H (30%)'
    };
    badgeEcc.textContent = eccMap[eccSelect.value] || 'Level H (30%)';
  }

  /**
   * Highlights the input field when an invalid or empty attempt is made.
   */
  function highlightInputError() {
    const target = currentContentType === 'wifi' ? wifiSsid : qrInput;
    target.focus();
    target.classList.add('form-error');
    qrFrame.classList.add('shake');
    setTimeout(() => {
      target.classList.remove('form-error');
      qrFrame.classList.remove('shake');
    }, 400);
  }

  // -------------------------------------------------------------------------
  // 4. High-Resolution Export (Canvas Rendering with Margin / Quiet Zone)
  // -------------------------------------------------------------------------

  /**
   * Creates an offscreen canvas at full export resolution (e.g. 512x512, 1024x1024)
   * with proper quiet-zone padding and smooth rendering.
   * @returns {HTMLCanvasElement|null} The rendered offscreen canvas.
   */
  function getExportCanvas() {
    const sourceCanvas = qrcodeContainer.querySelector('canvas');
    const sourceImg = qrcodeContainer.querySelector('img');

    if (!sourceCanvas && !sourceImg) {
      return null;
    }

    const exportSize = parseInt(sizeSelect.value, 10) || 512;
    const padding = Math.round(exportSize * 0.08); // 8% quiet zone
    const qrDrawSize = exportSize - (padding * 2);

    const canvas = document.createElement('canvas');
    canvas.width = exportSize;
    canvas.height = exportSize;
    const ctx = canvas.getContext('2d');

    // Fill background
    ctx.fillStyle = bgColorInput.value;
    ctx.fillRect(0, 0, exportSize, exportSize);

    // Disable image smoothing for pixel-perfect sharp QR modules
    ctx.imageSmoothingEnabled = false;

    if (sourceCanvas) {
      ctx.drawImage(sourceCanvas, padding, padding, qrDrawSize, qrDrawSize);
    } else if (sourceImg && sourceImg.src) {
      ctx.drawImage(sourceImg, padding, padding, qrDrawSize, qrDrawSize);
    }

    return canvas;
  }

  /**
   * Downloads the generated QR code as a PNG file.
   */
  function downloadPNG() {
    const exportCanvas = getExportCanvas();

    if (!exportCanvas) {
      showToast('Please generate a QR code first.', 'error');
      return;
    }

    try {
      const dataUrl = exportCanvas.toDataURL('image/png');
      const filename = `qrcode-${Date.now()}.png`;

      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = filename;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      showToast('QR Code downloaded successfully!', 'success');
    } catch (err) {
      console.error('Download error:', err);
      showToast('Failed to download image. Try right-clicking to save.', 'error');
    }
  }

  /**
   * Copies the generated QR code directly to the user's clipboard as a PNG image.
   */
  async function copyImageToClipboard() {
    const exportCanvas = getExportCanvas();

    if (!exportCanvas) {
      showToast('Please generate a QR code first.', 'error');
      return;
    }

    if (!navigator.clipboard || !window.ClipboardItem) {
      showToast('Clipboard image copying is not supported in this browser.', 'error');
      return;
    }

    try {
      exportCanvas.toBlob(async (blob) => {
        if (!blob) {
          showToast('Failed to prepare image for clipboard.', 'error');
          return;
        }

        try {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          showToast('QR code copied to clipboard!', 'success');
        } catch (clipErr) {
          console.error('Clipboard write error:', clipErr);
          showToast('Failed to copy to clipboard.', 'error');
        }
      }, 'image/png');
    } catch (err) {
      console.error('Blob conversion error:', err);
      showToast('Could not copy image.', 'error');
    }
  }

  // -------------------------------------------------------------------------
  // 5. Presets & Content Type Handling
  // -------------------------------------------------------------------------

  /**
   * Handles switching between Content Types (URL, Text, Wi-Fi, Email).
   */
  function handleTypeSwitch(pill) {
    typePills.forEach(p => {
      p.classList.remove('active');
      p.setAttribute('aria-selected', 'false');
    });

    pill.classList.add('active');
    pill.setAttribute('aria-selected', 'true');

    currentContentType = pill.dataset.type;

    if (currentContentType === 'wifi') {
      document.getElementById('inputContainer').classList.add('hidden');
      wifiFields.classList.remove('hidden');
    } else {
      document.getElementById('inputContainer').classList.remove('hidden');
      wifiFields.classList.add('hidden');

      // Adjust placeholders and labels
      if (currentContentType === 'url') {
        qrInputLabel.textContent = 'Website URL';
        qrInput.placeholder = 'https://example.com';
        if (!qrInput.value.startsWith('http') && qrInput.value === '') {
          qrInput.value = 'https://jrquick.com';
        }
      } else if (currentContentType === 'text') {
        qrInputLabel.textContent = 'Plain Text Note or Message';
        qrInput.placeholder = 'Type any message, notes, or formatted text...';
      } else if (currentContentType === 'email') {
        qrInputLabel.textContent = 'Email Address (mailto:)';
        qrInput.placeholder = 'mailto:hello@example.com?subject=Hello';
      }
    }

    updateCharCount();
    generateQRCode();
  }

  /**
   * Applies a color preset theme.
   */
  function applyColorPreset(btn) {
    presetButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const fg = btn.dataset.fg;
    const bg = btn.dataset.bg;

    fgColorInput.value = fg;
    bgColorInput.value = bg;
    fgHexDisplay.textContent = fg.toUpperCase();
    bgHexDisplay.textContent = bg.toUpperCase();

    generateQRCode();
  }

  // -------------------------------------------------------------------------
  // 6. UI Helpers & Feedback
  // -------------------------------------------------------------------------

  /**
   * Updates the character count indicator.
   */
  function updateCharCount() {
    const len = currentContentType === 'wifi'
      ? wifiSsid.value.length + wifiPassword.value.length
      : qrInput.value.length;
    charCount.textContent = `${len} char${len === 1 ? '' : 's'}`;
  }

  /**
   * Displays a temporary toast notification.
   * @param {string} message - Message text
   * @param {'success'|'error'} [type='success'] - Toast type
   */
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : 'toast-success'}`;

    const iconSvg = type === 'error'
      ? `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
      : `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;

    toast.innerHTML = `${iconSvg}<span>${escapeHtml(message)}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  /**
   * Escapes HTML strings to prevent XSS.
   */
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Resets the entire generator to factory defaults.
   */
  function resetToDefaults() {
    qrInput.value = DEFAULT_CONFIG.text;
    fgColorInput.value = DEFAULT_CONFIG.fgColor;
    bgColorInput.value = DEFAULT_CONFIG.bgColor;
    fgHexDisplay.textContent = DEFAULT_CONFIG.fgColor.toUpperCase();
    bgHexDisplay.textContent = DEFAULT_CONFIG.bgColor.toUpperCase();
    sizeSelect.value = DEFAULT_CONFIG.size.toString();
    eccSelect.value = DEFAULT_CONFIG.ecc;

    wifiSsid.value = '';
    wifiPassword.value = '';
    wifiAuth.value = 'WPA';

    // Reset type pill to URL
    const defaultPill = Array.from(typePills).find(p => p.dataset.type === DEFAULT_CONFIG.type);
    if (defaultPill) {
      handleTypeSwitch(defaultPill);
    }

    // Reset preset button
    const defaultPreset = Array.from(presetButtons).find(b => b.dataset.fg === DEFAULT_CONFIG.fgColor);
    if (defaultPreset) {
      presetButtons.forEach(b => b.classList.remove('active'));
      defaultPreset.classList.add('active');
    }

    updateCharCount();
    generateQRCode();
    showToast('Reset to default settings.', 'success');
  }

  // -------------------------------------------------------------------------
  // 7. Event Listeners
  // -------------------------------------------------------------------------

  // Input events
  qrInput.addEventListener('input', updateCharCount);
  qrInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey || !e.shiftKey)) {
      e.preventDefault();
      generateQRCode();
    }
  });

  btnClearInput.addEventListener('click', () => {
    qrInput.value = '';
    qrInput.focus();
    updateCharCount();
  });

  // Wi-Fi inputs
  [wifiSsid, wifiPassword, wifiAuth].forEach(input => {
    input.addEventListener('input', updateCharCount);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        generateQRCode();
      }
    });
  });

  // Buttons
  btnGenerate.addEventListener('click', generateQRCode);
  btnReset.addEventListener('click', resetToDefaults);
  btnDownload.addEventListener('click', downloadPNG);
  btnCopyImage.addEventListener('click', copyImageToClipboard);

  // Content type pill tabs
  typePills.forEach(pill => {
    pill.addEventListener('click', () => handleTypeSwitch(pill));
  });

  // Color inputs
  fgColorInput.addEventListener('input', (e) => {
    fgHexDisplay.textContent = e.target.value.toUpperCase();
    presetButtons.forEach(b => b.classList.remove('active'));
    generateQRCode();
  });

  bgColorInput.addEventListener('input', (e) => {
    bgHexDisplay.textContent = e.target.value.toUpperCase();
    presetButtons.forEach(b => b.classList.remove('active'));
    generateQRCode();
  });

  // Presets
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => applyColorPreset(btn));
  });

  // Size & ECC dropdowns
  sizeSelect.addEventListener('change', () => {
    updateMetaBadges();
  });

  eccSelect.addEventListener('change', () => {
    generateQRCode();
  });

  // -------------------------------------------------------------------------
  // 8. Initial Execution
  // -------------------------------------------------------------------------
  updateCharCount();
  generateQRCode();
});
