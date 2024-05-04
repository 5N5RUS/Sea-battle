import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_TYPE } from "src/entities/auth/model/types";
import { whoami } from "src/entities/user/userApi";
import { useAppDispatch } from "src/shared/hooks/ReduxHooks";
import MainCard from "src/widgets/main-card/MainCard";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dataErrorOnSubmit, setDataErrorOnSubmit] = useState("");
  const [usernameInputErrorOnSubmit, setUsernameInputErrorOnSubmit] =
    useState("");
  const [passwordInputErrorOnSubmit, setPasswordInputErrorOnSubmit] =
    useState("");
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.length < 5) {
      setUsernameInputErrorOnSubmit("#EB9E9E");
    } else if (password.length < 5) {
      setPasswordInputErrorOnSubmit("#EB9E9E");
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
      if (response.status == 404) {
        console.log(response.status);
        setDataError(true);
        setDataErrorOnSubmit("#EB9E9E");
        setUsernameInputErrorOnSubmit("#EB9E9E");
        setPasswordInputErrorOnSubmit("#EB9E9E");
      }
      if (response.status != 200) {
        console.log(response.status);
        setLoading(false);
      } else {
        setDataErrorOnSubmit("");
        setUsernameInputErrorOnSubmit("");
        setPasswordInputErrorOnSubmit("");
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
                marginTop: "130px",
                marginBottom: "120px",
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
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  required
                  className={passwordInputErrorOnSubmit ? "error" : ""}
                />
                {dataError ? (
                  <p
                    className="input_login-error"
                    style={{ color: dataErrorOnSubmit }}
                  >
                    *the data is incorrect
                  </p>
                ) : null}
              </div>
              <button className="card__button" type="submit">
                Log in
              </button>
            </form>
          )}
          <p className="card__navigate">
            Don&apos;t have an account?{" "}
            <a href="http://localhost:5173/signup" className="navigate_href">
              Sign up
            </a>
          </p>
        </div>
      }
    />
  );
};

export default Login;
