import type { FC } from 'react';

import type { FormInputProps } from './form-input.types';

import { Group, Input, FormInputLabel } from './form-input.styles';

const FormInput: FC<FormInputProps> = ({ label, ...inputProps }) => {
  return (
    <Group>
      <Input {...inputProps} />
      {label && (
        <FormInputLabel
          $shrink={Boolean(
            inputProps.value &&
            typeof inputProps.value === 'string' &&
            inputProps.value.length,
          )}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
