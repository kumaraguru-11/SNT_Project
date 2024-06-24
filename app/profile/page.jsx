"use client";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { userInfo } from "../../recoilstore/store";
import { useRecoilValue } from "recoil";

const profile = () => {
  const [value, setValue] = useState("");
  const userDetails=useRecoilValue(userInfo);

  console.log(userDetails);

  return (
    <div className="h-screen w-screen flex flex-col items-center gap-10">
      <FloatLabel>
        <InputText
          id="username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label for="username">name</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          id="username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label for="username">Email</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          id="username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label for="username">phone number</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          id="username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label for="username">Address</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          id="username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label for="username">city</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          id="username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label for="username">postal code</label>
      </FloatLabel>
    </div>
  );
};

export default profile;
