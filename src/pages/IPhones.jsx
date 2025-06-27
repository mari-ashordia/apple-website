import React from 'react'
import ProductsList from '../components/ProductsList'
import { useEffect } from 'react';
import { useSessionStore } from '../store/useSessionStore';

export const IPhones = () => {
  const {products, setProducts} = useSessionStore();
  const iphones = products.filter((item) => item.category === "iPhone");
      useEffect(() => {
          setProducts('products');
      }, [])
  return (
    <main>
        <ProductsList products = {iphones} />
    </main>
      
  )
}
