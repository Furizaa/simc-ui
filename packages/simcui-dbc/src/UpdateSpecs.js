const axios = require('axios');
const fs = require('fs');
const prettier = require('prettier');
const getBNetToken = require('./utils/getBNetToken');
const apiEndpoints = require('./utils/apiEndpoints');

(async function run() {
  const origin = 'eu';

  const accessToken = await getBNetToken({ origin });
  const response = await axios.get(`${apiEndpoints[origin]}/data/wow/playable-specialization/index`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
      'battlenet-namespace': `static-${origin}`,
    },
    params: {},
  });

  const data = response.data.character_specializations.reduce(
    (prev, spec) => ({ ...prev, [spec.id]: { name: spec.name, id: spec.id } }),
    {},
  );

  fs.writeFileSync('./generated/dbSpecs.json', prettier.format(JSON.stringify(data), { parser: 'json' }), {
    encoding: 'UTF-8',
  });
})();
