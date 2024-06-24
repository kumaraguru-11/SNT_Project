"use client";
import React, { useState, useEffect } from "react";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Image from "next/image";
import { getCartItems } from "@/NutsBeeAPI/getApi";
import { userInfo, authKey } from "@/recoilstore/store";
import { useRecoilValue } from "recoil";

const Cart = () => {
  //!fake data
  // const [products, setProducts] = useState([
  //   {
  //     id: 1,
  //     image: "/assest/0.jpg",
  //     price: 10,
  //     quantity: 2,
  //     total: 20,
  //     category: "dryfruits",
  //     product: "Dates",
  //   },
  //   {
  //     id: 2,
  //     image: "/assest/1.jpg",
  //     price: 15,
  //     quantity: 1,
  //     total: 15,
  //     category: "sweets",
  //     product: "chocolate",
  //   },
  //   {
  //     id: 3,
  //     image: "/assest/0.jpg",
  //     price: 10,
  //     quantity: 2,
  //     total: 20,
  //     category: "dryfruits",
  //     product: "Dates",
  //   },
  //   {
  //     id: 4,
  //     image: "/assest/1.jpg",
  //     price: 15,
  //     quantity: 1,
  //     total: 15,
  //     category: "sweets",
  //     product: "chocolate",
  //   },
  //   {
  //     id: 5,
  //     image: "/assest/0.jpg",
  //     price: 10,
  //     quantity: 2,
  //     total: 20,
  //     category: "dryfruits",
  //     product: "Dates",
  //   },
  //   {
  //     id: 6,
  //     image: "/assest/1.jpg",
  //     price: 15,
  //     quantity: 1,
  //     total: 15,
  //     category: "sweets",
  //     product: "chocolate",
  //   },
  // ]);

  const Id = useRecoilValue(userInfo);
  const auth = useRecoilValue(authKey);

  const [products, setProducts] = useState([]);

  const handleIncrement = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: product.quantity + 1,
              total: (product.quantity + 1) * product.price,
            }
          : product
      )
    );
  };
  const handleDecrement = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity > 1
          ? {
              ...product,
              quantity: product.quantity - 1,
              total: (product.quantity - 1) * product.price,
            }
          : product
      )
    );
  };

  const handleDeleteCart = (id) => {
    const updatedProducts = products.filter((el) => el.id !== id);
    setProducts(updatedProducts);
  };

  useEffect(() => {
    const payload = {
      userId: Id.id,
      auth: auth.Authorization,
    };
    const fetch = async () => {
      try {
        const res = getCartItems(payload);
        console.log(res, "cartItems");
        setProducts(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  // const subtotal = products.reduce((acc, state) => {
  //   return acc + state.total;
  // }, 0);
  // const tax = subtotal * (10 / 100);

  const subtotal=100;
  const tax=10
  //!Below functions are the templates for the tabel.
  const imageBodyTemplate = (val) => {
    return (
      <div className="flex items-center gap-5">
        <div className="w-24 h-full">
          <Image
            src={val.image}
            alt="img"
            width={100}
            height={105}
            priority
            className="rounded"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl">{val.product}</p>
          <p className="text-sm">{val.category}</p>
        </div>
      </div>
    );
  };

  const quantityBodyTemplate = (val) => {
    return (
      <div className="flex gap-2 items-center">
        <button
          className="text-xl px-3 bg-red-500 text-white rounded font-semibold"
          onClick={() => handleDecrement(val.id)}
        >
          -
        </button>
        {val.quantity}
        <button
          className="text-xl px-3 bg-green-500 text-white rounded font-semibold"
          onClick={() => handleIncrement(val.id)}
        >
          +
        </button>
      </div>
    );
  };

  const totalBodyTemplate = (val) => {
    return <>Rs.{val.total}</>;
  };
  const priceBodyTemplate = (val) => {
    return <>Rs.{val.price}</>;
  };
  const deleteBodyTemplate = (val) => {
    return (
      <i
        className="pi pi-times-circle cursor-pointer"
        onClick={() => handleDeleteCart(val.id)}
      ></i>
    );
  };

  return (
    <div style={{ minHeight: "100%", height: "90vh" }}>
      <div className="text-4xl font-extrabold">My Cart</div>
      <div className="gap-2 cart-list">
        {/* Tabel */}
        <div className="card mt-10 flex-grow">
          <DataTable
            value={products}
            header=""
            footer=""
            tableStyle={{ maxWidth: "60rem", backgroundColor: "transparent" }}
          >
            <Column header="Product" body={imageBodyTemplate}></Column>
            <Column header="Price" body={priceBodyTemplate}></Column>
            <Column header="Quantity" body={quantityBodyTemplate}></Column>
            <Column header="Total" body={totalBodyTemplate}></Column>
            <Column header="" body={deleteBodyTemplate}></Column>
          </DataTable>
        </div>

        {/* Order summary */}
        <div className="w-80 h-64 my-28 bg-slate-100">
          <h2
            className="text-2xl text-center py-3 border-b-3 border-white"
            style={{ borderBottom: "2px solid #EEEEEE" }}
          >
            Order Summary
          </h2>
          <div className="px-9 py-8">
            <div className="flex justify-between my-2">
              <span>Subtotal</span>
              <span>
                Rs.
                {subtotal}
              </span>
            </div>
            <div className="flex justify-between my-2">
              <span>Shipping</span>
              <span>
                Rs.
                {tax}
              </span>
            </div>
            {/* <div className="flex items-center">
              <span className="flex flex-col">
                <span className="text-green-400">Apply coupon code</span>
                <input
                  placeholder="coupon code"
                  className="bg-transparent coupon-input"
                />
              </span>
              <span>➡</span>
            </div> */}
          </div>
          <div className="px-9 py-4 mt-6 bg-slate-200 w-full font-semibold flex justify-between">
            <span>Total</span>
            <span>Rs.{subtotal + tax}</span>
          </div>
          <button className="my-4 p-3 bg-green-500 cursor-pointer w-full text-black">
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
