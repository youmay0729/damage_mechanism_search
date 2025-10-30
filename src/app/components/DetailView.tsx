'use client';

import { type DamageRecord } from '../lib/client-data';

export default function DetailView({
  mechanism,
  onBack,
}: {
  mechanism: DamageRecord;
  onBack: () => void;
}) {
  return (
    <div style={{ padding: '16px', overflowY: 'auto', height: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid #e5e5e5' }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: '1px solid #ddd',
            borderRadius: 6,
            padding: '8px 12px',
            cursor: 'pointer',
            marginBottom: 16,
            fontSize: 14,
            color: '#666'
          }}
        >
          ← 목록으로 돌아가기
        </button>
        
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          {mechanism.name_ko || mechanism.name_en}
        </h1>
        <p style={{ color: '#666', fontSize: 16 }}>
          ID: {mechanism.id}
          {mechanism.api_571_section && (
            <span style={{ marginLeft: 16, background: '#f0f9ff', color: '#0366d6', padding: '2px 8px', borderRadius: 4, fontSize: 14 }}>
              API 571 {mechanism.api_571_section}
            </span>
          )}
        </p>
      </div>

      {/* Summary */}
      {mechanism.summary && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: '#111' }}>요약</h2>
          <p style={{ lineHeight: 1.6, color: '#555' }}>{mechanism.summary}</p>
        </section>
      )}

      {/* Description */}
      {mechanism.description && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: '#111' }}>상세 설명</h2>
          <p style={{ lineHeight: 1.6, color: '#555' }}>{mechanism.description}</p>
        </section>
      )}

      {/* Temperature Range */}
      {mechanism.temperature_range_celsius && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: '#111' }}>온도 범위</h2>
          <div style={{ 
            background: '#fef3c7', 
            padding: 16, 
            borderRadius: 8,
            border: '1px solid #fbbf24'
          }}>
            <p style={{ margin: 0, fontSize: 16, color: '#92400e' }}>
              {mechanism.temperature_range_celsius.min ?? '제한 없음'} ~ {mechanism.temperature_range_celsius.max ?? '제한 없음'} ℃
            </p>
          </div>
        </section>
      )}

      {/* Affected Materials */}
      {mechanism.affected_materials && mechanism.affected_materials.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: '#111' }}>영향받는 재질</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {mechanism.affected_materials.map((material, index) => (
              <div key={`${mechanism.id}-material-${index}-${material.category}`} style={{
                background: '#f8fafc',
                padding: 16,
                borderRadius: 8,
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: '#1e293b' }}>
                  {material.category}
                </h3>
                {material.grades && material.grades.length > 0 && (
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 8, color: '#475569' }}>강종/등급:</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {material.grades.map((grade, gradeIndex) => (
                        <span key={`${mechanism.id}-grade-${index}-${gradeIndex}-${grade}`} style={{
                          background: '#e2e8f0',
                          color: '#475569',
                          padding: '4px 8px',
                          borderRadius: 4,
                          fontSize: 12,
                          fontWeight: 500
                        }}>
                          {grade}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Damage Morphology */}
      {mechanism.damage_morphology && mechanism.damage_morphology.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: '#111' }}>손상 형태</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {mechanism.damage_morphology.map((morphology, index) => (
              <span key={`${mechanism.id}-morphology-${index}-${morphology}`} style={{
                background: '#f3e8ff',
                color: '#7c3aed',
                padding: '6px 12px',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 500
              }}>
                {morphology}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Crack Features */}
      {mechanism.crack_features && mechanism.crack_features.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: '#111' }}>균열 특징</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {mechanism.crack_features.map((feature, index) => (
              <span key={`${mechanism.id}-crack-${index}-${feature}`} style={{
                background: '#fef2f2',
                color: '#dc2626',
                padding: '6px 12px',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 500
              }}>
                {feature}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Critical Factors */}
      {mechanism.critical_factors && mechanism.critical_factors.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: '#111' }}>중요 인자</h2>
          <ul style={{ paddingLeft: 20, lineHeight: 1.6, color: '#555' }}>
            {mechanism.critical_factors.map((factor, index) => (
              <li key={`${mechanism.id}-factor-${index}-${factor}`} style={{ marginBottom: 8 }}>{factor}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Prevention & Mitigation */}
      {mechanism.prevention_mitigation && mechanism.prevention_mitigation.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: '#111' }}>예방 및 완화 방법</h2>
          <ul style={{ paddingLeft: 20, lineHeight: 1.6, color: '#555' }}>
            {mechanism.prevention_mitigation.map((method, index) => (
              <li key={`${mechanism.id}-prevention-${index}-${method}`} style={{ marginBottom: 8 }}>{method}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Inspection Methods */}
      {mechanism.inspection_methods && mechanism.inspection_methods.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: '#111' }}>검사 방법</h2>
          <ul style={{ paddingLeft: 20, lineHeight: 1.6, color: '#555' }}>
            {mechanism.inspection_methods.map((method, index) => (
              <li key={`${mechanism.id}-inspection-${index}-${method}`} style={{ marginBottom: 8 }}>{method}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
