import path from 'path';
import { execSync } from 'child_process';
import fs from 'fs';
import { dependencies } from '../../package.json';

const nodeModulesPath = path.join(__dirname, '..', '..', 'node_modules');

if (Object.keys(dependencies || {}).length > 0 && fs.existsSync(nodeModulesPath)) {
  const electronRebuildCmd =
    '../../node_modules/.bin/electron-rebuild --version 8 --parallel --force --types prod,dev,optional --modules ../../node_modules';
  const cmd = process.platform === 'win32' ? electronRebuildCmd.replace(/\//g, '\\') : electronRebuildCmd;
  execSync(cmd, {
    cwd: path.join(__dirname, '..', '..'),
    stdio: 'inherit',
  });
}
