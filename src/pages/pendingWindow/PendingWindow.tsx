import "./PendingWindow.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSession, getGameState } from "src/entities/game/gameApi";
import Bubbles1 from "src/shared/ui/bubbles/Bubbles1";
import Bubbles2 from "src/shared/ui/bubbles/Bubbles2";
import { useAppSelector } from "src/shared/hooks/ReduxHooks";

const PendingWindow = () => {
  const navigate = useNavigate();
  const sessionId = Number(localStorage.getItem("sessionId"));
  const client = useAppSelector(state => state["CLIENT_REDUCER"].client);
  const [gameState, setGameState] = useState<string>();
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (sessionId) {
  //       const getStateProm = getGameState(sessionId);
  //       getStateProm.then((res) => {
  //         setGameState(res.gameState);
  //       });
  //     }
  //   }, 10000);
  //   return () => clearInterval(intervalId);
  // }, [sessionId]);

  useEffect(() => {
    if (client) {
      client.connect({}, () => {
        console.log("Connected: ");
        client.subscribe(`/topic/sea/${sessionId}`, function(message) {
          if (JSON.parse(message.body).status == "STATUS_ARRANGEMENT") {
            setGameState("STATUS_ARRANGEMENT");
          }
        });
      });
    }
  }, []);

  useEffect(() => {
    if (gameState === "STATUS_ARRANGEMENT") {
      navigate("/placementships");
    }
  }, [gameState, navigate]);
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
        <h1 className="card_title">FINDING RIVAL</h1>
        <span className="loader"></span>
        <button
          className="cancel-button"
          onClick={() => {
            navigate("/mainscreen");
            deleteSession(Number(localStorage.getItem("sessionId")));
          }}
        >
          Cancel
        </button>
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

export default PendingWindow;
