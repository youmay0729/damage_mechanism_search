'use client';

type MaterialOptions = {
  categories: string[];
  gradesByCategory: Record<string, string[]>;
};

type FilterState = {
  temperature: number | null;
  category: string | null;
  grade: string | null;
  damageMorphology: string | null;
  textQuery: string;
};

export default function FilterPanel({
  materialOptions,
  damageMorphologyOptions,
  filters,
  onFilterChange,
}: {
  materialOptions: MaterialOptions;
  damageMorphologyOptions: string[];
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
}) {
  const availableGrades = filters.category ? materialOptions.gradesByCategory[filters.category] || [] : [];

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 20, 
      width: '100%',
      minWidth: 0,
      overflow: 'hidden'
    }}>
      {/* Text Search */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 8,
        width: '100%',
        minWidth: 0
      }}>
        <label htmlFor="textQuery" style={{ fontSize: 14, fontWeight: 600 }}>
          이름/설명 검색
        </label>
        <input
          id="textQuery"
          type="text"
          placeholder="예: HTHA, 수소, cracking..."
          value={filters.textQuery}
          onChange={(e) => onFilterChange({ textQuery: e.target.value })}
          style={{
            padding: '10px 12px',
            border: '1px solid #ddd',
            borderRadius: 6,
            fontSize: 14,
            background: '#fff',
            width: '100%',
            boxSizing: 'border-box'
          }}
        />
      </div>
      {/* Temperature Filter */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 8,
        width: '100%',
        minWidth: 0
      }}>
        <label htmlFor="temperature" style={{ fontSize: 14, fontWeight: 600 }}>
          온도 (℃)
        </label>
        <input
          id="temperature"
          type="number"
          placeholder="예: 450"
          value={filters.temperature || ''}
          onChange={(e) => {
            const value = e.target.value === '' ? null : Number(e.target.value);
            onFilterChange({ temperature: value });
          }}
          style={{
            padding: '10px 12px',
            border: '1px solid #ddd',
            borderRadius: 6,
            fontSize: 14,
            background: '#fff',
            width: '100%',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Material Category Filter */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 8,
        width: '100%',
        minWidth: 0
      }}>
        <label htmlFor="category" style={{ fontSize: 14, fontWeight: 600 }}>
          재질 카테고리
        </label>
        <select
          id="category"
          value={filters.category || ''}
          onChange={(e) => {
            const value = e.target.value === '' ? null : e.target.value;
            onFilterChange({ category: value });
          }}
          style={{
            padding: '10px 12px',
            border: '1px solid #ddd',
            borderRadius: 6,
            fontSize: 14,
            background: '#fff',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <option value="">전체</option>
          {materialOptions.categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Grade Filter - Dynamic based on category */}
      {filters.category && (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 8,
          width: '100%',
          minWidth: 0
        }}>
          <label htmlFor="grade" style={{ fontSize: 14, fontWeight: 600 }}>
            강종/등급
          </label>
          <select
            id="grade"
            value={filters.grade || ''}
            onChange={(e) => {
              const value = e.target.value === '' ? null : e.target.value;
              onFilterChange({ grade: value });
            }}
            style={{
              padding: '10px 12px',
              border: '1px solid #ddd',
              borderRadius: 6,
              fontSize: 14,
              background: '#fff',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <option value="">전체</option>
            {availableGrades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Damage Morphology Filter */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 8,
        width: '100%',
        minWidth: 0
      }}>
        <label htmlFor="damageMorphology" style={{ fontSize: 14, fontWeight: 600 }}>
          손상 형태
        </label>
        <select
          id="damageMorphology"
          value={filters.damageMorphology || ''}
          onChange={(e) => {
            const value = e.target.value === '' ? null : e.target.value;
            onFilterChange({ damageMorphology: value });
          }}
          style={{
            padding: '10px 12px',
            border: '1px solid #ddd',
            borderRadius: 6,
            fontSize: 14,
            background: '#fff',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <option value="">전체</option>
          {damageMorphologyOptions.map((morphology) => (
            <option key={morphology} value={morphology}>
              {morphology}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters Button */}
      <button
        type="button"
        onClick={() => onFilterChange({ temperature: null, category: null, grade: null, damageMorphology: null, textQuery: '' })}
        style={{
          padding: '12px 16px',
          background: '#f5f5f5',
          color: '#333',
          border: '1px solid #ddd',
          borderRadius: 6,
          fontSize: 14,
          cursor: 'pointer',
          marginTop: 8,
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        필터 초기화
      </button>
    </div>
  );
}
