import React from 'react'
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

const ProductsList = ({products}) => {
    const {addToCart, cart, removeFromCart, selectedProduct, setSelectedProduct} = useStore();
  return (
    <section className = "flex w-full bg-[rgb(255,255,255)] text-black common-padding -mt-20">
        <section className = "flex flex-col w-[20%]">
            <div className = "relative bottom-7 w-[80%]">
                <h1 className = "text-2xl font-semibold mb-7">{products[0]?.category}</h1>
                <div className = "rounded-xl p-8 bg-[#b0e0ef] bg-opacity-45">
                    <ul>
                        {products.map((item, i) => {
                            return (
                                <div key = {i} className = {`flex justify-between ${i < products.length - 1 && "pb-5"}`}>
                                    <li >{item.name}</li>
                                    <input type = "checkbox"/>
                                </div>
                                
                            )
                        })}
                    </ul>
                </div>
            </div>

            <div>
                <h1 className = "text-2xl font-semibold mb-7">Storage</h1>
                <div className = "rounded-xl p-8 bg-[#b0e0ef] bg-opacity-45">
                    <ul>
                        {products.map((item, i) => {
                            return (
                                <div key = {i} className = {`flex justify-between ${i < products.length - 1 && "pb-5"}`}>
                                    <li >{item.storageOptions}</li>
                                    <input type = "checkbox"/>
                                </div>
                                
                            )
                        })}
                    </ul>
                </div>
            </div>
        </section>
        
        <section className = "grid grid-cols-3 gap-4 items-center justify-center lg:grid-cols-4">

            { products.map((product) => {
                    const {id, name, description, price, image,
                            category, colors, storageOptions, chip, display, battery, os, inStock
                        } = product;
                    return (
                        <div key = {id} className = "flex flex-col items-center border border-white rounded-xl mb-4 hover:border-[#0CB2D9] py-8 lg:w-[250px]">
                            <div className = "text-center">
                                <Link to = {`/${category}/${id}`}>
                                    <div onClick = {() => setSelectedProduct(product)} className = "h-[150px] w-[150px] md:h-[200px] md:w-[200px] lg:h-[300px] lg:w-[240px] overflow-hidden">
                                        <img src = {image[0]} alt = {name} className = "productImg object-center object-cover w-11/12 overflow-hidden scale-125" />
                                    </div>
                                </Link>
                                <Link to = {`/${category}/${id}`}>
                                    <h1 className = "productTitle -mt-20 hover:text-[#0CB2D9]">{name}</h1>
                                </Link>
                                <p>${price}</p>
                                <p>{description}</p>
                            </div>

                            {cart.find((item) => item.id === id) ? 
                            (<div className = "addToCartBtn !bg-[#0CB2D9] font-semiBold flex justify-center">
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
         </section>
  )
}

export default ProductsList