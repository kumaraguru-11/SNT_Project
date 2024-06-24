"use client";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import Image from "next/image";

const ProductDetail = ({ visible, setVisible, productId }) => {
  return (
    <div className="card flex justify-content-center">
      <button
        label="Show"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      <Dialog
        visible={visible}
        modal
        header=""
        footer=""
        style={{ maxWidth: "40rem", width: "90%" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="flex-box">
          <div className="flex-1">
            <Image
              src={`/assest/${productId}`}
              width={1000}
              height={1000}
              alt="img"
              priority
              style={{ display: "block", width: "100%", height: "100%" }}
            />
          </div>
          <div
            className="flex-1 flex flex-col items-start justify-evenly text-orange-500 md:py-3"
            style={{ padding: "0rem 1.5rem" }}
          >
            <div>
              <h2 className="text-2xl font-bold">Product 1</h2>
              <p className="text-sm">
                {/* <i>⭐⭐⭐⭐⭐</i>{" "}
                <span className="text-sm font-semibold">20 reviews</span> */}
                category
              </p>
            </div>

            <div className="mt-5">
              <p className="text-xl">Quantity- 500g</p>
              <p className="text-xl">&#8377; 150</p>
            </div>

            <div className="flex flex-col mt-5">
              <button className="text-xl font-semibold bg-orange-500 p-3 text-white cursor-pointer">
                Add to Cart
              </button>
              <button
                className="text-xl font-semibold bg-green-400 p-3 mt-3 text-white cursor-pointer"
                style={{ backgroundColor: "green" }}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductDetail;
