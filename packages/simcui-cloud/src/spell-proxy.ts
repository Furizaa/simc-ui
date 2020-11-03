import { DynamoDB, Lambda } from 'aws-sdk';
import fetch from 'node-fetch';
import { QueuePayloadInSpell } from './types';

export const handler = async (event: QueuePayloadInSpell['params']): Promise<any> => {
  console.log('Spell Proxy Request', event);

  const dynamo = new DynamoDB.DocumentClient();
  const lambda = new Lambda();
  const { region, spellId } = event;

  const tokenResponse = await lambda
    .invoke({
      FunctionName: process.env.TOKEN_FUNCTION_NAME ?? '',
      Payload: JSON.stringify({ ...event }),
    })
    .promise();

  const bearer = JSON.parse(tokenResponse.Payload as string);

  const mediaPromise = fetch(`https://${region}.api.blizzard.com/data/wow/media/spell/${spellId}`, {
    headers: { authorization: `Bearer ${bearer}`, 'battlenet-namespace': `static-${region}` },
  });

  const spellPromise = fetch(`https://${region}.api.blizzard.com/data/wow/spell/${spellId}`, {
    headers: { authorization: `Bearer ${bearer}`, 'battlenet-namespace': `static-${region}` },
  });

  const [mediaResponse, spellResponse] = await Promise.all([mediaPromise, spellPromise]);

  if (mediaResponse.status !== 200) {
    return {
      data: null,
      error: { code: mediaResponse.status, text: await mediaResponse.text() },
    };
  }

  if (spellResponse.status !== 200) {
    return {
      data: null,
      error: { code: mediaResponse.status, text: await mediaResponse.text() },
    };
  }

  const mediaJson = await mediaResponse.json();
  const spellJson = await spellResponse.json();

  await dynamo
    .update({
      TableName: process.env.CACHE_TABLE_NAME ?? '',
      Key: { id: `${spellId}` },
      UpdateExpression: `set media = :media, cache = :cache`,
      ExpressionAttributeValues: {
        ':media': JSON.stringify(mediaJson),
        ':cache': JSON.stringify(spellJson),
      },
    })
    .promise();

  return {
    data: { media: mediaJson, spell: spellJson },
    error: null,
  };
};
