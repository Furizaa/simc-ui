import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Select } from '@chakra-ui/core';
import { Field, FieldProps, useFormikContext } from 'formik';
import React from 'react';
import * as SIMC from 'types/simc';

export interface FormSimulationCustomStepFightValues {
  fightLength: SIMC.FightLength;
  fightLengthVariation: SIMC.FightLengthVariation;
  fightStyle: SIMC.FightStyle;
}

type FormValues = FormSimulationCustomStepFightValues;

export default function FormSimulationCustomStepFight() {
  const { setFieldValue, errors } = useFormikContext<FormSimulationCustomStepFightValues>();

  return (
    <>
      <Field name="fightLength">
        {({ field }: FieldProps<FormValues['fightLength'], FormValues>) => (
          <FormControl mt={6}>
            <FormLabel variant="large">Combat Length</FormLabel>
            <Select
              variant="filled"
              onChange={event => setFieldValue('fightLength', event.target.value)}
              value={field.value}
            >
              {Object.entries(SIMC.FIGHT_LENGTH)
                .sort((a, b) => (a[0] > b[0] ? -1 : 1))
                .map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
            </Select>
            <FormErrorMessage>{errors.fightLength}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name="fightLengthVariation">
        {({ field }: FieldProps<FormValues['fightLengthVariation'], FormValues>) => (
          <FormControl mt={6}>
            <FormLabel variant="large">Combat Length Variation</FormLabel>
            <Select
              variant="filled"
              onChange={event => setFieldValue('fightLengthVariation', event.target.value)}
              value={field.value}
            >
              {Object.entries(SIMC.FIGHT_LENGTH_VARIATION)
                .sort((a, b) => (a[0] > b[0] ? -1 : 1))
                .map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
            </Select>
            <FormHelperText>
              Varying time of combat improves simulation of trinkets and abilities with long cooldowns.
            </FormHelperText>
            <FormErrorMessage>{errors.fightLengthVariation}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name="fightStyle">
        {({ field }: FieldProps<FormValues['fightStyle'], FormValues>) => (
          <FormControl mt={6}>
            <FormLabel variant="large">Combat Style</FormLabel>
            <Select
              variant="filled"
              onChange={event => setFieldValue('fightStyle', event.target.value)}
              value={field.value}
            >
              {Object.entries(SIMC.FIGHT_STYLE).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.fightStyle}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </>
  );
}
