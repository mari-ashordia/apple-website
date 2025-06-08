export const filterByProductFeature = (products,feature) => (products.reduce((prev, current) => Object.keys(prev).includes(current[feature])  ? 
        {...prev, [current[feature]]: prev[current[feature]] + 1} : {...prev, [current[feature]]: 0}, {}));
