import { loadData, recordMatches, type DamageRecord } from '../lib/data';
import Link from 'next/link';

function parseQuery(searchParams: URLSearchParams): { t: number | null; c: string | null; g: string | null } {
  const tRaw = searchParams.get('t');
  const t = tRaw != null && tRaw !== '' ? Number(tRaw) : null;
  return {
    t: Number.isFinite(t as number) ? (t as number) : null,
    c: searchParams.get('c'),
    g: searchParams.get('g'),
  };
}

export default async function Results({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const params = new URLSearchParams(Object.entries(searchParams).flatMap(([k, v]) => (Array.isArray(v) ? v.map((vv) => [k, vv]) : v != null ? [[k, v]] : [])));
  const { t, c, g } = parseQuery(params);
  const data = await loadData();
  const filtered = data.filter((rec) => recordMatches(rec, { temperature: t, materialCategory: c, grade: g }));

  return (
    <main style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>검색 결과</h1>
      <div style={{ marginBottom: 16 }}>
        <Link href="/" style={{ color: '#0366d6' }}>← 조건 변경</Link>
      </div>
      <p style={{ marginBottom: 16 }}>총 {filtered.length}건</p>
      <div style={{ display: 'grid', gap: 12 }}>
        {filtered.map((rec) => (
          <RecordCard key={rec.id} rec={rec} />
        ))}
      </div>
    </main>
  );
}

function RecordCard({ rec }: { rec: DamageRecord }) {
  return (
    <article style={{ border: '1px solid #e5e5e5', borderRadius: 8, padding: 16 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700 }}>{rec.name_ko || rec.name_en} <span style={{ color: '#666', fontWeight: 400 }}>({rec.id})</span></h2>
      {rec.summary && <p style={{ marginTop: 8 }}>{rec.summary}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
        {rec.api_571_section && (
          <span style={{ fontSize: 12, background: '#f5f5f5', padding: '4px 6px', borderRadius: 4 }}>API 571 {rec.api_571_section}</span>
        )}
        {rec.temperature_range_celsius && (
          <span style={{ fontSize: 12, background: '#f5f5f5', padding: '4px 6px', borderRadius: 4 }}>
            온도: {rec.temperature_range_celsius.min ?? '-'} ~ {rec.temperature_range_celsius.max ?? '-'} ℃
          </span>
        )}
      </div>
      {rec.affected_materials && rec.affected_materials.length > 0 && (
        <div style={{ marginTop: 8, fontSize: 12, color: '#555' }}>
          재질: {rec.affected_materials.map((m) => `${m.category}${m.grades && m.grades.length ? ` (${m.grades.slice(0, 3).join(', ')}${m.grades.length > 3 ? '…' : ''})` : ''}`).join(' · ')}
        </div>
      )}
    </article>
  );
}




