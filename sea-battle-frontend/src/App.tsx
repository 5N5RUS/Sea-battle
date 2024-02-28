import "./App.css";
import "./shared/ui/button/button.css"

import Battleground from "src/pages/battleground/Battleground"
import Layout from "./shared/ui/layout/Layout";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestPage from "./pages/testpages/TestPage";

function App() {
  return (
    <Layout>
       <BrowserRouter>
          <Routes>
            <Route path="testpage" element={<TestPage index={5} />} />
            <Route path="battleground" element={<Battleground/>} />
          </Routes>
        </BrowserRouter>
    </Layout>

    
  );
}

export default App;
