"use client";
import React, { useState} from "react";
import "primeicons/primeicons.css";
import LoginField from "../../component/LoginField";

const LogIn = () => {
  return (
    <div className="h-full w-full flex items-center justify-center py-5 center">
      <div className="w-10/12 md:w-7/12 min-h-96 border-1 shadow-lg shadow-blue-500/50 flex justify-between">
        {/* NUTSBEE */}
        <div className="hidden sm:flex sm:flex-1 relative border-r-2">
          <h1 className="text-5xl font-black text-orange-300 absolute top-72 left-6 transform -rotate-90 origin-top-left tracking-widest">
            NUTSBEE
          </h1>
        </div>{" "}
        <div className="flex-1 p-5">
          <LoginField/>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
