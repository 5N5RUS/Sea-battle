import "./MainScreen.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { whoami } from "src/entities/user/userApi";
import { post } from "src/shared/api/fetcher";
import MainCard from "src/widgets/main-card/MainCard";
import { useAppDispatch } from "src/shared/hooks/ReduxHooks";
import WebSocketFactory, { WebSocketType } from "src/util/websocket/WebSocketFactory";

const MainScreen = () => {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    whoami()
      .then((userData) => {
        setUserData(userData.rating);
        console.log("User ID:", userData.userId);
        console.log("User login:", userData.name);
        console.log("User rating:", userData.rating);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  });

  const connectToWebSocket = (webSocket: WebSocketType) => {
    webSocket.connect();
    //
    // const sock = new SockJS(`http://localhost:8080/sea`);
    // const client = Stomp.over(sock);
    // client.connect({}, () => {
    //   console.log("Connected: ");
    //   client.subscribe(`/topic/sea/${sessionId}`, function(message) {
    //     console.log("message:", JSON.parse(message.body).status);
    //   });
    // });
    // dispatch({ type: "CLIENT/SUCCESS", client: client });
    // sock.onopen = function() {
    //   console.log("WebSocket connection established.");
    // };
    //
    // sock.onclose = function() {
    //   console.log("WebSocket connection closed.");
    // };
  };


  const handleStartGame = async () => {
    try {
      const response = post("session", null);
      if (response) {
        const data = await response;
        console.log("Session created successfully:", data);
        localStorage.setItem("sessionId", data.id);
        if (data.gameState) {
          const webSocket: WebSocketType =  WebSocketFactory(data.id,
            (message) => {
            message ? console.log("message:", JSON.parse(message.body)) : ""
            });
          connectToWebSocket(webSocket)
          if (data.gameState === "STATUS_PENDING") {
            webSocket.unsubscribe();
            navigate("/pendingWindow");
          } else {
            webSocket.unsubscribe();
            navigate("/placementships");
          }
        }
      } else {
        console.error("Failed to create session");
      }
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  return (
    <MainCard
      title={<p>Your Rate: {userData}</p>}
      main={
        <button className="card__button" onClick={handleStartGame}>
          Start Game
        </button>
      }
    />
  );
};

export default MainScreen;
