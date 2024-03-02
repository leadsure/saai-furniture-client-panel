import { useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isClient } from "../store";

export const DashboardDropDown = () => {
  const [open, setOpen] = useState(false);
  const dashboardDropDown = useRef<HTMLDivElement | null>(null);
  const setIsClient = useSetRecoilState(isClient);

  return (
    <div
      onMouseEnter={() => {
        setOpen(true);
      }}
      onMouseLeave={() => {
        setOpen(false);
      }}
      className="relative"
    >
      <div className="flex items-center gap-[10px] font-[600] text-[20px] cursor-pointer">
        <span>Dashboard</span>
        {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      <div
        ref={dashboardDropDown}
        className={`absolute top-[30px] w-[250px]  bg-[rgba(0,0,0,0.7)] transition-all duration-300  origin-top translate-x-[-60px] rounded-lg p-[5px] pr-[10px] pl-[10px] ${
          open ? "" : "scale-y-0"
        }`}
      >
        <ul className="flex flex-col text-white">
          <Link to={"/dashboard/add-admin"}>
            <li className=" hover:bg-[rgba(0,0,0,0.6)] text-[18px] box-content p-[5px] pl-[10px] pr-[10px] rounded-md cursor-pointer">
              Add Admin
            </li>
          </Link>

          <Link to={"/dashboard/add-blog"}>
            <li className=" hover:bg-[rgba(0,0,0,0.6)] text-[18px] box-content p-[5px] pl-[10px] pr-[10px] rounded-md cursor-pointer">
              Add Blog
            </li>
          </Link>

          <li
            onClick={() => {
              localStorage.removeItem("saai-client-token");
              localStorage.removeItem("saai-sub-client-token");
              setIsClient(false);
              location.reload();
            }}
            className="text-[#E91E62] hover:text-[#ff679a] hover:bg-[rgba(0,0,0,0.6)] text-[18px] box-content p-[5px] pl-[10px] pr-[10px] rounded-md cursor-pointer"
          >
            Log out
          </li>
        </ul>
      </div>
    </div>
  );
};
