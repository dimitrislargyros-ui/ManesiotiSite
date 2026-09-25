/**
 * Cookie consent banner — Manesiotis
 * Lightweight, no dependencies, GDPR-compliant (reject-first).
 */
(function () {
  'use strict';

  const COOKIE_NAME = 'cookie_consent';
  const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  function setCookie(name, value, maxAge) {
    document.cookie = name + '=' + encodeURIComponent(value) +
      '; max-age=' + maxAge +
      '; path=/' +
      '; SameSite=Lax';
  }

  // Already decided
  if (getCookie(COOKIE_NAME)) return;

  // Build banner
  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Ειδοποίηση cookies');
  banner.setAttribute('aria-live', 'polite');

  banner.innerHTML = `
    <p class="cookie-text">
      Χρησιμοποιούμε μόνο απαραίτητα cookies για τη λειτουργία του ιστότοπου.
      <a href="/aporrito/" class="cookie-link">Μάθετε περισσότερα</a>
    </p>
    <div class="cookie-actions">
      <button type="button" id="cookie-accept" class="cookie-btn cookie-btn-primary">Αποδοχή</button>
      <button type="button" id="cookie-decline" class="cookie-btn cookie-btn-ghost">Απόρριψη</button>
    </div>
  `;

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    #cookie-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--ink);
      color: var(--paper);
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      flex-wrap: wrap;
      z-index: 9999;
      transform: translateY(100%);
      animation: slide-up 0.3s cubic-bezier(0.23,1,0.32,1) 0.5s both;
    }
    @keyframes slide-up {
      to { transform: translateY(0); }
    }
    @media (prefers-reduced-motion: reduce) {
      #cookie-banner { animation: none; transform: translateY(0); }
    }
    .cookie-text {
      font-size: 0.875rem;
      color: rgba(245,246,243,0.85);
      margin: 0;
      max-width: 56ch;
    }
    .cookie-link {
      color: #8BA877;
      text-underline-offset: 0.2em;
    }
    .cookie-actions {
      display: flex;
      gap: 12px;
      flex-shrink: 0;
    }
    .cookie-btn {
      padding: 8px 20px;
      font-size: 0.875rem;
      font-weight: 600;
      border-radius: 2px;
      cursor: pointer;
      border: 1px solid transparent;
      transition: opacity 0.15s;
    }
    .cookie-btn:hover { opacity: 0.85; }
    .cookie-btn-primary {
      background: #3D5227;
      color: #fff;
      border-color: #3D5227;
    }
    .cookie-btn-ghost {
      background: transparent;
      color: rgba(245,246,243,0.7);
      border-color: rgba(245,246,243,0.25);
    }
  `;

  function dismiss() {
    banner.style.transition = 'transform 0.25s cubic-bezier(0.23,1,0.32,1)';
    banner.style.transform = 'translateY(100%)';
    setTimeout(() => banner.remove(), 300);
  }

  document.head.appendChild(style);
  document.body.appendChild(banner);

  document.getElementById('cookie-accept').addEventListener('click', () => {
    setCookie(COOKIE_NAME, 'accepted', COOKIE_MAX_AGE);
    dismiss();
  });

  document.getElementById('cookie-decline').addEventListener('click', () => {
    setCookie(COOKIE_NAME, 'declined', COOKIE_MAX_AGE);
    dismiss();
  });
})();
