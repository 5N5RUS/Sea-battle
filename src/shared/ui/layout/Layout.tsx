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

const Layout = ({
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
        <div className="button_wrapper">{back_button}</div>
        <div className="timer-turn">
          {timer}
          {text}
        </div>
        <div className="button_wrapper">{help_button}</div>
      </header>
      <main className="layout_main">{children}</main>
      <footer className="layout_footer">{footer}</footer>
    </div>
  );
};

export default Layout;
