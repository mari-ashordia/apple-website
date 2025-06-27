import React from 'react'
import { filterByProductFeature } from '../utils/filterByProductFeature';
import { useSessionStore } from '../store/useSessionStore';
import { Link } from 'react-router-dom';
import { getInitialStorages } from '../utils/getInitialStorages';
import { getInitialColors } from '../utils/getInitialColors';
import useDeepCompareEffect from '../utils/useDeepCompareEffect';

const FilterModal2 = ({header, closeFilterModal, results, setCurrentPage}) => {
    const {products, modelArr, setFilteredProductsByFeatures, selectedFeatures, toggleSelectedFeatures} = useSessionStore();
    const filterByProductName = filterByProductFeature(products,'name');
    const filterProductArr = Object.entries(filterByProductName);
    const filterByProductStorage = filterByProductFeature(products,'storageOptions');
    const filterStorageArr = Object.entries(filterByProductStorage);
    const filterByProductColor = filterByProductFeature(products,'colors');
    const filterColorArr = Object.entries(filterByProductColor);

  return (
    <div>
        <div className = "flex justify-between">
            <div className = "flex cursor-pointer">
                <svg className = "w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 7L10 12L15 17" stroke="#202020" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                <p onClick = {() => setCurrentPage(1)} className = "underline text-gray-600 pl-3 relative right-3">Back</p>
            </div>
            <h1 className = "font-semibold text-xl">{header}</h1>
            <div className = "flex items-center gap-3 pr-3">
                <p className = "text-gray-600 font-light">{`${results} Results`}</p>
                <p onClick = {() => closeFilterModal()} className = "text-4xl cursor-pointer">&times;</p>
            </div>
        </div>

        {<div className = "mt-8">
            {header === "MODEL" && (modelArr.map((model) => (
                <div>
                    <hr className = "w-screen absolute left-0 border-[#dbd9d9]"/>
                    <div onClick = {()=> {toggleSelectedFeatures(model)}} className = {`${selectedFeatures.includes(model) && 'bg-[rgb(245,245,245)] border-y border-gray-500'} cursor-pointer py-3`}>
                        <p className = "text-gray-600 uppercase text-sm">{model}</p>
                    </div>
                    
                </div>    )
            ))}
            {header === "STORAGE" && (Object.keys(getInitialStorages(products)).map((storage) => (
                <div>
                    <hr className = "w-screen absolute left-0 border-[#dbd9d9]"/>
                    <div onClick = {()=> {toggleSelectedFeatures(storage)}} className = "cursor-pointer py-3">
                        <p className = "text-gray-600 uppercase text-sm">{storage}</p>
                    </div>

                </div>    )
            ))}
            {header === "COLOR" && (Object.keys(getInitialColors(products)).map((color) => (
                <div>
                    <hr className = "w-screen absolute left-0 border-[#dbd9d9]"/>
                    <div onClick = {()=> {toggleSelectedFeatures(color)}} className = "cursor-pointer py-3">
                        <p className = "text-gray-600 uppercase text-sm">{color}</p>
                    </div>

                </div>    )
            ))}
        </div>}

    </div>
  )
}

export default FilterModal2
