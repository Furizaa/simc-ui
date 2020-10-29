import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import { IFunction } from '@aws-cdk/aws-lambda';

interface Props {
  tokenProvider: IFunction;
  restGateway: apigw.RestApi;
}

export class CharacterContruct extends cdk.Construct {
  public readonly handler: lambda.Function;

  constructor(scope: cdk.Construct, id: string, props: Props) {
    super(scope, id);

    const characterProxy = new lambda.Function(this, 'CharacterProxyHandler', {
      code: new lambda.AssetCode('src'),
      handler: 'character-proxy.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        TOKEN_FUNCTION_NAME: props.tokenProvider.functionName,
      },
      timeout: cdk.Duration.seconds(15),
    });

    props.tokenProvider.grantInvoke(characterProxy);

    const character = props.restGateway.root.addResource('character');
    const characterIntegration = new apigw.LambdaIntegration(characterProxy);
    character.addMethod('GET', characterIntegration);
  }
}
