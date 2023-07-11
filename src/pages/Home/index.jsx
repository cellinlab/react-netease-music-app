import React from "react";
import { Outlet, NavLink } from "react-router-dom";

import Player from "@/features/Player";

import "./index.scss";

const Home = () => {
  return (
    <div>
      <div className="top">
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">Celf Music</span>
        <span className="iconfont search">&#xe62b;</span>
      </div>
      <div className="tab">
        <NavLink to="/recommend" className={({ isActive }) => (isActive ? "selected" : "")}>
          <div className="tab-item">
            <span>Rencommend</span>
          </div>
        </NavLink>
        <NavLink to="/singers" className={({ isActive }) => (isActive ? "selected" : "")}>
          <div className="tab-item">
            <span>Singers</span>
          </div>
        </NavLink>
        <NavLink to="/rank" className={({ isActive }) => (isActive ? "selected" : "")}>
          <div className="tab-item">
            <span>Rank</span>
          </div>
        </NavLink>
      </div>
      <Outlet />
      <Player />
    </div>
  );
};

export default Home;
