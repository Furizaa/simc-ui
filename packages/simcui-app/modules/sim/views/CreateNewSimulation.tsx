import { Box } from '@chakra-ui/core';
import React from 'react';
import { Field, Form, Formik, FormikProps, FieldProps } from 'formik';
import useSimulationsStore from '../store/useSimulationsStore';
import FormLayoutNewSimulation from '../components/FormLayoutNewSimulation';
import SimcConfigurationDropdown from '../components/SimcConfigurationDropdown';
import { useRouter } from '../../shared/context/RouterContext';

interface FormValues {
  configurationId: string | undefined;
}

export default function ModalNewSimulation() {
  const createSimulation = useSimulationsStore((state) => state.createSimulation);
  const { push } = useRouter();

  const handleSubmit = (values: FormValues) => {
    if (values.configurationId) {
      createSimulation(values.configurationId);
      push('SIM_HOME');
    }
  };

  return (
    <Box
      pos="absolute"
      top="1em"
      left="1em"
      bottom="1em"
      right="1em"
      bgColor="translucent"
      borderRadius="4px"
      borderColor="gray.800"
      borderWidth="1px"
      d="flex"
      justifyContent="center"
      alignItems="center"
      overflowY="auto"
    >
      <Box>
        <Formik onSubmit={handleSubmit} initialValues={{ executableGUID: undefined, configurationId: undefined }}>
          {(props: FormikProps<FormValues>) => {
            return (
              <Form>
                <FormLayoutNewSimulation
                  configurationComponent={
                    <Field name="configurationId">
                      {({ field }: FieldProps<FormValues['configurationId'], FormValues>) => (
                        <SimcConfigurationDropdown
                          value={field.value}
                          onSelect={(value) => props.setFieldValue('configurationId', value)}
                        />
                      )}
                    </Field>
                  }
                  onClickComplete={() => null}
                  isComplete={Boolean(props.values.configurationId)}
                />
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
}
