export const createUISlice = (set) => ({
    isBurgerMenuOpen: false,

    openBurgerMenu: () => set({isBurgerMenuOpen: true}),
    closeBurgerMenu: () => set({isBurgerMenuOpen: false}),
    toggleBurgerMenu: () => set((state) => ({isBurgerMenuOpen: !state.isBurgerMenuOpen}))
})