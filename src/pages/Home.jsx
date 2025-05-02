import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="header-box min-h-40 flex justify-center items-center">
        <div className="header">
          <h1 className="text-5xl font-bold text-red-600 border-spacing-4 border-4 !border-blue-500 bg-yellow-200 p-4 rounded-lg   ">
            Welcome to Shopify!
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-evenly min-h-40 text-3xl text-red-900 weight-bold">
        Home
        <Link to={`/App`}>App</Link>
        <Link to={`/login`}>login</Link>
      </div>
    </>
  );
}

export default Home;
