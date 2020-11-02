/* eslint-disable no-new */
import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import { TokenContruct } from './token-construct';
import { CharacterContruct } from './character-construct';
import { ItemConstruct } from './item-construct';
import { SpellConstruct } from './spell-construct';
import { QueueConstruct } from './queue-construct';

export default class CloudStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const tokenConstruct = new TokenContruct(this, 'TokenConstruct');

    const api = new apigw.RestApi(this, 'bnetGateway', {
      restApiName: 'BNet Gateway Service',
    });

    const characterConstruct = new CharacterContruct(this, 'CharacterConstruct', {
      tokenProvider: tokenConstruct.handler,
      restGateway: api,
    });

    const itemConstruct = new ItemConstruct(this, 'ItemConstruct', {
      tokenProvider: tokenConstruct.handler,
      restGateway: api,
    });

    const spellConstruct = new SpellConstruct(this, 'SpellConstruct', {
      tokenProvider: tokenConstruct.handler,
      restGateway: api,
    });

    const queueConstruct = new QueueConstruct(this, 'QueueConstruct', {
      characterWorkerFunc: characterConstruct.handler,
      itemWorkerFunc: itemConstruct.handler,
      spellWorkerFunc: spellConstruct.handler,
    });

    new cdk.CfnOutput(this, 'ApiGatewayEndpoint', {
      value: api.url,
    });

    const queue = api.root.addResource('queue');
    const queueInsertIntegration = new apigw.LambdaIntegration(queueConstruct.queueInsert);
    const queueLookupIntegration = new apigw.LambdaIntegration(queueConstruct.queueLookup);

    queue.addMethod('POST', queueInsertIntegration);
    queue.addMethod('GET', queueLookupIntegration);
  }
}
