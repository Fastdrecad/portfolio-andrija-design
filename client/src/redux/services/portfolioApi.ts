import { PortfolioItem } from "@/types/portfolioTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),

  tagTypes: ["Portfolio"],
  endpoints: (builder) => ({
    // Get all projects
    getProjects: builder.query<PortfolioItem[], void>({
      query: () => "portfolio",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Portfolio" as const,
                id: _id
              })),
              { type: "Portfolio", id: "LIST" }
            ]
          : [{ type: "Portfolio", id: "LIST" }]
    }),

    // Get single project by ID
    getProjectById: builder.query<PortfolioItem, string>({
      query: (id) => `portfolio/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Portfolio", id }]
    }),

    // Add new project
    addProject: builder.mutation<PortfolioItem, Partial<PortfolioItem>>({
      query: (body) => ({
        url: "portfolio",
        method: "POST",
        body
      }),
      invalidatesTags: [{ type: "Portfolio", id: "LIST" }]
    }),

    // Update existing project
    updateProject: builder.mutation<
      PortfolioItem,
      { id: string } & Partial<PortfolioItem>
    >({
      query: ({ id, ...patch }) => ({
        url: `portfolio/${id}`,
        method: "PUT",
        body: patch
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Portfolio", id },
        { type: "Portfolio", id: "LIST" }
      ]
    }),

    // Delete project
    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `portfolio/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Portfolio", id },
        { type: "Portfolio", id: "LIST" }
      ]
    })
  })
});

// Export hooks for usage in components
export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation
} = portfolioApi;
