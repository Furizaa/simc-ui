import { DynamoDB } from 'aws-sdk';

export const handler = async (event: any = {}): Promise<any> => {
  const region = event?.queryStringParameters?.region;

  const dynamo = new DynamoDB();

  const item = await dynamo
    .getItem({
      TableName: process.env.TOKEN_TABLE_NAME ?? '',
      Key: { region: { S: region } },
    })
    .promise();

  return item.Item?.api_token.S;
};
