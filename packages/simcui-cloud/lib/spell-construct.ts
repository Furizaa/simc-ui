import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { IFunction } from '@aws-cdk/aws-lambda';

interface Props {
  tokenProvider: IFunction;
  restGateway: apigw.RestApi;
}

export class SpellConstruct extends cdk.Construct {
  public readonly handler: lambda.Function;

  public readonly cacheTable: dynamodb.Table;

  constructor(scope: cdk.Construct, id: string, props: Props) {
    super(scope, id);

    this.cacheTable = new dynamodb.Table(this, 'BNETSpellCache', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });

    const spellProxy = new lambda.Function(this, 'SpellProxyHandler', {
      code: new lambda.AssetCode('src'),
      handler: 'spell-proxy.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        TOKEN_FUNCTION_NAME: props.tokenProvider.functionName,
        CACHE_TABLE_NAME: this.cacheTable.tableName,
      },
      timeout: cdk.Duration.seconds(15),
    });

    this.handler = spellProxy;

    props.tokenProvider.grantInvoke(spellProxy);
    this.cacheTable.grantReadWriteData(spellProxy);

    const character = props.restGateway.root.addResource('spell');
    const characterIntegration = new apigw.LambdaIntegration(spellProxy);
    character.addMethod('GET', characterIntegration);
  }
}
