const axios = require('axios');
const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const Promise = require('bluebird');

const parseTci = (tci) => {
  const out = {};
  const lines = tci.split('\n');
  const kvPairs = lines
    .filter((line) => !line.startsWith('#'))
    .map((line) => {
      const tciLine = new RegExp(/^(?<key>[\w.]+)\+?=(?<value>.+)$/g);
      const match = tciLine.exec(line);
      if (match) {
        return [match.groups.key, match.groups.value];
      }
      return null;
    })
    .filter(Boolean);

  kvPairs.forEach(([key, value]) => {
    if (!(key in out)) {
      out[key] = value;
      return;
    }
    if (typeof out[key] === 'string') {
      out[key] = [out[key], value];
      return;
    }
    if (typeof out[key] === 'object') {
      out[key].push(value);
    }
  });

  return out;
};

(async function run() {
  const unsupportedSpecIds = [];
  const profileData = {};
  const classData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '..', 'generated/dbClassList.json'), { encoding: 'UTF-8' }),
  );

  await Promise.map(
    Object.values(classData),
    async (pClass) => {
      const className = pClass.name.en_US;
      await Promise.map(
        pClass.specializations,
        async (spec) => {
          const specName = spec.name.en_US;
          const fileName = `T25_${className}_${specName}.simc`.replace(' ', '_');

          try {
            const response = await axios.get(
              `https://raw.githubusercontent.com/simulationcraft/simc/shadowlands/profiles/Tier25/${fileName}`,
            );

            if (response.status === 200) {
              profileData[spec.id] = parseTci(response.data);
            }
          } catch (e) {
            console.log(`💥 Missing "${fileName}" -> Adding to unsupported specs.`);
            unsupportedSpecIds.push(spec.id);
          }
        },
        { concurrency: 1 },
      );
    },
    { concurrency: 1 },
  );

  fs.writeFileSync('./generated/dbProfiles.json', prettier.format(JSON.stringify(profileData), { parser: 'json' }), {
    encoding: 'UTF-8',
  });
})();
