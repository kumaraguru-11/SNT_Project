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
    return res;
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
    return res;
  } catch (error) {
    console.error(error);
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> a5f7dfd85be5eac9b269f2d6c414088a604ff1af
