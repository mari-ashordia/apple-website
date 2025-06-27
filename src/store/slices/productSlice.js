import axios from "axios"
import { getInitialColors } from "../../utils/getInitialColors";
import { getInitialStorages } from "../../utils/getInitialStorages";

export const createProductSlice = (set, get) => ({
    products: [],
    selectedProduct: null,
    searchedProducts: [],
    priceRange: [0, 0],
    sortedProducts: [],
    filteredProducts: [],
    filteredProductsByFeatures: [],
    isFilterChecked: false,
    loading: false,
    error: null,
    color: "Black",
    storage: null,
    uniqueColors: [],
    uniqueStorages: [],
    colorCheck: {},
    storageCheck: {},
    modelArr: [],
    selectedFeatures: [],

    setProducts: async (endpoint) => {
        set({loading: true}),
        axios.get(`https://68236aec65ba05803396ac38.mockapi.io/api/data/${endpoint}`)
        .then(({data}) => {
            set({products: data, loading: false, priceRange: [0, data.reduce((max, {price}) => price > max ? price : max, 0)]});
            setInitialChecks();
            })
        .catch(error => set({loading: false, error}))
    },
    setSelectedProduct: (product) => set({selectedProduct: product}),
    setSearchedProducts: (searchValue) => {
        get().products.filter(item => {
        const lowerCaseName = item.name.toLowerCase();
        return searchValue !== "" && lowerCaseName.includes(searchValue.toLowerCase());
    });
    },
    setSearchValue: (searchValue) => set({searchValue}),
    setSortedProducts: (sortedProducts) => set({sortedProducts}),
    setPriceRange: (range) => set({priceRange: range}),
    setFilteredProducts: (products) => set({filteredProducts: products.filter(product => {
        if(product.price >= get().priceRange[0] && product.price <= get().priceRange[1]) return product;
        })}),
    setFilteredProductsByFeatures: (products) => set({filteredProductsByFeatures: products}),
    setIsFilterChecked: (value) => set({isFilterChecked: value}),
    setLoading: (loading) => set({loading}),
    setError: (error) => set({error}),
    setColor: (color) => set({color}),
    setStorage: (storage) => set({storage}),
    setUniqueColorsOrStorages: (products, value) => {
        const uniqueValues = new Set();
        products.forEach(product => {
        product[value].forEach(item => {
        uniqueValues.add(item);
        });
    });

    value === "colors" ? set({uniqueColors: Array.from(uniqueValues)}) : value === 'storageOptions' && set({uniqueStorages: Array.from(uniqueValues)});
    },
    setInitialChecks: () => {
        const products = get().products;
        if(!products || products.length === 0) return;

        set({
            colorCheck: getInitialColors(products),
            storageCheck: getInitialStorages(products)
        });
    },
    setColorCheck: (color, e) => set(state => ({colorCheck: {...state.colorCheck, [color]: e.target.checked}})),
    setStorageCheck: (storage, e) => set(state => ({storageCheck: {...state.storageCheck, [storage]: e.target.checked}})),
    setModelArr: (productModels, name) => set({modelArr: productModels.filter(model => model.startsWith(name))}),
    toggleSelectedFeatures: (feature) => set(state => ({selectedFeatures: [...state.selectedFeatures, feature]})),
    // removeChecks: (color, storage) => set(state => ({colorCheck: {...state.colorCheck, [color]: false}, storageCheck: {...state.storageCheck, [storage]: false}})),
    // removeChecks: () => set({colorCheck: {}, storageCheck: {}})
})