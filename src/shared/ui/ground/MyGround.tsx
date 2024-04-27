import "./Ground.css";
import React, { useEffect, useState } from "react";
import { maxValue, minValue } from "src/util/checkValueFunc";


type GroundProps = {
  text?: string;
  img_src?: string;
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

const MyGround = ({ text, img_src }: GroundProps) => {
    const [objects, setObjects] = useState<React.ReactNode[]>([]);
    const myShipsString = localStorage.getItem("myShips");
    useEffect(() => {
      if (myShipsString) {
        const changedObject = objects;
        const myShipsJson = JSON.parse(myShipsString);
        myShipsJson.map((coordsList: { axis: number, ordinate: number }[]) => {
          if (coordsList[0].axis != coordsList[1].axis) {
            let counter: number = 1;
            for (
              let i = minValue(coordsList[0].axis, coordsList[1].axis);
              i <= maxValue(coordsList[0].axis, coordsList[1].axis);
              i++
            ) {
              const index = ((i - 1) * 10 - 1) + coordsList[0].ordinate;
              let size = "";
              let number = "";
              size = checkAddClass(maxValue(coordsList[0].axis, coordsList[1].axis) - minValue(coordsList[0].axis, coordsList[1].axis) + 1);
              number = checkAddClass(counter);
              const clazz = "vertical-" + size + "-" + number;
              console.log(number);
              console.log(clazz);
              changedObject[index] = (
                <div key={JSON.stringify({ axis: (i - 1) * 10 - 1, ordinate: coordsList[0].ordinate })}
                     className={`my-grid-item ${clazz}`}>
                </div>);
              counter = counter + 1;
            }
          } else if (coordsList[0].ordinate != coordsList[1].ordinate) {
            let counter: number = 1;
            for (
              let i = minValue(coordsList[0].ordinate, coordsList[1].ordinate);
              i <= maxValue(coordsList[0].ordinate, coordsList[1].ordinate);
              i++
            ) {
              const index = ((coordsList[0].axis - 1) * 10) + i - 1;
              let size = "";
              let number = "";
              size = checkAddClass(maxValue(coordsList[0].ordinate, coordsList[1].ordinate) - minValue(coordsList[0].ordinate, coordsList[1].ordinate) + 1);
              number = checkAddClass(counter);
              const clazz = "horizontal-" + size + "-" + number;
              changedObject[index] = (
                <div key={JSON.stringify({ axis: (coordsList[0].axis - 1) * 10, ordinate: i - 1 })}
                     className={`my-grid-item ${clazz}`}>
                </div>);
              counter = counter + 1;
            }
          } else {
            const index = (coordsList[0].axis - 1) * 10 + coordsList[0].ordinate - 1;

            changedObject[index] = (
              <div key={JSON.stringify({ axis: (coordsList[0].axis - 1) * 10, ordinate: coordsList[0].ordinate - 1 })}
                   className="my-grid-item one-one">
              </div>
            );
          }
        });
        for (let i = 0; i < 100; i++) {
          if (!changedObject.at(i)) {
            changedObject[i] =
              (
                <div key={JSON.stringify({ axis: i % 10 * 100, ordinate: Math.floor(i / 10) * 100 })}
                     className="my-grid-item">
                </div>
              );
          }
        }
        setObjects(changedObject);
      }
    }, []);
    return (
      <>
        <div className="ground-wrapper">
          {" "}
          <div className="grid-container">{
            objects.map((el) => (
              el
            ))
          }</div>
          {" "}
          <div className="ground__name_wrapper">
            <img src={img_src} alt="ground"></img>
            <p className="ground__name">{text}</p>{" "}
          </div>
        </div>
      </>
    );
  }
;

export default MyGround;
