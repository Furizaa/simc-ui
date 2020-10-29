#!/usr/bin/env node
/* eslint-disable no-new */
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import CloudStack from '../lib/cloud-stack';

const app = new cdk.App();
new CloudStack(app, 'CloudStack');
