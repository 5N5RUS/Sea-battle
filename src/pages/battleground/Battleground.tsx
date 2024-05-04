import "./Battleground.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGameState } from "src/entities/game/gameApi";
import CountDownTimer from "src/features/timer/CountDownTimer";
import Button from "src/shared/ui/button/Button";
import MyGround, { targetCellType } from "src/shared/ui/ground/MyGround";
import Layout from "src/shared/ui/layout/Layout";

import Ground, { Block } from "../../shared/ui/ground/Ground";

export type gameStateType = {
  id: number;
  createDate: Date;
  winnerId: number;
  targetPlayer: number;
  turnPlayerId: number;
  gameState: string;
  userFirst: number;
  userSecond: number;
  arrangementStartDate: Date;
  startGameDate: Date;
  playerTurnStartDate: Date;
  playerTurnCoords: { axis: number; ordinate: number };
  targetCell: {
    axis: number;
    ordinate: number;
  };
};

const Battleground = () => {
  const [countShips, setCountShips] = useState<number[]>([1, 2, 3, 4]);
  const [objectsShipBlock, setObjectsShipBlock] = useState<Block[]>([]);
  const sessionId = Number(localStorage.getItem("sessionId"));
  const [gameState, setGameState] = useState<gameStateType>();
  const userId = Number(localStorage.getItem("userId"));
  const [isMyTurn, setMyTurn] = useState(false);
  const [targetPlayer, setTargetPlayer] = useState<number>();
  const [targetCell, setTargetCell] = useState<targetCellType>();
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (sessionId) {
        const getStateProm = getGameState(sessionId);
        getStateProm.then((res) => {
          setGameState(res);
          setTargetPlayer(res.targetPlayer);
          setTargetCell(res.playerTurnCoords);
          if (res.turnPlayerId == userId) {
            setMyTurn(true);
          }
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [sessionId, userId]);
  const navigate = useNavigate();
  return (
    <Layout
      back_button={
        <Button
          className={"back-button"}
          onClick={() => {
            navigate("/mainscreen");
          }}
          disabled={false}
        >
          <img
            src="src/assets/svgs/back-arrow.svg"
            alt="icon for back button"
          />
        </Button>
      }
      timer={<CountDownTimer minutes={1} seconds={0} />}
      text={
        <p className="player-turn">
          {gameState?.turnPlayerId == userId ? "Your turn" : "Enemy's turn"}
        </p>
      }
      help_button={
        <Button
          className="rules-button"
          onClick={() => {
            alert("I need help you");
          }}
          disabled={false}
        >
          <img src="src/assets/svgs/rules.svg" alt="icon for rules button" />
        </Button>
      }
    >
      <div className="main__battlegrounds">
        <MyGround
          img_src="src/assets/svgs/my-player.svg"
          text="Your ships"
          isMyTurn={isMyTurn}
          targetCell={targetCell}
          targetPlayer={targetPlayer}
        />

        <Ground
          countShips={countShips}
          setCountShips={setCountShips}
          gameState={gameState}
          img_src="src/assets/svgs/enemy-player.svg"
          text="Enemy’s ships"
          objectsShipBlock={objectsShipBlock}
          setObjectsShipBlock={setObjectsShipBlock}
        />
      </div>

      <div
        style={{
          width: 470,
          height: 111,
          position: "relative",
          left: 650,
          marginTop: 20,
        }}
      >
        <div
          style={{
            left: 200,
            top: 1,
            position: "absolute",
            fontSize: 36,
            fontFamily: "PT Sans",
            fontWeight: 700,
            wordWrap: "break-word",
          }}
        >
          — {countShips[0]}
        </div>
        <div
          style={{
            left: 152,
            top: 66,
            position: "absolute",
            color: "#2C2C2C",
            fontSize: 36,
            fontFamily: "PT Sans",
            fontWeight: 700,
            wordWrap: "break-word",
          }}
        >
          — {countShips[1]}
        </div>
        <div
          style={{
            left: 401,
            top: 2,
            position: "absolute",
            color: "#2C2C2C",
            fontSize: 36,
            fontFamily: "PT Sans",
            fontWeight: 700,
            wordWrap: "break-word",
          }}
        >
          — {countShips[2]}
        </div>
        <div
          style={{
            left: 353,
            top: 65,
            position: "absolute",
            color: "#2C2C2C",
            fontSize: 36,
            fontFamily: "PT Sans",
            fontWeight: 700,
            wordWrap: "break-word",
          }}
        >
          — {countShips[3]}
        </div>
        <div
          className={"full-one"}
          style={{
            width: 46,
            height: 46,
            left: 297,
            top: 64,
            position: "absolute",
          }}
        />
        <div
          className={"full-two"}
          style={{
            width: 94,
            height: 46,
            left: 297,
            top: 1,
            position: "absolute",
          }}
        />
        <div
          className={"full-four"}
          style={{
            width: 190,
            height: 46,
            left: 0,
            top: 0,
            position: "absolute",
          }}
        />
        <div
          className={"full-three"}
          style={{
            width: 142,
            height: 46,
            left: 0,
            top: 65,
            position: "absolute",
          }}
        />
      </div>
    </Layout>
  );
};

export default Battleground;
