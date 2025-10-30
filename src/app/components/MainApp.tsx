'use client';

import { useState, useMemo } from 'react';
import { recordMatches, type DamageRecord } from '../lib/client-data';
import FilterPanel from './FilterPanel';
import ResultsPanel from './ResultsPanel';
import DetailView from './DetailView';

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

export default function MainApp({
  initialData,
  materialOptions,
  damageMorphologyOptions,
}: {
  initialData: DamageRecord[];
  materialOptions: MaterialOptions;
  damageMorphologyOptions: string[];
}) {
  const [filters, setFilters] = useState<FilterState>({
    temperature: null,
    category: null,
    grade: null,
    damageMorphology: null,
    textQuery: '',
  });
  
  const [selectedMechanism, setSelectedMechanism] = useState<DamageRecord | null>(null);

  const filteredData = useMemo(() => {
    return initialData.filter((record) =>
      recordMatches(record, {
        temperature: filters.temperature,
        materialCategory: filters.category,
        grade: filters.grade,
        damageMorphology: filters.damageMorphology,
        textQuery: filters.textQuery,
      })
    );
  }, [initialData, filters]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };
      // Reset grade if category changed
      if (newFilters.category !== undefined && newFilters.category !== prev.category) {
        updated.grade = null;
      }
      return updated;
    });
    // Clear selected mechanism when filters change to show results panel
    setSelectedMechanism(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      {/* Top Title */}
      <div style={{ 
        position: 'relative',
        padding: '60px 24px',
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80") center/cover',
        color: '#fff',
        textAlign: 'center',
        borderBottom: '1px solid #e5e5e5'
      }}>
        <h1 style={{ 
          fontSize: 'clamp(24px, 4vw, 36px)', 
          fontWeight: 700, 
          margin: 0, 
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
          letterSpacing: '-0.02em'
        }}>
          손상 매커니즘 검색
        </h1>
        <p style={{ 
          margin: '16px 0 0 0', 
          fontSize: 'clamp(14px, 2.5vw, 18px)',
          textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          온도, 재질, 손상 형태를 선택해 해당하는 손상 메커니즘을 검색하세요.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Left Panel - Filters */}
        <div className="left-panel">
        
        <FilterPanel
          materialOptions={materialOptions}
          damageMorphologyOptions={damageMorphologyOptions}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        
          <div style={{ marginTop: 24, padding: 16, background: '#fff', borderRadius: 8, border: '1px solid #e5e5e5' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>검색 결과</h3>
            <p style={{ color: '#666' }}>총 {filteredData.length}건의 메커니즘</p>
          </div>
        </div>

        {/* Right Panel - Results or Detail */}
        <div className="right-panel">
          {selectedMechanism ? (
            <DetailView 
              mechanism={selectedMechanism} 
              onBack={() => setSelectedMechanism(null)}
            />
          ) : (
            <ResultsPanel 
              mechanisms={filteredData}
              onSelect={setSelectedMechanism}
            />
          )}
        </div>
      </div>
    </div>
  );
}
