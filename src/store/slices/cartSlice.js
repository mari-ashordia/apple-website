export const createCartSlice = (set, get) => ({
    cart: [],
    isCartOpen: false,

    addToCart: (product) => {
        const exists = get().cart.find((item) => item.id === product.id);
        console.log(exists);
        if(exists) {
            set({cart: get().cart.map((item) => {
                return product.id !== item.id ? item : {...item, quantity: item.quantity + 1}
            })});
        }
        else {
            set({cart: [...get().cart, {...product, quantity: 1}]});
        }
    },
    removeFromCart: (id) => {
        const productToRemove = get().cart.find((item) => item.id === id);
        if(productToRemove.quantity > 1) 
            set({cart: get().cart.map((item) => item.id !== id ? item : {...item, quantity: item.quantity - 1})});
        else
            set({cart: get().cart.filter((item) => item.id !== id)});
    },
    clearCart: () => set({cart: []}),

    // cart modal methods
    openCart: () => set({isCartOpen: true}),
    closeCart: () => set({isCartOpen: false}),
    toggleCart: () => set((state) => ({isCartOpen: !state.isCartOpen, isBurgerMenuOpen: false}))
});