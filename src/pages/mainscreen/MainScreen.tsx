import "./MainScreen.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainCard from "src/widgets/main-card/MainCard";

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
  return (
    <MainCard
      title={<p>Your Rate: {userData}</p>}
      main={
        <button
          className="card__button"
          onClick={() => {
            setTimeout(() => {
              navigate("/placementships");
            }, 1000);
          }}
        >
          Start Game
        </button>
      }
    />
  );
};

export default MainScreen;
