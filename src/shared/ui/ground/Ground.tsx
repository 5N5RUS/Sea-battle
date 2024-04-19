import { useEffect, useState } from "react";

type GroundProps = {
  text?: string;
  img_src?: string;
};

interface Block {
  key: string;
  className: string;
}

const Ground = ({ text, img_src }: GroundProps) => {
  const [objectsShipBlock, setObjectsShipBlock] = useState<Block[]>([]);
  const [sessionId, setSessionId] = useState("");
  const userId = localStorage.getItem("userId");

  const handleBlockClick = async (key: string) => {
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
        console.log("catch");
        const updatedObjectsShipBlock = objectsShipBlock.map((block) =>
          block.key === key ? { ...block, className: "element" } : block,
        );
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

    const storedSessionId = localStorage.getItem("sessionId");
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, [sessionId, userId]);

  return (
    <>
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
