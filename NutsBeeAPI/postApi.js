import axios from "axios";

const host = "https://nutsbee-1.onrender.com";

export const loginUser = async (values) => {
  try {
    const response = await axios.post(`${host}/user/login`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const registerUser = async (payload) => {
  try {
    const response = await axios.post(`${host}/user/register`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const emailOTP = async (payload) => {
  try {
    const res = await axios.post(`${host}/user/forgotPassword`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error.message;
  }
};
export const AddtoCart = async (payload) => {
  try {
    const res = await axios.post(
      `${host}/nutsBee/cart?userId=${payload.userId}&productId=${payload.productId}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: payload.auth,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error.message;
  }
};

export const addAddress = async (payload) => {
  try {
    const response = await axios.post(
      `${host}/nutsBee/address?userId=${payload.userId}`,
      payload.address,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: payload.auth,
        },
      }
    );

    return response
  } catch(error) {
    return error.message;
  }
};
