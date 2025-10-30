# Damage Mechanisms Finder (Next.js)

## Quick start

```bash
cd dm-app
npm run dev
```

Then open `http://localhost:3000`.

## Data source

This app reads `../damage_mechanisms.normalized.json` at runtime on the server. Ensure the file exists next to the project root as generated earlier.

## How it works
- Home page provides a form to enter temperature (°C), select material category, and optional grade.
- Submitting navigates to `/results` where the dataset is filtered by:
  - Temperature within each record's `temperature_range_celsius` min/max if present
  - Matching `affected_materials.category` (case-insensitive)
  - Matching an exact `grades` name if provided

## Scripts
- `npm run dev`: Start dev server
- `npm run build`: Build for production
- `npm start`: Run production server
