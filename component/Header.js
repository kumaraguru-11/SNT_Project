"use client";
import React, { useState } from "react";
import "primeicons/primeicons.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ListBox } from "primereact/listbox";
import Image from "next/image";

const HeaderIcon = ({ iconClass, active, onClick }) => (
  <i
    className={`${iconClass} cursor-pointer p-3 font-medium`}
    style={{
      borderRadius: "50%",
      backgroundColor: active ? "#f97316" : "",
      color: active ? "white" : "",
    }}
    onClick={onClick}
  ></i>
);

const NavLink = ({ href, children }) => (
  <Link href={href} className="text-orange-600 font-medium p-3 rounded">
    {children}
  </Link>
);

const Header = () => {
  const [toggle, setToggle] = useState({
    hamburger: false,
    user: false,
    search: false,
    cart: false,
  });
  const [selectedCity, setSelectedCity] = useState(null);
  const router = useRouter();

  const handleToggle = (key) => {
    setToggle((prevToggle) => ({
      hamburger: false,
      user: false,
      search: false,
      cart: false,
      [key]: !prevToggle[key],
    }));

    if (key === "cart") {
      router.push("/products/cart");
    }
  };

  const users = [{ name: "Profile" }, { name: "Logout" }];

  return (
    <header
      className="top-0 z-10 flex items-center"
      style={{
        height: "6rem",
        position: "sticky",
        backgroundColor: "white",
        borderBottom: "2px solid orange",
      }}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <div className="flex items-center">
          <Image src="/logo-2.jpeg" alt="Logo" className="icon" width={70} height={80} style={{marginRight:"1rem"}}/>
          <span className="text-orange-600 text-2xl font-bold">NUTSBEE</span>
        </div>
        <nav className="nav-list">
          <NavLink href="/products">All products</NavLink>
          <NavLink href="#">Categories</NavLink>
          <NavLink href="#">Contact us</NavLink>
        </nav>
        <div className="flex items-center h-icon">
          <HeaderIcon
            iconClass="pi pi-search"
            active={toggle.search}
            onClick={() => handleToggle("search")}
          />
          <HeaderIcon
            iconClass="pi pi-shopping-cart"
            active={toggle.cart}
            onClick={() => handleToggle("cart")}
          />
          <HeaderIcon
            iconClass="pi pi-user"
            active={toggle.user}
            onClick={() => handleToggle("user")}
          />
          <HeaderIcon
            iconClass="pi pi-bars"
            active={toggle.hamburger}
            onClick={() => handleToggle("hamburger")}
          />
        </div>
      </div>
      {toggle.search && (
        <div className="search-tab">
          <input placeholder="search" />
        </div>
      )}
      {toggle.hamburger && (
        <nav className="Nav-list-2">
          <NavLink href="#">All products</NavLink>
          <NavLink href="#">Categories</NavLink>
          <NavLink href="#">Contact us</NavLink>
        </nav>
      )}
      {toggle.user && (
        <div
          className="absolute bg-white shadow-lg rounded w-48"
          style={{ top: "3.8rem", right: "1.8rem" }}
        >
          <ListBox
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.value)}
            options={users}
            optionLabel="name"
            className="w-full"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
