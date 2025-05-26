import React from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from '../store/useStore';

export const ProductPage = () => {

    const {selectedProduct, color, setColor, storage, setStorage} = useStore();
    const {
        name,
        price,
        image,
        category,
        colors,
        storageOptions,
        chip,
        display,
        battery,
        batteryDescription,
        os,
        inStock
    } = selectedProduct;


  return (
    <main className = "text-white">
        <section className = "flex flex-col sm:flex-row items-center text-center sm:mx-20 sm:my-10 sm:gap-10 sm:text-left">
            <div className = "sm:w-6/12">
                <img src = {image[0]}/>
            </div>
            <div>
                <h2 className = "text-2xl sm:text-4xl mt-5 mb-4">{name}</h2>
                {inStock ? <p className = " border border-blue text-blue p-1 w-[88px] mx-auto mb-6">In Stock</p> :
                 <p className = "border border-red-600 text-red-600 p-1 w-[120px] mx-auto mb-6">Not Available</p>}
                <div className = "mb-5">
                    {colors.map((color, i) => <span key = {i} className = "pr-2">{color}</span>)}
                </div>
                <div>
                    {storageOptions.map((storage, i) => <span key = {i} className = "pr-2">{storage}</span>)}
                </div>
                <p className = "font-bold text-4xl mt-6 mb-6">{price}$</p>
                <button onClick = {() => {}} className = "hover:border-white hover:text-black hover:bg-white border transition-all border-blue text-blue p-2 w-20 rounded-lg text-lg mb-10">Buy</button>
            </div>
        </section>
    </main>
  )
}
