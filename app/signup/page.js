"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import "primeicons/primeicons.css";
import Image from "next/image";
import Link from "next/link";
import { validateFields } from "../../component/validation";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const route = useRouter();

  const [fields, setFields] = useState([
    {
      id: 1,
      type: "text",
      value: "",
      name: "firstname",
      placeholder: "First Name",
      hasError: false,
      error: "",
    },
    {
      id: 2,
      type: "text",
      value: "",
      name: "lastname",
      placeholder: "Last Name",
      hasError: false,
      error: "",
    },
    {
      id: 3,
      type: "text",
      value: "",
      name: "email",
      placeholder: "Email",
      hasError: false,
      error: "",
    },
    {
      id: 4,
      type: "password",
      value: "",
      name: "password",
      placeholder: "Password",
      hasError: false,
      error: "",
    },
    {
      id: 5,
      type: "password",
      value: "",
      name: "confirmpassword",
      placeholder: "Confirm Password",
      hasError: false,
      error: "",
    },
  ]);

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmpassword: false,
  });

  const inputRef = useRef([]);

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  //password toggle visibility
  const handlePasswordVisibility = useCallback((name) => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      [name]: !prevShowPassword[name],
    }));
  }, []);

  //cursor functinality
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && fields[index].value === "") {
      inputRef.current[index - 1].focus();
    }

    if (e.key === "Enter" && index < fields.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  //validation
  const handleChange = useCallback(
    (e, index) => {
      const { name, value } = e.target;
      const updatedFields = [...fields];
      updatedFields[index].value = value;

      // Clear the error message for the confirm password field if it matches the password
      if (name === "confirmpassword") {
        const password = fields.find(
          (field) => field.name === "password"
        ).value;
        if (value === password) {
          updatedFields[index].error = "";
          updatedFields[index].hasError = false;
        } else {
          // If confirm password doesn't match, set error message
          updatedFields[index].error = "Passwords do not match";
          updatedFields[index].hasError = true;
        }
      } else {
        // Validate other fields normally
        updatedFields[index].error = validateFields(name, value);
        updatedFields[index].hasError = !!updatedFields[index].error;
      }

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
    const values = validFields.reduce(  //{firstname:"mohno",lastname:"smith",email:"email@gmail.com",password:'aksdfhhhj'}
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

    const payload = {
      username: values.firstname, // Adjust according to how you want to set the username
      password: values.password,
      confirmPassword: values.confirmpassword,
      email: values.email,
      roles: [
        {
          roleName: "user",
        },
      ],
    };

    try {
      const response = await axios.post(
        "https://nutsbee-1.onrender.com/user/register",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      if (response.status === 200) {
        alert("Registration completed successfully");
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

  return (
    <div className="h-screen w-screen flex items-center justify-center py-3">
      <div className="w-10/12 md:w-7/12 p-4 border-1 shadow-lg shadow-blue-500/50 flex justify-between">
        <div className="hidden sm:flex sm:flex-1 relative border-r-2">
          <h1 className="text-5xl font-black text-orange-300 absolute top-72 left-3 transform -rotate-90 origin-top-left tracking-widest">
            NUTSBEE
          </h1>
        </div>
        <div className="flex-1 p-3 form">
          <h2 className="text-2xl font-bold text-orange-500 mb-2">
            Create new account
          </h2>
          <p className="mb-2">
            Already a member?{" "}
            <Link href="/login" className="text-orange-500 underline">
              Login
            </Link>
          </p>
          <div className="grid mt-3 md:grid-cols-2 gap-2">
            {fields.map(
              (
                { id, type, name, value, placeholder, hasError, error },
                index
              ) => (
                <div
                  key={id}
                  className={`float-label ${
                    id <= 2 ? "col-span-1" : "col-span-1 sm:col-span-2"
                  }`}
                >
                  {type === "password" ? (
                    <>
                      <input
                        value={value}
                        type={showPassword[name] ? "text" : "password"}
                        name={name}
                        placeholder=""
                        className="input-field border-2 border-orange-500 p-3 rounded w-full"
                        onChange={(e) => handleChange(e, index)}
                        ref={(input) => (inputRef.current[index] = input)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                      />
                      <i
                        onClick={() => handlePasswordVisibility(name)}
                        className={`absolute top-4 right-3 cursor-pointer text-gray-400 pi ${
                          showPassword[name] ? "pi-eye" : "pi-eye-slash"
                        }`}
                      />
                    </>
                  ) : (
                    <input
                      value={value}
                      type={type}
                      name={name}
                      placeholder=""
                      className="input-field border-2 border-orange-500 p-3 rounded w-full"
                      onChange={(e) => handleChange(e, index)}
                      ref={(input) => (inputRef.current[index] = input)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  )}
                  <label className="float-label-text">{placeholder}</label>
                  {hasError && (
                    <span className="block text-red-500 text-xs mt-1 font-medium">
                      {error}
                    </span>
                  )}
                </div>
              )
            )}
          </div>

          <div>
            <button
              onClick={(e) => handleSubmit(e)}
              className="mt-4 px-4 py-2 w-full rounded bg-orange-500 text-white hover:bg-white hover:text-orange-500"
            >
              Sign Up
            </button>
          </div>
          {/* <div className="flex flex-col-reverse gap-3 sm:flex-row justify-between items-center mt-3">
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
              onClick={(e) => handleSubmit(e)}
              className="mt-4 px-4 py-2 w-full sm:w-max rounded bg-orange-500 text-white hover:bg-white hover:text-orange-500"
            >
              Sign Up
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;