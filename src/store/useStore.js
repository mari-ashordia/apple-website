import { create } from "zustand";
import { createProductSlice } from "./slices/productSlice";
import { createCartSlice } from "./slices/cartSlice";
import { createUISlice } from "./slices/UISlice";

export const useStore = create((set,get) => ({
    ...createProductSlice(set,get),
    ...createCartSlice(set, get),
    ...createUISlice(set,get)
}));