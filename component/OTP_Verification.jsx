"use client";
import React, { useState, useEffect,useRef } from "react";
import { InputOtp } from "primereact/inputotp";
import axios from "axios";
import Loader from '../component/Loader'
import { Toast } from 'primereact/toast';
import {getOtp,reSentOtp} from '@/NutsBeeAPI/getApi';

const OTP_Verification = ({ setVerify, reset, setReset }) => {
  const [token, setTokens] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(90); // total time in seconds
  const [getOTP, setGetOTP] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [loading, setLoading] = useState(false); // Loader state
  const toast = useRef(null);
  //*toast message
  const showError = () => {
    toast.current.show({severity:'error', summary: 'Error', detail:'Invalid OTP', life: 3000});
}
  //* Re-send OTP
  const fetch = async () => {
    setLoading(true); // Show loader
    try {
      // const res = await axios.get(
      //   `https://nutsbee-1.onrender.com/user/resendOtp?email=${reset.email}`,
      //   {
      //     headers: {
      //       Authorization: reset.auth,
      //     },
      //   }
      // );
      const res=await reSentOtp(reset)
      gettingOTP();
      setTimeRemaining(90); // reset to 1 minute 30 seconds
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  //* Get OTP
  const gettingOTP = async () => {
    setLoading(true); // Show loader
    try {
      // const res = await axios.get(
      //   `https://nutsbee-1.onrender.com/nutsBee/users?email=${reset.email}`,
      //   {
      //     headers: {
      //       Authorization: reset.auth,
      //     },
      //   }
      // );
      
      const res=await getOtp(reset)
      setGetOTP(res.otp);
      setReset({ ...reset, otp: res.otp });
      setIsOtpValid(true); // Reset OTP validity
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  useEffect(() => {
    gettingOTP();
  }, [reset.email, reset.auth]);

  //* OTP validation for changing password
  const handleOTP = (e) => {
    setTokens(e.value);
    if (e.value.length === 6) {
      if (isOtpValid && getOTP && getOTP === Number(e.value)) {
        setVerify("forgotpassword");
      } else {
        console.error("Invalid OTP");
        showError()
      }
    }
  };

  //* Reset timer after clicking Re-send OTP button
  const resendOTP = () => {
    setTokens("");
    fetch();
  };

  //* Timer Function
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          setIsOtpValid(false); // Invalidate OTP after time is up
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timeRemaining]); // Depend on timeRemaining to reset the interval when timeRemaining changes

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="otp">
             <Toast ref={toast} />
      <div className="otp-field center capsule"  style={{opacity:loading ? '.4':"1"}}>
          <h2 className="text-xl font-medium text-orange-500">Verify OTP</h2>
            <InputOtp
              value={token}
              onChange={(e) => handleOTP(e)}
              integerOnly
              length={6}
            />
            <div className="flex justify-between items-center w-full p-5">
              <span className="flex items-center text-orange-500 text-sm gap-2">
                <span>Time Remaining:</span>
                <span className="font-medium">
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </span>
              </span>
              {/* Button to resend OTP */}
              <button
                disabled={timeRemaining > 0}
                style={{
                  color: timeRemaining > 0 ? "#DFE3E8" : "#FF5630",
                }}
                className="text-sm font-medium"
                onClick={resendOTP}
              >
                Resend OTP
              </button>
            </div>
      </div>
      {loading && <Loader/>}
    </div>
  );
};

export default OTP_Verification;
