"use client";
import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import toast, { Toaster } from "react-hot-toast";
import "../orderTracking/orderTracking.css";

const Admin = () => {
  const orderDetails = [
    {
      orderId: "O001",
      orderDate: "2023-06-01",
      customerName: "John Doe",
      orderValue: 100,
      status: "",
      courierId: "",
    },
    {
      orderId: "O002",
      orderDate: "2023-06-02",
      customerName: "Jane Smith",
      orderValue: 200,
      status: "",
      courierId: "",
    },
    {
      orderId: "O003",
      orderDate: "2023-06-03",
      customerName: "Alice Johnson",
      orderValue: 150,
      status: "",
      courierId: "",
    },
    {
      orderId: "O011",
      orderDate: "2023-06-11",
      customerName: "Olivia Green",
      orderValue: 150,
      status: "",
      courierId: "",
    },
    {
      orderId: "O025",
      orderDate: "2023-06-25",
      customerName: "Henry Martinez",
      orderValue: 870,
      status: "",
      courierId: "",
    },
    {
      orderId: "O026",
      orderDate: "2023-06-26",
      customerName: "Benjamin Lee",
      orderValue: 930,
      status: "",
      courierId: "",
    },
    {
      orderId: "O027",
      orderDate: "2023-06-27",
      customerName: "Alexander Gonzalez",
      orderValue: 980,
      status: "",
      courierId: "",
    },
    {
      orderId: "O028",
      orderDate: "2023-06-28",
      customerName: "Michael Wilson",
      orderValue: 1020,
      status: "",
      courierId: "",
    },
    {
      orderId: "O029",
      orderDate: "2023-06-29",
      customerName: "Sebastian Clark",
      orderValue: 1100,
      status: "",
      courierId: "",
    },
    {
      orderId: "O030",
      orderDate: "2023-06-30",
      customerName: "Logan Lewis",
      orderValue: 1150,
      status: "",
      courierId: "",
    },
  ];

  const [orderList, setOrderList] = useState(
    orderDetails.map((order) => ({ ...order, checked: false, readOnly: false }))
  );
  const [showSubmit, setShowSubmit] = useState(false);

  const handleCheckboxChange = (rowData) => {
    const updatedList = orderList.map((order) =>
      order.orderId === rowData.orderId
        ? { ...order, checked: !order.checked }
        : order
    );
    setOrderList(updatedList);

    const updateCheckOrderList = updatedList.filter((order) => order.checked);
    setShowSubmit(updateCheckOrderList.length > 0);
  };

  const checkboxTemplate = (rowData) => {
    return (
      <Checkbox
        className="ms-5 mb-2"
        checked={rowData.checked}
        onChange={() => handleCheckboxChange(rowData)}
      />
    );
  };

  const handleInputChange = (e, rowData) => {
    const newData = orderList.map((order) => {
      if (order.orderId === rowData.orderId) {
        return { ...order, courierId: e.target.value };
      }
      return order;
    });
    setOrderList(newData);
    setShowSubmit(newData.some((order) => order.checked));
  };

  const inputTemplate = (rowData) => {
    return (
      <InputText
        value={rowData.courierId}
        onChange={(e) => handleInputChange(e, rowData)}
        disabled={rowData.readOnly}
      />
    );
  };
  
  const handleSubmit = () => {
    const validOrders = orderList.filter(
      (order) => order.checked && order.courierId.trim() !== ""
    );

    if (validOrders.length > 0) {
      const updatedList = orderList.map((order) =>
        order.checked && order.courierId.trim() !== ""
          ? { ...order, readOnly: true, checked: false, status: "Open" }
          : order
      );
      setOrderList(updatedList);
      setShowSubmit(false);

      // Send or log the valid orders
      console.log(validOrders);
    } else {
      toast.error(
        "Please ensure at least one checkbox is checked and the corresponding input is not empty."
      );
    }
  };

  const handleStatusChange = (rowData, value) => {
    const updatedList = orderList.map((order) =>
      order.orderId === rowData.orderId ? { ...order, status: value } : order
    );
    setOrderList(updatedList);
  };

  const statusTemplate = (rowData) => {
    const options =
      rowData.status === ""
        ? []
        : rowData.status === "Open"
        ? [
            { label: "Open", value: "Open" },
            { label: "Transit", value: "Transit" },
            { label: "Delivered", value: "Delivered" },
          ]
        : rowData.status === "Transit"
        ? [
            { label: "Transit", value: "Transit" },
            { label: "Delivered", value: "Delivered" },
          ]
        : [{ label: "Delivered", value: "Delivered" }];

    return (
      <Dropdown
        value={rowData.status}
        options={options}
        onChange={(e) => handleStatusChange(rowData, e.value)}
        disabled={rowData.status === "Delivered"}
        className="w-32 h-11 items-center"
      />
    );
  };

  return (
    <div className="p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="overflow-x-auto ">
        <DataTable
          value={orderList}
          paginator
          rows={10}
          stripedRows
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            header="Check Box"
            body={checkboxTemplate}
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="orderId"
            header="Order Id"
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="orderDate"
            header="Order Date"
            style={{ width: "15%" }}
          ></Column>
          <Column
            field="customerName"
            header="Customer Name"
            style={{ width: "15%" }}
          ></Column>
          <Column
            field="orderValue"
            header="Order Value"
            style={{ width: "15%" }}
          ></Column>
          <Column
            header="Status"
            body={statusTemplate}
            style={{ width: "15%" }}
          ></Column>
          <Column field="courierId" header="Courier Id" body={inputTemplate} />
        </DataTable>
      </div>
      {showSubmit && (
        <div className="mt-4 flex justify-end">
          <div className="flex flex-col items-end">
            <Button label="Submit" onClick={handleSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
