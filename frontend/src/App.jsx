import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Analysis from "./pages/Analysis";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/analysis/:analysisId" element={<Analysis />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
