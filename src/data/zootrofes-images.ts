import type { Animal, Product } from './zootrofes-products';

// Real product photos sourced from the live manesiotis.gr site, matched to
// catalog codes by cross-referencing brand + variant + package weight (see
// build report for methodology and the conservative-match rules used).
// Codes not in this map have no confidently-matched real photo — they fall
// back to a real representative photo for their animal type below, never to
// a placeholder or a wrong specific product's photo.
const PRODUCT_IMAGES: Partial<Record<string, string>> = {
  '767': '/images/products/767.jpg',
  '768': '/images/products/768.jpg',
  '769': '/images/products/769.jpg',
  '766': '/images/products/766.jpg',
  '798': '/images/products/798.jpg',
  '797': '/images/products/797.jpg',
  '819': '/images/products/819.jpg',
  '715': '/images/products/715.jpg',
  '696': '/images/products/696.jpg',
  '785': '/images/products/785.jpg',
  '714': '/images/products/714.jpg',
  '713': '/images/products/713.jpg',
  '886': '/images/products/886.jpg',
  '887': '/images/products/887.png',
  '750': '/images/products/750.jpg',
  '681': '/images/products/681.jpg',
  '716': '/images/products/716.jpg',
  '749': '/images/products/749.jpg',
  '126': '/images/products/126.jpg',
  '182': '/images/products/182.jpg',
  '173': '/images/products/173.jpg',
  '159': '/images/products/159.jpg',
  '780': '/images/products/780.png',
  '795': '/images/products/795.jpg',
  '880': '/images/products/880.jpg',
};

// Returns a real photo only when the product was confidently matched above.
// Deliberately does NOT fall back to another specific product's real photo —
// e.g. showing a real "Fluffy" bag under a "Petnature" product name would be
// factually wrong, not just generic. Unmatched products render a neutral
// on-brand icon placeholder instead (see ProductThumb in the catalog page).
export function imageFor(product: Product): string | null {
  return PRODUCT_IMAGES[product.code] ?? null;
}

export const ANIMAL_LABELS: Record<Animal, string> = {
  dog: 'Σκύλος',
  cat: 'Γάτα',
  bird: 'Πτηνά',
  small_animal: 'Τρωκτικό',
  accessories: 'Αξεσουάρ',
};
