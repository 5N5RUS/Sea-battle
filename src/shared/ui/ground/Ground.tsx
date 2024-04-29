import { useEffect, useState } from "react";
import { gameStateType } from "src/pages/battleground/Battleground";
import ModalWindow from "src/shared/ui/modal-window/ModalWindow";
import { getUserData } from "src/entities/user/userApi";

type GroundProps = {
  text?: string;
  img_src?: string;
  gameState: gameStateType | undefined;
  objectsShipBlock: Block[]
  setObjectsShipBlock: React.Dispatch<React.SetStateAction<Block[]>>
};

export type userDataType = {
  id: number,
  login: string,
  rating: number
}

export interface Block {
  key: string;
  className: string;
}

const Ground = ({ text, img_src, gameState, objectsShipBlock, setObjectsShipBlock }: GroundProps) => {
  const [userData, setUserData] = useState<userDataType>();
  const [sessionId, setSessionId] = useState<number>();
  const userId = Number(localStorage.getItem("userId"));
  const [myTurn, setMyTurn] = useState(false);
  const handleBlockClick = async (key: string) => {
    if (myTurn) {
      try {
        const { axis, ordinate } = JSON.parse(key);
        const response = await fetch(
          `http://localhost:8080/session/${sessionId}/turn/${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ axis, ordinate }),
          },
        );
        const data = await response.json();
        if (data.result === "catch" || data.result === "killed") {
          if (data.result == "catch") {
            const field = objectsShipBlock;
            let a = { axis: axis, ordinate: ordinate };
            let size = 0;
            while (a.ordinate != 100) {
              if (field[(a.axis - 1) * 10 + a.ordinate].className == "element") {
                console.log("TES");
                a.ordinate = 100;
              }
            }
          }
          const updatedObjectsShipBlock = objectsShipBlock.map((block) =>
            block.key === key ? { ...block, className: "element" } : block,
          );
          console.log(updatedObjectsShipBlock);
          setObjectsShipBlock(updatedObjectsShipBlock);
        } else if (data.result === "Already attacked") {
          console.log("Already attacked");
        } else {
          const updatedObjectsShipBlock = objectsShipBlock.map((block) =>
            block.key === key ? { ...block, className: "miss" } : block,
          );
          setObjectsShipBlock(updatedObjectsShipBlock);
        }
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
  }, []);
  useEffect(() => {
    getUserData(userId)
      .then((res: userDataType) => {
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
      {gameState?.gameState === "STATUS_FINISH" ?
        <ModalWindow winnerId={gameState.winnerId} scores={userData?.rating} /> : null}
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
