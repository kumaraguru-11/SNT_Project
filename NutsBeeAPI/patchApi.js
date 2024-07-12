import axios from "axios";

const host = "https://nutsbee-1.onrender.com";

export const patchCart = async (payload) => {
  try {
    const res = await axios.patch(
      `${host}/nutsBee/cart/${payload.cartId}`,
      payload.quantity,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: payload.auth,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const patchAddress = async (payload) => {
  try {
    const res = await axios.patch(
      `${host}/nutsBee/address/${payload.Id}`,
      payload.changeAddress,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: payload.auth,
        },
      }
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
export const patchPhoneNumber = async (payload) => {
  try {
    const res = await axios.patch(
      `${host}/nutsBee/users/${payload.Id}`,
      payload.updatedNumber,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: payload.auth,
        },
      }
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
