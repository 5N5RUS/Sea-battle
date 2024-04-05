import "./shared/ui/button/button.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Battleground from "./pages/battleground/Battleground";
import MainScreen from "./pages/mainscreen/MainScreen";
import PlacementShips from "./pages/placement-ships/PlacementShips";
import SignIn from "./pages/signin/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signin" element={<SignIn />} />
        <Route path="mainscreen" element={<MainScreen />} />

        <Route path="battleground" element={<Battleground />} />
        <Route path="placementships" element={<PlacementShips />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
