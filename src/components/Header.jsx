import React from 'react'
import { navLists } from '../assets/constants'
import { appleImg,searchImg,bagImg } from '../assets/utils'
const Header = () => {
  return (
    <header className = "w-full py-5 sm:px-10 px-[5px] flex justify-between items-center">
        <img className = "cursor-pointer ml-3" src={appleImg} width = {14} height = {18} alt = "apple logo"/>
        <nav className = "max-sm:hidden justify-center flex gap-0.5 ">
            {navLists.map((item,i)=>{
                return <div className = "cursor-pointer px-5 text-sm text-[#86868b] hover:text-white transition-all duration-[400ms]" key={i}>{item}</div>
            })}
        </nav>
        <div className = "flex gap-7 items-baseline">
            <img className = "cursor-pointer" src = {searchImg} width={18} height = {18} alt = "search img"/>
            <img className = "cursor-pointer" src = {bagImg} width={18} height = {18} alt = "bag img"/>
        </div>
        
    </header>
  )
}

export default Header

