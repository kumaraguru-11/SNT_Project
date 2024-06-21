import React, { useState,useRef } from "react";
import { validateFields } from "./validation";
import Loader from '../component/Loader';
import axios from "axios";
import { Toast } from 'primereact/toast';


const GetEmail = ({ setVerify, setReset, reset }) => {
  const [email, setEmail] = useState({
    value: "",
    hasError: false,
    error: "",
  });

  const [isLoad, setIsLoad] = useState(false);

  const toast = useRef(null);
  //toast message
  const showError = () => {
    toast.current.show({severity:'error', summary: 'Error', detail:'Invalid Email', life: 3000});
}

  // Sent OTP to the user Email
  const sentOTP = async () => {
    setIsLoad(true);
    const sendEmail = { email: email.value };
    try {
      const res = await axios.post(
        `https://nutsbee-1.onrender.com/user/forgotPassword`,
        sendEmail,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setReset({ ...reset, auth: res.data.Authorization, email: email.value });
      setVerify('otp'); // For Conditional Re-rendering
    } catch (error) {
      // console.error("Error fetching data:", error);
      showError();
      setEmail({
        value: "",
        hasError: false,
        error: "",
      })
    } finally {
      setIsLoad(false); // For Loading 
    }
  };

  // Get and validate Email for sending OTP verification code.
  const handleGetMail = (e) => {
    const { name, value } = e.target;
    const updatedemail = { ...email };
    updatedemail.value = value;
    updatedemail.error = validateFields(name, value);
    updatedemail.hasError = !!updatedemail.error;

    setEmail(updatedemail);
  };


  return (
    <div className="otp">
        <Toast ref={toast} />
      <div className="center capsule flex flex-col items-center" style={{opacity:isLoad ? '.4':"1"}}>
        <h2 className="text-xl font-medium text-orange-500 mt-10">
          Enter Email
        </h2>
        <input
          placeholder="Enter the Email"
          value={email.value}
          type="email"
          name="email"
          onChange={handleGetMail}
          className="border-2 border-orange-500 rounded mt-10 input"
          style={{ padding: "10px", width: "80%" }}
          disabled={isLoad}
        />
        {email.hasError && (
          <span className="block text-red-500 text-xs mt-3 font-medium">
            {email.error}
          </span>
        )}

        <button
          className="mt-5 p-3 rounded bg-white text-orange-500 btn-hover border-2 border-orange-500"
          style={{ width: "80%", cursor: email.hasError || email.value.length===0 || isLoad ? 'not-allowed':'pointer' }}
          onClick={sentOTP}
          disabled={email.hasError || email.value.length===0 || isLoad}
        >
          Submit
        </button>
      </div>
        {isLoad && <Loader />}
    </div>
  );
};

export default GetEmail;
