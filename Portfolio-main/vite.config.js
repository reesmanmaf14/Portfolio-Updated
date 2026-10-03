import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Relative base so the build works at https://reesmanmaf14.github.io/Portfolio/ (or any sub-path)
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    // public/assets holds the CV + images at their original URLs; keep bundled files separate
    assetsDir: 'static',
  },
});
