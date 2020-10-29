import { Box } from '@chakra-ui/core';
import React from 'react';
import { Field, Form, Formik, FormikProps, FieldProps } from 'formik';
import useSimulationsStore from '../store/useSimulationsStore';
import FormLayoutNewSimulation from '../components/FormLayoutNewSimulation';
import SimcExecutableDropdown from '../components/SimcExecutableDropdown';
import SimcConfigurationDropdown from '../components/SimcConfigurationDropdown';
import { useRouter } from '../../shared/context/RouterContext';

interface FormValues {
  executableGUID: string | undefined;
  configurationId: string | undefined;
}

export default function ModalNewSimulation() {
  const createSimulation = useSimulationsStore((state) => state.createSimulation);
  const { push } = useRouter();

  const handleSubmit = (values: FormValues) => {
    if (values.executableGUID && values.configurationId) {
      createSimulation(values.executableGUID, values.configurationId);
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
                  executableComponent={
                    <Field name="executableGUID">
                      {({ field }: FieldProps<FormValues['executableGUID'], FormValues>) => (
                        <SimcExecutableDropdown
                          value={field.value}
                          onSelect={(value) => props.setFieldValue('executableGUID', value)}
                        />
                      )}
                    </Field>
                  }
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
                  isComplete={Boolean(props.values.executableGUID) && Boolean(props.values.configurationId)}
                />
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
}
