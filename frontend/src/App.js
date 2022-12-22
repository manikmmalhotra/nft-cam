import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./Home";
import NFTList from "./NFTList";
import ARCam from "./threejs/ARCam";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/nftlist" element={<NFTList />} />
        <Route path="/arcam" element={<ARCam />} />
      </Routes>
    </div>
  );
}

export default App;
