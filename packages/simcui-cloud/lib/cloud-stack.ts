/* eslint-disable no-new */
import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import { TokenContruct } from './token-construct';
import { CharacterContruct } from './character-construct';
import { ItemConstruct } from './item-construct';
import { SpellConstruct } from './spell-construct';

export default class CloudStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const tokenConstruct = new TokenContruct(this, 'TokenConstruct');

    const api = new apigw.RestApi(this, 'bnetGateway', {
      restApiName: 'BNet Gateway Service',
    });

    new CharacterContruct(this, 'CharacterConstruct', {
      tokenProvider: tokenConstruct.handler,
      restGateway: api,
    });

    new ItemConstruct(this, 'ItemConstruct', {
      tokenProvider: tokenConstruct.handler,
      restGateway: api,
    });

    new SpellConstruct(this, 'SpellConstruct', {
      tokenProvider: tokenConstruct.handler,
      restGateway: api,
    });

    new cdk.CfnOutput(this, 'ApiGatewayEndpoint', {
      value: api.url,
    });
  }
}
