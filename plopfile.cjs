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
            const moduleDir = path.join('src/pages', plop.getHelper('pascalCase')(data.name))?.trim();
            const lowercaseModuleDir = moduleDir.toLowerCase();
            const actions = [];

            // Nếu thư mục tồn tại, hỏi ghi đè
            if (fs.existsSync(lowercaseModuleDir)) {
                actions.push({
                    type: 'confirm',
                    name: 'overwrite',
                    message: `Folder ${lowercaseModuleDir} already exists. Overwrite?`,
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
                    path: path.join(lowercaseModuleDir, f.file),
                    templateFile: f.template,
                    abortOnFail: true,
                });
            });

            return actions;
        },
    });
};
