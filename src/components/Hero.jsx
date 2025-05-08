import React, { useEffect, useState } from 'react'
import { heroVideo} from '../assets/utils';
import { smallHeroVideo } from '../assets/utils';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
const Hero = () => {
  const [video,setVideo] = useState(window.innerWidth <= 760 ? smallHeroVideo : heroVideo);

  const swapHeroVideo = () => {
    window.innerWidth <= 760 ? setVideo(smallHeroVideo)
      : setVideo(heroVideo)
  }
 
  useEffect(()=>{
    window.addEventListener('resize',swapHeroVideo)
    return ()=>{
      window.removeEventListener('resize',swapHeroVideo)
    }
  },[])
  

  useGSAP(()=>{
    gsap.to('.hero-title',{
      opacity:1,
      delay:1.5,
      duration:1.5
    })
    gsap.to('#buyBtn',{
      opacity:1,
      y:-50,
      delay:1.5,
      duration:1.5
    })
  },[])

  return (
    <section className = "heroHeight flex flex-col">

      <div className = "h-5/6 relative flex flex-col items-center">
        <p className = "hero-title z-10">iPhone 16 Pro</p>
        <div className = "w-9/12 md:w-10/12 absolute top-1/5">
          <video autoPlay muted playsInline = {true} key = {video}>
            <source src = {video} type = "video/mp4" />
          </video>
        </div>
        
      </div>

      <div id = "buyBtn" className = "flex flex-col items-center opacity-0">
        <button className = "btn">Buy</button>
        <p className = "text-white mt-12 text-xl">From $199/month or $999</p>
      </div>
     

    </section>
  )
}
    
  
  
export default Hero
