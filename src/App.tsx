import "./shared/ui/button/button.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Battleground from "./pages/battleground/Battleground";
import PlacementShips from "./pages/placement-ships/PlacementShips";
import TestPage from "./pages/testpages/TestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="testpage" element={<TestPage index={5} />} />
        <Route path="battleground" element={<Battleground />} />
        <Route path="placementships" element={<PlacementShips />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
