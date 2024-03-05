import "./shared/ui/button/button.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Battleground from "./pages/battleground/Battleground";
import TestPage from "./pages/testpages/TestPage";
import Layout from "./shared/ui/layout/Layout";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="testpage" element={<TestPage index={5} />} />
          <Route path="battleground" element={<Battleground />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
