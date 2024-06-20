"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import "primeicons/primeicons.css";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { validateFields } from "../../component/validation";

const LogIn = () => {
  const route = useRouter();
  const [fields, setFields] = useState([
    {
      id: 1,
      name: "email",
      value: "",
      hasError: false,
      error: "",
    },
    {
      id: 2,
      name: "password",
      value: "",
      hasError: false,
      error: "",
    },
  ]);
  const [showPassword, setShowPassword] = useState(false);

  const usernameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  //PASSWORD VISIBILITY
  const handlePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  //CURSOR MOVEMENT FUNCTION
  const handleKeyDown = (e, forwardRef, backwardRef) => {
    if (e.key === "Enter") {
      if (forwardRef === null) return;
      e.preventDefault();
      forwardRef.current.focus();
    }
    if (e.key === "Backspace" && fields[1].value === "") {
      if (backwardRef === null) return;
      e.preventDefault();
      backwardRef.current.focus();
    }
  };

  //validation
  const handleChange = useCallback(
    (e, index) => {
      const { name, value } = e.target;
      const updatedFields = [...fields];
      updatedFields[index].value = value;
      updatedFields[index].error = validateFields(name, value);
      updatedFields[index].hasError = !!updatedFields[index].error;
      setFields(updatedFields);
    },
    [fields]
  );

  //post the user data to the db
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter fields to include only those that have no errors and are not empty
    const validFields = fields.filter(
      (field) => field.value.trim() !== "" && !field.hasError
    );

    // Create the values object from the valid fields
    const values = validFields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.value,
      }),
      {}
    );

    // Check if all required fields are valid
    if (validFields.length !== fields.length) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    try {
      const response = await axios.post(
        "https://nutsbee-1.onrender.com/user/login",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      if (response.status === 201 || response.status === 200) {
        alert("Login completed successfully");
        route.push("/products");
      } else {
        alert(
          `Error during registration: ${
            response.data.message || "Unknown error"
          }`
        );
      }
    } catch (error) {
      console.error(error);
      alert("Error during registration: " + error.message);
    }
  };

  //  console.log(fields)
  return (
    <div className="h-screen w-screen flex items-center justify-center py-5">
      <div className="w-10/12 md:w-7/12 min-h-96 border-1 shadow-lg shadow-blue-500/50 flex justify-between">
        {/* NUTSBEE */}
        <div className="hidden sm:flex sm:flex-1 relative border-r-2">
          <h1 className="text-5xl font-black text-orange-300 absolute top-72 left-6 transform -rotate-90 origin-top-left tracking-widest">
            NUTSBEE
          </h1>
        </div>{" "}
        <div className="flex-1 p-5">
          <h2 className="text-2xl font-bold text-orange-500 mb-2">Welcome!</h2>
          <p className="mb-2">
            Don't have an acount?{" "}
            <Link
              href="/signup"
              className="text-orange-500 underline cursor-pointer"
            >
              Sign up
            </Link>
          </p>
          <div className="flex flex-col gap-3 mt-5">
            <div className="float-label">
              <input
                type="text"
                className="input-field border-2 border-orange-500 p-3 rounded w-full"
                name="email"
                placeholder=""
                value={fields.find((field) => field.name === "email").value}
                onChange={(e) => {
                  handleChange(e, 0);
                }}
                ref={usernameRef}
                onKeyDown={(e) => handleKeyDown(e, passwordRef, null)}
              />
              <label className="float-label-text">Email</label>
              {fields[0].hasError && (
                <span className="block text-red-500 text-xs mt-1 font-medium">
                  {fields[0].error}
                </span>
              )}
            </div>
            <div className="float-label">
              <input
                type={showPassword ? "text" : "password"}
                className="input-field border-2 border-orange-500 p-3 rounded w-full"
                name="password"
                placeholder=""
                value={fields.find((field) => field.name === "password").value}
                onChange={(e) => {
                  handleChange(e, 1);
                }}
                ref={passwordRef}
                onKeyDown={(e) => handleKeyDown(e, null, usernameRef)}
              />
              <label className="float-label-text">password</label>
              {showPassword ? (
                <i
                  onClick={() => handlePasswordVisibility()}
                  className="absolute top-3 right-3 cursor-pointer text-gray-400 pi pi-eye"
                ></i>
              ) : (
                <i
                  onClick={() => handlePasswordVisibility()}
                  className="absolute top-3 right-3 cursor-pointer text-gray-400 pi pi-eye-slash"
                />
              )}
              {fields[1].hasError && (
                <span className="block text-red-500 text-xs mt-1 font-medium">
                  {fields[1].error}
                </span>
              )}
            </div>
          </div>
          <Link
            href="/forgotpassword"
            className="font-semibold text-orange-500"
            style={{ cursor: "pointer" }}
          >
            Forget password?
          </Link>

          <div>
            <button
              className="mt-4 px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-white hover:text-orange-500 w-full"
              onClick={(e) => handleSubmit(e)}
            >
              login
            </button>
          </div>
          {/* <div className="flex flex-col-reverse gap-3 justify-between items-center mt-3">
            <div>
              <div className="flex items-center">
                <div className="w-5 border-t border-gray-400"></div>
                <span className="mx-4 text-gray-500">OR</span>
                <div className="w-5 border-t border-gray-400"></div>
              </div>
              <div className="flex gap-10 mt-4 sm:mt-0">
                <Image
                  src="/google_icon.png"
                  width={30}
                  height={24}
                  alt="Google"
                  className="hover:cursor-pointer icon"
                />
                <Image
                  src="/facebook.png"
                  width={30}
                  height={24}
                  alt="Facebook"
                  className="hover:cursor-pointer icon"
                />
              </div>
            </div>
            <button
              className="mt-4 px-4 py-2 w-max rounded-md bg-orange-500 text-white hover:bg-white hover:text-orange-500"
              onClick={(e) => handleSubmit(e)}
            >
              login
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LogIn;
