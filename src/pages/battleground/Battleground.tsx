import "./Battleground.css";

import { useNavigate } from "react-router-dom";
import CountDownTimer from "src/features/timer/CountDownTimer";
import Button from "src/shared/ui/button/Button";
import MyGround from "src/shared/ui/ground/MyGround";
import Layout from "src/shared/ui/layout/Layout";

import Ground from "../../shared/ui/ground/Ground";

const Battleground = () => {
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
      text={<p className="player-turn">Your turn</p>}
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
        <MyGround img_src="src/assets/svgs/my-player.svg" text="Your ships" />

        <Ground
          img_src="src/assets/svgs/enemy-player.svg"
          text="Enemy’s ships"
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
            color: "#2C2C2C",
            fontSize: 36,
            fontFamily: "PT Sans",
            fontWeight: 700,
            wordWrap: "break-word",
          }}
        >
          — 1
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
          — 2
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
          — 3
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
          — 4
        </div>
        <div
          style={{
            width: 46,
            height: 46,
            left: 297,
            top: 64,
            position: "absolute",
            background: "white",
          }}
        />
        <div
          style={{
            width: 94,
            height: 46,
            left: 297,
            top: 1,
            position: "absolute",
            background: "white",
          }}
        />
        <div
          style={{
            width: 190,
            height: 46,
            left: 0,
            top: 0,
            position: "absolute",
            background: "white",
          }}
        />
        <div
          style={{
            width: 142,
            height: 46,
            left: 0,
            top: 65,
            position: "absolute",
            background: "white",
          }}
        />
      </div>
    </Layout>
  );
};

export default Battleground;
