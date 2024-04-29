import Button from "src/shared/ui/button/Button";
import { useNavigate } from "react-router-dom";
import "./ModalWindow.css";

export type modalWindowProps = {
  winnerId: number,
  scores: number | undefined,
}

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
        <h1 className={"modal-window__title"}>BATTLE FINISHED</h1>
        <p className={"modal-window__result"}>{checkResult()}</p>
        <p className={"modal-window__scores"}>your score: {scores}</p>
        <Button className={"modal-window__back"} onClick={() => {
          navigate("/mainscreen");
        }}>BACK TO MAIN MENU</Button>
      </div>
    </div>
  );
};

export default ModalWindow;