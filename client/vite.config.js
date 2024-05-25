import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "https://mern-sudoku-bvws2h8bs-mylos-projects-7f6cb773.vercel.app",
            },
        },
    },
});
