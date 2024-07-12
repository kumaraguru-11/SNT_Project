"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const options = [
    { name: "order-tracking", code: "ot" },
    { name: "option-1", code: "op-1" },
    { name: "option-2", code: "op-2" },
  ];

  const handleSelectOption = (option) => {
    setIsDropdownOpen(false); // Close the dropdown after selecting an option
    if (option.name === "option-1") {
      router.push("/admin/option-1");
    }
    if (option.name === "order-tracking") {
      router.push("/admin/orderTracking");
    }
    if (option.name === "option-2") {
      router.push("/admin/option-2");
    }
  };

  return (
    <header
      style={{
        height: "6rem",
        position: "sticky",
        backgroundColor: "white",
        borderBottom: "2px solid orange",
        top: "0",
        zIndex: "10",
        display: "flex",
        justifyContent: "center",
      }}
      className="header"
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <div className="flex items-center">
          <img
            src="/logo-rm-bg.png"
            alt="Logo"
            className="w-24 h-auto cursor-pointer mix-blend-multiply"
            onClick={() => router.push("/")}
          />
          <span className="ml-4 text-orange-600 text-2xl font-bold">
            NUTSBEE
          </span>
        </div>
        <nav className="flex items-center gap-5 relative">
          <a
            href="#"
            className="text-orange-600 font-medium py-3 px-5 rounded hover:bg-orange-600 hover:text-white transition me-8"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Master
          </a>
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white shadow-md rounded w-40">
              <ul className="py-1">
                {options.map((option) => (
                  <li
                    key={option.code}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectOption(option)}
                  >
                    {option.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
