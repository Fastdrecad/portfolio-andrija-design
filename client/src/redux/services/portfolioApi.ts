import { PortfolioItemProps } from "@/types/portfolioTypes";
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
    getProjects: builder.query<PortfolioItemProps[], void>({
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
    getProjectById: builder.query<PortfolioItemProps, string>({
      query: (id) => `portfolio/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Portfolio", id }]
    }),

    // Get project by slug
    getProjectBySlug: builder.query<PortfolioItemProps, string>({
      query: (slug) => `portfolio/${slug}`,
      providesTags: (_result, _error, slug) => [{ type: "Portfolio", id: slug }]
    }),

    // Add new project
    addProject: builder.mutation<
      PortfolioItemProps,
      Partial<PortfolioItemProps>
    >({
      query: (body) => ({
        url: "portfolio",
        method: "POST",
        body
      }),
      invalidatesTags: [{ type: "Portfolio", id: "LIST" }]
    }),

    // Update existing project
    updateProject: builder.mutation<
      PortfolioItemProps,
      { id: string } & Partial<PortfolioItemProps>
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
    }),

    // Reorder projects
    reorderProjects: builder.mutation<
      PortfolioItemProps[],
      { sourceId: string; destinationId: string }
    >({
      query: (body) => ({
        url: "portfolio/reorder",
        method: "POST",
        body
      }),
      invalidatesTags: [{ type: "Portfolio", id: "LIST" }]
    }),

    // Initialize project orders
    initializeProjectOrder: builder.mutation<
      { message: string; count: number },
      void
    >({
      query: () => ({
        url: "portfolio/initialize-order",
        method: "POST"
      }),
      invalidatesTags: [{ type: "Portfolio", id: "LIST" }]
    })
  })
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectBySlugQuery,
  useReorderProjectsMutation,
  useInitializeProjectOrderMutation
} = portfolioApi;
