<img width="1349" height="709" alt="image" src="https://github.com/user-attachments/assets/9dac0fd6-b7fa-4283-a598-d921ff5610e5" /><img width="2849" height="1266" alt="image" src="https://github.com/user-attachments/assets/70ef5dec-ecf3-47b5-8db2-2e0f59d91a82" /><img width="1600" height="1190" alt="image" src="https://github.com/user-attachments/assets/e23a2840-da69-4b70-a02d-fbc710cf57ff" />

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
## Hướng dẫn cách push image lên DockerHub dùng PAT(Personal Access Token)
### Chuẩn bị: Tạo Docker Hub Access Token (thay vì password)
1. Vào trang https://hub.docker.com/settings/security
2. Chọn New Access Token
3. Đặt tên ví dụ: github-actions-ci
4. Copy token → lưu tạm lại (sau khi rời trang, không xem lại được nữa)
<img width="2849" height="1266" alt="image" src="https://github.com/user-attachments/assets/246043a1-45e7-440b-8c42-c6ad56092af1" />
<img width="1349" height="709" alt="image" src="https://github.com/user-attachments/assets/771c1a6b-8017-4964-bc58-cd176bb0d771" />
<img width="1347" height="984" alt="image" src="https://github.com/user-attachments/assets/39d48f15-cb36-44dc-8653-eebb364d6f15" />

### Sao chép PAT và Thêm vào GitHub Secrets
<img width="3839" height="1687" alt="image" src="https://github.com/user-attachments/assets/a9b52913-c691-4cb3-9119-3c7cd36eb285" />
Vào GitHub repo của bạn → Settings → Environments -> Add environment secrets
Tạo 2 secret:
Tên	Giá trị
DOCKERHUB_USERNAME	tên tài khoản Docker Hub
DOCKERHUB_TOKEN	access token vừa tạo

### Cập nhật workflow an toàn
