"use client";
import React, { useState, useEffect, useRef } from "react";
import "primeicons/primeicons.css";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

  const toast = useRef(null);
  const menuLeft = useRef(null);

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
  };

  const handleUserMenu = (event) => {
    setToggle({ ...toggle, user: !toggle.user });
    if (!auth) {
      router.push("/login");
      return;
    }
    menuLeft.current.toggle(event);
  };
  //!user icon dropdown list
  const items = [
    {
      label: "profile",
      url: "/profile",
    },
    {
      label: "logout",
    },
  ];

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
            className="icon"
            width={100}
            height={60}
            style={{
              marginRight: "1rem",
              height: "auto",
              mixBlendMode: "multiply",
              cursor: "pointer",
            }}
            onClick={() => router.push("/")}
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
            className="pi pi-shopping-cart cursor-pointer p-3 font-medium relative p-overlay-badge"
            style={{
              borderRadius: "50%",
              backgroundColor: toggle.cart ? "#f97316" : "",
              color: toggle.cart ? "white" : "",
            }}
            onClick={() => handleToggle("cart")}
          >
            {typeof window !== "undefined" && cart && cart.length > 0 && (
              <Badge value={cart.length}></Badge>
            )}
          </i>
          <i
            className="pi pi-user cursor-pointer p-3 font-medium"
            style={{
              borderRadius: "50%",
              backgroundColor: toggle.user ? "#f97316" : "",
              color: toggle.user ? "white" : "",
            }}
            onClick={(event) => handleUserMenu(event)}
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
      <Toast ref={toast}></Toast>
      <Menu model={items} popup ref={menuLeft} />
    </header>
  );
};

export default Header;