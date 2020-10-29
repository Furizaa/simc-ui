import fetch from 'node-fetch';
import { DynamoDB, SecretsManager } from 'aws-sdk';
import supportedRegions from './supported-regions';

export const handler = async (): Promise<any> => {
  const dynamo = new DynamoDB.DocumentClient();
  const sm = new SecretsManager();

  const bnetSecret = await sm.getSecretValue({ SecretId: process.env.BNET_SECRET_NAME ?? '' }).promise();
  const bnetCredentials = JSON.parse(bnetSecret?.SecretString ?? '{}');
  const authString = Buffer.from(`${bnetCredentials.client_id}:${bnetCredentials.client_secret}`).toString('base64');

  const runners = supportedRegions.map(async (regionCode) => {
    const response = await fetch(`https://${regionCode}.battle.net/oauth/token?grant_type=client_credentials`, {
      headers: {
        Authorization: `Basic ${authString}`,
      },
    });

    const responseData = await response.json();

    await dynamo
      .update({
        TableName: process.env.TOKEN_TABLE_NAME ?? '',
        Key: { region: regionCode },
        UpdateExpression: `set api_token = :api_token`,
        ExpressionAttributeValues: {
          ':api_token': responseData.access_token,
        },
      })
      .promise();

    console.log(`Updated token for region ${regionCode}.`);
  });

  await Promise.all(runners);
};
