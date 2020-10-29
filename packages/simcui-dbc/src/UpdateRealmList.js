const axios = require('axios');
const fs = require('fs');
const prettier = require('prettier');
const getBNetToken = require('./utils/getBNetToken');
const apiEndpoints = require('./utils/apiEndpoints');

const realmOrigins = ['eu', 'us'];

(async function run() {
  const data = {};

  const processes = realmOrigins.map(async (origin) => {
    const accessToken = await getBNetToken({ origin });
    const response = await axios.get(`${apiEndpoints[origin]}data/wow/realm/index`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
        'battlenet-namespace': `dynamic-${origin}`,
      },
      params: {},
    });
    console.log(`✅ Done writing realm list for "${origin}."`);
    data[origin] = response.data.realms;
    return null;
  });

  await Promise.all(processes);

  fs.writeFileSync('./generated/dbRealmList.json', prettier.format(JSON.stringify(data), { parser: 'json' }), {
    encoding: 'UTF-8',
  });
})();
