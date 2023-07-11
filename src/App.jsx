import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "@/pages/Home";
import Recommend from "@/features/Recommend";
import Singers from "@/features/Singers";
import Rank from "@/features/Rank";
import Album from "@/features/Album";
import Singer from "@/features/Singer";
import Search from "@/features/Search";

import { DataProvider } from "@/features/Singers/data";

const App = () => {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Navigate to="/recommend" />} />
          <Route path="/recommend" element={<Recommend />}>
            <Route path="/recommend/:id" element={<Album />} />
          </Route>
          <Route path="/singers" element={<Singers />}>
            <Route path="/singers/:id" element={<Singer />} />
          </Route>
          <Route path="/rank" element={<Rank />}>
            <Route path="/rank/:id" element={<Album />} />
          </Route>
          <Route path="/album/:id" element={<Album />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </DataProvider>
  );
};

export default App;
