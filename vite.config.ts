import react from '@vitejs/plugin-react-swc';
import { defineConfig, Plugin } from 'vite';

const welcomePlugin = (): Plugin => ({
    name: 'welcome-message',
    configureServer(server) {
        server.httpServer?.once('listening', () => {
            setTimeout(() => {
                console.log('\n🎉 Welcome to React + TypeScript + Vite!\n');
                console.log('📦 Dev server is ready!\n');
            }, 100);
        });
    }
});

export default defineConfig({
    server: {
        port: 3000,
        cors: true,
        open: false
    },
    base: '/',
    plugins: [react(), welcomePlugin()]
});
