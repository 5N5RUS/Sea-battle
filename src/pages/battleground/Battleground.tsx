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
            navigate("/placementships");
          }}
          disabled={false}
        >
          <svg
            viewBox="0 -10 55 60"
            id="iconchangecolor"
            height="80%"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 3H42.4118C49.9163 3 56 9.08366 56 16.5882V16.5882C56 24.0928 49.9163 30.1765 42.4118 30.1765H4M4 30.1765L19 14.8588M4 30.1765L19 45"
              stroke="black"
              strokeWidth="5"
            />
          </svg>
        </Button>
      }
      timer={<CountDownTimer minutes={1} seconds={0} />}
      text={<p className="player-turn">Your turn</p>}
      help_button={
        <Button
          onClick={() => {
            alert("I need help you");
          }}
          disabled={false}
        >
          <svg
            width="160"
            height="110"
            viewBox="0 0 160 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_411_2767)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.47715 2 2 6.47715 2 12V76C2 81.5229 6.47715 86 12 86H128L154 103V86V12C154 6.47715 149.523 2 144 2H12Z"
                fill="white"
              />
              <path
                d="M128 86L128.821 84.7445L128.447 84.5H128V86ZM154 103L153.179 104.255L155.5 105.773V103H154ZM3.5 12C3.5 7.30558 7.30558 3.5 12 3.5V0.5C5.64873 0.5 0.5 5.64873 0.5 12H3.5ZM3.5 76V12H0.5V76H3.5ZM12 84.5C7.30558 84.5 3.5 80.6944 3.5 76H0.5C0.5 82.3513 5.64872 87.5 12 87.5V84.5ZM128 84.5H12V87.5H128V84.5ZM127.179 87.2555L153.179 104.255L154.821 101.745L128.821 84.7445L127.179 87.2555ZM155.5 103V86H152.5V103H155.5ZM152.5 12V86H155.5V12H152.5ZM144 3.5C148.694 3.5 152.5 7.30558 152.5 12H155.5C155.5 5.64873 150.351 0.5 144 0.5V3.5ZM12 3.5H144V0.5H12V3.5Z"
                fill="#2C2C2C"
              />
            </g>
            <path
              d="M79.104 67H68.376V56.416H79.104V67ZM74.856 19.84C85.008 19.84 91.056 26.752 91.056 33.376C91.056 40.504 86.808 45.4 78.528 47.848L78.456 50.584H69.024L68.448 38.632C68.448 38.632 71.04 38.488 73.848 37.912H73.992C80.256 36.544 80.256 34.6 80.256 33.376C80.256 32.584 78.672 30.64 74.856 30.64C70.32 30.64 67.008 33.304 67.008 33.304L60.096 25.096C61.32 24.088 66.936 19.84 74.856 19.84Z"
              fill="#2C2C2C"
            />
            <defs>
              <filter
                id="filter0_d_411_2767"
                x="0.5"
                y="0.5"
                width="159"
                height="109.273"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="4" dy="4" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.172549 0 0 0 0 0.172549 0 0 0 0 0.172549 0 0 0 1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_411_2767"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_411_2767"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </Button>
      }
    >
      <div className="main">
        <MyGround img_src="src/assets/svgs/my-player.svg" text="Your ships" />

        <Ground
          img_src="src/assets/svgs/enemy-player.svg"
          text="Enemy’s ships"
        />
      </div>

      {/* <li className="ships-list_battleground">
          <ShipBlock className="battleship" ship_count={1} />

          <ShipBlock className="cruiser"ship_count={2} />

          <ShipBlock className="destroyer" ship_count={3} />

          <ShipBlock
            className="patrol-boat"
            ship_count={4}
          />
        </li> */}

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
