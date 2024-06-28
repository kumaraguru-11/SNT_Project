"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Carousel from "../component/Carousel";
import ProductDetail from "../component/ProductDetail";
import axios from "axios";
import LoginField from "../component/LoginField";
import { Dialog } from "primereact/dialog";
import { getOtp } from "@/NutsBeeAPI/getApi";
import { AddtoCart } from "@/NutsBeeAPI/postApi";
import { useRecoilValue, useRecoilState } from "recoil";
import { authKey, email, userInfo, cartParams } from "../recoilstore/store";
import Loader from "../component/Loader";

const main = () => {
  //! SINGLE PRODUCT DIALOG BOX
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState({});

  const [loading, setLoading] = useState(false);

  const [userDetails, setUserDetails] = useRecoilState(userInfo);
  const [cart, setCart] = useRecoilState(cartParams);
  const auth = useRecoilValue(authKey);
  const useremail = useRecoilValue(email);

  const [productList, setProductList] = useState([]);

  const handleProductDetail = (val) => {
    setVisible(true);
    setProduct(val);
  };

  // const arr = [
  //   {
  //     title: "Brown eggs",
  //     type: "dairy",
  //     description: "Raw organic brown eggs in a basket",
  //     filename: "0.jpg",
  //     height: 600,
  //     width: 400,
  //     price: 28.1,
  //     rating: 4,
  //   },
  //   {
  //     title: "Sweet fresh stawberry",
  //     type: "fruit",
  //     description: "Sweet fresh stawberry on the wooden table",
  //     filename: "1.jpg",
  //     height: 450,
  //     width: 299,
  //     price: 29.45,
  //     rating: 4,
  //   },
  //   {
  //     title: "Asparagus",
  //     type: "vegetable",
  //     description: "Asparagus with ham on the wooden table",
  //     filename: "2.jpg",
  //     height: 450,
  //     width: 299,
  //     price: 18.95,
  //     rating: 3,
  //   },
  //   {
  //     title: "Green smoothie",
  //     type: "dairy",
  //     description:
  //       "Glass of green smoothie with quail egg's yolk, served with cocktail tube, green apple and baby spinach leaves over tin surface.",
  //     filename: "3.jpg",
  //     height: 600,
  //     width: 399,
  //     price: 17.68,
  //     rating: 4,
  //   },
  //   {
  //     title: "Raw legums",
  //     type: "vegetable",
  //     description: "Raw legums on the wooden table",
  //     filename: "4.jpg",
  //     height: 450,
  //     width: 299,
  //     price: 17.11,
  //     rating: 2,
  //   },
  // ];

  //fetch User Details
  useEffect(() => {
    // Check if both email and auth have values
    if (useremail.length > 0 && auth) {
      const payload = {
        email: useremail,
        auth: auth.Authorization,
      };

      const fetchData = async () => {
        try {
          const res = await getOtp(payload);
          setUserDetails(res);
          setCart(res.cartItems)
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [auth, useremail]);

  //fetch products
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://nutsbee-1.onrender.com/nutsBee/productsList",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setLoading(false);
        setProductList(response.data);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addingCart = async (id) => {
    const payload = {
      userId: userDetails.id,
      auth: auth.Authorization,
      productId: id,
    };
    try {
      const res = await AddtoCart(payload);
      console.log(res, "console from landing page");
      setCart((prev) => {
        const itemExists = prev.some((val) => val.itemId === res.itemId);
        if (!itemExists) {
          return [...prev, res];
        }
        return prev;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDialog = (e, val) => {
    e.stopPropagation();
    auth ? addingCart(val.id) : setShow(true);
  };

  return (
    <div className="container mx-auto p-5">
      {loading && <Loader />}
      {!loading && (
        <>
          <div>
            <Carousel />
          </div>
          <div className="grid mt-20 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productList &&
              productList.map((val) => (
                <>
                  <div
                    className="card border rounded-lg shadow-lg overflow-hidden"
                    key={val.id}
                    onClick={() => handleProductDetail(val)}
                  >
                    <Image
                      className="product-img"
                      src={`/assest/${val.id}.jpg`}
                      alt="Product Image 1"
                      width={300}
                      height={120}
                      priority
                    />
                    <div className="p-5 text-center">
                      <h2 className="text-xl font-bold mb-2 md:text-lg sm:text-base">
                        {val.productName}
                      </h2>
                      <p className="text-gray-600 mb-4">&#8377; {val.price}</p>
                      <button
                        className="bg-orange-500 text-white py-2 px-4 rounded"
                        onClick={(e) => {
                          handleDialog(e, val);
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </>
      )}
      {/* products details dialog box */}
      {productList.length > 0 && (
        <ProductDetail
          visible={visible}
          setVisible={setVisible}
          product={product}
        />
      )}
      {/* login dialog box */}
      <Dialog
        header=""
        visible={show}
        style={{ maxWidth: "40rem", width: "90%" }}
        onHide={() => {
          if (!show) return;
          setShow(false);
        }}
      >
        <LoginField setShow={setShow} />
      </Dialog>
    </div>
  );
};

export default main;
