import type { Animal } from './zootrofes-products';

// Unsplash photo IDs per animal type. dog/cat/bird/accessories IDs were specified
// by the client brief. small_animal has no client-provided ID — substituted with a
// verified real Unsplash photo of small-pet/rodent bedding (see build report).
const PHOTO_IDS: Record<Animal, string> = {
  dog: 'photo-1601758124510-52d02ddb7cbd',
  cat: 'photo-1514888286974-6c03e2ca1dba',
  bird: 'photo-1552728089-57bdde30beb3',
  accessories: 'photo-1589924691995-400dc9ecc119',
  small_animal: 'photo-1425082661705-1834bfd09dca',
};

export function imageFor(animal: Animal, width: number) {
  const id = PHOTO_IDS[animal];
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;
}

export const ANIMAL_LABELS: Record<Animal, string> = {
  dog: 'Σκύλος',
  cat: 'Γάτα',
  bird: 'Πτηνά',
  small_animal: 'Τρωκτικό',
  accessories: 'Αξεσουάρ',
};
