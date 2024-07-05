"use client";
import React, { useState } from "react";
import "primeicons/primeicons.css";
import { Avatar } from "primereact/avatar";
import { userInfo, authKey, toastState } from "../../recoilstore/store";
import { useRecoilValue, useRecoilState } from "recoil";
import { Dialog } from "primereact/dialog";
import "primeicons/primeicons.css";
import { deleteAddress } from "@/NutsBeeAPI/deleteApi";
import { addAddress } from "@/NutsBeeAPI/postApi";
import { patchAddress } from "@/NutsBeeAPI/patchApi";

const Profile = () => {
  const [visible, setVisible] = useState(false);
  const [addressList, setAddressList] = useState(false);
  const [action, setAction] = useState();

  const auth = useRecoilValue(authKey);
  // const userDetails = useRecoilValue(userInfo);
  const [userDetails, setUserDetails] = useRecoilState(userInfo);
  const username = userDetails.username || "";
  const first = username.slice(0, 1).toUpperCase();

  const [address, setAddress] = useState({
    flatNo: "",
    street: "",
    area: "",
    city: "",
    pincode: "",
    state: "TN",
  });
  const [addressId, setAddressId] = useState();

  //prime react toast
  const [, setToastMessage] = useRecoilState(toastState);

  const showToast = (message) => {
    setToastMessage({
      severity: "success",
      summary: "Success",
      detail: `${message}`,
      life: 3000,
    });
  };

  //Dialog Box shown method
  const handleModifyAddress = (fun, item) => {
    //item paramaeter receives from display address dialog box("Edit icon")
    if (fun === "Add") {
      setAddress({
        flatNo: "",
        street: "",
        area: "",
        city: "",
        pincode: "",
        state: "TN",
      });
      setVisible(true);
      setAction("Add");
    }
    if (fun === "Edit") {
      setVisible(true);
      setAddressList(false);
      setAction("Edit");
      setAddress({
        flatNo: item.flatNo,
        street: item.street,
        area: item.area,
        city: item.city,
        pincode: item.pincode,
        state: "TN",
      });
      setAddressId(item.id);
    }

    if (fun === "View") {
      setAddressList(true);
    }
  };

  //Delete Api Function
  const handleDeleteAddress = async (el) => {
    const updatedAddresses = userDetails?.addresses.filter((val) => {
      return val.id !== el.id;
    });

    const payload = {
      id: el.id,
      auth: auth.Authorization,
    };
    try {
      const res = await deleteAddress(payload);
      if (res.status === 201 || res.status === 200) {
        showToast(res.data);
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          addresses: updatedAddresses,
        }));
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  //Add Api function
  const handleAddAddress = async () => {
    const { flatNo, street, area, city, pincode } = address;
    if (flatNo && street && area && city && pincode) {
      const payload = {
        auth: auth.Authorization,
        userId: userDetails.id,
        address: { ...address },
      };
      try {
        const res = await addAddress(payload);
        if (res.status === 201 || res.status === 200) {
          showToast("Address Created Successfully!!!");

          setUserDetails((prevDetails) => ({
            ...prevDetails,
            addresses: [...prevDetails.addresses, res.data], // Assuming res.data.address contains the new address
          }));

          console.log(userDetails);
          setAddress({
            flatNo: "",
            street: "",
            area: "",
            city: "",
            pincode: "",
            state: "TN",
          });
          setVisible(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  //Edit Api function
  const handleEditAddress = async () => {
    const existingAddress = userDetails?.addresses.find(
      (el) => el.id === addressId
    );

    // if (!existingAddress) {
    //   console.error(`Address with id ${addressId} not found in user details.`);
    //   return;
    // }

    const {
      flatNo: existingFlatNo,
      street: existingStreet,
      area: existingArea,
      city: existingCity,
      pincode: existingPincode,
    } = existingAddress;

    // Prepare the changeAddress object with only the fields that have changed
    const changeAddress = {};

    if (address.flatNo !== existingFlatNo) {
      changeAddress.flatNo = address.flatNo;
    }
    if (address.street !== existingStreet) {
      changeAddress.street = address.street;
    }
    if (address.area !== existingArea) {
      changeAddress.area = address.area;
    }
    if (address.city !== existingCity) {
      changeAddress.city = address.city;
    }
    if (address.pincode !== existingPincode) {
      changeAddress.pincode = address.pincode;
    }

    const payload = {
      Id: addressId,
      changeAddress,
      auth: auth.Authorization,
    };

    try {
      const res = await patchAddress(payload);
      if (res.status === 200 || res.data === 201) {
        showToast("Address Updated Successfully!!!");

        // Update the user details in Recoil state with the updated address
        const updatedAddresses = userDetails.addresses.map((addr) =>
          addr.id === addressId ? { ...addr, ...payload.changeAddress } : addr
        );

        setUserDetails((prevDetails) => ({
          ...prevDetails,
          addresses: updatedAddresses,
        }));

        setAddress({
          flatNo: "",
          street: "",
          area: "",
          city: "",
          pincode: "",
          state: "TN",
        });
        setVisible(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //input field value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  // Ensure that certain parts are only rendered on the client side
  if (typeof window === "undefined") {
    return null; // or some server-rendered placeholder
  }

  return (
    <main
      style={{
        height: "100%",
        minHeight: "calc(100vh - 6.5rem)",
        padding: "5px",
      }}
    >
      <h2 className="text-4xl font-bold ms-5 mb-5">My Profile</h2>
      <div
        className="container-con rounded bg-blue-500 m-auto h-full w-full sm:w-11/12"
        style={{ backgroundColor: "#f6dbc3" }}
      >
        <section className="card p-5">
          <div className="bg-white h-full min-w-64 rounded p-5 change-profile-card">
            <div className="flex justify-center">
              <span className="relative mt-10">
                <Avatar label={first} size="xlarge" shape="circle" />
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
              <span className="col-span-2 truncate">
                {userDetails?.username}
              </span>
              <span className="col-span-2 ms-auto">PHONE</span>
              <span style={{ justifySelf: "center" }}>-</span>
              <span className="col-span-2 truncate">
                {userDetails?.phoneNumber}
              </span>
              <span className="col-span-2 ms-auto">EMAIL</span>
              <span style={{ justifySelf: "center" }}>-</span>
              <span className="col-span-2 truncate">{userDetails?.email}</span>
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
          <article className="relative bg-lightsalmon flex-1 p-2">
            <div style={{ backgroundColor: "white" }} className="rounded p-5">
              <h2 className="text-xl truncate">Shipping Address</h2>
              <i
                className="pi pi-plus p-2 rounded-full hover:cursor-pointer text-white absolute right-16 top-6"
                style={{ backgroundColor: "#f97316" }}
                onClick={() => handleModifyAddress("Add")}
              ></i>
              {userDetails?.addresses?.length > 0 && (
                <i
                  className="pi pi-ellipsis-v p-2 rounded-full hover:cursor-pointer text-white absolute right-5 top-6"
                  style={{ backgroundColor: "#f97316" }}
                  onClick={() => handleModifyAddress("View")}
                ></i>
              )}
              <section className="leading-8">
                <div className="grid grid-cols-2 mt-3 items-center">
                  <span className="text-sm text-slate-400 ">Address</span>
                  <span className="truncate">
                    {userDetails.addresses.length > 0
                      ? `${userDetails?.addresses?.[0].flatNo},${userDetails?.addresses?.[0].street},${userDetails?.addresses?.[0].area}`
                      : "-"}
                  </span>
                </div>
                <div className="grid grid-cols-2 mt-1 items-center">
                  <span className="text-sm text-slate-400">City</span>
                  <span>
                    {userDetails.addresses.length > 0
                      ? `${userDetails?.addresses?.[0].city}`
                      : "-"}
                  </span>
                </div>
                <div className="grid grid-cols-2 mt-1 items-center">
                  <span className="text-sm text-slate-400">Country</span>
                  <span>India</span>
                </div>
                <div className="grid grid-cols-2 mt-1 items-center">
                  <span className="text-sm text-slate-400">Zip code</span>
                  <span>
                    {userDetails.addresses.length > 0
                      ? `${userDetails?.addresses?.[0].pincode}`
                      : "-"}
                  </span>
                </div>
              </section>
            </div>
          </article>
        </section>
      </div>

      {/* view address Dialog Box */}
      {addressList && (
        <Dialog
          header={`User Address`}
          visible={addressList}
          style={{
            maxWidth: "40rem",
            width: "90%",
            maxHeight: "80vh",
            overflowY: "scroll",
          }}
          onHide={() => {
            if (!addressList) return;
            setAddressList(false);
          }}
        >
          {userDetails?.addresses?.map((el) => (
            <div style={{ overflow: "scroll", padding: "10px" }}>
              <div key={el.id} className="w-10/12 p-5 glassmorphism mt-4">
                <div className="flex justify-end gap-5 mb-4">
                  <i
                    className="pi pi-trash cursor-pointer hover:text-red"
                    onClick={() => handleDeleteAddress(el)}
                  ></i>
                  <i
                    className="pi pi-pencil cursor-pointer hover:text-green"
                    onClick={() => handleModifyAddress("Edit", el)}
                  ></i>
                </div>
                <p>{`FlatNo:${el.flatNo},${el.street},${el.area}`}</p>
                <p>{`${el.city}-${el.pincode}`}</p>
              </div>
            </div>
          ))}
        </Dialog>
      )}

      {/* address Edit/Add dialog box */}
      <Dialog
        header={`${action} Address`}
        visible={visible}
        style={{ maxWidth: "40rem", width: "90%" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="float-label mt-5">
          <input
            type="text"
            className="input-field border-2 border-orange-500 p-3 rounded w-full"
            name="flatNo"
            placeholder=""
            value={address.flatNo}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label className="float-label-text">flatNo</label>
        </div>
        <div className="float-label mt-5">
          <input
            type="text"
            className="input-field border-2 border-orange-500 p-3 rounded w-full"
            name="street"
            placeholder=""
            value={address.street}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label className="float-label-text">Street</label>
        </div>
        <div className="float-label mt-5">
          <input
            type="text"
            className="input-field border-2 border-orange-500 p-3 rounded w-full"
            name="area"
            placeholder=""
            value={address.area}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label className="float-label-text">Area</label>
        </div>
        <div className="float-label mt-5">
          <input
            type="text"
            className="input-field border-2 border-orange-500 p-3 rounded w-full"
            name="city"
            placeholder=""
            value={address.city}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label className="float-label-text">City</label>
        </div>
        <div className="float-label mt-5">
          <input
            type="text"
            className="input-field border-2 border-orange-500 p-3 rounded w-full"
            name="pincode"
            placeholder=""
            value={address.pincode}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label className="float-label-text">Pincode</label>
        </div>
        <div className="flex justify-end gap-3 mt-2">
          <button
            className="p-2 rounded bg-orange-500 text-white"
            onClick={
              action === "Add"
                ? () => handleAddAddress()
                : () => {
                    handleEditAddress();
                  }
            }
          >
            Save
          </button>
          <button
            className="p-2 rounded bg-orange-500 text-white"
            onClick={() =>
              setAddress({
                flatNo: "",
                street: "",
                area: "",
                city: "",
                pincode: "",
                state: "TN",
              })
            }
          >
            Discard
          </button>
        </div>
      </Dialog>
    </main>
  );
};

export default Profile;
