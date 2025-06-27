import React from 'react'
import ProductsList from '../components/ProductsList';
import { useEffect } from 'react';
import { useSessionStore } from '../store/useSessionStore';

export const Macs = () => {
  const {products, setProducts} = useSessionStore();
  const macs = products.filter((item) => item.category === "mac")
      useEffect(() => {
          setProducts('productsIpadsMacs');
      }, [])
  return (
    <main className = "min-[nav-height] bg-white">
       <ProductsList products = {macs}/>
    </main>
  )
}
