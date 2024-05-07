import "./Battleground.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGameState } from "src/entities/game/gameApi";
import CountDownTimer from "src/features/timer/CountDownTimer";
import Button from "src/shared/ui/button/Button";
import MyGround, { targetCellType } from "src/shared/ui/ground/MyGround";
import Layout from "src/shared/ui/layout/Layout";

import Ground, { Block } from "../../shared/ui/ground/Ground";
import { post } from "src/shared/api/fetcher";

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
    const [myShips, setMyShips] = useState(null);
    const [startDate, setStartDate] = useState<Date>();
    useEffect(() => {
      const myShipz = localStorage.getItem("myShips");
      if (myShipz)
        setMyShips(JSON.parse((myShipz)));
    }, []);
    useEffect(() => {

      const intervalId = setInterval(() => {
        if (sessionId) {
          const getStateProm = getGameState(sessionId);
          getStateProm.then((res) => {
            setGameState(res);
            setTargetPlayer(res.targetPlayer);
            setTargetCell(res.playerTurnCoords);
            setStartDate(res.playerTurnStartDate);
            if (res.turnPlayerId == userId) {
              setMyTurn(true);
            }
            if (!res.gameState) {
              navigate("/mainscreen");
            }
          });
        }
      }, 500);
      return () => clearInterval(intervalId);
    }, [sessionId, userId]);
    const navigate = useNavigate();
    if (!startDate) {
      return;
    }
    return (
      <Layout
        back_button={
          <Button
            className={"back-button"}
            onClick={() => {
              post(`session/${sessionId}/leave`, null);
            }}
            disabled={false}
          >
            <img
              src="src/assets/svgs/back-arrow.svg"
              alt="icon for back button"
            />
          </Button>
        }
        timer={<CountDownTimer startDate={startDate} time={30} />}
        text={
          <p className="player-turn">
            {gameState?.turnPlayerId == userId ? "your turn" : "enemy's turn"}
          </p>
        }
        help_button={
          <Button
            className="rules-button"
            onClick={() => {
              alert(
                "The point of the game is a battle of the opponents on two square grids sized 10x10 squares each.\n\nThe aim of the game is to sink all the ships placed in the opponent’s field.\n\nThe rules of ship arrangement\n\nEach player is provided a set of 10 ships.\n\nThe ships can be placed vertically and horizontally, and a distance of at least one square is kept between them.",
              );
            }}
            disabled={false}
          >
            <img src="src/assets/svgs/rules.svg" alt="icon for rules button" />
          </Button>
        }
      >
        <div className="main__battlegrounds">
          <div>
            <div className="battlegrounds__arraycells_numbers-my">
              <div className="battlegrounds__nameofcell-my">1</div>
              <div className="battlegrounds__nameofcell-my"> 2</div>
              <div className="battlegrounds__nameofcell-my"> 3</div>
              <div className="battlegrounds__nameofcell-my"> 4</div>
              <div className="battlegrounds__nameofcell-my"> 5</div>
              <div className="battlegrounds__nameofcell-my"> 6</div>
              <div className="battlegrounds__nameofcell-my"> 7</div>
              <div className="battlegrounds__nameofcell-my"> 8</div>
              <div className="battlegrounds__nameofcell-my"> 9</div>
              <div className="battlegrounds__nameofcell-my"> 10</div>
            </div>
            <div className="battlegrounds__arraycells_wrapper-column">
              <div className="battlegrounds__array_cells-words">
                <div className="battlegrounds__nameofcell-my">A</div>
                <div className="battlegrounds__nameofcell-my">B</div>
                <div className="battlegrounds__nameofcell-my"> C</div>
                <div className="battlegrounds__nameofcell-my"> D</div>
                <div className="battlegrounds__nameofcell-my"> E</div>
                <div className="battlegrounds__nameofcell-my"> F</div>
                <div className="battlegrounds__nameofcell-my"> G</div>
                <div className="battlegrounds__nameofcell-my"> H</div>
                <div className="battlegrounds__nameofcell-my"> I</div>
                <div className="battlegrounds__nameofcell-my"> J</div>
              </div>
              <MyGround
                initialState={[]}
                myShips={myShips}
                img_src="src/assets/svgs/my-player.svg"
                text="Your ships"
                isMyTurn={isMyTurn}
                targetCell={targetCell}
                targetPlayer={targetPlayer}
              />
            </div>
          </div>
          <div>
            <div className="battlegrounds__array_cells-numbers">
              <div className="battlegrounds__nameofcell-enemy">1</div>
              <div className="battlegrounds__nameofcell-enemy"> 2</div>
              <div className="battlegrounds__nameofcell-enemy"> 3</div>
              <div className="battlegrounds__nameofcell-enemy"> 4</div>
              <div className="battlegrounds__nameofcell-enemy"> 5</div>
              <div className="battlegrounds__nameofcell-enemy"> 6</div>
              <div className="battlegrounds__nameofcell-enemy"> 7</div>
              <div className="battlegrounds__nameofcell-enemy"> 8</div>
              <div className="battlegrounds__nameofcell-enemy"> 9</div>
              <div className="battlegrounds__nameofcell-enemy"> 10</div>
            </div>

            <div className="battlegrounds__arraycells_wrapper-column">
              <Ground
                countShips={countShips}
                setCountShips={setCountShips}
                gameState={gameState}
                img_src="src/assets/svgs/enemy-player.svg"
                text="enemy’s ships"
                objectsShipBlock={objectsShipBlock}
                setObjectsShipBlock={setObjectsShipBlock}
              />
              <div className="battlegrounds__arraycells_words-enemy">
                <div className="battlegrounds__nameofcell-enemy">A</div>
                <div className="battlegrounds__nameofcell-enemy">B</div>
                <div className="battlegrounds__nameofcell-enemy">C</div>
                <div className="battlegrounds__nameofcell-enemy">D</div>
                <div className="battlegrounds__nameofcell-enemy">E</div>
                <div className="battlegrounds__nameofcell-enemy">F</div>
                <div className="battlegrounds__nameofcell-enemy">G</div>
                <div className="battlegrounds__nameofcell-enemy">H</div>
                <div className="battlegrounds__nameofcell-enemy">I</div>
                <div className="battlegrounds__nameofcell-enemy">J</div>
              </div>
            </div>
          </div>
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
  }
;

export default Battleground;
