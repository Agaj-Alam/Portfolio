import fs from 'fs';
import { pipeline } from 'stream/promises';

async function download() {
  const res = await fetch('https://raw.githubusercontent.com/pmndrs/drei-assets/master/mac-draco.glb');
  if (!res.ok) throw new Error(`unexpected response ${res.statusText}`);
  await pipeline(res.body, fs.createWriteStream('public/mac-draco.glb'));
  console.log('Downloaded mac-draco.glb successfully');
}

download().catch(console.error);
