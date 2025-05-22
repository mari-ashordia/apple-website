import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useStore } from '../store/useStore'
import ProductsList from '../components/ProductsList'

const IPads = () => {
    const {products, setProducts } = useStore();
    const ipads = products.filter((item) => item.category === "iPad")

    useEffect(() => {
        setProducts();
    }, [])
  return (
    <main className = "common-padding">
        <ProductsList products = {ipads}/>
    </main>
  )
}

export default IPads