import React from "react";
import Header from "./Header";
import "./admin.css";

const layout = ({ children }) => {
  return (
    <div className="p-0 px-10 h-screen bg-white">
      <Header />
      <div className="mt-1 rounded-xl bg-gray-200 text-black border-2  ">
        {children}
      </div>
    </div>
  );
};

export default layout;
