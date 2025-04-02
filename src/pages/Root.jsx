import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import NavBar from "../components/NAvBar";

function Root() {
  return (
    <div>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
