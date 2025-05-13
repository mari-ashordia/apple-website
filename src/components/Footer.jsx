import React from 'react'
import { footerLinks } from '../assets/constants'

const Footer = () => {
  return (
    <footer className = "mt-[5%] common-padding !py-4 md:w-[78%] mx-auto">
        <div className = "footer-text md:pb-1">

          <div>
            <p>More ways to shop: <a className = "underline text-[#2997FF] " href = "#">Find an Apple Store</a> or {' '} 
            <a className = "underline text-[#2997FF] " href = "#">other retailer</a> near you.<br/> Or call 000800-040-1966</p>
          </div>

            <hr className = "border-[#5d5d62] my-5 opacity-80"/>

            <div className = "flex flex-col md:flex-row justify-between">
              <p>Copyright &copy; 2024 Apple Inc. All rights reserved.</p>
              <ul className = "flex">
                {footerLinks.map((link, i) =>
                  <il>

                    <a href = "#">{link}{' '}
                    {i !== footerLinks.length - 1 && <span className = "mx-2">|</span>}
                    </a>
                    
                  </il>
                )}
              </ul>
            </div>
            
        </div>
    </footer>
  )
}

export default Footer