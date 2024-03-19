import "./button.css";

import { MouseEventHandler, ReactNode } from "react";

export type ButtonProps = {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children?: ReactNode;
};

const Button = ({ className, onClick, disabled, children }: ButtonProps) => (
  <button
    className={`button ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
