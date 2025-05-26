import React from 'react'
import ProductsList from '../components/ProductsList'
import { useStore } from '../store/useStore';
import { useEffect } from 'react';

export const IPhones = () => {
  const {products, setProducts} = useStore();
  const iphones = products.filter((item) => item.category === "iPhone")
      useEffect(() => {
          setProducts();
      }, [])
  return (
    <main>
        <ProductsList products = {iphones}/>
    </main>
      
  )
}
