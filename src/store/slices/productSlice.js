import axios from "axios"
import { filterHelper } from "../../utils/filterHelper";

export const createProductSlice = (set, get) => ({
    products: [],
    selectedProduct: null,
    searchedProducts: [],
    priceRange: [0, 0],
    sortedProducts: [],
    filteredProducts: [],
    priveRangeChange: false,
    // filteredProductsByFeatures: [],
    isFilterChecked: false,
    loading: false,
    error: null,
    color: "Black",
    storage: null,
    uniqueColors: [],
    uniqueStorages: [],
    modelCheck: [],
    colorCheck: [],
    storageCheck: [],
    modelArr: [],
    // selectedFeatures: [],

    setProducts: async (endpoint) => {
        set({loading: true}),
        axios.get(`https://68236aec65ba05803396ac38.mockapi.io/api/data/${endpoint}`)
        .then(({data}) => {
            set({products: data, filteredProducts: data, loading: false, priceRange: [0, data.reduce((max, {price}) => price > max ? price : max, 0)]});
            // setInitialChecks();
            })
        .catch(error => set({loading: false, error}))
    },
    setSelectedProduct: (product) => set({selectedProduct: product}),
    setSearchedProducts: (searchValue) => {
        set(state => ({searchedProducts: state.products.filter(item => {
        const lowerCaseName = item.name.toLowerCase();
        return searchValue !== "" && lowerCaseName.includes(searchValue.toLowerCase());
    })}))},
    clearSearchedProducts: () => set({searchedProducts: []}),
    setSearchValue: (searchValue) => set({searchValue}),
    setSortedProducts: (sortedProducts) => set({sortedProducts}),
    setPriceRange: (range) => set({priceRange: range}),
    //  lteredProducts: (products) => set({filteredProducts: products.filter(product => {
    //     if(product.price >= get().priceRange[0] && product.price <= get().priceRange[1]) return product;
    //     })}),


    setFilteredProducts: (products) => set({filteredProducts: products}),
        // if(get().isFilterChecked) set(state => ({filteredProducts: state.filteredProducts.filter(product => {
        //     if(product.price >= get().priceRange[0] && product.price <= get().priceRange[1]) return product;
        //     })}));
        // if(get().modelCheck.length > 0) set(state => ({filteredProducts: state.products.filter(product => get().modelCheck.some(model => 
        //     product.name.toLowerCase().includes(model.toLowerCase())
        // ))}));
        // if(get().storageCheck.length > 0) set(state => ({filteredProducts: state.products.filter(product => get().storageCheck.some(storage => 
        //     product.name.toLowerCase().includes(storage.toLowerCase())
        // ))}));
        // if(get().colorCheck.length > 0) set(state => ({filteredProducts: state.products.filter(product => get().colorCheck.some(color => 
        //     product.name.toLowerCase().includes(color.toLowerCase())
        // ))}));
        // if(get().modelCheck.length === 0 && get().storageCheck.length === 0 && get().colorCheck.length === 0){
        //     set(state => ({filteredProducts: state.products}));
        // };

        // console.log("modelsss: ",get().products);

    
    // },
    setModelCheck: (model) => {
        !get().modelCheck.includes(model) ? set(state => ({modelCheck: [...state.modelCheck, model]})) : 
                                        set(state => ({modelCheck: state.modelCheck.filter(item => item !== model)}));

    },
    setColorCheck: (color) => {
        !get().colorCheck.includes(color) ? set(state => ({colorCheck: [...state.colorCheck, color]})) : 
                                            set(state => ({colorCheck: state.colorCheck.filter(item => item !== color)}))
    },
    setStorageCheck: (storage) => {
        !get().storageCheck.includes(storage) ? set(state => ({storageCheck: [...state.storageCheck, storage]})) : 
                                            set(state => ({storageCheck: state.storageCheck.filter(item => item !== storage)}))
    },
    setModelArr: (productModels, name) => set({modelArr: productModels.filter(model => model.startsWith(name))}),
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
    // setInitialChecks: () => {
    //     const products = get().products;
    //     if(!products || products.length === 0) return;

    //     set({
    //         colorCheck: getInitialColors(products),
    //         storageCheck: getInitialStorages(products)
    //     });
    // },
    // setModelCheck: (model, e) => set(state => ({modelCheck: {...state.modelCheck, [model]: e.target.checked}})),

    // toggleSelectedFeatures: (feature) => {
    //     get().selectedFeatures.includes(feature) ? set(state => ({selectedFeatures: state.selectedFeatures.filter(item => item !== feature)})) :
    //         set(state => ({selectedFeatures: [...state.selectedFeatures, feature]}))
    // },
    // clearSelectedFeatures: () => set({selectedFeatures: []}),
    removeChecks: () => set({modelCheck: [], storageCheck: [], colorCheck: []})
})