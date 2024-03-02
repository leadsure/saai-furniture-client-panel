import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../../constant";

interface blog {
  title1: string;
  title2: string;
  title3: string;
  title4: string;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  imageUrl: string;
  links: string;
  linksUrl: string;
}

export const useGetBlog = () => {
  const query = useQuery({
    queryKey: ["get-blog"],
    queryFn: async () => {
      const { data } = await axios.get(`${baseUrl}/blog`);

      return data as {
        blog: blog[];
      };
    },
  });
  return { ...query, blogs: query.data };
};

export const useGetBlogById = (body: object) => {
  const query = useQuery({
    queryKey: ["get-blog-by-id"],
    queryFn: async () => {
      const data = (await axios.post(`${baseUrl}/blog/id`, body)).data;

      return data as { blog: blog };
    },
  });

  return { ...query, blog: query.data };
};

export const useAddBlog = (resetBlogState: any) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["adding-blog"],
    mutationFn: async ({
      body,
      userType,
    }: {
      body: Object;
      userType: string;
    }) => {
      let token;
      if (userType === "client") {
        token = localStorage.getItem("saai-client-token");
      } else {
        token = localStorage.getItem("saai-sub-client-token");
      }
      toast.loading("adding blog", { id: "adding-blog" });

      const { data } = await axios.post(
        `${baseUrl}/blog/${userType}/add`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-blog"] });
      toast.success("added successfully", { id: "adding-blog" });
      resetBlogState();
    },
    onError: (error) => {
      // @ts-ignore
      const message = error.response.data.message;
      toast.error(message ? message : "error", { id: "adding-blog" });
    },
  });
  return { addBlogMutation: mutation, blog: mutation.data };
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["deleted-blog"],
    mutationFn: async ({ id, userType }: { id: string; userType: string }) => {
      toast.loading("deleting blog", { id: "deleting-blog" });
      const data = (
        await axios.delete(`${baseUrl}/blog/${userType}/delete`, {
          data: { id },
          headers: {
            Authorization: `Bearer token`,
          },
        })
      ).data;
      return data;
    },
    onSuccess: () => {
      toast.success("deleted successfully", { id: "deleting-blog" });
      queryClient.invalidateQueries({ queryKey: ["get-blog"] });
    },
    onError: () => {
      toast.error("Error", { id: "deleting-blog" });
    },
  });
  return { ...mutation, data: mutation.data };
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-blog"],
    mutationFn: async ({
      id,
      body,
      userType,
    }: {
      id: string;
      body: object;
      userType: string;
    }) => {
      let token;
      if (userType === "client") {
        token = localStorage.getItem("saai-client-token");
      } else {
        token = localStorage.getItem("saai-sub-client-token");
      }
      toast.loading("updating project", { id: "update-blog" });
      const data = (
        await axios.put(
          `${baseUrl}/blog/${userType}/update`,
          {
            id,
            ...body,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      ).data;

      return data;
    },
    onSuccess: () => {
      toast.success("successfull", { id: "update-blog" });
      queryClient.invalidateQueries({ queryKey: ["get-blog"] });
    },
    onError: () => {
      toast.error("error", { id: "update-blog" });
    },
  });

  return { mutation };
};
