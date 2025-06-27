import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { upArrow, downArrow } from '../utils';
import LoadingWrapper from './LoadingWrapper';  
import { filterByProductFeature } from '../utils/filterByProductFeature';
import Slider from '@mui/material/Slider';
import { useSessionStore } from '../store/useSessionStore';
import { useLocalStore } from '../store/useLocalStore';
import FilterBar from './FilterBar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ClassNames } from '@emotion/react';
import { getUniqueValues } from '../utils/getUniqueValues';
import useDeepCompareEffect from '../utils/useDeepCompareEffect';
import ProductsMapping from './ProductsMapping';
import { getInitialStorages } from '../utils/getInitialStorages';
import { getInitialColors } from '../utils/getInitialColors';
import SortBar from './SortBar';
import { productModels } from '../assets/constants';

const ProductsList = ({products}) => {
    const {addToCart, cart, removeFromCart} = useLocalStore();
    const {
        isFilterMenuOpen,
        setIsFilterMenuOpen, 
        currentPage, 
        productsPerPage, 
        setCurrentPage, 
        selectedProduct, 
        setSelectedProduct,
        loading,
        filteredProducts, 
        setFilteredProducts, 
        isFilterChecked, 
        setIsFilterChecked,
        priceRange, 
        setPriceRange,
        filteredProductsByFeatures,
        setFilteredProductsByFeatures,
        sortedProducts,
        colorCheck,
        storageCheck,
        setColorCheck,
        setStorageCheck,
        removeChecks,
        modelArr,
        setModelArr
    } = useSessionStore();
    const {model, storage, color} = isFilterMenuOpen; 
    
    const isMediumScreen = useMediaQuery('(max-width: 1024px)');
    const isLargeScreen = useMediaQuery('(min-width: 1025px)');


    // pagination
    const totalPages = isFilterChecked ? Math.ceil(filteredProducts.length / productsPerPage) :
        filteredProductsByFeatures.length > 0 ? Math.ceil(filteredProductsByFeatures.length / productsPerPage) :
        sortedProducts.length > 0 ? Math.ceil(sortedProducts.length / productsPerPage) :
         Math.ceil(products.length / productsPerPage);
    const startIndex = ( currentPage - 1 ) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = isFilterChecked ? filteredProducts.slice(startIndex, endIndex) : 
        filteredProductsByFeatures.length > 0 ? filteredProductsByFeatures.slice(startIndex, endIndex) :
        sortedProducts.length > 0 ? sortedProducts.slice(startIndex, endIndex) :products.slice(startIndex, endIndex);

    // price filter details
    const minPrice = 0;
    const maxPrice = products.reduce((max, {price}) => price > max ? price : max, 0);

    useEffect(() => {
        window.scrollTo( {top: 0, behaviour: 'smooth'});
    }, [currentPage, isFilterChecked]);

    const handlePrevPage = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
    const handleNextPage = () => currentPage !== totalPages && setCurrentPage(currentPage + 1);

    const filterByProductName = filterByProductFeature(products,'name');
    // const filterByProductStorage = filterByProductFeature(products,'storageOptions');
    // const filterByProductColor = filterByProductFeature(products,'colors');
    const filterArr = Object.entries(filterByProductName);

    // const uniqueColors = getUniqueValues(products, 'colors');
    // const uniqueStorages = getUniqueValues(products, 'storageOptions');

    // const initialValue = uniqueColors.reduce((prev, current) => ({...prev, [current]: false}), {});
    // const [colorCheck, setColorCheck] = useState(initialValue);
    // const [storageCheck, setStorageCheck] = useState(initialValue);

    const handleColorChange = (e, color) => {
        setColorCheck(color,e);
    }
    // console.log(colorCheck);
    const handleStorageChange = (e, storage) => {
        setStorageCheck(storage,e);
    }

    useDeepCompareEffect(colorCheck, products, setFilteredProductsByFeatures);
    useDeepCompareEffect(storageCheck, products, setFilteredProductsByFeatures);

    const location = useLocation();
    const path = location.pathname;

    useEffect(()=> {
        path === '/macs' ? setModelArr(productModels, 'MacBook') :
        path === '/iphones' ? setModelArr(productModels, 'iPhone') :
        path === '/ipads' ? setModelArr(productModels, 'iPad') : []
    }, [path]);

  return (

    <section>
        {isMediumScreen && <FilterBar />}
        {isLargeScreen && <SortBar />}
        <section className = "flex w-full bg-[rgb(255,255,255)] text-black common-padding -mt-20">

            <section className = "hidden lg:flex flex-col gap-7 w-[20%] max-h-[200vh]">
                <h1 className = "text-2xl font-semibold mb-10 relative bottom-5">{products[0]?.category}</h1>
            
                <div className = "relative w-[85%] rounded-xl p-8 bg-[#fff] border border-teal bg-opacity-45 flex flex-col">
                    <div className = "flex justify-between -mb-3 -mt-4">
                        <h2 className = "font-semibold text-2xl">{products[0]?.category}</h2>
                        <img onClick = {() => setIsFilterMenuOpen("model")} src = {model ? upArrow : downArrow} width = {20} height= {20} className = "relative left-1 cursor-pointer"/>                    
                    </div>
                    <ul id = "filterList" className = {`${model ? "block" : "hidden"} w-full mt-10`}>
                        <div className = "flex justify-between pb-3 items-center">
                            <li>All</li>
                            <input type = "checkbox" className = "accent-teal w-4 h-4"/>
                        </div>
                        {modelArr.map((model, i) => {
                            return (
                                <div key = {i} className = {`flex justify-between pb-3 items-center`}>
                                    <li >{model}</li>
                                    <input type = "checkbox" className = "accent-teal w-4 h-4"/>
                                </div>
                            )
                        })}
                            
                    </ul>
                </div>
                
                <div className = " relative w-[85%] rounded-xl p-8 bg-[#fff] bg-opacity-45 flex flex-col border border-teal">
                    <div className = "flex justify-between -mb-3 -mt-4">
                        <h2 className = "font-semibold text-2xl">Storage</h2>
                        <img onClick = {() => setIsFilterMenuOpen("storage")} src = {storage ? upArrow : downArrow} width = {20} height= {20} className = "relative left-1 cursor-pointer"/>                    
                    </div>
                    <ul id = "filterList" className = {`${storage ? "block" : "hidden"} pt-10`}>
                        {Object.keys(getInitialStorages(products)).map((storage, i) => {
                            return(
                                <div key = {i} className = {`flex justify-between ${i < products.length - 1 && "pb-2"}`}>
                                    <li >{storage}</li>
                                    <input type = "checkbox" className = "accent-teal w-5 h-5" value = {storageCheck[storage]} onChange={(e) => {handleStorageChange(e, storage); setCurrentPage(1);}}/>
                                </div>
                            )})}
                    </ul>
                </div>
                
                <div className = " relative w-[85%] rounded-xl p-8 bg-[#fff] border border-teal bg-opacity-45 flex flex-col">
                    <div className = "flex justify-between -mb-3 -mt-4">
                        <h2 className = "font-semibold text-2xl">Color</h2>
                        <img onClick = {() => setIsFilterMenuOpen("color")} src = {color ? upArrow : downArrow} width = {20} height= {20} className = "relative left-1 cursor-pointer"/>                    
                    </div>
                    <ul id = "filterList" className = {`${color ? "block" : "hidden"} pt-10`}>
                        {Object.keys(getInitialColors(products)).map((color, i) => (
                            <div key = {i} className = {`flex justify-between ${i < products.length - 1 && "pb-2"}`}>
                                <li >{color}</li>
                                <input type = "checkbox" className = "accent-teal w-5 h-5" value = {colorCheck[color]} onChange={(e) => {handleColorChange(e, color); setCurrentPage(1);}}/>
                            </div>
                        ))}
                    </ul>
                </div>

                <div className = "w-[85%]">
                    <div className = "flex justify-between mb-4">
                        <h2 className = "font-semibold text-2xl">Price</h2>
                        <img src = {upArrow} width = {20} height= {20}/>
                    </div>
                    <div>
                        <Slider 
                            value={priceRange}
                            onChange={(e, newValue) => setPriceRange(newValue)}
                            valueLabelDisplay="auto" 
                            step={10}
                            min = {minPrice}
                            max = {maxPrice}
                            sx = {{color: '#00bcd4'}}
                        />
                    </div>
                    <div className = "flex justify-between items-center">
                        <p><span className = "text-gray-400">Price:</span> {` ${priceRange[0]}$ - ${priceRange[1]}$`}</p>
                        <p onClick = {() => {
                            setIsFilterChecked(true);
                            setFilteredProducts(products);
                            setCurrentPage(1);
                            }} className = "text-teal cursor-pointer font-semibold hover:bg-teal hover:text-white rounded-lg px-3 py-2">Filter</p>
                    </div>
                </div>
                {isFilterChecked &&
                (<div className = "w-[85%]">
                    <div>
                        <p onClick = {() => {
                            setIsFilterChecked(false);
                            setFilteredProducts([]);
                            setPriceRange([minPrice, maxPrice]);
                            removeChecks();
                        }} className = "text-teal text-lg text-center cursor-pointer font-semibold hover:bg-teal hover:text-white rounded-lg px-3 py-2">Remove Filters</p>
                    </div>
                </div>)}

            </section>

            <section className = "flex flex-col items-center justify-center">
                <div className = "grid grid-cols-3 gap-4 sm:grid-cols-4"> 
                {filteredProductsByFeatures.length > 0 ? <ProductsMapping array = {currentProducts} loading = {loading} cart = {cart}/> 
                    :sortedProducts.length > 0 ? <ProductsMapping array = {currentProducts} loading = {loading} cart = {cart}/> : <ProductsMapping array = {currentProducts} loading = {loading} cart = {cart}/>           
                }
                
                </div>

                <div className = "mt-10 sm:mt-[100px] md:mt-[50px]">
                    <div className = "flex flex-row gap-1">
                        <div onClick = {() =>handlePrevPage()} className = "paginationDiv">
                            <svg className = "hover:stroke-white" width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                                stroke="#202020" transform="matrix(-1, 0, 0, -1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> 
                                <path d="M10 7L15 12L10 17" stroke="#202020"
                                stroke-width="0.36" stroke-linecap="round" 
                                stroke-linejoin="round"></path> </g>
                            </svg>
                        </div>
                        {[...Array(totalPages)].map((_, i) => (
                            <div onClick = {() => setCurrentPage(i+1)} key = {i} class = {`paginationDiv ${currentPage === i+1 && 'bg-black !text-white'}`}>
                                {i+1}
                            </div>
                        ))}
                        <div onClick = {() => handleNextPage()} className = "paginationDiv">
                            <svg className = "hover:stroke-white" width="300px" height="300px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                                stroke="#202020"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier"
                                stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> 
                                <path d="M10 7L15 12L10 17" stroke="#202020" stroke-width="0.36" stroke-linecap="round" stroke-linejoin="round"></path> </g>
                            </svg>
                        </div>
                    </div>
                </div>

            </section>
                
            </section>
         </section>
  )
}

export default ProductsList