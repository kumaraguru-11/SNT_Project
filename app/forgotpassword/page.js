"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {validateFields} from '../../component/validation'
import OTP from '../../component/OTP_Verification';
import "primeicons/primeicons.css";
import GetEmail from '../../component/GetEmail';
import axios from "axios";
import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";

const ForgotPassword = () => {
  //!state for condition rendering
  const [verify,setVerify]=useState('Email');
  const [reset,setReset]=useState({
    email:'',
    password:"",
    otp:'',
    auth:""
  })

  const route=useRouter();

 //! Input Field state
  const [fields, setFields] = useState([
    {
      id: 1,
      name: "newpassword",
      value: "",
      hasError: false,
      error: "",
    },
    {
      id: 2,
      name: "conformpassword",
      value: "",
      hasError: false,
      error: "",
    },
  ]);

  //!Toggle Icon state
  const [showPassword, setShowPassword] = useState({
    newpassword: false,
    conformpassword: false,
  });
  //!Auto focus Ref Hook
  const newpasswordRef = useRef();
  const conformpasswordRef = useRef();

  useEffect(() => {
   if(verify==='forgotpassword') newpasswordRef.current.focus();
  }, [verify]);

  //!PASSWORD VISIBILITY Fun
  const handlePasswordVisibility = useCallback((name) => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      [name]: !prevShowPassword[name],
    }));
  }, []);

  //!CURSOR MOVEMENT FUNCTION
  const handleKeyDown = (e, forwardRef,backwardRef) => {
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

  //!setting value to the state (Input Validation)
  const handleChange = 
    (e) => {
      const { name, value } = e.target;
      const updatedFields = [...fields];
      if (name === 'newpassword') {
        updatedFields[0].value = value;
        updatedFields[0].error = validateFields(name, value);
        updatedFields[0].hasError = !!updatedFields[0].error;
      }

      if (name === "conformpassword") {
        updatedFields[1].value = value;
        const password = fields.find(
          (field) => field.name === "newpassword"
        ).value;
        if (value === password) {
          updatedFields[1].error = "";
          updatedFields[1].hasError = false;
        } else {
          // If 'confirmpassword' doesn't match, set error message
          updatedFields[1].error = "Passwords do not match";
          updatedFields[1].hasError = true;
        }
      }
      setFields(updatedFields);
    if(updatedFields[0].value===updatedFields[1].value)  setReset({...reset,password:updatedFields[0].value});
    }

  //!pushing the NewPassword to the DB
  const handleNewPassword = async()=>{
    const updatedFields=[...fields];
    const {auth,...resetInput}=reset
    try{
      const res=await axios.patch('https://nutsbee-1.onrender.com/user/resetPassword',resetInput,  {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      })
       //Empty the input field after sucessfully update the password
       updatedFields[0].value=''
       updatedFields[1].value=''
       setFields(updatedFields);
       route.push('/login');
    }catch(error){
      console.log("PATCH ERROR-->",error)
    }
  }

  //!  CONDITION RENDERING:(After receive Email,move into OTP field and validate it,if validation successfull user allow to change the Password)
  if(verify === 'Email'){
    return <GetEmail setVerify={setVerify} setReset={setReset} reset={reset}/>
  }
  if(verify==='otp'){
    return <OTP setVerify={setVerify} reset={reset} setReset={setReset}/>
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center py-5" >
      <div className="w-10/12 md:w-7/12 min-h-96 border-1 shadow-lg shadow-blue-500/50 flex justify-between">
        {/* NUTSBEE */}
        <div className="hidden sm:flex sm:flex-1 relative border-r-2">
          <h1 className="text-5xl font-black text-orange-300 absolute top-72 left-6 transform -rotate-90 origin-top-left tracking-widest">
            NUTSBEE
          </h1>
        </div>{" "}
        <div className="flex-1 p-5">
          <h2 className="text-4xl font-bold text-orange-500 mb-2">OOPs!</h2>
          <p className=" text-orange-500 mb-4">Forgot your password?</p>
          <div className="flex flex-col gap-3 mt-10">
            <div className="float-label">
              <input
                type={showPassword["newpassword"] ? "text" : "password"}
                className="input-field border-2 border-orange-500 p-3 rounded w-full"
                name="newpassword"
                placeholder=""
                value={
                  fields.find((field) => field.name === "newpassword").value
                }
                onChange={(e) => {
                  handleChange(e);
                }}
                ref={newpasswordRef}
                onKeyDown={(e) => handleKeyDown(e, conformpasswordRef, null)}
              />
              <label className="float-label-text">New Password</label>
              {showPassword["newpassword"] ? (
                <i
                  onClick={() => handlePasswordVisibility("newpassword")}
                  className="absolute top-3 right-3 cursor-pointer text-gray-400 pi pi-eye"
                ></i>
              ) : (
                <i
                  onClick={() => handlePasswordVisibility("newpassword")}
                  className="absolute top-3 right-3 cursor-pointer text-gray-400 pi pi-eye-slash"
                />
              )}
                {fields[0].hasError && (
                    <span className="block text-red-500 text-xs mt-1 font-medium">
                      {fields[0].error}
                    </span>
                  )}
            </div>
            <div className="float-label">
              <input
                type={showPassword["conformpassword"] ? "text" : "password"}
                className="input-field border-2 border-orange-500 p-3 rounded w-full"
                name="conformpassword"
                placeholder=""
                value={
                  fields.find((field) => field.name === "conformpassword").value
                }
                onChange={(e) => {
                  handleChange(e);
                }}
                ref={conformpasswordRef}
                onKeyDown={(e) => handleKeyDown(e, null, newpasswordRef)}
              />
              <label className="float-label-text">Conform Password</label>
              {showPassword["conformpassword"] ? (
                <i
                  onClick={() => handlePasswordVisibility("conformpassword")}
                  className="absolute top-3 right-3 cursor-pointer text-gray-400 pi pi-eye"
                ></i>
              ) : (
                <i
                  onClick={() => handlePasswordVisibility("conformpassword")}
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

          <div>
            <button className="mt-4 px-4 py-2 w-full rounded-md bg-orange-500 text-white hover:bg-white hover:text-orange-500" onClick={()=>handleNewPassword()}>
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
            <button className="mt-4 px-4 py-2 w-3/6 rounded-md bg-orange-500 text-white hover:bg-white hover:text-orange-500">
              login
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
