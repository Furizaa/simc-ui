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
  const indexResponse = await axios.get(`${apiEndpoints[origin]}/data/wow/talent/index`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
      'battlenet-namespace': `static-${origin}`,
    },
    params: {},
  });

  const talentList = indexResponse.data.talents;
  const talentChunks = ld.chunk(talentList, CHUNK_SIZE);

  await Promise.map(
    talentChunks,
    async (chunk, index) => {
      console.log(`🤖 Processing Chunk ${index + 1}/${Math.ceil(talentList.length / CHUNK_SIZE)}`);

      await Promise.map(
        chunk,
        async (talent) => {
          const response = await axios.get(`${apiEndpoints[origin]}/data/wow/talent/${talent.id}`, {
            headers: {
              authorization: `Bearer ${accessToken}`,
              'battlenet-namespace': `static-${origin}`,
            },
            params: {},
          });
          const talentJson = response.data;
          console.log(`✅ Imported Talent "${talentJson.spell.name.en_US}."`);
          data[talentJson.id] = talentJson;
        },
        { concurrency: 1 },
      );
    },
    { concurrency: 1 },
  );

  fs.writeFileSync('./generated/dbTalentList.json', prettier.format(JSON.stringify(data), { parser: 'json' }), {
    encoding: 'UTF-8',
  });
})();
