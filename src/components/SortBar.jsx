import React from 'react'
import { useSessionStore } from '../store/useSessionStore'
import { SortBox } from './SortBox';

const SortBar = () => {
  const {isSortModalOpen, toggleSortModal} = useSessionStore();
  return (
    <section className = "w-screen h-24 border-b bg-white text-black pl-[1050px] pt-[30px]">
            <div className = "flex justify-around py-2">
                <div onClick = {()=> {toggleSortModal()}} className = "cursor-pointer relative flex flex-col">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, -1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 12H21M13 8H21M13 16H21M6 7V17M6 7L3 10M6 7L9 10" stroke="#303030" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    <p>Sort</p>
                    {isSortModalOpen && <SortBox />}
                </div>
            </div>
    </section>
  )
}

export default SortBar