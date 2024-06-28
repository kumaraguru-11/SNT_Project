"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import "primeicons/primeicons.css";
import { validateFields } from "../component/validation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/NutsBeeAPI/postApi";
import { useRecoilState } from "recoil";
import { authKey, email } from "../recoilstore/store";
import Loader from "../component/Loader";

const Login_Field = ({ setShow }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
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

  //store Auth Key globally(Recoil)
  const [auth, setAuth] = useRecoilState(authKey);
  const [userEmail, setUserEmail] = useRecoilState(email);

  //post the user data to the db
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validFields = fields.filter(
      (field) => field.value.trim() !== "" && !field.hasError
    );

    const values = validFields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.value,
      }),
      {}
    );

    if (validFields.length !== fields.length) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    try {
      setLoading(true);
      const response = await loginUser(values);
      if (response.status === 201 || response.status === 200) {
        setAuth(response.data);
        setUserEmail(values.email);
        // Clear all fields after successful registration
        setFields((prevFields) =>
          prevFields.map((field) => ({
            ...field,
            value: "", // Reset each field's value to an empty string
            hasError: false, // Reset error states
            error: "", // Clear any error messages
          }))
        );
        setLoading(false);
        route.push("/");
        setShow(false);
      } else {
        alert(
          `Error during registration: ${
            response.data.message || "Unknown error"
          }`
        );
      }
    } catch (error) {
      // alert("Error during registration: " + error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

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

  //PASSWORD VISIBILITY
  const handlePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  //button disable
  const isButtonDisabled = () => {
    return (
      loading ||
      fields.some((field) => field.value.length === 0 || field.hasError)
    );
  };
  return (
    <div style={{ opacity: loading ? ".4" : "1" }}>
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
            disabled={loading}
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
            disabled={loading}
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
          disabled={isButtonDisabled()}
          style={{ cursor: isButtonDisabled() ? "not-allowed" : "pointer" }}
        >
          login
        </button>
      </div>
      {loading && <Loader />}
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
  );
};

export default Login_Field;
