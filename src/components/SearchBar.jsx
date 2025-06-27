import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSessionStore } from '../store/useSessionStore';

const SearchBar = () => {
    const closeSearchBar = useSessionStore(state => state.closeSearchBar);
    const products = useSessionStore(state => state.products);
    const setSelectedProduct = useSessionStore(state => state.setSelectedProduct);
    const setSearchedProducts = useSessionStore(state => state.setSearchedProducts);
    const searchedProducts = useSessionStore(state => state.searchedProducts);

    const [searchValue, setSearchValue] = useState("");
    

    // useEffect(() => setSearchedProducts(),[searchValue])

    // const navigateFunc = () => {
    //     if(searchedProducts) {
    //         const category = searchedProducts[0].category;
    //         category === 'iPhone' ? navigate('/iphones')
    //              : category === 'iPad' ? navigate('/ipads') : navigate('/macs');
    //     };
    //     closeSearchBar();
    // }

    // useEffect(() => {
    //     const updateVisibleProducts = () => {
    //         if(window.innerWidth < 640) setVisibleProducts(5);
    //         else if(window.innerWidth < 1024) setVisibleProducts(9);
    //         else setVisibleProducts(12);
    //     }
    //     updateVisibleProducts();
    //     window.addEventListener('resize',updateVisibleProducts);
    //     return () => window.removeEventListener('resize', updateVisibleProducts);
    // }, [])

  return (
    <div className = {`bg-black fixed inset-0 z-50 transition-opacity text-[#404040] overflow-y-auto md:bottom-auto md:top-[70px] md:bg-white md:w-screen ${searchValue !== "" ? "md:h-[70vh]" : "md:h-[30vh]"}`}>
          <div className = "flex justify-between items-baseline mr-4 lg:px-[235px]">
            <div className = "flex justify-start gap-3 items-baseline pt-7 px-7">
                <svg
                width="23"
                height="23"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    d="M11.8063 10.8713L8.50685 7.57204C9.10449 6.78005 9.46342 5.79795 9.46342 4.73146C9.46342 2.12276 7.3414 0 4.73171 0C2.12288 0 0 2.12276 0 4.73146C0 7.34101 2.12288 9.46292 4.73171 9.46292C5.79826 9.46292 6.78041 9.10401 7.57244 8.50639L10.8718 11.8056C11.0006 11.9344 11.1702 12 11.3391 12C11.5079 12 11.6767 11.9352 11.8063 11.8056C12.0646 11.5473 12.0646 11.1296 11.8063 10.8713ZM0.937816 4.73146C0.937816 2.63939 2.64038 0.937767 4.73171 0.937767C6.82389 0.937767 8.5256 2.64024 8.5256 4.73146C8.5256 6.82268 6.82389 8.52515 4.73171 8.52515C2.63953 8.52515 0.937816 6.82353 0.937816 4.73146Z"
                    fill="rgb(60,60,60)"
                    fillOpacity="0.8"
                />
                </svg>
                <input className = "text-3xl font-semibold placeholder-[#797777] focus:outline-none w-[40vw]" placeholder='Search' value = {searchValue} onChange = {e => {setSearchValue(e.target.value); setSearchedProducts(e.target.value)}}/>
            </div>
            <div className = "text-4xl cursor-pointer ml-6 md:mr-5" onClick = {() => closeSearchBar()}>
                &times;
            </div>
          </div>

          <div className = "mt-12 mb-7 px-8 flex flex-col items-start md:items-center">
                <div className = "md:grid md:grid-cols-3 lg:grid-cols-4 gap-3 ">
                    {searchedProducts.length != "" && (
                        searchedProducts.slice(0,12).map((item, i) => {
                        const lowerCaseName = item.name.toLowerCase();
                        const startIndex = lowerCaseName.indexOf(searchValue);
                        const endIndex = startIndex + searchValue.length;
                        const searchedPart = item.name.slice(startIndex, endIndex);
                        const start = item.name.slice(0, startIndex);
                        const end = item.name.slice(endIndex);

                        const includesColorBoolean = item.colors.map((color) => item.name.endsWith(color));
                        const productImageIndex = includesColorBoolean.findIndex(val => val === true);

                            return (<div key = {i}>
                                <div className = "flex items-center gap-4">
                                    <Link to = {`/${item.category}/${item.id}`}>
                                        <img onClick = {() => {closeSearchBar(); setSelectedProduct(item)}} src = {item.image[productImageIndex]} alt = {item.name} width = {100} height = {100} className = "cursor-pointer"/>
                                    </Link>
                                    <div>
                                        <Link to = {`/${item.category}/${item.id}`}>
                                            <p onClick = {() => {closeSearchBar(); setSelectedProduct(item)}} className = {`text-gray-900 font-semibold cursor-pointer`}>{start}<span className = "text-teal">{searchedPart}</span>{end}</p>
                                        </Link>
                                        <p className = "font-semibold">${item.price}</p>
                                    </div>
                                </div>
                            </div>)
                    }))}
                </div>
                {searchedProducts.length > 12 &&  
                    <div className = "m-auto relative -bottom-2">
                        <Link><p onClick = {() => closeSearchBar()} className = "mt-7 text-lg font-semibold underline tracking-wider cursor-pointer mb-3">Show all products</p></Link>
                    </div>
                }
            </div>
    </div>
  )
}

export default SearchBar