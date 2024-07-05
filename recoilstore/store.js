// "use client";
// import { atom, RecoilRoot } from "recoil";

// export default function RecoilContextProvider({ children }) {
//   return <RecoilRoot>{children}</RecoilRoot>;
// }

// export const authKey = atom({
//   key: "authKey",
//   default: "",
// });
// //store Email and userId for Api call
// export const email = atom({
//   key: "email",
//   default:'',
// });
// //store user details
// export const userInfo=atom({
//     key:"userInfo",
//     default:[]
// })
// export const cartParams=atom({
//   key:"cartParams",
//   default:[]
// })

"use client";
// import { atom } from 'recoil';


//presistent state
const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

const saveState = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

import { atom, RecoilRoot, useRecoilState } from "recoil";
import { useEffect } from "react";

const createPersistentAtom = (key, defaultValue) => {
  const persistentAtom = atom({
    key: key,
    default: loadState(key) || defaultValue,
    effects_UNSTABLE: [
      ({ onSet }) => {
        onSet((newValue) => {
          saveState(key, newValue);
        });
      },
    ],
  });

  return persistentAtom;
};

export const authKey = createPersistentAtom("authKey", "");
export const email = createPersistentAtom("email", "");
export const userInfo = createPersistentAtom("userInfo", []);
export const cartParams = createPersistentAtom("cartParams", []);
// export const userAddress=createPersistentAtom("userAddress",[]);

export default function RecoilContextProvider({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

//normal store for Toast
export const toastState = atom({
  key: "toastState",
  default: null,
});
