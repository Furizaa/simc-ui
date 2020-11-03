import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class CacheConstruct extends cdk.Construct {
  public readonly cacheLookup: lambda.Function;

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    const cacheTableItems = new dynamodb.Table(this, 'BNETItemCache', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });

    const cacheTableSpells = new dynamodb.Table(this, 'BNETSpellCache', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });

    const cacheLookup = new lambda.Function(this, 'CacheLookupHandler', {
      code: new lambda.AssetCode('src'),
      handler: 'cache-loopup.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        ITEM_CACHE_TABLE_NAME: cacheTableItems.tableName,
        SPELL_CACHE_TABLE_NAME: cacheTableSpells.tableName,
      },
      timeout: cdk.Duration.seconds(15),
    });

    this.cacheLookup = cacheLookup;

    cacheTableItems.grantReadWriteData(cacheLookup);
    cacheTableSpells.grantReadWriteData(cacheLookup);
  }
}
