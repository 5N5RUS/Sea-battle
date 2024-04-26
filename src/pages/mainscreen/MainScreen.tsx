import "./MainScreen.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainCard from "src/widgets/main-card/MainCard";
import { number } from "prop-types";

const MainScreen = () => {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/users/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
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
      const response = await fetch("http://localhost:8080/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log("Session created successfully:", data);
        localStorage.setItem("sessionId", data.id);
        navigate("/battleground");
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
