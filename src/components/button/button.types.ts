import type { ButtonHTMLAttributes } from 'react';

import type { ButtonTypeClass } from './button-type-class';

export type ButtonProps = {
  buttonType?: ButtonTypeClass;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
