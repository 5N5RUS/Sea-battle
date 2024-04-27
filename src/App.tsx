import "./shared/ui/button/button.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Battleground from "./pages/battleground/Battleground";
import Login from "./pages/login/Login";
import MainScreen from "./pages/mainscreen/MainScreen";
import PlacementShips from "./pages/placement-ships/PlacementShips";
import SignUp from "./pages/signup/SignUp";
import PendingWindow from "src/pages/pendingWindow/PendingWindow";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="pendingWindow" element={<PendingWindow />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="mainscreen" element={<MainScreen />} />
        <Route path="battleground" element={<Battleground />} />
        <Route path="placementships" element={<PlacementShips />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
