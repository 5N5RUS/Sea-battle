import "./Battleground.css";

import { useNavigate } from "react-router-dom";
import CountDownTimer from "src/features/timer/CountDownTimer";
import Button from "src/shared/ui/button/Button";
import Layout from "src/shared/ui/layout/Layout";

import Ground from "./Ground";

const Battleground = () => {
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
      timer={<CountDownTimer minutes={1} seconds={0} />}
      text={<p className="player-turn">Your turn</p>}
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
    >
      <div className="main">
        <Ground text="Your ships" />

        <Ground text="Enemy’s ships" />
      </div>
    </Layout>
  );
};

export default Battleground;
