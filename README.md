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
```yaml
name: Docker Image CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    environment: DOCKERHUB_USERNAME

    steps:
      - name: 🧾 Checkout repository
        uses: actions/checkout@v4
        
      - name: 🧾 Log checkout step
        run: echo "🧾 Checkout completed ✅"
        continue-on-error: false

      - name: 🧰 Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
        
      - name: 🧰 Log Buildx setup
        run: echo "🧰 Docker Buildx set up completed ✅"
        continue-on-error: false
        
      - name: 🔑 Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
          
      - name: 🧰 Log Login to Docker Hub
        run: echo "🧰 Login into Docker Hub succeed ✅"
        continue-on-error: false

      - name: 🕒 Generate timestamp tag
        id: time
        run: |
          TAG=$(TZ="Asia/Bangkok" date +'%d-%m-%Y_%H-%M-%S')
          echo "TAG=$TAG" >> $GITHUB_ENV
          echo "🕓 Generated tag (UTC+7): $TAG"

      - name: 🏗️ Build and push Docker image
        id: build
        continue-on-error: true   # Cho phép tiếp tục để ta log lỗi thủ công
        uses: docker/build-push-action@v6
        with:
          context: .
          file: ./Dockerfile
          push: true
          tags: |
            ${{ vars.DOCKERHUB_USERNAME }}/learning-typescript:${{ env.TAG }}
            
          # Bật cache
          cache-from: type=registry,ref=${{ vars.DOCKERHUB_USERNAME }}/learning-typescript:cache
          cache-to: type=registry,ref=${{ vars.DOCKERHUB_USERNAME }}/learning-typescript:cache,mode=max

      - name: 🧹 Logout from Docker Hub
        if: always()
        run: docker logout

      - name: Clean up old images (keep last N) with detailed logs
        env:
          DOCKERHUB_USER: ${{ vars.DOCKERHUB_USERNAME }}
          DOCKERHUB_TOKEN: ${{ secrets.DOCKERHUB_TOKEN }}
          IMAGE_NAME: learning-typescript
          KEEP_COUNT: 10
        run: |
          set -o pipefail

          echo "🧹 Start cleanup old images for: $DOCKERHUB_USER/$IMAGE_NAME"
          echo "🧾 Keep newest $KEEP_COUNT tags (excluding 'latest')"

          # install tools
          sudo apt-get update -y
          sudo apt-get install -y jq curl

          # fetch all tags (handle pagination)
          PAGE=1
          PAGE_SIZE=100
          ALL_TAGS_JSON="[]"

          while :; do
            URL="https://hub.docker.com/v2/repositories/$DOCKERHUB_USER/$IMAGE_NAME/tags/?page_size=$PAGE_SIZE&page=$PAGE"
            echo "🔎 Fetching tags page $PAGE..."
            RESP=$(curl -s -u "$DOCKERHUB_USER:$DOCKERHUB_TOKEN" "$URL")
            if [ -z "$RESP" ]; then
              echo "⚠️ Empty response for page $PAGE — aborting pagination"
              break
            fi

            # collect results
            PAGE_RESULTS=$(echo "$RESP" | jq '.results')
            ALL_TAGS_JSON=$(jq -s '.[0] + .[1]' <(echo "$ALL_TAGS_JSON") <(echo "$PAGE_RESULTS"))

            # check if has next page
            NEXT=$(echo "$RESP" | jq -r '.next')
            if [ "$NEXT" = "null" ] || [ -z "$NEXT" ]; then
              break
            fi
            PAGE=$((PAGE+1))
          done

          # transform to array of {name, last_updated}
          TAGS_SORTED=$(echo "$ALL_TAGS_JSON" | jq -c '[ .[] | {name: .name, last_updated: .last_updated} ] | sort_by(.last_updated) | reverse')

          TOTAL_TAGS=$(echo "$TAGS_SORTED" | jq 'length')
          echo "ℹ️ Total tags fetched: $TOTAL_TAGS"

          if [ "$TOTAL_TAGS" -eq 0 ]; then
            echo "ℹ️ No tags found, nothing to delete."
            exit 0
          fi

          # print first 20 tags for visibility (safeguard)
          echo "🧾 Top tags (newest first):"
          echo "$TAGS_SORTED" | jq -r '.[0:20] | .[] | " - \(.name) (updated: \(.last_updated))"'

          # build list to keep and to delete (skip 'latest')
          KEEP=$(echo "$TAGS_SORTED" | jq -r --argjson k "$KEEP_COUNT" '[ .[] | select(.name != "latest") ] | .[0:$k] | .[].name')
          DELETE=$(echo "$TAGS_SORTED" | jq -r --argjson k "$KEEP_COUNT" '[ .[] | select(.name != "latest") ] | .[$k:] | .[].name')

          echo "----------------------------------------"
          echo "Keeping tags:"
          if [ -z "$KEEP" ]; then
            echo " - (none)"
          else
            echo "$KEEP" | sed 's/^/ - /'
          fi

          echo "----------------------------------------"
          echo "Will delete tags (older than the first $KEEP_COUNT non-latest tags):"
          if [ -z "$DELETE" ]; then
            echo " - (none)"
          else
            echo "$DELETE" | sed 's/^/ - /'
          fi
          echo "----------------------------------------"

          # delete tags one by one, count successes/failures
          DELETED_COUNT=0
          FAILED_COUNT=0
          if [ -n "$DELETE" ]; then
            while read -r T; do
              if [ -z "$T" ]; then
                continue
              fi
              echo "🗑️ Deleting tag: $T ..."
              DEL_URL="https://hub.docker.com/v2/repositories/$DOCKERHUB_USER/$IMAGE_NAME/tags/$T/"
              HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -u "$DOCKERHUB_USER:$DOCKERHUB_TOKEN" -X DELETE "$DEL_URL")
              if [ "$HTTP_CODE" = "204" ]; then
                echo "   ✅ Deleted: $T (HTTP $HTTP_CODE)"
                DELETED_COUNT=$((DELETED_COUNT+1))
              else
                echo "   ❌ Failed to delete $T (HTTP $HTTP_CODE)"
                FAILED_COUNT=$((FAILED_COUNT+1))
              fi
            done <<< "$DELETE"
          else
            echo "ℹ️ Nothing to delete."
          fi

          echo "----------------------------------------"
          echo "Summary:"
          echo " - Total tags fetched: $TOTAL_TAGS"
          echo " - Kept (non-latest, newest $KEEP_COUNT): $(echo \"$KEEP\" | wc -l | tr -d ' ')"
          echo " - Deleted: $DELETED_COUNT"
          echo " - Failures: $FAILED_COUNT"
          echo "----------------------------------------"

          if [ "$FAILED_COUNT" -gt 0 ]; then
            echo "⚠️ Some deletions failed. Check the HTTP codes above for more information."
            # Do not fail the job by default; if you want to fail CI when delete fails, uncomment next line:
            # exit 1
          fi

          echo "✅ Cleanup step finished."

      - name: ✅ Log success
        if: steps.build.outcome == 'success'
        run: |
          echo ""
          echo "✅✅✅ SUCCESS ✅✅✅"
          echo "Docker image pushed successfully!"
          echo "Image tags:"
          echo " - ${{ vars.DOCKERHUB_USERNAME }}/learning-typescript:${{ env.TAG }}"
          echo ""

      - name: ❌ Log failure
        if: steps.build.outcome != 'success'
        run: |
          echo ""
          echo "❌❌❌ FAILED ❌❌❌"
          echo "Build or push failed. Please check logs above for details."
          exit 1

```

## Hướng dẫn sử dụng Plop.js generator + Template cho React + Typescript + SCSS + Service + Model + Routing + Flat structure
- Chỉ cần sử dụng npx plop module-flat là được

### 1️⃣ Cài đặt plop
```shell
npm i -D plop
```
- Tạo file plopfile.cjs ở root:
```javascript
const fs = require('fs');
const path = require('path');

module.exports = (plop) => {
    plop.setGenerator('module-flat', {
        description: 'Create a React module (flat structure)',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Module name?',
                validate: (value) => {
                    if (!value) return 'Module name is required';
                    return true;
                },
            },
        ],
        actions: (data) => {
            const moduleDir = path.join('src/app', plop.getHelper('pascalCase')(data.name));
            const actions = [];

            // Nếu thư mục tồn tại, hỏi ghi đè
            if (fs.existsSync(moduleDir)) {
                actions.push({
                    type: 'confirm',
                    name: 'overwrite',
                    message: `Folder ${moduleDir} already exists. Overwrite?`,
                    default: false,
                });
                actions.push((answers) => {
                    if (!answers.overwrite) {
                        console.log('❌ Cancelled module creation.');
                        process.exit(0);
                    }
                    return '✅ Overwriting existing module...';
                });
            }

            // Tạo thư mục (Plop tự động tạo file => thư mục cũng tạo)
            const files = [
                { file: '{{pascalCase name}}.tsx', template: 'plop-templates/Module.tsx.hbs' },
                { file: '{{pascalCase name}}.types.ts', template: 'plop-templates/Module.types.ts.hbs' },
                { file: '{{pascalCase name}}.scss', template: 'plop-templates/Module.scss.hbs' },
                { file: '{{pascalCase name}}.service.ts', template: 'plop-templates/Module.service.ts.hbs' },
                { file: '{{pascalCase name}}Routing.tsx', template: 'plop-templates/ModuleRouting.tsx.hbs' },
                { file: 'index.ts', template: 'plop-templates/index.ts.hbs' },
            ];

            files.forEach((f) => {
                actions.push({
                    type: 'add',
                    path: path.join(moduleDir, f.file),
                    templateFile: f.template,
                    abortOnFail: true,
                });
            });

            return actions;
        },
    });
};
```
### 2️⃣ Tạo templates
- plop-templates/Module.tsx.hbs
```hbs
import React from 'react';
import './{{pascalCase name}}.scss';
import { {{pascalCase name}}Props } from './{{pascalCase name}}.types';

export const {{pascalCase name}}: React.FC<{{pascalCase name}}Props> = (props) => {
  return (
    <div className="{{camelCase name}}">
      <h2>{{pascalCase name}} Component</h2>
    </div>
  );
};
```

- plop-templates/Module.types.ts.hbs
```hbs
export interface {{pascalCase name}}Props {
  // define props here
}
```

- plop-templates/Module.scss.hbs
```hbs
.{{camelCase name}} {
  /* styles */
}
```

- plop-templates/Module.service.ts.hbs
```hbs
import { ApiClient } from '../../api/apiClient';
import type { {{pascalCase name}}Model } from './{{pascalCase name}}.types';

export class {{pascalCase name}}Service {
  constructor(private api: ApiClient) {}

  // example GET
  getAll() {
    return this.api.get<{{pascalCase name}}Model[]>('/{{kebabCase name}}');
  }

  // example POST
  create(data: {{pascalCase name}}Model) {
    return this.api.post<{{pascalCase name}}Model>('/{{kebabCase name}}', data);
  }
}
```

- plop-templates/ModuleRouting.tsx.hbs
```hbs
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { {{pascalCase name}} } from './{{pascalCase name}}';

export const {{pascalCase name}}Routing = () => {
  return (
    <Routes>
      <Route path="/{{kebabCase name}}" element={<{{pascalCase name}} />} />
    </Routes>
  );
};
```

- plop-templates/index.ts.hbs
```hbs
export * from './{{pascalCase name}}';
export * from './{{pascalCase name}}.service';
export * from './{{pascalCase name}}Routing';
export * from './{{pascalCase name}}.types';
```

### 3️⃣ Sử dụng
```shell
npx plop module-flat
# Nhập tên module: User
```

- Kết quả: Tạo thư mục src/app/User/ với đầy đủ:
```pgsql
User.tsx
User.types.ts
User.scss
User.service.ts
UserRouting.tsx
index.ts
```
