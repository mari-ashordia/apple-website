import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createCartSlice } from "./slices/cartSlice";

export const useLocalStore = create(persist((set, get) =>({
    ...createCartSlice(set, get),
}),
{
    name: "local_storage",
    storage: localStorage
}));