import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Conteudo from "./components/Conteudo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/conteudo" element={<Conteudo />} />
      </Routes>
    </Router>
  );
}

export default App;