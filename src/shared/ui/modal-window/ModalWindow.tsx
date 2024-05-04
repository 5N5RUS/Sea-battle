import "./ModalWindow.css";

import { useNavigate } from "react-router-dom";
import Button from "src/shared/ui/button/Button";

export type modalWindowProps = {
  winnerId: number;
  scores: number | undefined;
};

const ModalWindow = ({ winnerId, scores }: modalWindowProps) => {
  const playerId = Number(localStorage.getItem("userId"));
  const navigate = useNavigate();

  function checkResult() {
    if (winnerId === playerId) {
      return "YOU WON!";
    } else {
      return "YOU LOSE!";
    }
  }

  return (
    <div className="modal-window">
      <div className="modal-window-content">
        <div className="modal-window__header">
          <div className="header__circles">
            <div className="circles_circle circle_first"></div>
            <div className="circles_circle circle_second"></div>
            <div className="circles_circle circle_third"></div>
          </div>
          <p className="header__title">battle finished</p>
        </div>
        <h1
          className={`modal-window__title ${checkResult() === "YOU LOSE!" ? "lose" : "win"} `}
        >
          {checkResult()}
        </h1>
        <p className={"modal-window__scores"}>your score: {scores}</p>
        <Button
          className={"card__button"}
          onClick={() => {
            navigate("/mainscreen");
          }}
        >
          BACK TO MAIN MENU
        </Button>
      </div>
    </div>
  );
};

export default ModalWindow;
