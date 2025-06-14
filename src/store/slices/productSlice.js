import axios from "axios"

export const createProductSlice = (set, get) => ({
    products: [],
    selectedProduct: null,
    // searchedProducts: [],
    // searchValue: null,
    loading: false,
    error: null,
    color: "Black",
    storage: null,

    setProducts: async () => {
        set({loading: true}),
        axios.get('https://68236aec65ba05803396ac38.mockapi.io/api/data/products')
        .then(({data}) => set({products: data, loading: false}))
        .catch(error => set({loading: false, error}))
    },
    setSelectedProduct: (product) => set({selectedProduct: product}),
    // setSearchedProducts: () => {
    //     const filteredProducts = get().products.filter(product => {
    //         const productLowerCase = product.name.toLowerCase();
    //         return productLowerCase.includes(get().searchValue);
    //     });
    //     set(({searchedProducts: [...filteredProducts]}));
    // },
    // setSearchValue: (searchValue) => set({searchValue}),
    setLoading: (loading) => set({loading}),
    setError: (error) => set({error}),
    setColor: (color) => set({color}),
    setStorage: (storage) => set({storage})
})