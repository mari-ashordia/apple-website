export const filterHelper = (products, model, storage, color, priceRange, isPriceSelected) => {
    const combinedFilters = products.filter(product => {
        const matchesModel = model.length > 0 ? model.some((m) => product.name.toLowerCase().includes(m.toLowerCase())) : true;
        const matchesStorage = storage.length > 0 ? storage.some((m) => product.name.toLowerCase().includes(m.toLowerCase())) : true;
        const matchesColor = color.length > 0 ? color.some((m) => product.name.toLowerCase().includes(m.toLowerCase())) : true;
        const matchesPrice = isPriceSelected ? (product.price >= priceRange[0] && product.price <= priceRange[1]) : true;
        return matchesModel && matchesStorage && matchesColor && matchesPrice;

    })
    return combinedFilters;
}