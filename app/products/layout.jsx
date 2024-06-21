import React from "react";
import Header from "../../component/Header";
import GoToTop from "../../component/GoToTop";

const Layout = ({ children }) => {
  return (
    <div
      className="min-h-100vh w-full flex flex-col text-orange-500 md:px-10 "
    >
      <GoToTop />
      <Header />

      <main className="mt-0 transition-transform duration-300 p-5 flex-grow overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default Layout;
