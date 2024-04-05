import "./SignIn.css";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import Bubbles1 from "src/shared/ui/bubbles/Bubbles1";
import Bubbles2 from "src/shared/ui/bubbles/Bubbles2";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [usernameErrorOnSubmit, setUsernameErrorOnSubmit] = useState("");
  const [usernameInputErrorOnSubmit, setUsernameInputErrorOnSubmit] =
    useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (username.length < 5) {
      setUsernameError("Логин должен содержать минимум 5 символов");
    } else {
      setUsernameError("Логин должен содержать минимум 5 символов");
    }
  }, [username]);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);

    if (e.target.value.length < 5) {
      setUsernameInputErrorOnSubmit("#EB9E9E");
      setUsernameErrorOnSubmit("#EB9E9E");
    } else {
      setUsernameInputErrorOnSubmit("");
      setUsernameErrorOnSubmit("#3A849B");
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.length < 5) {
      setUsernameInputErrorOnSubmit("#EB9E9E");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      setUsernameInputErrorOnSubmit("");
      const userData = {
        login: username,
        password: password,
      };
      await signUpUser(userData);
    }
  };

  const signUpUser = async (userData: { login: string; password: string }) => {
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("User successfully registered:", data);
        setLoading(true);
      } else {
        console.error("Failed to register user");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setTimeout(() => {
          navigate("/mainscreen");
        }, 500);
      }, 3000);
    }
  };

  return (
    <div className="mainreg">
      <Bubbles1 />
      <div className="main__registration">
        <div className="registration__header">
          <div className="header__circles">
            <div className="circles_circle circle_first"></div>
            <div className="circles_circle circle_second"></div>
            <div className="circles_circle circle_third"></div>
          </div>
        </div>
        <h1 className="registration_title">Sign In</h1>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "100px" }}>
            <ClimbingBoxLoader color={"#36D7B7"} loading={loading} size={30} />
          </div>
        ) : (
          <form className="registration__form" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Username"
                required
                className={usernameInputErrorOnSubmit ? "error" : ""}
              />
              {
                <p
                  className="input_login-error"
                  style={{ color: usernameErrorOnSubmit }}
                >
                  {usernameError}
                </p>
              }
            </div>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              required
            />
            <button className="form_button-submit" type="submit">
              Sign In
            </button>
          </form>
        )}
      </div>
      <div>
        <img
          className="mainreg_logo"
          src="src\assets\images\Logo.jpg"
          alt="Sea Battle main logo"
        />
        <Bubbles2 />
      </div>
    </div>
  );
};

export default SignIn;
