import "./PendingWindow.css";
import { useNavigate } from "react-router-dom";
import { deleteSession, getGameState } from "src/entities/game/gameApi";
import { useEffect, useState } from "react";
import { gameStateType } from "@/pages/battleground/Battleground";

const PendingWindow = () => {
  const navigate = useNavigate();
  const sessionId = Number(localStorage.getItem("sessionId"));
  const [gameState, setGameState] = useState<gameStateType>();
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (sessionId) {
        const getStateProm = getGameState(sessionId);
        getStateProm.then((res) => {
          setGameState(res);
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [sessionId]);

  useEffect(() => {
    if (gameState?.gameState === "STATUS_ARRANGEMENT") {
      navigate("/placementships");
    }
  }, [gameState]);
  return (
    <div className="pendingWindow">
      <h1>PENDING RIVAL</h1>
      <button onClick={() => {
        navigate("/mainscreen");
        deleteSession(Number(localStorage.getItem("sessionId")));
      }}>Cancel
      </button>
    </div>
  );
};

export default PendingWindow;