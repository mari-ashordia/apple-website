import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSessionStore } from '../store/useSessionStore';
import FilterModal2 from './FilterModal2';


const FilterModal = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterHeader, setFilterHeader] = useState();
    const {products, closeFilterModal} = useSessionStore();
    let results = 0;
    // const path = useLocation();
    // if(path.pathname.includes('/iphones')){
    //     results = products.filter((item) => item.category === "iPhone").length;
    // }
    // else if(path.pathname.includes('/ipads')){
    //     results = products.filter((item) => item.category === "iPad").length;
    // }
    // else if(path.pathname.includes('/macs')){
    //     results = products.filter((item) => item.category === "mac").length;
    // }

  return (
    <div className = "flex flex-col inset-0 fixed w-screen h-screen z-50 bg-white text-black px-4 py-5">
        
        {
            currentPage === 1 ?
                (<>
                <div className = "flex justify-between items-baseline">
                <h1 className = "font-semibold mb-10">FILTER</h1>
                <div className = "flex gap-3 items-center pr-3">
                    <p className = "text-gray-600 font-light">{`${results} Results`}</p>
                    <p onClick = {() => closeFilterModal()} className = "text-4xl cursor-pointer">&times;</p>
                </div>
            </div>
                    <div>
                        <hr className = "w-screen absolute left-0 border-[#dbd9d9]"/>
                        <div onClick = {(e) => {
                            const text = e.currentTarget.querySelector('p').innerText;
                            setCurrentPage(2);
                            setFilterHeader(text);
                            }} 
                            className = "flex justify-between pt-3 pb-2 cursor-pointer"
                        >
                            <p className = "font-semibold uppercase">Model</p>
                            <svg className = 'w-7 h-7 text-black' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 7L10 12L15 17" stroke="#202020" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </div>

                        <hr className = "w-screen absolute left-0 border-[#dbd9d9]"/>
                        <div onClick = {(e) => {
                            const text = e.currentTarget.querySelector('p').innerText;
                            setCurrentPage(2);
                            setFilterHeader(text);
                            }} 
                            className = "flex justify-between pt-3 pb-2 cursor-pointer"
                        >
                            <p className = "font-semibold uppercase">Storage</p>
                            <svg className = 'w-7 h-7 text-black' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 7L10 12L15 17" stroke="#202020" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </div>

                        <hr className = "w-screen absolute left-0 border-[#dbd9d9]"/>
                        <div onClick = {(e) => {
                            const text = e.currentTarget.querySelector('p').innerText;
                            setCurrentPage(2);
                            setFilterHeader(text);
                            }} className = "flex justify-between pt-3 pb-2 cursor-pointer">
                            <p className = "font-semibold uppercase">Color</p>
                            <svg className = 'w-7 h-7 text-black' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 7L10 12L15 17" stroke="#202020" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </div>
                        <hr className = "w-screen absolute left-0 border-[#dbd9d9]"/>
                    </div></>) : currentPage ===2 && <FilterModal2 header = {filterHeader} closeFilterModal = {closeFilterModal} results = {results} setCurrentPage = {setCurrentPage}/>
        }
        
        <div className = "fixed bottom-5 w-screen left-0">
            <hr className = "mb-7 border-gray-900"/>
            <div className = "flex justify-center gap-3">
                <button className = "bg-white text-black py-3 border w-[40vw] font-semibold">CLEAR</button>
                <button className = "bg-black text-white py-3 border w-[40vw] font-semibold">DONE</button>
            </div>
        </div>
        
    </div>
  )
}

export default FilterModal