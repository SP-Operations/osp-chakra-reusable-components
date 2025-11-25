#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../dist/images/osp-chakra-reusable-components');
const destDir = path.join(process.cwd(), 'public/images/osp-chakra-reusable-components'); // Resolves to the *consumer's* public/assets

function copyRecursiveSync(src, dest) {
  dest = dest.replace("\\node_modules\\osp-chakra-reusable-components", "");
  console.log(`Copying assets from ${src} to ${dest}`);
  if (!fs.existsSync(src)) 
  {
    console.error(`Source directory does not exist: ${src}`);
    return;
  }
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyRecursiveSync(sourceDir, destDir);