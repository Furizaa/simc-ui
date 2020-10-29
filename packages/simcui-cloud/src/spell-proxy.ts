import { DynamoDB, Lambda } from 'aws-sdk';
import fetch from 'node-fetch';

export const handler = async (event: any = {}): Promise<any> => {
  console.log('Spell Proxy Request', event);

  const dynamo = new DynamoDB.DocumentClient();
  const lambda = new Lambda();
  const region = event?.queryStringParameters?.region;
  const spallId = event?.queryStringParameters['spell-id'];

  const spell = await dynamo
    .get({
      TableName: process.env.CACHE_TABLE_NAME ?? '',
      Key: { id: `${spallId}` },
    })
    .promise();

  if (spell.Item) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: { media: JSON.parse(spell.Item.media), spell: JSON.parse(spell.Item.cache) },
        error: null,
      }),
    };
  }

  const tokenResponse = await lambda
    .invoke({
      FunctionName: process.env.TOKEN_FUNCTION_NAME ?? '',
      Payload: JSON.stringify({ ...event }),
    })
    .promise();

  const bearer = JSON.parse(tokenResponse.Payload as string);

  const mediaPromise = fetch(`https://${region}.api.blizzard.com/data/wow/media/spell/${spallId}`, {
    headers: { authorization: `Bearer ${bearer}`, 'battlenet-namespace': `static-${region}` },
  });

  const spellPromise = fetch(`https://${region}.api.blizzard.com/data/wow/spell/${spallId}`, {
    headers: { authorization: `Bearer ${bearer}`, 'battlenet-namespace': `static-${region}` },
  });

  const [mediaResponse, spellResponse] = await Promise.all([mediaPromise, spellPromise]);

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

  if (spellResponse.status !== 200) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: null,
        error: { code: spellResponse.status, text: await spellResponse.text() },
      }),
    };
  }

  const mediaJson = await mediaResponse.json();
  const spellJson = await spellResponse.json();

  await dynamo
    .update({
      TableName: process.env.CACHE_TABLE_NAME ?? '',
      Key: { id: `${spallId}` },
      UpdateExpression: `set media = :media, cache = :cache`,
      ExpressionAttributeValues: {
        ':media': JSON.stringify(mediaJson),
        ':cache': JSON.stringify(spellJson),
      },
    })
    .promise();

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: { media: mediaJson, spell: spellJson },
      error: null,
    }),
  };
};
