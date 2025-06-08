import { appleWhiteImg,appleBlackImg, bagImg, searchImg, bagBlack, searchBlack } from '../utils';
import { navLists } from '../constants';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const cart = useStore((state) => state.cart);
  const toggleCart = useStore(state => state.toggleCart);
  const cartProductsQuantity = cart.reduce((total, currentValue) => {
    return total + currentValue.quantity;
  },0);

  const {isBurgerMenuOpen, openBurgerMenu, closeBurgerMenu, toggleBurgerMenu, isSearchBarOpen, openSearchBar} = useStore();
  
  return (
    <header className={`w-full py-5 sm:px-10 px-5 ${isHome ? "bg-black" : "bg-white"}`}>
      <nav className={`flex w-full screen-max-width`}>
        <Link to = "/">
          <img src={isHome ? appleWhiteImg : appleBlackImg} alt="Apple" width={14} height={18} className = {`${!isHome && "w-[18px] h-[22px]"}`} />
        </Link>

        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map(({name, path}) => (
            <Link key={name} to = {path} className={`px-5 text-sm cursor-pointer ${isHome ? "text-gray hover:text-white" : "text-[rgb(60,60,60)] hover:text-black"}   transition-all`}>
              {name}
            </Link>
          ))}
        </div>

        <div className="flex relative bottom-2 md:-bottom-0 gap-4 items-center md:gap-7 max-sm:justify-end max-sm:pr-2 max-sm:flex-1">
          <img onClick = {() => openSearchBar()} src={isHome ? searchImg : searchBlack} alt="search" width={18} height={18} className = "cursor-pointer"/>
          <div className = "relative">
            <img onClick = {() => toggleCart()} className = "cursor-pointer" src={isHome ? bagImg : bagBlack} alt="bag" width={18} height={18}/>
            {cart.length > 0 && <div className = "cartBadge">{cartProductsQuantity}</div> }
          </div>
          {
            isHome ? <svg className = "sm:hidden cursor-pointer" onClick = {() => {toggleBurgerMenu()}} width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 18L20 18" stroke="#fff" stroke-width="0.768" stroke-linecap="round"></path> <path d="M4 12L20 12" stroke="#fff" stroke-width="0.768" stroke-linecap="round"></path> <path d="M4 6L20 6" stroke="#fff" stroke-width="0.768" stroke-linecap="round"></path> </g></svg>
                : <svg className = "sm:hidden cursor-pointer" onClick = {() => {toggleBurgerMenu()}} width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 18L20 18" stroke="#000" stroke-width="0.768" stroke-linecap="round"></path> <path d="M4 12L20 12" stroke="#000" stroke-width="0.768" stroke-linecap="round"></path> <path d="M4 6L20 6" stroke="#000" stroke-width="0.768" stroke-linecap="round"></path> </g></svg>
          }
        </div>
      </nav>
    </header>
  )
}

export default Navbar