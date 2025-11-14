import {defineConfig, type ProxyOptions} from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths"; // <--- thêm dòng này

const proxy: Record<string, string | ProxyOptions> = {
    // Ví dụ: tất cả request bắt đầu bằng /api sẽ được chuyển tới backend
    '/api': {
        target: 'http://localhost:5000', // backend server
        changeOrigin: true,               // thay đổi origin header
        secure: false,                    // nếu backend dùng https self-signed
        rewrite: (path) => path.replace(/^\/api/, ''), // bỏ /api khi gửi lên backend
    },
    // Bạn có thể thêm nhiều endpoint khác
    '/auth': 'http://localhost:5001',
};

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [["babel-plugin-react-compiler"]],
            },
        }),
        tsconfigPaths(), // <--- giúp Vite tự đọc alias từ tsconfig.json
    ],
    server: {
        port: 5173, // dev server port
        proxy,
    },
});
