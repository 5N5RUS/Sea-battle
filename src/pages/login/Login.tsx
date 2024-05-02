import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import MainCard from "src/widgets/main-card/MainCard";
import { whoami } from "src/entities/user/userApi";
import { AUTH_TYPE } from "src/entities/auth/model/types";
import { useAppDispatch } from "src/shared/hooks/ReduxHooks";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [usernameErrorOnSubmit, setUsernameErrorOnSubmit] = useState("");
  const [usernameInputErrorOnSubmit, setUsernameInputErrorOnSubmit] =
    useState("");
  const dispatch = useAppDispatch();
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
      setLoading(false);
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
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.status != 200) {
        console.log(response.status);
        setLoading(false);
      } else {
        const data = await response.json();
        dispatch({
          type: AUTH_TYPE.AUTH_SUCCESS,
          isAuthenticated: true,
        });

        localStorage.setItem("token", data.accessToken);
        const i = whoami();
        i.then((data) => {
          localStorage.setItem("userId", data.userId);
        });
        setLoading(true);
        navigate("/mainscreen");
      }
    } catch (error) {
      console.error("Error login user:", error);
    }
  };

  return (
    <MainCard
      title="Login"
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
              <button className="card__button" type="submit">
                Login
              </button>
            </form>
          )}
        </div>
      }
    />
  );
};

export default Login;
