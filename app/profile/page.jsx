// "use client";
// import React, { useState } from "react";
// import "primeicons/primeicons.css";
// import { Avatar } from "primereact/avatar";
// import { userInfo } from "../../recoilstore/store";
// import { useRecoilValue } from "recoil";

// const profile = () => {
//   const userDetails = useRecoilValue(userInfo);

//   return (
//     <div
//       className="w-100% px-0 sm:px-10"
//       style={{
//         backgroundColor: "yellow",
//         height: "100%",
//         minHeight: "calc(100vh - 6.5rem)",
//       }}
//     >
//       <h2 className="text-4xl font-bold mb-5">My Profile</h2>

//       <main
//         className="rounded p-0 grid gap-5 grid-cols-1 sm:grid-cols-3"
//         style={{ backgroundColor: "#f6dbc3" }}
//       >
//         <section>
//           <div className="bg-white h-100% w-100% rounded p-5">
//             <div className="flex justify-center">
//               <span className="relative">
//                 <Avatar label="P" size="xlarge" shape="circle" />
//                 <i
//                   className="pi pi-pencil absolute p-3 rounded-full hover:cursor-pointer text-white right-0 top-4"
//                   style={{ backgroundColor: "#f97316" }}
//                 ></i>
//               </span>
//             </div>

//             <div className="p-5 mt-5 leading-10">
//               <div className="flex justify-start gap-5">
//                 <span>NAME</span>
//                 <span>-</span>
//                 <span className="justify-start">Suresh</span>
//               </div>

//               <div className="flex justify-start gap-5">
//                 <span>PHONE</span>
//                 <span>-</span>
//                 <span className="justify-start">1234567890</span>
//               </div>
//               <div className="flex justify-start gap-5">
//                 <span>EMAIL</span>
//                 <span>-</span>
//                 <span>suresh@gmail.com</span>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="col-span-2 flex flex-col px-0 mt-0 sm:mt-0">
//           <div style={{ backgroundColor: "white" }} className="rounded p-5">
//             <h2 className="text-xl">Previous Order</h2>
//             <div
//               className="overflow-y-scroll mt-3 h-32"
//               style={{ backgroundColor: "lightgoldenrodyellow" }}
//             >
//               Lorem, ipsum dolor sit amet consectetur adipisicing elit.
//               Repudiandae, corrupti harum placeat delectus accusamus repellendus
//               minus cum suscipit repellat provident ex blanditiis excepturi
//               nesciunt quo possimus dolorem soluta sapiente fugit! Lorem, ipsum
//               dolor sit amet consectetur adipisicing elit. Repudiandae, corrupti
//               harum placeat delectus accusamus repellendus minus cum suscipit
//               repellat provident ex blanditiis excepturi nesciunt quo possimus
//               dolorem soluta sapiente fugit!
//             </div>
//           </div>
//           <div style={{ backgroundColor: "white" }}>sec 2 dev 2</div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default profile;

"use client";
import React from "react";
import "primeicons/primeicons.css";
import { Avatar } from "primereact/avatar";
import { userInfo } from "../../recoilstore/store";
import { useRecoilValue } from "recoil";

const profile = () => {
  const userDetails = useRecoilValue(userInfo);

  return (
    <div
      style={{
        // backgroundColor: "yellow",
        height: "100%",
        minHeight: "calc(100vh - 6.5rem)",
        padding: "5px",
      }}
    >
      <h2 className="text-4xl font-bold ms-5 mb-5">My Profile</h2>
      <main
        className="container-con rounded bg-blue-500 m-auto h-full w-full sm:w-11/12"
        style={{ backgroundColor: "#f6dbc3" }}
      >
        <section className="card p-5">
          <div className="bg-white h-full max-w-96 rounded p-5">
            <div className="flex justify-center">
              <span className="relative mt-10">
                <Avatar label="P" size="xlarge" shape="circle" />
                <i
                  className="pi pi-pencil absolute p-3 rounded-full hover:cursor-pointer text-white right-0 top-4"
                  style={{ backgroundColor: "#f97316" }}
                ></i>
              </span>
            </div>
            <div className="w-full p-0 mt-10 mb-5 grid grid-cols-5 gap-0">
              <span className="col-span-2 ms-auto">NAME</span>
              <span className="items-center" style={{ justifySelf: "center" }}>
                -
              </span>
              <span className="col-span-2 truncate">Suresh</span>
              <span className="col-span-2 ms-auto">PHONE</span>
              <span style={{ justifySelf: "center" }}>-</span>
              <span className="col-span-2 truncate">1234567890</span>
              <span className="col-span-2 ms-auto">EMAIL</span>
              <span style={{ justifySelf: "center" }}>-</span>
              <span className="col-span-2 truncate">
                suresh@gmail.cosuresh@gmail.co
              </span>
            </div>
          </div>
        </section>
        <section className="p-3 flex-1">
          <article className="block1 bg-lightgreen p-3">
            <div
              style={{ backgroundColor: "white" }}
              className="rounded p-5 h-full"
            >
              <h2 className="text-xl">Previous Order</h2>
              <div className="overflow-y-scroll mt-1 h-32">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae, corrupti harum placeat delectus accusamus
                repellendus minus cum suscipit repellat provident ex blanditiis
                excepturi nesciunt quo possimus dolorem soluta sapiente fugit!
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae, corrupti harum placeat delectus accusamus
                repellendus minus cum suscipit repellat provident ex blanditiis
                excepturi nesciunt quo possimus dolorem soluta sapiente fugit!
              </div>
            </div>
          </article>
          <article className="black2 bg-lightsalmon flex-1 p-2">
            <div style={{ backgroundColor: "white" }} className="rounded p-5">
              <h2 className="text-xl">Shipping Address</h2>
              <section className="leading-8">
                <div className="grid grid-cols-2 mt-3">
                  <span className="text-sm text-slate-400">Address</span>
                  <span>pidari north street</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-sm text-slate-400">City</span>
                  <span>sirkali</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-sm text-slate-400">Country</span>
                  <span>india</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-sm text-slate-400">Zip code</span>
                  <span>609110</span>
                </div>
              </section>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default profile;
