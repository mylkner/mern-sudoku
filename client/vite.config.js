import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [react()],
        server: {
            proxy: {
                "/api": {
                    target: process.env.VITE_SERVER_URL,
                },
            },
        },
        define: {
            "process.env": JSON.stringify(env),
        },
    };
});
