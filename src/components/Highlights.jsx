import React from 'react'
import { rightImg, watchImg } from '../assets/utils'
import VideoCarousel from './VideoCarousel'

const Highlights = () => {
  return (
    <section className = "bg-[#101010]">

      <div className = "pl-6 pt-20 sm:pt-32 sm:flex sm:flex-col lg:items-baseline lg:flex-row gap-12 lg:justify-center lg:pr-32 md:pb-3.5 md:justify-around lg:pl-24">
          <h2 className = "text-[#86868b] font-semibold text-3xl md:w-2/3 sm:text-4xl md:text-5xl lg:text-6xl lg:w-7/12 mb-5">Get the highlights.</h2>
          <div className = "flex relative gap-7 text-lg sm:flex-col pb-11 md:flex-col lg:flex-row"> 
            <p>
              <a href = "#" className = "no-underline hover:underline text-[#2997FF] text-xl">Watch the film
              <img className = "inline ml-2 align-middle relative bottom-0.5" src = {watchImg} alt = "play icon"/>
              </a>
            </p>
            <p>
              <a href = "#" className = "no-underline hover:underline text-[#2997FF] text-xl">Watch the event</a>
              <img className = "inline align-baseline ml-2" src = {rightImg} alt = "right arrow icon"/>
            </p>
          </div>
      </div>
      <VideoCarousel />
    </section>
  )
}

export default Highlights