import axios from "axios"

export const createProductSlice = (set, get) => ({
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
    
    setProducts: async () => {
        set({loading: true}),
        axios.get('https://68236aec65ba05803396ac38.mockapi.io/api/data/products')
        .then(({data}) => set({products: data, loading: false}))
        .catch(error => set({loading: false, error}))
    },
    setSelectedProduct: (product) => set({setSelectedProduct: product}),
    setLoading: (loading) => set({loading}),
    setError: (error) => set({error})
})