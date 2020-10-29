const axios = require('axios');

module.exports = async function getBNetToken({ origin }) {
  const response = await axios.get(`https://${origin}.battle.net/oauth/token`, {
    auth: {
      username: process.env.BATTLENET_CLIENT_ID,
      password: process.env.BATTLENET_CLIENT_SECRET,
    },
    headers: {
      'User-Agent': `Node.js/${process.versions.node} Blizzard.js`,
    },
    params: {
      grant_type: 'client_credentials',
    },
  });

  return response.data.access_token;
};
