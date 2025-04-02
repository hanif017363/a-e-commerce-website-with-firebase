import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex items-center justify-evenly h-screen text-3xl text-red-900 weight-bold">
      Home
      <Link to={`/App`}>App</Link>
      <Link to={`/login`}>login</Link>
    </div>
  );
}

export default Home;
Home;
