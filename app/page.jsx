"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Carousel from "../component/Carousel";
import axios from "axios";
import ProductDetail from "../component/ProductDetail";
import { Dialog } from "primereact/dialog";
import LoginField from "../component/LoginField";

const main = () => {
  //! SINGLE PRODUCT DIALOG BOX
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [productId, setProductId] = useState();

  const handleProductDetail = (id) => {
    setVisible(true);
    setProductId(id);
  };

  const arr = [
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
  ];
  const router = useRouter();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://nutsbee-1.onrender.com/nutsBee/products",
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization:
  //               "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVc2VyIERldGFpbHMiLCJpc3MiOiJFdmVudCBTY2hlZHVsZXIiLCJleHAiOjE3MTgzNTQxNjksImlhdCI6MTcxODM1MzU2OSwiZW1haWwiOiJyYW1AZ21haWwuY29tIn0.WIHiin9moloZJpJTOiJEQsy86klZrV7inK2rrRDwYow",
  //           },
  //         }
  //       );
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="container mx-auto p-5">
      <div>
        <Carousel />
      </div>
      <div className="grid mt-20 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {arr.map((val) => (
          <>
            <div
              className="card border rounded-lg shadow-lg overflow-hidden"
              key={val.title}
              // onClick={() => router.push("/products/productDetail")}
              onClick={() => handleProductDetail(val.filename)}
            >
              <Image
                className="product-img"
                src={`/assest/${val.filename}`}
                alt="Product Image 1"
                width={300}
                height={120}
                priority
                // layout="responsive"
              />
              <div className="p-5 text-center">
                <h2 className="text-xl font-bold mb-2 md:text-lg sm:text-base">
                  {val.title}
                </h2>
                <p className="text-gray-600 mb-4">&#8377; {val.price}</p>
                <button
                  className="bg-orange-500 text-white py-2 px-4 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShow(true);
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
      {/* show the product details dialog box*/}
      <ProductDetail
        visible={visible}
        setVisible={setVisible}
        productId={productId}
      />
      {/* show logIn dialog box if the user cannot login the website */}
      <Dialog
        header=""
        visible={show}
        style={{ maxWidth: "40rem", width: "90%" }}
        onHide={() => {
          if (!show) return;
          setShow(false);
        }}
      >
        <LoginField />
      </Dialog>
    </div>
  );
};

export default main;
