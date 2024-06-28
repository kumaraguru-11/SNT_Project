"use client";
import React, { useState } from "react";
import "primeicons/primeicons.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ListBox } from "primereact/listbox";
import { Badge } from "primereact/badge";
import { cartParams, authKey } from "@/recoilstore/store";
import { useRecoilValue } from "recoil";
import Image from "next/image";

//!Header list
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

  const [selecteduser, setSelectedUser] = useState(null);
  const router = useRouter();

  const cart = useRecoilValue(cartParams);
  const auth = useRecoilValue(authKey);

  //!icon Active function
  const handleToggle = (key) => {
    setToggle((prevToggle) => ({
      hamburger: false,
      user: false,
      search: false,
      cart: false,
      [key]: !prevToggle[key],
    }));

    if (key === "cart") {
      router.push("/cart");
    }

    if (key === "user" && !auth) {
      setToggle({ ...toggle, user: false });
      router.push("/login");
    }
  };

  //!user icon dropdown list
  const users = [
    { name: "profile", code: "pf" },
    { name: "Logout", code: "lo" },
  ];

  //!user icon dropdown link
  const handleUser = (link) => {
    setSelectedUser(link);
    setToggle({ ...toggle, user: false });
    if (link === "profile") router.push(`/${link}`);
  };

  return (
    <header
      // className="flex items-center"
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
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <div className="flex items-center">
          <img
            src="/logo-rm-bg.png"
            alt="Logo"
            className="icon"
            width={100}
            height={60}
            style={{
              marginRight: "1rem",
              height: "auto",
              mixBlendMode: "multiply",
            }}
          />
          <span className="text-orange-600 text-2xl font-bold header-head">
            NUTSBEE
          </span>
        </div>
        <nav className="nav-list">
          <NavLink href="/">All products</NavLink>
          <NavLink href="#">Categories</NavLink>
          <NavLink href="#">Contact us</NavLink>
        </nav>
        <div className="flex items-center h-icon gap-2">
          <i
            className="pi pi-search cursor-pointer p-3 font-medium"
            style={{
              borderRadius: "50%",
              backgroundColor: toggle.search ? "#f97316" : "",
              color: toggle.search ? "white" : "",
            }}
            onClick={() => handleToggle("search")}
          ></i>
          <i
            className="pi pi-shopping-cart cursor-pointer p-3 font-medium relative p-overlay-badge
            "
            style={{
              borderRadius: "50%",
              backgroundColor: toggle.cart ? "#f97316" : "",
              color: toggle.cart ? "white" : "",
            }}
            onClick={() => handleToggle("cart")}
          >
            {cart && cart.length > 0 && <Badge value={cart.length}></Badge>}
          </i>
          <i
            className="pi pi-user cursor-pointer p-3 font-medium"
            style={{
              borderRadius: "50%",
              backgroundColor: toggle.user ? "#f97316" : "",
              color: toggle.user ? "white" : "",
            }}
            onClick={() => handleToggle("user")}
          ></i>
          <i
            className="pi pi-bars cursor-pointer p-3 font-medium"
            style={{
              borderRadius: "50%",
              backgroundColor: toggle.hamburger ? "#f97316" : "",
              color: toggle.hamburger ? "white" : "",
            }}
            onClick={() => handleToggle("hamburger")}
          ></i>
        </div>
      </div>
      {toggle.search && (
        <div className="search-tab">
          <input placeholder="search" />
        </div>
      )}
      {toggle.hamburger && (
        <nav className="Nav-list-2">
          <NavLink href="/">All products</NavLink>
          <NavLink href="#">Categories</NavLink>
          <NavLink href="#">Contact us</NavLink>
        </nav>
      )}
      {toggle.user === true && auth && (
        <div
          className="absolute bg-white shadow-lg rounded w-48"
          style={{ top: "3.8rem", right: "1.8rem" }}
        >
          <ListBox
            value={selecteduser}
            onChange={(e) => handleUser(e.value.name)}
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
