"use client";
import React, { useState } from "react";
import "primeicons/primeicons.css";
// import LoginField from "../../component/LoginField";
import LoginField from "@/component/LoginField";
import Image from "next/image";

const LogIn = () => {
  return (
    <div className="h-full w-full flex items-center justify-center py-5 center">
      <div className="w-10/12 lg:w-7/12 min-h-96 mt-10 border-1 shadow-lg shadow-blue-500/50 flex justify-between">
        {/* NUTSBEE */}
        <div className="hidden sm:flex sm:flex-1 relative border-r-2 form-bg">
          {/* <Image src="/assest/0.jpg" alt="img" width={500} height={200} /> */}
          {/* NUTSBEE */}
        </div>{" "}
        <div className="flex-1 flex justify-center items-center p-3">
          <LoginField />
        </div>
      </div>
    </div>
  );
};

export default LogIn;