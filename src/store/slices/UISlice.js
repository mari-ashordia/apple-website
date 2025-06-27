export const createUISlice = (set) => ({
    isBurgerMenuOpen: false,
    isFilterMenuOpen: {model: false, storage: false, color: false},
    isSearchBarOpen: false,
    isFilterModalOpen: false,
    isSortModalOpen: false,

    openBurgerMenu: () => set({isBurgerMenuOpen: true}),
    closeBurgerMenu: () => set({isBurgerMenuOpen: false}),
    toggleBurgerMenu: () => set((state) => ({isBurgerMenuOpen: !state.isBurgerMenuOpen})),
    setIsFilterMenuOpen: (filterKey) => set(state =>({isFilterMenuOpen: {...state.isFilterMenuOpen, [filterKey]: !state.isFilterMenuOpen[filterKey]}})),
    openSearchBar: () => set({isSearchBarOpen: true}),
    closeSearchBar: () => set({isSearchBarOpen: false}),
    openFilterModal: () => set({isFilterModalOpen: true}),
    closeFilterModal: () => set({isFilterModalOpen: false}),

    openSortModal: () => set({isSortModalOpen: true}),
    closeSortModal: () => set({isSortModalOpen: false}),
    toggleSortModal: () => set(state => ({isSortModalOpen: !state.isSortModalOpen})),
    toggleFilterModal: () => set(state => ({isFilterModalOpen: !state.isFilterModalOpen})),
})
