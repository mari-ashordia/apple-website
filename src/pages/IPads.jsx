import React, { useEffect, useState } from 'react'
import ProductsList from '../components/ProductsList'
import { useSessionStore } from '../store/useSessionStore'

const IPads = () => {
    const {products, setProducts } = useSessionStore();
    const ipads = products.filter((item) => item.category === "iPad");

    useEffect(() => {
        setProducts('productsIpadsMacs');
    }, [])
  return (
    <main className = "min-[nav-height]">
        <ProductsList products = {ipads}/>
    </main>
  )
}

export default IPads