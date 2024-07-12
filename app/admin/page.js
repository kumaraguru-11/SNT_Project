<<<<<<< HEAD
import React from 'react'

const page = () => {
  return (
    <div>
      
=======
"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { InputSwitch } from "primereact/inputswitch";

const Admin = () => {
  const [products, setProducts] = useState([
    {
      title: "Brown eggs",
      type: "dairy",
      description: "Raw organic brown eggs in a basket",
      filename: "0.jpg",
      height: 600,
      width: 400,
      price: 28.1,
      rating: 4,
    },
    {
      title: "Sweet fresh stawberry",
      type: "fruit",
      description: "Sweet fresh stawberry on the wooden table",
      filename: "1.jpg",
      height: 450,
      width: 299,
      price: 29.45,
      rating: 4,
    },
    {
      title: "Asparagus",
      type: "vegetable",
      description: "Asparagus with ham on the wooden table",
      filename: "2.jpg",
      height: 450,
      width: 299,
      price: 18.95,
      rating: 3,
    },
    {
      title: "Green smoothie",
      type: "dairy",
      description:
        "Glass of green smoothie with quail egg's yolk, served with cocktail tube, green apple and baby spinach leaves over tin surface.",
      filename: "3.jpg",
      height: 600,
      width: 399,
      price: 17.68,
      rating: 4,
    },
    {
      title: "Raw legums",
      type: "vegetable",
      description: "Raw legums on the wooden table",
      filename: "4.jpg",
      height: 450,
      width: 299,
      price: 17.11,
      rating: 2,
    },
  ]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  //   const [rowClick, setRowClick] = useState(true);

  return (
    <div
      className="mt-2 rounded-xl bg-gray-200 p-3"
      style={{ height: `calc(100vh - 7.25rem)` }}
    >
      <div className="card">
        {/* <div className="flex justify-content-center align-items-center mb-4 gap-2">
          <InputSwitch
            inputId="input-rowclick"
            checked={rowClick}
            onChange={(e) => setRowClick(e.value)}
          />
          <label htmlFor="input-rowclick">Row Click</label>
        </div> */}
        <DataTable
          value={products}
        //   selectionMode={rowClick ? null : "checkbox"}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem"}}
          ></Column>
          <Column field="title" header="Title"></Column>
          <Column field="type" header="Type"></Column>
          <Column field="description" header="Description"></Column>
          <Column field="price" header="Price"></Column>
        </DataTable>
      </div>
>>>>>>> origin/main
    </div>
  )
}

export default page
