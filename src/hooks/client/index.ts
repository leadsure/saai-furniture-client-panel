import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";
import { baseUrl } from "../../constant";

interface ClientProp {
  name: string;
  email: string;
  password: string;
}

export const useDefaultClient = () => {
  const query = useQuery({
    queryKey: ["default-login"],
    queryFn: async () => {
      const data = (await axios.get(`${baseUrl}/client/default`)).data;
      return data;
    },
  });

  return { ...query, client: query.data };
};

// admion login query
export const useClientLogin = (body: object) => {
  const query = useQuery({
    queryKey: ["client-login"],
    queryFn: async () => {
      toast.loading("login in", {
        id: "client-login",
      });
      const data = (await axios.post(`${baseUrl}/client/login`, body)).data;
      if (data && data.token) {
        localStorage.setItem("saai-client-token", data.token);
      }
      return data as {
        client: ClientProp;
      };
    },
    enabled: false,
  });

  return { clientLoginQuery: query, client: query.data?.client };
};

// get  admin if token is present
export const useGetClient = () => {
  const query = useQuery({
    queryKey: ["get-client"],
    queryFn: async () => {
      const token = localStorage.getItem("saai-client-token");
      const { data } = await axios.get(`${baseUrl}/client`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data as {
        client: ClientProp;
      };
    },
  });

  return { getClientQuery: query, client: query.data };
};

// add admin mutation
export const useAddClient = () => {
  const token = localStorage.getItem("saai-client-token");
  const mutation = useMutation({
    mutationKey: ["adding-admin"],
    mutationFn: async (body: object) => {
      toast.loading("Creating client", { id: "creating-client" });
      const data = await axios.post(`${baseUrl}/client/signup`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onError: (error: any) => {
      // @ts-ignore
      const message = error.response.data.message;
      toast.error(message ? message : "error", { id: "creating-client" });
    },
    onSuccess: () => {
      toast.success("successfully created", { id: "creating-client" });
    },
  });

  return { addClientMutation: mutation, client: mutation.data };
};
// add admin mutation
export const useUpdateClient = () => {
  const token = localStorage.getItem("saai-client-token");
  const mutation = useMutation({
    mutationKey: ["updating-client"],
    mutationFn: async (body: object) => {
      toast.loading("Updating profile", { id: "updating-client" });
      const data = await axios.post(`${baseUrl}/client/update`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onError: (error: any) => {
      // @ts-ignore
      const message = error.response.data.message;
      toast.error(message ? message : "error", { id: "updating-client" });
    },
    onSuccess: () => {
      toast.success("successfully updated", { id: "updating-client" });
    },
  });

  return { updateClientMutation: mutation, client: mutation.data };
};

export const useAddSubClient = () => {
  const mutation = useMutation({
    mutationKey: ["adding-client"],
    mutationFn: async (body: object) => {
      const token = localStorage.getItem("saai-client-token");
      toast.loading("Creating Sub Client", { id: "adding-sub-client" });
      const data = await axios.post(`${baseUrl}/client/add-sub-client`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onError: (error: any) => {
      // @ts-ignore
      const message = error.response.data.message;
      toast.error(message ? message : "error", { id: "adding-sub-client" });
    },
    onSuccess: () => {
      toast.success("successfully created", { id: "adding-sub-client" });
    },
  });

  return { AddSubClientMutation: mutation, client: mutation.data };
};
