import React from 'react'
import { useStore } from '../store/useStore';
const ProductsList = ({products}) => {
    const {addToCart, cart, removeFromCart } = useStore();
  return (
    <section className = "grid grid-cols-3 gap-4 items-center justify-center lg:grid-cols-4">

        { products.map((product) => {
                const {id, name, description, price, image,
                        category, colors, storageOptions, chip, display, battery, os, inStock
                    } = product;
                return (
                    <div key = {id} className = "flex flex-col items-center rounded-xl mb-4 hover:border hover:border-blue py-8">
                        <div className = "text-center">
                            <div className = "h-[150px] w-[150px] md:h-[200px] md:w-[200px] lg:h-[300px] lg:w-[300px]">
                                <img src = {image[0]} alt = {name} className = "productImg object-center w-full" />
                            </div>
                            <h1 className = "productTitle">{name}</h1>
                            <p>${price}</p>
                            <p>{description}</p>
                        </div>

                        {cart.find((item) => item.id === id) ? 
                        (<div className = "addToCartBtn !bg-blue !text-white font-semiBold flex justify-center">
                            <span classname = "cursor-pointer" onClick={() => removeFromCart(id)}>-</span>
                            <span className = "mx-5">{
                                cart.find((item) => item.id === id)?.quantity
                                }</span>
                            <span classname = "cursor-pointer" onClick = {() => addToCart(product)}>+</span>
                        </div>)
                         : <button className = "addToCartBtn" onClick = {()=>{addToCart(product)}}>ADD TO CART</button>}
                    </div>
                    
                )
            })
        }
        
        </section>
  )
}

export default ProductsList