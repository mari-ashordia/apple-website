import React from 'react'
import { useSessionStore } from '../store/useSessionStore'
import { SortBox } from './SortBox';

const FilterBar = () => {
    const {isFilterModalOpen, isSortModalOpen, toggleFilterModal, toggleSortModal, openFilterModal, openSortModal, closeFilterModal, closeSortModal} = useSessionStore();
  return (
    <section className = "w-screen h-24 border-b border-red-600 bg-white text-black">
        <div className = "flex justify-around py-2">
            <div onClick = {()=> openFilterModal()} className = "cursor-pointer">
                <svg viewBox="-3.6 -3.6 31.20 31.20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.7759999999999998"></g><g id="SVGRepo_iconCarrier"> <title>Filter</title> <g id="Page-1" stroke-width="0.6" fill="none" fill-rule="evenodd"> <g id="Filter"> <rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="24" height="24"> </rect> <line x1="4" y1="5" x2="16" y2="5" id="Path" stroke="#303030" stroke-width="0.6" stroke-linecap="round"> </line> <line x1="4" y1="12" x2="10" y2="12" id="Path" stroke="#303030" stroke-width="0.6" stroke-linecap="round"> </line> <line x1="14" y1="12" x2="20" y2="12" id="Path" stroke="#303030" stroke-width="0.6" stroke-linecap="round"> </line> <line x1="8" y1="19" x2="20" y2="19" id="Path" stroke="#303030" stroke-width="0.6" stroke-linecap="round"> </line> <circle id="Oval" stroke="#303030" stroke-width="0.6" stroke-linecap="round" cx="18" cy="5" r="2"> </circle> <circle id="Oval" stroke="#303030" stroke-width="0.6" stroke-linecap="round" cx="12" cy="12" r="2"> </circle> <circle id="Oval" stroke="#303030" stroke-width="0.6" stroke-linecap="round" cx="6" cy="19" r="2"> </circle> </g> </g> </g></svg>
                <p>Filter</p>
            </div>
            <div onClick = {()=> toggleSortModal()} className = "cursor-pointer relative">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, -1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 12H21M13 8H21M13 16H21M6 7V17M6 7L3 10M6 7L9 10" stroke="#303030" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                <p>Sort</p>
                {isSortModalOpen && <SortBox />}
            </div>
        </div>
    </section>
  )
}

export default FilterBar