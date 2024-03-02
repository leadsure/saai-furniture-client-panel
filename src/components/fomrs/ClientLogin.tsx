"use client";
import { useClientLogin, useSubClientLogin } from "../../hooks";
import { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import { pushToCheckbox, selectOnlyCheckBox } from "../../helpers";
import { useSetRecoilState } from "recoil";
import { isClient } from "../../store";

// input style
const inputStyle = `w-[90%] h-[55px] bg-transparent outline-none text-white text-[20px] border border-[#ffffff88] rounded-lg placeholder:text-white placeholder:text-[20px] p-[10px] `;

interface ClientLoginForm {
  location?: string;
}

export const ClientLoginForm: React.FC<ClientLoginForm> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );
  const [userType, setUserType] = useState<"client" | "sub-client">();

  const queryBody = {
    email,
    password,
  };

  // checkbox refs
  const checkbox = useRef<HTMLInputElement[]>([]);

  const { clientLoginQuery, client } = useClientLogin(queryBody);
  const { subClientLoginQuery, subClient } = useSubClientLogin(queryBody);
  const setIsClient = useSetRecoilState(isClient);
  useEffect(() => {
    if (client || subClient) {
      userType === "client"
        ? toast.success("Success", { id: "client-login" })
        : toast.success("Success", { id: "sub-client-login" });
      setIsClient(true);
    }
    if (clientLoginQuery.isError || subClientLoginQuery.isError) {
      userType === "client"
        ? toast.error("Error", { id: "client-login" })
        : toast.error("Error", { id: "sub-client-login" });
    }
  }, [
    client,
    clientLoginQuery.isError,
    subClient,
    subClientLoginQuery.isError,
  ]);

  return (
    <div className=" w-[350px] h-[350px] mobile:w-[500px] mobile:h-[400px] bg-[#999999] rounded-lg overflow-scroll">
      <div className="w-[100%] h-[100%] flex flex-col items-center">
        <h1 className="text-white text-[25px] font-[500] mt-[20px]">Log In</h1>
        <div className="w-[100%]  flex flex-col items-center mt-[50px] gap-[30px]">
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
              if (userType === "client") {
                clientLoginQuery.refetch();
              }
              if (userType === "sub-client") {
                subClientLoginQuery.refetch();
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
