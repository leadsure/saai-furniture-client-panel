import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useGetClient, useGetSubClient } from "../hooks";
import { useRecoilValue } from "recoil";
import { isClient } from "../store";

export const LoginProtection: React.FC<{ component: ReactNode }> = ({
  component,
}) => {
  const { client } = useGetClient();
  const { subClient } = useGetSubClient();
  const is_Client = useRecoilValue(isClient);
  if (client || subClient || is_Client) return <Navigate to={"/"} />;
  return <div>{component}</div>;
};
