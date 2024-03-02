import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useGetClient, useGetSubClient } from "../hooks";
import { useRecoilValue } from "recoil";
import { isClient } from "../store";

export const Protected: React.FC<{ component: ReactNode }> = ({
  component,
}) => {
  const { client } = useGetClient();
  const { subClient } = useGetSubClient();
  const is_client = useRecoilValue(isClient);
  if (client || subClient || is_client) return <div>{component}</div>;
  return <Navigate to={"/login"} />;
};
