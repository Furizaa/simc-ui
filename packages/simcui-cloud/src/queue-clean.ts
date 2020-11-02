import { DynamoDB } from 'aws-sdk';
import { QueueWorkerInput } from './types';

export const handler = async (event: QueueWorkerInput): Promise<any> => {
  console.log('QueueClean Request', event);

  const dynamo = new DynamoDB.DocumentClient();

  await dynamo
    .delete({
      TableName: process.env.QUEUE_TABLE_NAME ?? '',
      Key: { token: `${event.token}` },
    })
    .promise();
};
