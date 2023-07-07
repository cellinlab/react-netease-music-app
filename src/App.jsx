import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "@/pages/Home";
import Recommend from "@/features/Recommend";
import Singers from "@/features/Singers";
import Rank from "@/features/Rank";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Navigate to="/recommend" />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/singers" element={<Singers />} />
        <Route path="/rank" element={<Rank />} />
      </Route>
    </Routes>
  );
};

export default App;
