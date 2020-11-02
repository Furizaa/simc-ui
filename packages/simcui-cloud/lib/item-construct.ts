import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { IFunction } from '@aws-cdk/aws-lambda';

interface Props {
  tokenProvider: IFunction;
  restGateway: apigw.RestApi;
}

export class ItemConstruct extends cdk.Construct {
  public readonly handler: lambda.Function;

  constructor(scope: cdk.Construct, id: string, props: Props) {
    super(scope, id);

    const cacheTable = new dynamodb.Table(this, 'BNETItemCache', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });

    const itemProxy = new lambda.Function(this, 'ItemProxyHandler', {
      code: new lambda.AssetCode('src'),
      handler: 'item-proxy.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        TOKEN_FUNCTION_NAME: props.tokenProvider.functionName,
        CACHE_TABLE_NAME: cacheTable.tableName,
      },
      timeout: cdk.Duration.seconds(15),
    });

    this.handler = itemProxy;

    props.tokenProvider.grantInvoke(itemProxy);
    cacheTable.grantReadWriteData(itemProxy);

    const character = props.restGateway.root.addResource('item');
    const characterIntegration = new apigw.LambdaIntegration(itemProxy);
    character.addMethod('GET', characterIntegration);
  }
}
