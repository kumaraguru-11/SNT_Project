// export const validateFields = (name, value) => {
//   let error = "";

//   switch (name) {
//     case "firstname":
//     case "lastname":
//       const specialCharacter = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]/;
//       if (specialCharacter.test(value)) {
//         error = "Name cannot contain any special character or number";
//       } else if (value.length === 0) {
//         error = "Enter your name";
//       } else if (value.length < 3) {
//         error = "Name must contain at least 3 characters";
//       }
//       break;
//     case "email":
//       const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
//       if (!emailReg.test(value)) {
//         error = value.length > 0 ? "Invalid Email" : "Enter your Email";
//       }
//       break;
//     case "password":
//       if (value.length === 0) {
//         error = "Enter your Password";
//       } else if (!/[A-Z]/.test(value)) {
//         error = "Password must contain at least one Capital letter";
//       } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
//         error = "Password must contain at least one special character";
//       } else if (!/\d/.test(value)) {
//         error = "Password must contain at least one Number";
//       } else if (value.length < 6 || value.length > 10) {
//         error = "Password must be between 6 and 10 characters long";
//       }
//       break;
//     case "confirmpassword":
//       // You may want to check if the confirmed password matches the password here
//       break;
//     default:
//       break;
//   }

//   return error;
// };

export const validateFields = (name, value,) => {
  let error = "";

  switch (name) {
    case "firstname":
    case "lastname":
      const specialCharacter = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]/;
      if (specialCharacter.test(value)) {
        error = "Name cannot contain any special character or number";
      } else if (value.length === 0) {
        error = "Enter your name";
      } else if (value.length < 3) {
        error = "Name must contain at least 3 characters";
      }
      break;
    case "email":
      const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailReg.test(value)) {
        error = value.length > 0 ? "Invalid Email" : "Enter your Email";
      }
      break;
    case "password":
    case "newpassword":
      if (value.length === 0) {
        error = "Enter your Password";
      } else if (!/[A-Z]/.test(value)) {
        error = "Password must contain at least one Capital letter";
      } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
        error = "Password must contain at least one special character";
      } else if (!/\d/.test(value)) {
        error = "Password must contain at least one Number";
      } else if (value.length < 6 || value.length > 15) {
        error = "Password must be between 6 and 15 characters long";
      }
      break;
    default:
      break;
  }

  return error;
};
