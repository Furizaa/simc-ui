import { Lambda } from 'aws-sdk';
import fetch from 'node-fetch';

export const handler = async (event: any = {}): Promise<any> => {
  console.log('Character Proxy Request', event);

  const lambda = new Lambda();

  const region = event?.queryStringParameters?.region;
  const server = event?.queryStringParameters['server-slug'];
  const character = event?.queryStringParameters['character-name'];

  const tokenResponse = await lambda
    .invoke({
      FunctionName: process.env.TOKEN_FUNCTION_NAME ?? '',
      Payload: JSON.stringify({ ...event }),
    })
    .promise();

  const bearer = JSON.parse((tokenResponse?.Payload as string) ?? '');

  const characterPromise = fetch(`https://${region}.api.blizzard.com/profile/wow/character/${server}/${character}`, {
    headers: { authorization: `Bearer ${bearer}`, 'battlenet-namespace': `profile-${region}` },
  });

  const equipmentPromise = fetch(
    `https://${region}.api.blizzard.com/profile/wow/character/${server}/${character}/equipment`,
    { headers: { authorization: `Bearer ${bearer}`, 'battlenet-namespace': `profile-${region}` } },
  );

  const mediaPromise = fetch(
    `https://${region}.api.blizzard.com/profile/wow/character/${server}/${character}/character-media`,
    { headers: { authorization: `Bearer ${bearer}`, 'battlenet-namespace': `profile-${region}` } },
  );

  const specPromise = fetch(
    `https://${region}.api.blizzard.com/profile/wow/character/${server}/${character}/specializations`,
    { headers: { authorization: `Bearer ${bearer}`, 'battlenet-namespace': `profile-${region}` } },
  );

  const [characterResponse, equipmentResponse, mediaResponse, specResponse] = await Promise.all([
    characterPromise,
    equipmentPromise,
    mediaPromise,
    specPromise,
  ]);

  if (characterResponse.status !== 200) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: null,
        error: { code: characterResponse.status, text: await characterResponse.text() },
      }),
    };
  }

  if (equipmentResponse.status !== 200) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: null,
        error: { code: equipmentResponse.status, text: await equipmentResponse.text() },
      }),
    };
  }

  if (mediaResponse.status !== 200) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: null,
        error: { code: mediaResponse.status, text: await mediaResponse.text() },
      }),
    };
  }

  if (specResponse.status !== 200) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: null,
        error: { code: specResponse.status, text: await specResponse.text() },
      }),
    };
  }

  const characterJson = await characterResponse.json();
  const equipmentJson = await equipmentResponse.json();
  const mediaJson = await mediaResponse.json();
  const specJson = await specResponse.json();

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: { character: characterJson, equipment: equipmentJson, media: mediaJson, spec: specJson },
      error: null,
    }),
  };
};
