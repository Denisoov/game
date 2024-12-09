import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'

const phasermsg = () => {
  return {
    name: 'phasermsg',
    buildStart() {
      process.stdout.write(`Building for production...\n`);
    },
    buildEnd() {
      const line = "---------------------------------------------------------";
      const msg = `❤️❤️❤️ Farfor Games ❤️❤️❤️`;
      process.stdout.write(`${line}\n${msg}\n${line}\n`);

      process.stdout.write(`✨ Done ✨\n`);
    }
  }
}

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    phasermsg()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../src', import.meta.url))
    }
  },
  logLevel: 'warning',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ['phaser']
        }
      }
    },
  }
})