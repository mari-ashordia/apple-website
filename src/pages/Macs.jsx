import React from 'react'
import ProductsList from '../components/ProductsList';
import { useStore } from '../store/useStore';
import { useEffect } from 'react';

export const Macs = () => {
  const {products, setProducts, addToCart, cart, removeFromCart } = useStore();
  const macs = products.filter((item) => item.category === "mac")
      useEffect(() => {
          setProducts();
      }, [])
  return (
    <main className = "nav-height bg-white">
       <ProductsList products = {macs}/>
    </main>
  )
}
