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
}

export class QueueConstruct extends cdk.Construct {
  public readonly queueInsert: lambda.Function;

  public readonly queueLookup: lambda.Function;

  constructor(scope: cdk.Construct, id: string, props: Props) {
    super(scope, id);

    const table = new dynamodb.Table(this, 'BNETAPIQueue', {
      partitionKey: { name: 'token', type: dynamodb.AttributeType.STRING },
    });

    const queueWorker = new lambda.Function(this, 'QueueWorker', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'queue-worker.handler',
      code: lambda.Code.fromAsset('src'),
      environment: {
        QUEUE_TABLE_NAME: table.tableName,
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
    });

    const chain = sfn.Chain.start(waitState).next(workerState);

    const machine = new sfn.StateMachine(this, 'StateMachine', {
      definition: chain,
      timeout: cdk.Duration.seconds(60),
    });

    this.queueInsert = new lambda.Function(this, 'QueueInsert', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'queue-insert.handler',
      code: lambda.Code.fromAsset('src'),
      environment: {
        QUEUE_TABLE_NAME: table.tableName,
        QUEUE_STATE_MACHINE: machine.stateMachineArn,
      },
      timeout: cdk.Duration.seconds(10),
    });

    this.queueLookup = new lambda.Function(this, 'QueueLookup', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'queue-lookup.handler',
      code: lambda.Code.fromAsset('src'),
      environment: {
        QUEUE_TABLE_NAME: table.tableName,
      },
      timeout: cdk.Duration.seconds(10),
    });

    table.grantReadWriteData(this.queueInsert);
    table.grantReadWriteData(queueWorker);
    table.grantReadData(this.queueLookup);

    machine.grantStartExecution(this.queueInsert);

    props.characterWorkerFunc.grantInvoke(queueWorker);
    props.spellWorkerFunc.grantInvoke(queueWorker);
    props.itemWorkerFunc.grantInvoke(queueWorker);
  }
}
