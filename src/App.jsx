import * as Sentry from '@sentry/react';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IPhones } from './pages/IPhones';
import { Macs } from './pages/Macs';
import IPads from './pages/IPads';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { useEffect } from 'react';
import BurgerMenu from './components/BurgerMenu';
import { ProductPage } from './pages/ProductPage';
import { useLocalStore } from './store/useLocalStore';
import { useSessionStore } from './store/useSessionStore';
import FilterModal from './components/FilterModal';
import SearchBar from './components/SearchBar';

const App = () => {
  const {isCartOpen} = useLocalStore();
  const {isBurgerMenuOpen, isSearchBarOpen, isFilterModalOpen, closeFilterModal} = useSessionStore();

  const handleFilterModal = () => {
    window.innerWidth > 1024 && closeFilterModal();
  }

  useEffect(() => {
    if(window.innerWidth < 760)
      document.body.style.overflow = isCartOpen || isSearchBarOpen ? "hidden" : "scroll-y";
    
    return () => {
      document.body.style.overflow = "";
    }
  }, [isCartOpen, isSearchBarOpen])

  useEffect(() => {
    window.addEventListener('resize', handleFilterModal);

    return () => window.removeEventListener('resize', handleFilterModal);
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      {isCartOpen && <CartDrawer />}
      {isBurgerMenuOpen && <BurgerMenu />}
      {isFilterModalOpen && <FilterModal />}
      {isSearchBarOpen && <SearchBar />}
      <Routes>
        <Route path = '/' element = {<HomePage />} />
        <Route path = '/iphones' element = {<IPhones />} />
        <Route path = '/macs' element = {<Macs />} />
        <Route path = '/ipads' element = {<IPads />} />
        <Route path = '/:product/:id' element = {<ProductPage />}/>
      </Routes >
      <Footer />
    </BrowserRouter>
  )
}

export default Sentry.withProfiler(App);
