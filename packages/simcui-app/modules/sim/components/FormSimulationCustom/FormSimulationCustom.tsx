import React from 'react';
import * as Yup from 'yup';
import * as SIMC from 'types/simc';
import FormWizard from '../FormWizard';
import FormWizardStep from '../FormWizardStep';
import FormSimulationCustomStepTarget from '../FormSimulationCustomStepTarget';
import FormSimulationCustomStepFight from '../FormSimulationCustomStepFight';

export interface FormSimulationCustomProps {}

interface FormValues {
  target: SIMC.Target;
  targetError: SIMC.TargetError;
  targetIterations: SIMC.Iterations;
  fightLength: SIMC.FightLength;
  fightLengthVariation: SIMC.FightLengthVariation;
  fightStyle: SIMC.FightStyle;
}

export default function FormSimulationCustom({ onSimulationCreated }: FormSimulationCustomProps) {
  const validationSchema = Yup.object().shape({});

  const initialValues: FormValues = {
    target: 'error_threshold',
    targetError: 'Auto',
    targetIterations: '10000',
    fightLength: 300,
    fightLengthVariation: '0.2',
    fightStyle: 'Patchwerk',
  };

  const handleWizardSubmit = (formValues: FormValues) => {};

  return (
    <FormWizard onSubmit={handleWizardSubmit} initialValues={initialValues}>
      <FormWizardStep label="Simulation Target Condition" validationSchema={validationSchema}>
        <FormSimulationCustomStepTarget />
      </FormWizardStep>
      <FormWizardStep label="Combat Configuration" validationSchema={validationSchema}>
        <FormSimulationCustomStepFight />
      </FormWizardStep>
    </FormWizard>
  );
}
