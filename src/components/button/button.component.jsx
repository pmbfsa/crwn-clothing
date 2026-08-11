import BUTTON_TYPE_CLASS from './button-type-class.jsx';

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from './button.styles.jsx';

const BUTTON_TYPE_MAP = {
  [BUTTON_TYPE_CLASS.base]: BaseButton,
  [BUTTON_TYPE_CLASS.google]: GoogleSignInButton,
  [BUTTON_TYPE_CLASS.inverted]: InvertedButton,
};

const Button = ({
  children,
  buttonType = BUTTON_TYPE_CLASS.base,
  ...buttonProps
}) => {
  const CustomButton = BUTTON_TYPE_MAP[buttonType];

  return <CustomButton {...buttonProps}>{children}</CustomButton>;
};

export default Button;
