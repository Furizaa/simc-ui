import { DynamoDB } from 'aws-sdk';
import { QueueLookupEvent, QueueLookupResponse } from './types';

export const handler = async (event: QueueLookupEvent): Promise<any> => {
  console.log('QueueLookup Request', event);

  const dynamo = new DynamoDB.DocumentClient();

  const { token } = event.queryStringParameters;

  const item = await dynamo
    .get({
      TableName: process.env.RESULT_TABLE_NAME ?? '',
      Key: { token: `${token}` },
    })
    .promise();

  if (item?.Item?.payloadOut) {
    const response: QueueLookupResponse = {
      token,
      status: 'DONE',
      payload: JSON.parse(item.Item.payloadOut),
    };

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response),
    };
  }

  const response: QueueLookupResponse = {
    token,
    status: 'QUEUE',
    payload: null,
  };

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(response),
  };
};
