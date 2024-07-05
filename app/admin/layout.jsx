import React from "react";
import Header from "./Header";

const layout = ({ children }) => {
  return (
    <div className="p-5 px-10 h-screen bg-white">
      <Header />
      {children}
    </div>
  );
};

export default layout;
