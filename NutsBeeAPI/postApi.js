import axios from "axios";

export const loginUser = async (values) => {
  try {
    const response = await axios.post(
      "https://nutsbee-1.onrender.com/user/login",
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw new Error("Error during login: " + error.message);
  }
};


export const registerUser = async (payload) => {
  try {
    const response = await axios.post('https://nutsbee-1.onrender.com/user/register', payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Registration failed");
  }
};

export const emailOTP = async (payload) => {
  try {
    const res = await axios.post(
        `https://nutsbee-1.onrender.com/user/forgotPassword`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const AddtoCart = async (payload) => {
  try {
    const res = await axios.post(
        `https://nutsbee-1.onrender.com/nutsBee/cart?userId=${payload.userId}&productId=${payload.productId}`,
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
    throw new Error(error.message);
  }
};

