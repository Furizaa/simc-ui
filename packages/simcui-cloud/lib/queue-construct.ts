import * as cdk from '@aws-cdk/core';
import * as sfn from '@aws-cdk/aws-stepfunctions';
import * as sfnTasks from '@aws-cdk/aws-stepfunctions-tasks';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { Function } from '@aws-cdk/aws-lambda';

interface Props {
  characterWorkerFunc: Function;
  spellWorkerFunc: Function;
  itemWorkerFunc: Function;
  spellCacheTable: dynamodb.Table;
  itemCacheTable: dynamodb.Table;
}

export class QueueConstruct extends cdk.Construct {
  public readonly queueInsert: lambda.Function;

  public readonly queueLookup: lambda.Function;

  constructor(scope: cdk.Construct, id: string, props: Props) {
    super(scope, id);

    const queueTable = new dynamodb.Table(this, 'Queue', {
      partitionKey: { name: 'token', type: dynamodb.AttributeType.STRING },
    });

    const resultTable = new dynamodb.Table(this, 'QueueResult', {
      partitionKey: { name: 'token', type: dynamodb.AttributeType.STRING },
    });

    const queueWorker = new lambda.Function(this, 'QueueWorker', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'queue-worker.handler',
      code: lambda.Code.fromAsset('src'),
      environment: {
        QUEUE_TABLE_NAME: queueTable.tableName,
        RESULT_TABLE_NAME: resultTable.tableName,
        FUNCTION_NAME_CHARACTER: props.characterWorkerFunc.functionName,
        FUNCTION_NAME_SPELL: props.spellWorkerFunc.functionName,
        FUNCTION_NAME_ITEM: props.itemWorkerFunc.functionName,
      },
      timeout: cdk.Duration.seconds(15),
    });

    const waitState = new sfn.Wait(this, 'Wait X Seconds', {
      time: sfn.WaitTime.secondsPath('$.wait_time'),
    });

    const workerState = new sfnTasks.LambdaInvoke(this, 'Work Queue', {
      lambdaFunction: queueWorker,
      outputPath: '$.Payload',
    });

    const chain = sfn.Chain.start(waitState).next(workerState);

    const machine = new sfn.StateMachine(this, 'StateMachine', {
      definition: chain,
      timeout: cdk.Duration.seconds(160),
    });

    this.queueInsert = new lambda.Function(this, 'QueueInsert', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'queue-insert.handler',
      code: lambda.Code.fromAsset('src'),
      environment: {
        SPELL_CACHE_TABLE_NAME: props.spellCacheTable.tableName,
        ITEM_CACHE_TABLE_NAME: props.itemCacheTable.tableName,
        QUEUE_TABLE_NAME: queueTable.tableName,
        QUEUE_STATE_MACHINE: machine.stateMachineArn,
      },
      timeout: cdk.Duration.seconds(10),
    });

    this.queueLookup = new lambda.Function(this, 'QueueLookup', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'queue-lookup.handler',
      code: lambda.Code.fromAsset('src'),
      environment: {
        RESULT_TABLE_NAME: resultTable.tableName,
      },
      timeout: cdk.Duration.seconds(10),
    });

    queueTable.grantReadWriteData(this.queueInsert);
    queueTable.grantReadWriteData(queueWorker);

    resultTable.grantReadData(this.queueLookup);
    resultTable.grantReadWriteData(queueWorker);

    machine.grantStartExecution(this.queueInsert);

    props.characterWorkerFunc.grantInvoke(queueWorker);
    props.spellWorkerFunc.grantInvoke(queueWorker);
    props.itemWorkerFunc.grantInvoke(queueWorker);

    props.itemCacheTable.grantReadData(this.queueInsert);
    props.spellCacheTable.grantReadData(this.queueInsert);
  }
}
