import type { Animal, Product } from './zootrofes-products';

// Real product photos. Most are sourced from the client's own supplier/Drive
// photo library (organized by brand+animal), matched to catalog codes by
// cross-referencing brand + flavor/variant against each product's name — see
// the build report for methodology and the conservative-match rules used.
// A handful of codes not covered by the Drive library were kept from an
// earlier pass that scraped the live manesiotis.gr site.
// Codes not in this map have no confidently-matched real photo — they fall
// back to a neutral icon placeholder in the catalog page, never to a wrong
// specific product's photo.
const PRODUCT_IMAGES: Partial<Record<string, string>> = {
  '108': '/images/products/108.jpg',
  '122': '/images/products/122.jpeg',
  '126': '/images/products/126.jpg',
  '142': '/images/products/142.png',
  '146': '/images/products/146.png',
  '148': '/images/products/148.jpg',
  '153': '/images/products/153.jpg',
  '157': '/images/products/157.webp',
  '159': '/images/products/159.jpg',
  '173': '/images/products/173.jpg',
  '182': '/images/products/182.jpg',
  '183': '/images/products/183.jpeg',
  '646': '/images/products/646.webp',
  '665': '/images/products/665.png',
  '681': '/images/products/681.jpg',
  '695': '/images/products/695.webp',
  '696': '/images/products/696.jpg',
  '713': '/images/products/713.jpg',
  '714': '/images/products/714.jpg',
  '715': '/images/products/715.jpg',
  '716': '/images/products/716.jpg',
  '749': '/images/products/749.jpg',
  '750': '/images/products/750.jpg',
  '763': '/images/products/763.webp',
  '765': '/images/products/765.webp',
  '766': '/images/products/766.jpg',
  '767': '/images/products/767.jpg',
  '768': '/images/products/768.jpg',
  '769': '/images/products/769.jpg',
  '774': '/images/products/774.avif',
  '779': '/images/products/779.png',
  '780': '/images/products/780.png',
  '781': '/images/products/781.png',
  '783': '/images/products/783.png',
  '784': '/images/products/784.png',
  '785': '/images/products/785.jpg',
  '792': '/images/products/792.png',
  '794': '/images/products/794.png',
  '795': '/images/products/795.png',
  '797': '/images/products/797.jpg',
  '798': '/images/products/798.jpg',
  '799': '/images/products/799.jpg',
  '801': '/images/products/801.webp',
  '802': '/images/products/802.webp',
  '804': '/images/products/804.webp',
  '805': '/images/products/805.webp',
  '806': '/images/products/806.webp',
  '807': '/images/products/807.webp',
  '808': '/images/products/808.webp',
  '809': '/images/products/809.webp',
  '810': '/images/products/810.webp',
  '811': '/images/products/811.avif',
  '812': '/images/products/812.jpg',
  '813': '/images/products/813.webp',
  '814': '/images/products/814.jpg',
  '816': '/images/products/816.jpeg',
  '819': '/images/products/819.jpg',
  '820': '/images/products/820.webp',
  '821': '/images/products/821.avif',
  '822': '/images/products/822.jpg',
  '823': '/images/products/823.webp',
  '824': '/images/products/824.webp',
  '826': '/images/products/826.jpeg',
  '827': '/images/products/827.webp',
  '830': '/images/products/830.webp',
  '831': '/images/products/831.webp',
  '832': '/images/products/832.webp',
  '833': '/images/products/833.webp',
  '837': '/images/products/837.png',
  '850': '/images/products/850.png',
  '851': '/images/products/851.png',
  '870': '/images/products/870.jpg',
  '871': '/images/products/871.jpg',
  '872': '/images/products/872.jpg',
  '873': '/images/products/873.jpg',
  '880': '/images/products/880.jpg',
  '881': '/images/products/881.webp',
  '882': '/images/products/882.webp',
  '883': '/images/products/883.webp',
  '884': '/images/products/884.webp',
  '885': '/images/products/885.webp',
  '886': '/images/products/886.jpg',
  '887': '/images/products/887.jpg',
  '896': '/images/products/896.webp',
  '903': '/images/products/903.png',
  '904': '/images/products/904.png',
  '905': '/images/products/905.png',
  '906': '/images/products/906.png',
  '907': '/images/products/907.png',
  '908': '/images/products/908.png',
  '909': '/images/products/909.png',
  '910': '/images/products/910.png',
  '911': '/images/products/911.png',
  '912': '/images/products/912.png',
  '913': '/images/products/913.png',
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
