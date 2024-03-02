import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../../constant";

interface Query {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  location?: string;
}

export const useGetQuery = () => {
  const query = useQuery({
    queryKey: ["get-query"],
    queryFn: async () => {
      const { data } = await axios.get(`${baseUrl}/query`);

      return data as {
        query: Query[];
      };
    },
  });
  return { ...query, queries: query.data };
};

export const useGetQueryById = (body: object) => {
  const query = useQuery({
    queryKey: ["get-query-by-id"],
    queryFn: async () => {
      const data = (await axios.post(`${baseUrl}/query/id`, body)).data;

      return data as { query: Query };
    },
  });

  return { ...query, query: query.data };
};

export const useAddQuery = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["adding-query"],
    mutationFn: async (body: Object) => {
      toast.loading("adding query", { id: "adding-query" });

      const { data } = await axios.post(`${baseUrl}/query/add`, body);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-query"] });
      toast.success("added successfully", { id: "adding-query" });
    },
    onError: (error) => {
      // @ts-ignore
      const message = error.response.data.message;
      toast.error(message ? message : "error", { id: "adding-query" });
    },
  });
  return { mutation, query: mutation.data };
};

export const useDeleteQuery = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["deleted-query"],
    mutationFn: async ({ id }: { id: string }) => {
      toast.loading("deleting query", { id: "deleting-query" });
      const data = (
        await axios.delete(`${baseUrl}/query/delete`, {
          data: { id },
        })
      ).data;
      return data;
    },
    onSuccess: () => {
      toast.success("deleted successfully", { id: "deleting-query" });
      queryClient.invalidateQueries({ queryKey: ["get-query"] });
    },
    onError: () => {
      toast.error("Error", { id: "deleting-query" });
    },
  });
  return { ...mutation, data: mutation.data };
};
