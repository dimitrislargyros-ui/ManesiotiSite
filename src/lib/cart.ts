// Shared wholesale inquiry "cart" — no prices, no checkout. Just the set of
// products a visitor wants to ask about, carried from the catalog into the
// order form. Backed by localStorage so it survives navigation between pages
// (this is a static, non-SPA site — every navigation is a full page load).

export interface CartItem {
  code: string;
  name: string;
  brand?: string | null;
}

const STORAGE_KEY = 'manesiotis_order_products';
export const CART_EVENT = 'cart:change';

function readRaw(): CartItem[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeRaw(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage unavailable (private browsing) — mutation stays in-memory
    // for this page load only; the cart:change event still fires so any UI
    // on the current page stays in sync.
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: { items } }));
  }
}

export function getCart(): CartItem[] {
  return readRaw();
}

export function getCartCount(): number {
  return readRaw().length;
}

export function isInCart(code: string): boolean {
  return readRaw().some((i) => i.code === code);
}

export function addToCart(item: CartItem) {
  const items = readRaw();
  if (items.some((i) => i.code === item.code)) return;
  items.push(item);
  writeRaw(items);
}

export function removeFromCart(code: string) {
  writeRaw(readRaw().filter((i) => i.code !== code));
}

/** Adds if absent, removes if present. Returns the new "is in cart" state. */
export function toggleCart(item: CartItem): boolean {
  if (isInCart(item.code)) {
    removeFromCart(item.code);
    return false;
  }
  addToCart(item);
  return true;
}

export function clearCart() {
  writeRaw([]);
}
