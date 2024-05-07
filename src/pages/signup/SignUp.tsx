import "./SignUp.css";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainCard from "src/widgets/main-card/MainCard";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [dataError, setDataError] = useState("");
  const [dataErrorOnSubmit, setDataErrorOnSubmit] = useState("");
  const [usernameInputErrorOnSubmit, setUsernameInputErrorOnSubmit] =
    useState("");
  const [passwordInputErrorOnSubmit, setPasswordInputErrorOnSubmit] =
    useState("");
  const [
    confirmPasswordInputErrorOnSubmit,
    setConfirmPasswordInputErrorOnSubmit,
  ] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setDataError("*the password and login must contain at least 5 characters");
    if (
      username.length < 5 ||
      password.length < 5 ||
      confirmPassword.length < 5
    ) {
      setDataErrorOnSubmit("#EB9E9E");
    } else {
      setDataErrorOnSubmit("");
    }
  }, [username, password, confirmPassword, setDataErrorOnSubmit]);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);

    if (e.target.value.length < 5) {
      setUsernameInputErrorOnSubmit("#EB9E9E");
    } else {
      setUsernameInputErrorOnSubmit("");
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length < 5) {
      setPasswordInputErrorOnSubmit("#EB9E9E");
    } else {
      setPasswordInputErrorOnSubmit("");
    }
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);

    if (e.target.value.length < 5) {
      setConfirmPasswordInputErrorOnSubmit("#EB9E9E");
    } else {
      setConfirmPasswordInputErrorOnSubmit("");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      username.length < 5 ||
      password.length < 5 ||
      confirmPassword.length < 5
    ) {
      setUsernameInputErrorOnSubmit("#EB9E9E");
      setPasswordInputErrorOnSubmit("#EB9E9E");
      setConfirmPasswordInputErrorOnSubmit("#EB9E9E");
      setLoading(true);
      setLoading(false);
    } else if (password !== confirmPassword) {
      console.error("Password and confirmation password do not match");
    } else {
      setUsernameInputErrorOnSubmit("");
      setPasswordInputErrorOnSubmit("");
      setConfirmPasswordInputErrorOnSubmit("");
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
      const response = await fetch("http://sea-battle.7bits.it/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log(response.status);
      if (response.status === 201) {
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
                marginTop: "200px",
                marginBottom: "200px",
              }}
            >
              <span className="loader"></span>
            </div>
          ) : (
            <form className="card__registration_form" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Login"
                  required
                  className={usernameInputErrorOnSubmit ? "error" : ""}
                />
              </div>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                required
                className={passwordInputErrorOnSubmit ? "error" : ""}
              />
              <div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Repeat the password"
                  required
                  className={confirmPasswordInputErrorOnSubmit ? "error" : ""}
                />
                {
                  <p
                    className="input_data-error"
                    style={{ color: dataErrorOnSubmit }}
                  >
                    {dataError}
                  </p>
                }
              </div>
              <button className="card__button" type="submit">
                Sign Up
              </button>
            </form>
          )}
          <p className="card__navigate">
            Already have an account?{" "}
            <a href="http://sea-battle.7bits.it/login" className="navigate_href">
              Log in
            </a>
          </p>
        </div>
      }
    />
  );
};

export default SignUp;
