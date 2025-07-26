import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    tagTypes: ["books","borrow"],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "/books",
            providesTags: ["books"],
        }),
        createBook: builder.mutation({
            query: (bookData) => ({
              url: "/books",
              method: "POST",
              body: bookData,
            }),
            invalidatesTags: ["books"],
            
        }),
        deleteBook: builder.mutation({
        query: (id) => ({
           url: `/books/${id}`,
           method: "DELETE",
        }),
        invalidatesTags: ["books"], // Refresh book list after delete
       }),
       updateBook: builder.mutation({
       query: ({ id, data }) => ({
       url: `/books/${id}`,
       method: "PUT", // or PUT
       body: data,
       }),
       invalidatesTags: ["books"],
    }),
    getBorrowedBooks: builder.query({
            query: () => "/borrow",
            providesTags: ["borrow"],
        }),
        borrowBook: builder.mutation({
            query: (borrowData) => ({
              url: "/borrow",
              method: "POST",
              body: borrowData,
            }),
            invalidatesTags: ["borrow"],
            
        }),
}),
});

export const {useGetBooksQuery,useCreateBookMutation,useDeleteBookMutation,useUpdateBookMutation,useGetBorrowedBooksQuery,useBorrowBookMutation} = baseApi;