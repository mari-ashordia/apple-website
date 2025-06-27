import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createUISlice } from "./slices/UISlice";
import { createPaginationSlice } from "./slices/paginationSlice";
import { createProductSlice } from "./slices/productSlice";

export const useSessionStore = create(persist((set, get) =>({
    ...createUISlice(set, get),
    ...createPaginationSlice(set, get),
    ...createProductSlice(set, get),

    _hasHydrated: false,
    setHasHydrated: () =>set({_hasHydrated: true})
}),
{
    name: "session_storage",
    onRehydrateStorage: () => (state) => state?.setHasHydrated(),
    // storage: sessionStorage, 
    getStorage: () =>sessionStorage,
    serialize: (state => JSON.stringify(state)),
    deserialize: (str) => JSON.parse(str),
    partialize: (state) => ({
        isBurgerMenuOpen: state.isBurgerMenuOpen,
        isFilterMenuOpen: state.isFilterMenuOpen,
        isSearchBarOpen: state.isSearchBarOpen,
        // currentPage: state.currentPage,
        priceRange: state.priceRange,
        filteredproducts: state.filteredproducts,
        isFilterChecked: state.isFilterChecked,
        color: state.color,
        storage: state.storage,
    })
}))