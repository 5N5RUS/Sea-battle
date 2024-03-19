import "src/pages/placement-ships/PlacementShips.css";
import "src/shared/ui/layout/Layout.css";

import { useNavigate } from "react-router-dom";
import ShipBlock from "src/features/ship-block/ShipBlock";
import CountDownTimer from "src/features/timer/CountDownTimer";
import Button from "src/shared/ui/button/Button";
import Layout from "src/shared/ui/layout/Layout";

import Ground from "../../shared/ui/ground/Ground";

const PlacementShips = () => {
  const navigate = useNavigate();
  return (
    <Layout
      back_button={
        <Button
          className={"back-button"}
          onClick={() => {
            navigate("/placementships");
          }}
          disabled={false}
        >
          <svg
            color="#6BC9E6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 24"
            id="iconchangecolor"
            height="80%"
            width="100%"
          >
            {" "}
            <g>
              {" "}
              <path
                fill="none"
                d="M0 0h24v24H0z"
                id="mainIconPathAttribute"
                filter="url(#shadow)"
              ></path>{" "}
              <path
                d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z"
                id="mainIconPathAttribute"
              ></path>{" "}
            </g>{" "}
            <filter id="shadow">
              <feDropShadow
                id="shadowValue"
                stdDeviation=".5"
                dx="0"
                dy="0"
                floodColor=""
              ></feDropShadow>
            </filter>
          </svg>
        </Button>
      }
      timer={<CountDownTimer minutes={3} seconds={0} />}
      text={<p className="player-turn">Drag & drop, click to rotate</p>}
      help_button={
        <Button
          className={"rules-button"}
          onClick={() => {
            alert("I need help you");
          }}
          disabled={false}
        >
          ?
        </Button>
      }
      footer={
        <>
          <Button className="randomise-button">
            RANDOMISE
            <svg
              width="46"
              height="39"
              viewBox="0 0 46 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.6742 27.6804C32.7941 31.13 29.7856 33.8134 26.1642 35.2771C22.5432 36.7406 18.5308 36.8953 14.8096 35.7153C11.0881 34.5352 7.88491 32.0919 5.74832 28.798C3.61151 25.5038 2.67485 21.5639 3.10023 17.6501C3.52561 13.7363 5.28617 10.0948 8.07828 7.34504C10.8701 4.59554 14.5203 2.90747 18.4062 2.56479C22.2921 2.22211 26.1772 3.24558 29.4 5.46335C32.6231 7.68136 34.9855 10.9577 36.0806 14.7365"
                stroke="#6BC9E6"
                strokeWidth="5"
              />
              <path
                d="M38.4499 18.1468C38.3849 18.917 37.5125 19.3291 36.8822 18.8873L28.4162 12.9544C27.7877 12.5139 27.8712 11.5546 28.5666 11.2261L37.9056 6.81482C38.601 6.48637 39.3877 7.03469 39.3229 7.80259L38.4499 18.1468Z"
                fill="#6BC9E6"
              />
            </svg>
          </Button>

          <Button
            className="ready-button"
            onClick={() => {
              navigate("/battleground");
            }}
          >
            READY TO PLAY
          </Button>
        </>
      }
    >
      <div className="main">
        <li className="ships-list">
          <ShipBlock className="battleship" text="Battleship" ship_count={1} />

          <ShipBlock className="cruiser" text="Cruiser" ship_count={2} />

          <ShipBlock className="destroyer" text="Destroyer" ship_count={3} />

          <ShipBlock
            className="patrol-boat"
            text="Patrol Boat"
            ship_count={4}
          />
        </li>
        <Ground />
        <Button className="reset-button">Reset</Button>
      </div>
    </Layout>
  );
};

export default PlacementShips;
