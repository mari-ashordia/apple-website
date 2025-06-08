import React from 'react'
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
    const {isCartOpen, cart, closeCart, addToCart, removeFromCart, removeProductFromCart,clearCart} = useStore();
  return (
    <div className = "text-black">
        <div 
            className = {`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-1000 z-10
                        ${isCartOpen ? "opacity-100" : "opacity-0"}`}
            onClick = {() => {closeCart()}}
        />
        <div className = {`overflow-y-auto overflow-x-hidden fixed inset-0 ${cart.length > 0 ? 'h-[73vh]' : 'h-screen'} w-screen px-3 py-3 lg:w-[400px] lg:inset-auto lg:top-0 lg:right-0 bg-white flex flex-col z-20`}>
            <div>
                <div className = "flex justify-between">
                    <p className = "my-3 font-semibold">CART({cart.length})</p>
                    <p onClick = {() => closeCart()} className = " relative max-lg:right-4 font-semibold text-md cursor-pointer">X</p>
                </div>
                <hr className = "border-black"/>
                {cart.length === 0 && <p className = "text-center mt-8 font-semibold text-sm">YOUR CART IS EMPTY</p>}
            </div> 
                {cart.map(((item, i) => {
                    return (
                        <>
                            <div key = {item.id} className = " pb-5 mt-8">
                            <div className = "flex gap-4">
                                <div>
                                    <Link to = {`/${item.category}/${item.id}`}><img src = {item.image[0]} alt = {item.name} width = {100} height = {100} className = "cursor-pointer"/></Link>
                                </div>
                                <div className = "flex flex-col gap-1">
                                    <h1 onClick = {() => {}} className = " text-gray-900 cursor-pointer">{item.name}</h1>
                                    <div className = "my-2">
                                        <span className = "cursor-pointer" onClick = {() => removeFromCart(item.id)}>-</span>
                                        <span className = "mx-3 text-xs">{item.quantity}</span>
                                        <span className = "cursor-pointer" onClick = {() => addToCart(item)}>+</span>
                                    </div>
                                    <p onClick = {() => removeProductFromCart(item.id)} className = "underline text-[11px] cursor-pointer uppercase mb-2">Remove</p>
                                    <p className = "font-semibold">${item.price}</p>
                                </div>
                            </div>
                        </div>
                        <hr className = {`w-[88vw] mx-auto ${i === cart.length - 1 && 'hidden'}`}/>
                        </>
                    )
                }))}
            <div className = {`${cart.length === 0 && 'hidden'} fixed bottom-0 right-0 h-[27vh] max-sm:px-4 max-sm:pl-7 w-screen lg:w-[400px] md:h-[30vh] bg-white border-t border-black`}>
                <div className = "flex justify-between p-4 md:px-6">
                    <p className = "text-sm font-semibold">Total</p>
                    <p className = "text-sm font-semibold">${cart.reduce((total, {price}) =>total + price , 0)}</p>
                </div>
                <div className = "flex flex-col m-auto gap-3 w-full md:w-[95vw] lg:w-11/12">
                    <button onClick = {() => {}} className = "bg-black text-white p-4 hover:opacity-70">CHECKOUT</button>
                    <button onClick = {() => clearCart()} className = "bg-black text-white p-4 hover:opacity-70">CLEAR CART</button>
                </div>
            </div>
        </div>

    </div>
  )
}

export default CartDrawer