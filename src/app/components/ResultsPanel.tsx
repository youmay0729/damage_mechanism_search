'use client';

import { type DamageRecord } from '../lib/client-data';

export default function ResultsPanel({
  mechanisms,
  onSelect,
}: {
  mechanisms: DamageRecord[];
  onSelect: (mechanism: DamageRecord) => void;
}) {
  // Filter out entries without any meaningful display content
  const visibleMechanisms = (mechanisms || []).filter((m) => {
    const hasTitle = Boolean((m.name_ko && m.name_ko.trim()) || (m.name_en && m.name_en.trim()));
    const hasContent = Boolean((m.summary && m.summary.trim()) || (m.description && m.description.trim()));
    return hasTitle || hasContent;
  });

  if (visibleMechanisms.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        color: '#666'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: 18, marginBottom: 8 }}>검색 결과가 없습니다</h3>
          <p>다른 조건으로 검색해 보세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px', overflowY: 'auto', height: '100%' }}>
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {visibleMechanisms.map((mechanism, index) => (
          <MechanismCard
            key={`${mechanism.id}-${mechanism.name_en || mechanism.name_ko || 'unknown'}-${index}`}
            mechanism={mechanism}
            onClick={() => onSelect(mechanism)}
          />
        ))}
      </div>
    </div>
  );
}

function MechanismCard({
  mechanism,
  onClick,
}: {
  mechanism: DamageRecord;
  onClick: () => void;
}) {
  return (
    <article
      onClick={onClick}
      style={{
        border: '1px solid #e5e5e5',
        borderRadius: 8,
        padding: 20,
        cursor: 'pointer',
        background: '#fff',
        transition: 'all 0.2s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#0366d6';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#e5e5e5';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
      }}
    >
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#111' }}>
        {mechanism.name_ko || mechanism.name_en || '제목 없음'}
        {mechanism.id && String(mechanism.id).trim() !== '' && (
          <span style={{ color: '#666', fontWeight: 400, fontSize: 14, marginLeft: 8 }}>
            ({mechanism.id})
          </span>
        )}
      </h2>
      
      {mechanism.summary && (
        <p style={{ 
          marginBottom: 12, 
          color: '#555', 
          lineHeight: 1.5,
          fontSize: 14
        }}>
          {mechanism.summary}
        </p>
      )}
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        {mechanism.api_571_section && (
          <span style={{
            fontSize: 12,
            background: '#f0f9ff',
            color: '#0366d6',
            padding: '4px 8px',
            borderRadius: 4,
            fontWeight: 500
          }}>
            API 571 {mechanism.api_571_section}
          </span>
        )}
        
        {mechanism.temperature_range_celsius && (
          <span style={{
            fontSize: 12,
            background: '#fef3c7',
            color: '#92400e',
            padding: '4px 8px',
            borderRadius: 4,
            fontWeight: 500
          }}>
            온도: {mechanism.temperature_range_celsius.min ?? '-'} ~ {mechanism.temperature_range_celsius.max ?? '-'} ℃
          </span>
        )}
        
        {mechanism.damage_morphology && mechanism.damage_morphology.length > 0 && (
          <span style={{
            fontSize: 12,
            background: '#f3e8ff',
            color: '#7c3aed',
            padding: '4px 8px',
            borderRadius: 4,
            fontWeight: 500
          }}>
            형태: {mechanism.damage_morphology.slice(0, 2).join(', ')}
            {mechanism.damage_morphology.length > 2 && '...'}
          </span>
        )}
      </div>
      
      {mechanism.affected_materials && mechanism.affected_materials.length > 0 && (
        <div style={{ 
          fontSize: 12, 
          color: '#666',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4
        }}>
          <span style={{ fontWeight: 600 }}>재질:</span>
          {mechanism.affected_materials.slice(0, 3).map((material, index) => (
            <span key={`${mechanism.id}-material-${index}-${material.category}`}>
              {material.category}
              {material.grades && material.grades.length > 0 && (
                <span style={{ color: '#999' }}>
                  ({material.grades.slice(0, 2).join(', ')}
                  {material.grades.length > 2 && '...'})
                </span>
              )}
              {index < mechanism.affected_materials!.length - 1 && ', '}
            </span>
          ))}
          {mechanism.affected_materials.length > 3 && (
            <span style={{ color: '#999' }}>외 {mechanism.affected_materials.length - 3}개</span>
          )}
        </div>
      )}
    </article>
  );
}
