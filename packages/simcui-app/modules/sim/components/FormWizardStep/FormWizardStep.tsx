import { FormikHelpers } from 'formik';
import React from 'react';

export interface FormWizardStepProps<T> {
  onSubmit?: (formValues: T, helpers: FormikHelpers<T>) => Promise<any> | void;
  validationSchema?: any | (() => any);
  children: React.ReactNode;
  label: string;
}

export default function FormWizardStep<T>({ children }: FormWizardStepProps<T>) {
  return <>{children}</>;
}
