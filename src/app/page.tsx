import Image from "next/image";
import { loadData } from './lib/data';
import { collectMaterialOptions, collectDamageMorphologyOptions, type DamageRecord } from './lib/client-data';
import MainApp from './components/MainApp';

export default async function Home() {
  const data = await loadData();
  const materialOptions = collectMaterialOptions(data);
  const damageMorphologyOptions = collectDamageMorphologyOptions(data);
  return <MainApp initialData={data} materialOptions={materialOptions} damageMorphologyOptions={damageMorphologyOptions} />;
}
