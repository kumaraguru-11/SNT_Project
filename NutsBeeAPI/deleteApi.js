import axios from "axios";

const host = "https://nutsbee-1.onrender.com";

export const deleteCart = async (payload) => {
  try {
    const res = await axios.delete(`${host}/nutsBee/cart/${payload.cartId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: payload.auth,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAddress = async (payload) => {
  try {
    const res = await axios.delete(`${host}/nutsBee/address/${payload.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: payload.auth,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
