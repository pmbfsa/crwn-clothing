const BUTTON_TYPE_CLASS = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
} as const;

export type ButtonTypeClass =
  (typeof BUTTON_TYPE_CLASS)[keyof typeof BUTTON_TYPE_CLASS];

export default BUTTON_TYPE_CLASS;
