import { appleImg, bagImg, burgerMenu, searchImg } from '../utils';
import { navLists } from '../constants';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useEffect } from 'react';

const Navbar = () => {
  const cart = useStore((state) => state.cart);
  const toggleCart = useStore(state => state.toggleCart);
  const cartProductsQuantity = cart.reduce((total, currentValue) => {
    return total + currentValue.quantity;
  },0);

  const {isBurgerMenuOpen, openBurgerMenu, closeBurgerMenu, toggleBurgerMenu} = useStore();
  
  return (
    <header className="w-full py-5 sm:px-10 px-5 bg-black">
      <nav className="flex w-full screen-max-width">
        <Link to = "/">
          <img src={appleImg} alt="Apple" width={14} height={18} />
        </Link>

        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map(({name, path}) => (
            <Link key={name} to = {path} className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all">
              {name}
            </Link>
          ))}
        </div>

        <div className="flex relative bottom-2 md:-bottom-0 gap-4 items-center md:gap-7 max-sm:justify-end max-sm:pr-2 max-sm:flex-1">
          <img src={searchImg} alt="search" width={18} height={18} />
          <div className = "relative">
            <img onClick = {() => toggleCart()} className = "cursor-pointer" src={bagImg} alt="bag" width={18} height={18}/>
            {cart.length > 0 && <div className = "cartBadge">{cartProductsQuantity}</div> }
          </div>
          <img onClick = {() => {toggleBurgerMenu()}} src = {burgerMenu} alt = "burger-menu" width = {40} height = {40} className = "md:hidden cursor-pointer"/>
        </div>
      </nav>
    </header>
  )
}

export default Navbar