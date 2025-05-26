import { create } from "zustand";
import { createProductSlice } from "./slices/productSlice";
import { createCartSlice } from "./slices/cartSlice";
import { createUISlice } from "./slices/UISlice";
import { persist } from 'zustand/middleware';

export const useStore = create(persist((set,get) => ({
    ...createProductSlice(set,get),
    ...createCartSlice(set, get),
    ...createUISlice(set,get)
})));