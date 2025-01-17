"use client";
import {
  pushToCheckbox,
  resetAddAdminForm,
  selectOnlyCheckBox,
} from "../../helpers";
import { useRef, useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useAddSubClient, useAddClient } from "../../hooks";
import toast from "react-hot-toast";

// input style
const inputStyle = `w-[90%] h-[55px] bg-transparent outline-none text-white text-[20px] border border-[#ffffff88] rounded-lg placeholder:text-white placeholder:text-[20px] p-[10px] `;

export const AddClient = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );
  const [confirmPasswordType, setConfirmPasswordType] = useState<
    "text" | "password"
  >("password");
  const [userType, setUserType] = useState<"client" | "sub-client">();

  // checkbox refs
  const checkbox = useRef<HTMLInputElement[]>([]);
  const queryBody = {
    name,
    email,
    password,
    confirmPassword,
  };

  const { addClientMutation } = useAddClient();
  const { AddSubClientMutation } = useAddSubClient();
  return (
    <div className=" w-[350px] mobile:w-[500px] h-[600px] bg-[#999999] rounded-lg overflow-scroll z-[10]">
      <div className="w-[100%] h-[100%] flex flex-col items-center">
        <h1 className="text-white text-[25px] font-[500] mt-[20px]">
          Add Admin
        </h1>
        <div className="w-[100%]  flex flex-col items-center mt-[50px] gap-[30px]">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className={inputStyle}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className={inputStyle}
          />
          <div className="w-[90%] relative flex items-center gap-[10px] border border-[#ffffff88] rounded-lg">
            <input
              type={passwordType}
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className={`${inputStyle}  border-none`}
            />
            {passwordType === "password" ? (
              <FaEye
                onClick={() => {
                  setPasswordType("text");
                }}
                className="absolute top-[50%] right-[10px] translate-y-[-50%] text-[25px] text-white hover:text-[#d1d0d0] text-wite cursor-pointer"
              />
            ) : (
              <FaEyeSlash
                onClick={() => {
                  setPasswordType("password");
                }}
                className="absolute top-[50%] right-[10px] translate-y-[-50%] text-[25px] text-white hover:text-[#d1d0d0] text-wite cursor-pointer"
              />
            )}
          </div>
          <div className="w-[90%] relative flex items-center gap-[10px] border border-[#ffffff88] rounded-lg">
            <input
              type={confirmPasswordType}
              placeholder="Confirm"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className={`${inputStyle}  border-none`}
            />
            {confirmPasswordType === "password" ? (
              <FaEye
                onClick={() => {
                  setConfirmPasswordType("text");
                }}
                className="absolute top-[50%] right-[10px] translate-y-[-50%] text-[25px] text-white hover:text-[#d1d0d0] text-wite cursor-pointer"
              />
            ) : (
              <FaEyeSlash
                onClick={() => {
                  setConfirmPasswordType("password");
                }}
                className="absolute top-[50%] right-[10px] translate-y-[-50%] text-[25px] text-white hover:text-[#d1d0d0] text-wite cursor-pointer"
              />
            )}
          </div>
          <div className="w-[90%] text-white flex items-center gap-[10px]">
            <label htmlFor="client" className="flex items-center gap-[5px]">
              <input
                ref={(e) => {
                  pushToCheckbox(e, checkbox);
                }}
                onClick={(e) => {
                  selectOnlyCheckBox(e.currentTarget, checkbox);
                  setUserType("client");
                }}
                type="checkbox"
                id="client"
              />
              <span>Admin</span>
            </label>
            <label htmlFor="sub-client" className="flex items-center gap-[5px]">
              <input
                ref={(e) => {
                  pushToCheckbox(e, checkbox);
                }}
                onClick={(e) => {
                  selectOnlyCheckBox(e.currentTarget, checkbox);
                  setUserType("sub-client");
                }}
                type="checkbox"
                id="sub-client"
              />
              <span>sub Admin</span>
            </label>
          </div>
        </div>
        <div className="w-[100%] flex flex-col justify-center items-center mt-[20px] gap-[10px]">
          <button
            className="w-[90%] flex justify-center items-center text-white font-[500] bg-[#2F94C4] hover:bg-[#60b8e0] p-[10px] pl-[15px] pr-[15px] rounded-lg"
            onClick={() => {
              if (password !== confirmPassword) {
                return toast.error("password and confirm password not equal");
              }
              if (userType === "client") {
                addClientMutation.mutate(queryBody);
              } else {
                AddSubClientMutation.mutate(queryBody);
              }

              resetAddAdminForm(
                setName,
                setEmail,
                setPassword,
                setConfirmPassword,
                setPasswordType,
                setConfirmPasswordType,
                setUserType
              );
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
