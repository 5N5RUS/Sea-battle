import "./Ground.css";

import { useEffect, useState } from "react";

type GroundProps = {
  text?: string;
  img_src?: string;
};

interface Block {
  key: string;
  className: string;
}

const MyGround = ({ text, img_src }: GroundProps) => {
  const [objectsShipBlock, setObjectsShipBlock] = useState<Block[]>([]);

  useEffect(() => {
    const blocks: Block[] = [];
    // res.shipCoords.forEach(e => e.forEach(ship => {
    //   blocks.push({ key: `${ship.axis}-${ship.ordinate}`, className: "grid-item" });
    // }))
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        blocks.push({ key: `${i}-${j}`, className: "grid-item" });
      }
    }

    setObjectsShipBlock(blocks);

    fetch("https://localhost:8080/session/{sessionId}/arrangement-state")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data from API:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleClick = (key: string) => {
    setObjectsShipBlock((prevBlocks) =>
      prevBlocks.map((block) =>
        block.key === key ? { ...block, className: "element" } : block,
      ),
    );
    console.log(key);

    fetch(
      "https://virtserver.swaggerhub.com/TEMATHEBST/Wave_Warriors/1.0.0/session/{sessionId}/arrangement/{userId}",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: key,
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send data");
        }
        console.log("Data sent successfully");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <>
      <div className="ground-wrapper">
        <div className="grid-container">
          {objectsShipBlock.map((block) => (
            <div
              key={block.key}
              className={block.className}
              onClick={() => handleClick(block.key)}
              onKeyDown={(e) => e.key === "Enter" && handleClick(block.key)}
              role="button"
              tabIndex={0}
            ></div>
          ))}
        </div>
        <div className="ground__name_wrapper">
          <img src={img_src} alt="ground-img"></img>
          <p className="ground__name">{text}</p>
        </div>
      </div>
    </>
  );
};

export default MyGround;
