import fs from 'fs/promises';
import path from 'path';

export type Material = {
  category: string;
  grades: string[];
};

export type DamageRecord = {
  id: string;
  name_ko?: string;
  name_en?: string;
  api_571_section?: string;
  summary?: string;
  description?: string;
  affected_materials?: Material[];
  temperature_range_celsius?: { min: number | null; max: number | null };
  damage_morphology?: string[];
  crack_features?: string[];
  critical_factors?: string[];
  prevention_mitigation?: string[];
  inspection_methods?: string[];
  image_url?: string;
};

let cache: DamageRecord[] | null = null;

export async function loadData(): Promise<DamageRecord[]> {
  if (cache) return cache;
  // Try multiple paths for different deployment scenarios
  const possiblePaths = [
    // For local development (parent directory)
    path.join(process.cwd(), '..', 'damage_mechanisms.normalized.json'),
    // For deployment in public folder
    path.join(process.cwd(), 'public', 'damage_mechanisms.json'),
    // Fallback
    path.join(process.cwd(), 'damage_mechanisms.normalized.json'),
  ];
  
  let raw: string | undefined;
  for (const jsonPath of possiblePaths) {
    try {
      raw = await fs.readFile(jsonPath, 'utf8');
      break;
    } catch {
      // Try next path
      continue;
    }
  }
  
  if (!raw) {
    throw new Error(`Could not find damage mechanisms data file. Tried: ${possiblePaths.join(', ')}`);
  }
  const data = JSON.parse(raw) as unknown;
  if (!Array.isArray(data)) throw new Error('Data is not an array');

  // The normalized file can still contain nested arrays; flatten deeply.
  const flattenDeep = (arr: unknown[]): unknown[] =>
    arr.flatMap((item) => (Array.isArray(item) ? flattenDeep(item) : item));

  const flattened = flattenDeep(data)
    // keep only object-like entries with an id
    .filter((x) => x && typeof x === 'object' && 'id' in x) as DamageRecord[];

  cache = flattened;
  return cache;
}
