import { StepFunctions, DynamoDB } from 'aws-sdk';
import { ulid } from 'ulid';
import { QueueInsertResponse } from './types';

export const handler = async (event: any = {}): Promise<any> => {
  console.log('QueueInset Request', event);
  const body = JSON.parse(event.body);

  const dynamo = new DynamoDB.DocumentClient();
  const sf = new StepFunctions();

  if (body.type === 'item') {
    const item = await dynamo
      .get({
        TableName: process.env.ITEM_CACHE_TABLE_NAME ?? '',
        Key: { id: `${body.params.itemId}` },
      })
      .promise();

    if (item.Item) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cache: {
            data: { media: JSON.parse(item.Item.media), item: JSON.parse(item.Item.cache) },
            error: null,
          },
        }),
      };
    }
  }

  if (body.type === 'spell') {
    const spell = await dynamo
      .get({
        TableName: process.env.SPELL_CACHE_TABLE_NAME ?? '',
        Key: { id: `${body.params.spellId}` },
      })
      .promise();

    if (spell.Item) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cache: {
            data: { media: JSON.parse(spell.Item.media), spell: JSON.parse(spell.Item.cache) },
            error: null,
          },
        }),
      };
    }
  }

  const token = ulid();

  const scanResult = await dynamo
    .scan({
      TableName: process.env.QUEUE_TABLE_NAME ?? '',
      Select: 'COUNT',
    })
    .promise();

  const queueCount = scanResult.Count ?? 0;
  const waitTime = Math.floor(queueCount / 15) + 1;

  await dynamo
    .update({
      TableName: process.env.QUEUE_TABLE_NAME ?? '',
      Key: { token },
      UpdateExpression: `set payloadIn = :payload, createdAt = :createdAt`,
      ExpressionAttributeValues: {
        ':payload': event.body,
        ':createdAt': Date.now(),
      },
    })
    .promise();

  await sf
    .startExecution({
      stateMachineArn: process.env.QUEUE_STATE_MACHINE || '',
      input: JSON.stringify({ token, wait_time: waitTime }),
    })
    .promise();

  const response: QueueInsertResponse = {
    token,
    waitTimeSeconds: waitTime,
  };

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(response),
  };
};
