import React from 'react'
import { useParams } from 'react-router-dom'
import { useSessionStore } from '../store/useSessionStore';
import { getUniqueValues } from '../utils/getUniqueValues';

export const ProductPage = () => {

    const {selectedProduct, color, setColor, storage, setStorage} = useSessionStore();
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

    const {uniqueColors, uniqueStorages, setUniqueColorsOrStorages} = useSessionStore();


  return (
    <main className = "bg-white text-black -mt-10 -mb-10 flex flex-col">
        <section className = "flex flex-col md:flex-row items-center text-center sm:mx-20 sm:my-10 sm:gap-10 sm:text-left md:nav-height">
            <div className = "md:w-7/12 lg:w-6/12">
                <img src = {image[0]}/>
            </div>
            <div className = "flex flex-col items-center">
                <h2 className = "text-2xl sm:text-4xl mt-5 mb-4">{name}</h2>
                {inStock ? <p className = "text-center border border-blue text-blue p-1 sm:mt-3 sm:p-2 sm:w-[120px] w-[88px] mx-auto lg:mx-0 mb-6">In Stock</p> :
                 <p className = " text-center border border-red-600 text-red-600 p-1 w-[120px] mx-auto mb-6">Not Available</p>}
                <div className = "mb-5">
                    {colors.map((color, i) => <span key = {i} className = "pr-2">{color}</span>)}
                </div>
                <div>
                    {storageOptions.map((storage, i) => <span key = {i} className = "pr-2">{storage}</span>)}
                </div>
                <p className = "font-bold text-4xl mt-6 mb-6">{price}$</p>
                <button onClick = {() => {}} className = "hover:border-white hover:text-white hover:bg-black border transition-all border-blue text-blue p-2 w-20 rounded-lg text-lg mb-10">Buy</button>
            </div>
        </section>

        <section className = "pl-5 mb-[110px] md:-mt-[40px]">
            <table className = "border border-[#ccc] w-[90vw] m-auto mr-[82px]">
                <caption className = "m-auto mb-[60px] text-2xl border rounded-xl w-40 p-1 font-semibold bg-teal text-white border-teal">Features</caption>
                {Object.entries(selectedProduct).map(([key, value])=>(
                        (key !== 'id' && key !== 'image' && key !== 'inStock') && 
                            <tr key = {key} className = "border-none [&:nth-child(even)]:bg-[#9ee1ebac]">
                                <td className = "p-3 font-semibold pl-5 w-[30vw]">{key === "batteryDescription" ? "battery description" : key}</td>
                                <td className = "p-3">{value}</td>
                            </tr>
                ))}
            </table>

        </section>
    </main>
  )
}
