import React from 'react'
import { footerLinks } from '../constants';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <footer className={`py-5 sm:px-10 px-5 ${isHome ? "bg-black" : "bg-white"}`}>
      <div className="screen-max-width">
        <div>
          <p className={`font-semibold text-xs ${isHome ? "text-gray" : "text-[rgb(60,60,60)]"}`}>
            More ways to shop: {' '}
            <span className="underline text-blue">
            Find an Apple Store {' '}
            </span>
            or {' '}
            <span className="underline text-blue">
            other retailer
            </span>{' '}
            near you.
          </p>
          <p className={`font-semibold text-xs ${isHome ? "text-gray" : "text-[rgb(60,60,60)]"}`}>
            Or call 000800-040-1966
          </p>
        </div>

        <div className={` my-5 h-[1px] w-full ${isHome ? "bg-neutral-700" : "bg-[rgb(60,60,60)]"}`} />

        <div className="flex md:flex-row flex-col md:items-center justify-between">
          <p className={`font-semibold text-xs ${isHome ? "text-gray" : "text-[rgb(60,60,60)]"}`}>Copright @ 2024 Apple Inc. All rights reserved.</p>
          <div className="flex">
            {footerLinks.map((link, i) => (
              <p key={link} className={`font-semibold text-xs ${isHome ? "text-gray" : "text-[rgb(60,60,60)]"}`}>
                {link}{' '}
                {i !== footerLinks.length - 1 && (
                  <span className="mx-2"> | </span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer