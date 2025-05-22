import React from 'react'
import { useStore } from '../store/useStore';

const CartDrawer = () => {
    const {isCartOpen, cart, closeCart} = useStore();
  return (
    <div className = "text-black">
        // backdrop
        <div 
            className = {`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-1000
                        ${isCartOpen ? "opacity-100" : "opacity-0"}`}
            onClick = {() => {closeCart()}}
        />
        // cart drawer
        <div className = "fixed inset-0 h-full w-screen px-3 py-3 lg:w-[400px] lg:inset-auto lg:top-0 lg:right-0 bg-white flex flex-col ">
            {cart.length === 0 ? 
            (<div>
                <div className = "flex justify-between">
                    <p className = "my-3 font-semibold">CART({cart.length})</p>
                    <p onClick = {() => closeCart()} className = "font-semibold text-md cursor-pointer">X</p>
                </div>
                <hr className = "border-black"/>
                <p className = "text-center mt-8 font-semibold text-sm">YOUR CART IS EMPTY</p>
            </div>) :  
                cart.map((item => {
                    return (
                        <div key = {item.id} className = "border border-blue">
                            <div className = "flex text-black">
                                <img src = {item.image[0]} alt = {item.name} width = {100} height = {100}/>
                                <div className = "flex flex-col">
                                    <h1 className = "">{item.name}</h1>
                                    <div>
                                        <span>-</span>
                                        <span className = "mx-2">{item.quantity}</span>
                                        <span>+</span>
                                    </div>
                                    <p classname = "">{item.price}</p>
                                </div>
                            </div>
                        </div>
                    )
                }))}
                
        </div>

    </div>
  )
}

export default CartDrawer