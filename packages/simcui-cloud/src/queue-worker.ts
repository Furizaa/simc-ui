import { DynamoDB, Lambda } from 'aws-sdk';
import { QueueWorkerInput } from './types';

export const handler = async (event: QueueWorkerInput): Promise<any> => {
  console.log('QueueWorker Request', event);

  const lambda = new Lambda();
  const dynamo = new DynamoDB.DocumentClient();

  const item = await dynamo
    .get({
      TableName: process.env.QUEUE_TABLE_NAME ?? '',
      Key: { token: `${event.token}` },
    })
    .promise();

  if (item?.Item?.payloadIn) {
    const payloadEvent = JSON.parse(item.Item.payloadIn);

    let funcResult;
    if (payloadEvent.type === 'character') {
      funcResult = await lambda
        .invoke({
          FunctionName: process.env.FUNCTION_NAME_CHARACTER || '',
          Payload: JSON.stringify(payloadEvent.params),
        })
        .promise();
    }
    if (payloadEvent.type === 'item') {
      funcResult = await lambda
        .invoke({ FunctionName: process.env.FUNCTION_NAME_ITEM || '', Payload: JSON.stringify(payloadEvent.params) })
        .promise();
    }
    if (payloadEvent.type === 'spell') {
      funcResult = await lambda
        .invoke({ FunctionName: process.env.FUNCTION_NAME_SPELL || '', Payload: JSON.stringify(payloadEvent.params) })
        .promise();
    }

    if (funcResult) {
      await dynamo
        .update({
          TableName: process.env.QUEUE_TABLE_NAME ?? '',
          Key: { token: event.token },
          UpdateExpression: `set payloadOut = :payload`,
          ExpressionAttributeValues: {
            ':payload': funcResult.Payload,
          },
        })
        .promise();
    }
  }
};
