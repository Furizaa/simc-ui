const cp = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('⏩  Generating API Manifest...');

const response = cp.execSync(
  'aws cloudformation describe-stacks --stack-name CloudStack --query "Stacks[0].Outputs[?OutputKey==\'ApiGatewayEndpoint\'].OutputValue" --output text',
  { encoding: 'UTF-8' },
);

const manifestFile = path.resolve(__dirname, 'gatewayManifest.json');
const endpoint = response.trim();
const updateAt = new Date().toISOString();

console.log(`⏩  Found API endpoint "${endpoint}"`);
console.log(`⏩  Writing manifest to file "${manifestFile}"`);

fs.writeFileSync(manifestFile, JSON.stringify({ updateAt, bnetGatewayEndpoint: endpoint }, undefined, 2));
