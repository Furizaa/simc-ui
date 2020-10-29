const axios = require('axios');
const fs = require('fs');
const prettier = require('prettier');
const Promise = require('bluebird');
const ld = require('lodash');
const getBNetToken = require('./utils/getBNetToken');
const apiEndpoints = require('./utils/apiEndpoints');

const CHUNK_SIZE = 10;

(async function run() {
  const data = {};
  const origin = 'eu';

  const accessToken = await getBNetToken({ origin });
  const indexResponse = await axios.get(`${apiEndpoints[origin]}/data/wow/playable-class/index`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
      'battlenet-namespace': `static-${origin}`,
    },
    params: {},
  });

  const classList = indexResponse.data.classes;
  const classChunks = ld.chunk(classList, CHUNK_SIZE);

  await Promise.map(
    classChunks,
    async (chunk, index) => {
      console.log(`🤖 Processing Chunk ${index + 1}/${Math.ceil(classList.length / CHUNK_SIZE)}`);

      await Promise.map(
        chunk,
        async (pClass) => {
          const response = await axios.get(`${apiEndpoints[origin]}/data/wow/playable-class/${pClass.id}`, {
            headers: {
              authorization: `Bearer ${accessToken}`,
              'battlenet-namespace': `static-${origin}`,
            },
            params: {},
          });
          const classJson = response.data;
          console.log(`✅ Imported Class "${classJson.name.en_US}."`);
          data[classJson.id] = classJson;
        },
        { concurrency: 1 },
      );
    },
    { concurrency: 1 },
  );

  fs.writeFileSync('./generated/dbClassList.json', prettier.format(JSON.stringify(data), { parser: 'json' }), {
    encoding: 'UTF-8',
  });
})();
