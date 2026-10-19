import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Emits sw.js with the hashed build files added to its precache list.
function serviceWorker() {
  return {
    name: 'sk-service-worker',
    apply: (_, env) => env.command === 'build' && !env.isSsrBuild,
    generateBundle(_, bundle) {
      const assets = Object.keys(bundle).filter((f) => /\.(js|css)$/.test(f)).map((f) => `./${f}`);
      const id = createHash('sha1').update(assets.join()).digest('hex').slice(0, 8);
      const source = readFileSync(new URL('./src/sw.js', import.meta.url), 'utf8')
        .replace('__BUILD_ASSETS__', JSON.stringify(assets))
        .replace('__BUILD_ID__', id);
      this.emitFile({ type: 'asset', fileName: 'sw.js', source });
    },
  };
}

export default defineConfig({
  plugins: [react(), serviceWorker()],
});
