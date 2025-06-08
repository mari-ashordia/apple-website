import { create } from "zustand";
import { createProductSlice } from "./slices/productSlice";
import { createCartSlice } from "./slices/cartSlice";
import { createUISlice } from "./slices/UISlice";
import { persist } from 'zustand/middleware';
import { createPaginationSlice } from "./slices/paginationSlice";

export const useStore = create(persist((set,get) => ({
    ...createProductSlice(set,get),
    ...createCartSlice(set, get),
    ...createUISlice(set,get),
    ...createPaginationSlice(set)
}),
// {
//     name: 'Apple-storage',
//     partialize: (state) => ({
//         products: state.products,
//         selectedProduct: state.selectedProduct,
//         color: state.color,
//         storage: state.storage,
//     })
// }
));