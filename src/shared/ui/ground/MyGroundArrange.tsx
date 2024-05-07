import "./Ground.css";

import React, { useEffect, useState } from "react";
import { maxValue, minValue } from "src/util/checkValueFunc";

export type targetCellType = {
  axis: number;
  ordinate: number;
};

type GroundProps = {
  text?: string;
  img_src?: string;
  targetCell: targetCellType | undefined;
  isMyTurn: boolean;
  targetPlayer: number | undefined;
  myShips: string | [] | null | undefined;
  initialState: React.ReactNode[]
};

export function checkAddClass(num: number) {
  switch (num) {
    case 1:
      return "one";
    case 2:
      return "two";
    case 3:
      return "three";
      break;
    case 4:
      return "four";
    default:
      return "none";
  }
}

const MyGroundArrange = ({ text, img_src, targetCell, targetPlayer, myShips, initialState }: GroundProps) => {
  const [objects, setObjects] = useState<React.ReactNode[]>(initialState);
  const playerId = Number(localStorage.getItem("userId"));
  useEffect(() => {
    let flag = true;
    let changedObject = [...objects];
    if (myShips) {
      const myShipsJson = myShips;
      if (myShipsJson) {
        objects.map((el) => {
          //  may be error@ts-expect-error
          if (React.isValidElement(el) && el.props.className?.includes("grid-item")) {
            flag = false;
          }
        });
        if (!flag) {
          changedObject = [];
        }
        if (typeof myShipsJson != "string") {
          myShipsJson.map((coordsList: { axis: number; ordinate: number }[]) => {
            if (coordsList[0].axis != coordsList[1].axis) {
              let counter: number = 1;
              for (
                let i = minValue(coordsList[0].axis, coordsList[1].axis);
                i <= maxValue(coordsList[0].axis, coordsList[1].axis);
                i++
              ) {
                const index = (i - 1) * 10 - 1 + coordsList[0].ordinate;
                let size = "";
                let number = "";
                size = checkAddClass(
                  maxValue(coordsList[0].axis, coordsList[1].axis) -
                  minValue(coordsList[0].axis, coordsList[1].axis) +
                  1,
                );
                number = checkAddClass(counter);
                const clazz = "vertical-" + size + "-" + number;
                changedObject[index] = (
                  <div
                    key={JSON.stringify({
                      axis: (i - 1) * 10 - 1,
                      ordinate: coordsList[0].ordinate,
                    })}
                    className={`my-grid-item ${clazz}`}
                  ></div>
                );
                counter = counter + 1;
              }
            } else if (coordsList[0].ordinate != coordsList[1].ordinate) {
              let counter: number = 1;
              for (
                let i = minValue(coordsList[0].ordinate, coordsList[1].ordinate);
                i <= maxValue(coordsList[0].ordinate, coordsList[1].ordinate);
                i++
              ) {
                const index = (coordsList[0].axis - 1) * 10 + i - 1;
                let size = "";
                let number = "";
                size = checkAddClass(
                  maxValue(coordsList[0].ordinate, coordsList[1].ordinate) -
                  minValue(coordsList[0].ordinate, coordsList[1].ordinate) +
                  1,
                );
                number = checkAddClass(counter);
                const clazz = "horizontal-" + size + "-" + number;
                changedObject[index] = (
                  <div
                    key={JSON.stringify({
                      axis: (coordsList[0].axis - 1) * 10,
                      ordinate: i - 1,
                    })}
                    className={`my-grid-item ${clazz}`}
                  ></div>
                );
                counter = counter + 1;
              }
            } else {
              const index =
                (coordsList[0].axis - 1) * 10 + coordsList[0].ordinate - 1;
              changedObject[index] = (
                <div
                  key={JSON.stringify({
                    axis: (coordsList[0].axis - 1) * 10,
                    ordinate: coordsList[0].ordinate - 1,
                  })}
                  className="my-grid-item one-one"
                ></div>
              );
            }
          });
        }
      }
      for (let i = 0; i < 100; i++) {
        if (!changedObject.at(i)) {
          changedObject[i] = (
            <div
              key={JSON.stringify({
                axis: Math.floor(i / 10) * 10,
                ordinate: (i % 10) * 10,
              })}
              className="my-grid-item"
            ></div>
          );
        }
      }
    } else {
      for (let i = 0; i < 100; i++) {
        changedObject[i] = (
          <div
            key={JSON.stringify({
              axis: Math.floor(i / 10) * 10,
              ordinate: (i % 10) * 10,
            })}
            className="my-grid-item"
          ></div>
        );
      }
    }
    setObjects(changedObject);
  }, [myShips]);
  useEffect(() => {
    const changedObject = objects;
    if (targetPlayer == playerId && targetCell) {
      if (
        changedObject[(targetCell?.axis - 1) * 10 + targetCell.ordinate - 1]
      ) {
        // for linter @ts-expect-error
        const el = changedObject[
        (targetCell?.axis - 1) * 10 + targetCell.ordinate - 1
          ];
        if (React.isValidElement(el)) {
          const oldClass = el.props.className;
          const splited = oldClass.split(" ");
          if (!splited.includes("explose")) {
            if (splited[1] == undefined) {
              changedObject[
              (targetCell?.axis - 1) * 10 + targetCell.ordinate - 1
                ] = (
                <div
                  className={`${oldClass} miss`}
                  key={JSON.stringify({
                    axis: 900 * playerId - targetCell?.axis * 20,
                    ordinate: targetCell.ordinate * 20,
                  })}
                ></div>
              );
            } else {
              if (!splited.includes("miss")) {
                changedObject[
                (targetCell?.axis - 1) * 10 + targetCell.ordinate - 1
                  ] = (
                  <div
                    className={`${oldClass}`}
                    key={JSON.stringify({
                      axis: 900 * playerId - targetCell?.axis * 30,
                      ordinate: targetCell.ordinate * 30,
                    })}
                  >
                    <div className={`explose`}></div>
                  </div>
                );
              }
            }
          }
        }
      }
    }
    setObjects(changedObject);
  }, [targetCell, playerId, targetPlayer]);
  return (
    <>
      <div className="ground-wrapper">
        <div className="grid-container_wrapper">
          <div className="grid-container">{
            objects.map((el) => el)}</div>
        </div>
        <div className="ground__name_wrapper">
          {img_src ? <img src={img_src} alt="ground"></img> : null}
          <p className="ground__name">{text}</p>
        </div>
      </div>
    </>
  );
};
export default MyGroundArrange;
