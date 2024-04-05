import "./Layout.css";

import { ReactNode } from "react";

type LayoutProps = {
  back_button?: ReactNode;
  help_button?: ReactNode;
  timer?: ReactNode;
  text?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
};

const LayoutNew = ({
  back_button,
  timer,
  help_button,
  text,
  children,
  footer,
}: LayoutProps) => {
  return (
    <div className="layout">
      <header className="layout_header">
        {back_button}

        <div className="timer-turn">
          {timer}
          {text}
        </div>

        {help_button}
      </header>
      <main className="layout_main">{children}</main>
      <footer className="layout_footer">{footer}</footer>
    </div>
  );
};

export default LayoutNew;
