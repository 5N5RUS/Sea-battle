import "./MainCard.css";

import { ReactNode } from "react";
import Bubbles1 from "src/shared/ui/bubbles/Bubbles1";
import Bubbles2 from "src/shared/ui/bubbles/Bubbles2";

export type MainCardProps = {
  title: ReactNode;
  main: ReactNode;
  button?: ReactNode;
};

const MainCard = ({ title, main }: MainCardProps) => {
  return (
    <div className="main">
      <Bubbles1 />
      <div className="main__card">
        <div className="card__header">
          <div className="header__circles">
            <div className="circles_circle circle_first"></div>
            <div className="circles_circle circle_second"></div>
            <div className="circles_circle circle_third"></div>
          </div>
        </div>
        <h1 className="card_title">{title}</h1>
        {main}
      </div>
      <div>
        <img
          className="mainreg_logo"
          src="src\assets\images\Logo.jpg"
          alt="Sea Battle main logo"
        />
        <Bubbles2 />
      </div>
    </div>
  );
};

export default MainCard;
