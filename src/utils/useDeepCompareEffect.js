import React, { useEffect, useRef } from 'react'
import isEqual from 'lodash.isequal';
import { useSessionStore } from '../store/useSessionStore';

const useDeepCompareEffect = (dependency, products, setFilteredProductsByFeatures) => {
    const prevDepRef = useRef();

    const {colorCheck} = useSessionStore();
    const {storageCheck} = useSessionStore();
    console.log(colorCheck, storageCheck);
  
    useEffect(() => {
      if(!isEqual(prevDepRef,dependency)) prevDepRef.current = dependency;
      const checked = Object.entries(dependency).filter(([_, value]) => value === true);
      const featuresToFilter = checked.map((elem, i) => elem[0]);
      const filteredProducts = [];
      let singleColor = null;
      let singleStorage = null;
      products.forEach(product => {
        if(dependency === colorCheck){
            for(let index in featuresToFilter) {
              singleColor = featuresToFilter[index];
              const endsOrNot = product.name.endsWith(singleColor);
              endsOrNot && filteredProducts.push(product);
          }
        }
        if(dependency === storageCheck){
            for(let index in featuresToFilter) {
              singleStorage = featuresToFilter[index];
              const endsOrNot = product.name.includes(singleStorage);
              endsOrNot && filteredProducts.push(product);
          }
        }
        
         });
         setFilteredProductsByFeatures(filteredProducts);
    },[dependency])
}

export default useDeepCompareEffect