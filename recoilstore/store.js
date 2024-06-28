"use client";
import { atom, RecoilRoot } from "recoil";

export default function RecoilContextProvider({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

export const authKey = atom({
  key: "authKey",
  default: "",
});
//store Email and userId for Api call
export const email = atom({
  key: "email",
  default:'',
});
//store user details
export const userInfo=atom({
    key:"userInfo",
    default:[]
})
export const cartParams=atom({
  key:"cartParams",
  default:[]
})
