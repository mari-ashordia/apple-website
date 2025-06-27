import React from 'react'
import LoadingWrapper from './LoadingWrapper';
import { Link } from 'react-router-dom';

const ProductsMapping = ({array, loading, cart}) => {
  return (
        array.map((product) => {
            const {id, name, description, price, image,
                    category, colors, storageOptions, chip, display, battery, os, inStock
                } = product;
                const includesColorBoolean = colors.map((color) => name.endsWith(color));
                const productImageIndex = includesColorBoolean.findIndex(val => val === true);
            return (
                <div key = {id} className = "h-[40vh] lg:h-[55vh] flex flex-col items-center lg:border border-white rounded-xl mb-4 hover:border-[#0CB2D9] py-8 lg:w-[250px]">
                    <LoadingWrapper size = {50} loading={loading}>
                    <div className = "text-center">
                        <Link to = {`/${category}/${id}`}>
                            <div onClick = {() => setSelectedProduct(product)} className = "relative -top-3 h-[150px] w-[150px] md:h-[200px] md:w-[200px] lg:h-[300px] lg:w-[240px] overflow-hidden">
                                <img src = {image[productImageIndex]} alt = {name} className = "productImg m-auto object-center object-cover w-11/12 overflow-hidden scale-125" />
                            </div>
                        </Link>
                        <Link to = {`/${category}/${id}`}>
                            <h1 className = {`productTitle lg:-mt-20 relative lg:top-0 hover:text-[#0CB2D9]`}>{name}</h1>
                        </Link>
                        <p>${price}</p>
                        <p>{description}</p>
                    </div>

                    {cart.find((item) => item.id === id) ? 
                    (<div className = "addToCartBtn !bg-[#0CB2D9] font-semiBold flex justify-center items-center !text-white">
                        <span className = "cursor-pointer px-2" onClick={() => removeFromCart(id)}>-</span>
                        <span className = "mx-3">{
                            cart.find((item) => item.id === id)?.quantity
                            }</span>
                        <span className = "cursor-pointer px-2" onClick = {() => addToCart(product)}>+</span>
                    </div>)
                    : <button className = "addToCartBtn" onClick = {()=>{addToCart(product)}}>ADD TO CART</button>}
                    </LoadingWrapper>
                </div>
                
                
            )
        }) )
  
}

export default ProductsMapping