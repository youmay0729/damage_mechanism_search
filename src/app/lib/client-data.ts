// Client-side data utilities (types and functions that don't use server-only modules)

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

export function recordMatches(
  rec: DamageRecord,
  opts: { 
    temperature?: number | null; 
    materialCategory?: string | null; 
    grade?: string | null;
    damageMorphology?: string | null;
    textQuery?: string | null;
  }
): boolean {
  const { temperature, materialCategory, grade, damageMorphology, textQuery } = opts;

  if (temperature != null && rec.temperature_range_celsius) {
    const { min, max } = rec.temperature_range_celsius;
    if (min != null && temperature < min) return false;
    if (max != null && temperature > max) return false;
  }

  if (materialCategory || grade) {
    const mats = rec.affected_materials || [];

    // Treat these categories as wildcards that apply broadly
    const WILDCARD_CATEGORIES = new Set([
      'ALL',
      'ALL_METALS',
      'ALL_ALLOY',
      'ALL_ALLOYS', // handle possible variant
    ]);

    const eq = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

    // Determine if this record applies to the selected material category,
    // either explicitly or via a wildcard category.
    let matchesMaterial = true;
    let hasWildcard = false;

    if (materialCategory) {
      matchesMaterial = mats.some((m) => {
        const isWildcard = WILDCARD_CATEGORIES.has(m.category.toUpperCase());
        if (isWildcard) {
          hasWildcard = true;
          return true;
        }
        const isExplicit = eq(m.category, materialCategory);
        return isExplicit;
      });
    }

    if (!matchesMaterial) return false;

    // Grade logic:
    // - If grade is specified with a selected category, accept when:
    //   a) There is an explicit entry for that category containing the grade, OR
    //   b) There is a wildcard entry (assumed to apply to all grades in the selected category)
    // - If only grade is specified (no category), fall back to simple grade presence anywhere.
    if (grade) {
      const gradeLower = grade.toLowerCase();
      if (materialCategory) {
        const hasGradeInExplicit = mats.some(
          (m) => eq(m.category, materialCategory) && (m.grades || []).some((g) => g.toLowerCase() === gradeLower)
        );
        if (!hasGradeInExplicit && !hasWildcard) return false;
      } else {
        const hasAnyGrade = mats.some((m) => (m.grades || []).some((g) => g.toLowerCase() === gradeLower));
        if (!hasAnyGrade) return false;
      }
    }
  }

  if (damageMorphology) {
    const morphologies = rec.damage_morphology || [];
    const hasMorphology = morphologies.some((m) => 
      m.toLowerCase() === damageMorphology.toLowerCase()
    );
    if (!hasMorphology) return false;
  }

  if (textQuery && textQuery.trim() !== '') {
    const q = textQuery.toLowerCase();
    const haystacks = [
      rec.id,
      rec.name_ko,
      rec.name_en,
      rec.summary,
      rec.description,
    ].filter(Boolean) as string[];
    const match = haystacks.some((h) => h.toLowerCase().includes(q));
    if (!match) return false;
  }

  return true;
}

export function collectMaterialOptions(data: DamageRecord[]): {
  categories: string[];
  gradesByCategory: Record<string, string[]>;
} {
  const categories = new Set<string>();
  const gradesByCategory: Record<string, Set<string>> = {};
  for (const rec of data) {
    for (const m of rec.affected_materials || []) {
      categories.add(m.category);
      if (!gradesByCategory[m.category]) gradesByCategory[m.category] = new Set<string>();
      for (const g of m.grades || []) gradesByCategory[m.category].add(g);
    }
  }
  return {
    categories: Array.from(categories).sort(),
    gradesByCategory: Object.fromEntries(
      Object.entries(gradesByCategory).map(([k, v]) => [k, Array.from(v).sort()])
    ),
  };
}

export function collectDamageMorphologyOptions(data: DamageRecord[]): string[] {
  const morphologies = new Set<string>();
  for (const rec of data) {
    for (const morphology of rec.damage_morphology || []) {
      morphologies.add(morphology);
    }
  }
  return Array.from(morphologies).sort();
}
