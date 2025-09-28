import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Hapus atau komen jika 'lovable-tagger' tidak digunakan
// import { componentTagger } from "lovable-tagger"; 

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    // Gunakan 'localhost' atau biarkan kosong jika Anda tidak yakin
    host: true, 
    port: 5173,
  },
  // Hapus plugin yang tidak perlu jika menyebabkan konflik
  plugins: [react()],
  resolve: {
    alias: {
      // Pastikan alias '@' menunjuk ke folder 'src'
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Tambahkan base path jika deploy ke sub-directory, tapi untuk Vercel/Netlify biasanya tidak perlu
  // base: '/', 
}));
