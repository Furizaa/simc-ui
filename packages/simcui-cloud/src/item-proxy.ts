import { DynamoDB, Lambda } from 'aws-sdk';
import fetch from 'node-fetch';
import { QueuePayloadInItem } from './types';

export const handler = async (event: QueuePayloadInItem['params']): Promise<any> => {
  console.log('Item Proxy Request', event);

  const dynamo = new DynamoDB.DocumentClient();
  const lambda = new Lambda();
  const { region, itemId } = event;

  const tokenResponse = await lambda
    .invoke({
      FunctionName: process.env.TOKEN_FUNCTION_NAME ?? '',
      Payload: JSON.stringify({ ...event }),
    })
    .promise();

  const bearer = JSON.parse(tokenResponse.Payload as string);

  const mediaPromise = fetch(`https://${region}.api.blizzard.com/data/wow/media/item/${itemId}`, {
    headers: { authorization: `Bearer ${bearer}`, 'battlenet-namespace': `static-${region}` },
  });

  const itemPromise = fetch(`https://${region}.api.blizzard.com/data/wow/item/${itemId}`, {
    headers: { authorization: `Bearer ${bearer}`, 'battlenet-namespace': `static-${region}` },
  });

  const [mediaResponse, itemResponse] = await Promise.all([mediaPromise, itemPromise]);

  if (mediaResponse.status !== 200) {
    return {
      data: null,
      error: { code: mediaResponse.status, text: await mediaResponse.text() },
    };
  }

  if (itemResponse.status !== 200) {
    return {
      data: null,
      error: { code: itemResponse.status, text: await itemResponse.text() },
    };
  }

  const mediaJson = await mediaResponse.json();
  const itemJson = await itemResponse.json();

  await dynamo
    .update({
      TableName: process.env.CACHE_TABLE_NAME ?? '',
      Key: { id: `${itemId}` },
      UpdateExpression: `set media = :media, cache = :cache`,
      ExpressionAttributeValues: {
        ':media': JSON.stringify(mediaJson),
        ':cache': JSON.stringify(itemJson),
      },
    })
    .promise();

  return {
    data: { media: mediaJson, item: itemJson },
    error: null,
  };
};
