import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UploadResponse {
  url: string;
  public_id: string;
}

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData
      })
    })
  })
});

export const { useUploadImageMutation } = uploadApi;
