import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

type TextProps = {
  text: string;
};

type ChildrenProps = {
  children: ReactNode;
};

type ButtonProps = Omit<React.HTMLAttributes<HTMLButtonElement>, 'children'> &
  (TextProps | ChildrenProps);

const Button: React.FC<ButtonProps> = ({
  className,
  ...restProps
}: ButtonProps) => {
  if ('children' in restProps) {
    const { children, ...otherProps } = restProps;
    return (
      <button {...otherProps} className={classNames(styles.Button, className)}>
        {children}
      </button>
    );
  }

  const { text, ...otherProps } = restProps;
  return (
    <button {...otherProps} className={classNames(styles.Button, className)}>
      {text}
    </button>
  );
};

Button.defaultProps = {};

export default React.memo(Button);
