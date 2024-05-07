import "src/pages/placement-ships/PlacementShips.css";
import "src/shared/ui/layout/Layout.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { arrangeShips, getGameState } from "src/entities/game/gameApi";
import ShipBlock from "src/features/ship-block/ShipBlock";
import CountDownTimer from "src/features/timer/CountDownTimer";
import { get } from "src/shared/api/fetcher";
import Button from "src/shared/ui/button/Button";
import MyGround from "src/shared/ui/ground/MyGround";
import Layout from "src/shared/ui/layout/Layout";
import { useAppSelector } from "src/shared/hooks/ReduxHooks";
import WebSocketFactory from "src/util/websocket/WebSocketFactory";

export type shipsType = { axis: number; ordinate: number }[][];
const PlacementShips = () => {
  // const client = useAppSelector(state => state["CLIENT_REDUCER"].client);
  const [errorText, setErrorText] = useState("");
  const [myShips, setMyShips] = useState();
  const navigate = useNavigate();
  const [block, setBlock] = useState(false);
  const sessionId = Number(localStorage.getItem("sessionId"));
  const [gameState, setGameState] = useState<string>();
  const myShipsString = localStorage.getItem("myShips");

  const webSocket = WebSocketFactory(sessionId);
  // useEffect(() => {
  //   localStorage.removeItem("myShips");
  //   const intervalId = setInterval(() => {
  //     if (sessionId) {
  //       const getStateProm = getGameState(sessionId);
  //       getStateProm.then((res) => {
  //         setGameState(res.gameState);
  //       });
  //     }
  //   }, 1000);
  //   return () => clearInterval(intervalId);
  // }, [sessionId]);


  useEffect(() => {
    // console.log("1");
    // if (client) {
    //   console.log("2");
    //   client.connect({}, () => {
    //     client.subscribe(`/topic/sea/${sessionId}`, (message) => {
    //       console.log(JSON.parse(message.body));
    //       console.log("message:", message.headers);
    //       if (JSON.parse(message.body).status == "STATUS_GAME") {
    //         setGameState("STATUS_GAME");
    //       }
    //     });
    //   });
    // }

    if (webSocket.connected()) {
      webSocket.updateCallback(
        (message) => {
          if (message) {
            console.log(JSON.parse(message.body));
            console.log("message:", message.headers);
            if (JSON.parse(message.body).status == "STATUS_GAME") {
              setGameState("STATUS_GAME");
            }
          }
        }
      )
    }

  }, [sessionId]);

  function randomShips() {
    if (myShipsString != undefined) {
      localStorage.removeItem("myShips");
    }
    const ship = get(`session/${sessionId}/arrangement/random`);
    ship.then((result) => {
      setMyShips(result);
      localStorage.setItem("myShips", JSON.stringify(result));
    });
  }

  useEffect(() => {
    if (gameState === "STATUS_GAME") {
      webSocket.unsubscribe();
      navigate("/battleground");
    }
  }, [gameState, navigate]);
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
      timer={<CountDownTimer minutes={3} seconds={0} />}
      text={<p
        className="player-turn">{!block ? "drag & drop, click to rotate" : "waiting for the enemy's readiness"}
      </p>}
      help_button={
        <button
          className={"rules-button"}
          onClick={() => {
            alert("I need help you");
          }}
          disabled={block}
        >
          {block ? <svg width="160" height="112" viewBox="0 0 160 112" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_774_7012)">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M12 4C6.47715 4 2 8.47715 2 14V78C2 83.5229 6.47715 88 12 88H128L154 105V88V14C154 8.47715 149.523 4 144 4H12Z"
                      fill="white" />
                <path
                  d="M128 88L128.821 86.7445L128.447 86.5H128V88ZM154 105L153.179 106.255L155.5 107.773V105H154ZM3.5 14C3.5 9.30558 7.30558 5.5 12 5.5V2.5C5.64873 2.5 0.5 7.64873 0.5 14H3.5ZM3.5 78V14H0.5V78H3.5ZM12 86.5C7.30558 86.5 3.5 82.6944 3.5 78H0.5C0.5 84.3513 5.64872 89.5 12 89.5V86.5ZM128 86.5H12V89.5H128V86.5ZM127.179 89.2555L153.179 106.255L154.821 103.745L128.821 86.7445L127.179 89.2555ZM155.5 105V88H152.5V105H155.5ZM152.5 14V88H155.5V14H152.5ZM144 5.5C148.694 5.5 152.5 9.30558 152.5 14H155.5C155.5 7.64873 150.351 2.5 144 2.5V5.5ZM12 5.5H144V2.5H12V5.5Z"
                  fill="#D9D9D9" />
              </g>
              <path
                d="M79.1836 67.9297H68.3906V57.418H79.1836V67.9297ZM74.9297 20.8555C77.3672 20.8555 79.6172 21.2539 81.6797 22.0508C83.7422 22.8242 85.4414 23.8555 86.7773 25.1445C88.1367 26.4102 89.1914 27.8398 89.9414 29.4336C90.6914 31.0273 91.0664 32.6562 91.0664 34.3203C91.0664 41.4922 86.9062 46.3086 78.5859 48.7695L78.4453 51.5117H69.0938L68.4609 39.5586C70.2188 39.4648 72.0117 39.2305 73.8398 38.8555H74.0508C75.5273 38.5273 76.7227 38.1758 77.6367 37.8008C78.5742 37.4023 79.2188 36.9805 79.5703 36.5352C79.9219 36.0664 80.1328 35.6914 80.2031 35.4102C80.2969 35.1289 80.3438 34.7656 80.3438 34.3203C80.3438 34.0156 80.1562 33.6641 79.7812 33.2656C79.4297 32.8438 78.8203 32.457 77.9531 32.1055C77.0859 31.7539 76.0781 31.5781 74.9297 31.5781C73.5938 31.5781 72.2578 31.8125 70.9219 32.2812C69.6094 32.7266 68.625 33.1719 67.9688 33.6172L67.0195 34.3203L60.1641 26.0234C60.6562 25.625 61.2539 25.2031 61.957 24.7578C62.6602 24.3125 63.6562 23.7617 64.9453 23.1055C66.2344 22.4492 67.7578 21.9102 69.5156 21.4883C71.2734 21.0664 73.0781 20.8555 74.9297 20.8555Z"
                fill="#D9D9D9" />
              <defs>
                <filter id="filter0_d_774_7012" x="0.5" y="2.5" width="159" height="109.273" filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                 result="hardAlpha" />
                  <feOffset dx="4" dy="4" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 1 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_774_7012" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_774_7012" result="shape" />
                </filter>
              </defs>
            </svg> :
            <svg width="160" height="110" viewBox="0 0 160 110" xmlns="http://www.w3.org/2000/svg"
                 className={`question_button ${block ? "no_active" : ""}`}>
              <g filter="url(#filter0_d_774_6692)">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M12 2C6.47715 2 2 6.47715 2 12V76C2 81.5229 6.47715 86 12 86H128L154 103V86V12C154 6.47715 149.523 2 144 2H12Z"
                />
                <path
                  d="M128 86L128.821 84.7445L128.447 84.5H128V86ZM154 103L153.179 104.255L155.5 105.773V103H154ZM3.5 12C3.5 7.30558 7.30558 3.5 12 3.5V0.5C5.64873 0.5 0.5 5.64873 0.5 12H3.5ZM3.5 76V12H0.5V76H3.5ZM12 84.5C7.30558 84.5 3.5 80.6944 3.5 76H0.5C0.5 82.3513 5.64872 87.5 12 87.5V84.5ZM128 84.5H12V87.5H128V84.5ZM127.179 87.2555L153.179 104.255L154.821 101.745L128.821 84.7445L127.179 87.2555ZM155.5 103V86H152.5V103H155.5ZM152.5 12V86H155.5V12H152.5ZM144 3.5C148.694 3.5 152.5 7.30558 152.5 12H155.5C155.5 5.64873 150.351 0.5 144 0.5V3.5ZM12 3.5H144V0.5H12V3.5Z"
                />
              </g>
              <path
                d="M79.104 67H68.376V56.416H79.104V67ZM74.856 19.84C85.008 19.84 91.056 26.752 91.056 33.376C91.056 40.504 86.808 45.4 78.528 47.848L78.456 50.584H69.024L68.448 38.632C68.448 38.632 71.04 38.488 73.848 37.912H73.992C80.256 36.544 80.256 34.6 80.256 33.376C80.256 32.584 78.672 30.64 74.856 30.64C70.32 30.64 67.008 33.304 67.008 33.304L60.096 25.096C61.32 24.088 66.936 19.84 74.856 19.84Z"
                fill="#2C2C2C" />
              <defs>
                <filter id="filter0_d_774_6692" x="0.5" y="0.5" width="159" height="109.273"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                 result="hardAlpha" />
                  <feOffset dx="4" dy="4" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.172549 0 0 0 0 0.172549 0 0 0 0 0.172549 0 0 0 1 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_774_6692" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_774_6692" result="shape" />
                </filter>
              </defs>
            </svg>}
        </button>
      }
      footer={
        <>
          <div className={"ready-block"}>
            <p className={"error-text"}> {errorText}</p>
            <Button
              className="ready-button"
              disabled={!myShips || block}
              onClick={() => {
                if (myShips) {
                  arrangeShips(sessionId, myShips);
                  setBlock(true);
                } else {
                  setErrorText("Not all ships are deployed!");
                }
              }}
            >
              READY TO PLAY
            </Button>
          </div>
        </>
      }
    >
      <div className="main_placement-ship">
        <li className="ships-list">
          <ShipBlock className={`battleship`} text="Battleship" disabled={block} ship_count={1} status={!!myShips} />

          <ShipBlock className="cruiser" disabled={block} text="Cruiser" ship_count={2} status={!!myShips} />

          <ShipBlock disabled={block} className="destroyer" text="Destroyer" ship_count={3} status={!!myShips} />

          <ShipBlock
            disabled={block}
            status={!!myShips}
            className="patrol-boat"
            text="Patrol Boat"
            ship_count={4}
          />
        </li>
        <div>
          <div className="battlegrounds__array_cells-numbers">
            <div className="battlegrounds__nameofcell-my">1</div>
            <div className="battlegrounds__nameofcell-my"> 2</div>
            <div className="battlegrounds__nameofcell-my"> 3</div>
            <div className="battlegrounds__nameofcell-my"> 4</div>
            <div className="battlegrounds__nameofcell-my"> 5</div>
            <div className="battlegrounds__nameofcell-my"> 6</div>
            <div className="battlegrounds__nameofcell-my"> 7</div>
            <div className="battlegrounds__nameofcell-my"> 8</div>
            <div className="battlegrounds__nameofcell-my"> 9</div>
            <div className="battlegrounds__nameofcell-my"> 10</div>
          </div>
          <div className="battlegrounds__arraycells_wrapper-column">
            <MyGround
              targetPlayer={undefined}
              text={""}
              targetCell={undefined}
              isMyTurn={false}
              img_src={undefined}
              myShips={myShips}
            />
            <div className="battlegrounds__arraycells_words-enemy">
              <div className="battlegrounds__nameofcell-my">A</div>
              <div className="battlegrounds__nameofcell-my">B</div>
              <div className="battlegrounds__nameofcell-my"> C</div>
              <div className="battlegrounds__nameofcell-my"> D</div>
              <div className="battlegrounds__nameofcell-my"> E</div>
              <div className="battlegrounds__nameofcell-my"> F</div>
              <div className="battlegrounds__nameofcell-my"> G</div>
              <div className="battlegrounds__nameofcell-my"> H</div>
              <div className="battlegrounds__nameofcell-my"> I</div>
              <div className="battlegrounds__nameofcell-my"> J</div>
            </div>
          </div>
        </div>

        <div className={"right-menu"}>
          <div className={"right-buttons"}>
            <Button className="reset-button" disabled={block} onClick={() => {
              localStorage.removeItem("myShips");
              setMyShips(undefined);
            }
            }>Reset</Button>
            <Button className="randomise-button" disabled={block} onClick={() => {
              randomShips();
            }}>
              RANDOM
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlacementShips;
