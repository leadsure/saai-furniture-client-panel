"use client";

import { useEffect, useState } from "react";
import {
  useAddBlog,
  useGetClient,
  useGetSubClient,
  useUploadToAws,
} from "../../hooks";
import { handleImgInput } from "../../helpers";
import { TbPhoto } from "react-icons/tb";
import toast from "react-hot-toast";

// input style
const inputStyle = `w-[90%] h-[55px] bg-transparent outline-none text-white text-[20px] border border-[#ffffff88] rounded-lg placeholder:text-white placeholder:text-[20px] p-[10px]`;

export const AddBlog = () => {
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const [title3, setTitle3] = useState("");
  const [title4, setTitle4] = useState("");
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");
  const [description3, setDescription3] = useState("");
  const [description4, setDescription4] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [links, setLinks] = useState("");
  const [linksUrl, setLinksUrl] = useState("");
  const [userType, setUserType] = useState<"client" | "sub-client">();

  function resetBlogState() {
    setTitle1("");
    setTitle2("");
    setTitle3("");
    setTitle4("");
    setDescription1("");
    setDescription2("");
    setDescription3("");
    setDescription4("");
    setImageUrl("");
    setLinks("");
    setLinksUrl("");
  }

  const queryBody = {
    body: {
      title1,
      title2,
      title3,
      title4,
      description1,
      description2,
      description3,
      description4,
      links,
      linksUrl,
      imageUrl,
    },
    userType: userType!,
  };

  const { client } = useGetClient();
  const { subClient } = useGetSubClient();
  const { awsMutations } = useUploadToAws(setImageUrl, userType);
  const { addBlogMutation } = useAddBlog(resetBlogState);

  useEffect(() => {
    if (client) {
      setUserType("client");
    }
    if (subClient) {
      setUserType("sub-client");
    }
  }, [client, subClient]);
  return (
    <div className=" w-[350px] mobile:w-[800px] min-h-[600px]  bg-[#999999] rounded-lg overflow-scroll mt-[150px] box-content p-[10px] ">
      <div className="w-[100%] h-[100%] flex flex-col items-center box-content pt-[10px] pb-[10px]">
        <h1 className="text-white text-[25px] font-[500] mt-[20px]">
          Add Blog
        </h1>
        {imageUrl !== "" && (
          <img
            src={imageUrl}
            alt="uploaded"
            className="mt-[20px] w-[150px] h-[150px]"
          />
        )}
        <div className="w-[100%]  flex flex-col items-center mt-[30px] gap-[30px]">
          <div className="w-[90%] flex justify-between flex-wrap gap-[5px]">
            <input
              className="w-[48%]  bg-transparent outline-none text-white text-[20px] border border-[#ffffff88] rounded-lg placeholder:text-white placeholder:text-[20px] p-[10px]"
              placeholder="Title one"
              value={title1}
              onChange={(e) => {
                setTitle1(e.target.value);
              }}
            />
            <input
              className="w-[48%]  bg-transparent outline-none text-white text-[20px] border border-[#ffffff88] rounded-lg placeholder:text-white placeholder:text-[20px] p-[10px]"
              placeholder="Title two"
              value={title2}
              onChange={(e) => {
                setTitle2(e.target.value);
              }}
            />
            <input
              className="w-[48%]  bg-transparent outline-none text-white text-[20px] border border-[#ffffff88] rounded-lg placeholder:text-white placeholder:text-[20px] p-[10px]"
              placeholder="Title three"
              value={title3}
              onChange={(e) => {
                setTitle3(e.target.value);
              }}
            />
            <input
              className="w-[48%]  bg-transparent outline-none text-white text-[20px] border border-[#ffffff88] rounded-lg placeholder:text-white placeholder:text-[20px] p-[10px]"
              placeholder="Title four"
              value={title4}
              onChange={(e) => {
                setTitle4(e.target.value);
              }}
            />
          </div>
          <div className="w-[90%] flex justify-between flex-wrap gap-[5px]">
            <textarea
              className="w-[48%]  bg-transparent outline-none text-white text-[20px] border border-[#ffffff88] rounded-lg placeholder:text-white placeholder:text-[20px] p-[10px]"
              placeholder="Description one"
              value={description1}
              onChange={(e) => {
                setDescription1(e.target.value);
              }}
            ></textarea>
            <textarea
              className="w-[48%]  bg-transparent outline-none text-white text-[20px] border border-[#ffffff88] rounded-lg placeholder:text-white placeholder:text-[20px] p-[10px]"
              placeholder="Description two"
              value={description2}
              onChange={(e) => {
                setDescription2(e.target.value);
              }}
            ></textarea>
            <textarea
              className="w-[48%]  bg-transparent outline-none text-white text-[20px] border border-[#ffffff88] rounded-lg placeholder:text-white placeholder:text-[20px] p-[10px]"
              placeholder="Description three"
              value={description3}
              onChange={(e) => {
                setDescription3(e.target.value);
              }}
            ></textarea>
            <textarea
              className="w-[48%]  bg-transparent outline-none text-white text-[20px] border border-[#ffffff88] rounded-lg placeholder:text-white placeholder:text-[20px] p-[10px]"
              placeholder="Description"
              value={description4}
              onChange={(e) => {
                setDescription4(e.target.value);
              }}
            ></textarea>
          </div>
          <input
            type="text"
            placeholder="Links"
            value={links}
            onChange={(e) => {
              setLinks(e.target.value);
            }}
            className={inputStyle}
          />
          <input
            type="text"
            placeholder="Link url"
            value={linksUrl}
            onChange={(e) => {
              setLinksUrl(e.target.value);
            }}
            className={inputStyle}
          />
          <div className="w-[90%]">
            <button
              onClick={() => {
                handleImgInput(awsMutations.mutate);
              }}
            >
              <TbPhoto className="w-[30px] h-[30px] text-white hover:text-slate-800" />
            </button>
          </div>

          {/* image input */}
        </div>
        <div className="w-[100%] flex flex-col justify-center items-center mt-[20px] gap-[10px]">
          <button
            className="w-[90%] flex justify-center items-center text-white font-[500] bg-[#2F94C4] hover:bg-[#60b8e0] p-[10px] pl-[15px] pr-[15px] rounded-lg"
            onClick={() => {
              if (title1 === "") {
                return toast.error("title cannot be empty");
              }
              addBlogMutation.mutate(queryBody);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
