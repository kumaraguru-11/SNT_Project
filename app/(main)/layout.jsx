import React from "react";
import Header from "../../component/Header";
import GoToTop from "@/component/GoToTop";

const layout = ({ children }) => {
  return (
    <div className="min-h-100vh h-full w-full flex flex-col text-orange-500 md:px-10 ">
      <Header />
      <GoToTop />
      <main
        // className="mt-2 transition-transform duration-300 p-0 flex-1 overflow-hidden bg-gray-300"
        className="flex-1 p-1"
      >
        {children}
      </main>
    </div>
  );
};

export default layout;
