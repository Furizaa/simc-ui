import * as cdk from '@aws-cdk/core';
import * as Events from '@aws-cdk/aws-events';
import * as Eventtargets from '@aws-cdk/aws-events-targets';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';

export class TokenContruct extends cdk.Construct {
  public readonly handler: lambda.Function;

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    const table = new dynamodb.Table(this, 'BNETAPITokenCache', {
      partitionKey: { name: 'region', type: dynamodb.AttributeType.STRING },
    });

    const bnetApiSecret = secretsmanager.Secret.fromSecretAttributes(scope, 'prod/SimUI/BNetAPI', {
      secretArn: 'arn:aws:secretsmanager:eu-central-1:169323831851:secret:prod/SimUI/BNetAPI-8Q7rIT',
    });

    const rotator = new lambda.Function(this, 'TokenRotator', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'token-rotator.handler',
      code: lambda.Code.fromAsset('src'),
      environment: {
        TOKEN_TABLE_NAME: table.tableName,
        BNET_SECRET_NAME: bnetApiSecret.secretName,
      },
    });

    const rotatorRule = new Events.Rule(this, 'RotatorRule', {
      schedule: Events.Schedule.expression('rate(12 hours)'),
    });

    this.handler = new lambda.Function(this, 'TokenProviderHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'token-provider.handler',
      code: lambda.Code.fromAsset('src'),
      timeout: cdk.Duration.seconds(10),
      environment: {
        TOKEN_TABLE_NAME: table.tableName,
      },
    });

    table.grantReadData(this.handler);
    table.grantReadWriteData(rotator);
    bnetApiSecret.grantRead(rotator);
    rotatorRule.addTarget(new Eventtargets.LambdaFunction(rotator));
  }
}
