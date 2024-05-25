import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const server =
        mode === "production" ? env.VITE_SERVER_URL : "http://localhost:3000";
    console.log(server);
    return {
        plugins: [react()],
        server: {
            proxy: {
                "/api/*": {
                    target: server,
                },
            },
        },
    };
});
