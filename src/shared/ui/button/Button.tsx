import "./button.css";

import { MouseEventHandler } from "react";

export type ButtonProps = {
  className: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  children: string;
};

const Button = ({ className, onClick, disabled, children }: ButtonProps) => (
  <button className={`${className}`} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

export default Button;
