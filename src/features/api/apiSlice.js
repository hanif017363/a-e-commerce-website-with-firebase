import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),

  tagTypes: ["Products", "user"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      async queryFn() {
        try {
          const productCollectionRef = collection(db, "products");
          const data = await getDocs(productCollectionRef);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          return { data: filteredData };
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: ["Products"],
    }),
    getUser: builder.query({
      async queryFn() {
        try {
          const userCollectionRef = collection(db, "users");
          const data = await getDocs(userCollectionRef);
          const filteredUser = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          return { data: filteredUser };
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: ["user"],
    }),
    addProduct: builder.mutation({
      async queryFn(product) {
        try {
          await addDoc(collection(db, "products"), product);
          return { data: product };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      queryFn: async (id) => {
        try {
          const productDoc = doc(db, "products", id);
          await deleteDoc(productDoc);
          return { data: id };
        } catch (error) {
          console.log(error);
          return { error };
        }
      },
      invalidatesTags: ["Products"],
    }),
    deleteUser: builder.mutation({
      queryFn: async (id) => {
        try {
          const userdoc = doc(db, "users", id);
          await deleteDoc(userdoc);
          return { data: id };
        } catch (error) {
          console.log(error);
          return { error };
        }
      },
      providesTags: ["user"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useDeleteUserMutation,
  useGetAllProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = apiSlice;
