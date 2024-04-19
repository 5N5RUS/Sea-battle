import "./SignUp.css";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import MainCard from "src/widgets/main-card/MainCard";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [usernameErrorOnSubmit, setUsernameErrorOnSubmit] = useState("");
  const [usernameInputErrorOnSubmit, setUsernameInputErrorOnSubmit] =
    useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.length < 5) {
      setUsernameInputErrorOnSubmit("#EB9E9E");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else if (password !== confirmPassword) {
      console.error("Password and confirmation password do not match");
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
      setLoading(true);
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
        navigate("/login");
      } else {
        console.error("Failed to register user");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      });
    }
  };

  return (
    <MainCard
      title="Sign Up"
      main={
        <div>
          {loading ? (
            <div
              style={{
                textAlign: "center",
                marginTop: "100px",
                marginBottom: "120px",
              }}
            >
              <ClimbingBoxLoader
                color={"#36D7B7"}
                loading={loading}
                size={30}
              />
            </div>
          ) : (
            <form className="card__registration_form" onSubmit={handleSubmit}>
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
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm Password"
                required
              />
              <button className="card__button" type="submit">
                Sign Up
              </button>
            </form>
          )}
        </div>
      }
    />
  );
};

export default SignUp;
