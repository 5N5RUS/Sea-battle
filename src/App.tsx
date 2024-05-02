import "./shared/ui/button/button.css";

import { Navigate, Outlet, Route, Routes, useLocation } from "react-router";
import PendingWindow from "src/pages/pendingWindow/PendingWindow";
import { useAppSelector } from "src/shared/hooks/ReduxHooks";

import Battleground from "./pages/battleground/Battleground";
import Login from "./pages/login/Login";
import MainScreen from "./pages/mainscreen/MainScreen";
import PlacementShips from "./pages/placement-ships/PlacementShips";
import SignUp from "./pages/signup/SignUp";

const AuthRoute = () => {
  const isAuth = useAppSelector((state) => state["AUTH_REDUCER"]?.isAuth);
  const isRegistrationPage = useLocation().pathname === "/signup";
  if (isAuth && isRegistrationPage) {
    return <Navigate to={"/mainscreen"} />;
  }
  if (!isAuth && !isRegistrationPage) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path={""} element={<AuthRoute />}>
        <Route path="pendingWindow" element={<PendingWindow />} />
        <Route path="mainscreen" element={<MainScreen />} />
        <Route path="battleground" element={<Battleground />} />
        <Route path="placementships" element={<PlacementShips />} />
      </Route>
    </Routes>
  );
}

export default App;
