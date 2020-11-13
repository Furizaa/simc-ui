import { Box, Button, HStack, Text, VStack } from '@chakra-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { FormWizardStepProps } from '../FormWizardStep/FormWizardStep';

export interface FormWizardProps<T> {
  children?:
    | React.ReactElement<FormWizardStepProps<Partial<T>>>
    | React.ReactElement<FormWizardStepProps<Partial<T>>>[];
  initialValues: T;
  onSubmit: (formValues: T, helpers: FormikHelpers<T>) => Promise<any> | void;
}

export default function FormWizard<T>({ children, initialValues, onSubmit }: FormWizardProps<T>) {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState<T>(initialValues);

  const step = steps[stepNumber] as React.ReactElement;
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values: T) => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = (values: T) => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values: T, helpers: FormikHelpers<T>): Promise<any> => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, helpers);
    }
    if (isLastStep) {
      return onSubmit(values, helpers);
    }
    helpers.setTouched({});
    next(values);
  };

  return (
    <Formik initialValues={snapshot} onSubmit={handleSubmit} validationSchema={step.props.validationSchema}>
      {formik => (
        <Form>
          <Box mb={4} pb={4} borderBottom="1px solid" borderBottomColor="gray.600">
            <Text fontWeight="bold" fontSize="xl" letterSpacing="0.1em">{`Step ${stepNumber + 1} - ${
              step.props.label
            }`}</Text>
          </Box>

          {step}

          <HStack mt={4} pt={4} borderTop="1px solid" borderTopColor="gray.600" align="start">
            {stepNumber > 0 && (
              <Button onClick={() => previous(formik.values)} type="button" colorScheme="gray" variant="outline">
                Back
              </Button>
            )}

            <Button disabled={formik.isSubmitting} type="submit" colorScheme="blue">
              {isLastStep ? 'Create' : 'Next'}
            </Button>
          </HStack>
        </Form>
      )}
    </Formik>
  );
}
