export const getUniqueValues = (products,value) => {
    const uniqueValues = new Set();
    products.forEach(product => {
        product[value].forEach(item => {
            uniqueValues.add(item);
        });
    });

    return Array.from(uniqueValues);
}