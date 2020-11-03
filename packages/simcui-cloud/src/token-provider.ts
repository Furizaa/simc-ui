import { DynamoDB } from 'aws-sdk';

export const handler = async (event: any = {}): Promise<any> => {
  console.log('Request', event);
  const { region } = event;

  const dynamo = new DynamoDB();

  const item = await dynamo
    .getItem({
      TableName: process.env.TOKEN_TABLE_NAME ?? '',
      Key: { region: { S: region.toLowerCase() } },
    })
    .promise();

  return item.Item?.api_token.S;
};
