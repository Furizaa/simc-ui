import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  Select,
} from '@chakra-ui/core';
import { Field, FieldProps, useFormikContext } from 'formik';
import React from 'react';
import * as SIMC from 'types/simc';

export interface FormSimulationCustomStepTargetValues {
  target: SIMC.Target;
  targetError: SIMC.TargetError;
  targetIterations: SIMC.Iterations;
}

type FormValues = FormSimulationCustomStepTargetValues;

export default function FormSimulationCustomStepTarget() {
  const { values, setFieldValue, errors } = useFormikContext<FormSimulationCustomStepTargetValues>();

  return (
    <>
      <Field name="target">
        {({ field }: FieldProps<FormValues['target'], FormValues>) => (
          <FormControl mt={6}>
            <FormLabel variant="large">Simulation Target</FormLabel>
            <RadioGroup
              name="target"
              onChange={value => {
                setFieldValue('target', value);
              }}
              value={field.value}
            >
              <HStack spacing={5}>
                <Radio value="error_threshold">Error Threshold</Radio>
                <Radio value="iterations">Iterations</Radio>
              </HStack>
            </RadioGroup>
            <FormHelperText>Run the simulation until one of this conditions is satisfied.</FormHelperText>
          </FormControl>
        )}
      </Field>

      {values.target === 'error_threshold' && (
        <Field name="targetError">
          {({ field }: FieldProps<FormValues['targetError'], FormValues>) => (
            <FormControl mt={6}>
              <FormLabel variant="large">Target Error Threshold</FormLabel>
              <Select
                variant="filled"
                onChange={event => setFieldValue('targetError', event.target.value)}
                value={field.value}
              >
                {Object.entries(SIMC.TARGET_ERROR)
                  .sort((a, b) => (a[1] > b[1] ? -1 : 1))
                  .map(([label]) => (
                    <option key={label} value={label}>
                      {label}
                    </option>
                  ))}
              </Select>
              <FormHelperText>Run iterations until this error threshold is reached.</FormHelperText>
              <FormErrorMessage>{errors.targetError}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      )}

      {values.target === 'iterations' && (
        <Field name="targetIterations">
          {({ field }: FieldProps<FormValues['targetIterations'], FormValues>) => (
            <FormControl mt={6}>
              <FormLabel variant="large">Target Iterations</FormLabel>
              <Select
                variant="filled"
                onChange={event => setFieldValue('targetIterations', event.target.value)}
                value={field.value}
              >
                {Object.entries(SIMC.ITERATIONS)
                  .sort((a, b) => (a[1] > b[1] ? -1 : 1))
                  .map(([label]) => (
                    <option key={label} value={label}>
                      {label}
                    </option>
                  ))}
              </Select>
              <FormHelperText>Number of iterations the simulation is running.</FormHelperText>
              <FormErrorMessage>{errors.targetIterations}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      )}
    </>
  );
}
