import { useEffect, useState } from "react";
import { whoami } from "src/entities/user/userApi";
import { gameStateType } from "src/pages/battleground/Battleground";
import { post } from "src/shared/api/fetcher";
import ModalWindow from "src/shared/ui/modal-window/ModalWindow";

type GroundProps = {
  text?: string;
  img_src?: string;
  gameState: gameStateType | undefined;
  objectsShipBlock: Block[];
  setObjectsShipBlock: React.Dispatch<React.SetStateAction<Block[]>>;
  setCountShips: React.Dispatch<React.SetStateAction<number[]>>;
  countShips: number[];
};

export type userDataType = {
  id: number;
  login: string;
  rating: number;
};

export interface Block {
  key: string;
  className: string;
}

const Ground = ({
                  text,
                  img_src,
                  gameState,
                  objectsShipBlock,
                  setObjectsShipBlock,
                  countShips,
                  setCountShips,
                }: GroundProps) => {
  const [userData, setUserData] = useState<userDataType>();
  const [sessionId, setSessionId] = useState<number>();
  const userId = Number(localStorage.getItem("userId"));
  const [myTurn, setMyTurn] = useState(false);
  const handleBlockClick = async (key: string) => {
    if (myTurn) {
      try {
        const { axis, ordinate } = JSON.parse(key);
        if (objectsShipBlock[(axis - 1) * 10 + ordinate - 1].className == "miss") {
          return;
        }
        const resul = post(`session/${sessionId}/turn`, { axis, ordinate });
        resul.then((data) => {
          if (data.result === "catch" || data.result === "killed") {
            const updatedObjectsShipBlock = objectsShipBlock.map((block) =>
              block.key === key ? { ...block, className: "element" } : block,
            );
            if (data.result == "killed") {
              const field = updatedObjectsShipBlock;
              const startCoords = { axis: axis, ordinate: ordinate };
              let coords = startCoords;
              let size = 1;
              let flag = false;
              const shipCells = [];
              shipCells.push({ axis: coords.axis, ordinate: coords.ordinate });
              while (!flag) {
                if (coords.ordinate - 1 > 0) {
                  if (field[(coords.axis - 1) * 10 + coords.ordinate - 2].className == "element") {
                    coords = { axis: coords.axis, ordinate: coords.ordinate - 1 };
                    shipCells.push({ axis: coords.axis, ordinate: coords.ordinate });
                    size++;
                  } else {
                    flag = true;
                  }
                } else {
                  flag = true;
                }
              }
              flag = false;
              coords = startCoords;
              while (!flag) {
                if (coords.ordinate + 1 <= 10) {
                  if (field[(coords.axis - 1) * 10 + coords.ordinate].className == "element") {
                    coords = { axis: coords.axis, ordinate: coords.ordinate + 1 };
                    shipCells.push({ axis: coords.axis, ordinate: coords.ordinate });
                    size++;
                  } else {
                    flag = true;
                  }
                } else {
                  flag = true;
                }
              }
              flag = false;
              coords = startCoords;
              while (!flag) {
                if (coords.axis + 1 <= 10) {
                  if (field[(coords.axis) * 10 + coords.ordinate - 1].className == "element") {
                    coords = { axis: coords.axis + 1, ordinate: coords.ordinate };
                    shipCells.push({ axis: coords.axis, ordinate: coords.ordinate });
                    size++;
                  } else {
                    flag = true;
                  }
                } else {
                  flag = true;
                }
              }

              flag = false;
              coords = startCoords;
              while (!flag) {
                if (coords.axis - 1 > 0) {
                  if (field[(coords.axis - 2) * 10 + coords.ordinate - 1].className == "element") {
                    coords = { axis: coords.axis - 1, ordinate: coords.ordinate };
                    shipCells.push({ axis: coords.axis, ordinate: coords.ordinate });
                    size++;
                  } else {
                    flag = true;
                  }
                } else {
                  flag = true;
                }
              }
              const newCount = countShips;
              switch (size) {
                case 1:
                  newCount[3] = newCount[3] - 1;
                  setCountShips(newCount);
                  break;
                case 2:
                  newCount[2] = newCount[2] - 1;
                  setCountShips(newCount);
                  break;
                case 3:
                  newCount[1] = newCount[1] - 1;
                  setCountShips(newCount);
                  break;
                case 4:
                  newCount[0] = newCount[0] - 1;
                  setCountShips(newCount);
                  break;
              }
              shipCells.map((el) => {
                if (el.ordinate < 10) {
                  if (field[(el.axis - 1) * 10 + el.ordinate].className == "grid-item") {
                    updatedObjectsShipBlock[(el.axis - 1) * 10 + el.ordinate].className = "miss";
                  }
                }
                if (el.ordinate > 1) {
                  if (field[(el.axis - 1) * 10 + el.ordinate - 2].className == "grid-item") {
                    updatedObjectsShipBlock[(el.axis - 1) * 10 + el.ordinate - 2].className = "miss";
                  }
                }
                if (el.axis > 1) {
                  if (field[(el.axis - 2) * 10 + el.ordinate - 1].className == "grid-item") {
                    updatedObjectsShipBlock[(el.axis - 2) * 10 + el.ordinate - 1].className = "miss";
                  }
                }
                if (el.axis < 10) {
                  if (field[(el.axis) * 10 + el.ordinate - 1].className == "grid-item") {
                    updatedObjectsShipBlock[(el.axis) * 10 + el.ordinate - 1].className = "miss";
                  }
                }
                if (el.axis < 10 && el.ordinate < 10) {
                  if (field[(el.axis) * 10 + el.ordinate].className == "grid-item") {
                    updatedObjectsShipBlock[(el.axis) * 10 + el.ordinate].className = "miss";
                  }
                }
                if (el.axis < 10 && el.ordinate > 1) {
                  if (field[(el.axis) * 10 + el.ordinate - 2].className == "grid-item") {
                    updatedObjectsShipBlock[(el.axis) * 10 + el.ordinate - 2].className = "miss";
                  }
                }
                if (el.axis > 1 && el.ordinate < 10) {
                  if (field[(el.axis - 2) * 10 + el.ordinate].className == "grid-item") {
                    updatedObjectsShipBlock[(el.axis - 2) * 10 + el.ordinate].className = "miss";
                  }
                }
                if (el.axis > 1 && el.ordinate > 1) {
                  if (field[(el.axis - 2) * 10 + el.ordinate - 2].className == "grid-item") {
                    updatedObjectsShipBlock[(el.axis - 2) * 10 + el.ordinate - 2].className = "miss";
                  }
                }
              });
            }
            setObjectsShipBlock(updatedObjectsShipBlock);
          } else if (data.result === "Already attacked") {
            console.log("Already attacked");
          } else {
            const updatedObjectsShipBlock = objectsShipBlock.map((block) =>
              block.key === key ? { ...block, className: "miss" } : block,
            );
            setObjectsShipBlock(updatedObjectsShipBlock);
          }
        });
      } catch (error) {
        console.error("Error making a turn:", error);
        console.log(error);
      }
      setMyTurn(false);
    }
  };
  useEffect(() => {
    const blocks: Block[] = [];
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        const key = JSON.stringify({ axis: i, ordinate: j });
        blocks.push({ key, className: "grid-item" });
      }
    }
    setObjectsShipBlock(blocks);
  }, [setObjectsShipBlock]);
  useEffect(() => {
    whoami().then((res: userDataType) => {
      setUserData(res);
    });
    if (gameState?.turnPlayerId == userId) {
      setMyTurn(true);
    } else {
      setMyTurn(false);
    }
    const storedSessionId = Number(localStorage.getItem("sessionId"));
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, [sessionId, userId, gameState]);

  if (!gameState) {
    return null;
  }
  return (
    <>
      {gameState?.gameState === "STATUS_FINISH" ? (
        <ModalWindow winnerId={gameState.winnerId} scores={userData?.rating} />
      ) : null}
      <div className="ground-wrapper">
        <div className="grid-container">
          {objectsShipBlock.map((block) => (
            <div
              key={block.key}
              className={block.className}
              onClick={() => handleBlockClick(block.key)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleBlockClick(block.key);
                }
              }}
              role="button"
              tabIndex={0}
            ></div>
          ))}
        </div>
        <div className="ground__name_wrapper">
          <img src={img_src} alt="ground-img" />
          <p className="ground__name">{text}</p>
        </div>
      </div>
    </>
  );
};

export default Ground;
