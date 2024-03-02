import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";
import { baseUrl } from "../../constant";

// admion login query
export const useSubClientLogin = (body: object) => {
  const query = useQuery({
    queryKey: ["sub-client-login"],
    queryFn: async () => {
      toast.loading("login in", {
        id: "sub-client-login",
      });
      const data = (await axios.post(`${baseUrl}/sub-client/login`, body)).data;
      if (data && data.token) {
        localStorage.setItem("saai-sub-client-token", data.token);
      }
      return data;
    },
    enabled: false,
  });

  return { subClientLoginQuery: query, subClient: query.data };
};

// get  admin if token is present
export const useGetSubClient = () => {
  const token = localStorage.getItem("saai-sub-client-token");
  const query = useQuery({
    queryKey: ["get-sub-client"],
    queryFn: async () => {
      const { data } = await axios.get(`${baseUrl}/sub-client`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
  });

  return { getSubClientQuery: query, subClient: query.data };
};

// update sub client mutation
export const useUpdateSubClient = () => {
  const token = localStorage.getItem("saai-sub-client-token");
  const mutation = useMutation({
    mutationKey: ["updating-sub-client"],
    mutationFn: async (body: object) => {
      toast.loading("updating client", { id: "updating-sub-client" });
      const data = await axios.post(`${baseUrl}/sub-client/update`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onError: (error: any) => {
      // @ts-ignore
      const message = error.response.data.message;
      toast.error(message ? message : "error", { id: "updating-sub-client" });
    },
    onSuccess: () => {
      toast.success("successfully updated", { id: "updating-sub-client" });
    },
  });

  return { ...mutation, client: mutation.data };
};
