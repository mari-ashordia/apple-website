import React, { useEffect, useState } from 'react'
import { useStore } from '../store/useStore';
import { Link, useLocation } from 'react-router-dom';
import { upArrow, downArrow } from '../utils';
import LoadingWrapper from './LoadingWrapper';  
import { filterByProductFeature } from '../utils/filterByProductFeature';

const ProductsList = ({products}) => {
    const {addToCart, cart, removeFromCart, selectedProduct, setSelectedProduct} = useStore();
    const {isFilterMenuOpen, setIsFilterMenuOpen} = useStore();
    const {model, storage, color} = isFilterMenuOpen; 
    const {currentPage, productsPerPage, setCurrentPage} = useStore();
    const loading = useStore((state) => state.loading);

    const totalPages = Math.ceil(products.length / productsPerPage);
    const startIndex = ( currentPage - 1 ) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    const [filterChecked, setFilterChecked] = useState(false);

    // const {searchValue, setSearchValue, searchedProducts, setSearchedProducts} = useStore(state => ({
    //         searchValue: state.searchValue, 
    //         setSearchValue: state.setSearchValue,
    //         searchedProducts: state.searchedProducts,
    //         setSearchedProducts: state.setSearchedProducts
    //     }));

    useEffect(() => {
        window.scrollTo( {top: 0, behaviour: 'smooth'});
    }, [currentPage]);

    const handlePrevPage = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
    const handleNextPage = () => currentPage !== totalPages && setCurrentPage(currentPage + 1);

    const location  = useLocation();
    const path = location.pathname;

    const filterByProductName = filterByProductFeature(products,'name');
    // const filterByProductStorage = filterByProductFeature(products,'storageOptions');
    // const filterByProductColor = filterByProductFeature(products,'colors');
    const filterArr = Object.entries(filterByProductName);

  return (
    <section className = "flex w-full bg-[rgb(255,255,255)] text-black common-padding -mt-20">

        <section className = "hidden lg:flex flex-col gap-7 w-[20%] max-h-[200vh]">
            <h1 className = "text-2xl font-semibold mb-10 relative bottom-5">{products[0]?.category}</h1>
           
            <div className = "relative w-[85%] rounded-xl p-8 bg-[#eee] bg-opacity-45 flex flex-col">
                <div className = "flex justify-between -mb-3 -mt-4">
                    <h2 className = "font-semibold text-2xl">{products[0]?.category}</h2>
                    <img onClick = {() => setIsFilterMenuOpen("model")} src = {model ? upArrow : downArrow} width = {20} height= {20} className = "relative left-1 cursor-pointer"/>                    
                </div>
                <ul id = "filterList" className = {`${model ? "block" : "hidden"} pt-10`}>
                    <div className = "flex justify-between pb-3 items-center">
                        <li>All</li>
                        <input type = "checkbox" className = "accent-teal w-4 h-4"/>
                    </div>
                    {filterArr.map(([name, _], i) => {
                        return (
                            <div key = {i} className = {`flex justify-between pb-3 items-center`}>
                               <li >{name}</li>
                               <input type = "checkbox" className = "accent-teal w-4 h-4"/>
                             </div>
                        )
                    })}
                        
                </ul>
            </div>
            
            <div className = " relative w-[85%] rounded-xl p-8 bg-[#b0e0ef] bg-opacity-45 flex flex-col">
                <div className = "flex justify-between -mb-3 -mt-4">
                    <h2 className = "font-semibold text-2xl">Storage</h2>
                    <img onClick = {() => setIsFilterMenuOpen("storage")} src = {storage ? upArrow : downArrow} width = {20} height= {20} className = "relative left-1 cursor-pointer"/>                    
                </div>
                <ul id = "filterList" className = {`${storage ? "block" : "hidden"} pt-10`}>
                    {/* {products.map((item, i) => {
                        return (
                            <div key = {i} className = {`flex justify-between ${i < products.length - 1 && "pb-5"}`}>
                              <li >{item.name}</li>
                              <input type = "checkbox"/>
                            </div>
                        
                    )
                    })} */}
                </ul>
            </div>
            
            <div className = " relative w-[85%] rounded-xl p-8 bg-[#b0e0ef] bg-opacity-45 flex flex-col">
                <div className = "flex justify-between -mb-3 -mt-4">
                    <h2 className = "font-semibold text-2xl">Color</h2>
                    <img onClick = {() => setIsFilterMenuOpen("color")} src = {color ? upArrow : downArrow} width = {20} height= {20} className = "relative left-1 cursor-pointer"/>                    
                </div>
                <ul id = "filterList" className = {`${color ? "block" : "hidden"} pt-10`}>
                    {products.map((item, i) => {
                        return (
                            <div key = {i} className = {`flex justify-between ${i < products.length - 1 && "pb-5"}`}>
                              <li >{item.colors.reduce((prev,current) => {
                                return !prev.includes(current) && [...prev,current];
                              },[])}</li>
                              <input type = "checkbox"/>
                            </div>
                        
                    )
                    })}
                </ul>
            </div>

        </section>

        <section className = "flex flex-col items-center justify-center">
            <div className = "grid grid-cols-3 gap-4 sm:grid-cols-4">
            {currentProducts.map((product) => {
                    const {id, name, description, price, image,
                            category, colors, storageOptions, chip, display, battery, os, inStock
                        } = product;
                    return (
                        <div key = {id} className = "h-[40vh] lg:h-[55vh] flex flex-col items-center lg:border border-white rounded-xl mb-4 hover:border-[#0CB2D9] py-8 lg:w-[250px]">
                            <LoadingWrapper size = {50} loading={loading}>
                            <div className = "text-center">
                                <Link to = {`/${category}/${id}`}>
                                    <div onClick = {() => setSelectedProduct(product)} className = "relative -top-3 h-[150px] w-[150px] md:h-[200px] md:w-[200px] lg:h-[300px] lg:w-[240px] overflow-hidden">
                                        <img src = {image[0]} alt = {name} className = "productImg m-auto object-center object-cover w-11/12 overflow-hidden scale-125" />
                                    </div>
                                </Link>
                                <Link to = {`/${category}/${id}`}>
                                    <h1 className = {`productTitle lg:-mt-20 relative lg:top-0 hover:text-[#0CB2D9]`}>{name}</h1>
                                </Link>
                                <p>${price}</p>
                                <p>{description}</p>
                            </div>

                            {cart.find((item) => item.id === id) ? 
                            (<div className = "addToCartBtn !bg-[#0CB2D9] font-semiBold flex justify-center items-center !text-white">
                                <span className = "cursor-pointer px-2" onClick={() => removeFromCart(id)}>-</span>
                                <span className = "mx-3">{
                                    cart.find((item) => item.id === id)?.quantity
                                    }</span>
                                <span className = "cursor-pointer px-2" onClick = {() => addToCart(product)}>+</span>
                            </div>)
                            : <button className = "addToCartBtn" onClick = {()=>{addToCart(product)}}>ADD TO CART</button>}
                            </LoadingWrapper>
                        </div>
                        
                        
                    )
                }) 
                        
                        
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
  )
}

export default ProductsList