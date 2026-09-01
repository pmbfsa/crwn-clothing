import type { InputHTMLAttributes } from 'react';

export type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export type FormInputLabelProps = {
  $shrink?: boolean;
};
