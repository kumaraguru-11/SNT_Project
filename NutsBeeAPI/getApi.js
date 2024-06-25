import axios from "axios";

const host='https://nutsbee-1.onrender.com'

export const getOtp = async (payload) => {
  try {
    const res = await axios.get(
      `${host}/nutsBee/users?email=${payload.email}`,
      {
        headers: {
          Authorization: payload.auth,
        },
      }
    );

    return res.data;
  } catch (error) {
    return error.message;  }
};
export const reSentOtp = async (payload) => {
  try {
    const res = await axios.get(
      `${host}/user/resendOtp?email=${payload.email}`,
      {
        headers: {
          Authorization: payload.auth,
        },
      }
    );

    return res.data;
  } catch (error) {
    return error.message;  }
};

export const getCartItems = async (payload) => {
  try {
    const res = await axios.get(
      `${host}/nutsBee/cart?userId=${payload.userId}`,
      {
        headers: {
          Authorization: payload.auth,
        },
      }
    );

    return res.data
  } catch (error) {
    return error.message;
  }
};
