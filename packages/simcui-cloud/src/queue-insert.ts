import { StepFunctions, DynamoDB } from 'aws-sdk';
import { ulid } from 'ulid';
import { QueueInsertEvent, QueueInsertResponse } from './types';

export const handler = async (event: QueueInsertEvent): Promise<any> => {
  console.log('QueueInset Request', event);

  const dynamo = new DynamoDB.DocumentClient();
  const sf = new StepFunctions();

  const token = ulid();

  const scanResult = await dynamo
    .scan({
      TableName: process.env.QUEUE_TABLE_NAME ?? '',
      Select: 'COUNT',
    })
    .promise();

  const queueCount = scanResult.Count ?? 0;
  const waitTime = queueCount * 10;

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
