import React, { useCallback } from 'react';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input } from '@chakra-ui/core';
import * as Yup from 'yup';
import useSimulationsStore from '@sim/store/useSimulationsStore';
import useInterfaceStateStore from '@sim/store/useInterfaceStateStore';
import SimcConfigurationDropdown from '../SimcConfigurationDropdown';
import dbSimulationPresets from '../../../data/simConfigs';

export interface FormSimulationPresetProps {
  onSimulationCreated: () => void;
}

interface FormValues {
  simulationPresetId: string;
  simulationName: string;
}

export default function FormSimulationPreset({ onSimulationCreated }: FormSimulationPresetProps) {
  const setSelectedSimulationId = useInterfaceStateStore(useCallback(store => store.setSelectedSimulationId, []));
  const createSimulation = useSimulationsStore(store => useCallback(store.createSimulation, []));

  const validPresetIds = dbSimulationPresets.map(preset => preset.id);

  const validationSchema = Yup.object().shape({
    simulationPresetId: Yup.string().required('Preset is required').oneOf(validPresetIds, 'This preset is not valid'),
    simulationName: Yup.string().min(2, 'Name is to short').max(32, 'Name is to long').required('Name is required'),
  });

  const handleSubmit = (formValues: FormValues) => {
    const simulationId = createSimulation(formValues.simulationName, formValues.simulationPresetId);
    setSelectedSimulationId(simulationId);
    onSimulationCreated();
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ simulationPresetId: '', simulationName: '' }}
      validationSchema={validationSchema}
    >
      {(props: FormikProps<FormValues>) => {
        return (
          <Form>
            <Field name="simulationPresetId">
              {({ field }: FieldProps<FormValues['simulationPresetId'], FormValues>) => (
                <FormControl
                  mt={6}
                  isInvalid={Boolean(props.errors.simulationPresetId) && Boolean(props.touched.simulationPresetId)}
                >
                  <FormLabel variant="large">Select Preset</FormLabel>
                  <SimcConfigurationDropdown
                    value={field.value}
                    onSelect={value => {
                      props.setFieldValue('simulationPresetId', value);
                      const preset = dbSimulationPresets.find(item => item.id === value);
                      if (preset) {
                        props.setFieldValue('simulationName', preset.name);
                      }
                    }}
                  />
                  <FormErrorMessage>{props.errors.simulationPresetId}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="simulationName">
              {({ field }: FieldProps<FormValues['simulationName'], FormValues>) => (
                <FormControl
                  mt={6}
                  isInvalid={Boolean(props.errors.simulationName) && Boolean(props.touched.simulationName)}
                >
                  <FormLabel variant="large">Simulation Name</FormLabel>
                  <Input
                    variant="filled"
                    onChange={event => props.setFieldValue('simulationName', event.target.value)}
                    value={field.value}
                  />
                  <FormErrorMessage>{props.errors.simulationName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <HStack mt={6} spacing={6}>
              <Button flexShrink={0} isLoading={props.isSubmitting} colorScheme="blue" type="submit">
                Create
              </Button>
            </HStack>
          </Form>
        );
      }}
    </Formik>
  );
}
