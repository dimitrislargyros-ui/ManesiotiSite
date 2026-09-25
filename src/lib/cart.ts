// Shared wholesale inquiry "cart" — no prices, no checkout. Just the products
// (and quantities) a visitor wants to ask about, carried from the catalog
// into the order form. Backed by localStorage so it survives navigation
// between pages (this is a static, non-SPA site — every navigation is a full
// page load).

export interface CartItem {
  code: string;
  name: string;
  brand?: string | null;
  qty: number;
}

export type CartItemInput = Omit<CartItem, 'qty'>;

const STORAGE_KEY = 'manesiotis_order_products';
export const CART_EVENT = 'cart:change';

function readRaw(): CartItem[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Back-compat: an earlier version stored items with no `qty` field.
    return (parsed as CartItem[]).map((i) => ({ ...i, qty: i.qty && i.qty > 0 ? i.qty : 1 }));
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

/** Total units across all line items (what a cart badge should show). */
export function getCartCount(): number {
  return readRaw().reduce((sum, i) => sum + i.qty, 0);
}

export function getQty(code: string): number {
  return readRaw().find((i) => i.code === code)?.qty ?? 0;
}

export function isInCart(code: string): boolean {
  return getQty(code) > 0;
}

/** Adds `qty` units (default 1) of an item, creating the line if absent. */
export function addToCart(item: CartItemInput, qty = 1) {
  const items = readRaw();
  const existing = items.find((i) => i.code === item.code);
  if (existing) {
    existing.qty += qty;
  } else {
    items.push({ ...item, qty });
  }
  writeRaw(items);
}

/** Sets a line's quantity outright; qty <= 0 removes the line. */
export function setQty(item: CartItemInput, qty: number) {
  const items = readRaw();
  const existing = items.find((i) => i.code === item.code);
  if (qty <= 0) {
    writeRaw(items.filter((i) => i.code !== item.code));
    return;
  }
  if (existing) {
    existing.qty = qty;
  } else {
    items.push({ ...item, qty });
  }
  writeRaw(items);
}

/** Increments (or decrements, with a negative delta) a line's quantity. */
export function changeQty(item: CartItemInput, delta: number) {
  setQty(item, getQty(item.code) + delta);
}

export function removeFromCart(code: string) {
  writeRaw(readRaw().filter((i) => i.code !== code));
}

export function clearCart() {
  writeRaw([]);
}
