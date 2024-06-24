import axios from "axios";

export const getOtp = async (payload) => {
  try {
    const res = await axios.get(
      `https://nutsbee-1.onrender.com/nutsBee/users?email=${payload.email}`,
      {
        headers: {
          Authorization: payload.auth,
        },
      }
    );

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const reSentOtp = async (payload) => {
  try {
    const res = await axios.get(
      `https://nutsbee-1.onrender.com/user/resendOtp?email=${payload.email}`,
      {
        headers: {
          Authorization: payload.auth,
        },
      }
    );

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCartItems = async (payload) => {
  try {
    const res = await axios.get(
      `https://nutsbee-1.onrender.com/nutsBee/cart?userId=${payload.userId}`,
      {
        header: {
          Authorization: payload.auth,
        },
      }
    );

    return res.data
  } catch (error) {
    throw new Error(error.message);
  }
};
