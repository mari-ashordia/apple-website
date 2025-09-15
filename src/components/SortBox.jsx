import React from 'react'
import { useSessionStore } from '../store/useSessionStore'
import { useLocation} from 'react-router-dom';

export const SortBox = () => {
  const {setSortedProducts, products, filteredProducts} = useSessionStore();
  const path = useLocation();
  const productsToFilter = path.pathname === '/iphones' ? filteredProducts.filter((item) => item.category === "iPhone") :
        path.pathname === '/ipads' ? filteredProducts.filter((item) => item.category === "iPad") : 
        path.pathname === '/macs' ? filteredProducts.filter((item) => item.category === "mac") : [];
  // if(path.pathname === '/iphones') {
  //   if(filteredProducts > 0) filteredProducts.filter((item) => item.category === "iPhone")

  // }
  const sortAscending = [...productsToFilter].sort((a, b) => a.price - b.price);
  const sortDescending = [...productsToFilter].sort((a, b) => b.price - a.price);
  // console.log("ascending: ", sortAscending);
  // console.log("descending: ", sortDescending);

  return (
    <div className = "absolute w-[23vw] -left-[142px] -bottom-[65px] tracking-wider text-[12px] bg-white border border-teal rounded-lg">
        <ul>
            <li onClick = {() => setSortedProducts(sortAscending)} className = "mb-1 rounded-lg px-2 pt-2 pb-1 hover:bg-teal hover:text-white">PRICE: LOW TO HIGH</li>
            <li onClick = {() => setSortedProducts(sortDescending)} className = "px-2 pb-2 pt-1 rounded-lg hover:bg-teal hover:text-white">PRICE: HIGH TO LOW</li>
        </ul>
    </div>
  )
}
