import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '../src'); // Directory to scan for components
const indexFile = path.join(rootDir, 'index.ts'); // Path to the index file

console.log(`Generating index.ts in ${indexFile}...`);

const exportFiles = [];
const importFiles = [];

function Walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            Walk(fullPath); // Recursively walk through directories
        } else if (entry.isFile()) {
            const relPath = './' + path.relative(rootDir, fullPath).replace(/\\/g, '/'); // Convert to POSIX path
            if (relPath.endsWith('.ts') || relPath.endsWith('.tsx')) {
                if (relPath === './declarations.d.ts') continue;
                if (relPath !== './index.ts') { // Exclude index.ts
                    const noExt = relPath.replace(/\.(ts|tsx)$/, '');
                    exportFiles.push(`export * from '${noExt}';`);
                }
            }
        }
    }
}

Walk(rootDir);

// Optional: sort or filter export/imports
const contents = [...importFiles, ...exportFiles].join('\n') + '\n';

// Write index.ts
fs.writeFileSync(indexFile, contents, 'utf-8');
console.log('index.ts generated.');