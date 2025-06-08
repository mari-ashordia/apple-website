export const createPaginationSlice = (set) => ({
    currentPage: 1,
    productsPerPage: 12,

    setCurrentPage: (page) => set({currentPage: page})
})