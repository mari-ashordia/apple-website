import React from 'react'
import { navLists } from '../constants'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'

const BurgerMenu = () => {
    const {isBurgerMenuOpen,closeBurgerMenu} = useStore();
  return (
    <>
        <div className = {`bg-black bg-opacity-50 fixed z-10 inset-0 top-[70px] ${isBurgerMenuOpen ? "opacity-100" : "opacity-0"}`}/>

        <div className = "burgerMenu fixed inset-x-0 top-[70px]">
            <nav>
                {navLists.map(({name, path}) => 
                <Link to = {path} onClick = {() => closeBurgerMenu()}> 
                    <div className = "border-y transition-all duration-300 border-gray-100 cursor-pointer text-center py-3 hover:bg-white hover:text-black">
                        {name}
                    </div>
                </Link>
                   )}
            </nav>
        </div>
    </>
    
  )
}

export default BurgerMenu