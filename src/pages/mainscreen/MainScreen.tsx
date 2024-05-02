import "./MainScreen.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { whoami } from "src/entities/user/userApi";
import { post } from "src/shared/api/fetcher";
import MainCard from "src/widgets/main-card/MainCard";

const MainScreen = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

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

  const handleStartGame = async () => {
    try {
      const response = post("session", null);
      if (response) {
        const data = await response;
        console.log("Session created successfully:", data);
        localStorage.setItem("sessionId", data.id);
        if (data.gameState) {
          if (data.gameState === "STATUS_PENDING") {
            console.log("HERE");
            navigate("/pendingWindow");
          } else {
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
